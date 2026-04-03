import Image from "next/image"
import { cn } from "../../lib/utils";

interface PageHeroProps {
  label?: string
  title: string
  subtitle?: string

  // Right side image
  image?: string
  imageAlt?: string

  // Background control
  bgColor?: string
  bgImage?: string

  // Layout control
  height?: string

  // Overlay / gradient
  overlay?: boolean
  overlayColor?: string
  gradient?: string

  // Custom class
  className?: string
}

export function PageHero({
  label,
  title,
  subtitle,
  image,
  imageAlt,

  bgColor = "#111212",
  bgImage,

  height = "auto",

  overlay = false,
  overlayColor = "rgba(0,0,0,0.5)",
  gradient,

  className = "",
}: PageHeroProps) {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        backgroundColor: bgColor,
        height: height,
      }}
    >
      {/* Background Image */}
      {bgImage && (
        <div className={cn('absolute', 'inset-0', 'z-0')}>
          <Image
            src={bgImage}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Overlay */}
      {(overlay || gradient) && (
        <div
          className={cn('absolute', 'inset-0', 'z-10')}
          style={{
            background: gradient ? gradient : overlayColor,
          }}
        />
      )}

      {/* Content */}
      <div className={cn('relative', 'z-20', 'max-w-360', 'mx-auto', 'md:px-9', 'px-4', 'pt-20', 'pb-16', 'flex', 'md:flex-row', 'flex-col', 'md:items-end', 'justify-between', 'gap-8')}>
        
        {/* Left Content */}
        <div className={cn('flex', 'flex-col', 'gap-4')}>
          {label && (
            <span className={cn('text-[12px]', 'font-inter', 'font-semibold', 'uppercase', 'tracking-[0.2em]', 'text-white/40')}>
              {label}
            </span>
          )}

          <h1
            className={cn('text-[48px]', 'md:text-[64px]', 'font-mont', 'font-bold', 'leading-[1.05]', 'text-white', 'max-w-175')}
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {subtitle && (
            <p className={cn('text-[16px]', 'font-inter', 'text-white/50', 'leading-[1.7]', 'max-w-105')}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Image */}
        {image && (
          <div className={cn('relative', 'w-full', 'md:max-w-125', 'h-75', 'md:h-100')}>
            <Image
              src={image}
              alt={imageAlt || "Hero Image"}
              fill
              className={cn('object-cover', 'rounded-2xl')}
              priority
            />
          </div>
        )}
      </div>
    </div>
  )
}
