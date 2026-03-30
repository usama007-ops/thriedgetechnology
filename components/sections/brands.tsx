"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const brands = [
  "connected-railway",
  "rsvlts",
  "stand",
  "hws",
  "rodeo",
  "investment-list",
  "eddy",
  "saudia-cargo",
  "attic",
  "blendjet",
  "jot",
  "wild",
];

export default function BrandsMarquee() {
  return (
    <div className="w-full sm:py-[32px] py-[16px] bg-white overflow-hidden">
      
      <Marquee
        speed={50}              // adjust speed (original ~136s feel)
        pauseOnHover={true}
        pauseOnClick={true}
        gradient={false}
      >
        {brands.map((brand, i) => (
          <div
            key={i}
            className="sm:mx-[80px] mx-[40px] flex items-center"
          >
            <Image
              src={`/${brand}.svg`}
              alt={brand}
              width={124}
              height={26}
              className="h-[30px] w-auto"
            />
          </div>
        ))}
      </Marquee>

    </div>
  );
}