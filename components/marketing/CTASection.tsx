'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Truck, CreditCard } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-12 xs:py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(108,92,231,0.12),transparent_50%)]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-sm text-teal font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          Free shipping on orders over Rs. 2,000
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-6">
          Ready to Protect{' '}
          <span className="text-gradient">What Matters?</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Join 10,000+ people who never worry about losing their valuables.
          Order today — pay cash on delivery. No risk, no hassle.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all active:scale-[0.97] shadow-xl shadow-primary/30 group"
          >
            Get Your Vouch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { icon: CreditCard, label: 'Cash on Delivery' },
            { icon: Truck, label: 'Free Shipping' },
            { icon: Shield, label: 'Privacy Guaranteed' },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <badge.icon className="w-4 h-4 text-primary" />
              {badge.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
