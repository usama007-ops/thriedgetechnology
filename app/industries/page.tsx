import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { WorkSection } from '@/components/sections/work-section'
import BrandsMarquee from '@/components/sections/brands'

export const metadata: Metadata = {
  title: 'Industries | Thrill Edge Technologies',
  description: 'Deep domain expertise across healthcare, fintech, edtech, real estate, blockchain, and logistics.',
  alternates: { canonical: 'https://thrilledge.com/industries' },
}

const INDUSTRIES = [
  {
    slug: 'healthcare',
    title: 'Healthcare',
    tagline: 'HIPAA-compliant software that improves patient outcomes.',
    description: 'EHR integrations, patient portals, telemedicine platforms, and clinical workflow tools built to the strictest compliance standards.',
    stat: { number: '30+', label: 'Healthcare products shipped' },
    icon: '/healthcare.svg',
    image: '/healthcare.jfif',
  },
  {
    slug: 'education',
    title: 'Education',
    tagline: 'EdTech platforms that drive real learning outcomes.',
    description: 'Custom LMS platforms, adaptive learning tools, virtual classrooms, and student portals for K-12, higher ed, and corporate training.',
    stat: { number: '500K+', label: 'Students on our platforms' },
    icon: '/education.svg',
    image: '/education2.jpg',
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    tagline: 'PropTech solutions that close deals faster.',
    description: 'Property listing platforms, CRM systems, virtual tour tools, and property management apps for agents, developers, and managers.',
    stat: { number: '2M+', label: 'Property listings managed' },
    icon: '/real-estate.svg',
    image: '/Realstate.jpg',
  },
  {
    slug: 'blockchain',
    title: 'Blockchain',
    tagline: 'Production-ready blockchain apps built for trust and scale.',
    description: 'Smart contracts, DeFi platforms, NFT marketplaces, and enterprise blockchain applications on Ethereum, Solana, and Polygon.',
    stat: { number: '$500M+', label: 'Total value locked' },
    icon: '/blockchain.svg',
    image: '/blockchain2.png',
  },
  {
    slug: 'fintech',
    title: 'Fintech',
    tagline: 'Secure, compliant financial software at scale.',
    description: 'Payment platforms, lending software, wealth management tools, and banking infrastructure meeting PCI-DSS and SOC 2 standards.',
    stat: { number: '$2B+', label: 'Transactions processed annually' },
    icon: '/fintech.svg',
    image: '/fintech2.png',
  },
  {
    slug: 'logistics',
    title: 'Logistics',
    tagline: 'Supply chain software that cuts costs and delivers on time.',
    description: 'Fleet management, warehouse management, route optimization, and supply chain visibility platforms for 3PLs, carriers, and shippers.',
    stat: { number: '1M+', label: 'Shipments tracked daily' },
    icon: '/logistics.svg',
    image: '/logistic.jpg',
  },
]

export default function IndustriesPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="mx-auto p-2 w-full">
        <div className="relative bg-[#111212] rounded-[20px] w-full h-[480px] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          <div className="right-0 bottom-0 left-0 absolute flex lg:flex-row flex-col justify-between lg:items-end gap-4 mx-auto px-5 lg:px-9 py-8 lg:py-10 max-w-[1440px]">
            <div className="flex flex-col gap-3">
              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.2em]">Domain expertise</span>
              <h1 className="max-w-2xl font-mont font-bold text-[40px] text-white lg:text-[72px] leading-none">
                Industries<br />we serve.
              </h1>
            </div>
            <p className="lg:max-w-xs font-inter text-[15px] text-white/50 lg:text-[17px] lg:text-right leading-7">
              Deep domain knowledge across the sectors that matter most.
            </p>
          </div>
        </div>
      </section>

      {/* Industries grid */}
      <div className="mx-auto px-4 md:px-9 py-20 max-w-[1440px]">
        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, idx) => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`}
              className="group flex flex-col bg-white border border-[#e5e5e5] hover:border-[#111212] rounded-[20px] overflow-hidden transition-colors duration-300">

              {/* Image */}
              <div className="relative bg-[#f3f3f3] w-full h-52 overflow-hidden">
                <Image src={ind.image} alt={ind.title} fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={idx < 3}
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                {/* Icon badge */}
                <div className="bottom-4 left-4 absolute flex justify-center items-center bg-white/90 backdrop-blur-sm rounded-full w-9 h-9">
                  <div className="relative w-4 h-4">
                    <Image src={ind.icon} alt="" fill sizes="16px" className="object-contain" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 gap-3 p-6">
                <div className="flex justify-between items-start gap-3">
                  <h2 className="font-mont font-semibold text-[#111212] text-[20px] leading-tight">
                    {ind.title}
                  </h2>
                  <span className="flex justify-center items-center group-hover:bg-[#111212] mt-0.5 border border-[#e5e5e5] group-hover:border-[#111212] rounded-full w-8 h-8 transition-all duration-300 shrink-0">
                    <ArrowUpRight size={14} className="text-[#929296] group-hover:text-white transition-colors duration-300" />
                  </span>
                </div>

                <p className="font-inter font-medium text-[#111212] text-[14px]">{ind.tagline}</p>
                <p className="font-inter text-[#929296] text-[13px] line-clamp-2 leading-5">{ind.description}</p>

                {/* Stat */}
                <div className="mt-auto pt-4 border-[#f3f3f3] border-t">
                  <p className="font-mont font-bold text-[#111212] text-[22px]">{ind.stat.number}</p>
                  <p className="mt-0.5 font-inter text-[#929296] text-[11px]">{ind.stat.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Brands */}
      <BrandsMarquee />

      {/* Work section */}
      <WorkSection show={6} />

      {/* Testimonials */}
      <TestimonialsSection show={12} />

      {/* CTA */}
           <div className="bg-[#111212] max-w-[1440px] mx-auto mb-20 rounded-[30px]">
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
            <Link href="/work"
              className="flex justify-center items-center hover:bg-white px-[32px] py-[16px] border border-white rounded-full font-mont font-semibold text-[16px] text-white hover:text-[#111212] transition-all duration-300">
              See our work
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
