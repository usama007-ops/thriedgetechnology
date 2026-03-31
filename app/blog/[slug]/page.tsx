'use client'

import React, { useEffect, useState } from 'react'
import { usePost, usePosts } from '@/hooks/use-posts'
import { useQuery } from '@tanstack/react-query'
import { getAuthor } from '@/lib/wordpress'
import { Loader, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

function readingTime(html: string) {
  const words = html.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min${mins > 1 ? 's' : ''}`
}

// Extract h2 headings from HTML for TOC
function extractHeadings(html: string): { id: string; text: string }[] {
  const matches = [...html.matchAll(/<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/gi)]
  return matches.map(m => ({
    id: m[1],
    text: m[2].replace(/<[^>]*>/g, ''),
  }))
}

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const copy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-[8px] flex-wrap ">
      <p className="text-[11px] font-inter font-semibold text-[#929296] uppercase tracking-widest w-full mb-[4px]">Share</p>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer" aria-label="Share on X"
        className="flex items-center gap-[6px] text-[12px] font-inter text-[#555] border border-[#E5E4E0] px-[10px] py-[6px] rounded-full hover:border-black hover:text-black transition-colors duration-200">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        X
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"
        className="flex items-center gap-[6px] text-[12px] font-inter text-[#555] border border-[#E5E4E0] px-[10px] py-[6px] rounded-full hover:border-black hover:text-black transition-colors duration-200">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
        LinkedIn
      </a>
      <button onClick={copy} aria-label="Copy link"
        className="flex items-center gap-[6px] text-[12px] font-inter text-[#555] border border-[#E5E4E0] px-[10px] py-[6px] rounded-full hover:border-black hover:text-black transition-colors duration-200">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}

function PostPage({ params }: PostPageProps) {
  const { slug } = React.use(params)
  const { data: post, isLoading, error } = usePost(slug)
  const { data: relatedPosts } = usePosts({ page: 1, per_page: 4 })

  const { data: author } = useQuery({
    queryKey: ['author', post?.author],
    queryFn: () => getAuthor(post!.author),
    enabled: !!post?.author,
  })

  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) }),
      { rootMargin: '-20% 0px -70% 0px' }
    )
    document.querySelectorAll('.blog-content h2[id]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [post])

  if (error) notFound()
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader size={32} className="animate-spin text-black" />
    </div>
  )
  if (!post) notFound()

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const publishDate = new Date(post.date)
  const time = readingTime(post.content.rendered)
  const headings = extractHeadings(post.content.rendered)
  const others = relatedPosts?.filter(p => p.id !== post.id).slice(0, 3) ?? []

  return (
    <div className="relative bg-white">

      {/* Hero banner */}
      <section className="max-w-[1440px] w-full mx-auto md:px-[24px] px-[16px]">
        <div className="pt-[16px] pb-[20px]">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-[6px] flex-wrap font-inter text-[13px] text-[#929296]">
              <li><Link href="/blog" className="hover:text-black transition-colors duration-200">Blog</Link></li>
              <li aria-hidden="true" className="select-none">›</li>
              <li aria-current="page" className="text-black font-medium line-clamp-1 max-w-[300px] sm:max-w-[500px]"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </ol>
          </nav>
        </div>

        <div className="relative w-full rounded-[24px] overflow-hidden min-h-[480px] md:min-h-[560px] lg:min-h-[620px]">
          {featuredImage && (
            <Image src={featuredImage} alt={post.title.rendered} fill priority
              sizes="100vw" className="object-cover object-center" />
          )}
          {!featuredImage && <div className="absolute inset-0 bg-[#111212]" />}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.4) 100%)' }} />
          <div className="absolute inset-0 flex flex-col justify-end p-[24px] md:p-[40px] lg:p-[56px]">
            <div className="flex items-center gap-[8px] flex-wrap mb-[14px]">
              <span className="text-[11px] font-inter font-semibold text-white/90 bg-white/15 backdrop-blur-sm border border-white/20 px-[10px] py-[4px] rounded-full tracking-wider uppercase">Article</span>
              <span className="flex items-center gap-[5px] text-[12px] font-inter text-white/65 bg-white/10 backdrop-blur-sm px-[10px] py-[4px] rounded-full">
                <Clock size={12} />{time}
              </span>
            </div>
            <h1 className="lg:text-[52px] lg:leading-[1.1] md:text-[40px] md:leading-[1.15] text-[30px] leading-[1.2] font-mont font-bold text-white max-w-[860px] mb-[16px]"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            {post.excerpt?.rendered && (
              <p className="lg:text-[17px] text-[15px] font-inter font-normal text-white/65 max-w-[680px] leading-[1.65] mb-[24px]"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.replace(/<[^>]*>/g, '') }} />
            )}
            <div className="flex items-center gap-[10px]">
              {author?.avatar_urls?.['48'] ? (
                <Image src={author.avatar_urls['48']} alt={author.name} width={38} height={38}
                  className="rounded-full object-cover w-[38px] h-[38px] shrink-0 ring-2 ring-white/25" />
              ) : (
                <div className="w-[38px] h-[38px] rounded-full bg-white/20 flex items-center justify-center text-white font-mont font-bold text-sm shrink-0">
                  {author?.name?.charAt(0) ?? 'T'}
                </div>
              )}
              <div className="flex flex-col gap-[2px]">
                <span className="text-[13px] font-mont font-semibold text-white leading-none">{author?.name ?? 'Thrill Edge'}</span>
                <span className="text-[12px] font-inter text-white/55 leading-none">
                  {author?.designation ? `${author.designation} · ` : ''}{format(publishDate, 'MMMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="max-w-[1440px] mx-auto md:px-[36px] px-[16px] md:py-[96px] py-[64px]">
        <div className="flex gap-[48px] items-start">
          <div className="flex-1 min-w-0 max-w-[72ch]">
            {headings.length > 0 && (
              <details className="lg:hidden mb-[32px] border border-[#E5E4E0] rounded-[8px] p-[16px]">
                <summary className="text-[13px] font-inter font-semibold text-black cursor-pointer list-none flex items-center justify-between">
                  Contents
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </summary>
                <nav className="mt-[12px]">
                  <ul className="flex flex-col gap-[8px]">
                    {headings.map(h => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="text-[13px] font-inter text-[#555] hover:text-black transition-colors duration-200 leading-[1.4]">{h.text}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </details>
            )}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            <div className="lg:hidden mt-[32px]"><ShareButtons title={post.title.rendered} /></div>
          </div>

          <aside className="hidden lg:block w-[300px] flex-shrink-0 sticky top-6" style={{ maxHeight: 'calc(100vh - 3rem)', overflowY: 'auto' }}>
            <div className="flex flex-col gap-[32px]">
              {headings.length > 0 && (
                <section>
                  <h2 className="text-[11px] font-inter font-semibold text-[#929296] uppercase tracking-widest mb-[12px]">On this page</h2>
                  <nav aria-label="Table of contents">
                    <ul className="flex flex-col gap-[4px]">
                      {headings.map(h => (
                        <li key={h.id}>
                          <a href={`#${h.id}`}
                            className={`block py-[4px] text-[13px] font-inter leading-[1.5] transition-colors duration-200 border-l-2 pl-[10px] ${activeId === h.id ? 'border-black text-black font-semibold' : 'border-transparent text-[#929296] hover:text-black hover:border-[#D4D3D0]'}`}>
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </section>
              )}
              <section className="relative rounded-[16px] p-[20px] flex flex-col gap-[14px] overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #111 0%, #1a1a2e 100%)' }}>
                <p className="text-[11px] font-inter font-semibold text-white/40 uppercase tracking-[0.12em]">Work with us</p>
                <p className="text-[15px] font-mont font-semibold text-white leading-[1.35]">Ready to scope your next project?</p>
                <Link href="/contact" className="inline-flex items-center gap-[7px] text-[12px] font-mont font-semibold text-black bg-white px-[14px] py-[8px] rounded-[8px] hover:bg-white/90 transition-colors duration-200 w-fit">
                  Book a Call <ArrowRight size={12} />
                </Link>
              </section>
              {others.length > 0 && (
                <section>
                  <h2 className="text-[11px] font-inter font-semibold text-[#929296] uppercase tracking-widest mb-[12px]">Related Articles</h2>
                  <ul className="flex flex-col gap-[12px]">
                    {others.map(p => {
                      const img = p._embedded?.['wp:featuredmedia']?.[0]?.source_url
                      return (
                        <li key={p.id}>
                          <Link href={`/blog/${p.slug}`} className="flex items-start gap-[10px] group">
                            <div className="relative w-[48px] h-[48px] shrink-0 rounded-[6px] overflow-hidden bg-[#f2f2f2]">
                              {img && <Image src={img} alt={p.title.rendered} fill sizes="48px" className="object-cover" />}
                            </div>
                            <span className="text-[12px] font-inter text-[#555] line-clamp-2 group-hover:text-black transition-colors duration-200 leading-[1.5]"
                              dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )}
              <ShareButtons title={post.title.rendered} />
            </div>
          </aside>
        </div>
      </section>

      {/* Author card */}
      <section className="w-full py-[56px]">
        <div className="max-w-[1440px] mx-auto md:px-[36px] px-[16px]">
          <div className="max-w-[720px] bg-[#F7F6F4] rounded-[20px] p-[24px] md:p-[32px]">
            <div className="flex items-start gap-[20px]">
              {author?.avatar_urls?.['96'] ? (
                <Image src={author.avatar_urls['96']} alt={author.name} width={72} height={72}
                  className="rounded-full object-cover w-[72px] h-[72px] shrink-0 ring-4 ring-white" />
              ) : (
                <div className="w-[72px] h-[72px] rounded-full bg-[#111212] flex items-center justify-center text-white font-mont font-bold text-xl shrink-0 ring-4 ring-white">
                  {author?.name?.charAt(0) ?? 'T'}
                </div>
              )}
              <div className="flex flex-col gap-[4px]">
                <p className="text-[17px] font-mont font-bold text-black">{author?.name ?? 'Thrill Edge'}</p>
                {author?.designation && (
                  <p className="text-[12px] font-inter font-medium text-[#929296] uppercase tracking-wider">
                    {author.designation}, Thrill Edge Technologies
                  </p>
                )}
                {author?.description && (
                  <p className="text-[14px] font-inter text-[#555] leading-[1.65] mt-[10px]">{author.description}</p>
                )}
                {author?.link && (
                  <a target="_blank" rel="noopener noreferrer" href={author.link}
                    className="mt-[12px] inline-flex items-center gap-[7px] text-[13px] font-inter font-semibold text-black bg-white border border-[#E5E4E0] px-[14px] py-[7px] rounded-full hover:border-black hover:shadow-sm transition-all duration-200 w-fit">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    View Profile
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA banner */}
      <section className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f0f23 100%)' }}>
        <div className="relative max-w-[1440px] mx-auto md:px-[36px] px-[16px] py-[56px] md:py-[72px] flex flex-col md:flex-row items-start md:items-center justify-between gap-[32px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-[11px] font-inter font-semibold text-white/40 uppercase tracking-[0.15em]">Start your project</p>
            <p className="text-[26px] md:text-[34px] font-mont font-bold text-white leading-[1.15] max-w-[520px]">Ready to build? Let&apos;s scope your project.</p>
            <p className="text-[15px] font-inter text-white/50 leading-[1.65] max-w-[400px]">Get a tailored breakdown in 48 hours — no fluff, no commitment.</p>
          </div>
          <Link href="/contact"
            className="shrink-0 inline-flex items-center gap-[10px] bg-white text-black text-[14px] font-mont font-semibold px-[28px] py-[14px] rounded-[10px] hover:bg-white/90 transition-all duration-200 whitespace-nowrap">
            Book a Call <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Continue reading */}
      {others.length > 0 && (
        <section className="max-w-[1440px] mx-auto md:px-[36px] px-[16px] pb-[96px] pt-[56px]">
          <h2 className="text-[24px] md:text-[32px] font-mont font-semibold text-black mb-[32px]">Continue Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-[48px]">
            {others.map(p => {
              const img = p._embedded?.['wp:featuredmedia']?.[0]?.source_url
              const t = readingTime(p.content.rendered)
              return (
                <Link key={p.id} href={`/blog/${p.slug}`}>
                  <article className="flex flex-col h-full group cursor-pointer bg-white border border-[#E5E4E0] rounded-[16px] overflow-hidden hover:shadow-xl hover:-translate-y-[4px] hover:border-[#C8C7C3] transition-all duration-300">
                    <div className="relative w-full aspect-[3/2] shrink-0 overflow-hidden bg-[#f2f2f2]">
                      {img && <Image src={img} alt={p.title.rendered} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />}
                    </div>
                    <div className="flex flex-col gap-[10px] p-[20px] flex-1">
                      <span className="flex items-center gap-[5px] text-[12px] font-inter text-[#929296]">
                        <Clock size={13} />{t}
                      </span>
                      <h3 className="text-[17px] lg:text-[19px] font-mont font-bold leading-[1.35] text-black group-hover:text-black/70 transition-colors duration-300 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
                      <div className="flex items-center justify-between mt-auto pt-[12px] border-t border-[#F0EFED]">
                        <span className="text-[11px] font-inter text-[#ABABAB]">{format(new Date(p.date), 'MMM d, yyyy')}</span>
                        <div className="flex items-center gap-[6px] bg-black/5 group-hover:bg-black group-hover:text-white text-black rounded-full px-[12px] py-[5px] transition-all duration-300">
                          <span className="text-[12px] font-mont font-semibold leading-none">Read</span>
                          <ArrowRight size={12} className="group-hover:translate-x-[2px] transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </section>
      )}

    </div>
  )
}
