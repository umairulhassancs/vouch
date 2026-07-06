import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth, FieldValue } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import { sendEmail } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Session required' }, { status: 401 });
    }

    // Verify session
    let decodedClaims;
    try {
      decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    } catch (authErr) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const { uid } = decodedClaims;
    const { messageId, text } = await request.json();

    if (!messageId || !text || !text.trim()) {
      return NextResponse.json({ error: 'MessageId and text are required' }, { status: 400 });
    }

    const messageRef = adminDb.collection('messages').doc(messageId);
    const messageSnap = await messageRef.get();

    if (!messageSnap.exists) {
      return NextResponse.json({ error: 'Message thread not found' }, { status: 404 });
    }

    const messageData = messageSnap.data();
    if (!messageData || messageData.ownerId !== uid) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
    }

    // Append to thread
    const newReply = {
      role: 'owner',
      text: text.trim(),
      sentAt: new Date().toISOString(),
      read: false,
    };

    await messageRef.update({
      thread: FieldValue.arrayUnion(newReply),
      status: 'replied',
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Send email alert to finder if they provided an email address
    const finderEmail = messageData.finderInfo?.email;
    if (finderEmail && finderEmail.trim().length > 0) {
      try {
        await sendEmail({
          to: finderEmail,
          subject: `Response from the owner regarding the item you found`,
          html: `
            <h2>The owner has responded to your message</h2>
            <p>Hi ${messageData.finderInfo?.name || 'Finder'},</p>
            <p>The owner of the item you found has replied to your message thread:</p>
            <blockquote style="background: #f4f4f4; padding: 10px; border-left: 3px solid #0052FF; margin: 15px 0;">
              "${text.trim()}"
            </blockquote>
            <p>Thank you again for helping return this item safely!</p>
            <br/>
            <p>Best regards,</p>
            <p>The Vouch Team</p>
          `,
        });
      } catch (emailErr) {
        console.error('Email alert sending to finder failed:', emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Reply Message API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
