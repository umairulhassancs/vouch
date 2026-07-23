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
    <section ref={ref} className="relative py-10 xs:py-14 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(108,92,231,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1.1fr_0.9fr] sm:grid-cols-2 gap-3 sm:gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.9s cubic-bezier(0.33,1,0.68,1)',
            }}
          >
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] xs:text-xs sm:text-sm text-primary font-medium mb-3 xs:mb-4 sm:mb-6">
              <Lock className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
              Privacy-First Design
            </span>
            <h2 className="text-lg xs:text-xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-3 xs:mb-4 sm:mb-6 leading-tight">
              Your Identity,{' '}
              <span className="text-gradient">Fully Protected</span>
            </h2>
            <p className="text-[10px] xs:text-xs sm:text-base lg:text-lg text-muted-foreground leading-normal xs:leading-relaxed mb-4 xs:mb-6 sm:mb-8">
              When a finder scans your QR code, they never see your real name, phone number,
              or email. They see a clean, branded contact page where they can send you a message
              — and you decide what happens next.
            </p>
            <div className="space-y-2.5 xs:space-y-3 sm:space-y-4">
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
                <div key={item.title} className="flex gap-2 xs:gap-3 sm:gap-4 items-start">
                  <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-lg xs:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-[11px] xs:text-xs sm:text-base font-semibold mb-0.5 leading-tight">{item.title}</h3>
                    <p className="text-[9px] xs:text-xs sm:text-sm text-muted-foreground leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Finder page preview mock */}
          <div
            className="w-full flex justify-end"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.9s cubic-bezier(0.33,1,0.68,1) 0.2s',
            }}
          >
            <div className="relative w-full max-w-[150px] xs:max-w-[200px] sm:max-w-[320px] md:max-w-sm mx-auto sm:mr-0">
              {/* Phone frame */}
              <div className="relative bg-surface-elevated rounded-[1.2rem] xs:rounded-[1.5rem] sm:rounded-[2rem] border border-border p-1 xs:p-2 sm:p-3 shadow-2xl shadow-black/40">
                {/* Screen */}
                <div className="bg-background rounded-[0.9rem] xs:rounded-[1.1rem] sm:rounded-[1.5rem] overflow-hidden">
                  {/* Status bar mock */}
                  <div className="flex items-center justify-between px-3 py-1 xs:px-4 xs:py-2 sm:px-6 sm:py-3 text-[8px] xs:text-[10px] sm:text-xs text-muted-foreground">
                    <span>9:41</span>
                    <div className="flex items-center gap-0.5 xs:gap-1">
                      <div className="w-3 h-1.5 xs:w-4 xs:h-2 rounded-sm border border-muted-foreground/50" />
                    </div>
                  </div>

                  {/* Finder page content */}
                  <div className="px-3 pb-4 pt-2 xs:px-4 xs:pb-6 xs:pt-3 sm:px-6 sm:pb-8 sm:pt-4 text-center">
                    <div className="w-7 h-7 xs:w-10 xs:h-10 sm:w-14 sm:h-14 rounded-lg xs:rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                      <Lock className="w-3.5 h-3.5 xs:w-5 xs:h-5 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <h3 className="text-[10px] xs:text-xs sm:text-lg font-semibold mb-0.5 sm:mb-1">You found something!</h3>
                    <p className="text-[8px] xs:text-[10px] sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">This item is registered with Vouch</p>

                    <div className="mt-3 xs:mt-4 sm:mt-6 p-2 xs:p-3 sm:p-4 rounded-xl xs:rounded-2xl bg-surface-elevated border border-border/50">
                      <p className="text-[7px] xs:text-[9px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Item</p>
                      <p className="font-semibold text-[9px] xs:text-xs sm:text-lg">House Keys 🔑</p>
                    </div>

                    <div className="mt-2 xs:mt-3 sm:mt-4 space-y-1.5 xs:space-y-2 sm:space-y-3">
                      <div className="p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl bg-surface-overlay border border-border/30">
                        <p className="text-[7px] xs:text-[9px] sm:text-xs text-muted-foreground mb-1 sm:mb-2">Send a message to the owner</p>
                        <div className="h-8 xs:h-12 sm:h-16 rounded-md xs:rounded-lg bg-muted/30 border border-border/20" />
                      </div>
                      <button className="w-full py-1.5 xs:py-2 sm:py-3 bg-primary text-on-primary rounded-lg xs:rounded-xl text-[8px] xs:text-xs sm:text-sm font-semibold cursor-default">
                        Send Message
                      </button>
                    </div>

                    <p className="mt-2 xs:mt-3 sm:mt-4 text-[7px] xs:text-[9px] sm:text-[11px] text-muted-foreground flex items-center justify-center gap-0.5 xs:gap-1">
                      <Shield className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3" />
                      Owner&apos;s identity is protected by Vouch
                    </p>
                  </div>
                </div>
              </div>

              {/* Background glow */}
              <div className="absolute -inset-6 sm:-inset-12 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(108,92,231,0.12),transparent_60%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
