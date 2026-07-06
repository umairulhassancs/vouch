'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { resetPassword } from '@/lib/firebase/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err: any) {
      console.error('Password reset error details:', err);
      let message = 'An unexpected error occurred. Please try again.';
      if (err.code === 'auth/user-not-found') {
        message = 'No account found with this email address.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md"
    >
      <div className="rounded-3xl bg-surface-elevated border border-border/50 p-8 shadow-2xl shadow-black/40">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-success" />
              </div>
              <h2 className="text-xl font-bold font-[family-name:var(--font-display)] mb-2">Check your email</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We sent a password reset link to <strong className="text-foreground">{email}</strong>.
                Check your inbox and spam folder.
              </p>
              <Link href="/login" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to sign in
              </Link>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-warning" />
                </div>
                <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] tracking-tight">
                  Reset password
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Enter your email and we&apos;ll send you a reset link
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <input
                      id="forgot-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <button
                  id="forgot-submit"
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all active:scale-[0.97] shadow-lg shadow-primary/25 disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <>Send Reset Link <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                <Link href="/login" className="inline-flex items-center gap-1 text-primary hover:underline">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
