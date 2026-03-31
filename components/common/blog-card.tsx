import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/wordpress'
import { format } from 'date-fns'

interface BlogCardProps {
  post: Post
  featured?: boolean
  priority?: boolean
}

export function BlogCard({ post, featured = false, priority = false }: BlogCardProps) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const publishDate = new Date(post.date)
  const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150).concat('...')

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer h-full">
        <div className={`relative overflow-hidden rounded-lg mb-4 ${featured ? 'h-96' : 'h-48'} bg-card shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1`}>
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={post.title.rendered}
              fill
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <Image
              src="/placeholder.png"
              alt={post.title.rendered}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="space-y-2">
          <time className="text-xs text-muted-foreground">{format(publishDate, 'MMM dd, yyyy')}</time>
          <h3 className={`text-foreground group-hover:text-accent transition-colors duration-300 ${featured ? 'text-xl font-bold' : 'text-lg font-semibold'}`}>
            {post.title.rendered}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
          <div className="pt-2">
            <span className="text-xs text-accent group-hover:text-primary transition-colors">Read more →</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
