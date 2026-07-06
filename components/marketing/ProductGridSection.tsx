'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowRight, Star, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/mock-data';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

const productEmojis: Record<string, string> = {
  sticker: '🏷️',
  classic: '🔑',
  whistle: '📯',
  gps: '📍',
};

const productGradients: Record<string, string> = {
  sticker: 'from-purple-900/30 via-surface to-surface-overlay',
  classic: 'from-indigo-900/30 via-surface to-surface-overlay',
  whistle: 'from-teal-900/30 via-surface to-surface-overlay',
  gps: 'from-blue-900/30 via-surface to-surface-overlay',
};

const getBadgeStyles = (type: string) => {
  switch (type) {
    case 'sticker':
      return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
    case 'classic':
      return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
    case 'whistle':
      return 'bg-teal-500/20 text-teal-300 border border-teal-500/30';
    case 'gps':
      return 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-md shadow-yellow-500/5';
    default:
      return 'bg-muted text-foreground/80 border border-border';
  }
};

function CardImageShowcase({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden select-none pointer-events-none transition-transform duration-500 group-hover:scale-105">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${name} - Slide ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          draggable="false"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}

export function ProductGridSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

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

  const handleAdd = (product: typeof products[0]) => {
    addItem(product);
    setAddedSlug(product.slug);
    setTimeout(() => setAddedSlug(null), 1500);
  };

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(0,184,148,0.04),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-6">
            Our Products
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
            Choose Your Protection
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four ways to protect what matters. All powered by the same privacy-first QR technology.
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl bg-surface-elevated border border-border/50 overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={getBadgeStyles(product.productType)}>{product.badge}</Badge>
                </div>
              )}

              {/* Image area */}
              <div className="relative h-52 overflow-hidden bg-black">
                <CardImageShowcase
                  images={
                    product.slug === 'whistle-keychain'
                      ? product.images.filter(img => !img.includes('whistle-4') && !img.includes('whistle-5'))
                      : product.images
                  }
                  name={product.name}
                />
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-1.5 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= Math.round(product.rating)
                          ? 'fill-warning text-warning'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({product.reviewCount})
                  </span>
                </div>

                <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-1 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.tagline}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleAdd(product)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-lg shadow-primary/20"
                    whileTap={{ scale: 0.96 }}
                  >
                    <AnimatePresence mode="wait">
                      {addedSlug === product.slug ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          Added!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="cart"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-1"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-center w-11 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group/arrow"
                    aria-label={`View ${product.name} details`}
                  >
                    <ArrowRight className="w-4 h-4 group-hover/arrow:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
