"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";

const brands = [
  "ledgerplustax.png","mrcsaudi.png","alfalah.png","bithub.png","Inviveo.png",
  "colbeck.webp", "globaldata365.png", "shotdiffrnt.png"];

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

  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 })

  return (
    <div
      ref={sectionRef}
      className="w-full sm:py-[32px] py-[16px] bg-white overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <div ref={trackRef} className="flex items-center will-change-transform w-max">
        {doubled.map((brand, i) => (
          <div key={i} className="sm:mx-[80px] mx-[40px] flex items-center shrink-0">
            <div className="relative h-[50px] w-[154px]">
              <Image
                src={`/${brand}`}
                alt={brand}
                fill
                sizes="154px"
                className="object-contain grayscale brightness-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
