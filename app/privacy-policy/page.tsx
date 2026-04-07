import { PageHero } from "@/components/common/page-hero";
import { Metadata } from "next";
import { Mail, Phone, MapPin, Shield, Eye, Share2, Cookie, Clock, UserCheck, Link2, Lock, RefreshCw } from "lucide-react";
import { cn } from "../../lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy | Thrill Edge Technologies",
  description: "Learn how Thrill Edge Technologies collects, uses, and protects your personal information.",
};

const sections = [
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Your Information" },
  { id: "sharing", title: "Sharing Your Information" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "data-retention", title: "Data Retention" },
  { id: "your-rights", title: "Your Rights" },
  { id: "third-party", title: "Third-Party Links" },
  { id: "security", title: "Security" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Us" },
];

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        subtitle="Last updated: April 7, 2026"
      />

      {/* Intro banner */}
      <div className={cn('bg-[#f5f5f5]', 'border-border', 'border-b')}>
        <div className={cn('mx-auto', 'px-4', 'md:px-9', 'py-8', 'max-w-[1440px]')}>
          <p className={cn('max-w-3xl', 'font-inter', 'text-[#444]', 'text-[15px]', 'leading-[1.8]')}>
            Thrill Edge Technologies (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy.
            This policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </div>
      </div>

      <div className={cn('flex', 'lg:flex-row', 'flex-col', 'gap-12', 'mx-auto', 'px-4', 'md:px-9', 'py-16', 'max-w-[1440px]')}>

        {/* Sticky TOC */}
        <aside className={cn('hidden', 'lg:block', 'w-64', 'shrink-0')}>
          <div className={cn('top-24', 'sticky')}>
            <p className={cn('mb-4', 'font-inter', 'font-semibold', 'text-[#999]', 'text-[11px]', 'uppercase', 'tracking-[0.2em]')}>On this page</p>
            <nav className={cn('flex', 'flex-col', 'gap-1')}>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={cn('py-1', 'pl-3', 'border-transparent', 'hover:border-foreground', 'border-l-2', 'font-inter', 'text-[#666]', 'text-[13px]', 'hover:text-foreground', 'transition-colors')}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className={cn('flex-1', 'min-w-0')}>

          <PolicySection id="information-we-collect" icon={<Eye size={18} />} title="1. Information We Collect">
            <p className={cn('mb-6', 'font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              We may collect the following types of information when you interact with our website or services:
            </p>
            <div className={cn('gap-4', 'grid', 'sm:grid-cols-3')}>
              {[
                { label: "Personal Information", desc: "Name, email, phone number, and company details submitted via forms or project inquiries." },
                { label: "Usage Data", desc: "IP address, browser type, pages visited, time on page, and referring URLs — collected automatically." },
                { label: "Cookies", desc: "Small data files stored on your device to improve browsing experience and analyze site traffic." },
              ].map((item) => (
                <div key={item.label} className={cn('bg-[#fafafa]', 'p-5', 'border', 'border-border', 'rounded-xl')}>
                  <p className={cn('mb-2', 'font-mont', 'font-semibold', 'text-[13px]', 'text-foreground')}>{item.label}</p>
                  <p className={cn('font-inter', 'text-[#666]', 'text-[13px]', 'leading-[1.7]')}>{item.desc}</p>
                </div>
              ))}
            </div>
          </PolicySection>

          <PolicySection id="how-we-use" icon={<Shield size={18} />} title="2. How We Use Your Information">
            <p className={cn('mb-4', 'font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>We use collected data to:</p>
            <ul className="space-y-3">
              {[
                "Respond to inquiries and deliver requested services",
                "Send project updates, proposals, and relevant communications",
                "Improve our website and service offerings",
                "Comply with legal obligations",
                "Analyze usage trends and optimize user experience",
              ].map((item) => (
                <li key={item} className={cn('flex', 'items-start', 'gap-3', 'font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.7]')}>
                  <span className={cn('bg-foreground', 'mt-[6px]', 'rounded-full', 'w-1.5', 'h-1.5', 'shrink-0')} />
                  {item}
                </li>
              ))}
            </ul>
          </PolicySection>

          <PolicySection id="sharing" icon={<Share2 size={18} />} title="3. Sharing Your Information">
            <div className={cn('bg-[#fafafa]', 'mb-5', 'p-5', 'border', 'border-border', 'rounded-xl')}>
              <p className={cn('mb-1', 'font-mont', 'font-semibold', 'text-[13px]', 'text-foreground')}>We do not sell your data.</p>
              <p className={cn('font-inter', 'text-[#666]', 'text-[13px]', 'leading-[1.7]')}>
                We never sell, trade, or rent your personal information to third parties.
              </p>
            </div>
            <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              We may share data with trusted service providers (hosting, analytics, email platforms) who assist in operating our website,
              subject to confidentiality agreements. We may also disclose information when required by law or to protect the rights,
              property, or safety of Thrill Edge Technologies, our clients, or others.
            </p>
          </PolicySection>

          <PolicySection id="cookies" icon={<Cookie size={18} />} title="4. Cookies & Tracking">
            <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              We use cookies and similar tracking technologies to enhance your experience. You can instruct your browser to refuse all
              cookies or to indicate when a cookie is being sent. However, some features of our site may not function properly without cookies.
            </p>
          </PolicySection>

          <PolicySection id="data-retention" icon={<Clock size={18} />} title="5. Data Retention">
            <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, or as required
              by law. When no longer needed, data is securely deleted or anonymized.
            </p>
          </PolicySection>

          <PolicySection id="your-rights" icon={<UserCheck size={18} />} title="6. Your Rights">
            <p className={cn('mb-5', 'font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              Depending on your location, you may have the right to:
            </p>
            <div className={cn('gap-3', 'grid', 'sm:grid-cols-2', 'mb-5')}>
              {[
                "Access the personal data we hold about you",
                "Request correction of inaccurate data",
                "Request deletion of your data",
                "Object to or restrict processing of your data",
                "Data portability",
              ].map((right) => (
                <div key={right} className={cn('flex', 'items-center', 'gap-3', 'bg-[#fafafa]', 'px-4', 'py-3', 'border', 'border-border', 'rounded-lg')}>
                  <span className={cn('bg-foreground', 'rounded-full', 'w-1.5', 'h-1.5', 'shrink-0')} />
                  <span className={cn('font-inter', 'text-[#555]', 'text-[13px]')}>{right}</span>
                </div>
              ))}
            </div>
            <p className={cn('font-inter', 'text-[#555]', 'text-[14px]')}>
              To exercise these rights, contact us at{" "}
              <a href="mailto:info@thrilledge.com" className={cn('hover:opacity-70', 'text-foreground', 'underline', 'underline-offset-2', 'transition-opacity')}>
                info@thrilledge.com
              </a>.
            </p>
          </PolicySection>

          <PolicySection id="third-party" icon={<Link2 size={18} />} title="7. Third-Party Links">
            <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites
              and encourage you to review their privacy policies before providing any personal information.
            </p>
          </PolicySection>

          <PolicySection id="security" icon={<Lock size={18} />} title="8. Security">
            <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              We implement industry-standard security measures to protect your information. However, no method of transmission over
              the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </PolicySection>

          <PolicySection id="changes" icon={<RefreshCw size={18} />} title="9. Changes to This Policy">
            <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
              Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </PolicySection>

          {/* Contact section */}
          <div id="contact" className={cn('bg-[#111212]', 'mt-12', 'p-8', 'md:p-10', 'rounded-2xl')}>
            <p className={cn('mb-3', 'font-inter', 'font-semibold', 'text-[11px]', 'text-white/40', 'uppercase', 'tracking-[0.2em]')}>10. Contact Us</p>
            <h2 className={cn('mb-2', 'font-mont', 'font-bold', 'text-white', 'text-2xl')}>Questions about this policy?</h2>
            <p className={cn('mb-8', 'font-inter', 'text-[14px]', 'text-white/50')}>We&apos;re happy to help clarify anything.</p>
            <div className={cn('gap-5', 'grid', 'sm:grid-cols-3')}>
              {[
                { icon: <Mail size={16} />, label: "Email", value: "info@thrilledge.com", href: "mailto:info@thrilledge.com" },
                { icon: <Phone size={16} />, label: "Phone", value: "+44 7853 746775", href: "tel:+447853746775" },
                { icon: <MapPin size={16} />, label: "Address", value: "25 Luke Street, London EC2A 4DS, UK", href: null },
              ].map((item) => (
                <div key={item.label} className={cn('flex', 'flex-col', 'gap-2')}>
                  <div className={cn('flex', 'items-center', 'gap-2', 'text-white/40')}>
                    {item.icon}
                    <span className={cn('font-inter', 'text-[11px]', 'uppercase', 'tracking-widest')}>{item.label}</span>
                  </div>
                  {item.href ? (
                    <a href={item.href} className={cn('font-inter', 'text-[14px]', 'text-white', 'hover:text-white/70', 'transition-colors')}>{item.value}</a>
                  ) : (
                    <span className={cn('font-inter', 'text-[14px]', 'text-white')}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

function PolicySection({ id, icon, title, children }: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn('py-8', 'border-border', 'last:border-0', 'border-b', 'scroll-mt-24')}>
      <div className={cn('flex', 'items-center', 'gap-3', 'mb-5')}>
        <div className={cn('flex', 'justify-center', 'items-center', 'bg-[#f0f0f0]', 'rounded-lg', 'w-8', 'h-8', 'text-foreground', 'shrink-0')}>
          {icon}
        </div>
        <h2 className={cn('font-mont', 'font-bold', 'text-[18px]', 'text-foreground')}>{title}</h2>
      </div>
      {children}
    </section>
  );
}
