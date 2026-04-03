import { Metadata } from 'next'
import { getPosts, getCategories } from '@/lib/wordpress'
import { BlogList } from './blog-list'
import Image from 'next/image'
import { PageHero } from '@/components/common/page-hero'

export const metadata: Metadata = {
  title: 'Blog | Thrill Edge Technologies',
  description: 'Expert insights, tutorials, and industry updates from Thrill Edge Technologies.',
}

export default async function BlogPage() {
  const [initialPosts, categories] = await Promise.all([
    getPosts(1, 12).catch(() => []),
    getCategories().catch(() => []),
  ])

  // Preload the first post's image server-side for LCP
  const firstImg = initialPosts[0]?._embedded?.['wp:featuredmedia']?.[0]?.source_url

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hidden eager-loaded LCP image */}
      {firstImg && (
        <Image src={firstImg} alt="" fill={false} width={1} height={1}
          priority loading="eager" className="sr-only" sizes="1px" />
      )}

      <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">Latest Articles</h1>
          <p className="text-xl text-muted-foreground">
            Stay updated with the latest trends, tips, and insights from our team
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <BlogList initialPosts={initialPosts} categories={categories} />
        </div>
      </section>
    </main>
  )
}
