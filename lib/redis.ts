/**
 * Upstash Redis Cache Configuration
 * Handles server-side caching for WordPress data
 */

import { Redis } from '@upstash/redis'

// Initialize Redis client
const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    })
  : null

// Verify Redis configuration
if (typeof window === 'undefined') {
  if (redis) {
    console.log('Redis client initialized successfully')
    console.log('Redis URL:', process.env.UPSTASH_REDIS_REST_URL)
  } else {
    console.warn('Redis not configured - caching disabled')
  }
}

/**
 * Cache configuration
 */
const CACHE_TTL = {
  POSTS: 60 * 60, // 1 hour
  CATEGORIES: 60 * 60 * 4, // 4 hours
  SERVICES: 60 * 60 * 4, // 4 hours
  TESTIMONIALS: 60 * 60 * 12, // 12 hours
  WORK_ITEMS: 60 * 60 * 2, // 2 hours
  FEATURED: 60 * 60 * 6, // 6 hours
  SEARCH: 60 * 60, // 1 hour
} as const

/**
 * Generate cache key
 */
function generateCacheKey(type: string, ...params: (string | number)[]): string {
  return `thrill-edge:${type}:${params.join(':')}`
}

/**
 * Get from cache
 */
export async function getFromCache<T>(key: string): Promise<T | null> {
  if (!redis) return null

  try {
    const cached = await redis.get(key)
    if (cached) {
      return JSON.parse(String(cached)) as T
    }
  } catch (error) {
    console.error(`[Cache] Error retrieving key ${key}:`, error)
  }

  return null
}

/**
 * Set in cache
 */
export async function setInCache<T>(
  key: string,
  value: T,
  ttl: number = CACHE_TTL.POSTS
): Promise<void> {
  if (!redis) return

  try {
    await redis.setex(key, ttl, JSON.stringify(value))
  } catch (error) {
    console.error(`[Cache] Error setting key ${key}:`, error)
  }
}

/**
 * Delete from cache
 */
export async function deleteFromCache(key: string): Promise<void> {
  if (!redis) return

  try {
    await redis.del(key)
  } catch (error) {
    console.error(`[Cache] Error deleting key ${key}:`, error)
  }
}

/**
 * Clear cache pattern
 */
export async function clearCachePattern(pattern: string): Promise<void> {
  if (!redis) return

  try {
    // In Upstash, we need to scan and delete
    // This is a simplified approach - production should use SCAN
    const key = generateCacheKey(pattern)
    await redis.del(key)
  } catch (error) {
    console.error(`[Cache] Error clearing pattern ${pattern}:`, error)
  }
}

/**
 * Cache key generators
 */
export const cacheKeys = {
  posts: (page: number, search?: string, categories?: number[]) =>
    generateCacheKey('posts', page, search || 'all', categories?.join('-') || 'all'),
  
  post: (slug: string) =>
    generateCacheKey('post', slug),
  
  categories: () =>
    generateCacheKey('categories'),
  
  category: (slug: string) =>
    generateCacheKey('category', slug),
  
  categoryPosts: (categoryId: number, page: number) =>
    generateCacheKey('category-posts', categoryId, page),
  
  workItems: (page: number, perPage: number = 6) =>
    generateCacheKey('work', page, perPage),
  
  workItem: (slug: string) =>
    generateCacheKey('work', slug),
  
  testimonials: () =>
    generateCacheKey('testimonials'),
  
  services: (perPage: number = 12) =>
    generateCacheKey('services', perPage),
  
  search: (query: string) =>
    generateCacheKey('search', query),
  
  featured: () =>
    generateCacheKey('featured'),
} as const

/**
 * Cache wrapper for data fetching
 */
export async function withCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = CACHE_TTL.POSTS
): Promise<T> {
  // Try to get from cache first
  const cached = await getFromCache<T>(key)
  if (cached) {
    return cached
  }

  // Fetch data
  const data = await fetchFn()

  // Store in cache
  await setInCache(key, data, ttl)

  return data
}

/**
 * Check if Redis is available
 */
export function isRedisAvailable(): boolean {
  return redis !== null && !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

export { CACHE_TTL }
