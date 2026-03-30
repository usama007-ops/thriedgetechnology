/**
 * WordPress API Client for Thrill Edge Technologies
 * Handles all communication with WordPress REST API and ACF fields
 */

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://admin.thrilledge.com'
const API_URL = `${WORDPRESS_URL}/wp-json`

// Debug logging for configuration verification
if (typeof window === 'undefined') {
  console.log('[v0] WordPress API URL:', API_URL)
  console.log('[v0] WordPress URL from env:', process.env.NEXT_PUBLIC_WORDPRESS_URL)
}

interface RequestOptions extends RequestInit {
  cache?: RequestCache
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchFromWordPress<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      cache: options.cache || 'no-store',
    })

    if (!response.ok) {
      console.error(`[WordPress API Error] ${response.status}: ${response.statusText} - ${url}`)
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`)
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    console.error(`[WordPress API Error] ${error instanceof Error ? error.message : 'Unknown error'}`)
    throw error
  }
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

  return fetchFromWordPress<Post[]>(endpoint)
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
  return fetchFromWordPress<Category[]>(`/wp/v2/categories?per_page=100`)
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
  return fetchFromWordPress<Post[]>(
    `/wp/v2/posts?categories=${categoryId}&page=${page}&per_page=${per_page}&_embed&orderby=date&order=desc`
  )
}

/**
 * Custom Post Types - Work/Portfolio
 */
export async function getWorkItems(
  page: number = 1,
  per_page: number = 6
): Promise<WorkItem[]> {
  return fetchFromWordPress<WorkItem[]>(
    `/wp/v2/work?page=${page}&per_page=${per_page}&_embed&acf_format=standard&orderby=date&order=desc`
  )
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
  return fetchFromWordPress<Testimonial[]>(
    `/wp/v2/testimonial?per_page=${per_page}&acf_format=standard&orderby=date&order=desc`
  )
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
  return fetchFromWordPress<Service[]>(
    `/wp/v2/service?per_page=${per_page}&_embed&acf_format=standard&orderby=date&order=asc`
  )
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
    let hasMore = true

    while (hasMore) {
      const posts = await fetchFromWordPress<Post[]>(
        `/wp/v2/posts?page=${page}&per_page=100&orderby=date&order=desc`
      )
      if (posts.length === 0) {
        hasMore = false
      } else {
        allPosts.push(...posts)
        page++
      }
    }

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
    let hasMore = true

    while (hasMore) {
      const items = await fetchFromWordPress<WorkItem[]>(
        `/wp/v2/work?page=${page}&per_page=100`
      )
      if (items.length === 0) {
        hasMore = false
      } else {
        allItems.push(...items)
        page++
      }
    }

    return allItems.map(item => item.slug)
  } catch {
    return []
  }
}
