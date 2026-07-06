import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const digits = formData.get('Digits')?.toString() || '';

    if (!digits || digits.length !== 4) {
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather numDigits="4" action="/api/voice/incoming-collect" method="POST" timeout="10">
    <Say voice="alice">Please enter a valid four-digit security code.</Say>
  </Gather>
  <Say voice="alice">We did not receive any input. Goodbye.</Say>
</Response>`,
        { headers: { 'Content-Type': 'text/xml' } }
      );
    }

    const pinDoc = await adminDb.collection('voice_pins').doc(digits).get();

    if (!pinDoc.exists) {
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather numDigits="4" action="/api/voice/incoming-collect" method="POST" timeout="10">
    <Say voice="alice">Sorry, that code is invalid. Please try entering the four-digit security code again.</Say>
  </Gather>
  <Say voice="alice">We did not receive any input. Goodbye.</Say>
</Response>`,
        { headers: { 'Content-Type': 'text/xml' } }
      );
    }

    const pinData = pinDoc.data();
    const expiresAt = pinData?.expiresAt?.toDate ? pinData.expiresAt.toDate() : new Date(pinData?.expiresAt);

    if (new Date() > expiresAt) {
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather numDigits="4" action="/api/voice/incoming-collect" method="POST" timeout="10">
    <Say voice="alice">Sorry, that code has expired. Please try entering the four-digit security code again.</Say>
  </Gather>
  <Say voice="alice">We did not receive any input. Goodbye.</Say>
</Response>`,
        { headers: { 'Content-Type': 'text/xml' } }
      );
    }

    const ownerPhone = pinData?.ownerPhone;

    if (!ownerPhone) {
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Sorry, the owner has not set up a phone number for call forwarding. Goodbye.</Say>
</Response>`,
        { headers: { 'Content-Type': 'text/xml' } }
      );
    }

    // Connect call by Dialing the owner number
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Connecting you to the owner securely now.</Say>
  <Dial>${ownerPhone}</Dial>
</Response>`;

    return new NextResponse(twiml, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error: any) {
    console.error('Voice incoming collect error:', error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">An error occurred while connecting your call. Please try again later. Goodbye.</Say>
</Response>`,
      { headers: { 'Content-Type': 'text/xml' } }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
