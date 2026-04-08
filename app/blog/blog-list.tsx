/**
 * BlogListClient Component
 * Handles category filtering + pagination after initial SSR load
 */

'use client'

import { useState } from 'react'
import { BlogCard } from '@/components/common/blog-card'
import { getPosts } from '@/lib/wordpress'
import type { Post, Category } from '@/lib/wordpress'
import { Loader } from 'lucide-react'

interface Props {
  initialPosts: Post[]
  categories: Category[]
}

export function BlogList({ initialPosts, categories }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  async function fetchPosts(page: number, categoryId: number | null) {
    setLoading(true)
    try {
      const data = await getPosts(page, 12, undefined, categoryId ? [categoryId] : undefined)
      setPosts(data)
      setCurrentPage(page)
    } finally {
      setLoading(false)
    }
  }

  function handleCategory(id: number | null) {
    setSelectedCategory(id)
    fetchPosts(1, id)
  }

  return (
    <>
      {/* Category filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => handleCategory(null)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === null
                ? 'bg-accent text-accent-foreground'
                : 'bg-card border border-border text-foreground hover:bg-card/80'
            }`}
          >
            All Posts
          </button>
          {categories.filter((cat) => cat.count > 0).map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === cat.id
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card border border-border text-foreground hover:bg-card/80'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader size={32} className="text-accent animate-spin" />
        </div>
      )}

      {!loading && posts.length > 0 && (
        <>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {posts.map((post, idx) => <BlogCard key={post.id} post={post} priority={idx === 0} />)}
          </div>

          <div className="flex justify-center items-center gap-4 pt-8 border-border border-t">
            <button
              onClick={() => fetchPosts(currentPage - 1, selectedCategory)}
              disabled={currentPage === 1}
              className="bg-card hover:bg-card/80 disabled:opacity-50 px-4 py-2 rounded-lg transition-all disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-muted-foreground">Page {currentPage}</span>
            <button
              onClick={() => fetchPosts(currentPage + 1, selectedCategory)}
              disabled={posts.length < 12}
              className="bg-card hover:bg-card/80 disabled:opacity-50 px-4 py-2 rounded-lg transition-all disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}

      {!loading && posts.length === 0 && (
        <div className="py-20 text-muted-foreground text-center">
          <p>No posts found.</p>
        </div>
      )}
    </>
  )
}
