import { PageHero } from "@/components/common/page-hero";
import { Metadata } from "next";
import { Mail, Phone, MapPin, CheckCircle2, UserCheck, KeyRound, Ban, Wifi, CreditCard, FileText, Shield, HandshakeIcon, XCircle, Scale, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Thrill Edge Technologies",
  description: "Review the terms of service for using Thrill Edge Technologies' digital products and platforms.",
};

const sections = [
  { id: "agreement", title: "Agreement to Terms" },
  { id: "eligibility", title: "Eligibility" },
  { id: "account", title: "Account Registration" },
  { id: "acceptable-use", title: "Acceptable Use" },
  { id: "availability", title: "Service Availability" },
  { id: "fees", title: "Fees and Billing" },
  { id: "user-content", title: "User Content" },
  { id: "privacy", title: "Privacy" },
  { id: "indemnification", title: "Indemnification" },
  { id: "disclaimer", title: "Disclaimer of Warranties" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "governing-law", title: "Governing Law" },
  { id: "modifications", title: "Modifications" },
  { id: "contact", title: "Contact" },
];

export default function TermsOfService() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms of Service"
        subtitle="Last updated: April 7, 2026"
      />

      {/* Intro banner */}
      <div className="bg-[#f5f5f5] border-border border-b">
        <div className="mx-auto px-4 md:px-9 py-8 max-w-[1440px]">
          <p className="max-w-3xl font-inter text-[#444] text-[15px] leading-[1.8]">
            These Terms of Service apply to your use of any digital products, platforms, or tools provided by Thrill Edge Technologies.
            Please read them carefully before using our services.
          </p>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-12 mx-auto px-4 md:px-9 py-16 max-w-[1440px]">

        {/* Sticky TOC */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="top-24 sticky">
            <p className="mb-4 font-inter font-semibold text-[#999] text-[11px] uppercase tracking-[0.2em]">On this page</p>
            <nav className="flex flex-col gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="py-1 pl-3 border-transparent hover:border-foreground border-l-2 font-inter text-[#666] text-[13px] hover:text-foreground transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">

          <TosSection id="agreement" icon={<CheckCircle2 size={18} />} title="1. Agreement to Terms">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              By accessing or using any Thrill Edge Technologies product or platform, you agree to these Terms of Service.
              If you do not agree, you must discontinue use immediately.
            </p>
          </TosSection>

          <TosSection id="eligibility" icon={<UserCheck size={18} />} title="2. Eligibility">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet
              this requirement and that all information you provide is accurate and complete.
            </p>
          </TosSection>

          <TosSection id="account" icon={<KeyRound size={18} />} title="3. Account Registration">
            <div className="bg-[#fafafa] p-5 border border-border rounded-xl">
              <p className="font-inter text-[#666] text-[13px] leading-[1.7]">
                Some services may require account creation. You are responsible for maintaining the confidentiality of your account
                credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use at{" "}
                <a href="mailto:info@thrilledge.com" className="hover:opacity-70 text-foreground underline underline-offset-2 transition-opacity">
                  info@thrilledge.com
                </a>.
              </p>
            </div>
          </TosSection>

          <TosSection id="acceptable-use" icon={<Ban size={18} />} title="4. Acceptable Use">
            <p className="mb-5 font-inter text-[#555] text-[15px] leading-[1.8]">You agree not to:</p>
            <div className="gap-3 grid sm:grid-cols-2">
              {[
                "Use our services for any unlawful purpose or in violation of any regulations",
                "Attempt to gain unauthorized access to any part of our systems",
                "Transmit harmful, offensive, or disruptive content",
                "Reverse engineer, decompile, or disassemble any software we provide",
                "Use automated tools to scrape or extract data without written permission",
                "Impersonate any person or entity",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-[#fafafa] px-4 py-3 border border-border rounded-lg">
                  <span className="bg-foreground mt-[5px] rounded-full w-1.5 h-1.5 shrink-0" />
                  <span className="font-inter text-[#555] text-[13px] leading-[1.6]">{item}</span>
                </div>
              ))}
            </div>
          </TosSection>

          <TosSection id="availability" icon={<Wifi size={18} />} title="5. Service Availability">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              We strive to maintain high availability but do not guarantee uninterrupted access to our services. We reserve the right
              to modify, suspend, or discontinue any service at any time with or without notice.
            </p>
          </TosSection>

          <TosSection id="fees" icon={<CreditCard size={18} />} title="6. Fees and Billing">
            <div className="bg-[#f5f5f5] px-5 py-4 border-foreground border-l-4 rounded-xl">
              <p className="font-inter text-[#444] text-[14px] leading-[1.8]">
                If you subscribe to any paid service, you agree to pay all applicable fees as described at the time of purchase.
                All fees are non-refundable unless otherwise stated in a specific service agreement. We reserve the right to change
                pricing with reasonable notice.
              </p>
            </div>
          </TosSection>

          <TosSection id="user-content" icon={<FileText size={18} />} title="7. User Content">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              You retain ownership of any content you submit through our services. By submitting content, you grant Thrill Edge
              Technologies a non-exclusive, royalty-free license to use, store, and process that content solely to provide the
              requested services.
            </p>
          </TosSection>

          <TosSection id="privacy" icon={<Shield size={18} />} title="8. Privacy">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              Your use of our services is also governed by our{" "}
              <a href="/privacy-policy" className="hover:opacity-70 text-foreground underline underline-offset-2 transition-opacity">
                Privacy Policy
              </a>
              , which is incorporated into these Terms by reference.
            </p>
          </TosSection>

          <TosSection id="indemnification" icon={<HandshakeIcon size={18} />} title="9. Indemnification">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              You agree to indemnify and hold harmless Thrill Edge Technologies, its officers, directors, employees, and agents from
              any claims, damages, or expenses arising from your use of our services or violation of these Terms.
            </p>
          </TosSection>

          <TosSection id="disclaimer" icon={<XCircle size={18} />} title="10. Disclaimer of Warranties">
            <div className="bg-[#fafafa] p-5 border border-border rounded-xl">
              <p className="font-inter text-[#666] text-[13px] leading-[1.7]">
                Our services are provided &quot;as is&quot; and &quot;as available&quot; without any warranties, express or implied,
                including but not limited to merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </div>
          </TosSection>

          <TosSection id="liability" icon={<AlertIcon size={18} />} title="11. Limitation of Liability">
            <div className="bg-[#f5f5f5] px-5 py-4 border-foreground border-l-4 rounded-xl">
              <p className="font-inter text-[#444] text-[14px] leading-[1.8]">
                In no event shall Thrill Edge Technologies be liable for any indirect, incidental, punitive, or consequential damages
                arising out of or related to your use of our services, even if advised of the possibility of such damages.
              </p>
            </div>
          </TosSection>

          <TosSection id="governing-law" icon={<Scale size={18} />} title="12. Governing Law & Dispute Resolution">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              These Terms are governed by the laws of <strong className="font-semibold text-foreground">England and Wales</strong>. Any disputes arising under these Terms shall
              first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be submitted to the
              exclusive jurisdiction of the courts of England and Wales.
            </p>
          </TosSection>

          <TosSection id="modifications" icon={<RefreshCw size={18} />} title="13. Modifications">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              We may revise these Terms at any time. We will notify users of material changes by updating the date at the top of this
              page. Continued use of our services after changes take effect constitutes your acceptance.
            </p>
          </TosSection>

          {/* Contact */}
          <div id="contact" className="bg-[#111212] mt-12 p-8 md:p-10 rounded-2xl">
            <p className="mb-3 font-inter font-semibold text-[11px] text-white/40 uppercase tracking-[0.2em]">14. Contact</p>
            <h2 className="mb-2 font-mont font-bold text-white text-2xl">Questions about our Terms of Service?</h2>
            <p className="mb-8 font-inter text-[14px] text-white/50">Get in touch and we&apos;ll respond within one business day.</p>
            <div className="gap-5 grid sm:grid-cols-3">
              {[
                { icon: <Mail size={16} />, label: "Email", value: "info@thrilledge.com", href: "mailto:info@thrilledge.com" },
                { icon: <Phone size={16} />, label: "Phone", value: "+44 7853 746775", href: "tel:+447853746775" },
                { icon: <MapPin size={16} />, label: "Address", value: "25 Luke Street, London EC2A 4DS, UK", href: null },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white/40">
                    {item.icon}
                    <span className="font-inter text-[11px] uppercase tracking-widest">{item.label}</span>
                  </div>
                  {item.href ? (
                    <a href={item.href} className="font-inter text-[14px] text-white hover:text-white/70 transition-colors">{item.value}</a>
                  ) : (
                    <span className="font-inter text-[14px] text-white">{item.value}</span>
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

// inline fallback icon since lucide doesn't export AlertTriangle as AlertIcon
function AlertIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function TosSection({ id, icon, title, children }: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-8 border-border last:border-0 border-b scroll-mt-24">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex justify-center items-center bg-[#f0f0f0] rounded-lg w-8 h-8 text-foreground shrink-0">
          {icon}
        </div>
        <h2 className="font-mont font-bold text-[18px] text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}
