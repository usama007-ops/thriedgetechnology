/**
 * Header Component
 * Desktop: white bar + mega menu + "Book a call" pill
 * Mobile: modern mega menu drawer with accordion sections
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import {
  Menu,
  X,
  Building2,
  BriefcaseBusiness,
  Cpu,
  Layers3,
  ChevronRight,
  Info,
  Star,
  HelpCircle,
  Briefcase,
  Newspaper,
  Phone,
  Brain,
  Code2,
  PenTool,
  Smartphone,
  Rocket,
  Cloud,
  ShoppingBag,
  Monitor,
  Server,
  Database,
  HeartPulse,
  GraduationCap,
  Building,
  Bitcoin,
  Landmark,
  Truck,
} from 'lucide-react'

import { MegaMenu } from './mega-menu'
import { useUIStore } from '@/lib/store'
import { cn } from '../../lib/utils'

// ─── mobile nav data ──────────────────────────────────────────────────────────
const mobileNav = [
  {
    label: 'Company',
    icon: Building2,

    children: [
      {
        label: 'About',
        href: '/about',
        desc: 'Learn more about our company',
        icon: Info,
      },

      {
        label: 'Reviews',
        href: '/client-reviews',
        desc: 'What clients say about us',
        icon: Star,
      },

      {
        label: 'FAQs',
        href: '/faqs',
        desc: 'Frequently asked questions',
        icon: HelpCircle,
      },

      {
        label: 'Careers',
        href: '/careers',
        desc: 'Join our growing team',
        icon: Briefcase,
      },

      {
        label: 'Blogs',
        href: '/blog',
        desc: 'Insights, news & updates',
        icon: Newspaper,
      },

      {
        label: 'Contact',
        href: '/contact',
        desc: 'Get in touch with us',
        icon: Phone,
      },
    ],
  },

  {
    label: 'Services',
    icon: BriefcaseBusiness,

    children: [
      {
        label: 'AI & ML Solutions',
        href: '/services/ai-ml-solutions',
        desc: 'Custom AI development services',
        icon: Brain,
      },

      {
        label: 'Custom Web Development',
        href: '/services/custom-web-development',
        desc: 'Modern scalable web apps',
        icon: Code2,
      },

      {
        label: 'UI/UX Design',
        href: '/services/ui-ux-design',
        desc: 'Beautiful user experiences',
        icon: PenTool,
      },

      {
        label: 'Mobile App Development',
        href: '/services/mobile-app-development',
        desc: 'iOS & Android applications',
        icon: Smartphone,
      },

      {
        label: 'MVP & Product Strategy',
        href: '/services/mvp-product-strategy',
        desc: 'Launch products faster',
        icon: Rocket,
      },

      {
        label: 'SaaS Solutions',
        href: '/services/saas-solutions',
        desc: 'Cloud based SaaS products',
        icon: Cloud,
      },

      {
        label: 'Shopify Plus Agency',
        href: '/services/shopify-plus-agency',
        desc: 'High converting Shopify stores',
        icon: ShoppingBag,
      },
    ],
  },

  {
    label: 'Technologies',
    icon: Cpu,

    children: [
      {
        label: 'AI & Machine Learning',
        href: '/technologies/ai-machine-learning',
        desc: 'Advanced AI technologies',
        icon: Brain,
      },

      {
        label: 'Frontend Development',
        href: '/technologies/frontend-development',
        desc: 'React, Next.js & modern UI',
        icon: Monitor,
      },

      {
        label: 'Backend Development',
        href: '/technologies/backend-development',
        desc: 'Robust backend systems',
        icon: Server,
      },

      {
        label: 'Mobile Development',
        href: '/technologies/mobile-development',
        desc: 'Cross platform apps',
        icon: Smartphone,
      },

      {
        label: 'Databases',
        href: '/technologies/databases',
        desc: 'Secure scalable databases',
        icon: Database,
      },
    ],
  },

  {
    label: 'Industries',
    icon: Layers3,

    children: [
      {
        label: 'Healthcare',
        href: '/industries/healthcare',
        desc: 'Healthcare digital products',
        icon: HeartPulse,
      },

      {
        label: 'Education',
        href: '/industries/education',
        desc: 'EdTech solutions',
        icon: GraduationCap,
      },

      {
        label: 'Real Estate',
        href: '/industries/real-estate',
        desc: 'Real estate platforms',
        icon: Building,
      },

      {
        label: 'Blockchain',
        href: '/industries/blockchain',
        desc: 'Blockchain & Web3 systems',
        icon: Bitcoin,
      },

      {
        label: 'Fintech',
        href: '/industries/fintech',
        desc: 'Financial technology products',
        icon: Landmark,
      },

      {
        label: 'Logistics',
        href: '/industries/logistics',
        desc: 'Supply chain & logistics systems',
        icon: Truck,
      },
    ],
  },
]

// ─── chevron ──────────────────────────────────────────────────────────────────
function ChevronDown() {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 1L7 7L1 1"
        stroke="#111212"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── accordion item ───────────────────────────────────────────────────────────
function AccordionItem({
  item,
  onClose,
}: {
  item: (typeof mobileNav)[number]
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)

  const Icon = item.icon

  return (
    <div className="border-b border-neutral-200 py-2">
      {/* top button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3"
      >
        <div className="flex items-center gap-3">
          <div
            className="
              w-10 h-10
              rounded-xl
              bg-neutral-100
              flex items-center justify-center
            "
          >
            <Icon size={18} />
          </div>

          <span
            className="
              text-[15px]
              font-semibold
              text-neutral-900
            "
          >
            {item.label}
          </span>
        </div>

        <div
          className={cn(
            'transition-transform duration-300',
            open && 'rotate-180'
          )}
        >
          <ChevronDown />
        </div>
      </button>

      {/* dropdown */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          open ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="pl-2 pb-3 flex flex-col gap-2">
          {item.children.map((child) => {
            const ChildIcon = child.icon

            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="
                  group
                  rounded-2xl
                  p-3
                  hover:bg-white
                  transition-all duration-300
                  border border-transparent
                  hover:border-neutral-200
                "
              >
                <div className="flex items-start gap-3">
                  {/* child icon */}
                  <div
                    className="
                      w-10 h-10
                      rounded-xl
                      bg-neutral-100
                      flex items-center justify-center
                      shrink-0
                      group-hover:bg-black
                      transition-colors duration-300
                    "
                  >
                    <ChildIcon
                      size={18}
                      className="
                        text-neutral-700
                        group-hover:text-white
                        transition-colors duration-300
                      "
                    />
                  </div>

                  {/* content */}
                  <div className="flex-1">
                    <div
                      className="
                        flex items-center justify-between
                      "
                    >
                      <h4
                        className="
                          text-[14px]
                          font-semibold
                          text-neutral-900
                          group-hover:translate-x-1
                          transition-transform duration-300
                        "
                      >
                        {child.label}
                      </h4>

                      <ChevronRight
                        size={16}
                        className="
                          text-neutral-400
                          opacity-0
                          -translate-x-1
                          group-hover:opacity-100
                          group-hover:translate-x-0
                          transition-all duration-300
                        "
                      />
                    </div>

                    <p
                      className="
                        text-[12px]
                        text-neutral-500
                        mt-1
                        leading-relaxed
                      "
                    >
                      {child.desc}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── mobile drawer ────────────────────────────────────────────────────────────
function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 bg-black/40 z-[9998] transition-opacity duration-300 md:hidden',
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      />

      {/* drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-[420px]',
          'bg-[#fafafa]',
          'z-[9999]',
          'flex flex-col',
          'transition-transform duration-300',
          'shadow-2xl md:hidden',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* header */}
        <div
          className="
            sticky top-0 z-20
            bg-[#fafafa]/90
            backdrop-blur-xl
            border-b border-neutral-200
            px-5 py-4
            flex items-center justify-between
          "
        >
          <Link href="/" onClick={onClose}>
            <Image
              src="/logo.png"
              width={150}
              height={28}
              alt="Thrill Edge Technologies"
            />
          </Link>

          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="
              w-10 h-10
              rounded-full
              bg-white
              border border-neutral-200
              flex items-center justify-center
              hover:bg-neutral-100
              transition-colors
            "
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* nav */}
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          {mobileNav.map((item) => (
            <AccordionItem
              key={item.label}
              item={item}
              onClose={onClose}
            />
          ))}
        </nav>

        {/* bottom cta */}
        <div className="border-t border-neutral-200 p-5 bg-[#fafafa]">
          <Link
            href="/contact"
            onClick={onClose}
            className="
              flex items-center justify-center
              w-full h-13
              rounded-2xl
              bg-black
              text-white
              font-semibold
              text-[14px]
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-300
            "
          >
            Book a Free Strategy Call
          </Link>
        </div>
      </div>
    </>
  )
}

// ─── header ───────────────────────────────────────────────────────────────────
export function Header() {
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    setMobileMenuOpen,
  } = useUIStore()

  return (
    <>
      <header className="sticky top-0 z-40 bg-white">
        <div className="max-w-360 mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* logo */}
            <Link
              href="/"
              className="
                flex items-center gap-2
                font-bold text-2xl
                text-[#111212]
              "
            >
              <Image
                src="/logo.png"
                width={165}
                height={28}
                alt="Thrill Edge Technologies"
              />
            </Link>

            {/* desktop mega menu */}
            <MegaMenu />

            {/* desktop cta */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="
                  flex justify-center items-center
                  bg-black
                  px-6 pt-[14px] pb-[12px]
                  rounded-full
                  font-semibold
                  text-[14px]
                  text-white
                  hover:scale-105
                  transition-all duration-300
                "
              >
                Book a Free Strategy Call
              </Link>
            </div>

            {/* mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="
                md:hidden
                p-2
                rounded-xl
                hover:bg-neutral-100
                transition-colors
              "
              aria-label="Open Menu"
            >
              <Menu size={24} color="#111212" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <MobileDrawer
        open={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}