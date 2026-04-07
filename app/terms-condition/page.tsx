import { PageHero } from "@/components/common/page-hero";
import { Metadata } from "next";
import { Mail, Phone, MapPin, CheckCircle2, Briefcase, Layers, Users, CreditCard, EyeOff, AlertTriangle, XCircle, Scale, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Thrill Edge Technologies",
  description: "Read the terms and conditions governing your use of Thrill Edge Technologies' website and services.",
};

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "services", title: "Services" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "client-responsibilities", title: "Client Responsibilities" },
  { id: "payment", title: "Payment Terms" },
  { id: "confidentiality", title: "Confidentiality" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "warranties", title: "Warranties Disclaimer" },
  { id: "termination", title: "Termination" },
  { id: "governing-law", title: "Governing Law" },
  { id: "changes", title: "Changes to Terms" },
  { id: "contact", title: "Contact Us" },
];

export default function TermsConditions() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms &amp; Conditions"
        subtitle="Last updated: April 7, 2026"
      />

      {/* Intro banner */}
      <div className="bg-[#f5f5f5] border-border border-b">
        <div className="mx-auto px-4 md:px-9 py-8 max-w-[1440px]">
          <p className="max-w-3xl font-inter text-[#444] text-[15px] leading-[1.8]">
            These Terms &amp; Conditions govern your access to and use of the Thrill Edge Technologies website and services.
            By accessing our website or engaging our services, you agree to be bound by these Terms.
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

          <TermSection id="acceptance" icon={<CheckCircle2 size={18} />} title="1. Acceptance of Terms">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              By using our website or services, you confirm that you are at least 18 years of age and have the legal capacity to enter
              into a binding agreement. If you are using our services on behalf of a company, you represent that you have authority to
              bind that company to these Terms.
            </p>
          </TermSection>

          <TermSection id="services" icon={<Briefcase size={18} />} title="2. Services">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              Thrill Edge Technologies provides software development, design, and technology consulting services. The specific scope,
              deliverables, timelines, and fees for any engagement are defined in a separate Statement of Work (SOW) or project
              agreement signed by both parties.
            </p>
          </TermSection>

          <TermSection id="intellectual-property" icon={<Layers size={18} />} title="3. Intellectual Property">
            <div className="gap-4 grid sm:grid-cols-2 mb-5">
              <div className="bg-[#fafafa] p-5 border border-border rounded-xl">
                <p className="mb-2 font-mont font-semibold text-[13px] text-foreground">Client Deliverables</p>
                <p className="font-inter text-[#666] text-[13px] leading-[1.7]">
                  Upon full payment, clients receive ownership of custom deliverables created specifically for them under a project agreement.
                </p>
              </div>
              <div className="bg-[#fafafa] p-5 border border-border rounded-xl">
                <p className="mb-2 font-mont font-semibold text-[13px] text-foreground">Our IP</p>
                <p className="font-inter text-[#666] text-[13px] leading-[1.7]">
                  Thrill Edge Technologies retains ownership of all pre-existing tools, frameworks, libraries, and methodologies used in delivering services.
                </p>
              </div>
            </div>
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              All content on this website — including text, graphics, logos, and code — is the property of Thrill Edge Technologies
              and may not be reproduced without written permission.
            </p>
          </TermSection>

          <TermSection id="client-responsibilities" icon={<Users size={18} />} title="4. Client Responsibilities">
            <p className="mb-5 font-inter text-[#555] text-[15px] leading-[1.8]">As a client, you agree to:</p>
            <ul className="space-y-3">
              {[
                "Provide accurate and complete project requirements and materials",
                "Respond to requests for feedback or approvals in a timely manner",
                "Ensure you have rights to any content or assets provided to us",
                "Make payments according to agreed schedules",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-inter text-[#555] text-[15px] leading-[1.7]">
                  <span className="bg-foreground mt-[6px] rounded-full w-1.5 h-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </TermSection>

          <TermSection id="payment" icon={<CreditCard size={18} />} title="5. Payment Terms">
            <div className="bg-[#fafafa] p-5 border border-border rounded-xl">
              <p className="font-inter text-[#666] text-[13px] leading-[1.7]">
                Payment terms are outlined in individual project agreements. Late payments may incur interest charges.
                We reserve the right to pause or terminate work on projects with outstanding balances.
              </p>
            </div>
          </TermSection>

          <TermSection id="confidentiality" icon={<EyeOff size={18} />} title="6. Confidentiality">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              Both parties agree to keep confidential any proprietary or sensitive information shared during the course of an engagement.
              This obligation survives the termination of any project agreement.
            </p>
          </TermSection>

          <TermSection id="liability" icon={<AlertTriangle size={18} />} title="7. Limitation of Liability">
            <div className="bg-[#f5f5f5] px-5 py-4 border-foreground border-l-4 rounded-xl">
              <p className="font-inter text-[#444] text-[14px] leading-[1.8]">
                To the maximum extent permitted by law, Thrill Edge Technologies shall not be liable for any indirect, incidental,
                special, or consequential damages arising from your use of our website or services. Our total liability shall not
                exceed the fees paid by you in the three months preceding the claim.
              </p>
            </div>
          </TermSection>

          <TermSection id="warranties" icon={<XCircle size={18} />} title="8. Warranties Disclaimer">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              Our website and services are provided &quot;as is&quot; without warranties of any kind, express or implied.
              We do not warrant that our services will be uninterrupted, error-free, or meet your specific requirements.
            </p>
          </TermSection>

          <TermSection id="termination" icon={<XCircle size={18} />} title="9. Termination">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              Either party may terminate a project engagement with written notice as specified in the project agreement.
              Upon termination, the client is responsible for payment of all work completed to date.
            </p>
          </TermSection>

          <TermSection id="governing-law" icon={<Scale size={18} />} title="10. Governing Law">
            <div className="bg-[#fafafa] p-5 border border-border rounded-xl">
              <p className="font-inter text-[#666] text-[13px] leading-[1.7]">
                These Terms are governed by the laws of <strong className="text-foreground">England and Wales</strong>. Any disputes shall be subject to the
                exclusive jurisdiction of the courts of England and Wales.
              </p>
            </div>
          </TermSection>

          <TermSection id="changes" icon={<RefreshCw size={18} />} title="11. Changes to Terms">
            <p className="font-inter text-[#555] text-[15px] leading-[1.8]">
              We reserve the right to update these Terms at any time. Continued use of our website or services after changes are
              posted constitutes acceptance of the revised Terms.
            </p>
          </TermSection>

          {/* Contact */}
          <div id="contact" className="bg-[#111212] mt-12 p-8 md:p-10 rounded-2xl">
            <p className="mb-3 font-inter font-semibold text-[11px] text-white/40 uppercase tracking-[0.2em]">12. Contact Us</p>
            <h2 className="mb-2 font-mont font-bold text-white text-2xl">Questions about these Terms?</h2>
            <p className="mb-8 font-inter text-[14px] text-white/50">Reach out and we&apos;ll get back to you within one business day.</p>
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

function TermSection({ id, icon, title, children }: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
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
