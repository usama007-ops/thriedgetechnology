import Image from "next/image";
import Link from "next/link";
import { cn } from "../../lib/utils";

export default function Contact() {
  return (
    <div className="bg-[#F3F3F3] min-h-screen pb-20">

      {/* ── Hero Banner (unchanged) ─────────────────────────────────────────── */}
      <section className={cn("mx-auto", "p-2", "w-full")}>
        <div className={cn("relative", "rounded-[20px]", "w-full", 'h-[300px]', 'lg:h-[480px]', "overflow-hidden")}>
          <Image
            src="/contact-hero.jpg"
            alt="Contact"
            fill
            className={cn("object-center", "object-cover")}
            sizes="100vw"
            priority
          />
          <div
            className={cn("absolute", "inset-0", "rounded-[20px]")}
            style={{ background: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.6), rgba(0,0,0,0))" }}
          />
          <div
            className={cn(
              "right-0", "bottom-0", "left-0", "absolute",
              "flex", "lg:flex-row", "flex-col",
              "justify-between", "lg:items-end", "gap-4",
              "mx-auto", "px-5", "lg:px-9", "py-6", "lg:py-8",
              "max-w-[1440px]"
            )}
          >
            <h1
              className={cn(
                "max-w-2xl", "font-mont", "font-semibold",
                "text-[32px]", "text-white", "lg:text-[56px]",
                "leading-9", "lg:leading-[60px]"
              )}
            >
              Tell us what you&apos;re building.
            </h1>
            <p className={cn("lg:max-w-xs", "font-inter", "text-[15px]", "text-white/70", "lg:text-[18px]", "leading-7")}>
              We respond to every submission within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content: Left copy + Right Calendly ───────────────────────── */}
      <section className="mx-auto px-5 lg:px-9 py-20 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left Column */}
          <div className="flex flex-col gap-8 lg:max-w-[420px] w-full">
            <div className="flex flex-col gap-4">
              <h2 className="font-mont font-semibold text-[36px] lg:text-[48px] text-[#111212] leading-[1.1]">
                Tell us what you&apos;re building.
              </h2>
              <p className="font-inter font-semibold text-[16px] text-[#111212] leading-[1.6]">
                We respond to every submission within one business day.
              </p>
              <p className="font-inter text-[14px] text-[#929296] leading-[1.7]">
                Describe your product, timeline, and key requirements. A senior member of
                our team will review your submission and reply with a clear next step.
              </p>
            </div>

            {/* Social Proof Card */}
            <div className="bg-white border border-[#e5e5e5] rounded-[16px] p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-mont font-semibold text-[14px] text-[#111212]">Anthony Price</span>
                <div className="flex items-center gap-2">
                  <span className="font-inter text-[12px] text-[#929296]">Acorn PG</span>
                  <span className="bg-[#111212] text-white font-inter text-[10px] px-2 py-0.5 rounded-full">Managing Director</span>
                </div>
              </div>
              <p className="font-inter text-[13px] text-[#555] leading-[1.7]">
                &ldquo;They handled complex projects with professionalism and clarity. Every milestone was delivered on time and the communication throughout was excellent.&rdquo;
              </p>
            </div>

            {/* WhatsApp CTA */}
            <div className="flex items-center gap-2 mt-2">
              <span className="font-inter text-[13px] text-[#929296]">Prefer messaging?</span>
              <a
                href="https://wa.me/447853746775"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-inter font-semibold text-[13px] text-[#111212] hover:opacity-70 transition-opacity"
              >
                {/* WhatsApp icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column — Calendly */}
          <div className="flex-1 w-full min-w-0">
            <div className="bg-white border border-[#e5e5e5] rounded-[20px] overflow-hidden shadow-sm">
              <iframe
                src="https://calendly.com/thrilledge-technologies/30min"
                width="100%"
                height="660"
                frameBorder="0"
                title="Schedule a meeting with Thrill Edge Technologies"
                className="block"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── Marquee Text ───────────────────────────────────────────────────── */}
      <div className="overflow-hidden py-6 select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="font-mont font-bold text-[80px] lg:text-[120px] leading-none text-transparent mr-8"
              style={{ WebkitTextStroke: "1.5px #c8c8c8", color: "transparent" }}
            >
              next product starts&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Dark CTA Banner ────────────────────────────────────────────────── */}
      <div className="bg-[#111212] max-w-[1440px] mx-5 lg:mx-9 xl:mx-auto rounded-[30px]">
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-12 px-8 md:px-14 py-16 w-full">
          <div className="flex flex-col gap-3 max-w-[420px]">
            <h2 className="font-mont font-bold text-[36px] lg:text-[48px] text-white leading-[1.1]">
              Let&apos;s Build Your Next Big Thing
            </h2>
             <p className="font-inter text-[#929296] text-[16px] leading-[24px]">
              Tell us about your project and we'll recommend the right approach in 48h.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:max-w-[340px]">
            <p className="font-inter text-[14px] text-[#929296] leading-[1.7]">
              Your idea, our brains — we&apos;ll send you a tailored game plan in 48h.
            </p>
            <Link
              href="/project-cost-estimation"
              className="inline-flex items-center justify-center bg-white px-6 py-3.5 rounded-full font-mont font-semibold text-[14px] text-[#111212] hover:scale-105 transition-all duration-300 w-fit"
            >
              Get an Project Estimate
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
