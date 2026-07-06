import { Resend } from 'resend';
import twilio from 'twilio';

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@vouch.pk';

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

let resendClient: Resend | null = null;
if (resendApiKey) {
  try {
    resendClient = new Resend(resendApiKey);
  } catch (err) {
    console.error('Failed to initialize Resend client:', err);
  }
}

let twilioClient: any = null;
if (twilioAccountSid && twilioAuthToken) {
  try {
    twilioClient = twilio(twilioAccountSid, twilioAuthToken);
  } catch (err) {
    console.error('Failed to initialize Twilio client:', err);
  }
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (resendClient && resendApiKey) {
    try {
      const response = await resendClient.emails.send({
        from: `Vouch <${resendFromEmail}>`,
        to: [to],
        subject,
        html,
      });
      console.log('Email sent successfully via Resend:', response);
      return response;
    } catch (err) {
      console.error('Failed to send email via Resend, falling back to mock logging:', err);
    }
  }

  console.log(`[MOCK EMAIL ALERT]
To: ${to}
Subject: ${subject}
Content: ${html.substring(0, 300)}...
`);
  return { id: 'mock-email-id', success: true };
}

export async function sendSMS({
  to,
  body,
}: {
  to: string;
  body: string;
}) {
  if (twilioClient && twilioPhoneNumber) {
    try {
      const response = await twilioClient.messages.create({
        body,
        from: twilioPhoneNumber,
        to,
      });
      console.log('SMS sent successfully via Twilio:', response.sid);
      return response;
    } catch (err) {
      console.error('Failed to send SMS via Twilio, falling back to mock logging:', err);
    }
  }

  console.log(`[MOCK SMS ALERT]
To: ${to}
Body: ${body}
`);
  return { sid: 'mock-sms-sid', success: true };
}
