'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldAlert, RefreshCw } from 'lucide-react';
import { loginWithEmail, logout as firebaseLogout } from '@/lib/firebase/auth';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import { useVendorStore } from '@/store/vendorStore';

export default function VendorLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setVendorAuth } = useVendorStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Sign in with Firebase Auth temporarily to verify credentials
      const userCredential = await loginWithEmail(email, password);
      const user = userCredential.user;

      // Step 2: Check if this account is authorized as a vendor
      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);

      const isVendorEmail = email.toLowerCase().endsWith('@vouch.pk');
      let isAuthorized = false;

      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.role === 'vendor' || isVendorEmail) {
          isAuthorized = true;
        }
      } else if (isVendorEmail) {
        isAuthorized = true;
      }

      // Step 3: ALWAYS sign out of Firebase Auth immediately.
      // Vendor session is managed separately via sessionStorage to prevent
      // polluting the shared user-side Firebase Auth state.
      await firebaseLogout();

      if (isAuthorized) {
        // Store vendor session in isolated sessionStorage-backed store
        setVendorAuth(email.toLowerCase());
        router.push('/vendor');
      } else {
        setError('Access denied. This portal is reserved for authorized vendor operators.');
      }
    } catch (err: any) {
      console.error('Vendor login error:', err);
      // Ensure Firebase Auth is cleared even on error
      try { await firebaseLogout(); } catch { /* ignore */ }

      let message = 'Invalid email or password.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        message = 'Invalid vendor credentials.';
      } else if (err.code === 'auth/invalid-credential') {
        message = 'Invalid vendor email or password credentials.';
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-surface-elevated border border-border/50 p-8 shadow-2xl shadow-black/40">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Vendor Portal</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to manage orders</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input
                type="email"
                required
                disabled={isLoading}
                placeholder="vendor@vouch.pk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input
                type="password"
                required
                disabled={isLoading}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link href="/" className="hover:text-foreground transition-colors">← Back to main site</Link>
        </p>
      </div>
    </div>
  );
}
