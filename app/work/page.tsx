import { getWorkItems } from '@/lib/wordpress'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { PageHero } from '@/components/common/page-hero'

export const metadata: Metadata = {
  title: 'Our Work | Thrill Edge Technologies',
  description: 'Explore our portfolio of products shipped across healthcare, fintech, eCommerce and more.',
}

export default async function WorkPage() {
  const workItems = await getWorkItems(1, 100).catch(() => [])

  return (
    <div className="relative bg-white">
      <PageHero label="Portfolio" title="We deliver.<br/>Period." subtitle="50+ products shipped across healthcare, fintech, eCommerce, and more."  />

      {/* Grid */}
      {workItems.length > 0 ? (
        <div className="mx-auto px-4 md:px-9 py-24 w-full max-w-360">
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="group flex flex-col w-full h-full">
                    <div className="relative rounded-3xl aspect-4/5 overflow-hidden">
                      {featuredImage ? (
                        <Image
                          src={featuredImage}
                          alt={`${work.title.rendered} card image`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={idx < 3}
                          loading={idx < 3 ? 'eager' : 'lazy'}
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 rounded-3xl" />
                      )}

                      {industry && (
                        <span className="top-4 left-4 z-10 absolute bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full font-medium text-[#111212] text-xs">
                          {industry}
                        </span>
                      )}
                      {year && (
                        <span className="top-4 right-4 z-10 absolute bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full font-medium text-[#111212] text-xs">
                          {year}
                        </span>
                      )}

                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="right-0 bottom-0 left-0 absolute flex flex-col gap-3 p-5">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300 delay-100">
                          <p className="flex-1 text-white text-sm line-clamp-2">{longTitle}</p>
                          <ArrowRight size={20} className="text-white shrink-0" />
                        </div>
                        {servicesTags.length > 0 && (
                          <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300 delay-200">
                            {servicesTags.map(tag => (
                              <span key={tag} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="font-semibold xl:font-bold text-[#111212] text-[24px] xl:text-[32px] leading-normal">
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
        <div className="mx-auto px-4 md:px-9 py-20 pb-24 w-full max-w-360 text-center">
          <p className="font-inter text-[#929296] text-[16px]">No work items available at the moment.</p>
        </div>
      )}

      {/* CTA */}
      <section className="flex justify-center items-center p-5 w-full">
        <div className="flex md:flex-row flex-col justify-between gap-2 md:gap-24 bg-white px-4 md:px-12 py-5 md:py-10 border border-[#e5e5e5] rounded-3xl w-full max-w-350">
          <h3 className="max-w-160.5 font-mont font-semibold text-[#111212] text-[30px] lg:text-[56px] lg:leading-16">
            Let&apos;s Build Your Next Big Thing
          </h3>
          <div className="flex flex-col items-start gap-10 md:gap-5 w-full max-w-88.5">
            <p className="font-inter text-[#929296] text-[16px] leading-6">Your idea, our brains, we&apos;ll send you a tailored game plan in 48h.</p>
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
