import { getJobs } from '@/lib/wordpress'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MapPin, Briefcase, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers | Thrill Edge Technologies',
  description: 'Join the Thrill Edge team. We\'re hiring engineers, designers, and product thinkers.',
}

const TYPE_LABEL: Record<string, string> = {
  onsite: 'Onsite', hybrid: 'Hybrid', remote: 'Remote',
}
const TYPE_COLOR: Record<string, string> = {
  onsite: 'bg-[#f3f3f3] text-[#111212]',
  hybrid: 'bg-[#fff8e6] text-[#92600a]',
  remote: 'bg-[#e8f5e9] text-[#2e7d32]',
}

export default async function CareersPage() {
  const jobs = await getJobs()

  // Group by department name (from _embedded terms or fallback)
  const grouped: Record<string, typeof jobs> = {}
  for (const job of jobs) {
    const dept = job.department?.[0]?.name ?? 'General'
    if (!grouped[dept]) grouped[dept] = []
    grouped[dept].push(job)
  }

  return (
    <div className="relative bg-white">

      {/* Hero */}
      <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] md:py-[80px] py-[64px]">
        <p className="text-[12px] font-inter font-semibold uppercase tracking-[0.2em] text-[#929296] mb-[16px]">Careers</p>
        <h1 className="text-[40px] md:text-[64px] font-mont font-bold md:leading-[64px] leading-[44px] text-[#111212] max-w-[800px] mb-[24px]">
          Build the future with us
        </h1>
        <p className="text-[18px] font-inter text-[#929296] leading-[1.65] max-w-[560px]">
          We keep teams small and senior. If you&apos;ve shipped production code and care about craft, we want to hear from you.
        </p>
      </div>

      {/* Values strip */}
      <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] pb-[64px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#e5e5e5] rounded-[16px] overflow-hidden">
          {[
            { title: 'Senior-only teams', desc: 'Every engineer has shipped production code in your stack before.' },
            { title: 'No bureaucracy', desc: 'Small teams, direct communication, real ownership of your work.' },
            { title: 'Remote-friendly', desc: 'We have team members across US, Canada, Australia, and Europe.' },
          ].map(v => (
            <div key={v.title} className="bg-white px-[28px] py-[32px] flex flex-col gap-[8px]">
              <p className="text-[18px] font-mont font-semibold text-[#111212]">{v.title}</p>
              <p className="text-[14px] font-inter text-[#929296] leading-[1.6]">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Job listings */}
      <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] pb-[96px]">
        {jobs.length === 0 ? (
          <div className="text-center py-[80px] border border-[#e5e5e5] rounded-[20px]">
            <p className="text-[24px] font-mont font-semibold text-[#111212] mb-[12px]">No open positions right now</p>
            <p className="text-[16px] font-inter text-[#929296] mb-[32px]">We&apos;re always looking for great people. Send us your CV anyway.</p>
            <Link href="/careers/apply?position=General+Application"
              className="inline-flex items-center gap-2 px-[24px] pt-[14px] pb-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300">
              Send your CV <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-[48px]">
            {Object.entries(grouped).map(([dept, deptJobs]) => (
              <div key={dept}>
                <p className="text-[12px] font-inter font-semibold uppercase tracking-[0.15em] text-[#929296] mb-[16px]">{dept}</p>
                <div className="flex flex-col gap-[1px] bg-[#e5e5e5] rounded-[16px] overflow-hidden">
                  {deptJobs.map(job => (
                    <div key={job.id} className="bg-white px-[28px] py-[24px] flex md:flex-row flex-col md:items-center justify-between gap-[16px] group hover:bg-[#f9f9f9] transition-colors duration-200">
                      <div className="flex flex-col gap-[6px]">
                        <h3 className="text-[18px] font-mont font-semibold text-[#111212]">{job.title.rendered}</h3>
                        <div className="flex items-center gap-[12px] flex-wrap">
                          {job.acf?.position && (
                            <span className="flex items-center gap-[5px] text-[13px] font-inter text-[#929296]">
                              <Briefcase size={13} />{job.acf.position}
                            </span>
                          )}
                          {job.acf?.type && (
                            <span className={`text-[11px] font-inter font-semibold px-[10px] py-[3px] rounded-full ${TYPE_COLOR[job.acf.type] ?? 'bg-[#f3f3f3] text-[#111212]'}`}>
                              {TYPE_LABEL[job.acf.type] ?? job.acf.type}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link href={`/careers/${job.slug}`}
                        className="shrink-0 flex items-center gap-[8px] px-[20px] py-[10px] border border-[#111212] text-[#111212] font-mont text-[13px] font-semibold rounded-full hover:bg-[#111212] hover:text-white transition-all duration-300">
                        View role <ArrowRight size={14} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="w-full flex items-center justify-center p-[20px]">
        <div className="w-full max-w-[1400px] flex md:flex-row flex-col justify-between md:gap-[96px] gap-[8px] rounded-[24px] md:px-[48px] px-[16px] md:py-[40px] py-[20px] bg-white border border-[#e5e5e5]">
          <h3 className="lg:text-[56px] text-[30px] lg:leading-[64px] font-semibold font-mont text-[#111212] max-w-[642px]">
            Don&apos;t see your role?
          </h3>
          <div className="max-w-[354px] w-full flex items-start flex-col md:gap-[20px] gap-[40px]">
            <p className="text-[16px] leading-[24px] text-[#929296] font-inter">Send us your CV and tell us what you&apos;re great at.</p>
            <Link href="/careers/apply?position=General+Application"
              className="flex items-center justify-center px-[24px] pt-[14px] pb-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300">
              Send your CV
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
