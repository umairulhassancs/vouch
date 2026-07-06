'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { loginWithEmail, signInWithGoogle } from '@/lib/firebase/auth';
import { db } from '@/lib/firebase/client';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

function LoginFormControl() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/dashboard';

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;

      // Check if user doc exists, if not, create it (safe fallback for first-time Google sign-in)
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Google User',
          phone: user.phoneNumber || '',
          photoURL: user.photoURL || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          plan: 'free',
          planExpiresAt: serverTimestamp(),
          fcmTokens: [],
          notifyPush: true,
          notifyEmail: true,
          notifySMS: false,
          itemCount: 0,
        });
      }
      router.push(returnUrl);
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await loginWithEmail(form.email, form.password);
      router.push(returnUrl);
    } catch (err: any) {
      console.error('Login error details:', err);
      let message = 'An unexpected error occurred. Please try again.';
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-credential'
      ) {
        message = 'Invalid email or password.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Access temporarily disabled due to many failed attempts. Try again later.';
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
      {/* Card */}
      <div className="rounded-3xl bg-surface-elevated border border-border/50 p-8 shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] tracking-tight">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to your Vouch dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-muted-foreground">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-11 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            id="login-submit"
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all active:scale-[0.97] shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
          >
            {isLoading ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border/50" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        {/* Google sign-in button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 bg-surface border border-border hover:bg-surface-overlay text-foreground rounded-xl font-medium transition-all active:scale-[0.97] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mb-6"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" style={{ fill: 'none' }}>
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </button>

        {/* Sign up link */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-primary font-medium hover:underline">
            Create one free
          </Link>
        </p>
      </div>

      {/* Ambient glow */}
      <div className="absolute -inset-40 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(108,92,231,0.08),transparent_60%)] pointer-events-none" />
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md bg-surface-elevated border border-border/50 p-8 rounded-3xl shadow-2xl h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    }>
      <LoginFormControl />
    </Suspense>
  );
}
