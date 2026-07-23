import React from 'react';
import Link from 'next/link';
import { QrCode, ArrowRight } from 'lucide-react';

export default async function ActivateQRPage({ params }: { params: Promise<{ qrCode: string }> }) {
  const { qrCode } = await params;
  const returnUrl = encodeURIComponent(`/items/activate?code=${qrCode}`);
  const loginUrl = `/login?returnUrl=${returnUrl}`;
  const signupUrl = `/signup?returnUrl=${returnUrl}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <QrCode className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-2">Activate Your Vouch</h1>
        <p className="text-muted-foreground text-sm mb-2">
          QR Code: <span className="font-mono text-primary">{qrCode}</span>
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          Log in or create a free account to link this QR code to your item.
        </p>
        <div className="space-y-3">
          <Link href={loginUrl} className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
            Log In to Activate <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href={signupUrl} className="flex items-center justify-center gap-2 w-full py-3.5 border border-border text-foreground rounded-xl font-semibold hover:bg-surface-overlay transition-all">
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
}
