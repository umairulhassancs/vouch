'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getShippingFee, getTotal } = useCartStore();

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 pt-4">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-8">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-3xl bg-surface-elevated flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you have not added anything to your cart yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Cart items */}
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.product.slug}
                  layout
                  className="flex gap-6 p-6 rounded-2xl bg-surface-elevated border border-border/50"
                >
                  {/* Product image */}
                  <div className="w-24 h-24 rounded-xl bg-surface flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.product.tagline}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.slug)}
                        className="p-2 rounded-xl hover:bg-danger/10 text-muted-foreground hover:text-danger transition-all cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-2 hover:bg-surface-overlay transition-colors disabled:opacity-30 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-2 text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                          className="px-3 py-2 hover:bg-surface-overlay transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-lg font-bold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-2xl bg-surface-elevated border border-border/50 p-6">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {getShippingFee() === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        formatPrice(getShippingFee())
                      )}
                    </span>
                  </div>
                  {getShippingFee() > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Free shipping on orders over Rs. 2,000
                    </p>
                  )}
                </div>

                <div className="flex justify-between font-semibold text-lg pt-4 border-t border-border/50 mb-6">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>

                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all active:scale-[0.97] shadow-lg shadow-primary/25"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  💵 Cash on Delivery — Pay when it arrives
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
