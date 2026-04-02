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
        <div className="max-w-[1440px] mx-auto md:px-[36px] px-[16px] pt-[80px] pb-[64px] flex md:flex-row flex-col md:items-end justify-between gap-[40px]">
          <div className="flex flex-col gap-[20px]">
            <span className="text-[12px] font-inter font-semibold uppercase tracking-[0.2em] text-white/40">Careers</span>
            <h1 className="text-[48px] md:text-[72px] font-mont font-bold leading-[1.05] text-white max-w-[700px]">
              Work on things<br />that actually ship.
            </h1>
          </div>
          <div className="flex flex-col gap-[16px] max-w-[380px]">
            <p className="text-[16px] font-inter text-white/50 leading-[1.7]">
              Small teams. Senior engineers. Real ownership. We&apos;re building software that powers businesses across healthcare, fintech, and eCommerce.
            </p>
            <div className="flex items-center gap-[24px]">
              <div className="flex flex-col gap-[2px]">
                <span className="text-[28px] font-mont font-bold text-white">{jobs.length}</span>
                <span className="text-[12px] font-inter text-white/40 uppercase tracking-wider">Open roles</span>
              </div>
              <div className="w-[1px] h-[40px] bg-white/10" />
              <div className="flex flex-col gap-[2px]">
                <span className="text-[28px] font-mont font-bold text-white">8</span>
                <span className="text-[12px] font-inter text-white/40 uppercase tracking-wider">Countries</span>
              </div>
              <div className="w-[1px] h-[40px] bg-white/10" />
              <div className="flex flex-col gap-[2px]">
                <span className="text-[28px] font-mont font-bold text-white">100%</span>
                <span className="text-[12px] font-inter text-white/40 uppercase tracking-wider">Senior-only</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department tabs */}
      <div className="sticky top-0 z-[99] bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1440px] mx-auto md:px-[36px] px-[16px]">
          <div className="flex gap-0 overflow-x-auto no-scrollbar">
            {depts.map(dept => {
              const isActive = activeDept === dept
              const count = deptCounts[dept] ?? 0
              return (
                <button key={dept} onClick={() => setActiveDept(dept)}
                  className={`shrink-0 flex items-center gap-[6px] px-[20px] py-[18px] text-[14px] font-mont font-semibold border-b-2 transition-all duration-200 cursor-pointer
                    ${isActive ? 'border-[#111212] text-[#111212]' : 'border-transparent text-[#929296] hover:text-[#111212]'}`}>
                  {dept === 'All' ? 'All roles' : dept}
                  <span className={`text-[11px] font-inter px-[7px] py-[2px] rounded-full ${isActive ? 'bg-[#111212] text-white' : 'bg-[#f3f3f3] text-[#929296]'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Job list */}
      <div className="max-w-[1440px] mx-auto md:px-[36px] px-[16px] py-[64px]">
        {shown.length > 0 ? (
          <div className="flex flex-col gap-0">
            {shown.map((job, idx) => {
              const dept = job.department?.[0]?.name
              const type = job.acf?.type
              const excerpt = job.content?.rendered?.replace(/<[^>]*>/g, '').slice(0, 120) ?? ''
              return (
                <div key={job.id}
                  className="group flex md:flex-row flex-col md:items-center justify-between gap-[24px] py-[28px] border-b border-[#e5e5e5] hover:bg-[#f9f9f9] px-[20px] -mx-[20px] rounded-[12px] transition-all duration-200">
                  <div className="flex md:flex-row flex-col md:items-center gap-[20px] flex-1 min-w-0">
                    {/* Index */}
                    <span className="text-[13px] font-inter text-[#CCCCCC] tabular-nums shrink-0 hidden md:block">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col gap-[6px] flex-1 min-w-0">
                      <h2 className="text-[20px] font-mont font-semibold text-[#111212] leading-[1.3]">
                        {job.title.rendered}
                      </h2>
                      {excerpt && (
                        <p className="text-[14px] font-inter text-[#929296] leading-[1.6] line-clamp-1">{excerpt}</p>
                      )}
                    </div>
                    {/* Tags */}
                    <div className="flex items-center gap-[8px] shrink-0 flex-wrap">
                      {type && (
                        <span className="flex items-center gap-[5px] text-[12px] font-inter text-[#929296] bg-[#f3f3f3] px-[12px] py-[5px] rounded-full">
                          <MapPin size={11} />{TYPE_LABEL[type] ?? type}
                        </span>
                      )}
                      {dept && (
                        <span className="text-[12px] font-inter text-[#929296] bg-[#f3f3f3] px-[12px] py-[5px] rounded-full">
                          {dept}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link href={`/careers/${job.slug}`}
                    className="shrink-0 flex items-center gap-[8px] px-[20px] py-[10px] border border-[#111212] text-[#111212] font-mont text-[13px] font-semibold rounded-full group-hover:bg-[#111212] group-hover:text-white transition-all duration-300">
                    View role <ArrowRight size={14} className="group-hover:translate-x-[2px] transition-transform duration-300" />
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-[80px] border border-dashed border-[#e5e5e5] rounded-[20px]">
            <p className="text-[20px] font-mont font-semibold text-[#111212] mb-[8px]">No open positions in this department</p>
            <p className="text-[14px] font-inter text-[#929296]">Check back soon or send us your CV.</p>
          </div>
        )}

        {/* Load more */}
        {visible < filtered.length && (
          <div className="flex justify-center mt-[48px]">
            <button onClick={() => setVisible(v => v + PAGE_SIZE)}
              className="flex items-center gap-[8px] px-[28px] py-[12px] border border-[#e5e5e5] text-[#111212] font-mont text-[14px] font-semibold rounded-full hover:border-[#111212] transition-all duration-300">
              Load more <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#111212] w-full">
        <div className="max-w-[1440px] mx-auto md:px-[36px] px-[16px] py-[64px] flex md:flex-row flex-col md:items-center justify-between gap-[32px]">
          <div className="flex flex-col gap-[12px]">
            <p className="text-[11px] font-inter font-semibold uppercase tracking-[0.15em] text-white/30">Don&apos;t see your role?</p>
            <h3 className="text-[32px] md:text-[40px] font-mont font-bold text-white leading-[1.15] max-w-[480px]">
              Send us your CV anyway.
            </h3>
            <p className="text-[15px] font-inter text-white/50 leading-[1.65] max-w-[400px]">
              We&apos;re always looking for great engineers, designers, and product thinkers.
            </p>
          </div>
          <Link href="/careers/apply?position=General+Application"
            className="shrink-0 flex items-center gap-[10px] bg-white text-black font-mont text-[14px] font-semibold px-[28px] py-[14px] rounded-[10px] hover:bg-white/90 transition-all duration-200 whitespace-nowrap">
            Send your CV <ArrowRight size={14} />
          </Link>
        </div>
      </div>

    </div>
  )
}
