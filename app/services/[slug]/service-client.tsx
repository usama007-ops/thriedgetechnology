'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import { useService } from '@/hooks/use-services'
import { useQuery } from '@tanstack/react-query'
import { Loader, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ProcessSection } from '@/components/sections/process-section'
import { ValueFeaturesSection } from '@/components/sections/value-features-section'

export function ServiceClient({ slug }: { slug: string }) {
  const { data: service, isLoading, error } = useService(slug)

  if (error) notFound()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-[#F3F3F3] min-h-screen">
        <Loader size={32} className="text-black animate-spin" />
      </div>
    )
  }

  if (!service) notFound()

  const acf = service.acf ?? {}
  const heroImg = acf.image?.url || service._embedded?.['wp:featuredmedia']?.[0]?.source_url

  const howWeWork = acf.how_we_work ?? {}
  const hwwSteps = Object.entries(howWeWork)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => ({ key, ...(val as { label: string; text: string }) }))

  const ourCorePoints = acf.our_core_points ?? {}
  const coreSteps = Object.entries(ourCorePoints)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => ({ key, ...(val as { label: string; text: string }) }))

  const counts = [acf.service_count?.count_1, acf.service_count?.count_2, acf.service_count?.count_3].filter(Boolean)
  const projects = acf.projects ?? []

  return (
    <div className="relative bg-[#F3F3F3]">

      {/* Hero */}
      <section className="mx-auto p-2 w-full">
        <div className="relative rounded-[20px] w-full h-[480px] md:h-[600px] overflow-hidden">
          {heroImg ? (
            <Image src={heroImg} alt={service.title.rendered} fill
              className="object-center object-cover" sizes="100vw" priority />
          ) : (
            <div className="absolute inset-0 bg-[#111212]">
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
            </div>
          )}
          <div className="absolute inset-0 rounded-[20px]"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.5), rgba(0,0,0,0))' }} />
          <div className="right-0 bottom-0 left-0 absolute flex lg:flex-row flex-col justify-between lg:items-end gap-4 mx-auto px-5 lg:px-9 py-6 lg:py-10 max-w-[1440px]">
            <div className="flex flex-col gap-3">
              <span className="font-inter font-semibold text-[11px] text-white/40 uppercase tracking-[0.2em]">Service</span>
              <h1 className="max-w-2xl font-mont font-semibold text-[32px] text-white lg:text-[60px] leading-none"
                dangerouslySetInnerHTML={{ __html: service.title.rendered }} />
            </div>
            {acf.service_solutions && (
              <p className="lg:max-w-sm font-inter text-[15px] text-white/60 lg:text-[17px] lg:text-right leading-7">
                {acf.service_solutions.slice(0, 160)}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      {counts.length > 0 && (
        <div className="gap-[2px] grid grid-cols-1 md:grid-cols-3 bg-[#e5e5e5] mx-auto mt-2 px-2 max-w-[1440px] rounded-[20px] overflow-hidden">
          {counts.map((c, i) => (
            <div key={i} className="flex flex-col gap-[8px] bg-white px-[32px] py-[40px]">
              <p className="font-mont font-semibold text-[48px] text-black xl:text-[80px] xl:leading-[80px]">
                {c!.number}
              </p>
              <p className="font-inter text-[#929296] text-[14px]">{c!.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* About / Description */}
      {(acf.about_us?.title || acf.about_us?.text) && (
        <div className="flex md:flex-row flex-col gap-[64px] md:gap-[96px] mx-auto px-[16px] md:px-[36px] py-[80px] md:py-[112px] w-full max-w-[1440px]">
          {acf.about_us.title && (
            <h2 className="w-full max-w-[480px] font-mont font-semibold text-[32px] md:text-[48px] leading-[1.1]">
              {acf.about_us.title}
            </h2>
          )}
          {acf.about_us.text && (
            <div
              className="flex flex-col gap-[16px] w-full font-inter text-[#555] text-[18px] [&_p]:text-[18px] leading-[30px] [&_p]:leading-[30px] [&_strong]:font-semibold [&_strong]:text-[#111212]"
              dangerouslySetInnerHTML={{ __html: acf.about_us.text }}
            />
          )}
        </div>
      )}

      {/* Projects Marquee */}
      {projects.length > 0 && (
        <div className="py-4">
          <ProjectsMarquee projects={projects} />
        </div>
      )}

      {/* How We Work */}
      {hwwSteps.length > 0 && (
        <div className="bg-white w-full">
          <div className="mx-auto px-[16px] md:px-[36px] py-[80px] md:py-[112px] w-full max-w-[1440px]">
            <div className="flex md:flex-row flex-col md:gap-[64px] gap-[48px] items-start">
              <div className="md:w-[420px] w-full shrink-0 md:sticky md:top-[100px]">
                <h2 className="font-mont font-bold text-[#111212] text-[32px] md:text-[48px] leading-[1.15]">
                  How we work
                </h2>
                <p className="mt-[20px] font-inter text-[#929296] text-[16px] leading-[26px]">
                  A clear, repeatable process that keeps projects on track and clients informed at every step.
                </p>
              </div>
              <div className="flex-1 flex flex-col">
                {hwwSteps.map((step, i) => (
                  <div key={step.key}
                    className="group flex flex-col gap-[16px] items-start px-[20px] py-[32px] border-t border-[#D9D9D9] hover:border-[#111212] transition-all duration-300">
                    <div className="flex justify-center items-center bg-[#f7f7f7] group-hover:bg-[#111212] rounded-[12px] w-[48px] h-[48px] transition-colors duration-300">
                      <span className="font-mont font-bold text-[#929296] group-hover:text-white text-[14px] tabular-nums transition-colors duration-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-mont font-semibold text-black text-[20px] md:text-[24px]">{step.label}</h3>
                    <p className="font-inter text-[#111212] text-[16px] leading-[26px]">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Marquee text strip */}
      <MarqueeStrip />

      {/* Core Points */}
      {coreSteps.length > 0 && (
        <div className="bg-[#111212] w-full">
          <div className="mx-auto px-[16px] md:px-[36px] py-[80px] md:py-[112px] w-full max-w-[1440px]">
            {acf.our_core_title && (
              <div className="flex md:flex-row flex-col justify-between md:items-end gap-[32px] mb-[64px]">
                <h2 className="max-w-[560px] font-mont font-bold text-white text-[40px] md:text-[48px] leading-[1.1]">
                  {acf.our_core_title}
                </h2>
                <p className="max-w-[360px] font-inter text-white/40 text-[15px] leading-[26px]">
                  The principles that guide every decision we make on your project.
                </p>
              </div>
            )}
            <div className="gap-[16px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {coreSteps.map((step, i) => (
                <div key={step.key}
                  className="group flex flex-col gap-[24px] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-[20px] p-[32px] transition-all duration-300">
                  <span className="font-mont font-bold text-white/15 text-[56px] leading-none tabular-nums select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-[10px]">
                    <h3 className="font-mont font-semibold text-white text-[20px] leading-[28px]">{step.label}</h3>
                    <p className="font-inter text-white/50 text-[15px] leading-[26px]">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full-width service image */}
      {acf.image?.url && (
        <div className="mx-auto px-2 pb-2 w-full max-w-[1440px]">
          <div className="relative rounded-[20px] w-full h-[300px] md:h-[500px] overflow-hidden">
            <Image src={acf.image.url} alt={acf.image.alt || service.title.rendered}
              fill className="object-cover object-center" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      )}

      {/* Value Features */}
      <ValueFeaturesSection />

      {/* Process */}
      <div className="bg-white">
        <ProcessSection />
      </div>

      {/* CTA */}
            <div className="bg-[#111212] max-w-[1440px] mx-auto mb-20 rounded-[30px]">
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-[48px] mx-auto px-[16px] md:px-[36px] py-[96px] w-full max-w-[1440px]">
          <div className="flex flex-col gap-[16px] max-w-[500px]">
            <h2 className="font-mont font-bold text-[48px] text-white leading-[52px]">
              Not sure which service fits?
            </h2>
            <p className="font-inter text-[#929296] text-[16px] leading-[24px]">
              Tell us about your project and we'll recommend the right approach in 48h.
            </p>
          </div>
          <div className="flex sm:flex-row flex-col gap-[16px]">
            <Link href="/contact"
              className="flex justify-center items-center bg-white px-[32px] py-[16px] rounded-full font-mont font-semibold text-[#111212] text-[16px] hover:scale-105 transition-all duration-300">
              Book a call
            </Link>
            <Link href="/work"
              className="flex justify-center items-center hover:bg-white px-[32px] py-[16px] border border-white rounded-full font-mont font-semibold text-[16px] text-white hover:text-[#111212] transition-all duration-300">
              See our work
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

/* ── Projects auto-scroll marquee ── */
function ProjectsMarquee({ projects }: { projects: Array<{ ID: number; post_title: string; post_name: string }> }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)

  const ids = projects.map(p => p.ID).join(',')
  const { data: workItems } = useQuery({
    queryKey: ['work-items-by-ids', ids],
    queryFn: async () => {
      if (!ids) return []
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/work?include=${ids}&_embed&acf_format=standard&per_page=100`
      )
      return res.json() as Promise<Array<{ id: number; slug: string; title: { rendered: string }; _embedded?: { 'wp:featuredmedia'?: Array<{ source_url: string }> } }>>
    },
    enabled: !!ids,
  })

  const imageMap = useMemo(() => {
    const m: Record<number, string> = {}
    workItems?.forEach(w => {
      const img = w._embedded?.['wp:featuredmedia']?.[0]?.source_url
      if (img) m[w.id] = img
    })
    return m
  }, [workItems])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const speed = 0.5
    const animate = () => {
      posRef.current -= speed
      const half = track.scrollWidth / 2
      if (Math.abs(posRef.current) >= half) posRef.current = 0
      track.style.transform = `translateX(${posRef.current}px)`
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const doubled = [...projects, ...projects]

  return (
    <section className="w-full overflow-hidden">
      <div ref={trackRef} className="flex items-center gap-[12px] will-change-transform">
        {doubled.map((p, i) => {
          const img = imageMap[p.ID]
          return (
            <div key={i} className="flex-shrink-0">
              <Link href={`/work/${p.post_name}`}>
                <div className="group relative bg-[#111212] rounded-[20px] w-[280px] sm:w-[380px] lg:w-[560px] h-[220px] md:h-[360px] overflow-hidden">
                  {img && (
                    <Image src={img} alt={p.post_title} fill
                      className="opacity-80 group-hover:opacity-100 group-hover:scale-105 object-cover transition-all duration-700"
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 560px" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="right-[16px] bottom-[16px] left-[16px] absolute flex justify-between items-end">
                    <span className="font-mont font-semibold text-[16px] text-white leading-[22px]">
                      {p.post_title}
                    </span>
                    <span className="flex justify-center items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-full w-8 h-8 shrink-0">
                      <ArrowUpRight size={14} className="text-white" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ── Marquee text strip ── */
function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const speed = 0.4
    const animate = () => {
      posRef.current -= speed
      const half = track.scrollWidth / 2
      if (Math.abs(posRef.current) >= half) posRef.current = 0
      track.style.transform = `translateX(${posRef.current}px)`
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const items = Array(8).fill('it starts with an idea')

  return (
    <section className="py-6 overflow-hidden whitespace-nowrap">
      <div ref={trackRef} className="flex gap-[80px] w-max will-change-transform">
        {items.map((t, i) => (
          <span key={i}
            className="font-mont font-semibold text-[80px] text-transparent lg:text-[160px] leading-normal select-none"
            style={{ WebkitTextStroke: '1.5px rgb(180, 180, 184)' }}>
            {t}
          </span>
        ))}
      </div>
    </section>
  )
}
