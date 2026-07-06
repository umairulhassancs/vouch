'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { VouchLogo } from '@/components/ui/VouchLogo';

const footerLinks = {
  Products: [
    { label: 'QR Sticker', href: '/products/qr-sticker' },
    { label: 'Classic Keychain', href: '/products/classic-keychain' },
    { label: 'Whistle Keychain', href: '/products/whistle-keychain' },
    { label: 'GPS Ring Keychain', href: '/products/gps-ring-keychain' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '#' },
  ],
  Support: [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'FAQ', href: '/pricing#faq' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
  Account: [
    { label: 'Sign Up', href: '/signup' },
    { label: 'Log In', href: '/login' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Track Order', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-surface">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 py-16">
          {/* Brand column — spans 2 cols */}
          <div className="col-span-2">
            <Link href="/" className="inline-block">
              <VouchLogo variant="dark" height={36} />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Smart QR-based lost &amp; found ecosystem. Protect your valuables. Recover them
              privately. No app needed.
            </p>
            <div className="mt-6 space-y-2.5">
              <a
                href="mailto:hello@vouch.pk"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                hello@vouch.pk
              </a>
              <a
                href="tel:+923001234567"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                +92 300 123 4567
              </a>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Islamabad, Pakistan
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-60 group-hover:translate-y-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-t border-border/30">
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-base">💵</span> Cash on Delivery available nationwide
          </span>
          <span className="hidden sm:block w-px h-4 bg-border/50" />
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-base">🚚</span> Free shipping over Rs. 2,000
          </span>
          <span className="hidden sm:block w-px h-4 bg-border/50" />
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-base">🔒</span> Privacy-first. Always.
          </span>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-t border-border/30 gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Vouch. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with 💜 in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
