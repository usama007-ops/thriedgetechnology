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
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Back Button */}
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
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
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-lg text-muted-foreground max-w-2xl">
                {category.description}
              </p>
            )}
            <p className="text-accent font-semibold">
              {category.count} {category.count === 1 ? 'Article' : 'Articles'}
            </p>
          </div>
        </section>
      )}

      {/* Posts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader size={32} className="text-accent animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
              <p className="text-destructive font-semibold mb-2">Failed to load posts</p>
              <p className="text-muted-foreground text-sm">{error.message}</p>
            </div>
          )}

          {/* Posts Grid */}
          {!isLoading && posts && posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-4 pt-8 border-t border-border">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-card hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <span className="text-muted-foreground">
                  Page {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={posts.length < 10}
                  className="px-4 py-2 rounded-lg bg-card hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            !isLoading && (
              <div className="text-center py-20 text-muted-foreground">
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
