import Link from 'next/link'
import Image from 'next/image'

const INDUSTRIES = [
  {
    slug: 'healthcare',
    title: 'Healthcare',
    description: 'Innovative healthcare solutions prioritize patient care. We create applications using React and cloud services to enhance accessibility and efficiency.',
    icon: "healthcare.svg",
  },
  {
    slug: 'education',
    title: 'Education',
    description: 'Innovative tools for student engagement. We develop advanced platforms using Angular and AI to enhance learning and accessibility.',
    icon: "education.svg",
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    description: 'Explore real estate opportunities focused on client satisfaction. Our team uses technology and market insights to simplify buying and selling.',
    icon: "real-estate.svg",
  },
  {
    slug: 'blockchain',
    title: 'Blockchain',
    description: 'Revolutionizing with blockchain. Our team creates secure applications to improve data management and enhance trust in services.',
    icon: "blockchain.svg",
  },
  {
    slug: 'fintech',
    title: 'Fintech',
    description: 'Secure and scalable financial ecosystems. We engineer high-performance platforms using AI and blockchain to ensure transparency and security.',
    icon: "fintech.svg",
  },
  {
    slug: 'logistics',
    title: 'Logistics',
    description: 'Efficient logistics solutions using AI and blockchain to optimize supply chain management and enhance delivery.',
    icon: "logistics.svg",
  },
]

export function IndustriesSection() {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex flex-col gap-[48px] lg:py-[96px] py-[64px] lg:px-[36px] px-[16px]">

        {/* Header */}
        <div className="flex md:flex-row flex-col md:items-end justify-between gap-[16px]">
          <h2 className="text-black font-mont md:text-[56px] text-[32px] font-bold md:leading-[64px] leading-[36px] max-w-[600px]">
            Industries we serve
          </h2>
          <p className="text-[#929296] font-inter text-[16px] leading-[24px] max-w-[400px]">
            Deep domain expertise across the sectors that matter most.
          </p>
        </div>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {INDUSTRIES.map((ind) => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`}>
              <div className="rounded-[24px] border border-[#e5e5e5] group flex flex-col justify-end p-0 hover:border-[#111212] transition-colors duration-300">
                <div className="flex flex-col gap-[24px] px-[20px] py-[24px]">
                  <Image src={`/${ind.icon}`} alt={ind.title} width={30} height={30} className='invert'></Image>
                  <div className="flex flex-col items-start gap-[8px]">
                    <h3 className="xl:text-[32px] text-[24px] font-semibold font-mont text-[#111212]">
                      {ind.title}
                    </h3>
                    <p className="text-[16px] font-inter text-[#929296] leading-[24px]">
                      {ind.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
