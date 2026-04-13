'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import { useService } from '@/hooks/use-services'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export default function ServicePage({ params }: ServicePageProps) {
  const { slug } = React.use(params)
  const { data: service, isLoading, error } = useService(slug)

  if (error) notFound()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-white min-h-screen">
        <Loader size={32} className="text-black animate-spin" />
      </div>
    )
  }

  if (!service) notFound()

  const acf = service.acf ?? {}
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
    <div className="relative bg-[#f3f3f3]">

      {/* Hero */}
      {(() => {
        const heroImg = acf.image?.url || service._embedded?.['wp:featuredmedia']?.[0]?.source_url
        return heroImg ? (
          <section className="mx-auto p-2 w-full">
            <div className="relative rounded-[20px] w-full h-[480px] md:h-[640px] overflow-hidden">
              <Image
                src={heroImg}
                alt={service.title.rendered}
                fill
                className="object-center object-cover"
                sizes="100vw"
                priority
              />
              <div
                className="absolute inset-0 rounded-[20px]"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.6), rgba(0,0,0,0))' }}
              />
              <div className="right-0 bottom-0 left-0 absolute flex lg:flex-row flex-col justify-between lg:items-end gap-4 mx-auto px-5 lg:px-9 py-6 lg:py-8 max-w-[1440px]">
                <h1
                  className="max-w-2xl font-mont font-semibold text-[32px] text-white lg:text-[56px] leading-9 lg:leading-[60px]"
                  dangerouslySetInnerHTML={{ __html: service.title.rendered }}
                />
                {acf.service_solutions && (
                  <p className="lg:max-w-xs font-inter text-[15px] text-white/70 lg:text-[18px] leading-7">
                    {acf.service_solutions.slice(0, 140)}
                  </p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <div className="flex md:flex-row flex-col gap-[32px] md:gap-[64px] mx-auto px-[16px] md:px-[36px] py-[64px] w-full max-w-[1440px]">
            <h1 className="w-full max-w-[610px] font-mont font-semibold text-[24px]"
              dangerouslySetInnerHTML={{ __html: service.title.rendered }}
            />
            {acf.service_solutions && (
              <p className="w-full max-w-[694px] font-mont font-semibold text-[40px] leading-[48px]">
                {acf.service_solutions}
              </p>
            )}
          </div>
        )
      })()}

      {/* Projects Marquee */}
      {projects.length > 0 && (
        <ProjectsMarquee projects={projects} />
      )}

      {/* Stats */}
      {counts.length > 0 && (
        <div className="gap-[20px] grid grid-cols-1 md:grid-cols-3 mx-auto px-[16px] md:px-[36px] py-[64px] w-full max-w-[1440px]">
          {counts.map((c, i) => (
            <div key={i} className="flex flex-col gap-[4px] px-[24px] py-[32px] border-[#CCCCCC] border-l">
              <p className="font-mont font-semibold text-[40px] text-black xl:text-[80px] xl:leading-[80px]">
                {c!.number}
              </p>
              <p className="font-inter text-[#929296] text-[14px]">{c!.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* About Us */}
      {(acf.about_us?.title || acf.about_us?.text) && (
        <div className="flex md:flex-row flex-col gap-[96px] mx-auto px-[16px] md:px-[36px] py-[64px] md:py-[96px] w-full max-w-[1440px]">
          {acf.about_us.title && (
            <h2 className="w-full font-mont font-semibold text-[40px] leading-[48px]">
              {acf.about_us.title}
            </h2>
          )}
          {acf.about_us.text && (
            <div
              className="flex flex-col gap-[16px] w-full font-inter font-normal [&_strong]:font-semibold text-[#111212] text-[16px] [&_p]:text-[16px] leading-[24px] [&_p]:leading-[24px]"
              dangerouslySetInnerHTML={{ __html: acf.about_us.text }}
            />
          )}
        </div>
      )}

      {/* Marquee text strip */}
      <MarqueeStrip />


      {/* How We Work */}
      {hwwSteps.length > 0 && (
        <div className="mx-auto px-[16px] md:px-[36px] py-[64px] md:py-[96px] w-full max-w-[1440px]">
          <h2 className="mb-[48px] font-mont font-semibold text-[40px] leading-[48px]">How we work</h2>
          <div className="gap-[1px] grid grid-cols-1 md:grid-cols-3 bg-[#e5e5e5]">
            {hwwSteps.map((step) => (
              <div key={step.key} className="flex flex-col gap-[16px] bg-white p-[32px]">
                <span className="font-inter text-[#929296] text-[14px]">{step.key}</span>
                <p className="font-mont font-semibold text-[20px] text-black leading-[28px]">{step.label}</p>
                <p className="font-inter text-[#929296] text-[16px] leading-[24px]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Our Core Points */}
      {coreSteps.length > 0 && (
        <div className="mx-auto px-[16px] md:px-[36px] py-[64px] md:py-[96px] w-full max-w-[1440px]">
          {acf.our_core_title && (
            <h2 className="mb-[48px] font-mont font-semibold text-[40px] leading-[48px]">{acf.our_core_title}</h2>
          )}
          <div className="gap-[1px] grid grid-cols-1 md:grid-cols-3 bg-[#e5e5e5]">
            {coreSteps.map((step) => (
              <div key={step.key} className="flex flex-col gap-[16px] bg-white p-[32px]">
                <span className="font-inter text-[#929296] text-[14px]">{step.key}</span>
                <p className="font-mont font-semibold text-[20px] text-black leading-[28px]">{step.label}</p>
                <p className="font-inter text-[#929296] text-[16px] leading-[24px]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Image */}
      {acf.image?.url && (
        <div className="mx-auto px-[16px] md:px-[36px] pb-[64px] w-full max-w-[1440px]">
          <div className="relative rounded-[20px] w-full overflow-hidden">
            <Image
              src={acf.image.url}
              alt={acf.image.alt || service.title.rendered}
              width={acf.image.width || 1440}
              height={acf.image.height || 800}
              className="rounded-[20px] w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="flex justify-center items-center p-[20px] w-full">
        <div className="flex md:flex-row flex-col justify-between gap-[8px] md:gap-[96px] bg-white px-[16px] md:px-[48px] py-[20px] md:py-[40px] border border-[#e5e5e5] rounded-[24px] w-full max-w-[1400px]">
          <h3 className="max-w-[642px] font-mont font-semibold text-[#111212] text-[30px] lg:text-[56px] lg:leading-[64px]">
            Let&apos;s Build Your Next Big Thing
          </h3>
          <div className="flex flex-col items-start gap-[40px] md:gap-[20px] w-full max-w-[354px]">
            <p className="font-inter text-[#929296] text-[16px] leading-[24px]">
              Your idea, our brainswe&apos;ll send you a tailored game plan in 48h.
            </p>
            <Link
              href="/contact"
              className="flex justify-center items-center bg-black px-[24px] pt-[14px] pb-[12px] rounded-full font-mont font-semibold text-[14px] text-white hover:scale-105 transition-all duration-300"
            >
              Book a call
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

/* ── Projects auto-scroll marquee ── */
function ProjectsMarquee({ projects }: { projects: Array<{ ID: number; post_title: string; post_name: string }> }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)

  // Fetch full work items (with featured images) for the related project IDs
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

  // Map ID → image URL for quick lookup
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
    <section className="bg-transparent py-0 w-full overflow-hidden">
      <div ref={trackRef} className="flex items-center gap-[20px] will-change-transform">
        {doubled.map((p, i) => {
          const img = imageMap[p.ID]
          return (
            <div key={i} className="flex-shrink-0">
              <Link href={`/work/${p.post_name}`}>
                <div className="relative bg-[#111212] rounded-[20px] w-[300px] sm:w-[400px] lg:w-[600px] h-[250px] md:h-[400px] overflow-hidden">
                  {img && (
                    <Image
                      src={img}
                      alt={p.post_title}
                      fill
                      className="opacity-80 object-cover"
                      sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 600px"
                    />
                  )}
                  {/* gradient + title overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="right-[20px] bottom-[20px] left-[20px] absolute font-mont font-semibold text-[18px] text-white leading-[24px]">
                    {p.post_title}
                  </span>
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

  const text = 'it starts with an idea'
  const items = Array(8).fill(text)

  return (
    <section className="py-4 overflow-hidden whitespace-nowrap">
      <div ref={trackRef} className="flex gap-[100px] w-max will-change-transform">
        {items.map((t, i) => (
          <span
            key={i}
            className="font-mont font-semibold text-[100px] text-transparent lg:text-[180px] leading-normal"
            style={{ WebkitTextStroke: '2px rgb(146, 146, 150)' }}
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  )
}
