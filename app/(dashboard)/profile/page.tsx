'use client';

import React, { useState, useEffect } from 'react';
import {
  User, Mail, Phone, Bell, Shield, CheckCircle, RefreshCw,
  AlertCircle, ShieldCheck, ShieldAlert, UserCheck, Send, AlertTriangle,
  Lock,
} from 'lucide-react';
import { useAuth } from '@/hooks';
import { db } from '@/lib/firebase/client';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { verifyEmail } from '@/lib/firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const { user } = useAuth();

  // Form states
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifySMS, setNotifySMS] = useState(false);

  // UI states
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  // Sync state with user values
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhone(user.phone || '');
      setEmergencyName(user.emergencyName || '');
      setEmergencyPhone(user.emergencyPhone || '');
      setNotifyEmail(user.notifyEmail !== undefined ? user.notifyEmail : true);
      setNotifyPush(user.notifyPush !== undefined ? user.notifyPush : true);
      setNotifySMS(user.notifySMS !== undefined ? user.notifySMS : false);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName: displayName.trim(),
        phone: phone.trim(),
        emergencyName: emergencyName.trim(),
        emergencyPhone: emergencyPhone.trim(),
        notifyEmail,
        notifyPush,
        notifySMS,
        updatedAt: serverTimestamp(),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      console.error('Error updating user profile:', err);
      setError(err.message || 'Failed to update profile settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendVerification = async () => {
    setIsSendingVerification(true);
    setError(null);
    try {
      await verifyEmail();
      setVerificationSent(true);
      setTimeout(() => setVerificationSent(false), 8000);
    } catch (err: any) {
      console.error('Error sending verification email:', err);
      setError(err.message || 'Failed to send verification email. Please try again.');
    } finally {
      setIsSendingVerification(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const hasEmergencyContact = !!(user.emergencyName || user.emergencyPhone);

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Profile & Identity</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account, verification, and finder contact details
        </p>
      </div>

      {/* Email verification banner — shown if unverified */}
      <AnimatePresence>
        {!user.emailVerified && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mb-6 p-4 rounded-2xl bg-warning/10 border border-warning/30 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <div className="flex items-start gap-3 flex-1">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-warning">Email not verified</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Verify your Gmail to boost finder trust. Verified accounts can display their email to finders as a contact option.
                </p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-start sm:items-end gap-1">
              {verificationSent ? (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-success">
                  <CheckCircle className="w-4 h-4" /> Check your inbox!
                </span>
              ) : (
                <button
                  onClick={handleSendVerification}
                  disabled={isSendingVerification}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-warning text-white rounded-xl text-xs font-semibold hover:bg-warning/90 transition-all cursor-pointer disabled:opacity-60 shadow-sm shadow-warning/25"
                >
                  {isSendingVerification ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  Send Verification Link
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Side: Summary card */}
        <div className="md:col-span-1 space-y-4">
          {/* Identity card */}
          <div className="p-5 rounded-3xl bg-surface-elevated border border-border/50 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
              <User className="w-8 h-8 text-primary" />
              {user.emailVerified && (
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </span>
              )}
            </div>
            <h2 className="font-bold text-lg truncate">{user.displayName || 'Vouch User'}</h2>
            <p className="text-xs text-muted-foreground truncate mb-3">{user.email}</p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <Shield className="w-3.5 h-3.5" />
              {user.plan.toUpperCase()} Plan
            </span>
          </div>

          {/* Account status card */}
          <div className="p-5 rounded-3xl bg-surface-elevated border border-border/50 space-y-3 text-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account Status</h3>
            <div className="flex items-center justify-between py-1.5 border-b border-border/30">
              <span className="text-muted-foreground text-xs">Joined</span>
              <span className="font-medium text-foreground text-xs">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-border/30">
              <span className="text-muted-foreground text-xs">Email</span>
              {user.emailVerified ? (
                <span className="flex items-center gap-1 text-success text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-warning text-xs font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5" /> Unverified
                </span>
              )}
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-border/30">
              <span className="text-muted-foreground text-xs">Phone</span>
              <span className={`text-xs font-medium ${user.phone ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                {user.phone ? 'Added' : 'Not set'}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-muted-foreground text-xs">Emergency Contact</span>
              {hasEmergencyContact ? (
                <span className="flex items-center gap-1 text-success text-xs font-semibold">
                  <UserCheck className="w-3.5 h-3.5" /> Set
                </span>
              ) : (
                <span className="text-xs text-muted-foreground/50">Not set</span>
              )}
            </div>
          </div>

          {/* Privacy note */}
          <div className="p-4 rounded-2xl bg-surface-elevated border border-border/50">
            <div className="flex gap-2">
              <Lock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your contact details are <strong className="text-foreground">never shared publicly</strong> without your explicit permission on each item&apos;s settings.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Settings form */}
        <div className="md:col-span-2 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-start gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3.5 rounded-xl bg-success/10 border border-success/20 text-success text-sm flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>Profile saved successfully.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Personal Information */}
            <div className="p-6 rounded-3xl bg-surface-elevated border border-border/50 space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground border-b border-border/30 pb-2">Personal Information</h3>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Gmail / Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full pl-10 pr-16 py-3 bg-surface/50 border border-border rounded-xl text-foreground/60 text-sm cursor-not-allowed"
                  />
                  <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full ${user.emailVerified ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'}`}>
                    {user.emailVerified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground/60 mt-1.5 ml-1">
                  Your email is set at signup. Enable it on item settings to show to finders.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Mobile Phone (for SMS Alerts)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="p-6 rounded-3xl bg-surface-elevated border border-border/50 space-y-4">
              <div className="border-b border-border/30 pb-2">
                <h3 className="font-semibold text-sm text-muted-foreground">Emergency Contact</h3>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  Set a trusted person finders can contact. You control which items show this on their scan page.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Contact Name / Relation</label>
                  <div className="relative">
                    <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <input
                      type="text"
                      placeholder="e.g. Ahmed / Brother / Wife"
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Contact Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <input
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              {hasEmergencyContact && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 rounded-xl bg-primary/5 border border-primary/15 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Go to any <strong className="text-foreground">Item → Settings</strong> to choose which items show this contact to finders.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Alert Preferences */}
            <div className="p-6 rounded-3xl bg-surface-elevated border border-border/50 space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground border-b border-border/30 pb-2">Alert Preferences</h3>
              <div className="space-y-1">
                {[
                  {
                    id: 'email',
                    icon: Mail,
                    label: 'Email Notifications',
                    desc: 'Receive scan reports and message threads to your email inbox.',
                    checked: notifyEmail,
                    change: setNotifyEmail,
                  },
                  {
                    id: 'push',
                    icon: Bell,
                    label: 'Browser Push Notifications',
                    desc: 'Real-time badge alerts inside your browser dashboard.',
                    checked: notifyPush,
                    change: setNotifyPush,
                  },
                  {
                    id: 'sms',
                    icon: Phone,
                    label: 'SMS Text Alerts',
                    desc: 'Get instant text warnings when your items are scanned.',
                    checked: notifySMS,
                    change: setNotifySMS,
                  },
                ].map((pref) => (
                  <label key={pref.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface/50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pref.checked}
                      onChange={(e) => pref.change(e.target.checked)}
                      className="mt-1 accent-primary rounded w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <pref.icon className="w-3.5 h-3.5 text-muted-foreground" />
                        {pref.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{pref.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                'Save Profile'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
