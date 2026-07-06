'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageShowcaseProps {
  images: string[];
  name: string;
  badge?: string;
  badgeClassName?: string;
}

export function ProductImageShowcase({
  images,
  name,
  badge,
  badgeClassName,
}: ProductImageShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay interval when not interacting
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      if (isInteractingRef.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % images.length;
        scrollToIndex(next);
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    containerRef.current.scrollTo({
      left: index * width,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth } = containerRef.current;
    if (clientWidth === 0) return;
    
    // Calculate the index based on the scroll position
    const index = Math.round(scrollLeft / clientWidth);
    
    if (index !== activeIndex && index >= 0 && index < images.length) {
      setActiveIndex(index);
    }
  };

  // Temporarily pause autoplay when user interacts
  const handleInteractionStart = () => {
    isInteractingRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleInteractionEnd = () => {
    timeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 5000); // Resume autoplay after 5 seconds of inactivity
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleInteractionStart();
    const nextIndex = (activeIndex - 1 + images.length) % images.length;
    setActiveIndex(nextIndex);
    scrollToIndex(nextIndex);
    handleInteractionEnd();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleInteractionStart();
    const nextIndex = (activeIndex + 1) % images.length;
    setActiveIndex(nextIndex);
    scrollToIndex(nextIndex);
    handleInteractionEnd();
  };

  return (
    <div className="relative group w-full h-full rounded-3xl overflow-hidden bg-black border border-border/50 select-none">
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="w-full h-full flex-shrink-0 snap-start relative flex items-center justify-center bg-black"
          >
            {/* Background radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(108,92,231,0.08),transparent_60%)]" />
            <img
              src={src}
              alt={`${name} - Slide ${i + 1}`}
              className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-500 hover:scale-105"
              draggable="false"
            />
          </div>
        ))}
      </div>

      {/* Badge */}
      {badge && (
        <div className="absolute top-6 right-6 z-10 pointer-events-none">
          <span className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-black/20 ${
            badgeClassName || 'bg-primary/95 text-on-primary border border-white/10 backdrop-blur-md'
          }`}>
            {badge}
          </span>
        </div>
      )}

      {/* Navigation Buttons (only show if multiple images) */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border/50 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-background hover:scale-105 active:scale-95 shadow-md cursor-pointer z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border/50 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all hover:bg-background hover:scale-105 active:scale-95 shadow-md cursor-pointer z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleInteractionStart();
                setActiveIndex(i);
                scrollToIndex(i);
                handleInteractionEnd();
              }}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                i === activeIndex ? 'bg-primary w-4' : 'bg-foreground/30 hover:bg-foreground/50'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
