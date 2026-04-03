import { PageHero } from "@/components/common/page-hero";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Contact() {
    return (
        <>
            <PageHero
                label="Contact us"
                title="Tell us what you're building."
                subtitle="We respond to every submission within one business day."
            />

            {/* Calendly Section */}
            <section className={cn('py-20', 'px-4', 'sm:px-6', 'lg:px-8', 'bg-background')}>
                <div className={cn('max-w-6xl', 'mx-auto')}>
                    <div className={cn('text-center', 'mb-12')}>
                        <span className={cn('text-[12px]', 'font-inter', 'font-semibold', 'uppercase', 'tracking-[0.2em]', 'text-muted-foreground')}>
                            Schedule a meeting
                        </span>
                        <h2 className={cn('mt-3', 'text-4xl', 'md:text-5xl', 'font-mont', 'font-bold', 'text-foreground', 'leading-tight')}>
                            Book a free 30-min call
                        </h2>
                        <p className={cn('mt-4', 'text-muted-foreground', 'font-inter', 'text-base', 'max-w-xl', 'mx-auto', 'leading-relaxed')}>
                            Pick a time that works for you and let&apos;s talk about your project, goals, and how we can help.
                        </p>
                    </div>

                    <div className={cn('rounded-2xl', 'overflow-hidden', 'border', 'border-border', 'shadow-sm')}>
                        <iframe
                            src="https://calendly.com/thrilledge-technologies/30min"
                            width="100%"
                            height="700"
                            frameBorder="0"
                            title="Schedule a meeting with Thrilledge Technologies"
                            className="block"
                        />
                    </div>
                </div>
            </section>

            {/* Contact Info Strip */}
            <section className={cn('py-16', 'px-4', 'sm:px-6', 'lg:px-8', 'border-t', 'border-border')}>
                <div className={cn('max-w-6xl', 'mx-auto', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-10', 'text-center')}>
                    <div className={cn('flex', 'flex-col', 'items-center', 'gap-3')}>
                        <div className={cn('w-12', 'h-12', 'rounded-full', 'bg-primary/10', 'flex', 'items-center', 'justify-center')}>
                            <Mail size={20} className="text-primary" />
                        </div>
                        <p className={cn('text-sm', 'font-inter', 'text-muted-foreground', 'uppercase', 'tracking-widest')}>Email us</p>
                        <a
                            href="mailto:info@thrilledge.com"
                            className={cn('text-foreground', 'font-semibold', 'hover:text-primary', 'transition-colors')}
                        >
                            info@thrilledge.com
                        </a>
                    </div>

                    <div className={cn('flex', 'flex-col', 'items-center', 'gap-3')}>
                        <div className={cn('w-12', 'h-12', 'rounded-full', 'bg-primary/10', 'flex', 'items-center', 'justify-center')}>
                            <Phone size={20} className="text-primary" />
                        </div>
                        <p className={cn('text-sm', 'font-inter', 'text-muted-foreground', 'uppercase', 'tracking-widest')}>Call us</p>
                        <a
                            href="tel:+447853746775"
                            className={cn('text-foreground', 'font-semibold', 'hover:text-primary', 'transition-colors')}
                        >
                            +44 7853 746775
                        </a>
                    </div>

                    <div className={cn('flex', 'flex-col', 'items-center', 'gap-3')}>
                        <div className={cn('w-12', 'h-12', 'rounded-full', 'bg-primary/10', 'flex', 'items-center', 'justify-center')}>
                            <MapPin size={20} className="text-primary" />
                        </div>
                        <p className={cn('text-sm', 'font-inter', 'text-muted-foreground', 'uppercase', 'tracking-widest')}>Find us</p>
                        <span className={cn('text-foreground', 'font-semibold')}>
                            25 Luke Street, London EC2A 4DS, Uk
                        </span>
                    </div>
                </div>
            </section>
        </>
    );
}

