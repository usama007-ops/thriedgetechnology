/**
 * Home Page
 * Main landing page with all sections
 */

import { Metadata } from 'next'
import HeroSection from '@/components/sections/hero-section'
import ValuePropositionSection from '@/components/sections/value-proposition'
import { ServicesSection } from '@/components/sections/services-section'
import { WorkSection } from '@/components/sections/work-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ProcessSection } from '@/components/sections/process-section'
import { IndustriesSection } from '@/components/sections/industries-section'
import { ValueFeaturesSection } from '@/components/sections/value-features-section'
import { LatestArticlesSection } from '@/components/sections/latest-articles-section'
import BrandsMarquee from '@/components/sections/brands'

export const metadata: Metadata = {
  title: 'Thrill Edge Technologies | We Ship Software That Actually Works',
  description: 'Cutting-edge technology solutions for modern enterprises. Transform your business with Thrill Edge Technologies.',
  keywords: ['technology', 'innovation', 'enterprise solutions', 'digital transformation', 'software development', 'consulting'],
  openGraph: {
    title: 'Thrill Edge Technologies | We Ship Software That Actually Works',
    description: 'Cutting-edge technology solutions for modern enterprises.',
    type: 'website',
    url: 'https://thrilledge.com',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <BrandsMarquee />
      <ValuePropositionSection />
      <WorkSection />
      <TestimonialsSection />
      <ServicesSection />
      <ProcessSection />
      <IndustriesSection />
      <ValueFeaturesSection />
      <LatestArticlesSection />
    </main>
  )
}
