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

export default function CategoriesPage() {
  const { data: categories, isLoading, error } = useCategories()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero */}
      <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Blog <span className="text-accent">Categories</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse articles by topic and find the content you&apos;re looking for
          </p>
        </div>
      </section>

      {/* Categories Grid */}
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
              <p className="text-destructive font-semibold mb-2">Failed to load categories</p>
              <p className="text-muted-foreground text-sm">{error.message}</p>
            </div>
          )}

          {/* Categories Grid */}
          {!isLoading && categories && categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                >
                  <ShadowCard className="h-full" hover>
                    <div className="space-y-4">
                      {/* Category Icon */}
                      <div className="w-16 h-16 rounded-lg bg-accent/20 flex items-center justify-center">
                        <span className="text-3xl text-accent">
                          {category.name.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* Category Name */}
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {category.name}
                      </h3>

                      {/* Description */}
                      {category.description && (
                        <p className="text-muted-foreground">
                          {category.description}
                        </p>
                      )}

                      {/* Post Count */}
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-accent font-semibold">
                          {category.count} {category.count === 1 ? 'Article' : 'Articles'}
                        </p>
                      </div>

                      {/* Link */}
                      <div className="pt-2 flex items-center gap-2 text-accent group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-semibold">View Category</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </ShadowCard>
                </Link>
              ))}
            </div>
          ) : (
            !isLoading && (
              <div className="text-center py-20 text-muted-foreground">
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
