/**
 * Hook for fetching testimonials with React Query
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { getTestimonials, Testimonial } from '@/lib/wordpress'
import { cacheKeys, CACHE_TTL, withCache } from '@/lib/redis'

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const cacheKey = cacheKeys.testimonials()
      return withCache(
        cacheKey,
        () => getTestimonials(12),
        CACHE_TTL.TESTIMONIALS
      )
    },
    staleTime: 60 * 60 * 2 * 1000, // 2 hours
  })
}
