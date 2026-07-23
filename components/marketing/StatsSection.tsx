'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Shield, Star, Package } from 'lucide-react';
import { heroStats } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';

export function StatsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const icons = [Package, Shield, Star];

  return (
    <section ref={ref} className="relative py-8 xs:py-12 sm:py-16 border-y border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-3 sm:gap-8">
          {heroStats.map((stat, i) => {
            const Icon = icons[i];
            return (
              <div key={stat.label} className="flex flex-col items-center text-center gap-1.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </div>
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = Date.now();
    const isDecimal = !Number.isInteger(value);

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // power1.out easing
      const eased = 1 - Math.pow(1 - progress, 2);
      const current = eased * value;

      if (isDecimal) {
        setDisplay(Math.round(current * 10) / 10);
      } else {
        setDisplay(Math.round(current));
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  const formatted = Number.isInteger(value)
    ? formatNumber(display)
    : display.toFixed(1);

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}
