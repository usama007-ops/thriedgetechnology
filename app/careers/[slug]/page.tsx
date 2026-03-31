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

      {/* Breadcrumb */}
      <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] pt-[32px]">
        <Link href="/careers" className="inline-flex items-center gap-[6px] text-[13px] font-inter text-[#929296] hover:text-black transition-colors duration-200">
          <ArrowLeft size={14} /> Back to Careers
        </Link>
      </div>

      {/* Hero */}
      <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] md:py-[64px] py-[48px] flex md:flex-row flex-col md:items-end justify-between gap-[32px]">
        <div className="flex flex-col gap-[16px]">
          {dept && (
            <p className="text-[12px] font-inter font-semibold uppercase tracking-[0.2em] text-[#929296]">{dept}</p>
          )}
          <h1 className="text-[40px] md:text-[56px] font-mont font-bold leading-[1.1] text-[#111212]">
            {job.title.rendered}
          </h1>
          <div className="flex items-center gap-[12px] flex-wrap">
            {position && (
              <span className="flex items-center gap-[6px] text-[14px] font-inter text-[#929296]">
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
          className="shrink-0 flex items-center gap-[8px] px-[28px] pt-[14px] pb-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300"
        >
          Apply now <ArrowRight size={16} />
        </Link>
      </div>

      {/* Content + sidebar */}
      <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] pb-[96px] flex md:flex-row flex-col gap-[64px] items-start">

        {/* Job description */}
        <div className="flex-1 min-w-0">
          {job.content?.rendered ? (
            <div
              className="job-content"
              dangerouslySetInnerHTML={{ __html: job.content.rendered }}
            />
          ) : (
            <p className="text-[16px] font-inter text-[#929296]">No description available.</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:w-[300px] w-full shrink-0 md:sticky md:top-[100px] flex flex-col gap-[24px]">
          {/* Details card */}
          <div className="border border-[#e5e5e5] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
            <p className="text-[11px] font-inter font-semibold uppercase tracking-[0.15em] text-[#929296]">Role details</p>
            {dept && (
              <div className="flex flex-col gap-[4px]">
                <p className="text-[12px] font-inter text-[#929296]">Department</p>
                <p className="text-[14px] font-mont font-semibold text-[#111212]">{dept}</p>
              </div>
            )}
            {position && (
              <div className="flex flex-col gap-[4px]">
                <p className="text-[12px] font-inter text-[#929296]">Position</p>
                <p className="text-[14px] font-mont font-semibold text-[#111212]">{position}</p>
              </div>
            )}
            {type && (
              <div className="flex flex-col gap-[4px]">
                <p className="text-[12px] font-inter text-[#929296]">Work type</p>
                <span className={`text-[12px] font-inter font-semibold px-[10px] py-[3px] rounded-full w-fit ${TYPE_COLOR[type]}`}>
                  {TYPE_LABEL[type]}
                </span>
              </div>
            )}
          </div>

          {/* Apply CTA */}
          <div className="rounded-[16px] p-[24px] flex flex-col gap-[14px]"
            style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a2e 100%)' }}>
            <p className="text-[11px] font-inter font-semibold text-white/40 uppercase tracking-[0.12em]">Interested?</p>
            <p className="text-[15px] font-mont font-semibold text-white leading-[1.35]">Apply for this role today.</p>
            <Link
              href={`/careers/apply?position=${encodeURIComponent(job.title.rendered)}`}
              className="inline-flex items-center gap-[7px] text-[12px] font-mont font-semibold text-black bg-white px-[14px] py-[8px] rounded-[8px] hover:bg-white/90 transition-colors duration-200 w-fit"
            >
              Apply now <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
