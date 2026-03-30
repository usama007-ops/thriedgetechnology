/**
 * Single Blog Post Page
 * Displays full blog post with metadata and related posts
 */

'use client'

import { ImageWrapper } from '@/components/common/image-wrapper'
import { BlogCard } from '@/components/common/blog-card'
import { usePost, usePosts } from '@/hooks/use-posts'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Loader } from 'lucide-react'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export default function PostPage({ params }: PostPageProps) {
  const { slug } = React.use(params)
  const { data: post, isLoading, error } = usePost(slug)
  const { data: relatedPosts } = usePosts({ page: 1, per_page: 3 })

  if (error) {
    notFound()
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="flex items-center justify-center py-40">
          <Loader size={32} className="text-accent animate-spin" />
        </div>
      </main>
    )
  }

  if (!post) {
    notFound()
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const publishDate = new Date(post.date)

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* Back Button */}
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Post Content */}
      <article className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="space-y-6 mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              {post.title.rendered}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <time>{format(publishDate, 'MMMM dd, yyyy')}</time>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>By Thrill Edge</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.ceil(post.content.rendered.length / 1000)} min read
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {featuredImage && (
            <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden mb-12 shadow-card">
              <ImageWrapper
                src={featuredImage}
                alt={post.title.rendered}
                fill
                priority
              />
            </div>
          )}

          {/* Post Content */}
          <div className="prose prose-invert max-w-none space-y-6 mb-16">
            <div
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              className="text-foreground space-y-4"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-border py-12" />

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground">
                Related <span className="text-accent">Articles</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.slice(0, 3).map((relatedPost) => (
                  relatedPost.id !== post.id && (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  )
}

import React from 'react'
