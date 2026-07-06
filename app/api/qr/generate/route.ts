import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth, FieldValue } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const isMock = !process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    let uid = 'mock-vendor-uid';

    if (!isMock) {
      if (!sessionCookie) {
        return NextResponse.json({ error: 'Session required' }, { status: 401 });
      }

      // Verify session
      try {
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        uid = decodedClaims.uid;
      } catch (authErr) {
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
      }

      // Check vendor role
      const vendorRef = adminDb.collection('vendors').doc(uid);
      const vendorSnap = await vendorRef.get();
      if (!vendorSnap.exists || vendorSnap.data()?.role !== 'vendor') {
        return NextResponse.json({ error: 'Permission denied. Vendor role required.' }, { status: 403 });
      }
    }

    const { codes, productType = 'sticker' } = await request.json();

    if (!codes || !Array.isArray(codes) || codes.length === 0 || codes.length > 100) {
      return NextResponse.json({ error: 'Codes must be an array of 1-100 items.' }, { status: 400 });
    }

    const batch = adminDb.batch ? adminDb.batch() : null;

    for (const code of codes) {
      const itemRef = adminDb.collection('items').doc(code);

      const itemData = {
        label: 'Unassigned Vouch Tag',
        ownerId: null,
        productType,
        status: 'safe',
        isActive: false,
        scanCount: 0,
        lastScannedAt: null,
        lastLocation: null,
        finderSettings: {
          showFirstName: true,
          allowCall: false,
          showEmergency: false,
          emergencyName: '',
          emergencyPhone: '',
          customMessage: '',
        },
        createdAt: isMock ? new Date() : FieldValue.serverTimestamp(),
        updatedAt: isMock ? new Date() : FieldValue.serverTimestamp(),
      };

      if (batch) {
        batch.set(itemRef, itemData);
      } else {
        await itemRef.set(itemData);
      }
    }

    if (batch) {
      await batch.commit();
    }

    return NextResponse.json({ success: true, savedCount: codes.length });
  } catch (error: any) {
    console.error('QR Generation API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
