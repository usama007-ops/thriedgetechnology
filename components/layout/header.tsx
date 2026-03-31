/**
 * Header Component
 * Desktop: white bar + mega menu + "Book a call" pill
 * Mobile: slide-in drawer from right with accordion sections
 */

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { MegaMenu } from './mega-menu'
import { useUIStore } from '@/lib/store'

// ─── mobile nav data ──────────────────────────────────────────────────────────
const mobileNav = [
  { label: 'Our work', href: '/work', children: null },
  {
    label: 'Company', href: null,
    children: [
      { label: 'About',    href: '/about' },
      { label: 'Reviews',  href: '/reviews' },
      { label: 'FAQs',     href: '/faqs' },
      { label: 'Careers',  href: '/careers' },
      { label: 'Blogs',    href: '/blog' },
      { label: 'Contact',  href: '/contact' },
    ],
  },
  {
    label: 'Services', href: null,
    children: [
      { label: 'AI & ML Solutions',      href: '/services/ai-ml' },
      { label: 'Custom Web Development', href: '/services/web-development' },
      { label: 'UI/UX Design',           href: '/services/ui-ux-design' },
      { label: 'Mobile App Development', href: '/services/mobile-development' },
      { label: 'MVP & Product Strategy', href: '/services/mvp-strategy' },
      { label: 'SaaS Solutions',         href: '/services/saas' },
    ],
  },
  {
    label: 'Technologies', href: null,
    children: [
      { label: 'AI & Machine Learning', href: '/technologies/ai-ml' },
      { label: 'Frontend Development',  href: '/technologies/frontend' },
      { label: 'Backend Development',   href: '/technologies/backend' },
      { label: 'Mobile Development',    href: '/technologies/mobile' },
      { label: 'Databases',             href: '/technologies/databases' },
      { label: 'DevOps & Cloud',        href: '/technologies/devops' },
    ],
  },
  {
    label: 'Industries', href: null,
    children: [
      { label: 'Healthcare',  href: '/industries/healthcare' },
      { label: 'Education',   href: '/industries/education' },
      { label: 'Real Estate', href: '/industries/real-estate' },
      { label: 'Blockchain',  href: '/industries/blockchain' },
      { label: 'Fintech',     href: '/industries/fintech' },
      { label: 'Logistics',   href: '/industries/logistics' },
    ],
  },
]

// ─── chevron svg (matches reference exactly) ─────────────────────────────────
function ChevronDown() {
  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 1L7 7L1 1" stroke="#111212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── close icon ───────────────────────────────────────────────────────────────
function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="#111212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke="#111212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── accordion item ───────────────────────────────────────────────────────────
function AccordionItem({
  item,
  onClose,
}: {
  item: typeof mobileNav[number]
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)

  if (!item.children) {
    return (
      <div>
        <button className="w-full flex justify-between items-center text-[28px] font-semibold leading-[28px] text-left">
          <Link href={item.href!} onClick={onClose} className="text-[#111212]">
            {item.label}
          </Link>
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center text-[28px] font-semibold leading-[28px] text-left"
      >
        <span className="text-[#111212]">{item.label}</span>
        <div className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronDown />
        </div>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? `${item.children.length * 44}px` : '0px', opacity: open ? 1 : 0 }}
      >
        <ul className="flex flex-col gap-[12px] pt-[12px]">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onClose}
                className="text-[20px] font-semibold leading-[20px] text-black"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── mobile drawer ────────────────────────────────────────────────────────────
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-[9998] transition-opacity duration-300 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[80%] sm:max-w-[400px] bg-white z-[9999] flex flex-col px-[16px] transition-transform duration-300 md:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* header row */}
        <div className="flex items-center justify-between py-[20px]">
          <Link href="/" onClick={onClose} aria-label="Go to homepage" className="font-bold text-xl text-[#111212]">
            Thrill Edge
          </Link>
          <button onClick={onClose} aria-label="close menu">
            <CloseIcon />
          </button>
        </div>

        {/* nav accordion */}
        <nav className="flex flex-col gap-[24px] overflow-y-auto overflow-x-hidden py-[16px] flex-1">
          {mobileNav.map((item) => (
            <AccordionItem key={item.label} item={item} onClose={onClose} />
          ))}
        </nav>

        {/* CTA pinned to bottom */}
        <div className="py-[16px]">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex flex-row items-center justify-center gap-1 px-[24px] pt-[14px] pb-[12px] bg-black text-white text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <span>Book a call</span>
          </Link>
        </div>
      </div>
    </>
  )
}

// ─── header ───────────────────────────────────────────────────────────────────
export function Header() {
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore()

  return (
    <>
      <header className="bg-white sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-[#111212] hover:text-primary transition-colors">
              Thrill Edge
            </Link>

            {/* Desktop mega menu */}
            <MegaMenu />

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="flex items-center justify-center px-[24px] pt-[14px] pb-[12px] bg-black text-white text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
              >
                Book a call
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg transition-colors"
              aria-label="open menu"
            >
              <Menu size={24} color="#111212" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawerrendered outside header so it can be truly fixed */}
      <MobileDrawer open={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
