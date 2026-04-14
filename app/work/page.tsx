import type { Metadata } from 'next'
import Link from 'next/link'
import { getTestimonials } from '@/lib/wordpress'
import { WorkGrid } from './work-grid'
import BrandsMarquee from '@/components/sections/brands'
import { TestimonialsMarquee } from '@/components/sections/testimonials-marquee'
import ValuePropositionSection from '@/components/sections/value-proposition'
import { ProcessSection } from '@/components/sections/process-section'

export const metadata: Metadata = {
  title: 'Our Work | Thrill Edge Technologies',
  description: 'Explore our portfolio of products shipped across healthcare, fintech, eCommerce and more.',
}

export default async function WorkPage() {
  const testimonials = await getTestimonials(20).catch(() => [])

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <section className="mx-auto p-2 w-full">
        <div className="relative bg-[#111212] rounded-[20px] w-full h-[480px] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          <div className="right-0 bottom-0 left-0 absolute flex lg:flex-row flex-col justify-between lg:items-end gap-4 mx-auto px-5 lg:px-9 py-8 lg:py-10 max-w-[1440px]">
            <div className="flex flex-col gap-3">
              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.2em]">Portfolio</span>
              <h1 className="max-w-2xl font-mont font-bold text-[40px] text-white lg:text-[72px] leading-none">
                We deliver.<br />Period.
              </h1>
            </div>
            <p className="lg:max-w-xs font-inter text-[15px] text-white/50 lg:text-[17px] lg:text-right leading-7">
              50+ products shipped across healthcare, fintech, eCommerce, and more.
            </p>
          </div>
        </div>
      </section>

      {/* ── Interactive filter + cards (client) ── */}
      <WorkGrid />

      {/* ── Brands marquee ── */}
      <BrandsMarquee />

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className="bg-[#111212] py-24 overflow-hidden">
          <div className="mb-10 text-center">
            <p className="mb-3 font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.2em]">Social proof</p>
            <h2 className="font-mont font-bold text-[32px] text-white md:text-[48px]">
              What Our Clients Say
            </h2>
          </div>
          <TestimonialsMarquee testimonials={testimonials} />
          <div className="mx-auto px-4 md:px-9 max-w-[1440px]">
            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mt-16 pt-10 border-white/10 border-t">
              {[
                { number: '4.9/5', label: 'Average Rating' },
                { number: '98%', label: 'Satisfaction Rate' },
                { number: `${testimonials.length}+`, label: 'Happy Clients' },
                { number: '2M+', label: 'Revenue Generated' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-mont font-bold text-[32px] text-white">{s.number}</p>
                  <p className="mt-1 font-inter text-[14px] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Value proposition ── */}
      <ValuePropositionSection />

      {/* ── Process ── */}
      <ProcessSection />

      {/* ── CTA ── */}
      <section className="flex justify-center items-center p-5 w-full">
        <div className="flex md:flex-row flex-col justify-between gap-2 md:gap-24 bg-white px-4 md:px-12 py-5 md:py-10 border border-[#e5e5e5] rounded-3xl w-full max-w-[1400px]">
          <h3 className="max-w-[644px] font-mont font-semibold text-[#111212] text-[30px] lg:text-[56px] lg:leading-[64px]">
            Let&apos;s Build Your Next Big Thing
          </h3>
          <div className="flex flex-col items-start gap-10 md:gap-5 w-full max-w-[354px]">
            <p className="font-inter text-[#929296] text-[16px] leading-6">
              Your idea, our brains we&apos;ll send you a tailored game plan in 48h.
            </p>
            <Link href="/contact"
              className="flex justify-center items-center bg-black px-6 pt-3.5 pb-3 rounded-full font-mont font-semibold text-[14px] text-white hover:scale-105 transition-all duration-300">
              Book a call
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
