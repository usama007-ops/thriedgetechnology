/**
 * Category Posts Page
 * Displays all posts in a specific category
 */

'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { BlogCard } from '@/components/common/blog-card'
import { useCategories, usePostsByCategory } from '@/hooks/use-posts'
import { ArrowLeft, Loader } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { decodeHtml } from '@/lib/utils'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = React.use(params)
  const [currentPage, setCurrentPage] = useState(1)
  
  const { data: categories, isLoading: categoriesLoading } = useCategories()
  const category = categories?.find(c => c.slug === slug)
  
  const { data: posts, isLoading, error } = usePostsByCategory(category?.id || null, currentPage)

  if (!categoriesLoading && !category) {
    notFound()
  }

  return (
    <main className="bg-background min-h-screen text-foreground">
      <Header />
      
      {/* Back Button */}
      <section className="px-4 pt-32 pb-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Categories
          </Link>
        </div>
      </section>

      {/* Category Header */}
      {category && (
        <section className="px-4 sm:px-6 lg:px-8 py-12 border-border border-b">
          <div className="space-y-4 mx-auto max-w-6xl">
            <h1 className="font-bold text-foreground text-5xl md:text-6xl">
              {decodeHtml(category.name)}
            </h1>
            {category.description && (
              <p className="max-w-2xl text-muted-foreground text-lg">
                {category.description}
              </p>
            )}
            <p className="font-semibold text-accent">
              {category.count} {category.count === 1 ? 'Article' : 'Articles'}
            </p>
          </div>
        </section>
      )}

      {/* Posts Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader size={32} className="text-accent animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-destructive/10 p-6 border border-destructive/20 rounded-lg text-center">
              <p className="mb-2 font-semibold text-destructive">Failed to load posts</p>
              <p className="text-muted-foreground text-sm">{error.message}</p>
            </div>
          )}

          {/* Posts Grid */}
          {!isLoading && posts && posts.length > 0 ? (
            <>
              <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 pt-8 border-border border-t">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="bg-card hover:bg-card/80 disabled:opacity-50 px-4 py-2 rounded-lg transition-all disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-muted-foreground">
                  Page {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={posts.length < 10}
                  className="bg-card hover:bg-card/80 disabled:opacity-50 px-4 py-2 rounded-lg transition-all disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            !isLoading && (
              <div className="py-20 text-muted-foreground text-center">
                <p>No posts found in this category.</p>
              </div>
            )
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

import React from 'react'
