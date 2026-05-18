import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getServices } from '@/lib/wordpress'
import { cn } from "@/lib/utils"
import { Animate } from '@/components/common/animate'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CTASection } from '@/components/sections/cta-section'


export const metadata: Metadata = {
  title: 'Services | Thrill Edge Technologies',
  description: 'Comprehensive software development services AI, web, mobile, backend, and more.',
  alternates: { canonical: 'https://thrilledge.com/services' },
}

export default async function ServicesPage() {
  const services = await getServices(50).catch(() => [])

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      {/* Hero */}
      <section className="px-3 md:px-2.5 w-full">
        <div className="relative rounded-[20px] w-full h-120 overflow-hidden">
          <Image src="/services.png" alt="Our Work" fill className={cn('object-center', 'object-cover')} sizes="100vw" priority />
          <div className={cn("absolute", "inset-0", "rounded-[20px]")} style={{ background: "linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.6), rgba(0,0,0,0))" }} />
          <div className={cn("max-w-360", "mx-auto", "absolute", "bottom-0", "left-0", "right-0", "flex", "lg:flex-row", "flex-col", "justify-between", "lg:items-end", "gap-4", "lg:px-9", "px-5", "lg:py-8", "py-6")}>
            <div>
              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.2em]">Portfolio</span>
              <h2 className={cn("text-[32px]", "lg:text-[56px]", "lg:leading-15", "leading-9", "font-mont", "font-semibold", "text-white", "max-w-2xl")}>
                We deliver.<br />Period.
              </h2>
            </div>
            <p className="lg:text-[18px] text-[15px] font-inter text-white/70 lg:max-w-1/2 leading-7">
              From idea to production we cover every layer of the stack.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <div className="px-4 py-16 md:py-24">
        <div className="max-w-360 mx-auto">
          {services.length === 0 ? (
            <div className="py-24 border border-[#e5e5e5] border-dashed rounded-[20px] text-center">
              <p className="font-mont font-semibold text-[#111212] text-[20px]">Services coming soon.</p>
            </div>
          ) : (
            <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, idx) => {
                const img = service.acf?.image?.url || service._embedded?.['wp:featuredmedia']?.[0]?.source_url
                const counts = service.acf?.service_count
                const countItems = counts ? [counts.count_1, counts.count_2, counts.count_3].filter(Boolean) : []
                return (
                  <Animate key={service.id} variant="scale-in" delay={idx * 80}>
                    <Link href={`/services/${service.slug}`}
                      className="group flex flex-col bg-white border border-[#e5e5e5] hover:border-[#111212] rounded-[20px] overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                      <div className="relative bg-[#f3f3f3] w-full h-56 overflow-hidden">
                        {img ? (
                          <Image src={img} alt={service.title.rendered} fill sizes="(max-width: 768px) 100vw, 33vw"
                            priority={idx < 3} className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        ) : (
                          <div className="absolute inset-0 flex justify-center items-center bg-[#111212]">
                            <span className="font-mont font-bold text-white/10 text-[80px]">{service.title.rendered.charAt(0)}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="flex flex-col flex-1 gap-4 p-6">
                        <div className="flex justify-between items-start gap-3">
                          <h2 className="font-mont font-semibold text-[#111212] text-[20px] leading-tight"
                            dangerouslySetInnerHTML={{ __html: service.title.rendered }} />
                          <span className="flex justify-center items-center group-hover:bg-[#111212] mt-0.5 border border-[#e5e5e5] group-hover:border-[#111212] rounded-full w-8 h-8 transition-all duration-300 shrink-0">
                            <ArrowUpRight size={14} className="text-[#929296] group-hover:text-white transition-colors duration-300" />
                          </span>
                        </div>
                        {service.acf?.service_solutions && (
                          <p className="font-inter text-[#929296] text-[14px] line-clamp-3 leading-6">{service.acf.service_solutions}</p>
                        )}
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
                  </Animate>
                )
              })}
            </div>
          )}
        </div>
      </div>
      {/* reviews */}
 <TestimonialsSection show={12} />
      {/* CTA */}
     <CTASection/>

    </div>
  )
}
