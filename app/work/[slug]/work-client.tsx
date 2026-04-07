'use client'

import React from 'react'
import { useWorkItem } from '@/hooks/use-work'
import { useQuery } from '@tanstack/react-query'
import { getTestimonial, getAdjacentWorkItems } from '@/lib/wordpress'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/common/page-hero'
import { cn } from "../../../lib/utils";

interface WorkPageProps {
  params: Promise<{ slug: string }>
}

export default function WorkPage({ params }: WorkPageProps) {
  const { slug } = React.use(params)
  const { data: work, isLoading, error } = useWorkItem(slug)

  const reviewId = Array.isArray(work?.acf?.review)
    ? work.acf.review[0]
    : work?.acf?.review

  const { data: testimonial } = useQuery({
    queryKey: ['testimonial', reviewId],
    queryFn: () => getTestimonial(reviewId!),
    enabled: !!reviewId,
  })

  const { data: adjacent } = useQuery({
    queryKey: ['adjacent-work', work?.id],
    queryFn: () => getAdjacentWorkItems(work!.id),
    enabled: !!work?.id,
  })

  if (error) notFound()

  if (isLoading) {
    return (
      <div className={cn('min-h-screen', 'bg-white')}>
        <div className={cn('flex', 'items-center', 'justify-center', 'py-40')}>
          <Loader size={32} className={cn('animate-spin', 'text-black')} />
        </div>
      </div>
    )
  }

  if (!work) notFound()

  const featuredImage = work._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const { year, services, industry } = work.acf ?? {}

  // Strip HTML tags from services for plain text display
  const servicesText = services ? services.replace(/<[^>]*>/g, '') : ''

  return (
    <>
      {featuredImage && (
        <PageHero
          label="Our Work portfolio"
          title={work.title.rendered}
          image={featuredImage}
          imageAlt={work.title.rendered}
        />
      )}
        <section className={cn('max-w-360', 'w-full', 'mx-auto', 'p-4', 'rounded-[20px]', 'overflow-hidden')}>
          <div className={cn('relative', 'w-full', 'h-full', 'flex', 'flex-col')}>
            {/* Overlay text */}
            <div className={cn('absolute', 'z-50', 'bottom-0', 'left-0', 'right-0', 'h-fit', 'w-full', 'flex', 'lg:flex-row', 'flex-col', 'justify-between', 'lg:items-center', 'lg:gap-6', 'gap-2', 'lg:px-9', 'px-5', 'lg:py-6', 'py-6')}>
              <h1 className={cn('h-fit', 'text-[40px]', 'leading-10', 'lg:text-[64px]', 'lg:leading-16', 'font-mont', 'font-semibold', 'text-white')}
                dangerouslySetInnerHTML={{ __html: work.title.rendered }}
              />
              {work.acf?.long_title && (
                <p className={cn('lg:text-[32px]', 'text-[24px]', 'font-mont', 'font-semibold', 'text-white', 'lg:max-w-lg', 'lg:leading-10', 'leading-7.5')}>
                  {work.acf.long_title}
                </p>
              )}
            </div>
            {/* Gradient overlay */}
            <div
              className={cn('absolute', 'inset-0', 'transition', 'duration-300', 'rounded-[20px]')}
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), rgba(0,0,0,0), rgba(0,0,0,0))' }}
            />
          </div>
        </section>
      <div className={cn('relative', 'bg-[#F3F3F3]')}>

        {/* Meta row: Year / Services / Industry */}
        <div className={cn('relative', 'max-w-360', 'w-full', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'lg:gap-1', 'gap-4', 'mx-auto', 'md:px-9', 'px-4', 'mt-8')}>
          {year && (
            <div className={cn('w-full', 'flex', 'flex-col', 'gap-2')}>
              <h6 className={cn('text-[16px]', 'leading-6', 'font-inter', 'text-[#929296]')}>Year</h6>
              <p className={cn('text-[20px]', 'font-semibold', 'font-mont', 'text-black')}>{year}</p>
            </div>
          )}
          {servicesText && (
            <div className={cn('w-full', 'flex', 'flex-col', 'gap-2')}>
              <h6 className={cn('text-[16px]', 'leading-6', 'font-inter', 'text-[#929296]')}>Services</h6>
              <p className={cn('text-[20px]', 'font-semibold', 'font-mont', 'text-black', 'max-w-90')}>{servicesText}</p>
            </div>
          )}
          {industry && (
            <div className={cn('w-full', 'flex', 'flex-col', 'gap-2')}>
              <h6 className={cn('text-[16px]', 'leading-6', 'font-inter', 'text-[#929296]')}>Industry</h6>
              <p className={cn('text-[20px]', 'font-semibold', 'font-mont', 'text-black')}>{industry}</p>
            </div>
          )}
        </div>

        {/* Post Content */}
        {work.content?.rendered && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'md:py-24', 'py-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'flex', 'flex-col', 'gap-8', 'mx-auto', 'work-content')}>
              <div dangerouslySetInnerHTML={{ __html: work.content.rendered }} />
            </div>
          </section>
        )}

        {/* Testimonial / Review */}
        {testimonial && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'pb-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto', 'bg-[#f7f7f7]', 'border', 'border-[#e5e5e5]', 'rounded-2xl', 'p-8', 'flex', 'flex-col', 'gap-4')}>
              <div
                className={cn('text-[18px]', 'leading-7', 'font-inter', 'text-[#111212]', 'italic')}
                dangerouslySetInnerHTML={{ __html: testimonial.content.rendered }}
              />
              <div className={cn('pt-4', 'border-t', 'border-[#e5e5e5]')}>
                <p className={cn('font-semibold', 'font-mont', 'text-black', 'text-[16px]')}>
                  {testimonial.acf?.author_name ?? testimonial.title.rendered}
                </p>
                {(testimonial.acf?.author_title || testimonial.acf?.author_company) && (
                  <p className={cn('text-[14px]', 'text-[#929296]', 'font-inter')}>
                    {[testimonial.acf.author_title, testimonial.acf.author_company].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Prev / Next Navigation */}
        <div className={cn('w-full', 'max-w-360', 'flex', 'justify-between', 'items-center', 'mx-auto', 'md:px-9', 'px-4', 'py-6')}>
          {adjacent?.prev ? (
            <Link
              href={`/work/${adjacent.prev.slug}`}
              className={cn('flex', 'gap-2', 'text-[24px]', 'leading-6', 'font-bold', 'font-mont', 'group', 'items-center')}
            >
              <span className={cn('w-6', 'flex', 'items-center', 'justify-center')}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className={cn('group-hover:-translate-x-0.5', 'transition-all', 'duration-300', 'ease-in-out')}>
                  <path d="M7 1L1 6L7 11" stroke="#111212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="pt-0.75">Previous</span>
            </Link>
          ) : (
            <span className={cn('flex', 'gap-2', 'text-[24px]', 'leading-6', 'font-bold', 'font-mont', 'text-[#ccc]', 'items-center', 'cursor-not-allowed')}>
              <span className={cn('w-6', 'flex', 'items-center', 'justify-center')}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1L1 6L7 11" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="pt-0.75">Previous</span>
            </span>
          )}

          {adjacent?.next ? (
            <Link
              href={`/work/${adjacent.next.slug}`}
              className={cn('flex', 'items-center', 'gap-2', 'text-[24px]', 'leading-6', 'font-bold', 'font-mont', 'group')}
            >
              <span className="pt-0.75">Next</span>
              <span className={cn('w-6', 'flex', 'items-center', 'justify-center')}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className={cn('rotate-180', 'group-hover:translate-x-0.5', 'transition-all', 'duration-300', 'ease-in-out')}>
                  <path d="M7 1L1 6L7 11" stroke="#111212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ) : (
            <span className={cn('flex', 'items-center', 'gap-2', 'text-[24px]', 'leading-6', 'font-bold', 'font-mont', 'text-[#ccc]', 'cursor-not-allowed')}>
              <span className="pt-0.75">Next</span>
              <span className={cn('w-6', 'flex', 'items-center', 'justify-center')}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                  <path d="M7 1L1 6L7 11" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          )}
        </div>

        <section className={cn('w-full', 'flex', 'items-center', 'justify-center', 'p-5')}>
          <div className={cn('w-full', 'max-w-350', 'flex', 'md:flex-row', 'flex-col', 'justify-between', 'md:gap-24', 'gap-2', 'rounded-3xl', 'md:px-12', 'px-4', 'md:py-10', 'py-5', 'bg-white', 'border', 'border-[#e5e5e5]')}>
            <h3 className={cn('lg:text-[56px]', 'text-[30px]', 'lg:leading-16', 'font-semibold', 'font-mont', 'text-[#111212]', 'max-w-160.5')}>
              Let&apos;s Build Your Next Big Thing
            </h3>
            <div className={cn('max-w-88.5', 'w-full', 'flex', 'items-start', 'flex-col', 'md:gap-5', 'gap-10')}>
              <p className={cn('text-[16px]', 'leading-6', 'text-[#929296]', 'font-inter')}>
                Your idea, our brainswe&apos;ll send you a tailored game plan in 48h.
              </p>
              <Link
                href="/contact"
                className={cn('flex', 'flex-row', 'items-center', 'justify-center', 'gap-1', 'px-6', 'pt-3.5', 'pb-3', 'bg-black', 'text-white', 'font-mont', 'text-[14px]', 'font-semibold', 'rounded-full', 'hover:scale-105', 'transition-all', 'duration-300', 'ease-in-out')}
              >
                Book a call
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
