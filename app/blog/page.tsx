import { Metadata } from 'next'
import { getPosts, getCategories } from '@/lib/wordpress'
import { BlogList } from './blog-list'
import Image from 'next/image'
import { PageHero } from '@/components/common/page-hero'
import { cn } from "../../lib/utils";

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
    <main className={cn('bg-background', 'min-h-screen', 'text-foreground')}>
      {/* Hidden eager-loaded LCP image */}
      {firstImg && (
        <Image src={firstImg} alt="" fill={false} width={1} height={1}
          priority loading="eager" className="sr-only" sizes="1px" />
      )}

      {/* Hero */}
      <section className={cn('mx-auto', 'p-2', 'w-full')}>
        <div className={cn('relative', 'rounded-[20px]', 'w-full', 'h-[300px]', 'lg:h-[480px]', 'overflow-hidden')}>
          <Image src="/blog-hero.jpg" alt="Blog" fill className={cn('object-center', 'object-cover')} sizes="100vw" priority />
          <div className={cn('absolute', 'inset-0', 'rounded-[20px]')} style={{ background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.6), rgba(0,0,0,0))' }} />
          <div className={cn('right-0', 'bottom-0', 'left-0', 'absolute', 'flex', 'lg:flex-row', 'flex-col', 'justify-between', 'lg:items-end', 'gap-4', 'mx-auto', 'px-5', 'lg:px-9', 'py-6', 'lg:py-8', 'max-w-[1440px]')}>
            <h1 className={cn('max-w-2xl', 'font-mont', 'font-semibold', 'text-[32px]', 'text-white', 'lg:text-[56px]', 'leading-9', 'lg:leading-[60px]')}>
              Latest Articles
            </h1>
            <p className={cn('lg:max-w-xs', 'font-inter', 'text-[15px]', 'text-white/70', 'lg:text-[18px]', 'leading-7')}>
              Stay updated with the latest trends, tips, and insights from our team.
            </p>
          </div>
        </div>
      </section>

      <section className={cn('px-4', 'sm:px-6', 'lg:px-8', 'py-16')}>
        <div className={cn('mx-auto', 'max-w-6xl')}>
          <BlogList initialPosts={initialPosts} categories={categories} />
        </div>
      </section>
    </main>
  )
}
