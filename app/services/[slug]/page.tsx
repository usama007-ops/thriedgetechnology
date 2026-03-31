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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader size={32} className="animate-spin text-black" />
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
    <div className="relative bg-white">

      {/* Hero */}
      <div className="w-full max-w-[1440px] mx-auto flex md:flex-row flex-col md:gap-[64px] gap-[32px] md:px-[36px] px-[16px] py-[64px]">
        <h1 className="text-[24px] font-mont font-semibold w-full max-w-[610px]"
          dangerouslySetInnerHTML={{ __html: service.title.rendered }}
        />
        {acf.service_solutions && (
          <p className="w-full max-w-[694px] text-[40px] font-mont leading-[48px] font-semibold">
            {acf.service_solutions}
          </p>
        )}
      </div>

      {/* Projects Marquee */}
      {projects.length > 0 && (
        <ProjectsMarquee projects={projects} />
      )}

      {/* Stats */}
      {counts.length > 0 && (
        <div className="w-full max-w-[1440px] mx-auto grid md:grid-cols-3 grid-cols-1 gap-[20px] md:px-[36px] px-[16px] py-[64px]">
          {counts.map((c, i) => (
            <div key={i} className="flex flex-col gap-[4px] px-[24px] py-[32px] border-l border-[#CCCCCC]">
              <p className="xl:text-[80px] text-[40px] font-mont font-semibold text-black xl:leading-[80px]">
                {c!.number}
              </p>
              <p className="text-[14px] font-inter text-[#929296]">{c!.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* About Us */}
      {(acf.about_us?.title || acf.about_us?.text) && (
        <div className="w-full max-w-[1440px] mx-auto flex md:flex-row flex-col gap-[96px] md:px-[36px] px-[16px] md:py-[96px] py-[64px]">
          {acf.about_us.title && (
            <h2 className="text-[40px] font-mont font-semibold leading-[48px] w-full">
              {acf.about_us.title}
            </h2>
          )}
          {acf.about_us.text && (
            <div
              className="w-full flex flex-col gap-[16px] text-[#111212] font-inter text-[16px] font-normal leading-[24px] [&_p]:text-[16px] [&_p]:leading-[24px] [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: acf.about_us.text }}
            />
          )}
        </div>
      )}

      {/* Marquee text strip */}
      <MarqueeStrip />


      {/* How We Work */}
      {hwwSteps.length > 0 && (
        <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] md:py-[96px] py-[64px]">
          <h2 className="text-[40px] font-mont font-semibold leading-[48px] mb-[48px]">How we work</h2>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-[1px] bg-[#e5e5e5]">
            {hwwSteps.map((step) => (
              <div key={step.key} className="bg-white flex flex-col gap-[16px] p-[32px]">
                <span className="text-[14px] font-inter text-[#929296]">{step.key}</span>
                <p className="text-[20px] font-mont font-semibold text-black leading-[28px]">{step.label}</p>
                <p className="text-[16px] font-inter text-[#929296] leading-[24px]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Our Core Points */}
      {coreSteps.length > 0 && (
        <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] md:py-[96px] py-[64px]">
          {acf.our_core_title && (
            <h2 className="text-[40px] font-mont font-semibold leading-[48px] mb-[48px]">{acf.our_core_title}</h2>
          )}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-[1px] bg-[#e5e5e5]">
            {coreSteps.map((step) => (
              <div key={step.key} className="bg-white flex flex-col gap-[16px] p-[32px]">
                <span className="text-[14px] font-inter text-[#929296]">{step.key}</span>
                <p className="text-[20px] font-mont font-semibold text-black leading-[28px]">{step.label}</p>
                <p className="text-[16px] font-inter text-[#929296] leading-[24px]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Image */}
      {acf.image?.url && (
        <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] pb-[64px]">
          <div className="relative w-full rounded-[20px] overflow-hidden">
            <Image
              src={acf.image.url}
              alt={acf.image.alt || service.title.rendered}
              width={acf.image.width || 1440}
              height={acf.image.height || 800}
              className="w-full h-auto object-cover rounded-[20px]"
            />
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="w-full flex items-center justify-center p-[20px]">
        <div className="w-full max-w-[1400px] flex md:flex-row flex-col justify-between md:gap-[96px] gap-[8px] rounded-[24px] md:px-[48px] px-[16px] md:py-[40px] py-[20px] bg-white border border-[#e5e5e5]">
          <h3 className="lg:text-[56px] text-[30px] lg:leading-[64px] font-semibold font-mont text-[#111212] max-w-[642px]">
            Let&apos;s Build Your Next Big Thing
          </h3>
          <div className="max-w-[354px] w-full flex items-start flex-col md:gap-[20px] gap-[40px]">
            <p className="text-[16px] leading-[24px] text-[#929296] font-inter">
              Your idea, our brainswe&apos;ll send you a tailored game plan in 48h.
            </p>
            <Link
              href="/contact"
              className="flex items-center justify-center px-[24px] pt-[14px] pb-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300"
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
    <section className="w-full overflow-hidden bg-transparent py-0">
      <div ref={trackRef} className="flex items-center will-change-transform gap-[20px]">
        {doubled.map((p, i) => {
          const img = imageMap[p.ID]
          return (
            <div key={i} className="flex-shrink-0">
              <Link href={`/work/${p.post_name}`}>
                <div className="relative rounded-[20px] overflow-hidden lg:w-[600px] sm:w-[400px] w-[300px] md:h-[400px] h-[250px] bg-[#111212]">
                  {img && (
                    <Image
                      src={img}
                      alt={p.post_title}
                      fill
                      className="object-cover opacity-80"
                      sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 600px"
                    />
                  )}
                  {/* gradient + title overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute bottom-[20px] left-[20px] right-[20px] font-mont font-semibold text-[18px] text-white leading-[24px]">
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
    <section className="overflow-hidden whitespace-nowrap py-4">
      <div ref={trackRef} className="flex gap-[100px] will-change-transform w-max">
        {items.map((t, i) => (
          <span
            key={i}
            className="font-mont font-semibold lg:text-[180px] text-[100px] leading-normal text-transparent"
            style={{ WebkitTextStroke: '2px rgb(146, 146, 150)' }}
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  )
}
