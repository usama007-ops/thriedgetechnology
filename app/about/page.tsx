'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const TIMELINE = [
    { year: '2012', text: 'Founded to build custom software for startups that needed production-ready code, not templates. First clients were early-stage product companies in the US and UK.' },
    { year: '2016', text: 'Established a dedicated mobile engineering practice, expanding our capabilities across iOS and Android platforms. By the end of the year, we had successfully delivered over 50 products for clients across the United States, United Kingdom, and Australia.' },
    { year: '2019', text: 'Expanded our global presence with operational hubs across the United States, Canada, Australia, and Europe. Transitioned all active projects to cloud-native architectures, significantly enhancing scalability and reliability. This shift enabled us to accelerate delivery cycles, reducing median deployment timelines from bi-weekly to daily.' },
    { year: '2023', text: 'Delivered our first production-grade AI models for healthcare and fintech clients, marking a significant expansion into advanced, data-driven solutions. During this period, our Clutch rating reached 4.9 stars across 68 verified client reviews, reflecting consistent delivery excellence and client satisfaction.' },
    { year: '2025', text: 'Strategically focused on three core domains: AI-assisted product development, mobile commerce, and healthcare software systems. Our current active engagements span 8 countries, reflecting continued global expansion and domain specialization.' },
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
    { icon: '/search.svg', title: 'On-Time Delivery, Transparently Managed', desc: 'We operate across the United States, Canada, Australia, and Europe, delivering projects with precision and accountability.        Every engagement is structured around weekly sprint cycles, supported by detailed progress reports and stakeholder updates. Our communication is proactive—any shift in scope or timeline is clearly communicated in advance, ensuring full transparency and zero surprises.' },
    { icon: '/varified-user.svg', title: 'Compliance by Design, Not as an Afterthought', desc: 'Security and compliance are embedded into every layer of our development lifecycle, aligning with SOC 2, GDPR, and HIPAA standards from day one.Our engineering practices ensure that every release is accompanied by comprehensive, audit ready documentation eliminating the need for separate compliance cycles. This integrated approach reduces risk, accelerates delivery, and ensures your product is always prepared for regulatory scrutiny.' },
    { icon: '/prototype.svg', title: 'AI & Cloud Solutions, Built for Production', desc: 'We design, deploy, and scale AI-powered systems across industries including healthcare and fintech, with a proven track record of delivering production grade solutions.Our approach focuses on modernization without disruption enhancing legacy systems without unnecessary rewrites. Every architectural decision is carefully evaluated against performance, scalability, and long term operational efficiency, ensuring measurable business impact. '},
]

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
        <div className="relative bg-[#F3F3F3]">

            {/* Hero */}
            {/* <div className="flex md:flex-row flex-col md:items-end gap-[32px] md:gap-[64px] mx-auto px-[16px] md:px-[36px] py-[64px] md:py-[64px] w-full max-w-[1440px]">
                <h1 className="w-full max-w-[610px] font-mont font-semibold text-[24px]">About us</h1>
                <p className="w-full max-w-[694px] font-mont font-semibold text-[40px] leading-[48px]">
                    Custom software and websites built to spec, no templates, no bloat.
                </p>
            </div> */}

            {/* Banner image */}
            <section className="mx-auto px-[12px] md:px-[10px] w-full max-w-[1800px]">
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
    <div className="absolute bottom-0 left-0 right-0 flex flex-col max-w-[1440px] lg:flex-row justify-between lg:items-end gap-4 lg:px-9 px-5 lg:py-8 py-6">
      
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
            <div className="flex md:flex-row flex-col gap-[32px] md:gap-[96px] mx-auto px-[16px] md:px-[36px] py-[64px] md:py-[96px] w-full max-w-[1440px]">
      
      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Image
          src="/aboutus2.jpg" // ✅ make sure this is inside /public
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
           We are a product focused technology partner, delivering scalable digital solutions across healthcare, fintech, and eCommerce since 2012.
          </strong>
        </p>

        <p>
          With a proven track record and a 4.9 star client rating, we are trusted by companies like PetScreening and Rodeo to design, build, and scale mission critical products not just marketing websites.
        </p>

        <p>
        Our approach is rooted in excellence and accountability. We operate with lean, senior-led teams, ensuring that the same experts who define your strategy are the ones executing it—bringing consistency, speed, and high-quality outcomes at every stage.
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
            <div className="mx-auto px-[16px] md:px-[36px] py-[40px] w-[100%] max-w-[1440px]">
                <div className="flex sm:flex-row flex-col sm:items-center gap-[20px] bg-[#111212] px-[28px] py-[24px] rounded-[16px] w-[100%]">

                    <p className="flex-shrink-0 font-[700] font-mont text-[20px] text-white leading-[24px]">
                        Why Work with
                    </p>

                    <div className="hidden sm:block flex-shrink-0 bg-[#333] w-[1px] h-[32px]" />

                    <div className="flex-1 overflow-x-auto font-inter text-[#929296] text-[15px] leading-[24px] no-scrollbar">
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
            <div className="flex md:flex-row flex-col gap-[32px] md:gap-[96px] mx-auto px-[16px] md:px-[36px] py-[64px] md:py-[96px] w-full max-w-[1440px]">
                 <Image
          src="/culture.jpg" 
          alt="team collaboration"
          width={500}
          height={400}
          className="rounded-xl object-cover"
        />
      
                <div className="flex flex-col gap-[16px] w-full font-inter font-normal text-[#111212] text-[16px] leading-[24px]">
                     <h2 className="w-full font-mont font-semibold text-[40px] leading-[48px]">Our Culture</h2>
                    <p>We build teams with precision every engineer brings proven experience delivering production-grade solutions in your stack.</p>
                    <p>Our process is driven by strict quality standards, with every pull request undergoing thorough peer review to ensure consistency and reliability.</p>
                    <p>We maintain an error rate below 1% across deployments not as a goal, but as a defined engineering standard.</p>
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

            {/* Timeline */}
            {/* Timeline, vertical alternating */}
        <section className="mx-auto mb-[96px] px-[16px] md:px-[36px] pt-[40px] w-full max-w-[1440px]">
  <h3 className="mb-[80px] font-mont font-semibold text-[40px] text-center leading-[48px]">
    Our history
  </h3>

  <div className="relative">
    {/* Center vertical line (Desktop) */}
    <div className="hidden md:block top-0 bottom-0 left-1/2 absolute bg-[#313131] w-[2px] -translate-x-1/2" />
    
    {/* Left vertical line (Mobile) */}
    <div className="md:hidden top-0 bottom-0 left-[20px] absolute bg-[#313131] w-[2px]" />

    <div className="flex flex-col">
      {TIMELINE.map((t, i) => {
        const isLeft = i % 2 === 0;
        return (
          <div key={t.year} className="relative mb-[40px] md:mb-0">
            {/* DESKTOP LAYOUT */}
            <div className="hidden items-center md:grid grid-cols-[1fr_64px_1fr] w-full">
              
              {/* Left Side */}
              <div className={`flex justify-end pr-[48px] ${!isLeft ? 'invisible' : ''}`}>
                <div className="bg-[#111212] shadow-lg p-[28px] rounded-[16px] w-full max-w-[420px]">
                  <span className="block mb-[10px] font-inter font-semibold text-[12px] text-white/40 uppercase tracking-[0.15em]">{t.year}</span>
                  <p className="font-mont font-semibold text-[18px] text-white leading-[1.4]">{t.text}</p>
                </div>
              </div>

              {/* Center Dot */}
              <div className="z-10 relative flex flex-col justify-center items-center">
                {/* <div className="bg-[#111212] border-[#313131] border-[3px] rounded-full ring-[#f3f3f3] ring-4 w-[18px] h-[18px]" /> */}
                <span className="top-[24px] absolute bg-[#F3F3F3] mt-[8px] font-inter text-[#929296] text-[13px] whitespace-nowrap">{t.year}</span>
              </div>

              {/* Right Side */}
              <div className={`flex justify-start pl-[48px] ${isLeft ? 'invisible' : ''}`}>
                <div className="bg-[#f3f3f3] shadow-lg p-[28px] rounded-[16px] w-full max-w-[420px]">
                  <span className="block mb-[10px] font-inter font-semibold text-[#929296] text-[12px] uppercase tracking-[0.15em]">{t.year}</span>
                  <p className="font-mont font-semibold text-[#111212] text-[18px] leading-[1.4]">{t.text}</p>
                </div>
              </div>
            </div>

            {/* MOBILE LAYOUT */}
            <div className="md:hidden relative flex items-start pl-[48px]">
              <div className="top-[10px] left-[12px] z-10 absolute bg-[#111212] border-[#313131] border-[3px] rounded-full ring-4 ring-white w-[18px] h-[18px]" />
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
            <section className="flex justify-center items-center w-full">
                <div className="flex flex-col items-center gap-[40px] px-[16px] lg:px-[36px] pb-[64px] lg:pb-[96px] w-full max-w-[1440px]">
                    <h2 className="w-full font-mont font-semibold lg:font-bold text-[32px] text-black lg:text-[64px] text-start leading-[38px] lg:leading-[64px]">
                        Frequently asked <br /> questions
                    </h2>
                    <FAQ items={FAQS} />
                </div>
            </section>

            {/* CTA */}
            <section className="flex justify-center items-center p-[20px] w-full">
                <div className="flex md:flex-row flex-col justify-between gap-[8px] md:gap-[96px] bg-white px-[16px] md:px-[48px] py-[20px] md:py-[40px] border border-[#e5e5e5] rounded-[24px] w-full max-w-[1400px]">
                    <h3 className="max-w-[642px] font-mont font-semibold text-[#111212] text-[30px] lg:text-[56px] lg:leading-[64px]">
                        Let&apos;s Build Your Next Big Thing
                    </h3>
                    <div className="flex flex-col items-start gap-[40px] md:gap-[20px] w-full max-w-[354px]">
                        <p className="font-inter text-[#929296] text-[16px] leading-[24px]">Your idea, our brains, we&apos;ll send you a tailored game plan in 48h.</p>
                        <Link href="/contact"
                            className="flex justify-center items-center bg-black px-[24px] pt-[14px] pb-[12px] rounded-full font-mont font-semibold text-[14px] text-white hover:scale-105 transition-all duration-300">
                            Book a call
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}
