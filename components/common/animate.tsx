'use client'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'
import { type ReactNode, type CSSProperties, createElement } from 'react'

type AnimVariant = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in' | 'blur-in'

interface AnimateProps {
  children: ReactNode
  variant?: AnimVariant
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  style?: CSSProperties
  as?: string
}

const variantClass: Record<AnimVariant, string> = {
  'fade-up':    'anim-fade-up',
  'fade-in':    'anim-fade-in',
  'slide-left': 'anim-slide-left',
  'slide-right':'anim-slide-right',
  'scale-in':   'anim-scale-in',
  'blur-in':    'anim-blur-in',
}

export function Animate({
  children,
  variant = 'fade-up',
  delay = 0,
  duration,
  threshold = 0.12,
  className,
  style,
  as: Tag = 'div',
}: AnimateProps) {
  const { ref, inView } = useInView({ threshold })

  const transitionStyle: CSSProperties = {
    transitionDelay: `${delay}ms`,
    ...(duration ? { transitionDuration: `${duration}ms` } : {}),
    ...style,
  }

  return createElement(
    Tag,
    {
      ref,
      className: cn(variantClass[variant], inView && 'in-view', className),
      style: transitionStyle,
    },
    children
  )
}
