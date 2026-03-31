import { getWorkItems } from '@/lib/wordpress'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work | Thrill Edge Technologies',
  description: 'Explore our portfolio of products shipped across healthcare, fintech, eCommerce and more.',
}

export default async function WorkPage() {
  const workItems = await getWorkItems(1, 100).catch(() => [])

  return (
    <div className="relative bg-[#f3f3f3]">

      {/* Hero */}
      <div className="w-full max-w-[1440px] mx-auto flex md:flex-row flex-col md:items-end md:gap-[64px] gap-[24px] md:px-[36px] px-[16px] md:py-[80px] py-[64px]">
        <div className="w-full max-w-[610px]">
          <p className="text-[12px] font-inter font-semibold uppercase tracking-[0.2em] text-[#929296] mb-[16px]">Portfolio</p>
          <h1 className="text-[40px] md:text-[56px] font-mont font-bold leading-[1.1] text-[#111212]">
            We deliver.<br />Period.
          </h1>
        </div>
        <p className="w-full max-w-[560px] text-[18px] font-inter text-[#929296] leading-[1.65]">
          50+ products shipped across healthcare, fintech, eCommerce, and more. Here&apos;s what we&apos;ve built.
        </p>
      </div>

      {/* Grid */}
      {workItems.length > 0 ? (
        <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] pb-[96px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workItems.map((work, idx) => {
              const featuredImage = work._embedded?.['wp:featuredmedia']?.[0]?.source_url
              const industry = work.acf?.industry
              const year = work.acf?.year
              const longTitle = work.acf?.long_title || work.title.rendered
              const servicesTags = work.acf?.services
                ? work.acf.services.replace(/<[^>]*>/g, '').split(/[,\n]/).map(s => s.trim()).filter(Boolean).slice(0, 3)
                : []

              return (
                <Link key={work.id} href={`/work/${work.slug}`}>
                  <div className="w-full h-full flex flex-col group">
                    <div className="relative overflow-hidden rounded-[24px] aspect-[4/5]">
                      {featuredImage ? (
                        <Image
                          src={featuredImage}
                          alt={`${work.title.rendered} card image`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={idx < 3}
                          loading={idx < 3 ? 'eager' : 'lazy'}
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-[24px]" />
                      )}

                      {industry && (
                        <span className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-[#111212]">
                          {industry}
                        </span>
                      )}
                      {year && (
                        <span className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-[#111212]">
                          {year}
                        </span>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                        <div className="flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                          <p className="text-white text-sm line-clamp-2 flex-1">{longTitle}</p>
                          <ArrowRight size={20} className="text-white shrink-0" />
                        </div>
                        {servicesTags.length > 0 && (
                          <div className="flex flex-wrap gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200">
                            {servicesTags.map(tag => (
                              <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs rounded-full px-3 py-1">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-[16px]">
                      <h3 className="text-[#111212] xl:text-[32px] text-[24px] xl:font-bold font-semibold leading-normal">
                        {work.title.rendered}
                      </h3>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] pb-[96px] text-center py-[80px]">
          <p className="text-[#929296] font-inter text-[16px]">No work items available at the moment.</p>
        </div>
      )}

      {/* CTA */}
      <section className="w-full flex items-center justify-center p-[20px]">
        <div className="w-full max-w-[1400px] flex md:flex-row flex-col justify-between md:gap-[96px] gap-[8px] rounded-[24px] md:px-[48px] px-[16px] md:py-[40px] py-[20px] bg-white border border-[#e5e5e5]">
          <h3 className="lg:text-[56px] text-[30px] lg:leading-[64px] font-semibold font-mont text-[#111212] max-w-[642px]">
            Let&apos;s Build Your Next Big Thing
          </h3>
          <div className="max-w-[354px] w-full flex items-start flex-col md:gap-[20px] gap-[40px]">
            <p className="text-[16px] leading-[24px] text-[#929296] font-inter">Your idea, our brains — we&apos;ll send you a tailored game plan in 48h.</p>
            <Link href="/contact"
              className="flex items-center justify-center px-[24px] pt-[14px] pb-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300">
              Book a call
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
