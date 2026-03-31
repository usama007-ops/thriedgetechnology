'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

const FAQS = [
  // Partnership Basics (6)
  { topic: 'Partnership Basics', q: 'How do we get started working with Thrill Edge?', a: 'Book a free strategy call. We\'ll scope your project, align on goals, and send you a tailored plan within 48 hours. No commitment required.' },
  { topic: 'Partnership Basics', q: 'What types of clients do you work with?', a: 'We work with startups, scale-ups, and enterprise teams across healthcare, fintech, eCommerce, and SaaS. Most of our clients are US, UK, Canadian, and Australian companies.' },
  { topic: 'Partnership Basics', q: 'Do you work with early-stage startups?', a: 'Yes. We have a dedicated MVP & Product Strategy service for founders who need to validate ideas and get to market fast without burning runway on the wrong features.' },
  { topic: 'Partnership Basics', q: 'Who owns the code and IP at the end of a project?', a: 'You do. Full IP transfer is included in every engagement. We retain no rights to your codebase, designs, or data.' },
  { topic: 'Partnership Basics', q: 'Can your team work inside our existing engineering workflow?', a: 'Yes. We adapt to your tools — GitHub, Jira, Linear, Slack, whatever you use. We embed into your workflow, not the other way around.' },
  { topic: 'Partnership Basics', q: 'Do you sign NDAs?', a: 'Yes, we sign NDAs before any detailed project discussions. Confidentiality is standard practice for us.' },

  // AI & Emerging Tech (5)
  { topic: 'AI & Emerging Tech', q: 'What AI and ML services do you offer?', a: 'We build custom AI models, NLP pipelines, computer vision systems, predictive analytics, and generative AI integrations. We have deployed 20+ AI models in production across healthcare and fintech.' },
  { topic: 'AI & Emerging Tech', q: 'Can you integrate AI into our existing product?', a: 'Yes. We assess your current stack, identify where AI adds the most value, and integrate models without rewriting working code.' },
  { topic: 'AI & Emerging Tech', q: 'Do you work with LLMs like GPT or Claude?', a: 'Yes. We build LLM-powered features including chatbots, document processing, semantic search, and AI copilots using OpenAI, Anthropic, and open-source models.' },
  { topic: 'AI & Emerging Tech', q: 'How do you handle AI model accuracy and reliability?', a: 'We run evaluation pipelines, A/B test model outputs, and monitor performance in production. Our healthcare AI deployments maintain over 90% prediction accuracy.' },
  { topic: 'AI & Emerging Tech', q: 'What industries have you deployed AI in?', a: 'Healthcare (clinical decision support, patient triage), fintech (fraud detection, credit scoring), eCommerce (recommendation engines), and logistics (demand forecasting).' },

  // Software Services & Tech (7)
  { topic: 'Software Services & Tech', q: 'What technologies do you specialize in?', a: 'React, Next.js, Node.js, Python, Go, Flutter, React Native, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, and AWS/GCP/Azure.' },
  { topic: 'Software Services & Tech', q: 'Do you build mobile apps?', a: 'Yes. We build native iOS and Android apps as well as cross-platform apps using Flutter and React Native. We have shipped 50+ mobile products.' },
  { topic: 'Software Services & Tech', q: 'Can you build a SaaS product from scratch?', a: 'Yes. We handle everything from architecture and design to development, deployment, and ongoing support. We specialize in multi-tenant SaaS platforms built for scale.' },
  { topic: 'Software Services & Tech', q: 'Do you offer UI/UX design services?', a: 'Yes. Our design team handles user research, wireframing, prototyping, and high-fidelity UI design. We use Figma and validate every design decision through usability testing.' },
  { topic: 'Software Services & Tech', q: 'Can you modernize our legacy system?', a: 'Yes. We assess your existing architecture, identify bottlenecks, and modernize incrementally — without rewriting working code or disrupting your operations.' },
  { topic: 'Software Services & Tech', q: 'Do you handle DevOps and cloud infrastructure?', a: 'Yes. We set up CI/CD pipelines, containerize applications with Docker and Kubernetes, and manage cloud infrastructure on AWS, GCP, and Azure.' },
  { topic: 'Software Services & Tech', q: 'What is your approach to security?', a: 'Security is built in from day one. Our workflows meet SOC 2, GDPR, and HIPAA requirements by default. We deliver audit-ready documentation alongside every release.' },

  // Process, Pricing & Support (8)
  { topic: 'Process, Pricing & Support', q: 'How do you price your projects?', a: 'We offer fixed-price engagements for well-scoped projects and time-and-materials for ongoing development. We provide detailed estimates after a scoping call — no vague ballpark figures.' },
  { topic: 'Process, Pricing & Support', q: 'How long does a typical project take?', a: 'MVPs typically take 6–12 weeks. Full product builds range from 3–6 months. We provide a detailed timeline after scoping, and we track it weekly.' },
  { topic: 'Process, Pricing & Support', q: 'How do you manage projects?', a: 'We run two-week sprints with weekly demos and written status updates. You always know what was built, what\'s next, and if anything has shifted.' },
  { topic: 'Process, Pricing & Support', q: 'How do you handle bugs that reach production?', a: 'Our on-call engineer responds within 2 hours. We document root causes and update our test suite to prevent recurrence. Most issues are caught in staging — not after launch.' },
  { topic: 'Process, Pricing & Support', q: 'Do you offer post-launch support?', a: 'Yes. We offer ongoing maintenance, monitoring, and feature development retainers. We can also hand off to your internal team with full documentation and knowledge transfer.' },
  { topic: 'Process, Pricing & Support', q: 'How do you manage collaboration across time zones?', a: 'We have team members across US, Canada, Australia, and Europe. We schedule overlap hours for daily standups and async communication fills the gaps.' },
  { topic: 'Process, Pricing & Support', q: 'Have you ever pushed back on a client\'s approach?', a: 'Yes — regularly. We flag technical debt, scope creep, and architectural decisions that will cost more to fix later. Our job is to ship the right product, not just the requested one.' },
  { topic: 'Process, Pricing & Support', q: 'How do you vet your engineering talent?', a: 'Every engineer on your project has shipped production code in your stack before. We review every pull request. No code written by a junior goes unreviewed.' },
]

const TOPICS = ['All', 'Partnership Basics', 'AI & Emerging Tech', 'Software Services & Tech', 'Process, Pricing & Support']

const TOPIC_COUNTS: Record<string, number> = {
  'All': FAQS.length,
  'Partnership Basics': 6,
  'AI & Emerging Tech': 5,
  'Software Services & Tech': 7,
  'Process, Pricing & Support': 8,
}

export default function FAQsPage() {
  const [activeTopic, setActiveTopic] = useState('All')
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const filtered = activeTopic === 'All' ? FAQS : FAQS.filter(f => f.topic === activeTopic)

  return (
    <div className="relative bg-white">

      {/* Hero */}
      <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] md:py-[80px] py-[64px]">
        <p className="text-[12px] font-inter font-semibold uppercase tracking-[0.2em] text-[#929296] mb-[16px]">FAQs</p>
        <h1 className="text-[40px] md:text-[64px] font-mont font-bold md:leading-[64px] leading-[44px] text-[#111212] max-w-[800px]">
          Frequently asked questions
        </h1>
      </div>

      {/* Topics + FAQ */}
      <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] pb-[96px] flex md:flex-row flex-col gap-[48px] items-start">

        {/* Sidebar topics */}
        <div className="md:w-[260px] w-full shrink-0 md:sticky md:top-[100px]">
          <p className="text-[11px] font-inter font-semibold uppercase tracking-[0.15em] text-[#929296] mb-[16px]">Topics</p>
          <div className="flex flex-col gap-[4px]">
            {TOPICS.map(t => (
              <button key={t} onClick={() => { setActiveTopic(t); setOpenIdx(null) }}
                className={`flex items-center justify-between w-full text-left px-[14px] py-[10px] rounded-[10px] transition-all duration-200 ${activeTopic === t ? 'bg-[#111212] text-white' : 'text-[#111212] hover:bg-[#f3f3f3]'}`}>
                <span className="font-inter text-[14px] font-medium">{t}</span>
                <span className={`text-[12px] font-inter tabular-nums ${activeTopic === t ? 'text-white/60' : 'text-[#929296]'}`}>
                  {TOPIC_COUNTS[t]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ list */}
        <div className="flex-1 min-w-0">
          {activeTopic !== 'All' && (
            <p className="text-[12px] font-inter font-semibold uppercase tracking-[0.15em] text-[#929296] mb-[24px]">
              {activeTopic} · {filtered.length} questions
            </p>
          )}
          <div className="border-t border-[#e5e5e5]">
            {filtered.map((item, i) => (
              <div key={i} className="border-b border-[#e5e5e5]">
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex justify-between items-start gap-[24px] text-left cursor-pointer py-[24px]">
                  <span className="font-mont text-[17px] leading-[1.4] font-semibold text-[#111212] pr-[8px]">
                    <span className="font-inter text-[12px] font-normal text-[#999] mr-[12px] tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.q}
                  </span>
                  <span className="flex-shrink-0 mt-[3px] w-[22px] h-[22px] flex items-center justify-center transition-transform duration-300"
                    style={{ transform: openIdx === i ? 'rotate(45deg)' : 'none' }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1V15M1 8H15" stroke="#111212" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {openIdx === i && (
                  <p className="font-inter text-[16px] leading-[1.75] text-[#555] pb-[24px] max-w-[680px]">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="w-full flex items-center justify-center p-[20px]">
        <div className="w-full max-w-[1400px] flex md:flex-row flex-col justify-between md:gap-[96px] gap-[8px] rounded-[24px] md:px-[48px] px-[16px] md:py-[40px] py-[20px] bg-white border border-[#e5e5e5]">
          <h3 className="lg:text-[56px] text-[30px] lg:leading-[64px] font-semibold font-mont text-[#111212] max-w-[642px]">
            Still have questions?
          </h3>
          <div className="max-w-[354px] w-full flex items-start flex-col md:gap-[20px] gap-[40px]">
            <p className="text-[16px] leading-[24px] text-[#929296] font-inter">Book a free call and we&apos;ll answer everything directly.</p>
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
