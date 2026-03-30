/**
 * Hook for fetching work/portfolio items with React Query
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { getWorkItems, getWorkItem, WorkItem } from '@/lib/wordpress'
import { cacheKeys, CACHE_TTL, withCache } from '@/lib/redis'

interface UseWorkItemsOptions {
  page?: number
  per_page?: number
  enabled?: boolean
}

export function useWorkItems(options: UseWorkItemsOptions = {}) {
  const { page = 1, per_page = 6, enabled = true } = options

  return useQuery({
    queryKey: ['work-items', page],
    queryFn: async () => {
      const cacheKey = cacheKeys.workItems(page)
      return withCache(
        cacheKey,
        () => getWorkItems(page, per_page),
        CACHE_TTL.WORK_ITEMS
      )
    },
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useWorkItem(slug: string | null | undefined) {
  return useQuery({
    queryKey: ['work-item', slug],
    queryFn: async () => {
      if (!slug) return null
      const cacheKey = cacheKeys.workItem(slug)
      return withCache(
        cacheKey,
        () => getWorkItem(slug),
        CACHE_TTL.WORK_ITEMS
      )
    },
    enabled: !!slug,
  })
}
