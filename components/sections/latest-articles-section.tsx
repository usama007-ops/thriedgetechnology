import { getPosts } from '@/lib/wordpress'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'

function readingTime(html: string) {
  const words = html.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min${mins > 1 ? 's' : ''}`
}

interface LatestArticlesSectionProps {
  show?: number
  categories?: number[]  // WP category IDs to filter by
}

export async function LatestArticlesSection({ show = 3, categories }: LatestArticlesSectionProps) {
  const posts = await getPosts(1, show, undefined, categories).catch(() => [])

  if (!posts.length) return null

  return (
    <section className="w-full flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex flex-col items-center gap-[40px] lg:py-[96px] py-[64px] lg:px-[36px] px-[16px]">

        {/* Heading */}
        <h2 className="text-black font-mont lg:text-[64px] text-[32px] lg:font-bold font-semibold lg:leading-[64px] leading-[38px] text-start w-full">
          Latest articles
        </h2>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {posts.map((post) => {
            const img = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
            const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 140)
            const time = readingTime(post.content.rendered)

            return (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="flex flex-col h-full group cursor-pointer">
                  {/* Image */}
                  <div className="relative w-full aspect-[2/1] rounded-[16px] overflow-hidden bg-[#f2f2f2]">
                    {img ? (
                      <Image
                        src={img}
                        alt={post.title.rendered}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#e5e5e5]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-[10px] pt-[16px] flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-[8px] flex-wrap">
                      <span className="text-[12px] font-inter font-medium text-[#555] bg-[#F0EFED] px-[10px] py-[4px] rounded-full tracking-wide uppercase">
                        Article
                      </span>
                      <span className="flex items-center gap-[4px] text-[13px] font-inter text-[#929296]">
                        <Clock size={13} />
                        {time}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[20px] lg:text-[22px] font-mont font-semibold leading-[28px] lg:leading-[30px] text-black group-hover:text-black/70 transition-colors duration-300 line-clamp-3">
                      {post.title.rendered}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[14px] font-inter text-[#71717A] leading-[22px] line-clamp-2 mt-auto">
                      {excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* View all */}
        <Link
          href="/blog"
          className="flex items-center justify-center gap-1 px-[24px] pt-[14px] pb-[12px] rounded-full border border-black text-black font-mont text-[14px] font-semibold hover:scale-105 transition-all duration-300 ease-in-out"
        >
          View all articles
        </Link>

      </div>
    </section>
  )
}
