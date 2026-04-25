'use client'

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

const FEATURES = [
  {
    icon: '/search.svg',
    title: 'Discovery & Roadmap',
    duration: '1–2 weeks',
    description:
      'Our workshops help you articulate your value proposition, prioritize essential features, and craft a go-to-market strategy aligned with your goals.',
  },
  {
    icon: '/dongle.svg',
    title: 'Clickable Prototype',
    duration: '1–2 weeks',
    description:
      'This Figma prototype closely resembles your final product, providing an authentic experience for demos or pitches. It captures your vision, ensuring stakeholders appreciate your concept.',
  },
  {
    icon: '/varified-user.svg',
    title: 'User Validation',
    duration: '1–2 weeks',
    description:
      'User testing is vital for refining features. It helps identify issues early, saving time and resources by avoiding costly rework later.',
  },
  {
    icon: '/prototype.svg',
    title: 'Production Starter Repo',
    duration: '1–2 weeks',
    description:
      'A clean, organized codebase using Next.js and React, with CI/CD pipelines ready for development sprints. This ensures smooth workflows and efficient collaboration.',
  },
]

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex flex-col gap-[20px] items-start px-[20px] py-[32px] border-t border-[#D9D9D9] group hover:border-[#111212] transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${index * 80}ms`,
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms, border-color 0.3s`,
      }}
    >
      <div className="w-[48px] h-[48px] flex items-center justify-center rounded-[12px] bg-[#f7f7f7] group-hover:bg-[#111212] transition-colors duration-300">
        <Image src={feature.icon} alt={feature.title} width={24} height={24}
          className="w-[22px] h-[22px] group-hover:invert transition-all duration-300" />
      </div>
      <div className="w-full flex items-center justify-between gap-[20px]">
        <h3 className="text-black font-mont md:text-[24px] text-[20px] font-semibold">{feature.title}</h3>
        <p className="text-[#929296] font-inter text-[14px] shrink-0">{feature.duration}</p>
      </div>
      <p className="text-[#111212] font-inter text-[16px] font-normal leading-6">{feature.description}</p>
    </div>
  )
}

export function ValueFeaturesSection() {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="w-full max-w-[1440px] lg:py-[96px] py-[64px] lg:px-[36px] px-[16px]">
        <div className="flex lg:flex-row flex-col lg:gap-[64px] gap-[48px] items-start">

          {/* Leftsticky title */}
          <div className="lg:w-[420px] w-full shrink-0 lg:sticky lg:top-[100px]">
            <h2 className="text-black font-mont md:text-[48px] text-[32px] font-semibold md:leading-[56px] leading-[38px]">
              Validate your product idea, impress investors, and get to market faster.
            </h2>
            <p className="mt-[20px] text-[#929296] font-inter text-[16px] leading-[24px]">
              Without wasting time or money on the wrong features.
            </p>
          </div>

          {/* Rightscrolling cards */}
          <div className="grid sm:grid-cols-2 lg:flex lg:flex-col lg:flex-1 ">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
