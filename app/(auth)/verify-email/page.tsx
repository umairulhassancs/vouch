'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { verifyEmail } from '@/lib/firebase/auth';

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    setError(null);
    try {
      await verifyEmail();
      setResent(true);
      setCountdown(60);
    } catch (err: any) {
      console.error('Verify email resend error:', err);
      setError(err.message || 'Unable to resend verification email. Please make sure you are signed in.');
    }
  };

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md"
    >
      <div className="rounded-3xl bg-surface-elevated border border-border/50 p-8 shadow-2xl shadow-black/40 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <Mail className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-2">
          Verify your email
        </h1>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          We sent a verification link to your email address. Click it to activate your Vouch account.
        </p>

        {/* Steps */}
        <div className="text-left space-y-3 mb-8 p-4 rounded-xl bg-surface border border-border/30">
          {[
            'Open your email inbox',
            'Find the email from Vouch',
            'Click the "Verify Email" button',
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              {step}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Resend */}
        {resent ? (
          <div className="flex items-center justify-center gap-2 text-sm text-success mb-4">
            <CheckCircle className="w-4 h-4" />
            Email resent!
            {countdown > 0 && <span className="text-muted-foreground">({countdown}s)</span>}
          </div>
        ) : (
          <button
            onClick={handleResend}
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline cursor-pointer mb-4"
          >
            <RefreshCw className="w-4 h-4" />
            Resend verification email
          </button>
        )}

        <p className="text-xs text-muted-foreground">
          Wrong email?{' '}
          <Link href="/signup" className="text-primary hover:underline">Go back and change it</Link>
        </p>
      </div>
    </motion.div>
  );
}
