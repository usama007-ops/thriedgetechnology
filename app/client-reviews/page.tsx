import { getTestimonials } from '@/lib/wordpress'
import type { Metadata } from 'next'

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

      {/* Hero */}
      <div className="w-full max-w-[1440px] mx-auto flex md:flex-row flex-col md:items-end md:gap-[64px] gap-[24px] md:px-[36px] px-[16px] md:py-[80px] py-[64px]">
        <div className="w-full max-w-[610px]">
          <p className="text-[12px] font-inter font-semibold uppercase tracking-[0.2em] text-[#929296] mb-[16px]">Client Reviews</p>
          <h1 className="text-[40px] md:text-[56px] font-mont font-bold leading-[1.1] text-[#111212]">
            What our clients say
          </h1>
        </div>
        <p className="w-full max-w-[560px] text-[18px] font-inter text-[#929296] leading-[1.65]">
          We let our work speak for itself. Here&apos;s what the teams we&apos;ve built with have to say.
        </p>
      </div>

      {/* Stats bar */}
      <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] pb-[64px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#e5e5e5] rounded-[16px] overflow-hidden">
          {[
            { num: '4.9★', label: 'Average Rating' },
            { num: '98%', label: 'Satisfaction Rate' },
            { num: `${testimonials.length}+`, label: 'Happy Clients' },
            { num: '15+', label: 'Years Experience' },
          ].map(s => (
            <div key={s.label} className="bg-white flex flex-col gap-[4px] px-[28px] py-[28px]">
              <p className="text-[36px] font-mont font-bold text-[#111212] leading-none">{s.num}</p>
              <p className="text-[14px] font-inter text-[#929296]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      {testimonials.length > 0 ? (
        <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] pb-[96px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {testimonials.map((t) => {
              const quote = t.content.rendered.replace(/<[^>]*>/g, '').trim()
              const rating = t.acf?.rating ?? 5
              const name = t.acf?.author_name || t.title.rendered
              const role = [t.acf?.author_title, t.acf?.author_company].filter(Boolean).join(', ')

              return (
                <div key={t.id}
                  className="flex flex-col gap-[20px] p-[28px] rounded-[20px] border border-[#e5e5e5] hover:border-[#111212] hover:shadow-lg transition-all duration-300 bg-white">
                  {/* Stars */}
                  <StarRating rating={rating} />

                  {/* Quote */}
                  <p className="text-[16px] font-inter text-[#111212] leading-[1.7] flex-1">
                    &ldquo;{quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-[12px] pt-[16px] border-t border-[#f0f0f0]">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#111212] flex items-center justify-center text-white font-mont font-bold text-[14px] shrink-0">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[14px] font-mont font-semibold text-[#111212] leading-none">{name}</p>
                      {role && <p className="text-[12px] font-inter text-[#929296] mt-[3px]">{role}</p>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] pb-[96px] text-center py-[80px]">
          <p className="text-[#929296] font-inter text-[16px]">No reviews yet.</p>
        </div>
      )}

      {/* CTA */}
      <section className="w-full flex items-center justify-center p-[20px]">
        <div className="w-full max-w-[1400px] flex md:flex-row flex-col justify-between md:gap-[96px] gap-[8px] rounded-[24px] md:px-[48px] px-[16px] md:py-[40px] py-[20px] bg-white border border-[#e5e5e5]">
          <h3 className="lg:text-[56px] text-[30px] lg:leading-[64px] font-semibold font-mont text-[#111212] max-w-[642px]">
            Ready to become our next success story?
          </h3>
          <div className="max-w-[354px] w-full flex items-start flex-col md:gap-[20px] gap-[40px]">
            <p className="text-[16px] leading-[24px] text-[#929296] font-inter">
              Let&apos;s talk about your project — we&apos;ll send you a tailored plan in 48h.
            </p>
            <a href="/contact"
              className="flex items-center justify-center px-[24px] pt-[14px] pb-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300">
              Book a call
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
