import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const PILLARS = [
  {
    number: '01',
    title: 'Revenue-first thinking',
    body: 'Every decision we make is tied to your bottom line. We ask "does this ship value?" before writing a single line of code.',
  },
  {
    number: '02',
    title: "Founders who've been there",
    body: 'Our leadership has taken products from zero to market. We bring that scar tissue to every engagement.',
  },
  {
    number: '03',
    title: 'Start-up to Fortune 500',
    body: "Whether you're pre-seed or publicly traded, our process scales to your stage without losing speed.",
  },
]

export default function ValuePropositionSection() {
  return (
    <section className="bg-[#111212] w-full overflow-hidden">
      <div className="mx-auto px-4 md:px-9 py-20 lg:py-28 max-w-[1440px]">

        {/* Top row label + big question */}
        <div className="flex flex-col gap-6 pb-16 border-white/10 border-b">
          <span className="font-inter font-semibold text-[11px] text-white/50 uppercase tracking-[0.2em]">
            Every project starts with one question
          </span>
          <h2 className="max-w-[900px] font-mont font-bold text-[40px] text-white md:text-[64px] lg:text-[80px] leading-none">
            What&apos;s the maximum value we can contribute?
          </h2>
        </div>

        {/* Middle row statement + pillars */}
        <div className="flex md:flex-row flex-col gap-12 md:gap-20 pt-16 pb-16 border-white/10 border-b">

          {/* Left sticky statement */}
          <div className="flex flex-col gap-6 md:w-[380px] shrink-0">
            <p className="font-mont font-semibold text-[24px] text-white md:text-[32px] leading-tight">
              We build software that builds your bottom line.
            </p>
            <p className="font-inter text-[18px] text-white/50 leading-7">
              Our founders and product directors have shipped products that drive real revenue. We don&apos;t just build we help you grow.
            </p>
            <Link href="/about"
              className="group flex items-center self-start gap-2 hover:bg-white px-5 py-2.5 border border-white/20 hover:border-white rounded-full font-mont font-semibold text-[13px] text-white hover:text-[#111212] transition-all duration-300">
              Get to know us
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300" />
            </Link>
          </div>

          {/* Right pillars */}
          <div className="flex flex-col flex-1 ">
            {PILLARS.map((p) => (
              <div key={p.number} className="group flex gap-6 py-7">
                <span className="pt-1 w-6 font-inter tabular-nums text-[13px] text-white/20 shrink-0">{p.number}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-mont font-semibold text-[18px] text-white group-hover:text-white/80 transition-colors duration-200">
                    {p.title}
                  </h3>
                  <p className="font-inter text-[16px] text-white/50 leading-6">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
