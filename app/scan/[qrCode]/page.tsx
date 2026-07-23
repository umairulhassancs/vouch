'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  Shield, MessageSquare, Phone, CheckCircle, AlertTriangle,
  ShieldAlert, Mail, RefreshCw, UserCheck,
} from 'lucide-react';
import { VouchLogo } from '@/components/ui/VouchLogo';

function Loader({ className }: { className?: string }) {
  return <RefreshCw className={`${className ?? ''} animate-spin`} />;
}

export default function ScanPage({ params }: { params: Promise<{ qrCode: string }> }) {
  const { qrCode: rawQrCode } = use(params);
  const qrCode = rawQrCode.toUpperCase();
  const [item, setItem] = useState<any>(null);
  const [itemLoading, setItemLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Finder form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  // Scan lifecycle
  const [scanId, setScanId] = useState<string | null>(null);

  useEffect(() => {
    async function loadItemAndLogScan() {
      try {
        setItemLoading(true);
        setError(null);

        let coords = { latitude: 0, longitude: 0, accuracy: 0 };
        let permissionGranted = false;

        if (typeof window !== 'undefined' && navigator.geolocation) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 4000,
                enableHighAccuracy: true,
              });
            });
            coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            };
            permissionGranted = true;
          } catch {
            // Geolocation denied — continue without it
          }
        }

        const res = await fetch('/api/qr/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            qrCode,
            userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
            location: {
              lat: coords.latitude,
              lng: coords.longitude,
              accuracy: coords.accuracy,
              permissionGranted,
              city: '',
              country: '',
            },
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({ error: 'Scan request failed' }));
          throw new Error(errData.error || 'Failed to scan QR code.');
        }

        const data = await res.json();

        if (data.isUnassigned) {
          window.location.href = `/activate/${qrCode}`;
          return;
        }

        const returnedScanId = data.scanId || 'SCN-' + Math.random().toString(36).substring(2, 11).toUpperCase();

        setItem(data.item);
        setScanId(returnedScanId);
      } catch (err: any) {
        setError(err.message || 'Unable to load item details.');
      } finally {
        setItemLoading(false);
      }
    }

    loadItemAndLogScan();
  }, [qrCode]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !scanId || !item) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qrCode,
          scanId,
          finderName: name.trim(),
          finderEmail: email.trim(),
          text: message.trim(),
          location: item.lastLocation || null,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Message sending failed' }));
        throw new Error(errData.error || 'Failed to send message.');
      }

      setMessageSent(true);
    } catch (err: any) {
      alert(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (itemLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <Loader className="w-8 h-8 text-primary mb-2" />
        <p className="text-muted-foreground text-sm">Locating item details...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-danger" />
          </div>
          <h1 className="text-xl font-bold mb-2">QR Code Error</h1>
          <p className="text-muted-foreground text-sm mb-6">{error || 'This QR Code is invalid.'}</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full py-3 bg-surface border border-border rounded-xl text-sm font-semibold hover:bg-surface-overlay transition-all"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const fs = item.finderSettings || {};
  const ownerName = fs.showFirstName ? (item.label?.split("'s")[0] || 'the owner') : 'the owner';

  // Determine which emergency contact to show
  const showProfileEmergency = fs.showProfileEmergency && item.ownerEmergencyPhone;
  const showCustomEmergency = fs.showEmergency && fs.emergencyPhone;
  const callPhone = fs.allowCall
    ? (fs.emergencyPhone || item.ownerEmergencyPhone || '')
    : '';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <VouchLogo markOnly variant="dark" height={36} />
          </div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">You found something!</h1>
          <p className="text-muted-foreground text-sm mt-2">
            This item is registered and protected by Vouch
          </p>
        </div>

        {/* Item name card */}
        <div className="rounded-2xl bg-surface-elevated border border-border/50 p-6 mb-4 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Protected Item</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-display)]">{item.label}</p>
        </div>

        {/* Profile emergency contact (from owner profile) */}
        {showProfileEmergency && (
          <div className="rounded-2xl bg-warning/10 border border-warning/20 p-5 mb-4 text-center">
            <p className="text-xs text-warning font-bold uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> Emergency Contact
            </p>
            <p className="text-sm font-bold text-foreground">
              {item.ownerEmergencyName || 'Emergency Contact'}:{' '}
              <a href={`tel:${item.ownerEmergencyPhone}`} className="text-primary hover:underline font-mono">
                {item.ownerEmergencyPhone}
              </a>
            </p>
          </div>
        )}

        {/* Custom item emergency contact */}
        {showCustomEmergency && (
          <div className="rounded-2xl bg-warning/10 border border-warning/20 p-5 mb-4 text-center">
            <p className="text-xs text-warning font-bold uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> Recovery Contact
            </p>
            <p className="text-sm font-bold text-foreground">
              {fs.emergencyName || 'Contact'}:{' '}
              <a href={`tel:${fs.emergencyPhone}`} className="text-primary hover:underline font-mono">
                {fs.emergencyPhone}
              </a>
            </p>
          </div>
        )}

        {/* Owner email (shown if verified + enabled) */}
        {fs.showOwnerEmail && item.ownerEmail && (
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5 mb-4 text-center">
            <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
              <UserCheck className="w-4 h-4" /> Verified Owner Email
            </p>
            <a
              href={`mailto:${item.ownerEmail}`}
              className="text-sm font-bold text-primary hover:underline font-mono"
            >
              {item.ownerEmail}
            </a>
          </div>
        )}

        {/* Custom finder message */}
        {fs.customMessage && (
          <div className="rounded-2xl bg-surface-elevated border border-border/50 p-5 mb-4">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> Message from owner
            </p>
            <p className="text-sm text-foreground leading-relaxed">&ldquo;{fs.customMessage}&rdquo;</p>
          </div>
        )}

        {/* Message form */}
        <div className="rounded-2xl bg-surface-elevated border border-border/50 p-5 mb-4 space-y-4">
          {messageSent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold mb-1">Message Sent!</h3>
              <p className="text-xs text-muted-foreground">
                The owner has been notified immediately. Thank you for your kindness!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-3">
              <p className="text-sm font-medium">Send a secure message to {ownerName}</p>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <input
                type="email"
                placeholder="Your email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <textarea
                rows={3}
                required
                placeholder="Where did you find it? How can the owner reach you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="w-full py-3 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader className="w-4 h-4" /> : 'Send Message'}
              </button>
            </form>
          )}

          {/* Direct call button */}
          {callPhone && (
            <a
              href={`tel:${callPhone}`}
              className="w-full py-3 border border-border text-foreground rounded-xl text-sm font-semibold hover:bg-surface-overlay transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" /> Call Owner / Contact
            </a>
          )}

          {/* Email owner link */}
          {fs.showOwnerEmail && item.ownerEmail && (
            <a
              href={`mailto:${item.ownerEmail}`}
              className="w-full py-3 border border-primary/30 text-primary rounded-xl text-sm font-semibold hover:bg-primary/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" /> Email Owner
            </a>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Shield className="w-3.5 h-3.5" /> Owner&apos;s identity is protected by Vouch
        </p>
        <p className="text-center text-xs text-muted-foreground mt-2">
          <Link href="https://vouch.pk" className="hover:underline">vouch.pk</Link>
        </p>
      </div>
    </div>
  );
}
