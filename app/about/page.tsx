'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Rocket,
  Globe,
  Star,
  Clock,
  Zap,
  Lightbulb,
} from "lucide-react";

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

const AWARDS = [
  { src: '/clutch.svg', alt: 'Clutch' },
  { src: '/awwwards-black.svg', alt: 'Awwwards' },
  { src: '/designrush-black.svg', alt: 'Design Rush' },
  { src: '/csswinner-black.svg', alt: 'CssWinner' },
  { src: '/google.svg', alt: 'Google' },
  { src: '/trustpilot.svg', alt: 'Trustpilot' },
]

const CARDS = [
  {
    icon: '/search.svg',
    title: 'On-Time Delivery, Full Transparency',
    desc: 'We deliver across the US, Canada, Australia, and Europe using structured weekly sprints, clear reporting, and proactive communication—ensuring zero surprises.'
  },
  {
    icon: '/varified-user.svg',
    title: 'Built-In Compliance & Security',
    desc: 'SOC 2, GDPR, and HIPAA aligned from day one. Every release includes audit-ready documentation, reducing risk and eliminating extra compliance cycles.'
  },
  {
    icon: '/prototype.svg',
    title: 'Production-Ready AI & Cloud',
    desc: 'We build and scale AI systems with a focus on performance, scalability, and seamless modernization—delivering real business impact without disruption.'
  },
]

const features = [
  {
    title: "Proven Track Record",
    desc: "Delivered 50+ high-quality products across multiple industries.",
    icon: Rocket,
  },
  {
    title: "Global Clients",
    desc: "Trusted by startups and enterprises worldwide.",
    icon: Globe,
  },
  {
    title: "Top Rated",
    desc: "Consistently rated 4.9★ by satisfied clients.",
    icon: Star,
  },
  {
    title: "On-Time Delivery",
    desc: "Weekly tracking ensures deadlines are always met.",
    icon: Clock,
  },
  {
    title: "High Performance",
    desc: "Optimized for speed, scalability, and reliability.",
    icon: Zap,
  },
  {
    title: "Smart Solutions",
    desc: "Built with modern architecture and best practices.",
    icon: Lightbulb,
  },
];


function FAQ({ items }: { items: typeof FAQS }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="border-[#d0d0ce] border-t w-full">
      {items.map((item, i) => (
        <div key={i} className="border-[#d0d0ce] border-b">
          <button onClick={() => setOpen(open === i ? null : i)}
            className="flex justify-between items-start gap-[24px] py-[28px] w-full text-left cursor-pointer">
            <span className="pr-[8px] font-mont font-semibold text-[#111212] text-[18px] leading-[1.35]">
              <span className="mr-[14px] font-inter font-normal tabular-nums text-[#999] text-[13px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.q}
            </span>
            <span className="flex flex-shrink-0 justify-center items-center mt-[4px] w-[24px] h-[24px] transition-transform duration-300"
              style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1V15M1 8H15" stroke="#111212" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          {open === i && (
            <p className="pb-[28px] max-w-[680px] font-inter text-[#555] text-[16px] leading-[1.75]">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="relative bg-[#F3F3F3] pb-25">
      {/* Banner image */}
      <section className="px-[12px] md:px-[10px] w-full ">
        <div className="relative w-full h-[480px] md:h-[640px] rounded-[20px] overflow-hidden">

          {/* Background Image */}
          <Image
            src="/aboutus.jpg"
            alt="About us"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw "
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 rounded-[20px]"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.6), rgba(0,0,0,0))",
            }}
          />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col max-w-[1440px] lg:flex-row justify-between lg:items-end gap-4 lg:px-9 px-5 lg:py-8 py-6 max-w-[1440px] mx-auto">

            {/* Left Text */}
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-sm font-inter text-white/70">
                About Us
              </span>

              <h2 className="text-[32px] lg:text-[56px] lg:leading-[60px] leading-9 font-mont font-semibold text-white">
                We Build Modern Digital Experiences
              </h2>
            </div>

            {/* Right Description */}
            <p className="lg:text-[18px] text-[15px] font-inter text-white/70 lg:max-w-xs leading-7">
              We are a team of developers and designers focused on building scalable,
              high-performance digital products that help businesses grow online.
            </p>
          </div>
        </div>
      </section>

      {/* Awards, desktop static */}
      <div className="hidden md:flex flex-wrap justify-around  items-center gap-[48px] mx-auto md:px-[36px] py-[24px] border-[#ebebeb] border-t border-b w-full max-w-[1440px]">
        {AWARDS.map(a => (
          <Image key={a.alt} src={a.src} alt={a.alt} width={100} height={20}
            className="opacity-50 hover:opacity-100 w-fit transition-opacity duration-200" />
        ))}
      </div>

      {/* Awards, mobile marquee */}
      <div className="md:hidden relative py-[20px] w-full overflow-hidden">
        <div className="flex gap-[40px] w-max animate-marquee">
          {[...AWARDS, ...AWARDS].map((a, i) => (
            <Image key={i} src={a.src} alt={a.alt} width={124} height={26}
              className="w-fit h-[24px]" style={{ width: 'auto', height: '24px' }} />
          ))}
        </div>
      </div>

      {/* Who We Are */}
      <div className="flex md:flex-row flex-col items-center gap-[32px] md:gap-[96px] mx-auto px-[16px] md:px-[36px] py-[64px] md:py-[96px] w-full max-w-[1440px]">

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image
            src="/zeerak.jpeg"
            alt="team collaboration"
            width={500}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[16px] w-full md:w-1/2 font-inter font-normal text-[#111212] text-[16px] leading-[24px]">

          <p className="font-medium text-[20px] leading-[28px] text-gray-500">
            About Us
          </p>

          <h2 className="font-mont font-semibold text-[32px] md:text-[40px] leading-[40px] md:leading-[48px]">
            Who We Are
          </h2>

          <p>
            <strong>
              Thrill Edge Technologies is a full-stack software agency founded by Zeerak Jamshaid built on the belief that great software should be engineered, not assembled.
            </strong>
          </p>

          <p>
Zeerak Jamshaid started the agency with a simple premise: businesses deserve a technology partner that takes full ownership from architecture decisions to the final line of code. No hand-offs, no finger-pointing, just end-to-end accountability.          </p>

          <p>
            Today, Thrill Edge Technologies operates as a full-stack agency covering product strategy, UI/UX design, frontend, backend, mobile, cloud infrastructure, and AI  everything a modern digital product needs under one roof. We work with startups and scaling companies that need a team that moves fast without cutting corners.
          </p>

          <p>
            With a 4.9-star client rating and over a decade of shipping production-grade software, we bring the same senior-led rigour to every engagement  whether it&apos;s a greenfield build or a complex system overhaul.
          </p>

        </div>
      </div>

      {/* Value cards */}
      <div className="gap-[20px] grid grid-cols-1 md:grid-cols-3 mx-auto px-[16px] md:px-[36px] py-[20px] w-full max-w-[1440px]">
        {CARDS.map(c => (
          <div key={c.title} className="group flex flex-col items-start gap-[20px] bg-white hover:bg-[#f9f9ff] px-[24px] py-[24px] border border-transparent hover:border-[#e8eeff] rounded-[16px] transition-all duration-200">
            <Image src={c.icon} alt={c.title} width={40} height={40}
              className="group-hover:scale-105 transition-transform duration-200" style={{ width: '40px', height: 'auto' }} />
            <div className="flex flex-col gap-[14px]">
              <h3 className="font-mont font-semibold text-[24px] text-black leading-normal">{c.title}</h3>
              <p className="font-inter font-normal text-[#929296] text-[16px] leading-[24px]">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats ticker */}
      <section className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-mont font-semibold text-[32px] md:text-[40px] leading-[40px] md:leading-[48px]">
            Why Choose Us
          </h2>
          <p>
            We build scalable, high-performance products with a strong focus on
            quality and long-term growth.
          </p>
        </div>
        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group bg-[#111212] border border-[#1f1f1f] rounded-2xl p-6 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-4 w-10 h-10 flex items-center justify-center rounded-lg bg-[#1a1a1a] group-hover:bg-[#eee]/10 transition">
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-lg mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </section>
      {/* Culture */}
      <div className="flex md:flex-row flex-col gap-[32px] md:gap-[96px] mx-auto px-[16px] md:px-[36px] py-[64px] md:py-[96px] w-full max-w-[1440px]">
        <Image
          src="/culture.png"
          alt="team collaboration"
          width={500}
          height={400}
          className="rounded-xl object-cover"
        />

        <div className="flex flex-col gap-[20px] w-full font-inter font-normal text-[#111212] text-[16px] leading-[24px]">
          <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.2em]">How we operate</span>
          <h2 className="w-full font-mont font-semibold text-[40px] leading-[48px]">Our Culture</h2>

          <p className="font-inter text-[#555] text-[18px] leading-[30px]">
            <strong className="text-[#111212]">We hire for ownership, not just skill.</strong> Every engineer at Thrill Edge Technologies has shipped production-grade code before joining us. We don&apos;t run training programmes we run projects. That means the person writing your code has done it before, in a real environment, under real pressure.
          </p>

          <p className="font-inter text-[#555] text-[18px] leading-[30px]">
            Code quality is non-negotiable. Every pull request goes through peer review before it merges no exceptions. We maintain a sub-1% deployment error rate not because we track it as a vanity metric, but because our review culture makes anything higher unacceptable.
          </p>

          <p className="font-inter text-[#555] text-[18px] leading-[30px]">
            <strong className="text-[#111212]">We communicate like adults.</strong> No status theatre, no bloated standups. You get written sprint updates, async-first communication, and a direct line to the engineer working on your product not a project manager reading from a spreadsheet.
          </p>

          <p className="font-inter text-[#555] text-[18px] leading-[30px]">
            We push back when it matters. If a feature will create technical debt, slow down the product, or cost more to fix later we say so. Our job is to ship the right thing, not just the requested thing.
          </p>

          {/* Culture pillars */}
          <div className="gap-[12px] grid grid-cols-1 sm:grid-cols-2 mt-[8px]">
            {[
              { label: 'Ownership over excuses', desc: 'Every engineer owns their work end to end.' },
              { label: 'Clarity over complexity', desc: 'Simple, readable code beats clever code every time.' },
              { label: 'Speed with standards', desc: 'We move fast but never at the cost of quality.' },
              { label: 'Honest communication', desc: 'We tell you what you need to hear, not what sounds good.' },
            ].map((p) => (
              <div key={p.label} className="flex flex-col gap-[6px] bg-[#fff] rounded-[14px] px-[20px] py-[18px]">
                <span className="font-mont font-semibold text-[#111212] text-[15px]">{p.label}</span>
                <span className="font-inter text-[#929296] text-[14px] leading-[22px]">{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second banner */}
      <section className="mx-auto px-[16px] md:px-[36px] pb-[48px] md:pb-[96px] rounded-[16px] w-full max-w-[1440px] overflow-hidden">
        <video
          className="rounded-[16px] w-full h-auto min-h-[256px] max-h-[769px] object-cover"
          width={1440}
          height={769}
          autoPlay
          muted
          loop
        >
          <source src="/culture2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Timeline overlapping sticky cards */}
      <section className="mx-auto mb-[96px] px-[16px] md:px-[36px] pt-[40px] w-full max-w-[1440px]">
        <div className="flex md:flex-row flex-col md:gap-[64px] gap-[48px] items-start">

          {/* Left sticky label */}

          <div className="md:w-[360px] w-full shrink-0 md:sticky md:top-[100px]">
            <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.2em]">Since 2022</span>
            <h3 className="mt-[12px] font-mont font-bold text-[#111212] text-[32px] md:text-[48px] leading-[1.1]">
              Our history
            </h3>
            <p className="mt-[16px] font-inter text-[#929296] text-[16px] leading-[26px]">
              Over a decade of shipping production-grade software for companies that needed more than templates.
            </p>
            <Image src={"/our-history.png"} alt='Our history' className='rounded-[15px] mt-4' width={400} height={500}></Image>
          </div>
          {/* Right stacking sticky cards */}
          <div className="flex-1 flex flex-col gap-10">

            {TIMELINE.map((t, i) => (
              <div
                key={t.year}
                className="md:sticky"
                style={{ top: `${80 + i * 24}px`, zIndex: i + 1 }}
              >
                <div
                  className="rounded-[20px] p-[36px] md:p-[48px] mb-[12px] transition-shadow duration-300"
                  style={{
                    backgroundColor: i % 2 === 0 ? '#111212' : '#ffffff',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                  }}
                >
                  {/* Year badge */}
                  <span
                    className="inline-flex items-center px-[14px] py-[6px] rounded-full font-inter font-semibold text-[12px] uppercase tracking-[0.15em] mb-[24px]"
                    style={{
                      backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.08)' : '#F3F3F3',
                      color: i % 2 === 0 ? 'rgba(255,255,255,0.5)' : '#929296',
                    }}
                  >
                    {t.year}
                  </span>

                  <p
                    className="font-mont font-semibold text-[18px] md:text-[22px] leading-[1.5]"
                    style={{ color: i % 2 === 0 ? '#ffffff' : '#111212' }}
                  >
                    {t.text}
                  </p>

                  {/* Bottom index */}
                  <div className="flex justify-between items-center mt-[32px] pt-[24px]"
                    style={{ borderTop: `1px solid ${i % 2 === 0 ? 'rgba(255,255,255,0.08)' : '#f0f0f0'}` }}>
                    <span
                      className="font-inter tabular-nums text-[13px]"
                      style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.2)' : '#ccc' }}
                    >
                      {String(i + 1).padStart(2, '0')} / {String(TIMELINE.length).padStart(2, '0')}
                    </span>
                    <span
                      className="font-mont font-bold text-[48px] leading-none tabular-nums select-none"
                      style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}
                    >
                      {t.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="flex justify-center items-center w-full">
        <div className="flex flex-col items-center gap-[40px] px-[16px] lg:px-[36px] pb-[64px] lg:pb-[96px] w-full max-w-[1440px]">
          <h2 className="w-full font-mont font-semibold lg:font-bold text-[32px] text-black lg:text-[64px] text-start leading-[38px] lg:leading-[64px]">
            Frequently asked <br /> questions
          </h2>
          <FAQ items={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#111212] max-w-[1440px] mx-auto rounded-[30px]">
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-[48px] mx-auto px-[16px] md:px-[36px] py-[96px] w-full max-w-[1440px]">
          <div className="flex flex-col gap-[16px] max-w-[500px]">
            <h2 className="font-mont font-bold text-[48px] text-white leading-[52px]">
              Not sure which service fits?
            </h2>
            <p className="font-inter text-[#929296] text-[16px] leading-[24px]">
              Tell us about your project and we'll recommend the right approach in 48h.
            </p>
          </div>
          <div className="flex sm:flex-row flex-col gap-[16px]">
            <Link href="/contact"
              className="flex justify-center items-center bg-white px-[32px] py-[16px] rounded-full font-mont font-semibold text-[#111212] text-[16px] hover:scale-105 transition-all duration-300">
              Book a call
            </Link>
             <Link href="/project-cost-estimation"
              className="flex justify-center items-center hover:bg-white px-[32px] py-[16px] border border-white rounded-full font-mont font-semibold text-[16px] text-white hover:text-[#111212] transition-all duration-300">
              Get an Project Estimate
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
