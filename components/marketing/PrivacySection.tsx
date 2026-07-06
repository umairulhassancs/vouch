'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';

export function PrivacySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(108,92,231,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.9s cubic-bezier(0.33,1,0.68,1)',
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-6">
              <Lock className="w-3.5 h-3.5" />
              Privacy-First Design
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-6">
              Your Identity,{' '}
              <span className="text-gradient">Fully Protected</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              When a finder scans your QR code, they never see your real name, phone number,
              or email. They see a clean, branded contact page where they can send you a message
              — and you decide what happens next.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: EyeOff,
                  title: 'Zero Personal Data Exposed',
                  desc: 'No name, no phone, no email visible to finders',
                },
                {
                  icon: Shield,
                  title: 'Masked Communication',
                  desc: 'Messages and calls routed through Vouch — your details stay hidden',
                },
                {
                  icon: Eye,
                  title: 'You Control Everything',
                  desc: 'Toggle what finders can see — emergency contacts, call button, custom messages',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-0.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Finder page preview mock */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.9s cubic-bezier(0.33,1,0.68,1) 0.2s',
            }}
          >
            <div className="relative mx-auto max-w-sm">
              {/* Phone frame */}
              <div className="relative bg-surface-elevated rounded-[2rem] border border-border p-3 shadow-2xl shadow-black/40">
                {/* Screen */}
                <div className="bg-background rounded-[1.5rem] overflow-hidden">
                  {/* Status bar mock */}
                  <div className="flex items-center justify-between px-6 py-3 text-xs text-muted-foreground">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 rounded-sm border border-muted-foreground/50" />
                    </div>
                  </div>

                  {/* Finder page content */}
                  <div className="px-6 pb-8 pt-4 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">You found something!</h3>
                    <p className="text-sm text-muted-foreground mb-1">This item is registered with Vouch</p>

                    <div className="mt-6 p-4 rounded-2xl bg-surface-elevated border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1">Item</p>
                      <p className="font-semibold text-lg">House Keys 🔑</p>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="p-4 rounded-xl bg-surface-overlay border border-border/30">
                        <p className="text-xs text-muted-foreground mb-2">Send a message to the owner</p>
                        <div className="h-16 rounded-lg bg-muted/30 border border-border/20" />
                      </div>
                      <button className="w-full py-3 bg-primary text-on-primary rounded-xl text-sm font-semibold cursor-default">
                        Send Message
                      </button>
                    </div>

                    <p className="mt-4 text-[11px] text-muted-foreground flex items-center justify-center gap-1">
                      <Shield className="w-3 h-3" />
                      Owner&apos;s identity is protected by Vouch
                    </p>
                  </div>
                </div>
              </div>

              {/* Background glow */}
              <div className="absolute -inset-12 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(108,92,231,0.12),transparent_60%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
