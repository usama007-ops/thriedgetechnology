'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getJobs } from '@/lib/wordpress'
import type { Job } from '@/lib/wordpress'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, MapPin } from 'lucide-react'

const PAGE_SIZE = 9

const TYPE_LABEL: Record<string, string> = { onsite: 'Onsite', hybrid: 'Hybrid', remote: 'Remote' }

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState('All')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const { data: jobs = [] } = useQuery<Job[]>({
    queryKey: ['jobs'],
    queryFn: () => getJobs(100),
    staleTime: 10 * 60 * 1000,
  })

  const deptCounts: Record<string, number> = { All: jobs.length }
  for (const job of jobs) {
    const d = job.department?.[0]?.name ?? 'General'
    deptCounts[d] = (deptCounts[d] ?? 0) + 1
  }
  const depts = ['All', ...Object.keys(deptCounts).filter(d => d !== 'All')]

  const filtered = activeDept === 'All'
    ? jobs
    : jobs.filter(j => (j.department?.[0]?.name ?? 'General') === activeDept)

  const shown = filtered.slice(0, visible)
  useEffect(() => setVisible(PAGE_SIZE), [activeDept])

  return (
    <div className="bg-white">

      {/* Dark hero */}
      <div className="bg-[#111212] w-full">
        <div className="flex md:flex-row flex-col justify-between md:items-end gap-10 mx-auto px-4 md:px-9 pt-20 pb-16 max-w-360">
          <div className="flex flex-col gap-5">
            <span className="font-inter font-semibold text-[12px] text-white/40 uppercase tracking-[0.2em]">Careers</span>
            <h1 className="max-w-175 font-mont font-bold text-[48px] text-white md:text-[72px] leading-[1.05]">
              Work on things<br />that actually ship.
            </h1>
          </div>
          <div className="flex flex-col gap-4 max-w-95">
            <p className="font-inter text-[16px] text-white/50 leading-[1.7]">
              Small teams. Senior engineers. Real ownership. We&apos;re building software that powers businesses across healthcare, fintech, and eCommerce.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-0.5">
                <span className="font-mont font-bold text-[28px] text-white">{jobs.length}</span>
                <span className="font-inter text-[12px] text-white/40 uppercase tracking-wider">Open roles</span>
              </div>
              <div className="bg-white/10 w-px h-10" />
              <div className="flex flex-col gap-0.5">
                <span className="font-mont font-bold text-[28px] text-white">100%</span>
                <span className="font-inter text-[12px] text-white/40 uppercase tracking-wider">Senior-only</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department tabs */}
      <div className="top-0 z-99 sticky bg-white border-[#e5e5e5] border-b">
        <div className="mx-auto px-4 md:px-9 max-w-360">
          <div className="flex gap-0 overflow-x-auto no-scrollbar">
            {depts.map(dept => {
              const isActive = activeDept === dept
              const count = deptCounts[dept] ?? 0
              return (
                <button key={dept} onClick={() => setActiveDept(dept)}
                  className={`shrink-0 flex items-center gap-1.5 px-5 py-4.5 text-[14px] font-mont font-semibold border-b-2 transition-all duration-200 cursor-pointer
                    ${isActive ? 'border-[#111212] text-[#111212]' : 'border-transparent text-[#929296] hover:text-[#111212]'}`}>
                  {dept === 'All' ? 'All roles' : dept}
                  <span className={`text-[11px] font-inter px-1.75 py-0.5 rounded-full ${isActive ? 'bg-[#111212] text-white' : 'bg-[#f3f3f3] text-[#929296]'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Job list */}
      <div className="mx-auto px-4 md:px-9 py-16 max-w-360">
        {shown.length > 0 ? (
          <div className="flex flex-col gap-0">
            {shown.map((job, idx) => {
              const dept = job.department?.[0]?.name
              const type = job.acf?.type
              const excerpt = job.content?.rendered?.replace(/<[^>]*>/g, '').slice(0, 120) ?? ''
              return (
                <div key={job.id}
                  className="group flex md:flex-row flex-col justify-between md:items-center gap-6 hover:bg-[#f9f9f9] -mx-5 px-5 py-7 border-[#e5e5e5] border-b rounded-[12px] transition-all duration-200">
                  <div className="flex md:flex-row flex-col flex-1 md:items-center gap-5 min-w-0">
                    {/* Index */}
                    <span className="hidden md:block font-inter tabular-nums text-[#CCCCCC] text-[13px] shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col flex-1 gap-1.5 min-w-0">
                      <h2 className="font-mont font-semibold text-[#111212] text-[20px] leading-[1.3]">
                        {job.title.rendered}
                      </h2>
                      {excerpt && (
                        <p className="font-inter text-[#929296] text-[14px] line-clamp-1 leading-[1.6]">{excerpt}</p>
                      )}
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {type && (
                        <span className="flex items-center gap-1.25 bg-[#f3f3f3] px-3 py-1.25 rounded-full font-inter text-[#929296] text-[12px]">
                          <MapPin size={11} />{TYPE_LABEL[type] ?? type}
                        </span>
                      )}
                      {dept && (
                        <span className="bg-[#f3f3f3] px-3 py-1.25 rounded-full font-inter text-[#929296] text-[12px]">
                          {dept}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link href={`/careers/${job.slug}`}
                    className="flex items-center gap-2 group-hover:bg-[#111212] px-5 py-2.5 border border-[#111212] rounded-full font-mont font-semibold text-[#111212] text-[13px] group-hover:text-white transition-all duration-300 shrink-0">
                    View role <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5 duration-300" />
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-20 border border-[#e5e5e5] border-dashed rounded-[20px] text-center">
            <p className="mb-2 font-mont font-semibold text-[#111212] text-[20px]">No open positions in this department</p>
            <p className="font-inter text-[#929296] text-[14px]">Check back soon or send us your CV.</p>
          </div>
        )}

        {/* Load more */}
        {visible < filtered.length && (
          <div className="flex justify-center mt-12">
            <button onClick={() => setVisible(v => v + PAGE_SIZE)}
              className="flex items-center gap-2 px-7 py-3 border border-[#e5e5e5] hover:border-[#111212] rounded-full font-mont font-semibold text-[#111212] text-[14px] transition-all duration-300">
              Load more <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#111212] w-full">
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-8 mx-auto px-4 md:px-9 py-16 max-w-360">
          <div className="flex flex-col gap-3">
            <p className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.15em]">Don&apos;t see your role?</p>
            <h3 className="max-w-120 font-mont font-bold text-[32px] text-white md:text-[40px] leading-[1.15]">
              Send us your CV anyway.
            </h3>
            <p className="max-w-100 font-inter text-[15px] text-white/50 leading-[1.65]">
              We&apos;re always looking for great engineers, designers, and product thinkers.
            </p>
          </div>
          <Link href="/careers/apply?position=General+Application"
            className="flex items-center gap-2.5 bg-white hover:bg-white/90 px-7 py-3.5 rounded-[10px] font-mont font-semibold text-[14px] text-black whitespace-nowrap transition-all duration-200 shrink-0">
            Send your CV <ArrowRight size={14} />
          </Link>
        </div>
      </div>

    </div>
  )
}
