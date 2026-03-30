/**
 * Image Wrapper Component
 * Optimized Next Image wrapper for WordPress images with thrilledge.com domain
 */

import Image from 'next/image'
import { CSSProperties } from 'react'

interface ImageWrapperProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  fill?: boolean
  className?: string
  style?: CSSProperties
  sizes?: string
  quality?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down'
  objectPosition?: string
}

export function ImageWrapper({
  src,
  alt,
  width = 600,
  height = 400,
  priority = false,
  fill = false,
  className = '',
  style,
  sizes,
  quality = 85,
  objectFit = 'cover',
  objectPosition = 'center',
}: ImageWrapperProps) {
  // Ensure URL is absolute
  const imageUrl = src.startsWith('http') ? src : `https://thrilledge.com${src}`

  return (
    <div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''}`}>
      <Image
        src={imageUrl}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        className={className}
        style={{
          objectFit,
          objectPosition,
          ...style,
        }}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        loading={priority ? 'eager' : 'lazy'}
        onError={(e) => {
          // Fallback placeholder on error
          console.warn(`[Image Error] Failed to load image: ${imageUrl}`)
        }}
      />
    </div>
  )
}
