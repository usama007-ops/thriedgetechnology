import { getPosts } from '@/lib/wordpress'
import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { Animate } from '@/components/common/animate'

function readingTime(html: string) {
  const words = html.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min${mins > 1 ? 's' : ''}`
}

interface LatestArticlesSectionProps {
  show?: number
  categories?: number[]
}

export async function LatestArticlesSection({ show = 3, categories }: LatestArticlesSectionProps) {
  const posts = await getPosts(1, show, undefined, categories).catch(() => [])
  if (!posts.length) return null

  return (
    <section className="w-full flex items-center justify-center bg-[#eee]">
      <div className="w-full max-w-[1440px] flex flex-col items-center gap-[40px] lg:py-[96px] py-[64px] lg:px-[36px] px-[16px]">

        {/* Heading */}
        <Animate variant="slide-left" className="w-full">
          <h2 className="text-black font-mont lg:text-[64px] text-[32px] lg:font-bold font-semibold lg:leading-[64px] leading-[38px] text-start w-full">
            Latest articles
          </h2>
        </Animate>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {posts.map((post, idx) => {
            const img = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
            const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 140)
            const time = readingTime(post.content.rendered)

            return (
              <Animate key={post.id} variant="fade-up" delay={idx * 120}>
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <article className="flex flex-col h-full group cursor-pointer bg-[#fff] rounded-[16px]">
                    {/* Image */}
                    <div className="relative w-full aspect-[2/1] rounded-[16px] overflow-hidden">
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
                    <div className="flex flex-col gap-[10px] pt-[16px] flex-1 p-5">
                      <div className="flex items-center gap-[8px] flex-wrap">
                        <span className="text-[12px] font-inter font-medium text-[#555] bg-[#F0EFED] px-[10px] py-[4px] rounded-full tracking-wide uppercase">
                          Article
                        </span>
                        <span className="flex items-center gap-[4px] text-[13px] font-inter text-[#929296]">
                          <Clock size={13} />
                          {time}
                        </span>
                      </div>
                      <h3 className="text-[20px] lg:text-[22px] font-mont font-semibold leading-[28px] lg:leading-[30px] text-black group-hover:text-black/70 transition-colors duration-300 line-clamp-3">
                        {post.title.rendered}
                      </h3>
                      <p className="text-[14px] font-inter text-[#71717A] leading-[22px] line-clamp-2 mt-auto">
                        {excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              </Animate>
            )
          })}
        </div>

        {/* View all */}
        <Animate variant="fade-up" delay={400}>
          <Link
            href="/blog"
            className="flex items-center justify-center gap-1 px-[24px] pt-[14px] pb-[12px] rounded-full border border-black text-black font-mont text-[14px] font-semibold hover:scale-105 transition-all duration-300 ease-in-out"
          >
            View all articles
          </Link>
        </Animate>

      </div>
    </section>
  )
}
