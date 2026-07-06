'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  return (
    <div className="min-h-screen pt-24 pb-24 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.5 }}
          >
            <CheckCircle className="w-10 h-10 text-success" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-3">
            Order Placed!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your order. Your Vouch products are on the way!
          </p>
        </motion.div>

        {/* Order details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-2xl bg-surface-elevated border border-border/50 p-6 text-left mb-8"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Order Number</span>
              <span className="font-mono font-semibold text-primary">{orderId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Payment Method</span>
              <span className="font-medium">Cash on Delivery</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estimated Delivery</span>
              <span className="font-medium">3-5 business days</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Order Status Updates</p>
                <p className="text-xs text-muted-foreground">
                  We will send you updates via SMS and email as your order progresses.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What's next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="rounded-2xl bg-surface-elevated border border-border/50 p-6 text-left mb-8"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-teal" />
            What happens next?
          </h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
              Your order is being confirmed by our team
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
              Once shipped, you will receive a tracking update
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
              Pay cash when it arrives — then scan the QR to activate!
            </li>
          </ol>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-xl font-semibold hover:bg-surface-overlay transition-all"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
