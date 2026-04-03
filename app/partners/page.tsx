import { PageHero } from "@/components/common/page-hero";
import { WorkSection } from "@/components/sections/work-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Partners | Thrill Edge Technologies",
  description:
    "We collaborate with leading technology providers across AI & ML, web development, mobile applications, SaaS platforms, and product strategy.",
};

const partnerCategories = [
  {
    label: "AI & ML",
    partners: ["OpenAI", "Hugging Face", "Google Cloud AI", "AWS SageMaker"],
  },
  {
    label: "Web Development",
    partners: ["Vercel", "Netlify", "Cloudflare", "Supabase"],
  },
  {
    label: "Mobile Applications",
    partners: ["Expo", "Firebase", "RevenueCat", "Sentry"],
  },
  {
    label: "SaaS Platforms",
    partners: ["Stripe", "Twilio", "SendGrid", "Intercom"],
  },
  {
    label: "UI/UX Design",
    partners: ["Figma", "Framer", "Lottie", "Storybook"],
  },
  {
    label: "Product Strategy",
    partners: ["Mixpanel", "Amplitude", "Linear", "Notion"],
  },
];

export default function PartnersPage() {
  return (
    <div className="relative bg-white">
      <PageHero
        label="Partners"
        title="Strategic Technology Partnerships"
        subtitle="We collaborate with leading technology providers and solution partners across AI & ML, web development, mobile applications, SaaS platforms, and product strategy to deliver exceptional value to our clients."
      />

      {/* Become a Partner CTA */}
      <section className="flex justify-center px-4 md:px-9 pt-16 pb-0 w-full">
        <div className="flex md:flex-row flex-col justify-between items-center gap-6 bg-white px-6 md:px-12 py-8 md:py-10 border border-[#e5e5e5] rounded-3xl w-full max-w-360">
          <div className="flex flex-col gap-3 max-w-2xl">
            <h2 className="font-mont font-semibold text-[#111212] text-[28px] lg:text-[48px] lg:leading-[1.1]">
              Become our partner
            </h2>
            <p className="font-inter text-[#929296] text-[16px] leading-6">
              Join our partner ecosystem and co-create solutions that make a real impact for clients worldwide.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2 bg-black px-6 pt-3.5 pb-3 rounded-full font-mont font-semibold text-[14px] text-white hover:scale-105 transition-all duration-300 shrink-0"
          >
            Get in touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Technology Partnerships Grid */}
      <section className="mx-auto px-4 md:px-9 py-20 w-full max-w-360">
        <div className="mb-12">
          <span className="font-inter font-semibold text-[#929296] text-[12px] uppercase tracking-[0.2em]">
            Our Technology Partnerships
          </span>
          <h2 className="mt-3 max-w-3xl font-mont font-bold text-[#111212] text-[36px] md:text-[52px] leading-[1.1]">
            We work with trusted partners across every layer of the stack
          </h2>
          <p className="mt-4 max-w-2xl font-inter text-[#929296] text-[16px] leading-6">
            We work with trusted partners across AI & ML, web development, mobile apps, SaaS solutions, UI/UX design, and product strategy to deliver comprehensive digital solutions.
          </p>
        </div>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {partnerCategories.map((cat) => (
            <div
              key={cat.label}
              className="flex flex-col gap-4 p-6 border border-[#e5e5e5] hover:border-[#111212] rounded-2xl transition-colors duration-300"
            >
              <span className="font-inter font-semibold text-[#929296] text-[12px] uppercase tracking-[0.2em]">
                {cat.label}
              </span>
              <ul className="flex flex-col gap-2">
                {cat.partners.map((p) => (
                  <li
                    key={p}
                    className="font-mont font-semibold text-[#111212] text-[18px]"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies / Work Section */}
      <section className="mx-auto px-4 md:px-9 pb-4 w-full max-w-360">
        <div className="mb-2">
          <span className="font-inter font-semibold text-[#929296] text-[12px] uppercase tracking-[0.2em]">
            Case Studies
          </span>
          <div className="flex justify-between items-end gap-4 mt-3">
            <h2 className="font-mont font-bold text-[#111212] text-[36px] md:text-[52px] leading-[1.1]">
              Our Latest Works
            </h2>
            <Link
              href="/work"
              className="flex items-center gap-2 hover:bg-[#111212] mb-2 px-5 py-2.5 border border-[#111212] rounded-full font-mont font-semibold text-[#111212] text-[14px] hover:text-white transition-all duration-300 shrink-0"
            >
              View all case studies
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <WorkSection show={6} />
    </div>
  );
}
