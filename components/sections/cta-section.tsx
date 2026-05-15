/**
 * Call-to-Action Section Component
 * Final CTA for conversions
 */

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Animate } from "../common/animate";

export function CTASection() {
  return (
    <section className="bg-white px-4 py-20">
      <Animate variant="scale-in">
        <div className="bg-[#111212] max-w-[1440px] mx-auto rounded-[24px] overflow-hidden">
          <div
            className="
          flex
          flex-col
          lg:flex-row
          justify-between
          lg:items-center
          gap-[28px]
          px-[20px]
          sm:px-[28px]
          md:px-[40px]
          py-[32px]
          md:py-[48px]
        "
          >
            {/* Left Content */}
            <div className="flex flex-col gap-[12px] max-w-[520px]">
              <h2
                className="
              font-mont
              font-bold
              text-[28px]
              leading-[32px]
              sm:text-[34px]
              sm:leading-[38px]
              md:text-[48px]
              md:leading-[52px]
              text-white
            "
              >
                Not sure which service fits?
              </h2>

              <p
                className="
              font-inter
              text-[14px]
              md:text-[16px]
              leading-[1.7]
              text-[#b7b7b9]
            "
              >
                Tell us about your project and we’ll recommend the right
                approach within 48 hours.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-[12px] w-full lg:w-auto">
              <Link
                href="/contact"
                className="
              flex
              justify-center
              items-center
              h-[50px]
              px-[24px]
              bg-white
              rounded-full
              font-mont
              font-semibold
              text-[#111212]
              text-[14px]
              hover:scale-[1.02]
              transition-all
              duration-300
            "
              >
                Book a call
              </Link>

              <Link
                href="/project-cost-estimation"
                className="
              flex
              justify-center
              items-center
              h-[50px]
              px-[24px]
              border
              border-white/20
              rounded-full
              font-mont
              font-semibold
              text-[14px]
              text-white
              hover:bg-white
              hover:text-[#111212]
              transition-all
              duration-300
            "
              >
                Get Project Estimate
              </Link>
            </div>
          </div>
        </div>
      </Animate>
    </section>
  );
}
