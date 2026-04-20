'use client'

import { useState, useMemo } from 'react'
import { useWorkItems } from '@/hooks/use-work'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function WorkGrid() {
  const [activeIndustry, setActiveIndustry] = useState('All')

  const { data: workItems = [] } = useWorkItems({ per_page: 100 })

  const industryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: workItems.length }
    for (const w of workItems) {
      const ind = w.acf?.industry?.trim()
      if (ind) counts[ind] = (counts[ind] ?? 0) + 1
    }
    return counts
  }, [workItems])

  const industries = ['All', ...Object.keys(industryCounts).filter(i => i !== 'All')]

  const filtered = useMemo(() =>
    activeIndustry === 'All'
      ? workItems
      : workItems.filter(w => w.acf?.industry?.trim() === activeIndustry),
    [workItems, activeIndustry]
  )

  return (
    <>
      {/* Industry filter tabs */}
      <div className="top-0 z-50 sticky bg-white border-[#e5e5e5] border-b">
        <div className="mx-auto px-4 md:px-9 max-w-[1440px]">
          <div className="flex gap-0 overflow-x-auto no-scrollbar">
            {industries.map(ind => {
              const isActive = activeIndustry === ind
              return (
                <button key={ind} onClick={() => setActiveIndustry(ind)}
                  className={cn(
                    'flex items-center gap-1.5 px-5 py-4 border-b-2 font-mont font-semibold text-[14px] transition-all duration-200 cursor-pointer shrink-0',
                    isActive ? 'border-[#111212] text-[#111212]' : 'border-transparent text-[#929296] hover:text-[#111212]'
                  )}>
                  {ind === 'All' ? 'All work' : ind}
                  <span className={cn(
                    'px-1.5 py-0.5 rounded-full font-inter text-[11px]',
                    isActive ? 'bg-[#111212] text-white' : 'bg-[#f3f3f3] text-[#929296]'
                  )}>
                    {industryCounts[ind] ?? 0}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="mx-auto px-4 md:px-9 py-16 max-w-[1440px]">
        {filtered.length === 0 ? (
          <div className="py-24 border border-[#e5e5e5] border-dashed rounded-[20px] text-center">
            <p className="mb-2 font-mont font-semibold text-[#111212] text-[20px]">No projects in this category yet</p>
            <p className="font-inter text-[#929296] text-[14px]">Check back soon.</p>
          </div>
        ) : (
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((work, idx) => {
              const img = work._embedded?.['wp:featuredmedia']?.[0]?.source_url
              const servicesTags = work.acf?.services
                ? work.acf.services.replace(/<[^>]*>/g, '').split(/[,\n]/).map(s => s.trim()).filter(Boolean).slice(0, 3)
                : []

              return (
                <Link key={work.id} href={`/work/${work.slug}`} className="group flex flex-col">
                  <div className="relative rounded-[24px] aspect-4/5 overflow-hidden">
                    {img ? (
                      <Image
                        src={img}
                        alt={work.title.rendered}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={idx < 3}
                        loading={idx < 3 ? 'eager' : 'lazy'}
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-[#f3f3f3] to-[#e5e5e5]" />
                    )}

                    {work.acf?.industry && (
                      <span className="top-4 left-4 z-10 absolute bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full font-inter font-medium text-[#111212] text-xs">
                        {work.acf.industry}
                      </span>
                    )}
                    {work.acf?.year && (
                      <span className="top-4 right-4 z-10 absolute bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full font-inter font-medium text-[#111212] text-xs">
                        {work.acf.year}
                      </span>
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="right-0 bottom-0 left-0 absolute flex flex-col gap-3 p-5">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300 delay-100">
                        <p className="flex-1 text-white text-sm line-clamp-2">
                          {work.acf?.long_title || work.title.rendered}
                        </p>
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
                    <h3 className="font-mont font-semibold xl:font-bold text-[#111212] text-[24px] xl:text-[32px] leading-normal">
                      {work.title.rendered}
                    </h3>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
