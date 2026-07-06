import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { cookies } from 'next/headers';
import { sendEmail, sendSMS } from '@/lib/notifications';

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

    // Check if the user is a verified vendor
    const isMock = !process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    if (!isMock) {
      const vendorRef = adminDb.collection('vendors').doc(uid);
      const vendorSnap = await vendorRef.get();

      if (!vendorSnap.exists || vendorSnap.data()?.role !== 'vendor') {
        return NextResponse.json({ error: 'Permission denied. Vendor role required.' }, { status: 403 });
      }
    }

    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json({ error: 'OrderId and status are required' }, { status: 400 });
    }

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const orderRef = adminDb.collection('orders').doc(orderId);
    const orderSnap = await orderRef.get();

    if (!orderSnap.exists) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update status
    await orderRef.update({
      status,
      updatedAt: FieldValue.serverTimestamp(),
    });

    const orderData = orderSnap.data();
    if (orderData && orderData.customerInfo) {
      const { email, phone, name } = orderData.customerInfo;

      // Send email alert on status changes
      if (email && email.trim().length > 0) {
        try {
          await sendEmail({
            to: email,
            subject: `Vouch Order Update: Order #${orderId} has been ${status}`,
            html: `
              <h2>Your Vouch Order has been updated</h2>
              <p>Hi ${name || 'Customer'},</p>
              <p>Your order <strong>#${orderId}</strong> status has been updated to: <strong>${status.toUpperCase()}</strong>.</p>
              <p>If you have any questions, feel free to reply to this email.</p>
              <br/>
              <p>Best regards,</p>
              <p>The Vouch Team</p>
            `,
          });
        } catch (emailErr) {
          console.error('Email status alert failed:', emailErr);
        }
      }

      // Send SMS alert on status changes
      if (phone && phone.trim().length > 0) {
        try {
          await sendSMS({
            to: phone,
            body: `Hi ${name || 'Customer'}, your Vouch order #${orderId} status has been updated to: ${status.toUpperCase()}.`,
          });
        } catch (smsErr) {
          console.error('SMS status alert failed:', smsErr);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update Order Status API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
