'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Animate } from '@/components/common/animate'
import {
  Rocket, Globe, Star, Clock, Zap, Lightbulb,
} from 'lucide-react'

const TIMELINE = [
  { year: '2022', text: 'Founded to build custom software for startups that needed production-ready code, not templates. First clients were early-stage product companies in the US and UK.' },
  { year: '2023', text: 'Established a dedicated mobile engineering practice, expanding our capabilities across iOS and Android platforms. By the end of the year, we had successfully delivered over 50 products for clients across the United States, United Kingdom, and Australia.' },
  { year: '2024', text: 'Expanded our global presence with operational hubs across the United States, Canada, Australia, and Europe. Transitioned all active projects to cloud-native architectures, significantly enhancing scalability and reliability. This shift enabled us to accelerate delivery cycles, reducing median deployment timelines from bi-weekly to daily.' },
  { year: '2025', text: 'Delivered our first production-grade AI models for healthcare and fintech clients, marking a significant expansion into advanced, data-driven solutions. During this period, our Clutch rating reached 4.9 stars across 68 verified client reviews, reflecting consistent delivery excellence and client satisfaction.' },
  { year: '2026', text: 'Strategically focused on three core domains: AI-assisted product development, mobile commerce, and healthcare software systems. Our current active engagements span 8 countries, reflecting continued global expansion and domain specialization.' },
]

const FAQS = [
  { q: 'How do you handle bugs that reach production?', a: 'We run automated test coverage on every release. When a bug reaches production, our on-call engineer responds within 2 hours. We document root causes and update our test suite to prevent recurrence. Most issues are caught in staging, not after launch.' },
  { q: 'How do you manage collaboration across different time zones?', a: 'We operate across US, Canada, Australia, and Europe. Every project runs on weekly sprint reviews with written status updates. If a deadline shifts, you hear it from us first, not after the fact.' },
  { q: 'How do you vet your engineering talent?', a: 'Every engineer on your project has shipped production code in your stack before. We review every pull request before it merges. No code written by a junior goes unreviewed.' },
  { q: 'Have you ever pushed back on a client\'s approach?', a: 'Yes, regularly. We flag technical debt, scope creep, and architectural decisions that will cost more to fix later. Our job is to ship the right product, not just the requested one.' },
  { q: 'Who owns the code and IP at the end of a project?', a: 'You do. Full IP transfer is included in every engagement. We retain no rights to your codebase, designs, or data.' },
  { q: 'Can your team work inside our existing engineering workflow?', a: 'Yes. We adapt to your tools, GitHub, Jira, Linear, Slack, whatever you use. We embed into your workflow, not the other way around.' },
  { q: 'Do you have experience with regulated industries?', a: 'Yes. Our codebase and workflows meet SOC 2, GDPR, and HIPAA requirements by default. We deliver audit-ready documentation alongside every release.' },
]

const CARDS = [
  { icon: '/search.svg', title: 'On-Time & Transparent', desc: 'We deliver across the US, Canada, Australia, and Europe using structured weekly sprints, clear reporting, and proactive communication ensuring zero surprises.' },
  { icon: '/varified-user.svg', title: 'Built-In Compliance & Security', desc: 'SOC 2, GDPR, and HIPAA aligned from day one. Every release includes audit-ready documentation, reducing risk and eliminating extra compliance cycles.' },
  { icon: '/prototype.svg', title: 'Production-Ready AI & Cloud', desc: 'We build and scale AI systems with a focus on performance, scalability, and seamless modernization—delivering real business impact without disruption.' },
]

const features = [
  { title: 'Proven Track Record', desc: 'Delivered 50+ high-quality products across multiple industries.', icon: Rocket },
  { title: 'Global Clients', desc: 'Trusted by startups and enterprises worldwide.', icon: Globe },
  { title: 'Top Rated', desc: 'Consistently rated 4.9★ by satisfied clients.', icon: Star },
  { title: 'On-Time Delivery', desc: 'Weekly tracking ensures deadlines are always met.', icon: Clock },
  { title: 'High Performance', desc: 'Optimized for speed, scalability, and reliability.', icon: Zap },
  { title: 'Smart Solutions', desc: 'Built with modern architecture and best practices.', icon: Lightbulb },
]

function FAQ({ items }: { items: typeof FAQS }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="border-[#d0d0ce] border-t w-full">
      {items.map((item, i) => (
        <div key={i} className="border-[#d0d0ce] border-b">
          <button onClick={() => setOpen(open === i ? null : i)}
            className="flex justify-between items-start gap-6 py-7 w-full text-left cursor-pointer">
            <span className="pr-2 font-mont font-semibold text-[#111212] text-[18px] leading-[1.35]">
              <span className="mr-3.5 font-inter font-normal tabular-nums text-[#999] text-[13px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.q}
            </span>
            <span className="flex shrink-0 justify-center items-center mt-1 w-6 h-6 transition-transform duration-300"
              style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1V15M1 8H15" stroke="#111212" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          {open === i && (
            <p className="pb-7 max-w-170 font-inter text-[#555] text-[16px] leading-[1.75]">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="relative bg-[#F3F3F3] mb-25">
      {/* Banner */}
      <section className="px-3 md:px-2.5">
        <div className="relative w-full h-120 rounded-[20px] overflow-hidden">
          <Image src="/aboutus.jpg" alt="About us" fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 rounded-[20px]" style={{ background: 'linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.6), rgba(0,0,0,0))' }} />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col max-w-360 lg:flex-row justify-between lg:items-end gap-4 lg:px-9 px-5 lg:py-8 py-6 mx-auto">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-sm font-inter text-white/70">About Us</span>
              <h2 className="text-[32px] lg:text-[56px] lg:leading-15 leading-9 font-mont font-semibold text-white">
                We Build Modern Digital Experiences
              </h2>
            </div>
            <p className="lg:text-[18px] text-[15px] font-inter text-white/70 lg:max-w-1/2 leading-7">
              We are a team of developers and designers focused on building scalable, high-performance digital products.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-white px-[16px] py-[64px] md:py-[96px]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 items-center gap-10">
            <Animate variant="slide-left" className="w-full flex justify-center items-center">
              <Image src="/zeerak.jpeg" alt="team collaboration" width={500} height={400}
                className="rounded-xl object-cover w-full h-[500px]" />
            </Animate>
            <div className='w-full'>
              <Animate variant="slide-right" delay={120} className="flex flex-col gap-4 w-full font-inter font-normal text-[#111212] text-[16px] leading-[24px]">
                <p className="font-medium text-[20px] leading-7 text-gray-500">About Us</p>
                <h2 className="font-mont font-semibold text-[32px] md:text-[40px] leading-10 md:leading-12">Who We Are</h2>
                <p>Thrill Edge Technologies is a full-stack software agency founded by Zeerak Jamshaid, built on the principle that exceptional software must be engineered with precision not pieced together.</p>
                <p>Today, Thrill Edge Technologies operates as a fully integrated software partner, delivering product strategy, UI/UX design, frontend, backend, mobile development, cloud infrastructure, and AI solutions.</p>
                <p>With a 4.9-star client rating and more than a decade of experience delivering production-grade systems, we apply senior-level expertise to every project.</p>
              </Animate>
              {/* book a free call */}
              <div className='mt-10'>
                <Link href="/contact" className="w-fit bg-black text-white px-[32px] py-[16px] rounded-full font-mont font-semibold text-[16px] hover:scale-105 transition-all duration-300 capitalize">
                  Book a free call
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20 flex md:flex-row flex-col items-center gap-[32px]">
            {CARDS.map((c, i) => (
              <Animate key={c.title} variant="fade-up" delay={i * 120}>
                <div className="group flex flex-col items-start gap-[20px] bg-[#eee] hover:bg-[#f9f9ff] px-[24px] py-[24px] border border-transparent hover:border-[#e8eeff] rounded-[16px] transition-all duration-200 min-h-[300px]">
                  <Image src={c.icon} alt={c.title} width={40} height={40}
                    className="group-hover:scale-105 transition-transform duration-200" style={{ width: '40px', height: 'auto' }} />
                  <div className="flex flex-col gap-[14px]">
                    <h3 className="font-mont font-semibold text-[24px] text-black leading-normal">{c.title}</h3>
                    <p className="font-inter font-normal text-[#929296] text-[16px] leading-[24px]">{c.desc}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-[16px] py-[64px] md:py-[96px]">
        <div className="max-w-[1440px] mx-auto">
          <Animate variant="blur-in" className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <h2 className="font-mont font-semibold text-[28px] md:text-[40px] leading-[36px] md:leading-[48px]">Why Choose Us</h2>
            <p className="mt-3 font-inter text-[#929296] text-[16px]">We build scalable, high-performance products with a strong focus on quality and long-term growth.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((item, i) => {
              const Icon = item.icon
              return (
                <Animate key={item.title} variant="scale-in" delay={i * 80}>
                  <div className="group bg-[#111212] border border-[#1f1f1f] rounded-2xl p-5 md:p-6 transition-all duration-300">
                    <div className="mb-3 md:mb-4 w-10 h-10 flex items-center justify-center rounded-lg bg-[#1a1a1a] group-hover:bg-[#eee]/10 transition">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="px-[16px] py-[64px] md:py-[96px] bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-[40px] items-center">
            <Animate variant="slide-left">
              <Image src="/culture.png" alt="team collaboration" width={500} height={400} className="rounded-xl object-cover w-full" />
            </Animate>
            <Animate variant="slide-right" delay={120} className="flex flex-col gap-[20px] w-full font-inter font-normal text-[#111212] text-[16px] leading-[24px]">
              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.2em]">How we operate</span>
              <h2 className="w-full font-mont font-semibold text-[40px] leading-[48px]">Our Culture</h2>
              <p className="font-inter text-[#555] text-[18px] leading-[30px]">
                <strong className="text-[#111212]">We hire for ownership, not just skill.</strong> Every engineer has shipped production-grade code in real environments.
              </p>
              <p className="font-inter text-[#555] text-[18px] leading-[30px]">Code quality is non-negotiable. Every pull request is reviewed before merging, maintaining a sub-1% deployment error rate.</p>
              <p className="font-inter text-[#555] text-[18px] leading-[30px]">
                <strong className="text-[#111212]">We communicate clearly.</strong> No unnecessary meetings—just async updates and direct access to the engineer working on your product.
              </p>
              <div className="gap-[12px] grid grid-cols-1 sm:grid-cols-2 mt-[8px]">
                {[
                  { label: 'Ownership over excuses', desc: 'Every engineer owns their work end to end.' },
                  { label: 'Clarity over complexity', desc: 'Simple, readable code beats clever code every time.' },
                  { label: 'Speed with standards', desc: 'We move fast but never at the cost of quality.' },
                  { label: 'Honest communication', desc: 'We tell you what you need to hear, not what sounds good.' },
                ].map((p) => (
                  <div key={p.label} className="flex flex-col gap-[6px] bg-[#eee] rounded-[14px] px-[20px] py-[18px]">
                    <span className="font-mont font-semibold text-[#111212] text-[15px]">{p.label}</span>
                    <span className="font-inter text-[#929296] text-[14px] leading-[22px]">{p.desc}</span>
                  </div>
                ))}
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-[16px] py-[64px] md:py-[96px]" style={{ overflow: 'visible' }}>
        <div className="max-w-[1440px] mx-auto">
          <Animate variant="blur-in" className="text-center lg:max-w-[40%] mx-auto mb-16">
            <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.2em]">Since 2022</span>
            <h3 className="mt-[12px] font-mont font-bold text-[#111212] text-[32px] md:text-[48px] leading-[1.1]">Our history</h3>
            <p className="mt-[20px] font-inter text-[#929296] text-[16px] leading-[26px]">
              Over a decade of shipping production-grade software for companies that needed more than templates.
            </p>
          </Animate>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              {TIMELINE.map((t, i) => (
                <div key={t.year} style={{ position: 'sticky', top: `${80 + i * 20}px`, zIndex: i + 1, marginBottom: i < TIMELINE.length - 1 ? '16px' : '0' }}>
                  <div className="rounded-[20px] p-9 md:p-12 transition-shadow duration-300 flex flex-col justify-center"
                    style={{ backgroundColor: i % 2 === 0 ? '#111212' : '#ffffff', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', minHeight: '280px' }}>
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full font-inter font-semibold text-[12px] uppercase tracking-[0.15em] mb-[24px] w-[65px]"
                      style={{ backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.08)' : '#F3F3F3', color: i % 2 === 0 ? 'rgba(255,255,255,0.5)' : '#929296' }}>
                      {t.year}
                    </span>
                    <p className="font-mont font-semibold text-[18px] md:text-[22px] leading-normal"
                      style={{ color: i % 2 === 0 ? '#ffffff' : '#111212' }}>{t.text}</p>
                    <div className="flex justify-between items-center mt-[32px] pt-[24px]"
                      style={{ borderTop: `1px solid ${i % 2 === 0 ? 'rgba(255,255,255,0.08)' : '#f0f0f0'}` }}>
                      <span className="font-inter tabular-nums text-[13px]" style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.2)' : '#ccc' }}>
                        {String(i + 1).padStart(2, '0')} / {String(TIMELINE.length).padStart(2, '0')}
                      </span>
                      <span className="font-mont font-bold text-[48px] leading-none tabular-nums select-none"
                        style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}>{t.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden lg:block" style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
              <Image src="/our-history-2.png" alt="team collaboration" width={500} height={400}
                className="rounded-xl object-cover w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-[16px] py-[64px] md:py-[96px] w-full bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col items-center gap-[20px]">
            <Animate variant="slide-left" className="w-full">
              <h2 className="w-full font-mont font-semibold lg:font-bold text-[32px] text-black lg:text-[64px] text-start leading-[38px] lg:leading-[64px]">
                Frequently asked <br /> questions
              </h2>
            </Animate>
            <FAQ items={FAQS} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <Animate variant="scale-in">
          <div className="bg-[#111212] max-w-[1440px] mx-auto rounded-[30px]">
            <div className="flex lg:flex-row flex-col justify-between md:items-center gap-[48px] mx-auto px-[30px] py-[96px] w-full max-w-[1440px]">
              <div className="flex flex-col items-center md:items-items-start gap-[16px] lg:max-w-[500px]">
                <h2 className="font-mont font-bold text-[48px] text-white leading-[52px]">Not sure which service fits?</h2>
                <p className="font-inter text-[#929296] text-[16px] leading-[24px]">Tell us about your project and we'll recommend the right approach in 48h.</p>
              </div>
              <div className="flex md:flex-row flex-col gap-[16px]">
                <Link href="/contact" className="flex justify-center items-center bg-white px-[32px] py-[16px] rounded-full font-mont font-semibold text-[#111212] text-[16px] hover:scale-105 transition-all duration-300 capitalize">Book a call</Link>
                <Link href="/project-cost-estimation" className="flex justify-center items-center hover:bg-white px-[32px] py-[16px] border border-white rounded-full font-mont font-semibold text-[16px] text-white hover:text-[#111212] transition-all duration-300 capitalize">Get an Project Estimate</Link>
              </div>
            </div>
          </div>
        </Animate>
      </section>
    </div>
  )
}
