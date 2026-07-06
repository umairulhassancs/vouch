'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'purple' | 'teal';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  const variants = {
    default: 'bg-muted text-foreground/80',
    success: 'bg-success/15 text-success',
    danger: 'bg-danger/15 text-danger',
    warning: 'bg-warning/15 text-warning',
    purple: 'bg-primary/15 text-primary',
    teal: 'bg-teal/15 text-teal',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
