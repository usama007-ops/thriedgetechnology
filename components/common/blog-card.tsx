/**
 * Blog Card Component
 * Displays individual blog post preview
 */

import Link from 'next/link'
import { ImageWrapper } from './image-wrapper'
import { Post } from '@/lib/wordpress'
import { format } from 'date-fns'

interface BlogCardProps {
  post: Post
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const publishDate = new Date(post.date)
  const excerpt = post.excerpt.rendered
    .replace(/<[^>]*>/g, '')
    .substring(0, 150)
    .concat('...')

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer h-full">
        <div
          className={`
            relative overflow-hidden rounded-lg mb-4
            ${featured ? 'h-96' : 'h-48'}
            bg-card shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1
          `}
        >
          {featuredImage ? (
            <ImageWrapper
              src={featuredImage}
              alt={post.title.rendered}
              fill
              className="group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <span className="text-accent/50 text-sm">No image</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <time className="text-xs text-muted-foreground">
            {format(publishDate, 'MMM dd, yyyy')}
          </time>

          <h3 className={`
            text-foreground group-hover:text-accent transition-colors duration-300
            ${featured ? 'text-xl font-bold' : 'text-lg font-semibold'}
          `}>
            {post.title.rendered}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </p>

          <div className="pt-2">
            <span className="text-xs text-accent group-hover:text-primary transition-colors">
              Read more →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
