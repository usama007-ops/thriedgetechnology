import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ProcessSection } from '@/components/sections/process-section'
import { ValueFeaturesSection } from '@/components/sections/value-features-section'
import BrandsMarquee from '@/components/sections/brands'

export const metadata: Metadata = {
  title: 'Technologies | Thrill Edge Technologies',
  description: 'The tech stack we use to build world-class software AI, frontend, backend, mobile, databases, and more.',
  alternates: { canonical: 'https://thrilledge.com/technologies' },
}

const TECHNOLOGIES = [
  {
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    tagline: 'Intelligent systems that learn, adapt, and drive real outcomes.',
    stat: { number: '20+', label: 'AI models in production' },
    tools: ['Python', 'TensorFlow', 'OpenAI', 'LangChain', 'PyTorch', 'Hugging Face', 'Scikit-learn', 'AWS SageMaker'],
    icon: '/ai.png',
    accent: '#6366f1',
  },
  {
    slug: 'frontend-development',
    title: 'Frontend Development',
    tagline: 'Interfaces that are fast, accessible, and built to convert.',
    stat: { number: '150+', label: 'Frontend projects delivered' },
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Vue.js', 'Framer Motion', 'GraphQL', 'WordPress'],
    icon: '/frontenddevelopment.png',
    accent: '#0ea5e9',
  },
  {
    slug: 'backend-development',
    title: 'Backend Development',
    tagline: 'Scalable, secure APIs and systems that power your product.',
    stat: { number: '99.9%', label: 'Uptime SLA' },
    tools: ['Node.js', 'Python', 'Go', 'Docker', 'GraphQL', 'REST API', 'Kubernetes', 'AWS'],
    icon: '/backend.png',
    accent: '#10b981',
  },
  {
    slug: 'mobile-development',
    title: 'Mobile Development',
    tagline: 'Native and cross-platform apps users actually keep.',
    stat: { number: '4.8', label: 'Avg App Store rating' },
    tools: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase', 'App Store', 'Play Store'],
    icon: '/mobi.png',
    accent: '#f59e0b',
  },
  {
    slug: 'databases',
    title: 'Databases',
    tagline: 'Data architectures designed for reliability and scale.',
    stat: { number: '100TB+', label: 'Data managed' },
    tools: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'MySQL', 'Supabase', 'PlanetScale', 'DynamoDB'],
    icon: '/database.png',
    accent: '#ef4444',
  },
  {
    slug: 'ai-workflow-automation',
    title: 'AI Workflow Automation',
    tagline: 'Intelligent pipelines that eliminate manual work and scale operations.',
    stat: { number: '80%', label: 'Reduction in manual processing time' },
    tools: ['LangChain', 'OpenAI', 'Python', 'n8n', 'Zapier', 'AWS Lambda', 'Docker', 'Node.js'],
    icon: '/ai.png',
    accent: '#8b5cf6',
  },

]

const ALL_TOOLS = [
  {
    category: 'Frontend',
    tools: [
      { name: 'React', icon: '/react.svg' },
      { name: 'Next.js', icon: '/nextjs.svg' },
      { name: 'TypeScript', icon: '/typescript.svg' },
      { name: 'Tailwind CSS', icon: '/tailwind.svg' },
      { name: 'Vue.js', icon: '/vuejs.svg' },
      { name: 'Framer Motion', icon: '/framer.svg' },
      { name: 'GraphQL', icon: '/graphql.svg' },
      { name: 'WordPress', icon: '/wordpress.svg' },
      { name: 'REST API', icon: '/api.svg' },
      { name: 'Supabase', icon: '/supabase.svg' },
      { name: 'Firebase', icon: '/firebase.svg' },
      { name: 'Expo', icon: '/expo.svg' },
    ],
  },
  {
    category: 'Backend',
    tools: [
      { name: 'Node.js', icon: '/nodejs.svg' },
      { name: 'Python', icon: '/python.svg' },
      { name: 'Go', icon: '/go.svg' },
      { name: 'GraphQL', icon: '/graphql.svg' },
      { name: 'REST API', icon: '/api.svg' },
      { name: 'Docker', icon: '/docker.svg' },
      { name: 'Kubernetes', icon: '/kubernetes.svg' },
      { name: 'AWS', icon: '/aws.svg' },
      { name: 'Redis', icon: '/redis.svg' },
      { name: 'PostgreSQL', icon: '/postgresql.svg' },
      { name: 'MongoDB', icon: '/mongodb.svg' },
      { name: 'Firebase', icon: '/firebase.svg' },
    ],
  },
  {
    category: 'Mobile',
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
  },
  {
    category: 'Cloud & DevOps',
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
  },
  {
    category: 'Databases',
    tools: [
      { name: 'PostgreSQL', icon: '/postgresql.svg' },
      { name: 'MongoDB', icon: '/mongodb.svg' },
      { name: 'Redis', icon: '/redis.svg' },
      { name: 'MySQL', icon: '/mysql.svg' },
      { name: 'Supabase', icon: '/supabase.svg' },
      { name: 'Elasticsearch', icon: '/elasticsearch.svg' },
      { name: 'PlanetScale', icon: '/planetscale.svg' },
      { name: 'DynamoDB', icon: '/dynamodb.svg' },
      { name: 'Firebase', icon: '/firebase.svg' },
      { name: 'GraphQL', icon: '/graphql.svg' },
      { name: 'Node.js', icon: '/nodejs.svg' },
      { name: 'Python', icon: '/python.svg' },
    ],
  },
  {
    category: 'AI & Automation',
    tools: [
      { name: 'OpenAI', icon: '/openai.svg' },
      { name: 'LangChain', icon: '/langchain.svg' },
      { name: 'TensorFlow', icon: '/tensorflow.svg' },
      { name: 'PyTorch', icon: '/pytorch.svg' },
      { name: 'Hugging Face', icon: '/huggingface.svg' },
      { name: 'Scikit-learn', icon: '/scikitlearn.svg' },
      { name: 'Python', icon: '/python.svg' },
      { name: 'n8n', icon: '/n8n.svg' },
      { name: 'Zapier', icon: '/zapier.png' },
      { name: 'AWS', icon: '/aws.svg' },
      { name: 'Docker', icon: '/docker.svg' },
      { name: 'Node.js', icon: '/nodejs.svg' },
    ],
  },
  {
    category: 'Blockchain & Web3',
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
  },
  {
    category: 'E-commerce & CMS',
    tools: [
      { name: 'WordPress', icon: '/wordpress.svg' },
      { name: 'Next.js', icon: '/nextjs.svg' },
      { name: 'React', icon: '/react.svg' },
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
  },
]

export default function TechnologiesPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="mx-auto p-2 w-full">
        <div className="relative bg-[#111212] rounded-[20px] w-full h-[480px] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          {/* Subtle radial glow */}
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(99,102,241,0.12) 0%, transparent 60%)' }} />
          <div className="right-0 bottom-0 left-0 absolute flex lg:flex-row flex-col justify-between lg:items-end gap-4 mx-auto px-5 lg:px-9 py-8 lg:py-10 max-w-[1440px]">
            <div className="flex flex-col gap-3">
              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.2em]">Our stack</span>
              <h1 className="max-w-2xl font-mont font-bold text-[40px] text-white lg:text-[72px] leading-none">
                Built with the<br />best tools.
              </h1>
            </div>
            <p className="lg:max-w-xs font-inter text-[15px] text-white/50 lg:text-[17px] lg:text-right leading-7">
              We choose technologies for reliability, performance, and developer experience not hype.
            </p>
          </div>
        </div>
      </section>

      {/* Tech cards */}
      <div className="mx-auto px-4 md:px-9 py-20 max-w-[1440px]">
        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {TECHNOLOGIES.map((tech, idx) => (
            <Link key={tech.slug} href={`/technologies/${tech.slug}`}
              className="group flex flex-col bg-white border border-[#e5e5e5] hover:border-[#111212] rounded-[20px] overflow-hidden transition-colors duration-300">

              {/* Image */}
              <div className="relative bg-[#f3f3f3] w-full h-52 overflow-hidden">
                <Image src={tech.icon} alt={tech.title} fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={idx < 3}
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 gap-4 p-6">
                <div className="flex justify-between items-start gap-3">
                  <h2 className="font-mont font-semibold text-[#111212] text-[20px] leading-tight">
                    {tech.title}
                  </h2>
                  <span className="flex justify-center items-center group-hover:bg-[#111212] mt-0.5 border border-[#e5e5e5] group-hover:border-[#111212] rounded-full w-8 h-8 transition-all duration-300 shrink-0">
                    <ArrowUpRight size={14} className="text-[#929296] group-hover:text-white transition-colors duration-300" />
                  </span>
                </div>

                <p className="font-inter text-[#929296] text-[14px] leading-6">
                  {tech.tagline}
                </p>

                {/* Tool pills */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {tech.tools.map(t => (
                    <span key={t} className="bg-[#f3f3f3] px-2.5 py-1 rounded-full font-inter text-[#929296] text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Stat */}
                <div className="mt-auto pt-4 border-[#f3f3f3] border-t">
                  <p className="font-mont font-bold text-[#111212] text-[24px]">{tech.stat.number}</p>
                  <p className="mt-0.5 font-inter text-[#929296] text-[12px]">{tech.stat.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Full stack strip */}
      <div className="bg-[#f3f3f3] w-full">
        <div className="mx-auto px-4 md:px-9 py-16 max-w-[1440px]">
          <div className="flex md:flex-row flex-col justify-between md:items-end gap-6 mb-14">
            <h2 className="max-w-[500px] font-mont font-bold text-[#111212] text-[32px] md:text-[48px] leading-tight">
              Tools we use every day
            </h2>
            <p className="max-w-[360px] font-inter text-[#929296] text-[15px]">
              Chosen for reliability, performance, and developer experience not hype.
            </p>
          </div>
          <div className="flex flex-col gap-12">
            {ALL_TOOLS.map(group => (
              <div key={group.category}>
                <p className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.2em] mb-5">
                  {group.category}
                </p>
                <div className="gap-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
                  {group.tools.map(tool => (
                    <div key={tool.name}
                      className="flex flex-col items-center gap-3 bg-white p-4 border border-[#e5e5e5] hover:border-[#111212] rounded-[16px] transition-colors duration-300">
                      <div className="relative w-8 h-8 shrink-0">
                        <Image src={tool.icon} alt={tool.name} fill sizes="32px" className="object-contain" />
                      </div>
                      <p className="font-inter font-medium text-[#111212] text-[11px] text-center leading-tight">{tool.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brands */}
      <BrandsMarquee />

      {/* Value features */}
      <ValueFeaturesSection />

      {/* Process */}
      <ProcessSection />

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
