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
      className="relative pt-6 pb-10 xs:pt-8 xs:pb-12 sm:py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(108,92,231,0.06),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 xs:mb-12 sm:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-sm text-teal font-medium mb-6">
            Simple as 1-2-3
          </span>
          <h2 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
            How Vouch Works
          </h2>
          <p className="text-muted-foreground text-xs xs:text-sm sm:text-lg max-w-2xl mx-auto">
            Three simple steps between losing something and getting it back.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-2 xs:gap-4 md:gap-8 lg:gap-12">
          {howItWorksSteps.map((step, i) => {
            const Icon = stepIcons[i];
            const isVisible = visibleSteps[i];
            return (
              <div
                key={step.step}
                data-step
                className="relative flex flex-col items-center text-center group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.9s cubic-bezier(0.33,1,0.68,1) ${i * 0.15}s`,
                }}
              >
                {/* Connector line (hidden on mobile, shown between cards) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-primary/30 to-teal/20" />
                )}

                {/* Step number & Icon */}
                <div className="relative inline-flex mb-3 xs:mb-4 md:mb-6 flex-shrink-0">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 md:w-20 md:h-20 rounded-xl xs:rounded-2xl md:rounded-3xl bg-surface-elevated border border-border flex items-center justify-center group-hover:border-primary/30 transition-all duration-500">
                    <Icon className="w-4 h-4 xs:w-5 xs:h-5 md:w-8 md:h-8 text-primary" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-4 h-4 xs:-top-1.5 xs:-right-1.5 xs:w-5 xs:h-5 md:-top-2 md:-right-2 md:w-7 md:h-7 rounded-full bg-primary text-on-primary text-[8px] xs:text-[10px] md:text-xs font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                    {step.step}
                  </span>
                </div>

                <div className="flex-1 w-full">
                  <h3 className="text-xs xs:text-sm sm:text-lg md:text-xl font-semibold font-[family-name:var(--font-display)] mb-1 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-muted-foreground leading-normal xs:leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
