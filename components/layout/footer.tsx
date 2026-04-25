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
        <div className="w-full lg:grid grid-cols-1 grid-cols-[40%_60%] gap-8">
          {/* LOGO + DESC */}
          <div className="flex flex-col gap-4 text-white md:pr-20">
            <Image src="/Thrill Edge.png" width={180} height={60} alt="logo" />
            <p className=" leading-relaxed text-sm text-white/40">
              Thrill Edge Technologies delivers innovative web, mobile, and AI
              solutions, transforming ideas into scalable, high-impact software
              products.
            </p>

            <div className="flex items-center gap-9 mt-2">
              <Link target="_blank" href="https://www.facebook.com/ThrillEdge" className="p-2 rounded-full bg-[#1A1A1A] hover:bg-white/10 transition">
                <Facebook size={18} />
              </Link>

              <Link target="_blank" href="https://www.linkedin.com/company/thrill-edge-technologies/?viewAsMember=true" className="p-2 rounded-full bg-[#1A1A1A] hover:bg-white/10 transition">
                <Linkedin size={18} />
              </Link>

              <Link target="_blank" href="https://www.instagram.com/thrilledge_technologies/" className="p-2 rounded-full bg-[#1A1A1A] hover:bg-white/10 transition">
                <Instagram size={18} />
              </Link>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 lg:mt-0">
            {/* COMPANY */}
            <div className="flex flex-col gap-4">
              <p className="text-lg text-white font-semibold">Company</p>
              <ul className="flex flex-col gap-2 text-white">
                <li>
                  <Link className="text-sm text-white/40" href="/about">About</Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/client-reviews">Reviews</Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/faqs">FAQs</Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/careers">Careers</Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/blog">Blogs</Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/contact">Contact</Link>
                </li>
               
                <li>
                  <Link className="text-sm text-white/40" href="/project-cost-estimation">
                    Project Time Estimator
                  </Link>
                </li>
               
              </ul>
            </div>

            {/* SERVICES */}
            <div className="flex flex-col gap-4">
              <p className="text-lg font-semibold text-white">Services</p>
              <ul className="flex flex-col gap-2 text-white">
                <li>
                  <Link className="text-sm text-white/40" href="/services/ai-ml-solutions">
                    AI & ML Solutions
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/services/custom-web-development">
                    Custom Web Development
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/services/ui-ux-design">UI/UX Design</Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/services/mobile-app-development">
                    Mobile App Development
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/services/mvp-product-strategy">
                    MVP & Product Strategy
                  </Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/services/saas-solutions">SaaS Solutions</Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/services/shopify-plus-agency">
                    Shopify Plus Agency
                  </Link>
                </li>
              </ul>
            </div>

            {/* INDUSTRIES */}
            <div className="flex flex-col gap-4">
              <p className="text-lg font-semibold text-white">Industries</p>
              <ul className="flex flex-col gap-2 text-white">
                <li>
                  <Link className="text-sm text-white/40" href="/industries/healthcare">Healthcare</Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/industries/education">Education</Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/industries/real-estate">Real Estate</Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/industries/blockchain">Blockchain</Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/industries/fintech">Fintech</Link>
                </li>
                <li>
                  <Link className="text-sm text-white/40" href="/industries/logistics">Logistics</Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-[#313131]" />

        {/* Bottom */}
        <div className="w-full flex lg:flex-row flex-col-reverse gap-4 items-center justify-between text-sm">
          <span className="text-sm text-white/40">
            © {currentYear} Thrill Edge Technologies. All rights reserved.
          </span>

          <div className="flex gap-3 text-white">
            <Link className="text-sm text-white/40" href="/sitemap.xml">Sitemap</Link>
            <Link className="text-sm text-white/40" href="/privacy-policy">Privacy Policy</Link>
            <Link className="text-sm text-white/40" href="/terms-condition">Terms & Conditions</Link>
            <Link className="text-sm text-white/40" href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}