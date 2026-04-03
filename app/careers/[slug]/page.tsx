import { getJob, getJobs } from '@/lib/wordpress'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, Briefcase, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const jobs = await getJobs().catch(() => [])
  return jobs.map(j => ({ slug: j.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const job = await getJob(slug)
  return {
    title: job ? `${job.title.rendered} | Careers — Thrill Edge` : 'Job Not Found',
  }
}

const TYPE_LABEL: Record<string, string> = { onsite: 'Onsite', hybrid: 'Hybrid', remote: 'Remote' }
const TYPE_COLOR: Record<string, string> = {
  onsite: 'bg-[#f3f3f3] text-[#111212]',
  hybrid: 'bg-[#fff8e6] text-[#92600a]',
  remote: 'bg-[#e8f5e9] text-[#2e7d32]',
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params
  const job = await getJob(slug)
  if (!job) notFound()

  const dept = job.department?.[0]?.name
  const type = job.acf?.type
  const position = job.acf?.position

  return (
    <div className="relative bg-white">

      {/* Hero */}
      <div className="flex md:flex-row flex-col justify-between md:items-end gap-[32px] mx-auto px-[16px] md:px-[36px] py-[48px] md:py-[64px] w-full max-w-[1440px]">
        <div className="flex flex-col gap-[16px]">
          {dept && (
            <p className="font-inter font-semibold text-[#929296] text-[12px] uppercase tracking-[0.2em]">{dept}</p>
          )}
          <h1 className="font-mont font-bold text-[#111212] text-[40px] md:text-[56px] leading-[1.1]">
            {job.title.rendered}
          </h1>
          <div className="flex flex-wrap items-center gap-[12px]">
            {position && (
              <span className="flex items-center gap-[6px] font-inter text-[#929296] text-[14px]">
                <Briefcase size={14} />{position}
              </span>
            )}
            {type && (
              <span className={`text-[12px] font-inter font-semibold px-[12px] py-[4px] rounded-full ${TYPE_COLOR[type] ?? 'bg-[#f3f3f3] text-[#111212]'}`}>
                {TYPE_LABEL[type] ?? type}
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/careers/apply?position=${encodeURIComponent(job.title.rendered)}`}
          className="flex items-center gap-[8px] bg-black px-[28px] pt-[14px] pb-[12px] rounded-full font-mont font-semibold text-[14px] text-white hover:scale-105 transition-all duration-300 shrink-0"
        >
          Apply now <ArrowRight size={16} />
        </Link>
      </div>

      {/* Content + sidebar */}
      <div className="flex md:flex-row flex-col items-start gap-[64px] mx-auto px-[16px] md:px-[36px] pb-[96px] w-full max-w-[1440px]">

        {/* Job description */}
        <div className="flex-1 min-w-0">
          {job.content?.rendered ? (
            <div
              className="job-content"
              dangerouslySetInnerHTML={{ __html: job.content.rendered }}
            />
          ) : (
            <p className="font-inter text-[#929296] text-[16px]">No description available.</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:top-[100px] md:sticky flex flex-col gap-[24px] w-full md:w-[300px] shrink-0">
          {/* Details card */}
          <div className="flex flex-col gap-[16px] p-[24px] border border-[#e5e5e5] rounded-[16px]">
            <p className="font-inter font-semibold text-[#929296] text-[11px] uppercase tracking-[0.15em]">Role details</p>
            {dept && (
              <div className="flex flex-col gap-[4px]">
                <p className="font-inter text-[#929296] text-[12px]">Department</p>
                <p className="font-mont font-semibold text-[#111212] text-[14px]">{dept}</p>
              </div>
            )}
            {position && (
              <div className="flex flex-col gap-[4px]">
                <p className="font-inter text-[#929296] text-[12px]">Position</p>
                <p className="font-mont font-semibold text-[#111212] text-[14px]">{position}</p>
              </div>
            )}
            {type && (
              <div className="flex flex-col gap-[4px]">
                <p className="font-inter text-[#929296] text-[12px]">Work type</p>
                <span className={`text-[12px] font-inter font-semibold px-[10px] py-[3px] rounded-full w-fit ${TYPE_COLOR[type]}`}>
                  {TYPE_LABEL[type]}
                </span>
              </div>
            )}
          </div>

          {/* Apply CTA */}
          <div className="flex flex-col gap-[14px] p-[24px] rounded-[16px]"
            style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a2e 100%)' }}>
            <p className="font-inter font-semibold text-[11px] text-white/40 uppercase tracking-[0.12em]">Interested?</p>
            <p className="font-mont font-semibold text-[15px] text-white leading-[1.35]">Apply for this role today.</p>
            <Link
              href={`/careers/apply?position=${encodeURIComponent(job.title.rendered)}`}
              className="inline-flex items-center gap-[7px] bg-white hover:bg-white/90 px-[14px] py-[8px] rounded-[8px] w-fit font-mont font-semibold text-[12px] text-black transition-colors duration-200"
            >
              Apply now <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
