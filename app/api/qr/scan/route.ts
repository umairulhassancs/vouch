import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminMessaging, FieldValue } from '@/lib/firebase/admin';
import { sendEmail, sendSMS } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const { qrCode, userAgent, location } = await request.json();

    if (!qrCode) {
      return NextResponse.json({ error: 'QR Code is required' }, { status: 400 });
    }

    const uppercaseCode = qrCode.trim().toUpperCase();
    const itemRef = adminDb.collection('items').doc(uppercaseCode);
    const itemSnap = await itemRef.get();

    if (!itemSnap.exists) {
      return NextResponse.json({ error: 'This Vouch QR code is not registered or active.' }, { status: 404 });
    }

    const itemData = itemSnap.data();
    if (!itemData || !itemData.isActive) {
      return NextResponse.json({ error: 'This item has been deactivated by the owner.' }, { status: 400 });
    }

    const scanId = 'SCN-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    const notificationId = 'NTF-' + Math.random().toString(36).substring(2, 11).toUpperCase();

    const timestamp = FieldValue.serverTimestamp();

    // 1. Log the scan under /items/{itemId}/scans/{scanId}
    const scanRef = itemRef.collection('scans').doc(scanId);
    const hasLocation = location && location.permissionGranted;
    
    await scanRef.set({
      scanId,
      itemId: uppercaseCode,
      ownerId: itemData.ownerId,
      scannedAt: timestamp,
      location: {
        lat: location?.lat || 0,
        lng: location?.lng || 0,
        city: location?.city || '',
        country: location?.country || '',
        accuracy: location?.accuracy || 0,
        permissionGranted: !!hasLocation,
      },
      device: {
        userAgent: userAgent || '',
        platform: '',
        browser: '',
      },
      hasMessage: false,
      messageId: '',
      notified: false,
    });

    // 2. Increment scan count and update lastScannedAt
    const updateData: any = {
      scanCount: FieldValue.increment(1),
      lastScannedAt: timestamp,
    };

    if (hasLocation) {
      updateData.lastLocation = {
        lat: location.lat,
        lng: location.lng,
        city: location.city || 'Scanned Location',
        country: location.country || '',
      };
    }
    await itemRef.update(updateData);

    const locationName = hasLocation
      ? `${location.city || 'Scanned Location'}, ${location.country || ''}`.replace(/,\s*$/, '').trim()
      : '';

    // 3. Create a notification under /notifications/{notificationId}
    const notificationRef = adminDb.collection('notifications').doc(notificationId);
    const itemLabel = itemData.label || 'Vouch Item';
    await notificationRef.set({
      notificationId,
      ownerId: itemData.ownerId,
      type: 'scan',
      title: 'Item Scanned',
      body: `Your item "${itemLabel}" was scanned.`,
      itemId: uppercaseCode,
      itemLabel: itemLabel,
      scanId,
      messageId: '',
      read: false,
      createdAt: timestamp,
      hasLocation: !!hasLocation,
      locationName,
      lat: location?.lat || 0,
      lng: location?.lng || 0,
    });

    // 4. Retrieve owner FCM tokens & push notifications
    const ownerRef = adminDb.collection('users').doc(itemData.ownerId);
    const ownerSnap = await ownerRef.get();
    
    if (ownerSnap.exists) {
      const ownerData = ownerSnap.data();
      if (ownerData) {

        if (ownerData.notifyPush && ownerData.fcmTokens && ownerData.fcmTokens.length > 0) {
        const tokens = ownerData.fcmTokens.filter((t: any) => typeof t === 'string' && t.length > 0);
        
        if (tokens.length > 0) {
          try {
            const fcmMessage = {
              notification: {
                title: 'Item Scanned',
                body: `Your item "${itemLabel}" was scanned.`,
              },
              data: {
                itemId: uppercaseCode,
                scanId,
                type: 'scan',
              },
            };

            // Send to multiple tokens
            const multicastPayload = {
              ...fcmMessage,
              tokens: tokens,
            };
            
            const response = await adminMessaging.sendEachForMulticast(multicastPayload);
            
            // Clean up invalid/failed tokens
            if (response.failureCount > 0) {
              const activeTokens = [...tokens];
              const invalidTokens: string[] = [];
              response.responses.forEach((resp: any, idx: number) => {
                if (!resp.success) {
                  const err = resp.error;
                  if (err && (err.code === 'messaging/invalid-registration-token' || err.code === 'messaging/registration-token-not-registered')) {
                    invalidTokens.push(activeTokens[idx]);
                  }
                }
              });
              if (invalidTokens.length > 0) {
                await ownerRef.update({
                  fcmTokens: FieldValue.arrayRemove(...invalidTokens),
                });
              }
            }
          } catch (fcmErr) {
            console.error('FCM sending failed:', fcmErr);
          }
        }
      }

        // Email Alert
        if (ownerData.notifyEmail && ownerData.email) {
          try {
            await sendEmail({
              to: ownerData.email,
              subject: `Vouch Alert: Your item "${itemLabel}" was scanned!`,
              html: `
                <h2>Item Scanned Alert</h2>
                <p>Hi ${ownerData.displayName || 'Vouch Owner'},</p>
                <p>Your item <strong>"${itemLabel}"</strong> was scanned using its Vouch QR code.</p>
                <p><strong>Scan Details:</strong></p>
                <ul>
                  <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
                  <li><strong>Device:</strong> ${userAgent || 'Unknown Device'}</li>
                  ${location && location.permissionGranted ? `<li><strong>Location:</strong> Latitude ${location.lat}, Longitude ${location.lng}</li>` : '<li><strong>Location:</strong> Geolocation not shared by finder</li>'}
                </ul>
                <p>Log in to your <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://vouch.pk'}/dashboard">Vouch Dashboard</a> to see more details.</p>
                <br/>
                <p>Best regards,</p>
                <p>The Vouch Team</p>
              `,
            });
          } catch (emailErr) {
            console.error('Email sending failed:', emailErr);
          }
        }

        // SMS Alert
        if (ownerData.notifySMS && ownerData.phone) {
          try {
            await sendSMS({
              to: ownerData.phone,
              body: `Vouch Alert: Your item "${itemLabel}" was scanned! Check your dashboard for details.`,
            });
          } catch (smsErr) {
            console.error('SMS sending failed:', smsErr);
          }
        }
      }
    }

    // Fetch owner profile data for conditional display on finder page
    let ownerEmail = '';
    let ownerEmergencyName = '';
    let ownerEmergencyPhone = '';
    const settings = itemData.finderSettings || {};

    if (settings.showOwnerEmail || settings.showProfileEmergency) {
      try {
        const ownerDocRef = adminDb.collection('users').doc(itemData.ownerId);
        const ownerDocSnap = await ownerDocRef.get();
        if (ownerDocSnap.exists) {
          const ownerData = ownerDocSnap.data() || {};
          if (settings.showOwnerEmail) {
            ownerEmail = ownerData.email || '';
          }
          if (settings.showProfileEmergency) {
            ownerEmergencyName = ownerData.emergencyName || '';
            ownerEmergencyPhone = ownerData.emergencyPhone || '';
          }
        }
      } catch (ownerErr) {
        console.error('Failed to fetch owner profile for scan response:', ownerErr);
      }
    }

    return NextResponse.json({
      success: true,
      scanId,
      item: {
        label: itemData.label,
        ownerEmail,
        ownerEmergencyName,
        ownerEmergencyPhone,
        finderSettings: settings.showFirstName !== undefined ? settings : {
          showFirstName: true,
          showOwnerEmail: false,
          allowCall: false,
          showProfileEmergency: false,
          showEmergency: false,
          emergencyName: '',
          emergencyPhone: '',
          customMessage: '',
        },
      },
    });
  } catch (error: any) {
    console.error('QR Scan API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
