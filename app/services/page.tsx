import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getServices } from '@/lib/wordpress'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ProcessSection } from '@/components/sections/process-section'
import BrandsMarquee from '@/components/sections/brands'

export const metadata: Metadata = {
  title: 'Services | Thrill Edge Technologies',
  description: 'Comprehensive software development services — AI, web, mobile, backend, and more.',
  alternates: { canonical: 'https://thrilledge.com/services' },
}

export default async function ServicesPage() {
  const services = await getServices(50).catch(() => [])

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="mx-auto p-2 w-full">
        <div className="relative bg-[#111212] rounded-[20px] w-full h-[480px] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          <div className="right-0 bottom-0 left-0 absolute flex lg:flex-row flex-col justify-between lg:items-end gap-4 mx-auto px-5 lg:px-9 py-8 lg:py-10 max-w-[1440px]">
            <div className="flex flex-col gap-3">
              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.2em]">What we do</span>
              <h1 className="max-w-2xl font-mont font-bold text-[40px] text-white lg:text-[72px] leading-none">
                Services built<br />to ship.
              </h1>
            </div>
            <p className="lg:max-w-xs font-inter text-[15px] text-white/50 lg:text-[17px] lg:text-right leading-7">
              From idea to production — we cover every layer of the stack.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <div className="mx-auto px-4 md:px-9 py-20 max-w-[1440px]">
        {services.length === 0 ? (
          <div className="py-24 border border-[#e5e5e5] border-dashed rounded-[20px] text-center">
            <p className="font-mont font-semibold text-[#111212] text-[20px]">Services coming soon.</p>
          </div>
        ) : (
          <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => {
              const img = service.acf?.image?.url || service._embedded?.['wp:featuredmedia']?.[0]?.source_url
              const counts = service.acf?.service_count
              const countItems = counts
                ? [counts.count_1, counts.count_2, counts.count_3].filter(Boolean)
                : []

              return (
                <Link key={service.id} href={`/services/${service.slug}`}
                  className="group flex flex-col bg-white border border-[#e5e5e5] hover:border-[#111212] rounded-[20px] overflow-hidden transition-colors duration-300">

                  {/* Image */}
                  <div className="relative bg-[#f3f3f3] w-full h-52 overflow-hidden">
                    {img ? (
                      <Image src={img} alt={service.title.rendered} fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={idx < 3}
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="absolute inset-0 flex justify-center items-center">
                        <span className="font-mont font-bold text-[#e5e5e5] text-[48px]">
                          {service.title.rendered.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 gap-4 p-6">
                    <div className="flex justify-between items-start gap-3">
                      <h2 className="font-mont font-semibold text-[#111212] text-[20px] leading-tight">
                        {service.title.rendered}
                      </h2>
                      <span className="flex justify-center items-center group-hover:bg-[#111212] mt-0.5 border border-[#e5e5e5] group-hover:border-[#111212] rounded-full w-8 h-8 transition-all duration-300 shrink-0">
                        <ArrowUpRight size={14} className="text-[#929296] group-hover:text-white transition-colors duration-300" />
                      </span>
                    </div>

                    {service.acf?.service_solutions && (
                      <p className="font-inter text-[#929296] text-[14px] line-clamp-3 leading-6">
                        {service.acf.service_solutions}
                      </p>
                    )}

                    {/* Stats */}
                    {countItems.length > 0 && (
                      <div className="flex gap-6 mt-auto pt-4 border-[#f3f3f3] border-t">
                        {countItems.map((c, i) => (
                          <div key={i}>
                            <p className="font-mont font-bold text-[#111212] text-[20px]">{c!.number}</p>
                            <p className="mt-0.5 font-inter text-[#929296] text-[11px]">{c!.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Brands */}
      <BrandsMarquee />

      {/* Process */}
      <ProcessSection />

      {/* Testimonials */}
      <TestimonialsSection show={12} />

      {/* CTA */}
      <section className="flex justify-center items-center p-5 w-full">
        <div className="flex md:flex-row flex-col justify-between gap-2 md:gap-24 bg-white px-4 md:px-12 py-5 md:py-10 border border-[#e5e5e5] rounded-3xl w-full max-w-[1400px]">
          <h3 className="max-w-[644px] font-mont font-semibold text-[#111212] text-[30px] lg:text-[56px] lg:leading-[64px]">
            Not sure which service fits?
          </h3>
          <div className="flex flex-col items-start gap-10 md:gap-5 w-full max-w-[354px]">
            <p className="font-inter text-[#929296] text-[16px] leading-6">
              Tell us about your project and we'll recommend the right approach in 48h.
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
