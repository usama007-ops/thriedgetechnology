/**
 * Dynamic Sitemap Generator
 * Generates sitemap.xml for SEO
 */

import { MetadataRoute } from 'next'
import { getAllPostSlugs, getAllCategorySlugs, getAllWorkSlugs } from '@/lib/wordpress'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thrilledge.com'
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  try {
    // Dynamic post routes
    const postSlugs = await getAllPostSlugs()
    const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Dynamic category routes
    const categorySlugs = await getAllCategorySlugs()
    const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
      url: `${baseUrl}/categories/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    // Dynamic work routes
    const workSlugs = await getAllWorkSlugs()
    const workRoutes: MetadataRoute.Sitemap = workSlugs.map((slug) => ({
      url: `${baseUrl}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...workRoutes]
  } catch (error) {
    console.error('[Sitemap Error]', error)
    // Return only static routes if dynamic routes fail
    return staticRoutes
  }
}
