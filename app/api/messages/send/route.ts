import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminMessaging, FieldValue } from '@/lib/firebase/admin';
import { z } from 'zod';
import { sendEmail, sendSMS } from '@/lib/notifications';

const sendMessageSchema = z.object({
  qrCode: z.string().min(1),
  scanId: z.string().min(1),
  finderName: z.string().optional().default('Anonymous Finder'),
  finderEmail: z.string().email().or(z.literal('')).optional().default(''),
  text: z.string().min(1),
  location: z.any().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = sendMessageSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 });
    }

    const { qrCode, scanId, finderName, finderEmail, text, location } = result.data;
    const uppercaseCode = qrCode.trim().toUpperCase();

    // 1. Verify item exists and get owner details
    const itemRef = adminDb.collection('items').doc(uppercaseCode);
    const itemSnap = await itemRef.get();

    if (!itemSnap.exists) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const itemData = itemSnap.data();
    if (!itemData) {
      return NextResponse.json({ error: 'Invalid item data' }, { status: 500 });
    }

    const messageId = 'MSG-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    const notificationId = 'NTF-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    const timestamp = FieldValue.serverTimestamp();

    // 2. Create the message document
    const messageRef = adminDb.collection('messages').doc(messageId);
    await messageRef.set({
      messageId,
      itemId: uppercaseCode,
      ownerId: itemData.ownerId,
      scanId,
      createdAt: timestamp,
      status: 'unread',
      finderInfo: {
        name: finderName,
        email: finderEmail,
        location: location || '',
      },
      thread: [
        {
          role: 'finder',
          text: text,
          sentAt: new Date(),
          read: false,
        },
      ],
    });

    // 3. Update the scan document referencing the message
    const scanRef = itemRef.collection('scans').doc(scanId);
    await scanRef.update({
      hasMessage: true,
      messageId,
    });

    // 4. Create owner notification
    const itemLabel = itemData.label || 'Vouch Item';
    const textSnippet = text.length > 40 ? text.substring(0, 40) + '...' : text;
    
    const hasLocation = location && (location.permissionGranted || location.lat || location.city);
    const locationName = hasLocation
      ? `${location.city || 'Scanned Location'}, ${location.country || ''}`.replace(/,\s*$/, '').trim()
      : '';

    const notificationRef = adminDb.collection('notifications').doc(notificationId);
    await notificationRef.set({
      notificationId,
      ownerId: itemData.ownerId,
      type: 'message',
      title: 'New Finder Message',
      body: `A finder left a message for your item "${itemLabel}": "${textSnippet}"`,
      itemId: uppercaseCode,
      itemLabel: itemLabel,
      scanId,
      messageId,
      read: false,
      createdAt: timestamp,
      hasLocation: !!hasLocation,
      locationName,
      lat: location?.lat || 0,
      lng: location?.lng || 0,
    });

    // 5. Send notifications based on owner settings
    const ownerRef = adminDb.collection('users').doc(itemData.ownerId);
    const ownerSnap = await ownerRef.get();

    if (ownerSnap.exists) {
      const ownerData = ownerSnap.data();
      if (ownerData) {
        // A. FCM Push
        if (ownerData.notifyPush && ownerData.fcmTokens && ownerData.fcmTokens.length > 0) {
          const tokens = ownerData.fcmTokens.filter((t: any) => typeof t === 'string' && t.length > 0);
          if (tokens.length > 0) {
            try {
              const fcmMessage = {
                notification: {
                  title: 'New Finder Message',
                  body: `A finder left a message for your item "${itemLabel}".`,
                },
                data: {
                  itemId: uppercaseCode,
                  scanId,
                  messageId,
                  type: 'message',
                },
                tokens: tokens,
              };
              await adminMessaging.sendEachForMulticast(fcmMessage);
            } catch (fcmErr) {
              console.error('FCM messaging send failed:', fcmErr);
            }
          }
        }
        
        // B. Email Alert
        if (ownerData.notifyEmail && ownerData.email) {
          try {
            await sendEmail({
              to: ownerData.email,
              subject: `New message from a finder for your item "${itemLabel}"`,
              html: `
                <h2>New Finder Message</h2>
                <p>Hi ${ownerData.displayName || 'Vouch Owner'},</p>
                <p>A finder has left a message regarding your item <strong>"${itemLabel}"</strong>:</p>
                <blockquote style="background: #f4f4f4; padding: 10px; border-left: 3px solid #0052FF; margin: 15px 0;">
                  "${text}"
                </blockquote>
                <p><strong>Finder details:</strong></p>
                <ul>
                  <li><strong>Name:</strong> ${finderName || 'Anonymous Finder'}</li>
                  <li><strong>Email:</strong> ${finderEmail || 'Not provided'}</li>
                </ul>
                <p>To reply to the finder securely without exposing your details, log in to your <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://vouch.pk'}/messages">Vouch Messages Panel</a>.</p>
                <br/>
                <p>Best regards,</p>
                <p>The Vouch Team</p>
              `,
            });
          } catch (emailErr) {
            console.error('Email alert sending failed:', emailErr);
          }
        }

        // C. SMS Alert
        if (ownerData.notifySMS && ownerData.phone) {
          try {
            await sendSMS({
              to: ownerData.phone,
              body: `Vouch Message Alert: A finder left a message for your item "${itemLabel}": "${text.substring(0, 50)}...". Reply at: ${process.env.NEXT_PUBLIC_APP_URL || 'https://vouch.pk'}/messages`,
            });
          } catch (smsErr) {
            console.error('SMS alert sending failed:', smsErr);
          }
        }
      }
    }

    return NextResponse.json({ success: true, messageId });
  } catch (error: any) {
    console.error('Send Message API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
