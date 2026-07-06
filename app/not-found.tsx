import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold font-[family-name:var(--font-display)] text-gradient mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          This page seems to have been lost. Unlike your items with Vouch, we cannot track it down.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
