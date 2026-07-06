'use client';

import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, AlertCircle, Save, CheckCircle, RefreshCw,
  MessageSquare, Mail, Phone, ShieldAlert, UserCheck, Eye, Info,
} from 'lucide-react';
import { db } from '@/lib/firebase/client';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/hooks';
import { motion, AnimatePresence } from 'framer-motion';

export default function ItemSettingsPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = use(params);
  const router = useRouter();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Item details
  const [itemLabel, setItemLabel] = useState('');

  // Settings states
  const [showFirstName, setShowFirstName] = useState(true);
  const [showOwnerEmail, setShowOwnerEmail] = useState(false);
  const [allowCall, setAllowCall] = useState(false);
  const [showProfileEmergency, setShowProfileEmergency] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  useEffect(() => {
    async function loadItem() {
      try {
        setIsLoading(true);
        const docRef = doc(db, 'items', itemId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError('Item not found or register first.');
          setIsLoading(false);
          return;
        }

        const data = docSnap.data();
        setItemLabel(data.label || itemId);

        const settings = data.finderSettings || {};
        setShowFirstName(settings.showFirstName !== undefined ? settings.showFirstName : true);
        setShowOwnerEmail(settings.showOwnerEmail !== undefined ? settings.showOwnerEmail : false);
        setAllowCall(settings.allowCall !== undefined ? settings.allowCall : false);
        setShowProfileEmergency(settings.showProfileEmergency !== undefined ? settings.showProfileEmergency : false);
        setShowEmergency(settings.showEmergency !== undefined ? settings.showEmergency : false);
        setEmergencyName(settings.emergencyName || '');
        setEmergencyPhone(settings.emergencyPhone || '');
        setCustomMessage(settings.customMessage || '');
      } catch (err: any) {
        console.error('Error loading item settings:', err);
        setError('Failed to load item configuration settings.');
      } finally {
        setIsLoading(false);
      }
    }
    loadItem();
  }, [itemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const itemRef = doc(db, 'items', itemId);
      await updateDoc(itemRef, {
        finderSettings: {
          showFirstName,
          showOwnerEmail,
          allowCall,
          showProfileEmergency,
          showEmergency,
          emergencyName: emergencyName.trim(),
          emergencyPhone: emergencyPhone.trim(),
          customMessage: customMessage.trim(),
        },
        updatedAt: serverTimestamp(),
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error updating item settings:', err);
      setError(err.message || 'Failed to update settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <RefreshCw className="w-8 h-8 text-primary animate-spin mb-2" />
        <p className="text-muted-foreground text-sm">Loading configuration...</p>
      </div>
    );
  }

  const profileHasEmergency = !!(user?.emergencyName || user?.emergencyPhone);

  return (
    <div className="max-w-2xl">
      {/* Back link */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Items
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Item Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Configure what finders see when they scan <strong className="text-foreground">{itemLabel}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Alerts */}
        <AnimatePresence>
          {success && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="p-3.5 rounded-xl bg-success/10 border border-success/20 text-success text-sm flex items-center gap-2">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>Finder settings saved successfully.</span>
            </motion.div>
          )}
        </AnimatePresence>
        {error && (
          <div className="p-3.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Privacy & Visibility */}
        <div className="p-6 rounded-3xl bg-surface-elevated border border-border/50 space-y-1">
          <h3 className="text-sm font-semibold text-muted-foreground border-b border-border/30 pb-2 mb-3">Privacy &amp; Visibility</h3>

          <Toggle
            checked={showFirstName}
            onChange={setShowFirstName}
            icon={<Eye className="w-4 h-4" />}
            label="Display Your Name to Finder"
            desc="Finders will see your first name so they know who they're messaging."
          />

          <Toggle
            checked={showOwnerEmail}
            onChange={setShowOwnerEmail}
            icon={<Mail className="w-4 h-4" />}
            label="Show Owner Email to Finder"
            desc={
              user?.emailVerified
                ? `Finders will see a mailto link for ${user.email}`
                : 'Your email must be verified first. Go to Profile to send a verification link.'
            }
            disabled={!user?.emailVerified}
            disabledNote={!user?.emailVerified ? 'Verify email first' : undefined}
          />

          <Toggle
            checked={allowCall}
            onChange={setAllowCall}
            icon={<Phone className="w-4 h-4" />}
            label="Enable Direct Phone Call"
            desc="Shows a call button on the scan page using the emergency phone number below."
          />
        </div>

        {/* Custom Finder Message */}
        <div className="p-6 rounded-3xl bg-surface-elevated border border-border/50 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground border-b border-border/30 pb-2">Message to Finder</h3>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> Custom Message (shown at top of scan page)
            </label>
            <textarea
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="e.g. If you found my wallet, please contact me immediately. Thank you!"
              className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-6 rounded-3xl bg-surface-elevated border border-border/50 space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground border-b border-border/30 pb-2">Emergency Contact on Scan Page</h3>

          {/* Use Profile Emergency */}
          <div className="space-y-2">
            <Toggle
              checked={showProfileEmergency}
              onChange={setShowProfileEmergency}
              icon={<UserCheck className="w-4 h-4" />}
              label="Show Profile Emergency Contact"
              desc={
                profileHasEmergency
                  ? `Shows: ${user?.emergencyName || 'Contact'} · ${user?.emergencyPhone || 'No phone'}`
                  : 'No emergency contact set in your profile yet. Go to Profile to add one.'
              }
              disabled={!profileHasEmergency}
              disabledNote={!profileHasEmergency ? 'Set in Profile first' : undefined}
            />
          </div>

          {/* OR custom contact for this item */}
          <div className="flex items-center justify-between border-b border-border/30 pb-2 pt-1">
            <div>
              <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-muted-foreground" />
                Custom Contact for this Item
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Override with a different contact for this specific item.</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer shrink-0 ml-3">
              <input
                type="checkbox"
                checked={showEmergency}
                onChange={(e) => setShowEmergency(e.target.checked)}
                className="accent-primary rounded w-4 h-4"
              />
              <span className="text-xs text-muted-foreground">Enable</span>
            </label>
          </div>

          <AnimatePresence>
            {(showEmergency || allowCall) && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Contact Name / Label</label>
                  <input
                    type="text"
                    required={showEmergency || allowCall}
                    placeholder="e.g. Owner / Brother / Wife"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Contact Phone Number</label>
                  <input
                    type="tel"
                    required={showEmergency || allowCall}
                    placeholder="+92 300 1234567"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showEmergency && !allowCall && !showProfileEmergency && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/10 border border-border/30">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">Enable at least one contact option above to help finders reach you or someone you trust.</p>
            </div>
          )}
        </div>

        {/* Save button */}
        <button
          type="submit"
          disabled={isSaving}
          className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Finder Settings
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// Reusable toggle row component
function Toggle({
  checked,
  onChange,
  icon,
  label,
  desc,
  disabled,
  disabledNote,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  icon: React.ReactNode;
  label: string;
  desc: string;
  disabled?: boolean;
  disabledNote?: string;
}) {
  return (
    <label className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface/50 cursor-pointer'}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        className="mt-1 accent-primary rounded w-4 h-4"
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
          <span className="text-muted-foreground">{icon}</span>
          {label}
          {disabledNote && (
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-warning/15 text-warning font-semibold">
              {disabledNote}
            </span>
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </label>
  );
}
