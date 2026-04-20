import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen">
      <section className="mx-auto w-full min-h-screen">
        <div className="relative bg-[#111212] w-full overflow-hidden min-h-screen flex flex-col justify-center">

          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 70% 50%, rgba(99,102,241,0.10) 0%, transparent 60%)',
            }}
          />

          <div className="relative flex flex-col items-center justify-center gap-8 px-6 py-32 md:py-48 text-center">

            {/* 404 number */}
            <p className="font-mont font-bold text-[120px] md:text-[200px] text-white/[0.06] leading-none select-none">
              404
            </p>

            {/* Overlaid content */}
            <div className="absolute flex flex-col items-center gap-6">
              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.25em]">
                Page not found
              </span>
              <h1 className="font-mont font-bold text-[36px] md:text-[64px] text-white leading-tight max-w-2xl">
                This page doesn&apos;t exist.
              </h1>
              <p className="font-inter text-[15px] md:text-[17px] text-white/50 max-w-md leading-7">
                The URL may be mistyped, moved, or no longer available. Let&apos;s get you back on track.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <Link
                  href="/"
                  className="flex items-center gap-2 bg-white px-7 pt-3.5 pb-3 rounded-full font-mont font-semibold text-[#111212] text-[14px] hover:scale-105 transition-all duration-300"
                >
                  <ArrowLeft size={15} />
                  Back to home
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 border border-white/20 hover:border-white/60 px-7 pt-3.5 pb-3 rounded-full font-mont font-semibold text-white text-[14px] transition-all duration-300"
                >
                  Contact us
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
