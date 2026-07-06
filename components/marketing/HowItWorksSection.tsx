'use client';

import React, { useRef, useEffect, useState } from 'react';
import { howItWorksSteps } from '@/lib/mock-data';
import { Scan, Bell, CheckCircle } from 'lucide-react';

const stepIcons = [Scan, Bell, CheckCircle];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const stepElements = sectionRef.current?.querySelectorAll('[data-step]');
    if (!stepElements) return;

    stepElements.forEach((el, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.3, rootMargin: '0px 0px -15% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(108,92,231,0.06),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-sm text-teal font-medium mb-6">
            Simple as 1-2-3
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
            How Vouch Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps between losing something and getting it back.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {howItWorksSteps.map((step, i) => {
            const Icon = stepIcons[i];
            const isVisible = visibleSteps[i];
            return (
              <div
                key={step.step}
                data-step
                className="relative text-center group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.9s cubic-bezier(0.33,1,0.68,1) ${i * 0.15}s`,
                }}
              >
                {/* Connector line (hidden on mobile, shown between cards) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-16 left-[calc(50%+60px)] w-[calc(100%-120px)] h-px bg-gradient-to-r from-primary/30 to-teal/20" />
                )}

                {/* Step number */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-surface-elevated border border-border flex items-center justify-center group-hover:border-primary/30 transition-all duration-500">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-semibold font-[family-name:var(--font-display)] mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
