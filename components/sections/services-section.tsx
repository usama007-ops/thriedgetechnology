/**
 * Services SectionServer Component
 */

import { getServices } from '@/lib/wordpress'
import { ShadowCardGrid } from '@/components/common/shadow-card'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export async function ServicesSection({ show = 12 }: { show?: number }) {
  const services = await getServices(show).catch(() => [])

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F3F3F3]">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>

        {services.length > 0 ? (
          <ShadowCardGrid columns={4} className="mb-12">
            {services.map((service) => {
              const featuredImage =
                service.acf?.image?.url ||
                service._embedded?.['wp:featuredmedia']?.[0]?.source_url
              const counts = service.acf?.service_count
              const countItems = counts
                ? [counts.count_1, counts.count_2, counts.count_3].filter(Boolean)
                : []

              return (
                <Link key={service.id} href={`/services/${service.slug}`}>
                  <div className="h-full overflow-hidden p-0 bg-white rounded-lg">
                    <div className="space-y-4">
                      {featuredImage ? (
                        <div className="relative w-full h-44 rounded-lg overflow-hidden">
                          <Image
                            src={featuredImage}
                            alt={service.acf?.image?.alt || service.title.rendered}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                          <span className="text-accent font-bold text-lg">
                            {service.title.rendered.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-foreground"
                          dangerouslySetInnerHTML={{ __html: service.title.rendered }}
                        />

                        {service.acf?.service_solutions && (
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                            {service.acf.service_solutions}
                          </p>
                        )}

                        {countItems.length > 0 && (
                          <div className="flex gap-4 mt-4 pt-4 ">
                            {countItems.map((count, idx) => (
                              <div key={idx} className="text-center border-l px-3 border-border-[#eee] first:border-l-0">
                                <p className="text-lg font-bold text-accent">{count!.number}</p>
                                <p className="text-xs text-muted-foreground">{count!.label}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="pt-2 flex items-center gap-2 text-accent mt-4">
                          <span className="text-sm font-semibold">Learn More</span>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </ShadowCardGrid>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>No services available at the moment.</p>
          </div>
        )}

        <div className="text-center pt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-accent text-accent hover:bg-accent/10 transition-all duration-300 font-semibold"
          >
            View All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
