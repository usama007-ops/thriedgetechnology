import { Suspense } from 'react'
import type { Metadata } from 'next'
import { WorkSection } from '@/components/sections/work-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ServiceClient } from './service-client'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  return {
    alternates: { canonical: `https://thrilledge.com/services/${slug}` },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params

  return (
    <>
      <ServiceClient slug={slug} />

      <Suspense fallback={null}>
        <WorkSection show={3} />
      </Suspense>

      <Suspense fallback={null}>
        <TestimonialsSection show={8} />
      </Suspense>
    </>
  )
}
