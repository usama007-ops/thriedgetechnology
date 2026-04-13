/**
 * Mega Menu Component
 * Matches reference: full-width panel from header top, SVG icons, card hover style,
 * image logo badge bar, right-side image panel with pill CTA.
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronDown, Users, Star, HelpCircle, Briefcase, BookOpen, Mail,
  Brain, Globe, Palette, Smartphone, Rocket, Cloud,
  Cpu, PanelsTopLeft, Server, Database, GitBranch,
  Heart, GraduationCap, Building2, Blocks, Landmark, Truck,
  type LucideIcon,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from "../../lib/utils";

// ─── types ────────────────────────────────────────────────────────────────────
interface MenuItem {
  label: string
  href: string
  description: string
  icon: LucideIcon
}

interface MenuGroup {
  label: string
  href?: string
  children?: string
  categoryLabel?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  items?: MenuItem[]
}

// ─── data ─────────────────────────────────────────────────────────────────────
const menus: MenuGroup[] = [
   { label: 'Our work', href: '/work' },
  {
    label: 'Company', categoryLabel: 'Company', image: '/company-menu.avif', imageAlt: 'About us', ctaLabel: 'About us', ctaHref: '/about',
    items: [
      { label: 'About',   href: '/about',   icon: Users,       description: 'A global team of organic media planners behind some of the worlds biggest category leaders' },
      { label: 'Reviews', href: '/client-reviews', icon: Star,        description: 'Read client reviews and testimonials about our software, web, and IT solutions.' },
      { label: 'FAQs',    href: '/faqs',    icon: HelpCircle,  description: 'Explore answers to frequently asked questions about our software, AI solutions, and partnership processes.' },
      { label: 'Careers', href: '/careers', icon: Briefcase,   description: 'A global team of organic media planners behind some of the worlds biggest category leaders' },
      { label: 'Blogs',   href: '/blog',    icon: BookOpen,    description: 'Discover expert insights, tutorials, and industry updates on our blog.' },
      { label: 'Contact', href: '/contact', icon: Mail,        description: "You can tell us about your product, your timeline, how you heard about us, and where you're located." },
    ],
  },
  {
    label: 'Services', categoryLabel: 'Core Services', image: '/services-menu.avif', imageAlt: 'All services', ctaLabel: 'View all services', ctaHref: '/services',
    items: [
      { label: 'AI & ML Solutions',      href: '/services/ai-ml-solutions',             icon: Brain,         description: 'We design intelligent systems that think, learn, and adapt, transforming data into decisions and automation into growth' },
      { label: 'Custom Web Development', href: '/services/custom-web-development',   icon: Globe,         description: 'Our web engineers craft scalable, secure, and high-performing applications that power growth' },
      { label: 'UI/UX Design',           href: '/services/ui-ux-design',      icon: Palette,       description: 'Our design philosophy blends aesthetics, usability, and psychology into effortless digital experiences' },
      { label: 'Mobile App Development', href: '/services/mobile-app-development',icon: Smartphone,    description: 'We design and build powerful, scalable, and user-centric mobile apps across iOS and Android' },
      { label: 'MVP & Product Strategy', href: '/services/mvp-and-product-strategy',      icon: Rocket,        description: 'We help you transform ideas into market-ready products, fast, focused, and scalable' },
      { label: 'SaaS Solutions',         href: '/services/saas-solutions',              icon: Cloud,         description: 'We build scalable, cloud-native software and multi-tenant platforms designed for high retention and recurring growth' },
      { label: 'AI Workflow Automation', href: '/services/ai-workflow-automation',       icon: GitBranch,     description: 'We automate complex business workflows using AI agents, LLMs, and intelligent pipelines that reduce manual effort and accelerate operations.' },
      { label: 'Digital Marketing Solutions', href: '/services/digital-marketing-solutions', icon: Rocket,    description: 'We craft data-driven digital marketing strategies that grow your brand, drive qualified traffic, and convert visitors into loyal customers.' },
    ],
  },
  {
    label: 'Technologies', categoryLabel: 'Technologies', image: '/technologies-menu.avif', imageAlt: 'View all technologies', ctaLabel: 'View all technologies', ctaHref: '/technologies',
    items: [
      { label: 'AI & Machine Learning', href: '/technologies/ai-machine-learning',      icon: Cpu,           description: 'We integrate AI and machine learning models to automate decision-making, enhance analytics, and deliver intelligent digital products.' },
      { label: 'Frontend Development',  href: '/technologies/frontend-development',   icon: PanelsTopLeft, description: 'We build responsive, high-performing interfaces using React, Vue.js, and Next.js, ensuring every pixel and interaction enhances user engagement.' },
      { label: 'Backend Development',   href: '/technologies/backend-development',    icon: Server,        description: 'We develop secure, scalable, and high-availability backend systems using Node.js, Python, and Go, powering data flow and business logic behind every experience.' },
      { label: 'Mobile Development',    href: '/technologies/mobile-development',     icon: Smartphone,    description: 'We create native and cross-platform mobile apps with Flutter and React Native, delivering smooth, fast, and visually stunning mobile experiences.' },
      { label: 'Databases',             href: '/technologies/databases',  icon: Database,      description: 'We design and optimize data architectures using SQL and NoSQL databases like PostgreSQL, MongoDB, and Redis for reliability and performance.' },
    ],
  },
  {
    label: 'Industries', categoryLabel: 'Industries', image: '/industries-menu.avif', imageAlt: 'View all industries', ctaLabel: 'View all industries', ctaHref: '/industries',
    items: [
      { label: 'Healthcare',  href: '/industries/healthcare',  icon: Heart,          description: 'Innovative healthcare solutions that prioritize patient care using React and cloud services.' },
      { label: 'Education',   href: '/industries/education',   icon: GraduationCap,  description: 'Innovative tools for student engagement using Angular and AI to enhance learning.' },
      { label: 'Real Estate', href: '/industries/real-estate', icon: Building2,      description: 'Technology and market insights to simplify buying and selling real estate.' },
      { label: 'Blockchain',  href: '/industries/blockchain',  icon: Blocks,         description: 'Secure applications to improve data management and enhance trust in services.' },
      { label: 'Fintech',     href: '/industries/fintech',     icon: Landmark,       description: 'Secure and scalable financial ecosystems from digital banking to payment gateways.' },
      { label: 'Logistics',   href: '/industries/logistics',   icon: Truck,          description: 'Efficient logistics solutions using AI and blockchain to optimize supply chain management.' },
    ],
  },
]

// ─── badge logos ──────────────────────────────────────────────────────────────
const badgeLogos = [
  { src: '/google.svg',            alt: 'google' },
  { src: '/trustpilot.svg',        alt: 'trustpilot' },
  { src: '/clutch.svg',            alt: 'clutch' },
  { src: '/awwwards-black.svg',   alt: 'Awwwards' },
  { src: '/designrush-black.svg', alt: 'Design Rush' },
  { src: '/csswinner-black.svg',  alt: 'CssWinner' },
]

// ─── lucide icon renderer ─────────────────────────────────────────────────────
function MenuIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon size={24} className={cn('text-[#111212]', 'shrink-0')} />
}

// ─── badge with image fallback ────────────────────────────────────────────────
function BadgeLogo({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false)
  if (err) {
    return <span className={cn('font-bold', 'text-[#111212]', 'text-xs')}>{alt}</span>
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={100}
      height={100}
      className={cn('w-[67px]', 'xl:w-[100px]')}
      onError={() => setErr(true)}
    />
  )
}

// ─── mega menu nav ────────────────────────────────────────────────────────────
export function MegaMenu() {
  const [active, setActive] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActive(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const activeMenu = menus.find((m) => m.label === active) ?? null

  return (
    <div
      ref={navRef}
      className={cn('hidden', 'md:flex', 'items-center', 'gap-1')}
      onMouseLeave={() => setActive(null)}
    >
      {/* trigger buttons */}
      {menus.map((menu) => (
        menu.href ? (
          <Link key={menu.label} href={menu.href}
            className={cn('flex', 'items-center', 'gap-1.5', 'px-3', 'py-2', 'font-semibold', 'text-[#111212]', 'hover:text-accent', 'text-sm', 'transition-colors', 'cursor-pointer')}>
            {menu.label}
          </Link>
        ) : (
          <button key={menu.label} onMouseEnter={() => setActive(menu.label)}
            className={cn('flex', 'items-center', 'gap-1.5', 'px-3', 'py-2', 'font-semibold', 'text-[#111212]', 'hover:text-accent', 'text-sm', 'transition-colors', 'cursor-pointer')}>
            {menu.label}
            <ChevronDown size={14} className={`transition-transform duration-200 ${active === menu.label ? 'rotate-180' : ''}`} />
          </button>
        )
      ))}

      {/* single shared panelpositioned from the header via fixed top */}
      {activeMenu && (
        <div
          className={cn('grid','grid-cols-3','right-0', 'left-0', 'z-[9999]', 'fixed', 'flex', 'justify-center', 'px-4')}
          style={{ top: '50px' }}
          onMouseEnter={() => setActive(activeMenu.label)}
          onMouseLeave={() => setActive(null)}
        >
          <div className={cn('flex', 'gap-[24px]', 'bg-white', 'p-[12px]', 'rounded-[20px]', 'w-full', 'max-w-[1440px]')}>
            {/* LEFT */}
            <div className="w-full px-[32px] py-[40px]">
              <p className="text-[16px] font-normal text-[#929296] mb-4">{activeMenu.categoryLabel}</p>
              <ul className="grid grid-cols-2 gap-[24px]">
                {(activeMenu.items ?? []).map((item) => (
                  <li key={item.href} className="h-full">
                    <Link
                      href={item.href}
                      onClick={() => setActive(null)}
                      className={cn('block', 'box-border', 'hover:bg-gray-50', 'px-4', 'py-2', 'border', 'border-white', 'hover:border-[#F2F2F2]', 'rounded-[8px]', 'w-full', 'h-full', 'font-semibold', 'text-[16px]', 'text-black', 'leading-[24px]', 'cursor-pointer')}
                    >
                      <div className={cn('flex', 'items-start', 'gap-[16px]')}>
                        <MenuIcon icon={item.icon} />
                        <div className={cn('flex', 'flex-col', 'gap-[8px]')}>
                          <p>{item.label}</p>
                          <p className={cn('font-normal', 'text-[#929296]', 'text-[14px]', 'leading-[18px]')}>{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {/* badge bar */}
              <div className={cn('flex', 'justify-between', 'items-center', 'gap-[12px]', 'bg-[#f7f7f7]', 'mt-[30px]', 'p-[20px]', 'border', 'border-[#e5e5e5]', 'rounded-[8px]')}>
                {badgeLogos.map((b) => (
                  <BadgeLogo key={b.alt} src={b.src} alt={b.alt} />
                ))}
              </div>
            </div>
            {/* RIGHTimage */}
            {/* <div className="relative max-w-[400px] w-full rounded-[16px] overflow-hidden flex shrink-0">
              <Image
                src={activeMenu.image!}
                alt={activeMenu.imageAlt!}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
              <Link
                href={activeMenu.ctaHref!}
                onClick={() => setActive(null)}
                className={cn('bottom-[12px]', 'left-[12px]', 'absolute', 'flex', 'justify-center', 'items-center', 'gap-1', 'bg-white', 'backdrop-blur-[12px]', 'px-[24px]', 'pt-[14px]', 'pb-[12px]', 'rounded-full', 'font-semibold', 'text-[#111212]', 'text-[14px]', 'hover:scale-105', 'transition-all', 'duration-300', 'ease-in-out', 'cursor-pointer')}
              >
                <span>{activeMenu.ctaLabel}</span>
              </Link>
            </div>  */}
          </div>
        </div>
      )}
    </div>
  )
}
