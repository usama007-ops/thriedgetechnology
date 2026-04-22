import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { WorkSection } from '@/components/sections/work-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ProcessSection } from '@/components/sections/process-section'
import { ValueFeaturesSection } from '@/components/sections/value-features-section'
import { IndustriesSection } from '@/components/sections/industries-section'
import ValuePropositionSection from '@/components/sections/value-proposition'
import { PageHero } from '@/components/common/page-hero'
import { cn } from '@/lib/utils'

interface TechData {
  title: string
  headline: string
  description: string
  stats: { number: string; label: string }[]
  tools: { name: string; icon: string }[]
  capabilities: { title: string; desc: string }[]
  image: string
  workIndustry?: string
}

const TECHNOLOGIES: Record<string, TechData> = {
  'ai-machine-learning': {
    title: 'AI & Machine Learning',
    headline: 'Intelligent systems that learn, adapt, and drive real business outcomes.',
    description: 'We build production-grade AI and ML solutions, from custom model training to intelligent automation, that turn your data into a competitive advantage.',
    stats: [
      { number: '20+', label: 'AI models shipped to production' },
      { number: '98%', label: 'Model accuracy on client projects' },
      { number: '3x', label: 'Average efficiency gain' },
    ],
    tools: [
      { name: 'Python', icon: '/python.svg' },
      { name: 'TensorFlow', icon: '/tensorflow.svg' },
      { name: 'PyTorch', icon: '/pytorch.svg' },
      { name: 'OpenAI', icon: '/openai.svg' },
      { name: 'LangChain', icon: '/langchain.svg' },
      { name: 'Hugging Face', icon: '/huggingface.svg' },
      { name: 'AWS SageMaker', icon: '/aws.svg' },
      { name: 'Scikit-learn', icon: '/scikitlearn.svg' },
      { name: 'n8n', icon: '/n8n.svg' },
      { name: 'Docker', icon: '/docker.svg' },
      { name: 'Node.js', icon: '/nodejs.svg' },
      { name: 'PostgreSQL', icon: '/postgresql.svg' },
    ],
    capabilities: [
      { title: 'Custom Model Training', desc: 'We train and fine-tune models on your proprietary data for domain-specific accuracy that off-the-shelf APIs cannot match.' },
      { title: 'LLM Integration', desc: 'We integrate large language models into your products, chatbots, document processing, semantic search, and more.' },
      { title: 'Computer Vision', desc: 'Image classification, object detection, and visual inspection systems built for real-world production environments.' },
      { title: 'Predictive Analytics', desc: 'Forecasting models that help you anticipate demand, detect anomalies, and make data-driven decisions at scale.' },
      { title: 'MLOps & Deployment', desc: 'End-to-end ML pipelines with monitoring, retraining, and CI/CD so your models stay accurate over time.' },
      { title: 'RAG & Knowledge Bases', desc: 'Retrieval-augmented generation systems that ground AI responses in your own documents and data sources.' },
    ],
    image: '/ai.png',
    workIndustry: 'ai',
  },
  'frontend-development': {
    title: 'Frontend Development',
    headline: 'Interfaces that are fast, accessible, and built to convert.',
    description: 'We craft pixel-perfect, high-performance frontends using React, Next.js, and Vue.js, designed for real users and optimized for every device.',
    stats: [
      { number: '150+', label: 'Frontend projects delivered' },
      { number: '<1s', label: 'Average page load time' },
      { number: '100', label: 'Lighthouse performance scores' },
    ],
    tools: [
      { name: 'React', icon: '/react.svg' },
      { name: 'Next.js', icon: '/nextjs.svg' },
      { name: 'Vue.js', icon: '/vuejs.svg' },
      { name: 'TypeScript', icon: '/typescript.svg' },
      { name: 'Tailwind CSS', icon: '/tailwind.svg' },
      { name: 'Framer Motion', icon: '/framer.svg' },
      { name: 'GraphQL', icon: '/graphql.svg' },
      { name: 'WordPress', icon: '/wordpress.svg' },
      { name: 'REST API', icon: '/api.svg' },
      { name: 'Supabase', icon: '/supabase.svg' },
      { name: 'Firebase', icon: '/firebase.svg' },
      { name: 'Expo', icon: '/expo.svg' },
    ],
    capabilities: [
      { title: 'React & Next.js Apps', desc: 'Server-side rendered and statically generated applications that load fast and rank well in search engines.' },
      { title: 'Design System Implementation', desc: 'We translate Figma designs into reusable component libraries with consistent tokens, variants, and documentation.' },
      { title: 'Performance Optimization', desc: 'Core Web Vitals tuning, code splitting, lazy loading, and image optimization to hit top Lighthouse scores.' },
      { title: 'Micro-Frontend Architecture', desc: 'Scalable frontend architectures that let multiple teams ship independently without stepping on each other.' },
      { title: 'Animation & Interaction', desc: 'Smooth, purposeful animations using Framer Motion and GSAP that enhance UX without hurting performance.' },
      { title: 'Accessibility (a11y)', desc: 'WCAG-aligned implementations with keyboard navigation, screen reader support, and semantic HTML throughout.' },
    ],
    image: '/frontenddevelopment.png',
  },
  'backend-development': {
    title: 'Backend Development',
    headline: 'Scalable, secure APIs and systems that power your product at any scale.',
    description: 'We build the infrastructure behind great products, robust APIs, microservices, and data pipelines using Node.js, Python, Go, and more.',
    stats: [
      { number: '99.9%', label: 'Uptime SLA on production systems' },
      { number: '10M+', label: 'API requests handled daily' },
      { number: '50ms', label: 'Median API response time' },
    ],
    tools: [
      { name: 'Node.js', icon: '/nodejs.svg' },
      { name: 'Python', icon: '/python.svg' },
      { name: 'Go', icon: '/go.svg' },
      { name: 'GraphQL', icon: '/graphql.svg' },
      { name: 'REST APIs', icon: '/api.svg' },
      { name: 'Docker', icon: '/docker.svg' },
      { name: 'Kubernetes', icon: '/kubernetes.svg' },
      { name: 'AWS', icon: '/aws.svg' },
      { name: 'Redis', icon: '/redis.svg' },
      { name: 'PostgreSQL', icon: '/postgresql.svg' },
      { name: 'MongoDB', icon: '/mongodb.svg' },
      { name: 'Firebase', icon: '/firebase.svg' },
    ],
    capabilities: [
      { title: 'REST & GraphQL APIs', desc: 'Well-documented, versioned APIs designed for developer experience and built to handle production traffic from day one.' },
      { title: 'Microservices Architecture', desc: 'Decomposed service architectures that scale independently, deploy safely, and isolate failures.' },
      { title: 'Authentication & Security', desc: 'OAuth2, JWT, RBAC, and zero-trust security patterns baked into every system we build.' },
      { title: 'Real-time Systems', desc: 'WebSocket and event-driven architectures for live dashboards, notifications, and collaborative features.' },
      { title: 'Background Jobs & Queues', desc: 'Reliable job processing with Bull, Celery, or SQS for async workflows that never drop a task.' },
      { title: 'Third-party Integrations', desc: 'Stripe, Twilio, SendGrid, Salesforce, we integrate the tools your business runs on cleanly and reliably.' },
    ],
    image: '/backend.png',
  },
  'mobile-development': {
    title: 'Mobile Development',
    headline: 'Native and cross-platform apps that users actually keep on their phones.',
    description: 'We build iOS and Android apps with Flutter and React Native, performant, polished, and shipped on time.',
    stats: [
      { number: '50+', label: 'Mobile apps shipped' },
      { number: '4.8', label: 'Average App Store rating' },
      { number: '2M+', label: 'Active users across our apps' },
    ],
    tools: [
      { name: 'React Native', icon: '/react.svg' },
      { name: 'Flutter', icon: '/flutter.svg' },
      { name: 'Swift', icon: '/swift.svg' },
      { name: 'Kotlin', icon: '/kotlin.svg' },
      { name: 'Expo', icon: '/expo.svg' },
      { name: 'Firebase', icon: '/firebase.svg' },
      { name: 'App Store', icon: '/appstore.svg' },
      { name: 'Play Store', icon: '/playstore.svg' },
      { name: 'TypeScript', icon: '/typescript.svg' },
      { name: 'GraphQL', icon: '/graphql.svg' },
      { name: 'Supabase', icon: '/supabase.svg' },
      { name: 'Node.js', icon: '/nodejs.svg' },
    ],
    capabilities: [
      { title: 'Cross-Platform with Flutter', desc: 'Single codebase, native performance. Flutter lets us ship iOS and Android simultaneously without compromising on feel.' },
      { title: 'React Native Apps', desc: 'JavaScript-based cross-platform development with access to native modules for camera, biometrics, and push notifications.' },
      { title: 'Native iOS & Android', desc: 'When performance and platform-specific features matter most, we build fully native with Swift and Kotlin.' },
      { title: 'Offline-First Architecture', desc: 'Apps that work without a connection and sync seamlessly when back online, critical for field and enterprise use cases.' },
      { title: 'App Store Optimization', desc: 'We handle submission, metadata, screenshots, and ASO strategy to maximize visibility and conversion on both stores.' },
      { title: 'Push Notifications & Analytics', desc: 'Firebase, OneSignal, and Mixpanel integrations to keep users engaged and give you visibility into behavior.' },
    ],
    image: '/mobi.png',
  },
  databases: {
    title: 'Databases',
    headline: 'Data architectures designed for reliability, speed, and scale.',
    description: 'We design, optimize, and migrate database systems, SQL and NoSQL, that keep your data safe, fast, and queryable at any volume.',
    stats: [
      { number: '100TB+', label: 'Data managed across client systems' },
      { number: '5ms', label: 'Median query response time' },
      { number: '99.99%', label: 'Data durability guarantee' },
    ],
    tools: [
      { name: 'PostgreSQL', icon: '/postgresql.svg' },
      { name: 'MongoDB', icon: '/mongodb.svg' },
      { name: 'Redis', icon: '/redis.svg' },
      { name: 'MySQL', icon: '/mysql.svg' },
      { name: 'Elasticsearch', icon: '/elasticsearch.svg' },
      { name: 'Supabase', icon: '/supabase.svg' },
      { name: 'PlanetScale', icon: '/planetscale.svg' },
      { name: 'DynamoDB', icon: '/dynamodb.svg' },
      { name: 'Firebase', icon: '/firebase.svg' },
      { name: 'GraphQL', icon: '/graphql.svg' },
      { name: 'Node.js', icon: '/nodejs.svg' },
      { name: 'Python', icon: '/python.svg' },
    ],
    capabilities: [
      { title: 'Schema Design & Modeling', desc: 'Normalized relational schemas and document models designed for your query patterns, not just your data shape.' },
      { title: 'Performance Tuning', desc: 'Index optimization, query analysis, and caching strategies that eliminate slow queries before they hit production.' },
      { title: 'Database Migrations', desc: 'Zero-downtime migrations from legacy systems to modern databases with full data integrity validation.' },
      { title: 'Replication & High Availability', desc: 'Read replicas, failover clusters, and multi-region setups that keep your data available even when things go wrong.' },
      { title: 'Search & Analytics', desc: 'Elasticsearch and vector database integrations for full-text search, semantic search, and real-time analytics.' },
      { title: 'Backup & Disaster Recovery', desc: 'Automated backup strategies, point-in-time recovery, and tested restore procedures for every production system.' },
    ],
    image: '/database.png',
  },
  'ai-workflow-automation': {
    title: 'AI Workflow Automation',
    headline: 'Intelligent pipelines that eliminate manual work and accelerate your operations.',
    description: 'We design and build AI-powered workflow automation systems using agents, LLMs, and intelligent pipelines that reduce manual effort, cut operational costs, and scale your business without scaling headcount.',
    stats: [
      { number: '80%', label: 'Reduction in manual processing time' },
      { number: '10x', label: 'Faster workflow execution' },
      { number: '60%', label: 'Average operational cost savings' },
    ],
    tools: [
      { name: 'LangChain', icon: '/langchain.svg' },
      { name: 'OpenAI', icon: '/openai.svg' },
      { name: 'Python', icon: '/python.svg' },
      { name: 'n8n', icon: '/n8n.svg' },
      { name: 'Zapier', icon: '/zapier.png' },
      { name: 'AWS Lambda', icon: '/aws.svg' },
      { name: 'Docker', icon: '/docker.svg' },
      { name: 'Node.js', icon: '/nodejs.svg' },
      { name: 'PostgreSQL', icon: '/postgresql.svg' },
      { name: 'Redis', icon: '/redis.svg' },
      { name: 'Hugging Face', icon: '/huggingface.svg' },
      { name: 'Scikit-learn', icon: '/scikitlearn.svg' },
    ],
    capabilities: [
      { title: 'AI Agent Development', desc: 'We build autonomous AI agents that reason, plan, and execute multi-step tasks across your tools and data sources without human intervention.' },
      { title: 'LLM-Powered Document Processing', desc: 'Automated extraction, classification, and routing of documents, contracts, invoices, and forms using large language models.' },
      { title: 'Business Process Automation', desc: 'End-to-end automation of repetitive workflows across CRM, ERP, and internal tools, freeing your team for high-value work.' },
      { title: 'Intelligent Data Pipelines', desc: 'AI-enhanced ETL pipelines that clean, enrich, and route data in real time, keeping your systems in sync automatically.' },
      { title: 'Custom Workflow Orchestration', desc: 'Bespoke orchestration layers built on LangChain, Temporal, or custom engines that coordinate complex multi-step processes reliably.' },
      { title: 'Monitoring & Observability', desc: 'Full visibility into your automated workflows with alerting, audit trails, and dashboards so you always know what your AI is doing.' },
    ],
    image: '/ai.png',
    workIndustry: 'ai',
  },
  'cloud-devops': {
    title: 'Cloud & DevOps',
    headline: 'Infrastructure that deploys fast, scales automatically, and never goes down.',
    description: 'We architect and manage cloud infrastructure on AWS, GCP, and Azure — with CI/CD pipelines, container orchestration, and observability built in from day one.',
    stats: [
      { number: '99.9%', label: 'Uptime across cloud deployments' },
      { number: '5x', label: 'Faster release cycles with CI/CD' },
      { number: '40%', label: 'Average infrastructure cost reduction' },
    ],
    tools: [
      { name: 'AWS', icon: '/aws.svg' },
      { name: 'Docker', icon: '/docker.svg' },
      { name: 'Kubernetes', icon: '/kubernetes.svg' },
      { name: 'Redis', icon: '/redis.svg' },
      { name: 'PostgreSQL', icon: '/postgresql.svg' },
      { name: 'Python', icon: '/python.svg' },
      { name: 'Node.js', icon: '/nodejs.svg' },
      { name: 'MongoDB', icon: '/mongodb.svg' },
      { name: 'Elasticsearch', icon: '/elasticsearch.svg' },
      { name: 'MySQL', icon: '/mysql.svg' },
      { name: 'GraphQL', icon: '/graphql.svg' },
      { name: 'Go', icon: '/go.svg' },
    ],
    capabilities: [
      { title: 'Cloud Architecture Design', desc: 'We design scalable, cost-efficient cloud architectures on AWS, GCP, and Azure tailored to your traffic patterns and compliance requirements.' },
      { title: 'CI/CD Pipeline Setup', desc: 'Automated build, test, and deploy pipelines using GitHub Actions, GitLab CI, or CircleCI so every commit ships safely and fast.' },
      { title: 'Container Orchestration', desc: 'Docker and Kubernetes setups with auto-scaling, rolling deployments, and health checks that keep your services running under load.' },
      { title: 'Infrastructure as Code', desc: 'Terraform and Pulumi configurations that make your infrastructure reproducible, version-controlled, and auditable.' },
      { title: 'Monitoring & Alerting', desc: 'Datadog, Grafana, and CloudWatch dashboards with smart alerting so you catch issues before your users do.' },
      { title: 'Security & Compliance', desc: 'IAM policies, VPC configuration, secrets management, and SOC 2 / GDPR-aligned infrastructure hardening.' },
    ],
    image: '/backend.png',
  },
  'blockchain-web3': {
    title: 'Blockchain & Web3',
    headline: 'Decentralised applications, smart contracts, and token ecosystems built to last.',
    description: 'We build production-grade Web3 products — from DeFi protocols and NFT platforms to enterprise blockchain solutions — with security and scalability at the core.',
    stats: [
      { number: '15+', label: 'Web3 products shipped' },
      { number: '$50M+', label: 'Total value locked in our contracts' },
      { number: '0', label: 'Smart contract exploits on our audited code' },
    ],
    tools: [
      { name: 'Blockchain', icon: '/blockchain.svg' },
      { name: 'React', icon: '/react.svg' },
      { name: 'Next.js', icon: '/nextjs.svg' },
      { name: 'TypeScript', icon: '/typescript.svg' },
      { name: 'Node.js', icon: '/nodejs.svg' },
      { name: 'Python', icon: '/python.svg' },
      { name: 'PostgreSQL', icon: '/postgresql.svg' },
      { name: 'MongoDB', icon: '/mongodb.svg' },
      { name: 'AWS', icon: '/aws.svg' },
      { name: 'Docker', icon: '/docker.svg' },
      { name: 'GraphQL', icon: '/graphql.svg' },
      { name: 'Redis', icon: '/redis.svg' },
    ],
    capabilities: [
      { title: 'Smart Contract Development', desc: 'Solidity and Rust smart contracts written with security-first patterns, thoroughly tested, and ready for third-party audit.' },
      { title: 'DeFi Protocol Engineering', desc: 'AMMs, lending protocols, yield optimisers, and staking systems built with economic security and gas efficiency in mind.' },
      { title: 'NFT Platforms & Marketplaces', desc: 'End-to-end NFT infrastructure — minting contracts, metadata pipelines, royalty systems, and marketplace UIs.' },
      { title: 'Web3 Frontend Integration', desc: 'React and Next.js frontends with wallet connection (MetaMask, WalletConnect), on-chain reads, and transaction flows.' },
      { title: 'Token Design & Launch', desc: 'ERC-20 / SPL token architecture, vesting schedules, governance modules, and launchpad integrations.' },
      { title: 'Smart Contract Auditing', desc: 'Manual and automated security reviews covering reentrancy, access control, integer overflow, and economic attack vectors.' },
    ],
    image: '/blockchain2.png',
  },
  'ecommerce-cms': {
    title: 'E-commerce & CMS',
    headline: 'Storefronts and content platforms that convert visitors into customers.',
    description: 'We build high-converting e-commerce experiences and headless CMS architectures on Shopify, WordPress, Webflow, and custom stacks — fast, flexible, and built to scale.',
    stats: [
      { number: '3x', label: 'Average conversion uplift post-launch' },
      { number: '80+', label: 'E-commerce & CMS projects delivered' },
      { number: '<1s', label: 'Storefront load time on optimised builds' },
    ],
    tools: [
      { name: 'WordPress', icon: '/wordpress.svg' },
      { name: 'React', icon: '/react.svg' },
      { name: 'Next.js', icon: '/nextjs.svg' },
      { name: 'TypeScript', icon: '/typescript.svg' },
      { name: 'Tailwind CSS', icon: '/tailwind.svg' },
      { name: 'GraphQL', icon: '/graphql.svg' },
      { name: 'Supabase', icon: '/supabase.svg' },
      { name: 'Node.js', icon: '/nodejs.svg' },
      { name: 'PostgreSQL', icon: '/postgresql.svg' },
      { name: 'MongoDB', icon: '/mongodb.svg' },
      { name: 'REST API', icon: '/api.svg' },
      { name: 'Firebase', icon: '/firebase.svg' },
    ],
    capabilities: [
      { title: 'Shopify Development', desc: 'Custom Shopify themes, app integrations, and Hydrogen storefronts built for performance and conversion.' },
      { title: 'Headless Commerce', desc: 'Decoupled storefronts using Next.js with Shopify, WooCommerce, or custom backends for maximum flexibility and speed.' },
      { title: 'WordPress & WooCommerce', desc: 'Bespoke WordPress themes, Gutenberg blocks, and WooCommerce extensions tailored to your brand and workflow.' },
      { title: 'Webflow Development', desc: 'Pixel-perfect Webflow builds with CMS collections, custom interactions, and clean handoff to your marketing team.' },
      { title: 'Headless CMS Integration', desc: 'Contentful, Sanity, and Strapi integrations that give editors full control without touching code.' },
      { title: 'Performance & SEO', desc: 'Core Web Vitals optimisation, structured data, and technical SEO baked into every storefront we ship.' },
    ],
    image: '/services.png',
  },
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tech = TECHNOLOGIES[slug]
  if (!tech) return {}
  return {
    title: `${tech.title} | Thrill Edge Technologies`,
    description: tech.description,
    alternates: { canonical: `https://thrilledge.com/technologies/${slug}` },
    openGraph: {
      title: `${tech.title} | Thrill Edge Technologies`,
      description: tech.description,
      type: 'website',
      url: `https://thrilledge.com/technologies/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tech.title} | Thrill Edge Technologies`,
      description: tech.description,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(TECHNOLOGIES).map((slug) => ({ slug }))
}

export default async function TechnologyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tech = TECHNOLOGIES[slug]
  if (!tech) notFound()

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: tech.title,
    description: tech.description,
    provider: { '@type': 'Organization', name: 'Thrill Edge Technologies', url: 'https://thrilledge.com' },
    url: `https://thrilledge.com/technologies/${slug}`,
    areaServed: ['GB', 'US', 'AU', 'CA'],
  }

  return (
    <div className={cn('relative', 'bg-[#F3F3F3] pb-24')}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {/* <PageHero
        label={tech.title}
        title={tech.headline}
        bgColor="#111212"
      /> */}

      <section className={cn('w-full', 'mx-auto', 'p-2')}>
        <div className={cn('relative', 'rounded-[20px]', 'w-full', 'h-[300px]', 'lg:h-[480px]', 'overflow-hidden')}>
          <Image
            src={tech.image}
            alt={tech.title}

            fill
            className={cn('object-center', 'object-cover')}
            sizes="100vw"
            priority
          />
          <div
            className={cn('absolute', 'inset-0', 'rounded-[20px]')}
            style={{ background: 'linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.6), rgba(0,0,0,0))' }}
          />
          <div className={cn('absolute', 'bottom-0', 'left-0', 'max-w-360', 'right-0', 'flex', 'lg:flex-row', 'flex-col', 'justify-between', 'lg:items-end', 'gap-4', 'lg:px-9', 'px-5', 'lg:py-8', 'py-6', 'mx-auto')}>
            <div className="flex flex-col gap-4">
              <span className={cn('text-sm', 'font-inter', 'text-white/70')}>{tech.title}</span>
              <h2 className={cn('text-[32px]', 'lg:text-[56px]', 'lg:leading-[60px]', 'leading-9', 'font-mont', 'font-semibold', 'text-white', 'max-w-2xl')}>
                {tech.headline}
              </h2>
            </div>
            <p className={cn('lg:text-[18px]', 'text-[15px]', 'font-inter', 'text-white/70', 'lg:max-w-xs', 'leading-7')}>
              {tech.description.slice(0, 140)}...
            </p>
          </div>
        </div>
      </section>

      <div className={cn('gap-[20px]', 'text-center', 'mt-20', 'grid', 'grid-cols-3', 'mx-auto', 'md:px-[36px]', 'pb-[64px]', 'w-full', 'max-w-[1440px]')}>
        {tech.stats.map((s, i) => (
          <div key={i} className={cn('flex', 'flex-col', 'gap-[4px]', 'px-[10px]', 'md:py-[32px]', 'border-[#CCCCCC]', 'border-l', 'first:border-l-0')}>
            <p className={cn('font-mont', 'font-semibold', 'text-[34px]', 'text-black', 'xl:text-[80px]', 'xl:leading-[80px]')}>{s.number}</p>
            <p className={cn('font-inter', 'text-[#929296]', 'text-[12px]')}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className={cn('mx-auto', 'px-[16px]', 'md:px-[36px]', 'pb-[96px]', 'w-full', 'mt-10', 'max-w-[1440px]')}>
        <p className={cn('max-w-[800px]', 'font-inter', 'text-[#555]', 'text-[20px]', 'leading-[32px]')}>{tech.description}</p>
      </div>

      {/* Capabilities */}
      <div className={cn('bg-white', 'w-full')}>
        <div className={cn('mx-auto', 'px-[16px]', 'md:px-[36px]', 'py-[96px]', 'w-full', 'max-w-[1440px]')}>
          <h2 className={cn('mb-[64px]', 'max-w-[600px]', 'font-mont', 'font-bold', 'text-[#111212]', 'text-[48px]', 'leading-[52px]')}>
            What we build with {tech.title}
          </h2>
          <div className={cn('gap-[2px]', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'bg-[#e5e5e5]')}>
            {tech.capabilities.map((cap, i) => (
              <div key={i} className={cn('flex', 'flex-col', 'gap-[16px]', 'bg-white', 'hover:bg-[#F3F3F3]', 'p-[32px]', 'transition-colors', 'duration-300')}>
                <span className={cn('font-inter', 'tabular-nums', 'text-[#929296]', 'text-[13px]')}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={cn('font-mont', 'font-semibold', 'text-[#111212]', 'text-[20px]')}>{cap.title}</h3>
                <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[24px]')}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools & Stack */}
      <div className={cn('mx-auto', 'px-[16px]', 'md:px-[36px]', 'py-[96px]', 'w-full', 'max-w-[1440px]')}>
        <div className={cn('flex', 'md:flex-row', 'flex-col', 'justify-between', 'md:items-end', 'gap-[32px]', 'mb-[48px]')}>
          <h2 className={cn('max-w-[500px]', 'font-mont', 'font-bold', 'text-[#111212]', 'text-[48px]', 'leading-[52px]')}>
            Our {tech.title} stack
          </h2>
          <p className={cn('max-w-[400px]', 'font-inter', 'text-[#929296]', 'text-[16px]')}>
            Tools and frameworks we use in production, chosen for reliability, performance, and developer experience.
          </p>
        </div>
        <div className={cn('gap-[16px]', 'grid', 'grid-cols-2', 'sm:grid-cols-4')}>
          {tech.tools.map((tool) => (
            <div key={tool.name} className={cn('flex', 'flex-col', 'items-center', 'gap-[12px]', 'bg-white', 'p-[24px]', 'border', 'border-[#e5e5e5]', 'hover:border-[#111212]', 'rounded-[16px]', 'transition-colors', 'duration-300')}>
              <div className={cn('relative', 'w-[40px]', 'h-[40px]')}>
                <Image src={tool.icon} alt={tool.name} fill sizes="40px" className="object-contain" />
              </div>
              <p className={cn('font-mont', 'font-semibold', 'text-[#111212]', 'text-[14px]', 'text-center')}>{tool.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Value Proposition */}
      <ValuePropositionSection />

      {/* Work Section */}
      {/* <div className="bg-[#F3F3F3]">
        <Suspense fallback={null}>
          <WorkSection show={3} industry={tech.workIndustry} />
        </Suspense>
      </div> */}

      {/* Process Section */}
      <div className="bg-white">
        <ProcessSection />
      </div>

      {/* Testimonials */}
      <Suspense fallback={null}>
        <TestimonialsSection show={8} />
      </Suspense>

      {/* Value Features */}
      <div className="bg-[#F3F3F3]">
        <ValueFeaturesSection />
      </div>

      {/* Industries */}
      <IndustriesSection />

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
  )
}
