'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

const STEP_DURATION = 5000

const STEPS = [
  {
    num: '01', label: 'Discovery',
    description: 'We start by deeply understanding your business, users, and goals. Through stakeholder interviews, competitive analysis, and technical audits, we define the problem space and align on a clear product vision.',
    points: ['Stakeholder interviews & requirement mapping', 'Technical feasibility and architecture planning', 'Clear project scope, timeline, and milestones'],
    image: '/discover.avif',
  },
  {
    num: '02', label: 'Design & Validate',
    description: 'Our design team translates insights into wireframes, user flows, and interactive prototypes. We validate every design decision through usability testing and user feedback to ensure your product truly solves real problems.',
    points: ['High-fidelity UI/UX designs aligned with brand and goals', 'Interactive prototype ready for stakeholder review', 'Validated user experience through usability testing'],
    image: '/computer.avif',
  },
  {
    num: '03', label: 'Build & Secure',
    description: 'Our engineers build your product with clean, scalable code following industry best practices. Security, performance, and maintainability are baked in from day one — not bolted on at the end.',
    points: ['Agile sprints with weekly demos and feedback loops', 'Automated testing, CI/CD pipelines, and code reviews', 'Security-first development with penetration testing'],
    image: '/design-build.avif',
  },
  {
    num: '04', label: 'Scale & Optimize',
    description: 'After launch, we help you measure success, scale infrastructure, and continuously improve based on user data. From performance tuning to adding new features, we make sure your product grows with your business.',
    points: ['Analytics-driven insights and optimization', 'Performance improvements and feature scaling', 'Ongoing support and maintenance for long-term'],
    image: '/scale-optimize.avif',
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
    <section className="w-full flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex flex-col items-start gap-[32px] lg:py-[96px] py-[64px] lg:px-[36px] px-[16px]">

        <h2 className="text-black font-mont md:text-[64px] text-[32px] md:font-bold font-semibold md:leading-[64px] leading-[32px]">
          A proven, transparent process that takes you from idea to production.
        </h2>

        {/* Tabs */}
        <div className="w-full flex justify-start md:gap-[48px] gap-[32px] overflow-x-auto no-scrollbar">
          {STEPS.map((s, i) => {
            const isActive = i === active
            const isPast = i < active
            return (
              <button key={s.num} onClick={() => goTo(i)}
                className="min-w-fit flex items-center gap-[8px] cursor-pointer transition-opacity duration-500"
                style={{ opacity: isActive || isPast ? 1 : 0.35 }}
              >
                {/* Circle */}
                <div className="relative w-[48px] h-[48px] flex items-center justify-center shrink-0">
                  {/* future: dashed grey */}
                  {!isActive && !isPast && (
                    <div className="absolute inset-0 rounded-full border border-dashed border-[#CCCCCC]" />
                  )}
                  {/* past: solid black fill + border */}
                  {isPast && (
                    <div className="absolute inset-0 rounded-full bg-[#111212] border-2 border-[#111212]" />
                  )}
                  {/* active: spinning dashed black ring */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border border-dashed border-[#111212] animate-spin-slow" />
                  )}
                  <span className="relative z-10 text-[14px] font-semibold font-mont"
                    style={{ color: isPast ? '#fff' : '#111212' }}>
                    {s.num}
                  </span>
                </div>

                {/* Label + progress bar */}
                <div className="flex flex-col items-start gap-[8px] text-[14px] font-semibold">
                  <span className="whitespace-nowrap">{s.label}</span>
                  <div className="w-[128px] h-[2px] bg-[#D9D9D9] rounded-full overflow-hidden">
                    {isPast && <div className="h-full w-full bg-[#111212] rounded-full" />}
                    {isActive && (
                      <div className="h-full bg-[#111212] rounded-full origin-left"
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
          className="w-full gap-[20px] py-[40px] border-t border-[#D9D9D9] flex md:flex-row flex-col text-[#111212] animate-fade-in-up">
          <div className="w-full overflow-hidden md:max-w-[585px]">
            <h3 className="md:max-w-[50%] font-mont md:text-[48px] text-[28px] font-bold md:leading-[50px] leading-[28px]">
              {step.label}
            </h3>
          </div>
          <div className="w-full flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[16px]">
              <p className="text-[16px] font-normal font-inter leading-[24px]">{step.description}</p>
              <div className="flex flex-col gap-[8px]">
                <p className="text-[16px] font-semibold font-inter">What You Get</p>
                {step.points.map((pt, j) => (
                  <div key={j} className="flex items-center gap-[8px]">
                    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" className="shrink-0">
                      <path d="M23.6443 0L17.4672 5.51909C16.2155 5.63467 14.9396 5.66357 13.6637 5.65394C12.3879 5.66357 11.112 5.63467 9.86024 5.51909L3.68314 0L0 17.4675C0.00962913 17.848 0.852185 18.5704 1.16513 18.8738C3.25947 20.882 5.47898 22.7747 7.6022 24.754L7.65998 20.9542C6.10487 19.2879 4.29461 17.8335 2.94653 15.989L5.15158 5.14345L9.92283 10.3591C10.0721 10.5518 10.2646 10.5229 10.4717 10.547C11.242 10.6192 12.4553 10.6529 13.6637 10.6529C14.8722 10.6529 16.0855 10.6192 16.8558 10.547C17.0628 10.5229 17.2554 10.5518 17.4047 10.3591L22.1759 5.14345L24.381 15.989C23.0329 17.8335 21.2226 19.2879 19.6675 20.9542L19.7253 24.754C21.8485 22.7747 24.068 20.882 26.1624 18.8738C26.4753 18.5704 27.3178 17.848 27.3275 17.4675L23.6443 0Z" fill="black" />
                    </svg>
                    <p className="text-[16px] font-normal font-inter">{pt}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full sm:h-[500px] h-[400px] rounded-[24px] overflow-hidden">
              <Image src={step.image} alt={step.label} width={900} height={500}
                className="w-full h-full object-cover object-center" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
