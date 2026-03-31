'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ApplyForm() {
  const params = useSearchParams()
  const position = params.get('position') ?? ''

  const [form, setForm] = useState({
    name: '', email: '', phone: '', linkedin: '', portfolio: '',
    position: position, message: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (file) fd.append('cv', file)

      const res = await fetch('/api/apply', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again or email us directly at info@thrilledge.com')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) return (
    <div className="min-h-[60vh] flex items-center justify-center px-[16px]">
      <div className="max-w-[480px] w-full text-center flex flex-col gap-[24px]">
        <div className="w-[64px] h-[64px] rounded-full bg-[#111212] flex items-center justify-center mx-auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h2 className="text-[32px] font-mont font-bold text-[#111212]">Application sent!</h2>
        <p className="text-[16px] font-inter text-[#929296] leading-[1.65]">We&apos;ll review your application and get back to you within 5 business days.</p>
        <Link href="/careers" className="inline-flex items-center justify-center px-[24px] py-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300 mx-auto">
          Back to Careers
        </Link>
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[24px]">
      {/* Name row */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-[16px]">
        <Field label="Full Name" id="name" required value={form.name} onChange={v => set('name', v)} />
        <Field label="Email Address" id="email" type="email" required value={form.email} onChange={v => set('email', v)} />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-[16px]">
        <Field label="Phone" id="phone" type="tel" value={form.phone} onChange={v => set('phone', v)} placeholder="+1 234 567 8900" />
        <Field label="Position applying for" id="position" required value={form.position} onChange={v => set('position', v)} />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-[16px]">
        <Field label="LinkedIn Profile" id="linkedin" type="url" value={form.linkedin} onChange={v => set('linkedin', v)} placeholder="https://linkedin.com/in/..." />
        <Field label="Portfolio / GitHub" id="portfolio" type="url" value={form.portfolio} onChange={v => set('portfolio', v)} placeholder="https://..." />
      </div>

      {/* CV upload */}
      <div className="flex flex-col gap-[8px]">
        <label className="text-[14px] font-inter text-[#111212]">CV / Resume <span className="text-[#929296]">(PDF, DOC — max 5MB)</span></label>
        <div
          onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-[#CCC] rounded-[12px] px-[24px] py-[32px] flex flex-col items-center gap-[8px] cursor-pointer hover:border-[#111212] transition-colors duration-200">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#929296" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
          <p className="text-[14px] font-inter text-[#929296]">{file ? file.name : 'Click to upload your CV'}</p>
        </div>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
          onChange={e => setFile(e.target.files?.[0] ?? null)} />
      </div>

      {/* Cover note */}
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="message" className="text-[14px] font-inter text-[#111212]">Cover note <span className="text-[#929296]">(optional)</span></label>
        <textarea id="message" rows={5} value={form.message} onChange={e => set('message', e.target.value)}
          placeholder="Tell us why you'd be a great fit..."
          className="w-full px-[16px] py-[14px] border border-[#CCC] rounded-[10px] outline-0 font-inter text-[16px] resize-none focus:border-[#111212] transition-colors" />
      </div>

      {error && <p className="text-red-500 font-inter text-[14px]">{error}</p>}

      <button type="submit" disabled={submitting}
        className="w-fit flex items-center justify-center px-[32px] pt-[14px] pb-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300 disabled:opacity-50">
        {submitting ? 'Sending...' : 'Submit Application'}
      </button>
    </form>
  )
}

function Field({ label, id, type = 'text', value, onChange, placeholder, required }:
  { label: string; id: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label htmlFor={id} className="text-[14px] font-inter text-[#111212]">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <input id={id} type={type} value={value} placeholder={placeholder} required={required}
        onChange={e => onChange(e.target.value)}
        className="w-full h-[48px] px-[16px] border border-[#CCC] rounded-[10px] outline-0 font-inter text-[16px] focus:border-[#111212] transition-colors" />
    </div>
  )
}

export default function ApplyPage() {
  return (
    <div className="relative bg-white">
      <div className="w-full max-w-[1440px] mx-auto md:px-[36px] px-[16px] md:py-[80px] py-[64px]">
        <Link href="/careers" className="text-[13px] font-inter text-[#929296] hover:text-black transition-colors mb-[32px] inline-flex items-center gap-[6px]">
          ← Back to Careers
        </Link>
        <div className="max-w-[720px]">
          <h1 className="text-[40px] md:text-[56px] font-mont font-bold leading-[1.1] text-[#111212] mb-[12px]">Apply now</h1>
          <p className="text-[16px] font-inter text-[#929296] leading-[1.65] mb-[48px]">
            Fill out the form below and we&apos;ll get back to you within 5 business days.
          </p>
          <Suspense>
            <ApplyForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
