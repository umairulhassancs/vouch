'use client';

import React, { useState } from 'react';
import { QrCode, RefreshCw, Printer, CheckCircle2, ShieldAlert, Database, Download } from 'lucide-react';

// Generate a random 4-char alphanumeric chunk (no ambiguous chars)
function generateChunk() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let chunk = '';
  for (let i = 0; i < 4; i++) {
    chunk += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return chunk;
}

export default function VendorQRGenerator() {
  const [count, setCount] = useState<number>(24);
  const [productType, setProductType] = useState<string>('sticker');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [savedToDb, setSavedToDb] = useState<boolean>(false);

  // Step 1: Generate codes locally (no API call, no DB save)
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    setSavedToDb(false);

    try {
      const codes: string[] = [];
      for (let i = 0; i < count; i++) {
        codes.push(`VCH-${generateChunk()}-${generateChunk()}`);
      }
      setGeneratedCodes(codes);
    } catch (err: any) {
      setError(err.message || 'Failed to generate codes.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Step 2: Save generated codes to Firestore database (explicit action)
  const handleSaveToDb = async () => {
    if (generatedCodes.length === 0) return;
    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/qr/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codes: generatedCodes, productType }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save codes to database.');
      }

      setSavedToDb(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while saving to database.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Non-print controls wrapper */}
      <div className="print:hidden space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Admin QR Sticker Generator</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Generate unique QR codes, preview them, and optionally save to the database for activation tracking.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-start gap-2.5 max-w-xl">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Generate codes */}
        <form onSubmit={handleGenerate} className="max-w-xl p-6 rounded-2xl bg-surface-elevated border border-border/50 space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Step 1 — Generate Codes</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Batch Count (Max 100)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                required
                disabled={isGenerating}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Tag Type
              </label>
              <select
                disabled={isGenerating}
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="sticker">QR Sticker</option>
                <option value="classic">Classic Keychain</option>
                <option value="whistle">Whistle Keychain</option>
                <option value="gps">GPS Smart Tracker</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || count < 1 || count > 100}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-60 cursor-pointer"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <QrCode className="w-4 h-4" />
                <span>Generate {count} Codes</span>
              </>
            )}
          </button>
        </form>

        {/* Step 2: Actions — Save / Print */}
        {generatedCodes.length > 0 && (
          <div className="max-w-xl space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Step 2 — Save & Print</h2>

            <div className="flex gap-3">
              {/* Save to Database */}
              {!savedToDb ? (
                <button
                  onClick={handleSaveToDb}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-teal text-white rounded-xl text-sm font-semibold hover:bg-teal-dark transition-all shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Database className="w-4 h-4" />
                      Save {generatedCodes.length} Codes to Database
                    </>
                  )}
                </button>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-2 py-3 bg-success/10 border border-success/20 text-success rounded-xl text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Saved to Database!
                </div>
              )}

              {/* Print */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-3 bg-surface-elevated border border-border text-foreground rounded-xl text-sm font-semibold hover:bg-surface-overlay transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print Sheet
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Printable Sheet View */}
      {generatedCodes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 print:hidden">
            Print Preview ({generatedCodes.length} Stickers)
          </h2>

          {/* Print Layout Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 bg-white border border-border/50 rounded-3xl print:border-0 print:p-0 print:m-0 print:grid-cols-3 print:gap-6 print:bg-transparent">
            {generatedCodes.map((code) => (
              <div
                key={code}
                className="bg-white border-2 border-dashed border-black/20 rounded-2xl p-4 flex flex-col items-center justify-between text-black aspect-square text-center select-none shadow-sm print:shadow-none print:border-black/30 print:break-inside-avoid print:w-[2.2in] print:h-[2.2in] print:mx-auto"
              >
                {/* Brand Header */}
                <div className="w-full flex items-center justify-center gap-1.5 border-b border-black/10 pb-1.5">
                  <div className="w-5 h-5 rounded bg-black flex items-center justify-center">
                    <QrCode className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest font-mono text-black uppercase">
                    Vouch
                  </span>
                </div>

                {/* QR Code image */}
                <div className="my-2 p-1 bg-white border border-black/5 rounded-lg">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://vouch.pk/scan/${code}`}
                    alt={code}
                    width="80"
                    height="80"
                    className="w-20 h-20 print:w-20 print:h-20"
                  />
                </div>

                {/* Info Text & Unique Code */}
                <div className="space-y-0.5">
                  <p className="text-[7px] text-black/60 font-semibold uppercase tracking-wider leading-none">
                    Scan if found
                  </p>
                  <p className="text-[9px] font-bold font-mono text-black tracking-widest leading-none">
                    {code}
                  </p>
                  <p className="text-[6px] text-black/40 font-mono leading-none">
                    vouch.pk
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
