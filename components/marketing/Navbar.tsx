'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, ChevronRight, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { VouchLogo } from '@/components/ui/VouchLogo';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { isCartOpen, toggleCart, getItemCount } = useCartStore();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const itemCount = mounted ? getItemCount() : 0;
  const isLoggedIn = mounted && isAuthenticated && user;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          isScrolled
            ? 'bg-surface/95 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/20 py-2'
            : 'bg-transparent py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between" aria-label="Main navigation">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group relative z-10" aria-label="Vouch Home">
              <VouchLogo
                variant="dark"
                height={38}
                className="transition-opacity group-hover:opacity-85"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-surface-overlay'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2.5 rounded-xl hover:bg-surface-overlay transition-all duration-200 cursor-pointer"
                aria-label={`Cart (${itemCount} items)`}
              >
                <ShoppingCart className="w-5 h-5 text-muted-foreground" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Desktop Auth — context-aware */}
              <div className="hidden md:flex items-center gap-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-primary text-on-primary rounded-xl hover:bg-primary/90 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-primary/25"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="p-2.5 rounded-xl hover:bg-danger/10 text-muted-foreground hover:text-danger transition-all cursor-pointer"
                      title="Log Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="px-5 py-2.5 text-sm font-semibold bg-primary text-on-primary rounded-xl hover:bg-primary/90 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-primary/25"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-2.5 rounded-xl hover:bg-surface-overlay transition-all cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-4 pb-6 pt-2 space-y-1 border-t border-border/30 mt-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all',
                      pathname === link.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface-overlay'
                    )}
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                ))}
                <div className="pt-3 space-y-2">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-center text-base font-semibold bg-primary text-on-primary rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => logout()}
                        className="block w-full px-4 py-3 text-center text-base font-medium text-muted-foreground hover:text-danger rounded-xl hover:bg-danger/10 transition-all cursor-pointer"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block w-full px-4 py-3 text-center text-base font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-surface-overlay transition-all"
                      >
                        Log In
                      </Link>
                      <Link
                        href="/signup"
                        className="block w-full px-4 py-3 text-center text-base font-semibold bg-primary text-on-primary rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => useCartStore.getState().closeCart()} />
    </>
  );
}
