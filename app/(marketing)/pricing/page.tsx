'use client';

import React, { useState } from 'react';
import { Check, Zap } from 'lucide-react';
import { pricingPlans, products, faqItems } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const productEmojis: Record<string, string> = {
    sticker: '🏷️',
    classic: '🔑',
    whistle: '📯',
    gps: '📍',
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(108,92,231,0.12),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
            Simple, <span className="text-gradient">Honest</span> Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Buy the hardware. Choose a plan that fits. Protect what matters.
          </p>
        </div>
      </section>

      {/* Hardware Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-center mb-10">
          Hardware — One-Time Purchase
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.slug}
              className="p-5 rounded-2xl bg-surface-elevated border border-border/50 hover:border-primary/30 transition-all text-center flex flex-col items-center"
            >
              <div className="h-24 w-24 rounded-xl overflow-hidden bg-surface flex items-center justify-center mb-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover pointer-events-none select-none"
                  draggable="false"
                />
              </div>
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{product.tagline}</p>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <button
                onClick={() => addItem(product)}
                className="w-full py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-semibold hover:bg-primary/20 transition-all cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-6">
            Subscription Plans
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-surface-elevated border border-border/50">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                !isAnnual ? 'bg-primary text-on-primary shadow-lg shadow-primary/25' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                isAnnual ? 'bg-primary text-on-primary shadow-lg shadow-primary/25' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <Badge variant="success">Save 20%</Badge>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricingPlans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.name}
                className={`relative p-6 rounded-2xl border transition-all ${
                  plan.highlighted
                    ? 'bg-primary/5 border-primary/30 shadow-lg shadow-primary/10'
                    : 'bg-surface-elevated border-border/50'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="purple">
                      <Zap className="w-3 h-3 mr-1" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {price === 0 ? 'Free' : formatPrice(price)}
                  </span>
                  {price > 0 && (
                    <span className="text-muted-foreground text-sm">/month</span>
                  )}
                </div>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                    plan.highlighted
                      ? 'bg-primary text-on-primary hover:bg-primary/90 shadow-lg shadow-primary/25'
                      : 'bg-surface-overlay border border-border text-foreground hover:bg-muted'
                  }`}
                >
                  {plan.cta}
                </button>

                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqItems.map((faq, i) => (
            <div key={i} className="rounded-2xl bg-surface-elevated border border-border/50 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex items-center justify-between w-full px-6 py-4 text-left cursor-pointer hover:bg-surface-overlay/50 transition-colors"
              >
                <span className="font-medium pr-4">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openFaq === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground text-xl flex-shrink-0"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
