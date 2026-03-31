'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const TIMELINE = [
    { year: '2012', text: 'Founded to build custom software for startups that needed production-ready code, not templates. First clients were early-stage product companies in the US and UK.' },
    { year: '2016', text: 'Launched a dedicated mobile engineering practice. By year-end we had shipped 50+ products for clients in the US, UK, and Australia across iOS and Android.' },
    { year: '2019', text: 'Opened operational hubs in the USA, Canada, Australia, and Europe. Moved all active projects to cloud-native infrastructure. Reduced median deployment cycles from bi-weekly to daily.' },
    { year: '2023', text: 'Shipped first production AI models for healthcare and fintech clients. Clutch rating reached 4.9 stars across 68 verified reviews.' },
    { year: '2025', text: 'Focused on three areas: AI-assisted product development, mobile commerce, and healthcare software. Current active projects span 8 countries.' },
]

const FAQS = [
    { q: 'How do you handle bugs that reach production?', a: 'We run automated test coverage on every release. When a bug reaches production, our on-call engineer responds within 2 hours. We document root causes and update our test suite to prevent recurrence. Most issues are caught in staging — not after launch.' },
    { q: 'How do you manage collaboration across different time zones?', a: 'We operate across US, Canada, Australia, and Europe. Every project runs on weekly sprint reviews with written status updates. If a deadline shifts, you hear it from us first — not after the fact.' },
    { q: 'How do you vet your engineering talent?', a: 'Every engineer on your project has shipped production code in your stack before. We review every pull request before it merges. No code written by a junior goes unreviewed.' },
    { q: 'Have you ever pushed back on a client\'s approach?', a: 'Yes — regularly. We flag technical debt, scope creep, and architectural decisions that will cost more to fix later. Our job is to ship the right product, not just the requested one.' },
    { q: 'Who owns the code and IP at the end of a project?', a: 'You do. Full IP transfer is included in every engagement. We retain no rights to your codebase, designs, or data.' },
    { q: 'Can your team work inside our existing engineering workflow?', a: 'Yes. We adapt to your tools — GitHub, Jira, Linear, Slack, whatever you use. We embed into your workflow, not the other way around.' },
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
    { icon: '/search.svg', title: 'On-Time Delivery, Tracked Weekly', desc: 'We operate across US, Canada, Australia, and Europe. Every project runs on weekly sprint reviews with written status updates. If a deadline shifts, you hear it from us first — not after the fact.' },
    { icon: '/varified-user.svg', title: 'Compliance Built In, Not Added Later', desc: 'Our codebase and workflows meet SOC 2, GDPR, and HIPAA requirements by default. We deliver audit-ready documentation alongside every release. No separate compliance review sprint required.' },
    { icon: '/prototype.svg', title: 'AI and Cloud That Ship to Production', desc: 'We have deployed 20+ AI models across healthcare and fintech clients. We modernize legacy systems without rewriting working code. Every architectural decision is weighed against your operating costs.' },
]

function FAQ({ items }: { items: typeof FAQS }) {
    const [open, setOpen] = useState<number | null>(0)
    return (
        <div className="w-full border-t border-[#d0d0ce]">
            {items.map((item, i) => (
                <div key={i} className="border-b border-[#d0d0ce]">
                    <button onClick={() => setOpen(open === i ? null : i)}
                        className="w-full flex justify-between items-start gap-[24px] text-left cursor-pointer py-[28px]">
                        <span className="font-mont text-[18px] leading-[1.35] font-semibold text-[#111212] pr-[8px]">
                            <span className="font-inter text-[13px] font-normal text-[#999] mr-[14px] tabular-nums">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            {item.q}
                        </span>
                        <span className="flex-shrink-0 mt-[4px] w-[24px] h-[24px] flex items-center justify-center transition-transform duration-300"
                            style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1V15M1 8H15" stroke="#111212" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </span>
                    </button>
                    {open === i && (
                        <p className="font-inter text-[16px] leading-[1.75] text-[#555] pb-[28px] max-w-[680px]">{item.a}</p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default function AboutPage() {
    return (
        <div className="relative bg-[#F3F3F3]">

            {/* Hero */}
            <div className="w-full max-w-[1440px] mx-auto flex md:flex-row flex-col md:items-end md:gap-[64px] gap-[32px] md:px-[36px] px-[16px] md:py-[64px] py-[64px]">
                <h1 className="text-[24px] font-mont font-semibold w-full max-w-[610px]">About us</h1>
                <p className="w-full max-w-[694px] text-[40px] font-mont leading-[48px] font-semibold">
                    Custom software and websites built to spec — no templates, no bloat.
                </p>
            </div>

            {/* Banner image */}
            <section className="w-full max-w-[1440px] md:px-[36px] px-[16px] mx-auto rounded-[16px] overflow-hidden">
                <Image src="/about-banner.avif" alt="About us" width={1440} height={769}
                    className="w-full h-auto max-h-[769px] min-h-[256px] rounded-[16px] object-cover" priority />
            </section>

            {/* Awards — desktop static */}
            <div className="w-full max-w-[1440px] mx-auto md:flex hidden items-center justify-around gap-[48px] flex-wrap py-[24px] md:px-[36px] border-t border-b border-[#ebebeb]">
                {AWARDS.map(a => (
                    <Image key={a.alt} src={a.src} alt={a.alt} width={100} height={20}
                        className="w-fit opacity-50 hover:opacity-100 transition-opacity duration-200" />
                ))}
            </div>

            {/* Awards — mobile marquee */}
            <div className="w-full overflow-hidden relative md:hidden py-[20px]">
                <div className="flex w-max gap-[40px] animate-marquee">
                    {[...AWARDS, ...AWARDS].map((a, i) => (
                        <Image key={i} src={a.src} alt={a.alt} width={124} height={26}
                            className="w-fit h-[24px]" style={{ width: 'auto', height: '24px' }} />
                    ))}
                </div>
            </div>

            {/* Who We Are */}
            <div className="w-full max-w-[1440px] mx-auto flex md:flex-row flex-col md:gap-[96px] gap-[32px] md:px-[36px] px-[16px] md:py-[96px] py-[64px]">
                <h2 className="text-[40px] font-mont font-semibold leading-[48px] w-full">Who We Are</h2>
                <div className="w-full flex flex-col gap-[16px] text-[#111212] font-inter text-[16px] font-normal leading-[24px]">
                    <p className="text-[20px] font-inter leading-[28px] font-medium"></p>
                    <p><strong>Since 2012, we have shipped over 50 products for clients across healthcare, fintech, and eCommerce.</strong></p>
                    <p>We hold a 4.9-star rating on Clutch based on verified client reviews. Clients like PetScreening and Rodeo chose us to build and scale their core product — not just their marketing site.</p>
                    <p>We keep teams small and senior. Your project is handled by the same engineers who scoped it, not handed off to juniors after kickoff.</p>
                </div>
            </div>

            {/* Value cards */}
            <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[20px] py-[20px] md:px-[36px] px-[16px]">
                {CARDS.map(c => (
                    <div key={c.title} className="group flex flex-col gap-[20px] items-start px-[24px] py-[24px] bg-white rounded-[16px] border border-transparent hover:border-[#e8eeff] hover:bg-[#f9f9ff] transition-all duration-200">
                        <Image src={c.icon} alt={c.title} width={40} height={40}
                            className="group-hover:scale-105 transition-transform duration-200" style={{ width: '40px', height: 'auto' }} />
                        <div className="flex flex-col gap-[14px]">
                            <h3 className="text-black font-mont text-[24px] font-semibold leading-normal">{c.title}</h3>
                            <p className="text-[#929296] font-inter text-[16px] font-normal leading-[24px]">{c.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats ticker */}
            <div className="w-[100%] max-w-[1440px] mx-auto md:px-[36px] px-[16px] py-[40px]">
                <div className="w-[100%] px-[28px] py-[24px] bg-[#111212] rounded-[16px] flex sm:flex-row flex-col sm:items-center gap-[20px]">

                    <p className="flex-shrink-0 text-white text-[20px] leading-[24px] font-mont font-[700]">
                        Why Work with
                    </p>

                    <div className="hidden sm:block flex-shrink-0 w-[1px] h-[32px] bg-[#333]" />

                    <div className="overflow-x-auto no-scrollbar flex-1 text-[#929296] font-inter text-[15px] leading-[24px]">
                        <p
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "20px",
                               
                            }}
                        >
                            4.9★ on Clutch (68 reviews)

                            <span
                                style={{
                                    display: "inline-block",
                                    width: "5px",
                                    height: "5px",
                                    backgroundColor: "#EFEEEC",
                                    borderRadius: "100%",
                                }}
                            ></span>

                            50+ products shipped since 2012

                            <span
                                style={{
                                    display: "inline-block",
                                    width: "5px",
                                    height: "5px",
                                    backgroundColor: "#EFEEEC",
                                    borderRadius: "100%",
                                }}
                            ></span>

                            Healthcare, fintech, and eCommerce clients

                            <span
                                style={{
                                    display: "inline-block",
                                    width: "5px",
                                    height: "5px",
                                    backgroundColor: "#EFEEEC",
                                    borderRadius: "100%",
                                }}
                            ></span>

                            US, Canada, Australia, Europe

                            <span
                                style={{
                                    display: "inline-block",
                                    width: "5px",
                                    height: "5px",
                                    backgroundColor: "#EFEEEC",
                                    borderRadius: "100%",
                                }}
                            ></span>

                            On-time delivery tracked weekly
                        </p>
                    </div>

                </div>
            </div>
            {/* Culture */}
            <div className="w-full max-w-[1440px] mx-auto flex md:flex-row flex-col md:gap-[96px] gap-[32px] md:px-[36px] px-[16px] md:py-[96px] py-[64px]">
                <h2 className="text-[40px] font-mont font-semibold leading-[48px] w-full">Our Culture</h2>
                <div className="w-full flex flex-col gap-[16px] text-[#111212] font-inter text-[16px] font-normal leading-[24px]">
                    <p>We do not hire generalists and hope for the best. Every engineer on your project has shipped production code in your stack before.</p>
                    <p>We review every pull request before it merges. No code written by a junior goes unreviewed.</p>
                    <p>Our error rate across client deployments is under 1%. That is the policy, not a goal.</p>
                </div>
            </div>

            {/* Second banner */}
            <section className="w-full max-w-[1440px] md:px-[36px] px-[16px] mx-auto rounded-[16px] overflow-hidden md:pb-[96px] pb-[48px]">
                <Image src="/about-ban.avif" alt="Our team" width={1440} height={769}
                    className="w-full h-auto max-h-[769px] min-h-[256px] rounded-[16px] object-cover" />
            </section>

            {/* Timeline */}
            {/* Timeline — vertical alternating */}
        <section className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] mb-[96px] pt-[40px]">
  <h3 className="text-[40px] font-mont font-semibold leading-[48px] text-center mb-[80px]">
    Our history
  </h3>

  <div className="relative">
    {/* Center vertical line (Desktop) */}
    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#313131] -translate-x-1/2 hidden md:block" />
    
    {/* Left vertical line (Mobile) */}
    <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-[#313131] md:hidden" />

    <div className="flex flex-col">
      {TIMELINE.map((t, i) => {
        const isLeft = i % 2 === 0;
        return (
          <div key={t.year} className="relative mb-[40px] md:mb-0">
            {/* DESKTOP LAYOUT */}
            <div className="hidden md:grid grid-cols-[1fr_64px_1fr] items-center w-full">
              
              {/* Left Side */}
              <div className={`flex justify-end pr-[48px] ${!isLeft ? 'invisible' : ''}`}>
                <div className="max-w-[420px] w-full rounded-[16px] p-[28px] bg-[#111212] shadow-lg">
                  <span className="text-[12px] font-inter font-semibold uppercase tracking-[0.15em] text-white/40 block mb-[10px]">{t.year}</span>
                  <p className="text-[18px] font-mont font-semibold text-white leading-[1.4]">{t.text}</p>
                </div>
              </div>

              {/* Center Dot */}
              <div className="flex flex-col items-center justify-center relative z-10">
                {/* <div className="w-[18px] h-[18px] rounded-full bg-[#111212] border-[3px] border-[#313131] ring-4 ring-[#f3f3f3]" /> */}
                <span className="text-[13px] font-inter text-[#929296] bg-[#F3F3F3] mt-[8px] absolute top-[24px] whitespace-nowrap">{t.year}</span>
              </div>

              {/* Right Side */}
              <div className={`flex justify-start pl-[48px] ${isLeft ? 'invisible' : ''}`}>
                <div className="max-w-[420px] w-full rounded-[16px] p-[28px] bg-[#f3f3f3] shadow-lg">
                  <span className="text-[12px] font-inter font-semibold uppercase tracking-[0.15em] text-[#929296] block mb-[10px]">{t.year}</span>
                  <p className="text-[18px] font-mont font-semibold text-[#111212] leading-[1.4]">{t.text}</p>
                </div>
              </div>
            </div>

            {/* MOBILE LAYOUT */}
            <div className="md:hidden flex items-start pl-[48px] relative">
              <div className="absolute left-[12px] top-[10px] w-[18px] h-[18px] rounded-full bg-[#111212] border-[3px] border-[#313131] ring-4 ring-white z-10" />
              <div className={`w-full rounded-[16px] p-[24px] ${isLeft ? 'bg-[#111212]' : 'bg-[#f3f3f3]'}`}>
                <span className={`text-[12px] font-inter font-semibold uppercase tracking-[0.15em] block mb-[8px] ${isLeft ? 'text-white/40' : 'text-[#929296]'}`}>{t.year}</span>
                <p className={`text-[16px] font-mont font-semibold leading-[1.4] ${isLeft ? 'text-white' : 'text-[#111212]'}`}>{t.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

            {/* FAQ */}
            <section className="w-full flex items-center justify-center">
                <div className="w-full max-w-[1440px] flex flex-col items-center gap-[40px] lg:pb-[96px] pb-[64px] lg:px-[36px] px-[16px]">
                    <h2 className="text-black font-mont lg:text-[64px] text-[32px] lg:font-bold font-semibold lg:leading-[64px] leading-[38px] text-start w-full">
                        Frequently asked <br /> questions
                    </h2>
                    <FAQ items={FAQS} />
                </div>
            </section>

            {/* CTA */}
            <section className="w-full flex items-center justify-center p-[20px]">
                <div className="w-full max-w-[1400px] flex md:flex-row flex-col justify-between md:gap-[96px] gap-[8px] rounded-[24px] md:px-[48px] px-[16px] md:py-[40px] py-[20px] bg-white border border-[#e5e5e5]">
                    <h3 className="lg:text-[56px] text-[30px] lg:leading-[64px] font-semibold font-mont text-[#111212] max-w-[642px]">
                        Let&apos;s Build Your Next Big Thing
                    </h3>
                    <div className="max-w-[354px] w-full flex items-start flex-col md:gap-[20px] gap-[40px]">
                        <p className="text-[16px] leading-[24px] text-[#929296] font-inter">Your idea, our brains — we&apos;ll send you a tailored game plan in 48h.</p>
                        <Link href="/contact"
                            className="flex items-center justify-center px-[24px] pt-[14px] pb-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300">
                            Book a call
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}
