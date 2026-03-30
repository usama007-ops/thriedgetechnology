'use client'

import Marquee from 'react-fast-marquee'
import type { Testimonial } from '@/lib/wordpress'

function TestimonialCard({ t }: { t: Testimonial }) {
  const quote = t.content.rendered.replace(/<[^>]*>/g, '').substring(0, 150)
  const rating = t.acf?.rating || 5

  return (
    <div className="mx-3 w-[340px] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? 'text-yellow-400' : 'text-white/20'}>★</span>
        ))}
      </div>
      {/* Quote */}
      <p className="text-white/80 text-sm leading-relaxed line-clamp-3">"{quote}"</p>
      {/* Author */}
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

export function TestimonialsMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  const half = Math.ceil(testimonials.length / 2)
  const row1 = testimonials.slice(0, half)
  const row2 = testimonials.slice(half)

  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      {/* Row 1 — left to right */}
      <Marquee gradient={false} speed={40} pauseOnHover direction="left">
        {row1.map((t) => <TestimonialCard key={t.id} t={t} />)}
      </Marquee>

      {/* Row 2 — right to left */}
      <Marquee gradient={false} speed={40} pauseOnHover direction="right">
        {row2.map((t) => <TestimonialCard key={t.id} t={t} />)}
      </Marquee>
    </div>
  )
}
