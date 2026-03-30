import Link from "next/link";
import Image from "next/image";

export default function Footer() {
const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#111212]">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center md:gap-12 gap-8 md:px-9 px-4 pt-12 pb-5">

        {/* Links Grid */}
        <div className="w-full flex sm:flex-row flex-col flex-wrap justify-between gap-5">

          {/* Company */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#929296]">Company</p>
            <ul className="flex flex-col gap-2 text-white">
              <li><Link href="/about-us">About</Link></li>
              <li><Link href="/client-reviews">Reviews</Link></li>
              <li><Link href="/faqs">FAQs</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/blogs">Blogs</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/partners">Partners</Link></li>
              <li><Link href="/project-cost-estimation">Project Time Estimator</Link></li>
              <li><Link href="/for-ai">For AI Crawlers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#929296]">Services</p>
            <ul className="flex flex-col gap-2 text-white">
              <li><Link href="/services/ai-and-ml-solutions">AI & ML Solutions</Link></li>
              <li><Link href="/services/custom-web-development">Custom Web Development</Link></li>
              <li><Link href="/services/ui-ux-design">UI/UX Design</Link></li>
              <li><Link href="/services/mobile-app-development">Mobile App Development</Link></li>
              <li><Link href="/services/mvp-and-product-strategy">MVP & Product Strategy</Link></li>
              <li><Link href="/services/saas-solutions">SaaS Solutions</Link></li>
              <li><Link href="/services/shopify-plus-agency">Shopify Plus Agency</Link></li>
            </ul>
          </div>

          {/* Industries */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#929296]">Industries</p>
            <ul className="flex flex-col gap-2 text-white">
              <li><Link href="/industries/healthcare">Healthcare</Link></li>
              <li><Link href="/industries/education">Education</Link></li>
              <li><Link href="/industries/real-estate">Real Estate</Link></li>
              <li><Link href="/industries/blockchain">Blockchain</Link></li>
              <li><Link href="/industries/fintech">Fintech</Link></li>
              <li><Link href="/industries/logistics">Logistics</Link></li>
            </ul>
          </div>

          {/* Technologies */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#929296]">Technologies</p>
            <ul className="flex flex-col gap-2 text-white">
              <li><Link href="/technologies/machine-learning">AI & Machine Learning</Link></li>
              <li><Link href="/technologies/frontend-development">Frontend Development</Link></li>
              <li><Link href="/technologies/backend-development">Backend Development</Link></li>
              <li><Link href="/technologies/mobile-development">Mobile Development</Link></li>
              <li><Link href="/technologies/databases">Databases</Link></li>
              <li><Link href="/technologies/devops">DevOps & Cloud</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#929296]">Socials</p>
            <ul className="flex flex-col gap-2 text-white">
              <li>
                <Link href="#" target="_blank">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" target="_blank">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" target="_blank">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" target="_blank">
                  LinkedIn
                </Link>
              </li>
            </ul>
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
            <Link href="/sitemap-0.xml">Sitemap</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-condition">Terms & Conditions</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
