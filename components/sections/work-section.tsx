/**
 * Work/Portfolio Section — Server Component
 * Data fetched at request time, no loading state, no client JS needed.
 */

import { getWorkItems } from '@/lib/wordpress'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export async function WorkSection() {
  const workItems = await getWorkItems(1, 6).catch(() => [])

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 ">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            We deliver Period
          </h2>
        </div>

        {workItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {workItems.map((work) => {
                const featuredImage = work._embedded?.['wp:featuredmedia']?.[0]?.source_url
                const industry = work.acf?.industry
                const year = work.acf?.year
                const longTitle = work.acf?.long_title || work.title.rendered
                const servicesTags = work.acf?.services
                  ? work.acf.services
                      .replace(/<[^>]*>/g, '')
                      .split(/[,\n]/)
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .slice(0, 3)
                  : []

                return (
                  <Link key={work.id} href={`/work/${work.slug}`}>
                    <div className="w-full h-full flex flex-col group">
                      {/* Image container */}
                      <div className="relative overflow-hidden rounded-[24px] h-full">
                        {featuredImage ? (
                          <Image
                            src={featuredImage}
                            alt={`${work.title.rendered} card image`}
                            width={655}
                            height={815}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 rounded-[24px]" />
                        )}

                        {/* Top-left badge — industry */}
                        {industry && (
                          <span className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-[#111212]">
                            {industry}
                          </span>
                        )}

                        {/* Top-right badge — year */}
                        {year && (
                          <span className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-[#111212]">
                            {year}
                          </span>
                        )}

                        {/* Hover gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Hover content */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                          <div className="flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                            <p className="text-white text-sm line-clamp-2 flex-1">{longTitle}</p>
                            <ArrowRight size={20} className="text-white shrink-0" />
                          </div>
                          {servicesTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200">
                              {servicesTags.map((tag) => (
                                <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs rounded-full px-3 py-1">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Title below image */}
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

            <div className="text-center pt-4">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#111212] text-[#111212] hover:bg-[#111212] hover:text-white transition-all duration-300 font-semibold text-sm"
              >
                View All Work
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>No work items available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
