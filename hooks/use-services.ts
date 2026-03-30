/**
 * Hook for fetching services with React Query
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { getServices, getService, Service } from '@/lib/wordpress'
import { cacheKeys, CACHE_TTL, withCache } from '@/lib/redis'

export function useServices(perPage: number = 12) {
  return useQuery({
    queryKey: ['services', perPage],
    queryFn: async () => {
      const cacheKey = cacheKeys.services(perPage)
      return withCache(
        cacheKey,
        () => getServices(perPage),
        CACHE_TTL.SERVICES
      )
    },
    staleTime: 60 * 60 * 1000,
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
