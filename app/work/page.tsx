import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTestimonials } from '@/lib/wordpress'
import { WorkGrid } from './work-grid'
import BrandsMarquee from '@/components/sections/brands'
import { TestimonialsMarquee } from '@/components/sections/testimonials-marquee'
import ValuePropositionSection from '@/components/sections/value-proposition'
import { ProcessSection } from '@/components/sections/process-section'
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Our Work | Thrill Edge Technologies',
  description: 'Explore our portfolio of products shipped across healthcare, fintech, eCommerce and more.',
}

export default async function WorkPage() {
  const testimonials = await getTestimonials(20).catch(() => [])

  return (
    <div className="bg-white min-h-screen">
      <section className={cn("w-full", "mx-auto", "p-2")}>
        <div className={cn('relative', 'rounded-[20px]', 'w-full', 'h-[480px]', 'overflow-hidden')}>
          <Image
            src={"/our-work.png"}
            alt={"Our Work"}
            fill
            className={cn('object-center', 'object-cover')}
            sizes="100vw"
            priority
          />
          <div
            className={cn("absolute", "inset-0", "rounded-[20px]")}
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.6), rgba(0,0,0,0))",
            }}
          />

          <div
            className={cn(
              "max-w-[1440px]",
              "mx-auto",
              "absolute",
              "bottom-0",
              "left-0",
              "right-0",
              "flex",
              "lg:flex-row",
              "flex-col",
              "justify-between",
              "lg:items-end",
              "gap-4",
              "lg:px-9",
              "px-5",
              "lg:py-8",
              "py-6",
            )}
          >
            <div>
              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.2em]">Portfolio</span>

              <h2
                className={cn(
                  "text-[32px]",
                  "lg:text-[56px]",
                  "lg:leading-[60px]",
                  "leading-9",
                  "font-mont",
                  "font-semibold",
                  "text-white",
                  "max-w-2xl",
                )}
              >
                We deliver.<br />Period.
              </h2>
            </div>
            <p
              className={cn(
                "lg:text-[18px]",
                "text-[15px]",
                "font-inter",
                "text-white/70",
                "lg:max-w-xs",
                "leading-7",
              )}
            >
              50+ products shipped across healthcare, fintech, eCommerce, and more.
            </p>


          </div>
        </div>
      </section>


      <WorkGrid />

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className="bg-[#111212] py-24 overflow-hidden">
          <div className="mb-10 text-center">
            <p className="mb-3 font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.2em]">Social proof</p>
            <h2 className="font-mont font-bold text-[32px] text-white md:text-[48px]">
              What Our Clients Say
            </h2>
          </div>
          <TestimonialsMarquee testimonials={testimonials} />
          <div className="mx-auto px-4 md:px-9 max-w-[1440px]">
            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mt-16 pt-10 border-white/10 border-t">
              {[
                { number: '4.9/5', label: 'Average Rating' },
                { number: '98%', label: 'Satisfaction Rate' },
                { number: `${testimonials.length}+`, label: 'Happy Clients' },
                { number: '2M+', label: 'Revenue Generated' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-mont font-bold text-[32px] text-white">{s.number}</p>
                  <p className="mt-1 font-inter text-[14px] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

           {/* CTA */}
      <div className="bg-[#111212] max-w-[1440px] mx-auto my-20 rounded-[30px]">
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
