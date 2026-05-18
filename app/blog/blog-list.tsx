/**
 * BlogListClient Component
 * Handles category filtering + pagination after initial SSR load
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { BlogCard } from '@/components/common/blog-card'
import { getPosts } from '@/lib/wordpress'
import type { Post, Category } from '@/lib/wordpress'
import { Loader, ChevronDown, Check } from 'lucide-react'
import { decodeHtml } from '@/lib/utils'
import { Animate } from '@/components/common/animate'

interface Props {
  initialPosts: Post[]
  categories: Category[]
}

export function BlogList({ initialPosts, categories }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const visibleCats = categories.filter(cat => cat.count > 0)

  const selectedLabel = selectedCategory === null
    ? 'All Categories'
    : decodeHtml(visibleCats.find(c => c.id === selectedCategory)?.name ?? 'All Categories')

  // close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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
    setDropdownOpen(false)
    fetchPosts(1, id)
  }

  const btnBase = 'px-4 py-2 rounded-full text-sm font-medium transition-all'
  const btnActive = 'bg-black text-white'
  const btnInactive = 'bg-card border border-border text-foreground hover:bg-muted'

  return (
    <>
      {/* Category filter */}
      {visibleCats.length > 0 && (
        <div className="mb-12">

          {/* ── Mobile: dropdown ── */}
          <div className="sm:hidden relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(v => !v)}
              className="w-full flex items-center justify-between px-5 py-4 bg-white border border-[#e5e5e5] rounded-2xl text-[15px] font-semibold text-[#111212] shadow-sm"
            >
              <span>{selectedLabel}</span>
              <ChevronDown
                size={18}
                className={`text-[#111212] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown list */}
            {dropdownOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-white border border-[#e5e5e5] rounded-2xl shadow-lg overflow-hidden">
                {/* All option */}
                <button
                  onClick={() => handleCategory(null)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-[14px] font-medium text-[#111212] hover:bg-[#f5f5f5] transition-colors"
                >
                  <span>All Categories</span>
                  {selectedCategory === null && <Check size={15} className="text-black" />}
                </button>

                <div className="h-px bg-[#f0f0f0] mx-4" />

                {visibleCats.map((cat, i) => (
                  <div key={cat.id}>
                    <button
                      onClick={() => handleCategory(cat.id)}
                      className="w-full flex items-center justify-between px-5 py-3.5 text-[14px] font-medium text-[#111212] hover:bg-[#f5f5f5] transition-colors"
                    >
                      <span>{decodeHtml(cat.name)}</span>
                      {selectedCategory === cat.id && <Check size={15} className="text-black" />}
                    </button>
                    {i < visibleCats.length - 1 && <div className="h-px bg-[#f0f0f0] mx-4" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Desktop: pill buttons ── */}
          <div className="hidden sm:flex flex-wrap gap-2">
            <button
              onClick={() => handleCategory(null)}
              className={`${btnBase} ${selectedCategory === null ? btnActive : btnInactive}`}
            >
              All Posts
            </button>
            {visibleCats.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id)}
                className={`${btnBase} ${selectedCategory === cat.id ? btnActive : btnInactive}`}
              >
                {decodeHtml(cat.name)}
              </button>
            ))}
          </div>
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
            {posts.map((post, idx) => (
              <Animate key={post.id} variant="fade-up" delay={idx * 80}>
                <BlogCard post={post} priority={idx === 0} />
              </Animate>
            ))}
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
