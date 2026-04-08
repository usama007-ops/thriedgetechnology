/**
 * WordPress API Client for Thrill Edge Technologies
 * Handles all communication with WordPress REST API and ACF fields
 */

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://admin.thrilledge.com'
const API_URL = `${WORDPRESS_URL}/wp-json`

interface RequestOptions extends RequestInit {
  cache?: RequestCache
}

const TIMEOUT_MS = 20000   // 20s per attempt
const MAX_RETRIES = 3      // 3 attempts total

/** Sleep helper for backoff */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Core fetch with timeout + exponential backoff retry.
 * Retries on network errors and 5xx responses. Never retries 4xx.
 */
async function wpFetch(url: string, options: RequestOptions = {}): Promise<Response> {
  let lastError: unknown

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', ...options.headers },
        cache: options.cache || 'no-store',
      })
      clearTimeout(timer)

      // Don't retry client errors (4xx), they won't change
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }

      // Retry server errors (5xx)
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }

      return response
    } catch (error) {
      clearTimeout(timer)
      lastError = error

      const isAbort = error instanceof Error && error.name === 'AbortError'
      const isClientError = error instanceof Error && /^4\d\d:/.test(error.message)

      // Don't retry client errors or if it's the last attempt
      if (isClientError || attempt === MAX_RETRIES - 1) break

      const backoff = 300 * Math.pow(2, attempt) // 300ms, 600ms, 1200ms
      if (typeof window === 'undefined') {
        console.warn(
          `[WordPress API] ${isAbort ? 'Timeout' : 'Error'} on attempt ${attempt + 1}/${MAX_RETRIES}, ${url}, retrying in ${backoff}ms`
        )
      }
      await sleep(backoff)
    }
  }

  if (typeof window === 'undefined') {
    const msg = lastError instanceof Error ? lastError.message : String(lastError)
    console.error(`[WordPress API Error] ${url}, ${msg}`)
  }
  throw lastError
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchFromWordPress<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const response = await wpFetch(`${API_URL}${endpoint}`, options)
  return response.json() as Promise<T>
}

/**
 * Fetch wrapper that also returns X-WP-TotalPages header.
 * Use this for paginated list endpoints to avoid requesting beyond the last page.
 */
async function fetchPagedFromWordPress<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<{ data: T; totalPages: number }> {
  const response = await wpFetch(`${API_URL}${endpoint}`, options)
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10)
  const data = await response.json() as T
  return { data, totalPages }
}

/**
 * Post Types
 */
export interface Post {
  id: number
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  slug: string
  date: string
  modified: string
  featured_media: number
  author: number
  categories: number[]
  acf?: Record<string, any>
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text?: string
    }>
  }
}

export interface PostListResponse {
  posts: Post[]
  total: number
  pages: number
}

/**
 * Work/Portfolio Item
 */
export interface WorkAcfImageField {
  url: string
  alt: string
  width: number
  height: number
}

export interface WorkAcfSectionWithImage {
  text: string
  image: WorkAcfImageField
}

export interface WorkItem {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  slug: string
  featured_media: number
  acf?: {
    year?: string
    services?: string
    industry?: string
    review?: number | number[]
    long_title?: string
    challenge?: string
    approach?: WorkAcfSectionWithImage
    design_process?: WorkAcfSectionWithImage
    development?: string
    launch?: WorkAcfSectionWithImage
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text?: string
    }>
  }
}

/**
 * Testimonial
 */
export interface Testimonial {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  acf?: {
    author_name?: string
    author_title?: string
    author_company?: string
    rating?: number
  }
}

/**
 * Service
 */
export interface ServiceCountItem {
  number: string
  label: string
}

export interface aboutUsItem {
  title: string
  text: string
}
export interface ServiceHowWeWorkStep {
  label: string
  text: string
}

export interface ServiceCorePoint {
  label: string
  text: string
}

export interface ServiceRelatedProject {
  ID: number
  post_title: string
  post_name: string
}

export interface Service {
  id: number
  title: { rendered: string }
  slug: string
  featured_media: number
  acf?: {
    service_solutions?: string
    projects?: ServiceRelatedProject[]
    service_count?: {
      count_1?: ServiceCountItem
      count_2?: ServiceCountItem
      count_3?: ServiceCountItem
    }
    about_us?: {
      title?: string
      text?: string
    }

    image?: WorkAcfImageField
    how_we_work?: {
      '01'?: ServiceHowWeWorkStep
      '02'?: ServiceHowWeWorkStep
      '03'?: ServiceHowWeWorkStep
      '04'?: ServiceHowWeWorkStep
      '05'?: ServiceHowWeWorkStep
      '06'?: ServiceHowWeWorkStep
    }
    our_core_title?: string
    our_core_points?: {
      '01'?: ServiceCorePoint
      '02'?: ServiceCorePoint
      '03'?: ServiceCorePoint
      '04'?: ServiceCorePoint
      '05'?: ServiceCorePoint
      '06'?: ServiceCorePoint
    }
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text?: string
    }>
  }
}

/**
 * Category
 */
export interface Category {
  id: number
  name: string
  slug: string
  description: string
  count: number
}

/**
 * Blog Posts API
 */
export async function getPosts(
  page: number = 1,
  per_page: number = 10,
  search?: string,
  categories?: number[]
): Promise<Post[]> {
  let endpoint = `/wp/v2/posts?page=${page}&per_page=${per_page}&_embed&orderby=date&order=desc`

  if (search) {
    endpoint += `&search=${encodeURIComponent(search)}`
  }

  if (categories && categories.length > 0) {
    endpoint += `&categories=${categories.join(',')}`
  }

  try {
    return await fetchFromWordPress<Post[]>(endpoint)
  } catch {
    return []
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const posts = await fetchFromWordPress<Post[]>(
      `/wp/v2/posts?slug=${slug}&_embed`
    )
    return posts.length > 0 ? posts[0] : null
  } catch (error) {
    console.error(`[Error] Failed to fetch post ${slug}:`, error)
    return null
  }
}

export async function getPostCount(): Promise<number> {
  try {
    const response = await fetch(`${API_URL}/wp/v2/posts?per_page=1`, {
      method: 'HEAD',
    })
    const total = response.headers.get('X-WP-Total')
    return total ? parseInt(total, 10) : 0
  } catch {
    return 0
  }
}

/**
 * Categories API
 */
export async function getCategories(): Promise<Category[]> {
  try {
    return await fetchFromWordPress<Category[]>(`/wp/v2/categories?per_page=100`)
  } catch {
    return []
  }
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const categories = await fetchFromWordPress<Category[]>(
      `/wp/v2/categories?slug=${slug}`
    )
    return categories.length > 0 ? categories[0] : null
  } catch {
    return null
  }
}

export async function getPostsByCategory(
  categoryId: number,
  page: number = 1,
  per_page: number = 10
): Promise<Post[]> {
  try {
    return await fetchFromWordPress<Post[]>(
      `/wp/v2/posts?categories=${categoryId}&page=${page}&per_page=${per_page}&_embed&orderby=date&order=desc`
    )
  } catch {
    return []
  }
}

/**
 * Custom Post Types - Work/Portfolio
 */
export async function getWorkItems(
  page: number = 1,
  per_page: number = 6
): Promise<WorkItem[]> {
  try {
    return await fetchFromWordPress<WorkItem[]>(
      `/wp/v2/work?page=${page}&per_page=${per_page}&_embed&acf_format=standard&orderby=date&order=desc`
    )
  } catch {
    return []
  }
}

export async function getWorkItem(slug: string): Promise<WorkItem | null> {
  try {
    const items = await fetchFromWordPress<WorkItem[]>(
      `/wp/v2/work?slug=${slug}&_embed&acf_format=standard`
    )
    return items.length > 0 ? items[0] : null
  } catch {
    return null
  }
}

export async function getAdjacentWorkItems(currentId: number): Promise<{ prev: WorkItem | null; next: WorkItem | null }> {
  try {
    const all = await fetchFromWordPress<WorkItem[]>(`/wp/v2/work?per_page=100&orderby=date&order=desc`)
    const idx = all.findIndex(i => i.id === currentId)
    return {
      prev: idx > 0 ? all[idx - 1] : null,
      next: idx < all.length - 1 ? all[idx + 1] : null,
    }
  } catch {
    return { prev: null, next: null }
  }
}

/**
 * Custom Post Types - Testimonials
 */
export async function getTestimonials(
  per_page: number = 12
): Promise<Testimonial[]> {
  try {
    return await fetchFromWordPress<Testimonial[]>(
      `/wp/v2/testimonial?per_page=${per_page}&acf_format=standard&orderby=date&order=desc`
    )
  } catch {
    return []
  }
}

export async function getTestimonial(id: number): Promise<Testimonial | null> {
  try {
    return await fetchFromWordPress<Testimonial>(`/wp/v2/testimonial/${id}?acf_format=standard`)
  } catch {
    return null
  }
}

/**
 * Custom Post Types - Services
 */
export async function getServices(
  per_page: number = 12
): Promise<Service[]> {
  try {
    return await fetchFromWordPress<Service[]>(
      `/wp/v2/service?per_page=${per_page}&_embed&acf_format=standard&orderby=date&order=asc`
    )
  } catch {
    return []
  }
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    const items = await fetchFromWordPress<Service[]>(
      `/wp/v2/service?slug=${slug}&_embed&acf_format=standard`
    )
    return items.length > 0 ? items[0] : null
  } catch {
    return null
  }
}

/**
 * Author
 */
export interface Author {
  id: number
  name: string
  description: string
  slug: string
  designation?: string
  avatar_urls: { '24': string; '48': string; '96': string }
  link: string
}

export async function getAuthor(id: number): Promise<Author | null> {
  try {
    return await fetchFromWordPress<Author>(`/wp/v2/users/${id}`)
  } catch {
    return null
  }
}

/**
 * Jobs / Careers
 */
export interface Job {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  slug: string
  acf?: {
    position?: string
    type?: 'onsite' | 'hybrid' | 'remote'
  }
  department?: Array<{ id: number; name: string; slug: string }>
}

export async function getJobs(per_page = 100): Promise<Job[]> {
  try {
    return await fetchFromWordPress<Job[]>(
      `/wp/v2/job?per_page=${per_page}&acf_format=standard&_embed&orderby=date&order=desc`
    )
  } catch {
    return []
  }
}

export async function getJob(slug: string): Promise<Job | null> {
  try {
    const items = await fetchFromWordPress<Job[]>(
      `/wp/v2/job?slug=${slug}&acf_format=standard&_embed`
    )
    return items.length > 0 ? items[0] : null
  } catch {
    return null
  }
}

/**
 * Media API - Get featured image URL
 */
export async function getFeaturedImageUrl(mediaId: number): Promise<string | null> {
  try {
    if (!mediaId) return null
    const media = await fetchFromWordPress<{ source_url: string }>(
      `/wp/v2/media/${mediaId}`
    )
    return media.source_url
  } catch {
    return null
  }
}

/**
 * Search API
 */
export async function searchContent(
  query: string,
  types: string[] = ['posts', 'pages']
): Promise<any[]> {
  const typeQuery = types.map(t => `&type=${t}`).join('')
  return fetchFromWordPress<any[]>(
    `/wp/v2/search?search=${encodeURIComponent(query)}${typeQuery}&per_page=20`
  )
}

/**
 * Sitemap data - Get all posts and pages for sitemap
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const allPosts: Post[] = []
    let page = 1
    let totalPages = 1

    do {
      const { data, totalPages: tp } = await fetchPagedFromWordPress<Post[]>(
        `/wp/v2/posts?page=${page}&per_page=100&orderby=date&order=desc`
      )
      totalPages = tp
      allPosts.push(...data)
      page++
    } while (page <= totalPages)

    return allPosts.map(post => post.slug)
  } catch (error) {
    console.error('[Sitemap] Error fetching post slugs:', error)
    return []
  }
}

export async function getAllCategorySlugs(): Promise<string[]> {
  try {
    const categories = await getCategories()
    return categories.map(cat => cat.slug)
  } catch {
    return []
  }
}

export async function getAllWorkSlugs(): Promise<string[]> {
  try {
    const allItems: WorkItem[] = []
    let page = 1
    let totalPages = 1

    do {
      const { data, totalPages: tp } = await fetchPagedFromWordPress<WorkItem[]>(
        `/wp/v2/work?page=${page}&per_page=100`
      )
      totalPages = tp
      allItems.push(...data)
      page++
    } while (page <= totalPages)

    return allItems.map(item => item.slug)
  } catch {
    return []
  }
}
