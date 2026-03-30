/**
 * Marquee Component
 * Custom marquee for testimonials and other scrolling content
 * Fallback implementation if react-marquee is unavailable
 */

'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

interface MarqueeProps {
  children: ReactNode
  direction?: 'left' | 'right'
  speed?: number
  pauseOnHover?: boolean
  gap?: string
  className?: string
}

export function Marquee({
  children,
  direction = 'left',
  speed = 50,
  pauseOnHover = true,
  gap = 'gap-8',
  className = '',
}: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false)
  const marqueeRef = useRef<HTMLDivElement>(null)

  const animationName = direction === 'left' ? 'marquee' : 'marquee-reverse'
  const animationDuration = `${speed}s`

  return (
    <div
      ref={marqueeRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        overflow-hidden flex items-center
        ${className}
      `}
    >
      <div
        className={`flex ${gap} whitespace-nowrap`}
        style={{
          animation: `${animationName} ${animationDuration} linear infinite`,
          animationPlayState: pauseOnHover && isHovered ? 'paused' : 'running',
        }}
      >
        {/* Original content */}
        {children}
      </div>

      {/* Duplicate for seamless loop */}
      <div
        className={`flex ${gap} whitespace-nowrap`}
        style={{
          animation: `${animationName} ${animationDuration} linear infinite`,
          animationPlayState: pauseOnHover && isHovered ? 'paused' : 'running',
        }}
      >
        {children}
      </div>
    </div>
  )
}

interface TestimonialCardProps {
  quote: string
  author: string
  title: string
  company: string
  rating?: number
}

export function TestimonialCard({
  quote,
  author,
  title,
  company,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-card min-w-[350px] md:min-w-[400px] flex flex-col gap-4">
      {/* Rating */}
      {rating && (
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i} className="text-accent text-lg">
              ★
            </span>
          ))}
        </div>
      )}

      {/* Quote */}
      <p className="text-muted-foreground italic line-clamp-3">
        &quot;{quote}&quot;
      </p>

      {/* Author */}
      <div className="pt-2 border-t border-border">
        <p className="font-semibold text-foreground">{author}</p>
        <p className="text-sm text-muted-foreground">
          {title} at {company}
        </p>
      </div>
    </div>
  )
}
