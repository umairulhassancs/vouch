import React from 'react';
import Link from 'next/link';
import { VouchLogo } from '@/components/ui/VouchLogo';

export const dynamic = 'force-dynamic';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Vouch Home">
          <VouchLogo variant="dark" height={32} />
        </Link>
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to site
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Vouch. Privacy-first lost &amp; found.
      </footer>
    </div>
  );
}
