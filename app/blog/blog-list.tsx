/**
 * BlogList — Client Component
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
        <div className="mb-12 flex flex-wrap gap-2">
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
          {categories.map((cat) => (
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
        <div className="flex items-center justify-center py-20">
          <Loader size={32} className="text-accent animate-spin" />
        </div>
      )}

      {!loading && posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>

          <div className="flex items-center justify-center gap-4 pt-8 border-t border-border">
            <button
              onClick={() => fetchPosts(currentPage - 1, selectedCategory)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-card hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <span className="text-muted-foreground">Page {currentPage}</span>
            <button
              onClick={() => fetchPosts(currentPage + 1, selectedCategory)}
              disabled={posts.length < 12}
              className="px-4 py-2 rounded-lg bg-card hover:bg-card/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p>No posts found.</p>
        </div>
      )}
    </>
  )
}
