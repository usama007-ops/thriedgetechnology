/**
 * Call-to-Action Section Component
 * Final CTA for conversions
 */

import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export function CTASection() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl bg-card border border-border p-12 md:p-16 overflow-hidden shadow-sm">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -z-10 translate-y-1/2 -translate-x-1/2" />

          <div className="space-y-8 text-center">
            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-muted-foreground">
                Let&apos;s discuss how Thrill Edge Technologies can help you achieve your goals.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="mailto:hello@thrilledge.com"
                className="
                  px-8 py-4 rounded-lg
                  bg-primary text-primary-foreground
                  hover:bg-primary/90 transition-all duration-300
                  font-semibold text-lg
                  flex items-center gap-2 group
                  hover:scale-105
                "
              >
                <Mail size={20} />
                Get Started Today
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="
                  px-8 py-4 rounded-lg
                  border-2 border-primary text-primary
                  hover:bg-primary/5 transition-all duration-300
                  font-semibold text-lg
                  hover:scale-105
                "
              >
                Schedule a Call
              </Link>
            </div>

            {/* Contact Info */}
            <div className="pt-8 border-t border-border/50 space-y-2">
              <p className="text-muted-foreground text-sm">
                Or contact us directly:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:hello@thrilledge.com"
                className="text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                hello@thrilledge.com
              </a>
              <a
                href="tel:+1234567890"
                className="text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                +1 (234) 567-890
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
