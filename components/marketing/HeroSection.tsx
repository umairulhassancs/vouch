'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroScene = dynamic(
  () => import('@/components/marketing/HeroScene').then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 animate-pulse" />
      </div>
    ),
  }
);

const headlineWords = ['Lost,', 'But', 'Never', 'Gone.'];

class WebGLErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("WebGL crash caught by boundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function KeychainFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Floating animation wrapper */}
      <div className="relative w-64 h-96 flex flex-col items-center justify-center animate-float">
        {/* Torus Ring at the top */}
        <div className="w-16 h-16 rounded-full border-[6px] border-slate-400/80 shadow-lg relative -mb-5 z-0" />
        
        {/* Main Body */}
        <div className="w-48 h-72 rounded-[24px] bg-[#1a1a2e] border-2 border-slate-700/50 shadow-2xl relative flex flex-col items-center justify-between p-4 overflow-hidden z-10">
          {/* Glass sheen overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />

          {/* Top brand purple bar */}
          <div className="w-full h-4 bg-primary rounded-t-[10px]" />

          {/* QR Code Face */}
          <div className="w-28 h-28 bg-white rounded-xl flex flex-col items-center justify-center p-2.5 relative shadow-inner">
            {/* Mock QR pattern */}
            <div className="w-full h-full bg-slate-900 rounded-sm relative flex flex-wrap p-1 gap-1">
              <div className="w-5 h-5 bg-slate-900 border-2 border-white rounded-sm" />
              <div className="w-5 h-5 bg-slate-900 border-2 border-white rounded-sm ml-auto" />
              <div className="w-5 h-5 bg-slate-900 border-2 border-white rounded-sm mt-auto" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-slate-900 border border-white" />
            </div>
          </div>

          {/* Bottom VOUCH brand tag */}
          <div className="w-full flex flex-col items-center gap-1.5 pb-2">
            {/* Teal Line */}
            <div className="w-20 h-1 bg-teal rounded-full" />
            {/* Purple Vouch Text Box */}
            <div className="px-3 py-0.5 bg-primary/20 rounded-md border border-primary/30">
              <span className="text-[10px] font-bold tracking-widest text-primary-light font-mono">VOUCH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    // Detect WebGL support
    try {
      const canvas = document.createElement('canvas');
      const support = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setHasWebGL(support);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[#06060B]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(108,92,231,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(0,184,148,0.06),transparent_50%)]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-80px)]">
          {/* Left: Copy */}
          <div className="space-y-8">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Pakistan&apos;s First Smart Lost &amp; Found
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight font-[family-name:var(--font-display)]">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word}
                  className={`inline-block mr-4 ${
                    i === 0 || i === 3 ? 'text-gradient' : ''
                  }`}
                  initial={{ opacity: 0, y: 60 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.08,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Attach a Vouch QR to anything you value. If it&apos;s lost, the finder scans it
              and you&apos;re connected instantly — your privacy fully protected. No app needed.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-xl font-semibold text-base hover:bg-primary/90 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-primary/30 group"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground rounded-xl font-semibold text-base hover:bg-surface-overlay transition-all duration-200 active:scale-[0.97] group"
              >
                See How It Works
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Mini trust */}
            <motion.div
              className="flex items-center gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-primary/40 to-teal/40 flex items-center justify-center text-[10px] font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">10,000+</span> items protected
              </p>
            </motion.div>
          </div>

          {/* Right: 3D Scene */}
          <motion.div
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden mt-8 lg:mt-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Glow behind the 3D scene */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 rounded-full blur-[100px]" />
            <WebGLErrorBoundary fallback={<KeychainFallback />}>
              {hasWebGL ? <HeroScene /> : <KeychainFallback />}
            </WebGLErrorBoundary>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-border/50 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 rounded-full bg-primary"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
