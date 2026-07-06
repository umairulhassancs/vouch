'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Star, BadgeCheck } from 'lucide-react';
import { mockReviews, aggregateReviewSummary } from '@/lib/mock-data';
import { getInitials } from '@/lib/utils';

export function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const summary = aggregateReviewSummary;
  const maxCount = Math.max(...Object.values(summary.distribution));

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(108,92,231,0.06),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-sm text-warning font-medium mb-6">
            ★ Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
            Loved by{' '}
            <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real reviews from real Vouch customers who got their stuff back.
          </p>
        </div>

        {/* Summary + Reviews grid */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Rating summary card */}
          <div
            className="rounded-2xl bg-surface-elevated border border-border/50 p-6 h-fit lg:sticky lg:top-32"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.9s cubic-bezier(0.33,1,0.68,1)',
            }}
          >
            <div className="text-center mb-6">
              <div className="text-5xl font-bold font-[family-name:var(--font-display)] mb-2">
                {summary.averageRating}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(summary.averageRating)
                        ? 'fill-warning text-warning'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                from {summary.totalReviews.toLocaleString()} reviews
              </p>
            </div>

            {/* Distribution bars */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = summary.distribution[stars] || 0;
                const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2 text-sm">
                    <span className="w-3 text-muted-foreground">{stars}</span>
                    <Star className="w-3 h-3 fill-warning text-warning" />
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-warning transition-all duration-1000"
                        style={{ width: isVisible ? `${pct}%` : '0%' }}
                      />
                    </div>
                    <span className="w-8 text-right text-muted-foreground text-xs">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {mockReviews.map((review, i) => (
              <div
                key={review.reviewId}
                className="p-5 rounded-2xl bg-surface-elevated border border-border/50 hover:border-primary/20 transition-all duration-300"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.9s cubic-bezier(0.33,1,0.68,1) ${0.1 + i * 0.08}s`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-teal/30 flex items-center justify-center text-sm font-bold">
                    {getInitials(review.reviewerName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold truncate">{review.reviewerName}</p>
                      {review.verifiedPurchase && (
                        <BadgeCheck className="w-4 h-4 text-teal flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= review.rating
                              ? 'fill-warning text-warning'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.text}
                </p>
                <p className="mt-3 text-xs text-muted-foreground/60">
                  Reviewed: {review.productSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
