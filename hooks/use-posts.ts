/**
 * Hook for fetching blog posts with React Query
 * Handles pagination, filtering, and caching
 */

'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getPosts, Post } from '@/lib/wordpress'
import { cacheKeys, CACHE_TTL, withCache } from '@/lib/redis'

interface UsePostsOptions {
  page?: number
  per_page?: number
  search?: string
  categories?: number[]
  enabled?: boolean
}

export function usePosts(options: UsePostsOptions = {}): UseQueryResult<Post[], Error> {
  const {
    page = 1,
    per_page = 10,
    search,
    categories,
    enabled = true,
  } = options

  const cacheKey = cacheKeys.posts(page, search, categories)

  return useQuery({
    queryKey: ['posts', page, search, categories],
    queryFn: async () => {
      return withCache(
        cacheKey,
        () => getPosts(page, per_page, search, categories),
        CACHE_TTL.POSTS
      )
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook for fetching a single post by slug
 */
export function usePost(slug: string | null | undefined) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      if (!slug) return null
      const cacheKey = cacheKeys.post(slug)
      return withCache(
        cacheKey,
        async () => {
          const { getPost } = await import('@/lib/wordpress')
          return getPost(slug)
        },
        CACHE_TTL.POSTS
      )
    },
    enabled: !!slug,
  })
}

/**
 * Hook for fetching all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { getCategories } = await import('@/lib/wordpress')
      const cacheKey = cacheKeys.categories()
      return withCache(
        cacheKey,
        () => getCategories(),
        CACHE_TTL.CATEGORIES
      )
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}

/**
 * Hook for fetching posts by category
 */
export function usePostsByCategory(categoryId: number | null, page: number = 1) {
  return useQuery({
    queryKey: ['posts-by-category', categoryId, page],
    queryFn: async () => {
      if (!categoryId) return []
      const { getPostsByCategory } = await import('@/lib/wordpress')
      const cacheKey = cacheKeys.categoryPosts(categoryId, page)
      return withCache(
        cacheKey,
        () => getPostsByCategory(categoryId, page, 10),
        CACHE_TTL.POSTS
      )
    },
    enabled: !!categoryId,
  })
}
