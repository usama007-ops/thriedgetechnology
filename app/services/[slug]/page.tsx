import { Suspense } from 'react'
import type { Metadata } from 'next'
import { WorkSection } from '@/components/sections/work-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ServiceClient } from './service-client'
import Link from 'next/link'

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

      {/* <Suspense fallback={null}>
        <WorkSection show={3} />
      </Suspense> */}

      <Suspense fallback={null}>
        <TestimonialsSection show={8} />
      </Suspense>

      {/* CTA */}
      <div className="bg-[#111212] max-w-[1440px] mx-auto my-20 rounded-[30px]">
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-[48px] mx-auto px-[16px] md:px-[36px] py-[96px] w-full max-w-[1440px]">
          <div className="flex flex-col gap-[16px] max-w-[500px]">
            <h2 className="font-mont font-bold text-[48px] text-white leading-[52px]">
              Not sure which service fits?
            </h2>
            <p className="font-inter text-[#929296] text-[16px] leading-[24px]">
              Tell us about your project and we'll recommend the right approach in 48h.
            </p>
          </div>
          <div className="flex sm:flex-row flex-col gap-[16px]">
            <Link href="/contact"
              className="flex justify-center items-center bg-white px-[32px] py-[16px] rounded-full font-mont font-semibold text-[#111212] text-[16px] hover:scale-105 transition-all duration-300">
              Book a call
            </Link>
           <Link href="/project-cost-estimation"
              className="flex justify-center items-center hover:bg-white px-[32px] py-[16px] border border-white rounded-full font-mont font-semibold text-[16px] text-white hover:text-[#111212] transition-all duration-300">
              Calculate Development Cost
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
