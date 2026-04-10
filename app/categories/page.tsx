/**
 * Categories Listing Page
 * Displays all blog categories
 */

'use client'

import { Header } from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { useCategories } from '@/hooks/use-posts'
import { ShadowCard } from '@/components/common/shadow-card'
import { ArrowRight, Loader } from 'lucide-react'
import Link from 'next/link'
import { decodeHtml } from '@/lib/utils'

export default function CategoriesPage() {
  const { data: categories, isLoading, error } = useCategories()

  return (
    <main className="bg-background min-h-screen text-foreground">
      <Header />
      
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-40 pb-16">
        <div className="space-y-6 mx-auto max-w-4xl text-center">
          <h1 className="font-bold text-foreground text-5xl md:text-6xl">
            Blog <span className="text-accent">Categories</span>
          </h1>
          <p className="text-muted-foreground text-xl">
            Browse articles by topic and find the content you&apos;re looking for
          </p>
        </div>
      </section>

      {/* Categories Grid */}
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
              <p className="mb-2 font-semibold text-destructive">Failed to load categories</p>
              <p className="text-muted-foreground text-sm">{error.message}</p>
            </div>
          )}

          {/* Categories Grid */}
          {!isLoading && categories && categories.length > 0 ? (
            <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                >
                  <ShadowCard className="h-full" hover>
                    <div className="space-y-4">
                      {/* Category Icon */}
                      <div className="flex justify-center items-center bg-accent/20 rounded-lg w-16 h-16">
                        <span className="text-accent text-3xl">
                          {decodeHtml(category.name).charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* Category Name */}
                      <h3 className="font-bold text-foreground group-hover:text-accent text-2xl transition-colors">
                        {decodeHtml(category.name)}
                      </h3>

                      {/* Description */}
                      {category.description && (
                        <p className="text-muted-foreground">
                          {category.description}
                        </p>
                      )}

                      {/* Post Count */}
                      <div className="pt-4 border-border/50 border-t">
                        <p className="font-semibold text-accent">
                          {category.count} {category.count === 1 ? 'Article' : 'Articles'}
                        </p>
                      </div>

                      {/* Link */}
                      <div className="flex items-center gap-2 pt-2 text-accent transition-transform group-hover:translate-x-1">
                        <span className="font-semibold text-sm">View Category</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </ShadowCard>
                </Link>
              ))}
            </div>
          ) : (
            !isLoading && (
              <div className="py-20 text-muted-foreground text-center">
                <p>No categories available.</p>
              </div>
            )
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
