import { getTestimonials, type Testimonial } from '@/lib/wordpress'
import { TestimonialsMarquee } from './testimonials-marquee'

export async function TestimonialsSection() {
  const testimonials = await getTestimonials(20).catch(() => [] as Testimonial[])
  if (!testimonials.length) return null

  return (
    <section className="py-24 bg-[#111212] overflow-hidden">
      <div className="mb-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
          What Our Clients Say
        </h2>
      </div>
      <TestimonialsMarquee testimonials={testimonials} />
      <div className="container mx-auto">
        {/* Stats */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
          {[
            { number: '4.9/5', label: 'Average Rating' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: `${testimonials.length}+`, label: 'Happy Clients' },
            { number: '2M+', label: 'Revenue Generated' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-white">{s.number}</p>
              <p className="text-white/50 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
