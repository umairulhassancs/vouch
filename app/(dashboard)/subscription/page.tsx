'use client';

import React, { useState } from 'react';
import { Shield, Check, Crown, Zap, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks';
import { db } from '@/lib/firebase/client';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 'PKR 0',
    period: 'forever',
    desc: 'Basic QR protection for single personal belongings.',
    icon: Shield,
    slots: '1 Protected Item',
    color: 'border-border bg-surface-elevated/40 text-muted-foreground',
    buttonColor: 'bg-surface border border-border hover:bg-surface-overlay text-foreground',
    features: [
      '1 QR Code activation slot',
      'Basic scan alerts via Email',
      'Secure anonymous finder chat',
      'Static scan coordinates log',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 'PKR 499',
    period: 'month',
    desc: 'Perfect protection for keys, bags, and daily carry items.',
    icon: Zap,
    slots: '5 Protected Items',
    featured: true,
    color: 'border-primary/40 bg-primary/5 text-primary',
    buttonColor: 'bg-primary text-on-primary hover:bg-primary/90 shadow-lg shadow-primary/25',
    features: [
      '5 QR Code activation slots',
      'Instant SMS text alerts on scans',
      'Interactive GPS location maps',
      'Finder message file attachments',
      'Priority finder notifications',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'PKR 999',
    period: 'month',
    desc: 'Ultimate tracker & badge protection for expensive tech & luggage.',
    icon: Crown,
    slots: '15 Protected Items',
    color: 'border-warning/30 bg-warning/5 text-warning',
    buttonColor: 'bg-warning text-black hover:bg-warning/90 shadow-lg shadow-warning/25',
    features: [
      '15 QR Code activation slots',
      'Masked owner voice calls',
      'Real-time theft location tracking',
      'Custom finder emergency display',
      'Premium metal keychain stickers',
      '24/7 dedicated recovery support',
    ],
  },
];

export default function SubscriptionPage() {
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleUpgrade = async (planId: string) => {
    if (!user) return;
    setLoadingPlan(planId);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        plan: planId,
        updatedAt: serverTimestamp(),
      });
      alert(`Successfully updated to ${planId.toUpperCase()} plan!`);
    } catch (err) {
      console.error('Error upgrading plan:', err);
      alert('Failed to upgrade subscription. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Pricing Plans
        </span>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] tracking-tight">
          Choose the right protection
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Activate more items and unlock advanced tracking maps, masked voice calls, and SMS warnings.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {plans.map((p) => {
          const isCurrent = user.plan === p.id;
          const Icon = p.icon;

          return (
            <div
              key={p.id}
              className={`rounded-3xl border p-6 flex flex-col justify-between relative transition-all duration-300 ${
                p.featured
                  ? 'border-primary bg-surface-elevated shadow-xl shadow-primary/5 md:-translate-y-2'
                  : 'border-border bg-surface-elevated/60'
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold bg-primary text-on-primary uppercase tracking-wider">
                  Popular Option
                </span>
              )}

              <div>
                {/* Icon & Title */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    p.featured ? 'bg-primary/15 text-primary' : 'bg-muted/10 text-muted-foreground'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground/80 font-mono">
                    {p.slots}
                  </span>
                </div>

                {/* Price */}
                <h3 className="text-lg font-bold font-[family-name:var(--font-display)]">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">{p.desc}</p>

                <div className="my-5 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-[family-name:var(--font-display)] text-foreground">
                    {p.price}
                  </span>
                  <span className="text-xs text-muted-foreground">/{p.period}</span>
                </div>

                {/* Features */}
                <div className="space-y-3 pt-5 border-t border-border/30">
                  {p.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                {isCurrent ? (
                  <div className="w-full text-center py-3 bg-muted/20 border border-border/50 text-muted-foreground rounded-xl text-xs font-bold uppercase tracking-wider">
                    Current Plan
                  </div>
                ) : (
                  <button
                    onClick={() => handleUpgrade(p.id)}
                    disabled={loadingPlan !== null}
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${p.buttonColor}`}
                  >
                    {loadingPlan === p.id ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : p.id === 'free' ? (
                      'Downgrade'
                    ) : (
                      'Upgrade Now'
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust banner */}
      <div className="mt-12 p-5 rounded-3xl border border-border/50 bg-surface-elevated/40 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left justify-between max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-bold">100% Secure Payment Guarantee</h4>
            <p className="text-xs text-muted-foreground mt-0.5">All billing statements processed with encrypted payment integrations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
