'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Bell,
  Map,
  MessageSquare,
  User,
  CreditCard,
  QrCode,
  LogOut,
  Loader,
  ShoppingBag
} from 'lucide-react';
import { useAuth } from '@/hooks';
import { VouchLogo } from '@/components/ui/VouchLogo';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/items', label: 'My Items', icon: Package },
  { href: '/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/tracking', label: 'Tracking', icon: Map },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/subscription', label: 'Subscription', icon: CreditCard },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader className="w-8 h-8 text-primary animate-spin mb-2" />
        <p className="text-muted-foreground text-sm">Loading your Vouch Space...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border/40 bg-surface fixed top-0 left-0 h-full z-40">
        {/* Logo */}
        <div className="p-6 border-b border-border/40">
          <Link href="/" className="flex items-center gap-2">
            <VouchLogo variant="dark" height={32} />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface-overlay'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-border/40">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-danger hover:bg-danger/5 transition-all w-full cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border/40 bg-surface sticky top-0 z-30">
          <a href="/" className="flex items-center gap-2">
            <VouchLogo variant="dark" height={28} />
          </a>
          <a href="/profile" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </a>
        </header>

        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
