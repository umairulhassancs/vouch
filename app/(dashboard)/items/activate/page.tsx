'use client';

import React, { useState } from 'react';
import { QrCode, CheckCircle, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useItems } from '@/hooks';

export default function ActivatePage() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [productType, setProductType] = useState('sticker');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { activateItem } = useItems();

  const handleActivate = async () => {
    if (!code.trim() || !name.trim()) {
      setError('Please fill in both the QR code and the item name.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await activateItem(code, name, productType);
      setStep(2);
    } catch (err: any) {
      console.error('Error activating item:', err);
      setError(err.message || 'Failed to activate item. Please check your QR Code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Activate New Item</h1>
        <p className="text-muted-foreground text-sm mt-1">Enter your Vouch QR code to protect a new item</p>
      </div>

      <div className="rounded-2xl bg-surface-elevated border border-border/50 p-6">
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {step === 1 ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">QR Code ID</label>
              <div className="relative">
                <QrCode className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <input
                  type="text"
                  placeholder="e.g. VCH-XXXX-XXXX"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Item Name</label>
              <input
                type="text"
                placeholder="e.g. My House Keys"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Product Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'sticker', label: 'QR Sticker' },
                  { id: 'classic', label: 'Classic Keychain' },
                  { id: 'whistle', label: 'Whistle Keychain' },
                  { id: 'gps', label: 'GPS Smart Tracker' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    disabled={isLoading}
                    onClick={() => setProductType(t.id)}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      productType === t.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-surface hover:bg-surface-overlay text-muted-foreground'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleActivate}
              disabled={isLoading || !code || !name}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Activate Item <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-success" />
            </div>
            <h2 className="text-xl font-bold mb-2">Item Activated!</h2>
            <p className="text-sm text-muted-foreground mb-6">
              <strong className="text-foreground">{name}</strong> is now protected by Vouch.
            </p>
            <button
              onClick={() => {
                setStep(1);
                setCode('');
                setName('');
                setProductType('sticker');
                setError(null);
              }}
              className="text-sm text-primary hover:underline cursor-pointer font-medium"
            >
              Activate another item
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
