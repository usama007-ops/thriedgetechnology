/**
 * Hook for fetching services with React Query
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { getServices, getService, Service } from '@/lib/wordpress'
import { cacheKeys, CACHE_TTL, withCache } from '@/lib/redis'

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const cacheKey = cacheKeys.services()
      return withCache(
        cacheKey,
        () => getServices(12),
        CACHE_TTL.SERVICES
      )
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

export function useService(slug: string | null | undefined) {
  return useQuery({
    queryKey: ['service', slug],
    queryFn: () => getService(slug!),
    enabled: !!slug,
    staleTime: 60 * 60 * 1000,
  })
}
