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
  description: 'Custom software development company specialising in AI, web, mobile, and SaaS. Trusted by startups and enterprises across the US, UK, and Australia.',
  keywords: ['software development company', 'custom web development', 'AI development', 'mobile app development', 'SaaS development', 'UK software agency'],
  alternates: {
    canonical: 'https://thrilledge.com',
  },
  openGraph: {
    title: 'Thrill Edge Technologies | We Ship Software That Actually Works',
    description: 'Custom software development company specialising in AI, web, mobile, and SaaS.',
    type: 'website',
    url: 'https://thrilledge.com',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Thrill Edge Technologies',
  url: 'https://thrilledge.com',
  logo: 'https://thrilledge.com/logo.svg',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+44-7853-746775',
    contactType: 'customer service',
    email: 'info@thrilledge.com',
    areaServed: ['GB', 'US', 'AU', 'CA'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '25 Luke Street',
    addressLocality: 'London',
    postalCode: 'EC2A 4DS',
    addressCountry: 'GB',
  },
  sameAs: [
    'https://www.linkedin.com/company/thrilledge',
    'https://twitter.com/thrilledge',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Thrill Edge Technologies',
  url: 'https://thrilledge.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://thrilledge.com/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <HeroSection />
      <BrandsMarquee />
      <ValuePropositionSection />
      <ServicesSection show={4}  />
      {/* <WorkSection show={3} /> */}
      <TestimonialsSection show={12} />
      <ProcessSection />
      <div className="py-[100px] bg-[#eee]">
      <IndustriesSection />
      </div>
      <ValueFeaturesSection />
      <LatestArticlesSection show={3} />
    </main>
  )
}
