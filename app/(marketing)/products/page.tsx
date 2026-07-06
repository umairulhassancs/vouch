'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { products } from '@/lib/mock-data';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { ProductImageShowcase } from '@/components/marketing/ProductImageShowcase';

const productEmojis: Record<string, string> = {
  sticker: '🏷️',
  classic: '🔑',
  whistle: '📯',
  gps: '📍',
};

const getBadgeStyles = (type: string) => {
  switch (type) {
    case 'sticker':
      return 'bg-purple-500/25 text-purple-200 border border-purple-500/30 backdrop-blur-md';
    case 'classic':
      return 'bg-slate-500/25 text-slate-200 border border-slate-500/30 backdrop-blur-md';
    case 'whistle':
      return 'bg-teal-500/25 text-teal-200 border border-teal-500/30 backdrop-blur-md';
    case 'gps':
      return 'bg-gradient-to-r from-amber-500/25 to-yellow-500/25 text-yellow-200 border border-yellow-500/40 backdrop-blur-md shadow-md shadow-yellow-500/5';
    default:
      return 'bg-muted text-foreground/80 border border-border';
  }
};

export default function ProductsPage() {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(108,92,231,0.12),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
            Our <span className="text-gradient">Products</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four ways to protect your valuables. All powered by the same privacy-first QR technology.
          </p>
        </div>
      </section>

      {/* Products — alternating layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-24">
          {products.map((product, i) => (
            <div
              key={product.slug}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                i % 2 !== 0 ? 'lg:direction-rtl' : ''
              }`}
            >
              {/* Image */}
              <div className={`aspect-square w-full ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <ProductImageShowcase
                  images={product.images}
                  name={product.name}
                  badge={product.badge}
                  badgeClassName={getBadgeStyles(product.productType)}
                />
              </div>

              {/* Content */}
              <div className={`${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-1.5 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(product.rating) ? 'fill-warning text-warning' : 'text-muted'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-3">
                  {product.name}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="grid sm:grid-cols-2 gap-2 mb-8">
                  {product.features.slice(0, 6).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price + Actions */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => addItem(product)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all active:scale-[0.97] shadow-lg shadow-primary/25 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-foreground rounded-xl font-semibold hover:bg-surface-overlay transition-all"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
