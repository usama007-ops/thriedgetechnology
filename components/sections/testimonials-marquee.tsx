'use client'

import { useRef, useEffect } from 'react'
import type { Testimonial } from '@/lib/wordpress'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

function TestimonialCard({ t }: { t: Testimonial }) {
  const quote = t.content.rendered.replace(/<[^>]*>/g, '').trim()
  const rating = t.acf?.rating ?? 5
  const name = t.acf?.author_name || t.title.rendered
  const role = [t.acf?.author_title, t.acf?.author_company]
    .filter(Boolean)
    .join(' at ')

  return (
    <div className="w-full h-full rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < rating ? 'text-yellow-400' : 'text-white/20'}
          >
            ★
          </span>
        ))}
      </div>

      <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
        "{quote}"
      </p>

      <div className="flex items-center gap-[12px] pt-[16px] border-t border-[#353535] mt-auto">
        <div className="w-[40px] h-[40px] rounded-full bg-[#111212] flex items-center justify-center text-white font-mont font-bold text-[14px] shrink-0">
          {name.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="text-[14px] font-mont font-semibold text-[#fff] leading-none">
            {name}
          </p>

          {role && (
            <p className="text-[12px] font-inter text-[#929296] mt-[3px]">
              {role}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function MarqueeCard({ t }: { t: Testimonial }) {
  return (
    <div className="mx-3 w-85 shrink-0">
      <TestimonialCard t={t} />
    </div>
  )
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: Testimonial[]
  reverse?: boolean
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track || items.length === 0) return

    const speed = reverse ? 0.4 : -0.4

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += speed

        const half = track.scrollWidth / 2

        if (!reverse && posRef.current <= -half) {
          posRef.current = 0
        }

        if (reverse && posRef.current >= 0) {
          posRef.current = -half
        }

        track.style.transform = `translateX(${posRef.current}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    if (reverse) {
      posRef.current = -(track.scrollWidth / 2)
      track.style.transform = `translateX(${posRef.current}px)`
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafRef.current)
  }, [reverse, items.length])

  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
    >
      <div ref={trackRef} className="flex will-change-transform w-max">
        {doubled.map((t, i) => (
          <MarqueeCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  )
}

function MobileTestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  return (
    <div className="md:hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1.1}
        centeredSlides={true}
        loop={testimonials.length > 1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}

        pagination={{
          clickable: true,
        }}
        className="testimonials-swiper pb-10!"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <TestimonialCard t={t} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export function TestimonialsMarquee({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const half = Math.ceil(testimonials.length / 2)

  if (!testimonials.length) return null

  return (
    <>
      <MobileTestimonialsCarousel testimonials={testimonials} />

      <div className="hidden md:flex flex-col gap-6 overflow-hidden">
        <MarqueeRow items={testimonials.slice(0, half)} />
        <MarqueeRow items={testimonials.slice(half)} reverse />
      </div>
    </>
  )
}