import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather numDigits="4" action="/api/voice/incoming-collect" method="POST" timeout="10">
    <Say voice="alice">Welcome to Vouch. Please enter the 4-digit security code shown on your screen.</Say>
  </Gather>
  <Say voice="alice">We did not receive any input. Goodbye.</Say>
</Response>`;

  return new NextResponse(twiml, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}

export async function GET(request: NextRequest) {
  return POST(request);
}
