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

        {/* CTA */}
        <div className="bg-[#111212] max-w-[1440px] mx-auto rounded-[30px]">
          <div className="flex lg:flex-row flex-col justify-between md:items-center gap-[48px] mx-auto px-[30px] py-[96px] w-full max-w-[1440px]">
            <div className="flex flex-col items-center md:items-items-start gap-[16px] lg:max-w-[500px]">
              <h2 className="font-mont font-bold text-[48px] text-white leading-[52px]">
                Not sure which service fits?
              </h2>
              <p className="font-inter text-[#929296] text-[16px] leading-[24px]">
                Tell us about your project and we'll recommend the right approach in 48h.
              </p>
            </div>
            <div className="flex md:flex-row flex-col gap-[16px]">
              <Link href="/contact"
                className="flex justify-center items-center bg-white px-[32px] py-[16px] rounded-full font-mont font-semibold text-[#111212] text-[16px] hover:scale-105 transition-all duration-300">
                Book a call
              </Link>
              <Link href="/project-cost-estimation"
                className="flex justify-center items-center hover:bg-white px-[32px] py-[16px] border border-white rounded-full font-mont font-semibold text-[16px] text-white hover:text-[#111212] transition-all duration-300">
                Get an Project Estimate
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
