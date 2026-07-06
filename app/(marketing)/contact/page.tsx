'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
  };

  const inputClass =
    'w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all';

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(108,92,231,0.12),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Have a question, feedback, or business inquiry? We would love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          {/* Form */}
          <div className="rounded-2xl bg-surface-elevated border border-border/50 p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Message Sent!</h2>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. We will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className={inputClass}
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className={inputClass}
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      className={inputClass}
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      className={inputClass}
                      placeholder="Your message..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all active:scale-[0.97] shadow-lg shadow-primary/25 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact info sidebar */}
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: 'Email',
                content: 'hello@vouch.pk',
                href: 'mailto:hello@vouch.pk',
                sub: 'We reply within 24 hours',
              },
              {
                icon: Phone,
                title: 'Phone',
                content: '+92 300 123 4567',
                href: 'tel:+923001234567',
                sub: 'Mon-Sat, 9 AM - 6 PM PKT',
              },
              {
                icon: MapPin,
                title: 'Office',
                content: 'Islamabad, Pakistan',
                sub: 'By appointment only',
              },
              {
                icon: Clock,
                title: 'Business Hours',
                content: 'Monday - Saturday',
                sub: '9:00 AM - 6:00 PM PKT',
              },
            ].map((info) => (
              <div
                key={info.title}
                className="p-5 rounded-2xl bg-surface-elevated border border-border/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {info.title}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="font-medium">{info.content}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5">{info.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
