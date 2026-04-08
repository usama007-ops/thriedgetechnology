# Thrill Edge Technologies — Official Website

> **"We Ship Software That Actually Works."**

The official website for [Thrill Edge Technologies](https://thrilledge.com) — a custom software development company building production-grade web, mobile, and AI products for startups and enterprises across the US, UK, Australia, and Canada.

---

## About Thrill Edge Technologies

Founded in 2012, Thrill Edge Technologies has shipped 50+ products for clients across healthcare, fintech, eCommerce, real estate, blockchain, education, and logistics.

We keep teams small and senior. Every engineer on your project has shipped production code in your stack before — no handoffs to juniors after kickoff.

**By the numbers:**
- 4.9★ on Clutch (68 verified reviews)
- 5.0★ on Google
- 50+ products shipped since 2012
- 15+ years of combined engineering experience
- Active projects across 8 countries

**Awards & Recognition:**
Clutch · Awwwards · Design Rush · CSS Winner · Google · Trustpilot

---

## What We Build

| Service | Description |
|---------|-------------|
| AI & ML Solutions | Custom model training, LLM integration, RAG systems, MLOps |
| Custom Web Development | Next.js, React, Node.js — fast, scalable, SEO-ready |
| UI/UX Design | Figma to production, design systems, accessibility-first |
| Mobile App Development | Flutter, React Native, Swift, Kotlin |
| MVP & Product Strategy | Zero to launched in weeks, not months |
| SaaS Solutions | Multi-tenant architecture, billing, onboarding flows |
| Shopify Plus Agency | Custom storefronts, apps, and integrations |

**Industries:** Healthcare · Fintech · Real Estate · Blockchain · Education · Logistics

---

## Tech Stack (This Website)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | WordPress (Headless) |
| Cache | Redis via Upstash |
| Deployment | Vercel |
| Analytics | Vercel Analytics |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Access to `.env.local` values (ask team lead)

### Installation

```bash
git clone https://github.com/YOUR_ORG/thrilledge-website.git
cd thrilledge-website
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_WORDPRESS_URL=https://admin.thrilledge.com
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
REVALIDATE_SECRET=your_secret_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
app/                        → Pages (Next.js App Router)
├── blog/[slug]/            → Blog posts (server wrapper + client component)
├── work/[slug]/            → Case studies
├── services/[slug]/        → Service detail pages
├── industries/[slug]/      → Industry pages
├── technologies/[slug]/    → Technology stack pages
├── careers/                → Job listings + detail + apply
├── api/                    → API routes (apply, estimate, revalidate, cache)
├── sitemap.ts              → Dynamic XML sitemap
└── robots.ts               → robots.txt

components/
├── layout/                 → Header, Footer
├── sections/               → Homepage sections
├── common/                 → PageHero, BlogCard, Marquee, etc.
└── ui/                     → shadcn/ui base components

lib/
├── wordpress.ts            → WordPress REST API client (with retry logic)
├── redis.ts                → Upstash Redis cache
└── utils.ts                → Shared utilities

hooks/                      → React Query data hooks
public/                     → Static assets (images, fonts, SVGs)
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full Git workflow, branch naming conventions, and setup guide for new teammates.

---

## Contact

| | |
|--|--|
| Website | [thrilledge.com](https://thrilledge.com) |
| Email | [info@thrilledge.com](mailto:info@thrilledge.com) |
| Phone | +44 7853 746775 |
| Address | 25 Luke Street, London EC2A 4DS, UK |
| Calendly | [Book a free 30-min call](https://calendly.com/thrilledge-technologies/30min) |

---

© 2026 Thrill Edge Technologies. All rights reserved.
