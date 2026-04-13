"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

const slides = [
  "/banner-v2.avif",
  "/elevation.avif",
  "/dotdrive.avif",
  "/core.avif",
  "/banner-v2 (1).avif",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    // <div className={cn('w-full', 'xl:h-[calc(100vh-87px)]')}>
    //   <div className={cn('relative', 'flex', 'xl:flex-row', 'flex-col', 'justify-center', 'items-center', 'gap-[32px]', 'bg-[#F3F3F3]', 'mx-auto', 'px-[16px]', 'md:px-[64px]', 'py-[32px]', 'md:py-[32px]', 'w-full', 'h-full')}>

    //     <div className={cn('flex', 'lg:flex-row', 'flex-col', 'items-center', 'xl:items-start', 'gap-[36px]', 'xl:gap-[30px]', 'w-full', 'max-w-[1440px]', 'h-fit')}>

    //       {/* LEFT CONTENT */}
    //       <div className={cn('inset-0', 'flex', 'flex-col', 'justify-center', 'items-start', 'gap-[36px]', 'xl:gap-[40px]', 'w-full', 'h-fit', 'xl:h-full')}>
    //         <div className={cn('flex', 'flex-col', 'items-start', 'md:items-start', 'gap-[24px]')}>

    //           <p className={cn('font-mont', 'font-semibold', 'text-[#111212]', 'text-[12px]', 'sm:text-[14px]', 'text-start', 'uppercase', 'tracking-[0.2em]', 'animate-fade-in-up')}>
    //             Your Last Agency
    //           </p>

    //           <h1 className={cn('max-w-[636px]', 'font-[600]', 'font-mont', 'text-[#111212]', 'text-[33px]', 'md:text-[54px]', 'lg:text-[72px]', 'text-start', 'leading-[33px]', 'md:leading-[54px]', 'lg:leading-[80px]', 'animate-fade-in-up', 'delay-100')}>
    //             We Ship Software That Actually{" "}Works
    //             <span className={cn('relative', 'italic')}>
    //               Works
    //               <span className={cn('-bottom-1', 'left-0', 'absolute', 'bg-[#111212]', 'rounded-full', 'w-full', 'h-[4px]')}></span>
    //             </span>.
    //           </h1>

    //           <p className={cn('max-w-[520px]', 'font-inter', 'text-[#111212]', 'text-[14px]', 'sm:text-[16px]', 'text-start', 'leading-[1.6]', 'animate-fade-in-up', 'delay-200')}>
    //             From zero to launched MVP in weeksnot months. Enterprise-grade web,
    //             mobile, and AI solutions for teams that refuse to settle.
    //           </p>
    //         </div>

    //         <div className={cn('flex', 'flex-col', 'gap-[24px]', 'animate-fade-in-up', 'delay-300')}>

    //           <div className={cn('flex', 'flex-wrap', 'items-center', 'gap-[20px]')}>
    //             <Link className={cn('flex', 'justify-center', 'items-center', 'gap-1', '!bg-black', 'px-[24px]', 'pt-[14px]', 'pb-[12px]', 'rounded-full', 'font-mont', 'font-semibold', '!text-white', 'text-[14px]', 'hover:scale-105', 'transition-all', 'duration-300', 'cursor-pointer')}
    //               href={"/contact"}>
    //               Book a Free Strategy Call
    //             </Link>

    //             <Link className={cn('flex', 'justify-center', 'items-center', 'gap-1', 'px-[24px]', 'pt-[14px]', 'pb-[12px]', 'border', 'border-[#111212]', 'rounded-full', 'font-mont', 'font-semibold', 'text-[14px]', 'hover:scale-105', 'transition-all', 'duration-300', 'cursor-pointer')}
    //               href={"/work"}>
    //               See Our Work
    //             </Link>
    //           </div>

    //           <div className={cn('flex', 'flex-wrap', 'items-center', 'gap-6', 'sm:gap-8')}>
    //             <div className={cn('flex', 'items-center', 'gap-2')}>
    //               <span className={cn('font-mont', 'font-bold', 'text-[#111212]', 'text-lg')}>4.9★</span>
    //               <span className={cn('opacity-60', 'font-inter', 'text-[#111212]', 'text-sm')}>Clutch</span>
    //             </div>
    //             <div className={cn('flex', 'items-center', 'gap-2')}>
    //               <span className={cn('font-mont', 'font-bold', 'text-[#111212]', 'text-lg')}>5.0★</span>
    //               <span className={cn('opacity-60', 'font-inter', 'text-[#111212]', 'text-sm')}>Google</span>
    //             </div>
    //             <div className={cn('flex', 'items-center', 'gap-2')}>
    //               <span className={cn('font-mont', 'font-bold', 'text-[#111212]', 'text-lg')}>15+</span>
    //               <span className={cn('opacity-60', 'font-inter', 'text-[#111212]', 'text-sm')}>Years</span>
    //             </div>
    //             <div className={cn('flex', 'items-center', 'gap-2')}>
    //               <span className={cn('font-mont', 'font-bold', 'text-[#111212]', 'text-lg')}>50+</span>
    //               <span className={cn('opacity-60', 'font-inter', 'text-[#111212]', 'text-sm')}>Products Shipped</span>
    //             </div>
    //           </div>

    //         </div>
    //       </div>

    //       {/* RIGHT SLIDER */}
    //       <div className="w-full">

    //         <section className={cn('flex', 'flex-col', 'gap-3', 'mx-auto', 'w-full', 'max-w-[1400px]', 'select-none')}>

    //           <div className={cn('w-full', 'overflow-hidden', 'cursor-grab', 'active:cursor-grabbing')}>
    //             <div
    //               className={cn('flex', 'transition-transform', 'duration-700', 'ease-in-out')}
    //               style={{ transform: `translateX(-${current * 100}%)` }}
    //             >
    //               {slides.map((img, i) => (
    //                 <div key={i} className="min-w-full">
    //                   <div className={cn('relative', 'rounded-[14px]', 'h-[250px]', 'sm:h-[400px]', 'lg:h-[420px]', 'overflow-hidden')}>
    //                     <Image
    //                       fill
    //                       src={img}
    //                       alt={`Slide ${i}`}
    //                       sizes="(max-width: 768px) 100vw, 50vw"
    //                       priority={i === 0}
    //                       loading={i === 0 ? 'eager' : 'lazy'}
    //                       className={`absolute inset-0 w-full h-full ${i === 0 ? "object-contain" : "object-cover"}`}
    //                     />
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>

    //           {/* DOTS */}
    //           <div className={cn('flex', 'gap-2', 'bg-gray-100', 'mx-auto', 'p-1', 'rounded-full')}>
    //             {slides.map((_, i) => (
    //               <button
    //                 key={i}
    //                 onClick={() => setCurrent(i)}
    //                 className={`h-2 w-8 rounded-full transition cursor-pointer ${
    //                   current === i ? "bg-black" : "bg-gray-300"
    //                 }`}
    //               />
    //             ))}
    //           </div>

    //         </section>

    //       </div>

    //     </div>
    //   </div>
    // </div>
    <section
      id="home"
      className="relative z-10 w-full min-h-screen"
    >
      <div className="relative w-full ">
       <video
  src="/mainpage.mp4"
  loop
  autoPlay
  muted
  playsInline

></video>

        <div className="top-0 left-0 text-center bg-black/75 mx-auto flex flex-col items-center absolute  h-full w-full">
          <div className="max-w-5xl mx-auto flex flex-col justify-center items-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mt-7 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span className="text-xs font-medium tracking-wide text-indigo-300 uppercase">
                {" "}
                Your Last Agency
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-500 mb-6 leading-tight">
              We Ship Software That Actually <br className="hidden md:block" />
              Works
            </h1>

            {/* Paragraph */}
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl font-light leading-relaxed">
              Experience the future of decentralized finance. Sen From zero to
              launched MVP in weeksnot months. Enterprise-grade web, mobile, and
              AI solutions for teams that refuse to settle.d, receive, and
              manage your digital assets with absolute security, low fees, and
              near-instant settlement.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#wallet"
                className="bg-white hover:bg-slate-100 text-slate-950 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] text-center flex items-center justify-center gap-2"
              >
                Book a Free Strategy Call
                <span className="text-lg">↗</span>
              </a>

              <a
                href="#features"
                className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                See Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
