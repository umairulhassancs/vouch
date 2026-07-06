'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Heart, Globe, Zap, Users, Target } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'Your identity is never shared with finders. Every interaction goes through Vouch, keeping your personal data completely protected.',
  },
  {
    icon: Heart,
    title: 'Human-Centered',
    description:
      'We design for real people in real situations. Every feature is built around how people actually lose and find things.',
  },
  {
    icon: Globe,
    title: 'Accessible to All',
    description:
      'No app downloads, no account requirements for finders. If you can point a camera at a QR code, you can use Vouch.',
  },
  {
    icon: Zap,
    title: 'Instant & Reliable',
    description:
      'Sub-second scan response. Real-time notifications. Because when you lose something, every minute counts.',
  },
  {
    icon: Users,
    title: 'Community Powered',
    description:
      'Every Vouch scan turns a stranger into a helper. We are building a network of good Samaritans, one QR code at a time.',
  },
  {
    icon: Target,
    title: 'Pakistani Made',
    description:
      'Designed, built, and shipped from Pakistan. Solving a universal problem with products tailored for our market.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(108,92,231,0.12),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-6">
            About Vouch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-6">
            We believe lost things{' '}
            <span className="text-gradient">should find their way home</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Vouch started with a simple idea: what if every item you cared about could tell
            a stranger how to return it to you — without revealing who you are? That idea became
            Pakistan&apos;s first smart lost-and-found ecosystem.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-6">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every year, millions of items are lost in Pakistan — keys, wallets, bags, phones.
              Most are never returned, not because finders don&apos;t want to help, but because
              there&apos;s no easy, safe way to connect them with the owner.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Vouch bridges that gap. A simple QR sticker or keychain turns any item into a
              smart, privacy-protected asset. When found, one scan creates an instant connection
              between finder and owner — no app, no sign-up, no personal data exposed.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are not just building products. We are building a culture of returning things —
              making honesty easy and safe for everyone involved.
            </p>
          </div>
          <div className="relative aspect-square rounded-3xl bg-surface-elevated border border-border/50 overflow-hidden flex items-center justify-center">
            <Image
              src="/logo-dark.png"
              alt="Vouch"
              width={400}
              height={400}
              className="w-3/4 h-auto object-contain"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(108,92,231,0.08),transparent_60%)]" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
            What We Stand For
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            The principles that guide every product, feature, and interaction we build.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="p-6 rounded-2xl bg-surface-elevated border border-border/50 hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team placeholder */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-surface-elevated border border-border/50 p-12">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
            Built in Islamabad 🇵🇰
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
            A small, focused team passionate about solving real problems with thoughtful
            technology and beautiful design.
          </p>
          <p className="text-sm text-primary font-medium">
            We are hiring! → hello@vouch.pk
          </p>
        </div>
      </section>
    </div>
  );
}
