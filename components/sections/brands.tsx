"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

const brands = [
  "connected-railway","rsvlts","stand","hws","rodeo",
  "investment-list","eddy","saudia-cargo","attic","blendjet","jot","wild",
];

export default function BrandsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const animate = () => {
      if (!pausedRef.current) {
        posRef.current -= 0.5;
        const half = track.scrollWidth / 2;
        if (Math.abs(posRef.current) >= half) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const doubled = [...brands, ...brands];

  return (
    <div
      className="w-full sm:py-[32px] py-[16px] bg-white overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <div ref={trackRef} className="flex items-center will-change-transform w-max">
        {doubled.map((brand, i) => (
          <div key={i} className="sm:mx-[80px] mx-[40px] flex items-center shrink-0">
            <div className="relative h-[30px] w-[124px]">
              <Image
                src={`/${brand}.svg`}
                alt={brand}
                fill
                sizes="124px"
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
