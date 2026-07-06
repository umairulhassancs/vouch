'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal, getShippingFee, getTotal } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface-elevated border-l border-border z-[61] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold font-[family-name:var(--font-display)]">
                Your Cart ({items.length})
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-surface-overlay transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-2xl bg-surface-overlay flex items-center justify-center mb-4">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="text-primary font-medium hover:underline"
                  >
                    Browse products →
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.slug}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="flex gap-4 p-4 rounded-2xl bg-surface-overlay/50 border border-border/50"
                  >
                    {/* Product image */}
                    <div className="w-20 h-20 rounded-xl bg-surface flex-shrink-0 overflow-hidden">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold truncate">{item.product.name}</h3>
                      <p className="text-sm text-primary font-semibold mt-1">
                        {formatPrice(item.product.price)}
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.slug, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.slug, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => removeItem(item.product.slug)}
                          className="ml-auto p-1.5 rounded-lg hover:bg-danger/10 text-muted-foreground hover:text-danger transition-all cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-3">
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
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-border/50">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>

                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all active:scale-[0.97] shadow-lg shadow-primary/25 mt-2"
                >
                  View Cart & Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-xs text-center text-muted-foreground">
                  💵 Cash on Delivery available nationwide
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
