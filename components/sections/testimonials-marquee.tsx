'use client'

import { useRef, useEffect } from 'react'
import type { Testimonial } from '@/lib/wordpress'

function TestimonialCard({ t }: { t: Testimonial }) {
  const quote = t.content.rendered.replace(/<[^>]*>/g, '').substring(0, 150)
  const rating = t.acf?.rating || 5
  return (
    <div className="mx-3 w-[340px] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? 'text-yellow-400' : 'text-white/20'}>★</span>
        ))}
      </div>
      <p className="text-white/80 text-sm leading-relaxed line-clamp-3">"{quote}"</p>
      <div className="pt-3 border-t border-white/10">
        <p className="text-white font-semibold text-sm">
          {t.acf?.author_name || t.title.rendered || 'Anonymous'}
        </p>
        <p className="text-white/50 text-xs mt-0.5">
          {[t.acf?.author_title, t.acf?.author_company].filter(Boolean).join(' · ')}
        </p>
      </div>
    </div>
  )
}

function MarqueeRow({ items, reverse }: { items: Testimonial[]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const speed = reverse ? 0.4 : -0.4
    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += speed
        const half = track.scrollWidth / 2
        if (posRef.current <= -half) posRef.current = 0
        if (posRef.current >= 0 && reverse) posRef.current = -half
        track.style.transform = `translateX(${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reverse])

  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <div ref={trackRef} className="flex will-change-transform w-max">
        {doubled.map((t, i) => <TestimonialCard key={`${t.id}-${i}`} t={t} />)}
      </div>
    </div>
  )
}

export function TestimonialsMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  const half = Math.ceil(testimonials.length / 2)
  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <MarqueeRow items={testimonials.slice(0, half)} />
      <MarqueeRow items={testimonials.slice(half)} reverse />
    </div>
  )
}
