import Link from "next/link";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("w-full", "bg-[#111212]")}>
      <div
        className={cn(
          "max-w-[1440px]",
          "mx-auto",
          "flex",
          "flex-col",
          "gap-10",
          "md:px-9",
          "px-4",
          "pt-12",
          "pb-5",
        )}
      >
        {/* GRID */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[40%_60%] gap-8">
          {/* LOGO + DESC */}
          <div className="flex flex-col gap-4 text-white md:pr-20">
            <Image src="/Thrill Edge.png" width={180} height={60} alt="logo" />
            <p className=" leading-relaxed text-lg text-white">
              Thrill Edge Technologies delivers innovative web, mobile, and AI
              solutions, transforming ideas into scalable, high-impact software
              products.
            </p>

            <div className="flex items-center gap-9 mt-2">
              <Link href="https://www.facebook.com/ThrillEdge" className="p-2 rounded-full bg-[#1A1A1A] hover:bg-white/10 transition">
                <Facebook size={18} />
              </Link>

              <Link href="https://www.linkedin.com/company/thrill-edge-technologies/?viewAsMember=true" className="p-2 rounded-full bg-[#1A1A1A] hover:bg-white/10 transition">
                <Linkedin size={18} />
              </Link>

              <Link href="https://www.instagram.com/thrilledge_technologies/" className="p-2 rounded-full bg-[#1A1A1A] hover:bg-white/10 transition">
                <Instagram size={18} />
              </Link>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* COMPANY */}
            <div className="flex flex-col gap-4">
              <p className="text-sm text-[#929296]">Company</p>
              <ul className="flex flex-col gap-2 text-white">
                <li>
                  <Link href="/about-us">About</Link>
                </li>
                <li>
                  <Link href="/client-reviews">Reviews</Link>
                </li>
                <li>
                  <Link href="/faqs">FAQs</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/blog">Blogs</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
               
                <li>
                  <Link href="/project-cost-estimation">
                    Project Time Estimator
                  </Link>
                </li>
                <li>
                  <Link href="/for-ai">For AI Crawlers</Link>
                </li>
              </ul>
            </div>

            {/* SERVICES */}
            <div className="flex flex-col gap-4">
              <p className="text-sm text-[#929296]">Services</p>
              <ul className="flex flex-col gap-2 text-white">
                <li>
                  <Link href="/services/ai-and-ml-solutions">
                    AI & ML Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services/custom-web-development">
                    Custom Web Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/ui-ux-design">UI/UX Design</Link>
                </li>
                <li>
                  <Link href="/services/mobile-app-development">
                    Mobile App Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/mvp-product-strategy">
                    MVP & Product Strategy
                  </Link>
                </li>
                <li>
                  <Link href="/services/saas-solutions">SaaS Solutions</Link>
                </li>
                <li>
                  <Link href="/services/shopify-plus-agency">
                    Shopify Plus Agency
                  </Link>
                </li>
              </ul>
            </div>

            {/* INDUSTRIES */}
            <div className="flex flex-col gap-4">
              <p className="text-sm text-[#929296]">Industries</p>
              <ul className="flex flex-col gap-2 text-white">
                <li>
                  <Link href="/industries/healthcare">Healthcare</Link>
                </li>
                <li>
                  <Link href="/industries/education">Education</Link>
                </li>
                <li>
                  <Link href="/industries/real-estate">Real Estate</Link>
                </li>
                <li>
                  <Link href="/industries/blockchain">Blockchain</Link>
                </li>
                <li>
                  <Link href="/industries/fintech">Fintech</Link>
                </li>
                <li>
                  <Link href="/industries/logistics">Logistics</Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-[#313131]" />

        {/* Bottom */}
        <div className="w-full flex sm:flex-row flex-col-reverse gap-4 items-center justify-between text-sm">
          <span className="text-[#929296]">
            © {currentYear} Thrill Edge Technologies. All rights reserved.
          </span>

          <div className="flex gap-3 text-white">
            <Link href="/sitemap.xml">Sitemap</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-condition">Terms & Conditions</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}