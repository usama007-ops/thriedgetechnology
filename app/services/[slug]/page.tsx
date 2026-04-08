'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import { useService } from '@/hooks/use-services'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { cn } from "../../../lib/utils";

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export default function ServicePage({ params }: ServicePageProps) {
  const { slug } = React.use(params)
  const { data: service, isLoading, error } = useService(slug)

  if (error) notFound()

  if (isLoading) {
    return (
      <div className={cn('flex', 'justify-center', 'items-center', 'bg-white', 'min-h-screen')}>
        <Loader size={32} className={cn('text-black', 'animate-spin')} />
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
    <div className={cn('relative', 'bg-[#f3f3f3]')}>

      {/* Hero */}
      <div className={cn('flex', 'md:flex-row', 'flex-col', 'gap-[32px]', 'md:gap-[64px]', 'mx-auto', 'px-[16px]', 'md:px-[36px]', 'py-[64px]', 'w-full', 'max-w-[1440px]')}>
        <h1 className={cn('w-full', 'max-w-[610px]', 'font-mont', 'font-semibold', 'text-[24px]')}
          dangerouslySetInnerHTML={{ __html: service.title.rendered }}
        />
        {acf.service_solutions && (
          <p className={cn('w-full', 'max-w-[694px]', 'font-mont', 'font-semibold', 'text-[40px]', 'leading-[48px]')}>
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
        <div className={cn('gap-[20px]', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'mx-auto', 'px-[16px]', 'md:px-[36px]', 'py-[64px]', 'w-full', 'max-w-[1440px]')}>
          {counts.map((c, i) => (
            <div key={i} className={cn('flex', 'flex-col', 'gap-[4px]', 'px-[24px]', 'py-[32px]', 'border-[#CCCCCC]', 'border-l')}>
              <p className={cn('font-mont', 'font-semibold', 'text-[40px]', 'text-black', 'xl:text-[80px]', 'xl:leading-[80px]')}>
                {c!.number}
              </p>
              <p className={cn('font-inter', 'text-[#929296]', 'text-[14px]')}>{c!.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* About Us */}
      {(acf.about_us?.title || acf.about_us?.text) && (
        <div className={cn('flex', 'md:flex-row', 'flex-col', 'gap-[96px]', 'mx-auto', 'px-[16px]', 'md:px-[36px]', 'py-[64px]', 'md:py-[96px]', 'w-full', 'max-w-[1440px]')}>
          {acf.about_us.title && (
            <h2 className={cn('w-full', 'font-mont', 'font-semibold', 'text-[40px]', 'leading-[48px]')}>
              {acf.about_us.title}
            </h2>
          )}
          {acf.about_us.text && (
            <div
              className={cn('flex', 'flex-col', 'gap-[16px]', 'w-full', 'font-inter', 'font-normal', '[&_strong]:font-semibold', 'text-[#111212]', 'text-[16px]', '[&_p]:text-[16px]', 'leading-[24px]', '[&_p]:leading-[24px]')}
              dangerouslySetInnerHTML={{ __html: acf.about_us.text }}
            />
          )}
        </div>
      )}

      {/* Marquee text strip */}
      <MarqueeStrip />


      {/* How We Work */}
      {hwwSteps.length > 0 && (
        <div className={cn('mx-auto', 'px-[16px]', 'md:px-[36px]', 'py-[64px]', 'md:py-[96px]', 'w-full', 'max-w-[1440px]')}>
          <h2 className={cn('mb-[48px]', 'font-mont', 'font-semibold', 'text-[40px]', 'leading-[48px]')}>How we work</h2>
          <div className={cn('gap-px', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'bg-[#e5e5e5]')}>
            {hwwSteps.map((step) => (
              <div key={step.key} className={cn('flex', 'flex-col', 'gap-[16px]', 'bg-white', 'p-[32px]')}>
                <span className={cn('font-inter', 'text-[#929296]', 'text-[14px]')}>{step.key}</span>
                <p className={cn('font-mont', 'font-semibold', 'text-[20px]', 'text-black', 'leading-[28px]')}>{step.label}</p>
                <p className={cn('font-inter', 'text-[#929296]', 'text-[16px]', 'leading-[24px]')}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Our Core Points */}
      {coreSteps.length > 0 && (
        <div className={cn('mx-auto', 'px-[16px]', 'md:px-[36px]', 'py-[64px]', 'md:py-[96px]', 'w-full', 'max-w-[1440px]')}>
          {acf.our_core_title && (
            <h2 className={cn('mb-[48px]', 'font-mont', 'font-semibold', 'text-[40px]', 'leading-[48px]')}>{acf.our_core_title}</h2>
          )}
          <div className={cn('gap-px', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'bg-[#e5e5e5]')}>
            {coreSteps.map((step) => (
              <div key={step.key} className={cn('flex', 'flex-col', 'gap-[16px]', 'bg-white', 'p-[32px]')}>
                <span className={cn('font-inter', 'text-[#929296]', 'text-[14px]')}>{step.key}</span>
                <p className={cn('font-mont', 'font-semibold', 'text-[20px]', 'text-black', 'leading-[28px]')}>{step.label}</p>
                <p className={cn('font-inter', 'text-[#929296]', 'text-[16px]', 'leading-[24px]')}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Image */}
      {acf.image?.url && (
        <div className={cn('mx-auto', 'px-[16px]', 'md:px-[36px]', 'pb-[64px]', 'w-full', 'max-w-[1440px]')}>
          <div className={cn('relative', 'rounded-[20px]', 'w-full', 'overflow-hidden')}>
            <Image
              src={acf.image.url}
              alt={acf.image.alt || service.title.rendered}
              width={acf.image.width || 1440}
              height={acf.image.height || 800}
              className={cn('rounded-[20px]', 'w-full', 'h-auto', 'object-cover')}
            />
          </div>
        </div>
      )}

      {/* CTA */}
      <section className={cn('flex', 'justify-center', 'items-center', 'p-[20px]', 'w-full')}>
        <div className={cn('flex', 'md:flex-row', 'flex-col', 'justify-between', 'gap-[8px]', 'md:gap-[96px]', 'bg-white', 'px-[16px]', 'md:px-[48px]', 'py-[20px]', 'md:py-[40px]', 'border', 'border-[#e5e5e5]', 'rounded-[24px]', 'w-full', 'max-w-[1400px]')}>
          <h3 className={cn('max-w-[642px]', 'font-mont', 'font-semibold', 'text-[#111212]', 'text-[30px]', 'lg:text-[56px]', 'lg:leading-[64px]')}>
            Let&apos;s Build Your Next Big Thing
          </h3>
          <div className={cn('flex', 'flex-col', 'items-start', 'gap-[40px]', 'md:gap-[20px]', 'w-full', 'max-w-[354px]')}>
            <p className={cn('font-inter', 'text-[#929296]', 'text-[16px]', 'leading-[24px]')}>
              Your idea, our brainswe&apos;ll send you a tailored game plan in 48h.
            </p>
            <Link
              href="/contact"
              className={cn('flex', 'justify-center', 'items-center', 'bg-black', 'px-[24px]', 'pt-[14px]', 'pb-[12px]', 'rounded-full', 'font-mont', 'font-semibold', 'text-[14px]', 'text-white', 'hover:scale-105', 'transition-all', 'duration-300')}
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
    <section className={cn('bg-transparent', 'py-0', 'w-full', 'overflow-hidden')}>
      <div ref={trackRef} className={cn('flex', 'items-center', 'gap-[20px]', 'will-change-transform')}>
        {doubled.map((p, i) => {
          const img = imageMap[p.ID]
          return (
            <div key={i} className="shrink-0">
              <Link href={`/work/${p.post_name}`}>
                <div className={cn('relative', 'bg-[#111212]', 'rounded-[20px]', 'w-[300px]', 'sm:w-[400px]', 'lg:w-[600px]', 'h-[250px]', 'md:h-[400px]', 'overflow-hidden')}>
                  {img && (
                    <Image
                      src={img}
                      alt={p.post_title}
                      fill
                      className={cn('opacity-80', 'object-cover')}
                      sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 600px"
                    />
                  )}
                  {/* gradient + title overlay */}
                  <div className={cn('absolute', 'inset-0', 'bg-linear-to-t', 'from-black/70', 'via-black/10', 'to-transparent')} />
                  <span className={cn('right-[20px]', 'bottom-[20px]', 'left-[20px]', 'absolute', 'font-mont', 'font-semibold', 'text-[18px]', 'text-white', 'leading-[24px]')}>
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
    <section className={cn('py-4', 'overflow-hidden', 'whitespace-nowrap')}>
      <div ref={trackRef} className={cn('flex', 'gap-[100px]', 'w-max', 'will-change-transform')}>
        {items.map((t, i) => (
          <span
            key={i}
            className={cn('font-mont', 'font-semibold', 'text-[100px]', 'text-transparent', 'lg:text-[180px]', 'leading-normal')}
            style={{ WebkitTextStroke: '2px rgb(146, 146, 150)' }}
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  )
}
