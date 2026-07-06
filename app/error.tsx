'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-danger" />
        </div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-3">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-6">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl font-semibold hover:bg-surface-overlay transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
