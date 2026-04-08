import { getTestimonials } from '@/lib/wordpress'
import type { Metadata } from 'next'
import { PageHero } from '@/components/common/page-hero'

export const metadata: Metadata = {
  title: 'Client Reviews | Thrill Edge Technologies',
  description: 'Read what our clients say about working with Thrill Edge Technologies.',
}

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? '#111212' : 'none'}
          stroke="#111212" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default async function ClientReviewsPage() {
  const testimonials = await getTestimonials(100).catch(() => [])

  return (
    <div className="relative bg-white">
      <PageHero label="Client Reviews" title="What our clients say" subtitle="We let our work speak for itself. Here's what the teams we've built with have to say." />

      {/* Stats bar */}
      <div className="mx-auto px-[16px] md:px-[36px] pb-[64px] w-full max-w-[1440px]">
        <div className="gap-[1px] grid grid-cols-2 md:grid-cols-4 bg-[#e5e5e5] rounded-[16px] overflow-hidden">
          {[
            { num: '4.9★', label: 'Average Rating' },
            { num: '98%', label: 'Satisfaction Rate' },
            { num: `${testimonials.length}+`, label: 'Happy Clients' },
            { num: '15+', label: 'Years Experience' },
          ].map(s => (
            <div key={s.label} className="flex flex-col gap-[4px] bg-white px-[28px] py-[28px]">
              <p className="font-mont font-bold text-[#111212] text-[36px] leading-none">{s.num}</p>
              <p className="font-inter text-[#929296] text-[14px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Review button */}
      <div className="flex justify-center mx-auto px-[16px] md:px-[36px] pb-[64px] w-full max-w-[1440px]">
        <a href="/public-review"
          className="flex justify-center items-center gap-2 bg-black px-[32px] pt-[16px] pb-[14px] rounded-full font-mont font-semibold text-[15px] text-white hover:scale-105 transition-all duration-300">
          ✍️ Submit Your Review
        </a>
      </div>
      {testimonials.length > 0 ? (
        <div className="mx-auto px-[16px] md:px-[36px] pb-[96px] w-full max-w-[1440px]">
          <div className="gap-[20px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => {
              const quote = t.content.rendered.replace(/<[^>]*>/g, '').trim()
              const rating = t.acf?.rating ?? 5
              const name = t.acf?.author_name || t.title.rendered
              const role = [t.acf?.author_title, t.acf?.author_company].filter(Boolean).join(' at ')
// d
              return (
                <div key={t.id}
                  className="flex flex-col gap-[20px] bg-white hover:shadow-lg p-[28px] border border-[#e5e5e5] hover:border-[#111212] rounded-[20px] transition-all duration-300">
                  {/* Stars */}
                  <StarRating rating={rating} />

                  {/* Quote */}
                  <p className="flex-1 font-inter text-[#111212] text-[16px] leading-[1.7]">
                    &ldquo;{quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-[12px] pt-[16px] border-[#f0f0f0] border-t">
                    <div className="flex justify-center items-center bg-[#111212] rounded-full w-[40px] h-[40px] font-mont font-bold text-[14px] text-white shrink-0">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-mont font-semibold text-[#111212] text-[14px] leading-none">{name}</p>
                      {role && <p className="mt-[3px] font-inter text-[#929296] text-[12px]">{role}</p>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="mx-auto px-[16px] md:px-[36px] py-[80px] pb-[96px] w-full max-w-[1440px] text-center">
          <p className="font-inter text-[#929296] text-[16px]">No reviews yet.</p>
        </div>
      )}

      {/* CTA */}
      <section className="flex justify-center items-center p-[20px] w-full">
        <div className="flex md:flex-row flex-col justify-between gap-[8px] md:gap-[96px] bg-white px-[16px] md:px-[48px] py-[20px] md:py-[40px] border border-[#e5e5e5] rounded-[24px] w-full max-w-[1400px]">
          <h3 className="max-w-[642px] font-mont font-semibold text-[#111212] text-[30px] lg:text-[56px] lg:leading-[64px]">
            Ready to become our next success story?
          </h3>
          <div className="flex flex-col items-start gap-[40px] md:gap-[20px] w-full max-w-[354px]">
            <p className="font-inter text-[#929296] text-[16px] leading-[24px]">
              Let&apos;s talk about your project, we&apos;ll send you a tailored plan in 48h.
            </p>
            <a href="/contact"
              className="flex justify-center items-center bg-black px-[24px] pt-[14px] pb-[12px] rounded-full font-mont font-semibold text-[14px] text-white hover:scale-105 transition-all duration-300">
              Book a call
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
