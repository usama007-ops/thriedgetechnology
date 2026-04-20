import { MetadataRoute } from 'next'
import { getAllPostSlugs, getAllCategorySlugs, getAllWorkSlugs, getJobs } from '@/lib/wordpress'

const BASE = 'https://thrilledge.com'

const SERVICE_SLUGS = [
  'ai-and-ml-solutions',
  'custom-web-development',
  'ui-ux-design',
  'mobile-app-development',
  'mvp-product-strategy',
  'saas-solutions',
  'shopify-plus-agency',
]

const INDUSTRY_SLUGS = [
  'healthcare',
  'education',
  'real-estate',
  'blockchain',
  'fintech',
  'logistics',
]

const TECHNOLOGY_SLUGS = [
  'ai-machine-learning',
  'frontend-development',
  'backend-development',
  'mobile-development',
  'databases',
  'devops',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                    lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/about`,                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/work`,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/blog`,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/careers`,                       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/contact`,                       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE}/client-reviews`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/faqs`,                          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/categories`,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${BASE}/project-cost-estimation`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy-policy`,                lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms-condition`,               lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms-of-service`,              lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    // Services
    ...SERVICE_SLUGS.map(slug => ({
      url: `${BASE}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Industries
    ...INDUSTRY_SLUGS.map(slug => ({
      url: `${BASE}/industries/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Technologies
    ...TECHNOLOGY_SLUGS.map(slug => ({
      url: `${BASE}/technologies/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  try {
    const [postSlugs, categorySlugs, workSlugs, jobs] = await Promise.all([
      getAllPostSlugs(),
      getAllCategorySlugs(),
      getAllWorkSlugs(),
      getJobs().catch(() => []),
    ])

    return [
      ...staticRoutes,
      ...postSlugs.map(slug => ({
        url: `${BASE}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
      ...categorySlugs.map(slug => ({
        url: `${BASE}/categories/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
      ...workSlugs.map(slug => ({
        url: `${BASE}/work/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      ...jobs.map(job => ({
        url: `${BASE}/careers/${job.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ]
  } catch (error) {
    console.error('[Sitemap Error]', error)
    return staticRoutes
  }
}
