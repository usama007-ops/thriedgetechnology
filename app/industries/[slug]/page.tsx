import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { WorkSection } from "@/components/sections/work-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import ValuePropositionSection from "@/components/sections/value-proposition";
import { LatestArticlesSection } from "@/components/sections/latest-articles-section";
import { PageHero } from "@/components/common/page-hero";
import { cn } from "@/lib/utils";

interface IndustryData {
  title: string;
  headline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  stats: { number: string; label: string }[];
  challenges: { title: string; desc: string }[];
  solutions: { title: string; desc: string }[];
  image: string;
  workIndustry: string;
}

const INDUSTRIES: Record<string, IndustryData> = {
  healthcare: {
    title: "Healthcare",
    headline:
      "HIPAA-compliant software that improves patient outcomes and reduces operational overhead.",
    description:
      "We build custom healthcare software including EHR integrations, patient portals, telemedicine platforms, and clinical workflow tools that meet the strictest compliance standards while delivering exceptional user experiences for clinicians and patients alike.",
    metaTitle:
      "Healthcare Software Development Company | HIPAA-Compliant Solutions | Thrill Edge",
    metaDescription:
      "Custom healthcare software development: EHR integrations, patient portals, telemedicine apps, and HIPAA-compliant platforms. Trusted by healthcare providers across the US, UK, and Australia.",
    keywords: [
      "healthcare software development",
      "HIPAA compliant app development",
      "EHR integration",
      "patient portal development",
      "telemedicine app development",
      "medical software company",
      "health tech solutions",
    ],
    stats: [
      { number: "30+", label: "Healthcare products shipped" },
      { number: "100%", label: "HIPAA compliance on every build" },
      { number: "4.9", label: "Average client satisfaction score" },
    ],
    challenges: [
      {
        title: "Regulatory Compliance",
        desc: "Healthcare software must meet HIPAA, HL7, and FHIR standards. We build compliance in from day one, not as an afterthought.",
      },
      {
        title: "Legacy System Integration",
        desc: "Most healthcare providers run on legacy EHR systems. We specialize in integrating modern interfaces with existing clinical infrastructure.",
      },
      {
        title: "Data Security",
        desc: "Patient data is the most sensitive data there is. Our security architecture includes end-to-end encryption, audit logging, and role-based access control.",
      },
      {
        title: "Clinical Workflow Complexity",
        desc: "Healthcare workflows are complex and high-stakes. We embed with clinical teams to understand real workflows before writing a single line of code.",
      },
      {
        title: "Interoperability",
        desc: "Siloed systems cost lives and money. We build FHIR-compliant APIs that let your systems talk to each other and to third-party platforms.",
      },
      {
        title: "Scalability Under Load",
        desc: "Healthcare platforms see unpredictable traffic spikes. Our cloud-native architecture scales automatically to handle peak demand without downtime.",
      },
    ],
    solutions: [
      {
        title: "EHR & EMR Integration",
        desc: "Seamless integration with Epic, Cerner, Allscripts, and other major EHR platforms using HL7 FHIR APIs.",
      },
      {
        title: "Patient Portal Development",
        desc: "Secure, accessible patient portals for appointment scheduling, medical records access, and provider communication.",
      },
      {
        title: "Telemedicine Platforms",
        desc: "End-to-end telehealth solutions with video consultations, e-prescriptions, and real-time patient monitoring.",
      },
      {
        title: "Clinical Decision Support",
        desc: "AI-powered tools that surface relevant patient data and evidence-based recommendations at the point of care.",
      },
      {
        title: "Medical Device Software",
        desc: "FDA-compliant software for connected medical devices, wearables, and remote patient monitoring systems.",
      },
      {
        title: "Healthcare Analytics",
        desc: "Population health dashboards and predictive analytics that help providers identify at-risk patients and optimize care delivery.",
      },
    ],
    image: "/healthcare.jfif",
    workIndustry: "healthcare",
  },
  education: {
    title: "Education",
    headline:
      "EdTech platforms that drive real learning outcomes, not just engagement metrics.",
    description:
      "We build custom education technology including LMS platforms, adaptive learning tools, student information systems, and virtual classrooms that help institutions deliver better learning experiences at scale.",
    metaTitle:
      "EdTech Software Development Company | LMS & E-Learning Solutions | Thrill Edge",
    metaDescription:
      "Custom education software development: LMS platforms, adaptive learning tools, virtual classrooms, and student portals. Built for K-12, higher education, and corporate training.",
    keywords: [
      "edtech software development",
      "LMS development company",
      "e-learning platform development",
      "custom learning management system",
      "education app development",
      "virtual classroom software",
      "student portal development",
    ],
    stats: [
      { number: "20+", label: "EdTech platforms delivered" },
      { number: "500K+", label: "Students on our platforms" },
      { number: "40%", label: "Average improvement in completion rates" },
    ],
    challenges: [
      {
        title: "Learner Engagement",
        desc: "Keeping students engaged in digital environments is hard. We design learning experiences backed by behavioral science and UX research.",
      },
      {
        title: "Accessibility & Inclusion",
        desc: "Education platforms must work for every learner. We build to WCAG standards and support assistive technologies across all devices.",
      },
      {
        title: "Content Scalability",
        desc: "Managing thousands of courses and millions of learners requires robust content architecture. We design systems that scale without breaking.",
      },
      {
        title: "Assessment Integrity",
        desc: "Online assessments face unique integrity challenges. We implement proctoring integrations and adaptive question banks to maintain standards.",
      },
      {
        title: "LMS Integration",
        desc: "Most institutions already have tools in place. We integrate with Canvas, Moodle, Blackboard, and other LMS platforms via LTI and xAPI.",
      },
      {
        title: "Data Privacy (FERPA/COPPA)",
        desc: "Student data is protected by strict regulations. Our platforms are built FERPA and COPPA compliant from the ground up.",
      },
    ],
    solutions: [
      {
        title: "Custom LMS Development",
        desc: "Fully branded learning management systems with course authoring, progress tracking, and certification management.",
      },
      {
        title: "Adaptive Learning Platforms",
        desc: "AI-driven platforms that personalize content delivery based on individual learner performance and preferences.",
      },
      {
        title: "Virtual Classroom Tools",
        desc: "Real-time collaborative learning environments with video, whiteboarding, breakout rooms, and attendance tracking.",
      },
      {
        title: "Student Information Systems",
        desc: "Centralized SIS platforms for enrollment, grading, scheduling, and parent/guardian communication.",
      },
      {
        title: "Corporate Training Platforms",
        desc: "Onboarding and upskilling platforms for enterprise teams with completion tracking, compliance modules, and reporting.",
      },
      {
        title: "EdTech Mobile Apps",
        desc: "Cross-platform mobile learning apps that work offline and sync progress when connectivity is restored.",
      },
    ],
    image: "/education2.jpg",
    workIndustry: "education",
  },
  "real-estate": {
    title: "Real Estate",
    headline:
      "PropTech solutions that close deals faster and manage properties smarter.",
    description:
      "We build custom real estate software including property listing platforms, CRM systems, virtual tour tools, and property management applications that give agents, developers, and property managers a competitive edge.",
    metaTitle:
      "Real Estate Software Development Company | PropTech Solutions | Thrill Edge",
    metaDescription:
      "Custom real estate software development: property listing platforms, CRM systems, virtual tours, and property management apps. Built for agents, developers, and property managers.",
    keywords: [
      "real estate software development",
      "proptech development company",
      "property listing platform",
      "real estate CRM development",
      "virtual tour software",
      "property management software",
      "MLS integration development",
    ],
    stats: [
      { number: "25+", label: "PropTech products shipped" },
      { number: "2M+", label: "Property listings managed" },
      { number: "35%", label: "Average reduction in time-to-close" },
    ],
    challenges: [
      {
        title: "MLS & Data Integration",
        desc: "Real estate data is fragmented across hundreds of MLS systems. We build robust integrations that aggregate and normalize listing data in real time.",
      },
      {
        title: "Search & Discovery UX",
        desc: "Property search is complex. We build map-based search, advanced filters, and AI-powered recommendations that surface the right properties.",
      },
      {
        title: "Transaction Complexity",
        desc: "Real estate transactions involve multiple parties and documents. We digitize and streamline the entire transaction workflow.",
      },
      {
        title: "Virtual Experiences",
        desc: "Buyers expect immersive digital experiences. We build 3D virtual tours, AR staging tools, and interactive floor plans.",
      },
      {
        title: "Lead Management",
        desc: "Real estate leads come from dozens of sources. We build CRM integrations and lead routing systems that ensure no opportunity falls through the cracks.",
      },
      {
        title: "Compliance & Documentation",
        desc: "Real estate is heavily regulated. Our platforms handle e-signatures, disclosure management, and audit trails for every transaction.",
      },
    ],
    solutions: [
      {
        title: "Property Listing Platforms",
        desc: "Full-featured listing portals with MLS integration, advanced search, saved searches, and lead capture.",
      },
      {
        title: "Real Estate CRM",
        desc: "Custom CRM systems built for agents and brokerages with pipeline management, automated follow-ups, and deal tracking.",
      },
      {
        title: "Virtual Tour & 3D Visualization",
        desc: "Immersive property experiences with 360-degree tours, AR staging, and interactive floor plans.",
      },
      {
        title: "Property Management Software",
        desc: "End-to-end property management platforms for landlords and managers covering leases, maintenance, and tenant communication.",
      },
      {
        title: "Investment Analytics",
        desc: "Data-driven tools for real estate investors with cap rate calculators, market analysis, and portfolio performance dashboards.",
      },
      {
        title: "Transaction Management",
        desc: "Digital transaction platforms with e-signatures, document management, and milestone tracking for buyers, sellers, and agents.",
      },
    ],
    image: "/Realstate.jpg",
    workIndustry: "real-estate",
  },
  blockchain: {
    title: "Blockchain",
    headline:
      "Production-ready blockchain applications built for trust, transparency, and scale.",
    description:
      "We build custom blockchain solutions including smart contracts, DeFi platforms, NFT marketplaces, and enterprise blockchain applications that solve real business problems with decentralized technology.",
    metaTitle:
      "Blockchain Development Company | Smart Contracts & DeFi Solutions | Thrill Edge",
    metaDescription:
      "Custom blockchain development: smart contracts, DeFi platforms, NFT marketplaces, and enterprise blockchain apps. Ethereum, Solana, and Polygon specialists.",
    keywords: [
      "blockchain development company",
      "smart contract development",
      "DeFi platform development",
      "NFT marketplace development",
      "Web3 development company",
      "Ethereum development",
      "Solana development",
      "enterprise blockchain solutions",
    ],
    stats: [
      { number: "40+", label: "Blockchain products shipped" },
      { number: "$500M+", label: "Total value locked in our contracts" },
      { number: "0", label: "Smart contract exploits on audited code" },
    ],
    challenges: [
      {
        title: "Smart Contract Security",
        desc: "A single vulnerability in a smart contract can cost millions. We follow rigorous audit processes and formal verification for every contract we deploy.",
      },
      {
        title: "Gas Optimization",
        desc: "High transaction costs kill user adoption. We optimize every contract for minimal gas consumption without sacrificing functionality.",
      },
      {
        title: "Cross-Chain Compatibility",
        desc: "The blockchain ecosystem is fragmented. We build cross-chain bridges and multi-chain architectures that work across Ethereum, Solana, Polygon, and more.",
      },
      {
        title: "Scalability",
        desc: "Public blockchains have throughput limits. We architect Layer 2 solutions and off-chain computation strategies that scale to millions of users.",
      },
      {
        title: "User Onboarding",
        desc: "Web3 UX is notoriously difficult. We design wallet-abstracted onboarding flows that make blockchain apps accessible to mainstream users.",
      },
      {
        title: "Regulatory Uncertainty",
        desc: "Blockchain regulation is evolving fast. We build compliance-ready architectures that can adapt to KYC/AML requirements across jurisdictions.",
      },
    ],
    solutions: [
      {
        title: "Smart Contract Development",
        desc: "Audited, gas-optimized smart contracts on Ethereum, Solana, Polygon, and other EVM-compatible chains.",
      },
      {
        title: "DeFi Platform Development",
        desc: "Decentralized exchanges, lending protocols, yield farming platforms, and liquidity management tools.",
      },
      {
        title: "NFT Marketplace Development",
        desc: "Full-featured NFT marketplaces with minting, trading, royalty management, and creator tools.",
      },
      {
        title: "Enterprise Blockchain",
        desc: "Private and consortium blockchain networks for supply chain, identity management, and document verification.",
      },
      {
        title: "Web3 Frontend & Wallet Integration",
        desc: "React-based dApps with MetaMask, WalletConnect, and Phantom integrations for seamless user experiences.",
      },
      {
        title: "Tokenization Platforms",
        desc: "Asset tokenization infrastructure for real estate, commodities, and securities with compliant token standards.",
      },
    ],
    image: "/blockchain2.png",
    workIndustry: "blockchain",
  },
  fintech: {
    title: "Fintech",
    headline:
      "Secure, compliant financial software that moves money and manages risk at scale.",
    description:
      "We build custom fintech solutions including payment platforms, lending software, wealth management tools, and banking infrastructure that meet the highest standards of security, compliance, and performance.",
    metaTitle:
      "Fintech Software Development Company | Payment & Banking Solutions | Thrill Edge",
    metaDescription:
      "Custom fintech software development: payment platforms, lending software, wealth management tools, and open banking APIs. PCI-DSS and SOC 2 compliant development.",
    keywords: [
      "fintech software development",
      "payment platform development",
      "banking software development",
      "lending software development",
      "wealth management software",
      "PCI DSS compliant development",
      "open banking API development",
      "financial technology company",
    ],
    stats: [
      { number: "$2B+", label: "Transactions processed annually" },
      { number: "99.99%", label: "Payment uptime across our platforms" },
      { number: "100%", label: "PCI-DSS compliance on payment builds" },
    ],
    challenges: [
      {
        title: "Regulatory Compliance",
        desc: "Fintech operates under PCI-DSS, SOC 2, GDPR, and jurisdiction-specific regulations. We build compliance into the architecture, not the backlog.",
      },
      {
        title: "Fraud Prevention",
        desc: "Financial fraud is sophisticated and evolving. We integrate ML-based fraud detection that adapts to new attack patterns in real time.",
      },
      {
        title: "Payment Infrastructure",
        desc: "Building reliable payment rails requires deep expertise in Stripe, Plaid, ACH, SWIFT, and card network APIs. We have shipped it all.",
      },
      {
        title: "Real-time Processing",
        desc: "Financial transactions cannot wait. We architect low-latency systems that process payments, trades, and transfers in milliseconds.",
      },
      {
        title: "Data Security",
        desc: "Financial data is a prime target. Our security stack includes encryption at rest and in transit, tokenization, and zero-trust network architecture.",
      },
      {
        title: "Legacy Core Banking",
        desc: "Most banks run on decades-old core systems. We specialize in building modern API layers over legacy infrastructure without disrupting operations.",
      },
    ],
    solutions: [
      {
        title: "Payment Platform Development",
        desc: "End-to-end payment processing platforms with multi-currency support, split payments, and real-time reconciliation.",
      },
      {
        title: "Digital Banking & Neobank",
        desc: "Full-stack neobank platforms with account management, card issuance, and open banking API integrations.",
      },
      {
        title: "Lending & Credit Software",
        desc: "Loan origination systems, credit scoring engines, and loan management platforms for consumer and business lending.",
      },
      {
        title: "Wealth Management Tools",
        desc: "Portfolio management platforms, robo-advisors, and investment analytics dashboards for retail and institutional clients.",
      },
      {
        title: "RegTech & Compliance",
        desc: "KYC/AML automation, transaction monitoring, and regulatory reporting tools that reduce compliance overhead.",
      },
      {
        title: "Open Banking APIs",
        desc: "PSD2-compliant open banking APIs that enable account aggregation, payment initiation, and financial data sharing.",
      },
    ],
    image: "/fintech2.png",
    workIndustry: "fintech",
  },
  logistics: {
    title: "Logistics",
    headline:
      "Supply chain and logistics software that cuts costs and delivers on time, every time.",
    description:
      "We build custom logistics software including fleet management systems, warehouse management platforms, route optimization tools, and supply chain visibility dashboards that give logistics companies a measurable operational edge.",
    metaTitle:
      "Logistics Software Development Company | Supply Chain & Fleet Management | Thrill Edge",
    metaDescription:
      "Custom logistics software development: fleet management, warehouse management, route optimization, and supply chain visibility platforms. Built for 3PLs, carriers, and shippers.",
    keywords: [
      "logistics software development",
      "supply chain software development",
      "fleet management software",
      "warehouse management system development",
      "route optimization software",
      "freight technology company",
      "last mile delivery software",
      "3PL software development",
    ],
    stats: [
      { number: "15+", label: "Logistics platforms shipped" },
      { number: "25%", label: "Average reduction in delivery costs" },
      { number: "1M+", label: "Shipments tracked daily on our platforms" },
    ],
    challenges: [
      {
        title: "Real-time Visibility",
        desc: "Shippers and customers demand live tracking. We build real-time GPS tracking and event-driven status updates across the entire shipment lifecycle.",
      },
      {
        title: "Route Optimization",
        desc: "Inefficient routes waste fuel and time. We integrate AI-powered route optimization that accounts for traffic, capacity, time windows, and driver hours.",
      },
      {
        title: "System Integration",
        desc: "Logistics ecosystems involve ERPs, TMS, WMS, and carrier APIs. We build the integration layer that makes them all work together.",
      },
      {
        title: "Warehouse Efficiency",
        desc: "Manual warehouse processes create bottlenecks. We build WMS platforms with barcode scanning, pick-path optimization, and inventory accuracy tools.",
      },
      {
        title: "Carrier & Partner Networks",
        desc: "Managing hundreds of carriers and partners requires robust onboarding and data exchange. We build EDI and API integrations for the full carrier network.",
      },
      {
        title: "Demand Forecasting",
        desc: "Inventory mismatches cost money. We build ML-powered demand forecasting tools that reduce stockouts and overstock situations.",
      },
    ],
    solutions: [
      {
        title: "Fleet Management Systems",
        desc: "Real-time vehicle tracking, driver management, maintenance scheduling, and fuel monitoring for fleets of any size.",
      },
      {
        title: "Warehouse Management Software",
        desc: "End-to-end WMS with receiving, putaway, picking, packing, and shipping workflows optimized for your operation.",
      },
      {
        title: "Route Optimization Platforms",
        desc: "AI-powered routing engines that minimize distance, fuel, and time while meeting delivery time windows.",
      },
      {
        title: "Supply Chain Visibility",
        desc: "End-to-end shipment tracking dashboards with exception management, ETA predictions, and carrier performance analytics.",
      },
      {
        title: "Last Mile Delivery Software",
        desc: "Driver apps, customer notification systems, and proof-of-delivery tools for the final leg of the supply chain.",
      },
      {
        title: "Freight & TMS Platforms",
        desc: "Transportation management systems with load planning, carrier selection, freight audit, and payment automation.",
      },
    ],
    image: "/logistic.jpg",
    workIndustry: "logistics",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES[slug];
  if (!industry) return {};
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    keywords: industry.keywords,
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      type: "website",
      url: `https://thrilledge.com/industries/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: industry.metaTitle,
      description: industry.metaDescription,
    },
    alternates: {
      canonical: `https://thrilledge.com/industries/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(INDUSTRIES).map((slug) => ({ slug }));
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = INDUSTRIES[slug];
  if (!industry) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${industry.title} Software Development`,
    description: industry.description,
    provider: {
      "@type": "Organization",
      name: "Thrill Edge Technologies",
      url: "https://thrilledge.com",
    },
    url: `https://thrilledge.com/industries/${slug}`,
    areaServed: ["GB", "US", "AU", "CA"],
  };

  return (
    <div className={cn('relative', 'bg-[#F3F3F3]')}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* <PageHero
        label={industry.title + ' Software Development'}
        title={industry.headline}
        bgColor="#111212"
      /> */}

      <section className={cn("w-full", "mx-auto", "p-2")}>
        <div className={cn('relative', 'rounded-[20px]', 'w-full', 'h-[480px]', 'overflow-hidden')}>
          <Image
            src={industry.image}
            alt={industry.title}
            fill
            className={cn('object-center', 'object-cover')}
            sizes="100vw"
            priority
          />
          <div
            className={cn("absolute", "inset-0", "rounded-[20px]")}
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.6), rgba(0,0,0,0))",
            }}
          />
        
            <div
              className={cn(
                "max-w-[1440px]",
                "mx-auto",
                "absolute",
                "bottom-0",
                "left-0",
                "right-0",
                "flex",
                "lg:flex-row",
                "flex-col",
                "justify-between",
                "lg:items-end",
                "gap-4",
                "lg:px-9",
                "px-5",
                "lg:py-8",
                "py-6",
              )}
            >
              <h2
                className={cn(
                  "text-[32px]",
                  "lg:text-[56px]",
                  "lg:leading-[60px]",
                  "leading-9",
                  "font-mont",
                  "font-semibold",
                  "text-white",
                  "max-w-2xl",
                )}
              >
                {industry.title} Software Development
              </h2>
              <p
                className={cn(
                  "lg:text-[18px]",
                  "text-[15px]",
                  "font-inter",
                  "text-white/70",
                  "lg:max-w-xs",
                  "leading-7",
                )}
              >
                {industry.description.slice(0, 140)}...
              </p>
           
      
        </div>
         </div>
      </section>

      <div className={cn('gap-[20px]', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'mx-auto', 'mt-12', 'px-[16px]', 'md:px-[36px]', 'pb-[64px]', 'w-full', 'max-w-[1440px]')}>
        {industry.stats.map((s, i) => (
          <div
            key={i}
            className={cn('flex', 'flex-col', 'gap-[4px]', 'px-[24px]', 'py-[32px]', 'border-[#CCCCCC]', 'border-l', 'first:border-l-0', 'text-center')}
          >
            <p className={cn('font-mont', 'font-semibold', 'text-[40px]', 'text-black', 'xl:text-[80px]', 'xl:leading-[80px]')}>
              {s.number}
            </p>
            <p className={cn('font-inter', 'text-[#929296]', 'text-[14px]')}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className={cn('mx-auto', 'px-[16px]', 'md:px-[36px]', 'pb-[96px]', 'w-full', 'max-w-[1440px]')}>
        <p className={cn('max-w-[800px]', 'font-inter', 'text-[#555]', 'text-[20px]', 'leading-[32px]')}>
          {industry.description}
        </p>
      </div>

      <div className={cn('bg-white', 'w-full')}>
        <div className={cn('mx-auto', 'px-[16px]', 'md:px-[36px]', 'py-[96px]', 'w-full', 'max-w-[1440px]')}>
          <div className={cn('flex', 'md:flex-row', 'flex-col', 'justify-between', 'md:items-end', 'gap-[32px]', 'mb-[64px]')}>
            <h2 className={cn('max-w-[560px]', 'font-mont', 'font-bold', 'text-[#111212]', 'text-[48px]', 'leading-[52px]')}>
              Challenges we solve in {industry.title}
            </h2>
            <p className={cn('max-w-[400px]', 'font-inter', 'text-[#929296]', 'text-[16px]')}>
              Deep domain expertise means we understand your problems before you
              explain them.
            </p>
          </div>
          <div className={cn('gap-[2px]', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'bg-[#e5e5e5]')}>
            {industry.challenges.map((item, i) => (
              <div
                key={i}
                className={cn('flex', 'flex-col', 'gap-[16px]', 'bg-white', 'hover:bg-[#F3F3F3]', 'p-[32px]', 'transition-colors', 'duration-300')}
              >
                <span className={cn('font-inter', 'tabular-nums', 'text-[#929296]', 'text-[13px]')}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={cn('font-mont', 'font-semibold', 'text-[#111212]', 'text-[20px]')}>
                  {item.title}
                </h3>
                <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[24px]')}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={cn('mx-auto', 'px-[16px]', 'md:px-[36px]', 'py-[96px]', 'w-full', 'max-w-[1440px]')}>
        <div className={cn('flex', 'md:flex-row', 'flex-col', 'justify-between', 'md:items-end', 'gap-[32px]', 'mb-[64px]')}>
          <h2 className={cn('max-w-[560px]', 'font-mont', 'font-bold', 'text-[#111212]', 'text-[48px]', 'leading-[52px]')}>
            What we build for {industry.title}
          </h2>
          <p className={cn('max-w-[400px]', 'font-inter', 'text-[#929296]', 'text-[16px]')}>
            Production-ready software tailored to the specific demands of your
            industry.
          </p>
        </div>
        <div className={cn('gap-[20px]', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')}>
          {industry.solutions.map((item, i) => (
            <div
              key={i}
              className={cn('flex', 'flex-col', 'gap-[16px]', 'bg-white', 'p-[32px]', 'border', 'border-[#e5e5e5]', 'hover:border-[#111212]', 'rounded-[16px]', 'transition-colors', 'duration-300')}
            >
              <span className={cn('font-inter', 'tabular-nums', 'text-[#929296]', 'text-[13px]')}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={cn('font-mont', 'font-semibold', 'text-[#111212]', 'text-[20px]')}>
                {item.title}
              </h3>
              <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[24px]')}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ValuePropositionSection />

      {/* <div className="bg-[#F3F3F3]">
        <Suspense fallback={null}>
          <WorkSection show={3} />
        </Suspense>
      </div> */}

      <div className="bg-white">
        <ProcessSection />
      </div>

      <Suspense fallback={null}>
        <TestimonialsSection show={8} />
      </Suspense>

      <div className="bg-[#F3F3F3]">
        <Suspense fallback={null}>
          <ServicesSection show={6} />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <LatestArticlesSection show={3} />
      </Suspense>

      <div className={cn('bg-[#111212]', 'w-full')}>
        <div className={cn('flex', 'md:flex-row', 'flex-col', 'justify-between', 'md:items-center', 'gap-[48px]', 'mx-auto', 'px-[16px]', 'md:px-[36px]', 'py-[96px]', 'w-full', 'max-w-[1440px]')}>
          <div className={cn('flex', 'flex-col', 'gap-[16px]', 'max-w-[600px]')}>
            <h2 className={cn('font-mont', 'font-bold', 'text-[48px]', 'text-white', 'leading-[52px]')}>
              Building something in {industry.title}?
            </h2>
            <p className={cn('font-inter', 'text-[#929296]', 'text-[16px]', 'leading-[24px]')}>
              We have shipped production software in your industry. Lets talk
              about your project.
            </p>
          </div>
          <div className={cn('flex', 'sm:flex-row', 'flex-col', 'gap-[16px]')}>
            <Link
              href="/contact"
              className={cn('flex', 'justify-center', 'items-center', 'bg-white', 'px-[32px]', 'py-[16px]', 'rounded-full', 'font-mont', 'font-semibold', 'text-[#111212]', 'text-[16px]', 'hover:scale-105', 'transition-all', 'duration-300')}
            >
              Start a project
            </Link>
            <Link
              href="/work"
              className={cn('flex', 'justify-center', 'items-center', 'hover:bg-white', 'px-[32px]', 'py-[16px]', 'border', 'border-white', 'rounded-full', 'font-mont', 'font-semibold', 'text-[16px]', 'text-white', 'hover:text-[#111212]', 'transition-all', 'duration-300')}
            >
              See our work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
