'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { QrCode, Package, Home, LogOut, Loader } from 'lucide-react';
import { useVendorStore } from '@/store/vendorStore';
import { VouchLogo } from '@/components/ui/VouchLogo';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const { isVendorAuth, isInitialized, vendorEmail, vendorLogout, initFromStorage } = useVendorStore();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/vendor/login';

  // Hydrate vendor session from sessionStorage on mount
  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  useEffect(() => {
    // Don't act until sessionStorage has been read
    if (!isInitialized) return;

    if (isLoginPage) {
      if (isVendorAuth) {
        router.push('/vendor');
      }
    } else {
      if (!isVendorAuth) {
        router.push('/vendor/login');
      }
    }
  }, [isVendorAuth, isInitialized, isLoginPage, router]);

  const handleSignOut = () => {
    vendorLogout();
    router.push('/vendor/login');
  };

  // If on login page, render directly without wrapper
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show spinner until sessionStorage is read — prevents flash redirect
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader className="w-8 h-8 text-primary animate-spin mb-2" />
        <p className="text-muted-foreground text-sm">Loading Vendor Portal...</p>
      </div>
    );
  }

  // If not authorized after init, show redirecting state
  if (!isVendorAuth) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader className="w-8 h-8 text-primary animate-spin mb-2" />
        <p className="text-muted-foreground text-sm">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-surface px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <VouchLogo variant="dark" height={32} />
            <span className="text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full font-semibold">
              Vendor
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1">
            <Link
              href="/vendor"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                pathname === '/vendor'
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-overlay'
              }`}
            >
              <Home className="w-4 h-4" /> Dashboard
            </Link>
            <Link
              href="/vendor/orders"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                pathname.startsWith('/vendor/orders')
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-overlay'
              }`}
            >
              <Package className="w-4 h-4" /> Orders
            </Link>
            <Link
              href="/vendor/qr-generator"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                pathname.startsWith('/vendor/qr-generator')
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-overlay'
              }`}
            >
              <QrCode className="w-4 h-4" /> QR Generator
            </Link>
          </nav>

          {vendorEmail && (
            <span className="text-xs text-muted-foreground hidden sm:block font-mono">{vendorEmail}</span>
          )}

          <div className="h-4 w-px bg-border/40" />

          <button
            onClick={handleSignOut}
            title="Sign Out"
            className="p-2 rounded-lg hover:bg-danger/10 hover:text-danger text-muted-foreground transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>
      <main className="p-6 lg:p-8">{children}</main>
    </div>
  );
}
