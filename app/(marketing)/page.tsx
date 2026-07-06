'use client';

import React from 'react';
import { HeroSection } from '@/components/marketing/HeroSection';
import { StatsSection } from '@/components/marketing/StatsSection';
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection';
import { PrivacySection } from '@/components/marketing/PrivacySection';
import { ProductGridSection } from '@/components/marketing/ProductGridSection';
import { TestimonialSection } from '@/components/marketing/TestimonialSection';
import { CTASection } from '@/components/marketing/CTASection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <PrivacySection />
      <ProductGridSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
