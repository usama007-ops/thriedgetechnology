import { getTestimonials } from "@/lib/wordpress";
import type { Metadata } from "next";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Animate } from "@/components/common/animate";

export const metadata: Metadata = {
  title: "Client Reviews | Thrill Edge Technologies",
  description: "Read what our clients say about working with Thrill Edge Technologies.",
};

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.75">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24"
          fill={i < rating ? "#111212" : "none"} stroke="#111212" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default async function ClientReviewsPage() {
  const testimonials = await getTestimonials(100).catch(() => []);

  return (
    <div className="relative bg-white">
      {/* Hero */}
      <div className="relative w-full p-2">
        <div className={cn("relative", "rounded-[20px]", "w-full", "h-120", "overflow-hidden")}>
          <Image src="/reviews.jpg" alt="Client Reviews" fill className={cn("object-center", "object-cover")} sizes="100vw" priority />
          <div className={cn("absolute", "inset-0", "rounded-[20px]")} style={{ background: "linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.6), rgba(0,0,0,0))" }} />
          <div className={cn("absolute", "bottom-0", "left-0", "max-w-360", "right-0", "flex", "lg:flex-row", "flex-col", "justify-between", "lg:items-end", "gap-4", "lg:px-9", "px-5", "lg:py-8", "py-6", "mx-auto")}>
            <div className="flex flex-col gap-4">
              <span className={cn("text-sm", "font-inter", "text-white/70")}>Testimonials</span>
              <h2 className={cn("text-[32px]", "lg:text-[56px]", "lg:leading-15", "leading-9", "font-mont", "font-semibold", "text-white", "max-w-2xl")}>
                Where Client Satisfaction Meets Excellence
              </h2>
            </div>
            <p className="lg:text-[18px] text-[15px] font-inter text-white/70 lg:max-w-1/2 leading-7">
              Our work speaks through the success of our clients.
            </p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mx-auto px-4 md:px-9 py-8 md:py-16 w-full max-w-360">
        <Animate variant="fade-up">
          <div className="gap-px grid grid-cols-2 md:grid-cols-4 bg-[#e5e5e5] rounded-2xl overflow-hidden">
            {[
              { num: "4.9★", label: "Average Rating" },
              { num: "98%", label: "Satisfaction Rate" },
              { num: `${testimonials.length}+`, label: "Happy Clients" },
              { num: "15+", label: "Years Experience" },
            ].map((s, i) => (
              <Animate key={s.label} variant="scale-in" delay={i * 80}>
                <div className="flex flex-col gap-1 bg-white px-7 py-7">
                  <p className="font-mont font-bold text-[#111212] text-[36px] leading-none">{s.num}</p>
                  <p className="font-inter text-[#929296] text-[14px]">{s.label}</p>
                </div>
              </Animate>
            ))}
          </div>
        </Animate>
      </div>

      {/* Submit Review button */}
      <Animate variant="fade-up" className="flex justify-center mx-auto px-4 md:px-9 pb-8 md:pb-16 w-full max-w-360">
        <a href="/public-review"
          className="flex justify-center items-center gap-2 bg-black px-8 pt-4 pb-3.5 rounded-full font-mont font-semibold text-[15px] text-white hover:scale-105 transition-all duration-300">
          ✍️ Submit Your Review
        </a>
      </Animate>

      {testimonials.length > 0 ? (
        <div className="mx-auto px-4 md:px-9 pb-24 w-full max-w-360">
          <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => {
              const quote = t.content.rendered.replace(/<[^>]*>/g, "").trim();
              const rating = t.acf?.rating ?? 5;
              const name = t.acf?.author_name || t.title.rendered;
              const role = [t.acf?.author_title];
              return (
                <Animate key={t.id} variant="fade-up" delay={(i % 3) * 100}>
                  <div className="flex flex-col gap-5 bg-white hover:shadow-lg p-7 border border-[#e5e5e5] hover:border-[#111212] rounded-[20px] transition-all duration-300 h-full">
                    <StarRating rating={rating} />
                    <p className="flex-1 font-inter text-[#111212] text-[16px] leading-[1.7]">&ldquo;{quote}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-4 border-[#f0f0f0] border-t">
                      <div className="flex justify-center items-center bg-[#111212] rounded-full w-10 h-10 font-mont font-bold text-[14px] text-white shrink-0">
                        {name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-mont font-semibold text-[#111212] text-[14px] leading-none">{name}</p>
                        {/* {role && <p className="mt-0.75 font-inter text-[#929296] text-[12px]">{role}</p>} */}
                      </div>
                    </div>
                  </div>
                </Animate>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mx-auto px-4 md:px-9 py-20 pb-24 w-full max-w-360 text-center">
          <p className="font-inter text-[#929296] text-[16px]">No reviews yet.</p>
        </div>
      )}

      {/* CTA */}
      <Animate variant="scale-in">
        <div className="bg-[#111212] max-w-360 mx-auto rounded-[30px] mb-20">
          <div className="flex lg:flex-row flex-col justify-between md:items-center gap-12 mx-auto px-7.5 py-24 w-full max-w-360">
            <div className="flex flex-col items-center md:items-items-start gap-4 lg:max-w-125">
              <h2 className="font-mont font-bold text-[48px] text-white leading-13">Not sure which service fits?</h2>
              <p className="font-inter text-[#929296] text-[16px] leading-6">Tell us about your project and we'll recommend the right approach in 48h.</p>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <Link href="/contact" className="flex justify-center items-center bg-white px-8 py-4 rounded-full font-mont font-semibold text-[#111212] text-[16px] hover:scale-105 transition-all duration-300">Book a call</Link>
              <Link href="/project-cost-estimation" className="flex justify-center items-center hover:bg-white px-8 py-4 border border-white rounded-full font-mont font-semibold text-[16px] text-white hover:text-[#111212] transition-all duration-300">Get an Project Estimate</Link>
            </div>
          </div>
        </div>
      </Animate>
    </div>
  );
}
