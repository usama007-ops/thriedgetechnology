'use client'

import React from 'react'
import { useWorkItem } from '@/hooks/use-work'
import { useQuery } from '@tanstack/react-query'
import { getTestimonial, getAdjacentWorkItems } from '@/lib/wordpress'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

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
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center py-40">
          <Loader size={32} className="animate-spin text-black" />
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
    <div className="relative bg-[#F3F3F3]">

      {/* Hero Banner */}
      <section className="max-w-[1440px] w-full mx-auto p-[16px] rounded-[20px] overflow-hidden">
        <div className="relative w-full h-full flex flex-col">
          {/* Overlay text */}
          <div className="absolute z-50 bottom-0 left-0 right-0 h-fit w-full flex lg:flex-row flex-col justify-between lg:items-center lg:gap-[24px] gap-[8px] lg:px-[36px] px-[20px] lg:py-[24px] py-[24px]">
            <h1 className="h-fit text-[40px] leading-[40px] lg:text-[64px] lg:leading-[64px] font-mont font-semibold text-white"
              dangerouslySetInnerHTML={{ __html: work.title.rendered }}
            />
            {work.acf?.long_title && (
              <p className="lg:text-[32px] text-[24px] font-mont font-semibold text-white lg:max-w-[512px] lg:leading-[40px] leading-[30px]">
                {work.acf.long_title}
              </p>
            )}
          </div>

          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={work.title.rendered}
              width={1440}
              height={650}
              priority
              className="w-full max-h-[650px] object-cover rounded-[20px] overflow-hidden"
            />
          ) : (
            <div className="w-full min-h-[650px] bg-gray-200 rounded-[20px]" />
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 transition duration-300 rounded-[20px]"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), rgba(0,0,0,0), rgba(0,0,0,0))' }}
          />
        </div>
      </section>

      {/* Meta row: Year / Services / Industry */}
      <div className="relative max-w-[1440px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[4px] gap-[16px] mx-auto md:px-[36px] px-[16px] mt-[32px]">
        {year && (
          <div className="w-full flex flex-col gap-[8px]">
            <h6 className="text-[16px] leading-[24px] font-inter text-[#929296]">Year</h6>
            <p className="text-[20px] font-semibold font-mont text-black">{year}</p>
          </div>
        )}
        {servicesText && (
          <div className="w-full flex flex-col gap-[8px]">
            <h6 className="text-[16px] leading-[24px] font-inter text-[#929296]">Services</h6>
            <p className="text-[20px] font-semibold font-mont text-black max-w-[360px]">{servicesText}</p>
          </div>
        )}
        {industry && (
          <div className="w-full flex flex-col gap-[8px]">
            <h6 className="text-[16px] leading-[24px] font-inter text-[#929296]">Industry</h6>
            <p className="text-[20px] font-semibold font-mont text-black">{industry}</p>
          </div>
        )}
      </div>

      {/* Post Content */}
      {work.content?.rendered && (
        <section className="w-full max-w-[1440px] md:px-[36px] px-[16px] md:py-[96px] py-[64px] mx-auto">
          <div className="max-w-[1038px] w-full flex flex-col gap-[32px] mx-auto work-content">
            <div dangerouslySetInnerHTML={{ __html: work.content.rendered }} />
          </div>
        </section>
      )}

      {/* Testimonial / Review */}
      {testimonial && (
        <section className="w-full max-w-[1440px] md:px-[36px] px-[16px] pb-[64px] mx-auto">
          <div className="max-w-[1038px] w-full mx-auto bg-[#f7f7f7] border border-[#e5e5e5] rounded-[16px] p-[32px] flex flex-col gap-[16px]">
            <div
              className="text-[18px] leading-[28px] font-inter text-[#111212] italic"
              dangerouslySetInnerHTML={{ __html: testimonial.content.rendered }}
            />
            <div className="pt-[16px] border-t border-[#e5e5e5]">
              <p className="font-semibold font-mont text-black text-[16px]">
                {testimonial.acf?.author_name ?? testimonial.title.rendered}
              </p>
              {(testimonial.acf?.author_title || testimonial.acf?.author_company) && (
                <p className="text-[14px] text-[#929296] font-inter">
                  {[testimonial.acf.author_title, testimonial.acf.author_company].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <div className="w-full max-w-[1440px] flex justify-between items-center mx-auto md:px-[36px] px-[16px] py-[24px]">
        {adjacent?.prev ? (
          <Link
            href={`/work/${adjacent.prev.slug}`}
            className="flex gap-[8px] text-[24px] leading-[24px] font-[700] font-mont group items-center"
          >
            <span className="w-[24px] flex items-center justify-center">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="group-hover:-translate-x-0.5 transition-all duration-300 ease-in-out">
                <path d="M7 1L1 6L7 11" stroke="#111212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="pt-[3px]">Previous</span>
          </Link>
        ) : (
          <span className="flex gap-[8px] text-[24px] leading-[24px] font-[700] font-mont text-[#ccc] items-center cursor-not-allowed">
            <span className="w-[24px] flex items-center justify-center">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 6L7 11" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="pt-[3px]">Previous</span>
          </span>
        )}

        {adjacent?.next ? (
          <Link
            href={`/work/${adjacent.next.slug}`}
            className="flex items-center gap-[8px] text-[24px] leading-[24px] font-[700] font-mont group"
          >
            <span className="pt-[3px]">Next</span>
            <span className="w-[24px] flex items-center justify-center">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="rotate-180 group-hover:translate-x-0.5 transition-all duration-300 ease-in-out">
                <path d="M7 1L1 6L7 11" stroke="#111212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        ) : (
          <span className="flex items-center gap-[8px] text-[24px] leading-[24px] font-[700] font-mont text-[#ccc] cursor-not-allowed">
            <span className="pt-[3px]">Next</span>
            <span className="w-[24px] flex items-center justify-center">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                <path d="M7 1L1 6L7 11" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        )}
      </div>

      <section className="w-full flex items-center justify-center p-[20px]">
        <div className="w-full max-w-[1400px] flex md:flex-row flex-col justify-between md:gap-[96px] gap-[8px] rounded-[24px] md:px-[48px] px-[16px] md:py-[40px] py-[20px] bg-white border border-[#e5e5e5]">
          <h3 className="lg:text-[56px] text-[30px] lg:leading-[64px] font-semibold font-mont text-[#111212] max-w-[642px]">
            Let&apos;s Build Your Next Big Thing
          </h3>
          <div className="max-w-[354px] w-full flex items-start flex-col md:gap-[20px] gap-[40px]">
            <p className="text-[16px] leading-[24px] text-[#929296] font-inter">
              Your idea, our brains — we&apos;ll send you a tailored game plan in 48h.
            </p>
            <Link
              href="/contact"
              className="flex flex-row items-center justify-center gap-1 px-[24px] pt-[14px] pb-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Book a call
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
