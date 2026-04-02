'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getJobs } from '@/lib/wordpress'
import type { Job } from '@/lib/wordpress'
import { useQuery } from '@tanstack/react-query'

const PAGE_SIZE = 9

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState('All')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const { data: jobs = [] } = useQuery<Job[]>({
    queryKey: ['jobs'],
    queryFn: () => getJobs(100),
    staleTime: 10 * 60 * 1000,
  })

  // Build department list from fetched jobs
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

  // Reset visible on filter change
  useEffect(() => setVisible(PAGE_SIZE), [activeDept])

  return (
    <section className="relative max-w-[1440px] w-full mx-auto text-[#F3F3F3]">

      {/* Hero */}
      <div className="w-full max-w-[1440px] mx-auto flex md:flex-row flex-col md:items-end md:gap-[64px] gap-[32px] md:px-[36px] px-[16px] md:py-[64px] py-[64px]">
        <h1 className="text-[24px] font-mont font-semibold w-full max-w-[610px]">
          We have {jobs.length} open position{jobs.length !== 1 ? 's' : ''} now!
        </h1>
        <p className="w-full max-w-[694px] text-[40px] font-mont leading-[48px] font-semibold text-black">
          Join Thrill Edge. We are a team of innovators building custom software and next-gen AI solutions.
        </p>
      </div>

      <div className="w-full flex flex-col items-center md:px-[36px] px-[16px] md:pb-[96px] pb-[64px]">

        {/* Sticky pill filter bar */}
        <div className="sticky top-0 z-[99] max-w-[1440px] w-full flex items-center justify-center py-[20px]">
          <div className="w-full p-[16px] rounded-[120px] bg-white shadow-sm">
            <div className="w-full flex gap-[5px] rounded-full overflow-x-auto no-scrollbar">
              {depts.map(dept => {
                const isActive = activeDept === dept
                const count = deptCounts[dept] ?? 0
                return (
                  <button key={dept} onClick={() => setActiveDept(dept)}
                    className={`w-full min-w-fit h-[54px] flex items-center justify-center px-[24px] pt-[14px] pb-[12px] rounded-full text-[14px] font-mont font-semibold cursor-pointer transition-all duration-300 ease-in-out
                      ${isActive ? 'bg-[#111212] text-white' : 'bg-[#EFEEEC] text-[#313131] hover:bg-[#111212] hover:text-white'}`}>
                    {dept === 'All' ? `All positions (${count})` : `${dept} (${count})`}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Job cards grid */}
        {shown.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full py-[36px]">
            {shown.map(job => {
              const dept = job.department?.[0]?.name
              const type = job.acf?.type
              const excerpt = job.content?.rendered?.replace(/<[^>]*>/g, '').slice(0, 160) ?? ''

              return (
                <div key={job.id} className="bg-white p-[24px] rounded-[18px] flex flex-col gap-[16px] border border-[#f0f0f0] hover:border-[#e0e0e0] hover:shadow-md transition-all duration-300">
                  <h2 className="text-[#111212] font-mont text-[24px] font-semibold leading-[1.3]">
                    {job.title.rendered}
                  </h2>
                  <div className="flex gap-[12px] flex-wrap">
                    {type && (
                      <span className="px-[20px] py-[8px] rounded-full bg-[#EFEEEC] text-[14px] font-mont font-semibold text-[#313131] capitalize">
                        {type}
                      </span>
                    )}
                    {dept && (
                      <span className="px-[20px] py-[8px] rounded-full bg-[#EFEEEC] text-[14px] font-mont font-semibold text-[#313131]">
                        {dept}
                      </span>
                    )}
                  </div>
                  {excerpt && (
                    <p className="text-[#929296] font-inter text-[16px] font-normal leading-[24px] line-clamp-3">
                      {excerpt}
                    </p>
                  )}
                  <Link
                    href={`/careers/${job.slug}`}
                    className="ms-auto mt-auto flex items-center justify-center px-[24px] pt-[14px] pb-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300 ease-in-out w-fit"
                  >
                    Apply
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="w-full py-[80px] text-center">
            <p className="text-[24px] font-mont font-semibold text-[#111212] mb-[12px]">No open positions right now</p>
            <p className="text-[16px] font-inter text-[#929296] mb-[32px]">We&apos;re always looking for great people. Send us your CV anyway.</p>
            <Link href="/careers/apply?position=General+Application"
              className="inline-flex items-center justify-center px-[24px] pt-[14px] pb-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300">
              Send your CV
            </Link>
          </div>
        )}

        {/* Load more */}
        {visible < filtered.length && (
          <button onClick={() => setVisible(v => v + PAGE_SIZE)}
            className="flex items-center justify-center px-[24px] pt-[14px] pb-[12px] border border-black text-black bg-transparent font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300 ease-in-out">
            Load more
          </button>
        )}
      </div>

    </section>
  )
}
