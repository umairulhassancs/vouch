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
    <section ref={sectionRef} className="relative py-10 xs:py-14 sm:py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(108,92,231,0.06),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 xs:mb-12 sm:mb-16">
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
            className="rounded-2xl bg-surface-elevated border border-border/50 p-4 xs:p-6 h-fit lg:sticky lg:top-32"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.9s cubic-bezier(0.33,1,0.68,1)',
            }}
          >
            <div className="grid grid-cols-[110px_1fr] xs:grid-cols-[130px_1fr] lg:block gap-4 xs:gap-6 items-center">
              {/* Average rating side */}
              <div className="text-center lg:mb-6">
                <div className="text-4xl xs:text-5xl font-bold font-[family-name:var(--font-display)] mb-1 xs:mb-2">
                  {summary.averageRating}
                </div>
                <div className="flex items-center justify-center gap-0.5 xs:gap-1 mb-1 xs:mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 xs:w-5 xs:h-5 ${
                        star <= Math.round(summary.averageRating)
                          ? 'fill-warning text-warning'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground leading-tight">
                  from {summary.totalReviews.toLocaleString()} reviews
                </p>
              </div>

              {/* Distribution bars side */}
              <div className="space-y-1.5 xs:space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = summary.distribution[stars] || 0;
                  const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-1.5 xs:gap-2 text-[11px] xs:text-sm">
                      <span className="w-2.5 text-muted-foreground">{stars}</span>
                      <Star className="w-2.5 h-2.5 xs:w-3 xs:h-3 fill-warning text-warning flex-shrink-0" />
                      <div className="flex-1 h-1.5 xs:h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-warning transition-all duration-1000"
                          style={{ width: isVisible ? `${pct}%` : '0%' }}
                        />
                      </div>
                      <span className="w-6 xs:w-8 text-right text-muted-foreground text-[10px] xs:text-xs">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Review cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {mockReviews.map((review, i) => (
              <div
                key={review.reviewId}
                className="p-4 xs:p-5 rounded-2xl bg-surface-elevated border border-border/50 hover:border-primary/20 transition-all duration-300"
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
