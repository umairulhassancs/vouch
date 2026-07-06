/**
 * VouchLogo — Inline SVG wordmark
 * One large gradient "V" + smaller "ouch" text beside it.
 */

import React from 'react';

interface VouchLogoProps {
  variant?: 'dark' | 'light';
  markOnly?: boolean;
  className?: string;
  height?: number;
}

export function VouchLogo({
  variant = 'dark',
  markOnly = false,
  className,
  height = 36,
}: VouchLogoProps) {
  const textColor = variant === 'dark' ? '#FFFFFF' : '#0F0F14';
  const id = `vl-${variant}`;

  // Mark-only: just the big V in a circle badge
  if (markOnly) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        height={height}
        className={className}
        aria-label="Vouch"
        role="img"
        fill="none"
      >
        <defs>
          <linearGradient id={`${id}-mk`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6C5CE7" />
            <stop offset="100%" stopColor="#00B894" />
          </linearGradient>
        </defs>
        {/* Badge circle */}
        <circle cx="20" cy="20" r="18" fill={variant === 'dark' ? 'rgba(108,92,231,0.12)' : 'rgba(108,92,231,0.08)'} />
        <circle cx="20" cy="20" r="18" stroke="rgba(108,92,231,0.3)" strokeWidth="1" fill="none" />
        {/* V strokes */}
        <path
          d="M10 10 L20 30 L30 10"
          stroke={`url(#${id}-mk)`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  // Full wordmark: big V + small "ouch"
  // ViewBox: wide enough for V (40px) + "ouch" text (~70px) = 120 wide, 44 tall
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 114 44"
      height={height}
      className={className}
      aria-label="Vouch"
      role="img"
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-vg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#00B894" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Big "V" — left arm (purple), right arm (teal), meeting at sharp tip ── */}
      {/* Left diagonal stroke */}
      <path
        d="M4 4 L22 40"
        stroke="#6C5CE7"
        strokeWidth="6.5"
        strokeLinecap="round"
        fill="none"
        filter={`url(#${id}-glow)`}
      />
      {/* Right diagonal stroke */}
      <path
        d="M40 4 L22 40"
        stroke="#00B894"
        strokeWidth="6.5"
        strokeLinecap="round"
        fill="none"
        filter={`url(#${id}-glow)`}
      />
      {/* Glowing tip accent */}
      <circle cx="22" cy="40" r="3" fill="#00C9A7" opacity="0.55" />

      {/* ── "ouch" text — sits at cap-height aligned to the V ── */}
      <text
        x="44"
        y="36"
        fontFamily="'DM Sans', 'Outfit', 'Inter', system-ui, sans-serif"
        fontWeight="700"
        fontSize="26"
        letterSpacing="-0.8"
        fill={textColor}
      >
        ouch
      </text>
    </svg>
  );
}
