"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

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
    <div className="w-full xl:h-[calc(100vh-87px)]">
      <div className="relative h-full w-full mx-auto flex xl:flex-row flex-col items-center justify-center gap-[32px] bg-[#F3F3F3] md:px-[64px] px-[16px] md:py-[32px] py-[32px]">

        <div className="w-full max-w-[1440px] h-fit flex lg:flex-row flex-col xl:items-start items-center xl:gap-[30px] gap-[36px]">

          {/* LEFT CONTENT */}
          <div className="w-full xl:h-full h-fit inset-0 flex flex-col items-start justify-center xl:gap-[40px] gap-[36px]">
            <div className="flex flex-col md:items-start items-start gap-[24px]">

              <p className="animate-fade-in-up text-[#111212] text-start font-mont sm:text-[14px] text-[12px] font-semibold tracking-[0.2em] uppercase">
                Your Last Agency
              </p>

              <h1 className="animate-fade-in-up delay-100 max-w-[636px] text-[#111212] text-start font-mont lg:text-[72px] md:text-[54px] text-[33px] font-[600] lg:leading-[80px] md:leading-[54px] leading-[33px]">
                We Ship Software That Actually{" "}
                <span className="relative italic">
                  Works
                  <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-[#111212] rounded-full"></span>
                </span>.
              </h1>

              <p className="animate-fade-in-up delay-200 max-w-[520px] text-[#111212] text-start font-inter sm:text-[16px] text-[14px] leading-[1.6]">
                From zero to launched MVP in weeks — not months. Enterprise-grade web,
                mobile, and AI solutions for teams that refuse to settle.
              </p>
            </div>

            <div className="animate-fade-in-up delay-300 flex flex-col gap-[24px]">
              
              <div className="flex flex-wrap items-center gap-[20px]">
                <Link className="flex items-center justify-center gap-1 px-[24px] pt-[14px] pb-[12px] font-mont text-[14px] font-semibold cursor-pointer hover:scale-105 transition-all duration-300 rounded-full !bg-black !text-white"
                  href={"/contact"}>
                  Book a Free Strategy Call
                </Link>

                <Link className="flex items-center justify-center gap-1 px-[24px] pt-[14px] pb-[12px] font-mont text-[14px] font-semibold cursor-pointer hover:scale-105 transition-all duration-300 rounded-full border border-[#111212]"
                  href={"/work"}>
                  See Our Work
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#111212] font-mont">4.9★</span>
                  <span className="text-sm text-[#111212] font-inter opacity-60">Clutch</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#111212] font-mont">5.0★</span>
                  <span className="text-sm text-[#111212] font-inter opacity-60">Google</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#111212] font-mont">15+</span>
                  <span className="text-sm text-[#111212] font-inter opacity-60">Years</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#111212] font-mont">50+</span>
                  <span className="text-sm text-[#111212] font-inter opacity-60">Products Shipped</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div className="w-full">

            <section className="w-full max-w-[1400px] mx-auto flex flex-col gap-3 select-none">
              
              <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {slides.map((img, i) => (
                    <div key={i} className="min-w-full">
                      <div className="relative h-[250px] sm:h-[400px] lg:h-[420px] rounded-[14px] overflow-hidden">
                        <Image fill src={img} alt={`Slide ${i}`} className={`absolute inset-0 w-full h-full ${i === 0 ? "object-contain" : "object-cover"}`}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DOTS */}
              <div className="flex gap-2 rounded-full p-1 mx-auto bg-gray-100">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 w-8 rounded-full transition cursor-pointer ${
                      current === i ? "bg-black" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

            </section>

          </div>

        </div>
      </div>
    </div>
  );
}