'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { cn } from "../../lib/utils";

const STEP_DURATION = 5000

const STEPS = [
  {
    num: '01', label: 'Strategic Discovery',
    description: 'We start by developing a deep understanding of your business, users, and long-term goals. Through research and strategic discussions, we define a clear direction for your product.',
    points: ['Stakeholder consultations & requirement analysis',
              'Technical feasibility assessment',
              'Defined project scope, roadmap, and milestones'],
    image: '/discovery.jpg',
  },
  {
    num: '02', label: 'Experience Design & Validation',
    description: ' We craft intuitive, user-centric designs that align with your brand and user expectations. Every concept is validated to ensure usability, functionality, and impact.',
    points: ['Wireframes & high-fidelity UI/UX designs', 'User journey mapping & experience strategy', 'Feedback-driven validation and iteration'],
    image: '/exp&design.jpg',
  },
  {
    num: '03', label: 'Engineering & Security',
    description: 'We build robust, scalable applications using modern technologies, ensuring performance, security, and reliability at every stage of development.',
    points: ['Clean, scalable, and maintainable codebase', 'Secure architecture & best practices implementation', 'Thorough testing and quality assurance'],
    image: '/security.jpg',
  },
  {
    num: '04', label: 'Growth, Scaling & Optimization',
    description: 'Post-launch, we focus on continuous improvement enhancing performance, scaling infrastructure, and optimizing user experience for long-term success.',
    points: ['Performance monitoring & optimization', 'Scalable infrastructure enhancements', 'Ongoing support and iteration'],
    image: '/growth.jpg',
  },
]

export function ProcessSection() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [contentKey, setContentKey] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startRef = useRef(Date.now())

  const goTo = useCallback((idx: number) => {
    setActive(idx)
    setProgress(0)
    setContentKey(k => k + 1)
    startRef.current = Date.now()
  }, [])

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    startRef.current = Date.now()
    intervalRef.current = setInterval(() => {
      const pct = Math.min(((Date.now() - startRef.current) / STEP_DURATION) * 100, 100)
      setProgress(pct)
      if (pct >= 100) {
        setActive(prev => {
          const next = (prev + 1) % STEPS.length
          setContentKey(k => k + 1)
          startRef.current = Date.now()
          setProgress(0)
          return next
        })
      }
    }, 16)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [active])

  const step = STEPS[active]

  return (
    <section className={cn('flex', 'justify-center', 'items-center', 'w-full')}>
      <div className={cn('flex', 'flex-col', 'items-start', 'gap-[32px]', 'px-[16px]', 'lg:px-[36px]', 'py-[64px]', 'lg:py-[96px]', 'w-full', 'max-w-[1440px]')}>

        <h2 className={cn('font-mont', 'font-semibold', 'md:font-bold', 'text-[32px]', 'text-black', 'md:text-[64px]', 'leading-[32px]', 'md:leading-[64px]')}>
        Built with Strategy. Designed to Scale. Delivered with Precision.
        </h2>

        {/* Tabs */}
        <div className={cn('flex', 'justify-start', 'gap-[32px]', 'md:gap-[48px]', 'w-full', 'overflow-x-auto', 'no-scrollbar')}>
          {STEPS.map((s, i) => {
            const isActive = i === active
            const isPast = i < active
            return (
              <button key={s.num} onClick={() => goTo(i)}
                className={cn('flex', 'items-center', 'gap-[8px]', 'min-w-fit', 'transition-opacity', 'duration-500', 'cursor-pointer')}
                style={{ opacity: isActive || isPast ? 1 : 0.35 }}
              >
                {/* Circle */}
                <div className={cn('relative', 'flex', 'justify-center', 'items-center', 'w-[48px]', 'h-[48px]', 'shrink-0')}>
                  {/* future: dashed grey */}
                  {!isActive && !isPast && (
                    <div className={cn('absolute', 'inset-0', 'border', 'border-[#CCCCCC]', 'border-dashed', 'rounded-full')} />
                  )}
                  {/* past: solid black fill + border */}
                  {isPast && (
                    <div className={cn('absolute', 'inset-0', 'bg-[#111212]', 'border-[#111212]', 'border-2', 'rounded-full')} />
                  )}
                  {/* active: spinning dashed black ring */}
                  {isActive && (
                    <div className={cn('absolute', 'inset-0', 'border', 'border-[#111212]', 'border-dashed', 'rounded-full', 'animate-spin-slow')} />
                  )}
                  <span className={cn('z-10', 'relative', 'font-mont', 'font-semibold', 'text-[14px]')}
                    style={{ color: isPast ? '#fff' : '#111212' }}>
                    {s.num}
                  </span>
                </div>

                {/* Label + progress bar */}
                <div className={cn('flex', 'flex-col', 'items-start', 'gap-[8px]', 'font-semibold', 'text-[14px]')}>
                  <span className="whitespace-nowrap">{s.label}</span>
                  <div className={cn('bg-[#D9D9D9]', 'rounded-full', 'w-[128px]', 'h-[2px]', 'overflow-hidden')}>
                    {isPast && <div className={cn('bg-[#111212]', 'rounded-full', 'w-full', 'h-full')} />}
                    {isActive && (
                      <div className={cn('bg-[#111212]', 'rounded-full', 'h-full', 'origin-left')}
                        style={{ width: `${progress}%` }} />
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div key={contentKey}
          className={cn('flex', 'md:flex-row', 'flex-col', 'gap-[20px]', 'py-[40px]', 'border-[#D9D9D9]', 'border-t', 'w-full', 'text-[#111212]', 'animate-fade-in-up')}>
          <div className={cn('w-full', 'md:max-w-[585px]', 'overflow-hidden')}>
            <h3 className={cn('md:max-w-[50%]', 'font-mont', 'font-bold', 'text-[28px]', 'md:text-[48px]', 'leading-[28px]', 'md:leading-[50px]')}>
              {step.label}
            </h3>
          </div>
          <div className={cn('flex', 'flex-col', 'gap-[32px]', 'w-full')}>
            <div className={cn('flex', 'flex-col', 'gap-[16px]')}>
              <p className={cn('font-inter', 'font-normal', 'text-[16px]', 'leading-[24px]')}>{step.description}</p>
              <div className={cn('flex', 'flex-col', 'gap-[8px]')}>
                <p className={cn('font-inter', 'font-semibold', 'text-[16px]')}>What You Get</p>
                {step.points.map((pt, j) => (
                  <div key={j} className={cn('flex', 'items-center', 'gap-[8px]')}>
                    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" className="shrink-0">
                      <path d="M23.6443 0L17.4672 5.51909C16.2155 5.63467 14.9396 5.66357 13.6637 5.65394C12.3879 5.66357 11.112 5.63467 9.86024 5.51909L3.68314 0L0 17.4675C0.00962913 17.848 0.852185 18.5704 1.16513 18.8738C3.25947 20.882 5.47898 22.7747 7.6022 24.754L7.65998 20.9542C6.10487 19.2879 4.29461 17.8335 2.94653 15.989L5.15158 5.14345L9.92283 10.3591C10.0721 10.5518 10.2646 10.5229 10.4717 10.547C11.242 10.6192 12.4553 10.6529 13.6637 10.6529C14.8722 10.6529 16.0855 10.6192 16.8558 10.547C17.0628 10.5229 17.2554 10.5518 17.4047 10.3591L22.1759 5.14345L24.381 15.989C23.0329 17.8335 21.2226 19.2879 19.6675 20.9542L19.7253 24.754C21.8485 22.7747 24.068 20.882 26.1624 18.8738C26.4753 18.5704 27.3178 17.848 27.3275 17.4675L23.6443 0Z" fill="black" />
                    </svg>
                    <p className={cn('font-inter', 'font-normal', 'text-[16px]')}>{pt}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={cn('relative', 'rounded-[24px]', 'w-full', 'h-[400px]', 'sm:h-[500px]', 'overflow-hidden')}>
              <Image src={step.image} alt={step.label} fill
                sizes="(max-width: 640px) 100vw, 60vw"
                className={cn('object-center', 'object-cover')} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
