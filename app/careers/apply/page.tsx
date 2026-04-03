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
    <div className="flex justify-center items-center px-[16px] min-h-[60vh]">
      <div className="flex flex-col gap-[24px] w-full max-w-[480px] text-center">
        <div className="flex justify-center items-center bg-[#111212] mx-auto rounded-full w-[64px] h-[64px]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h2 className="font-mont font-bold text-[#111212] text-[32px]">Application sent!</h2>
        <p className="font-inter text-[#929296] text-[16px] leading-[1.65]">We&apos;ll review your application and get back to you within 5 business days.</p>
        <Link href="/careers" className="inline-flex justify-center items-center bg-black mx-auto px-[24px] py-[12px] rounded-full font-mont font-semibold text-[14px] text-white hover:scale-105 transition-all duration-300">
          Back to Careers
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <div className="text-center">
        <h1 className="mb-[12px] font-mont font-bold text-[#111212] text-[40px] md:text-[56px] leading-[1.1]">Apply now</h1>
        <p className="mb-[48px] font-inter text-[#929296] text-[16px] leading-[1.65]">
          Fill out the form below and we&apos;ll get back to you within 5 business days.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] w-full">

        {/* Name row */}
        <div className="gap-[16px] grid grid-cols-1 md:grid-cols-2">
          <Field label="Full Name" id="name" required value={form.name} onChange={v => set('name', v)} />
          <Field label="Email Address" id="email" type="email" required value={form.email} onChange={v => set('email', v)} />
        </div>
        <div className="gap-[16px] grid grid-cols-1 md:grid-cols-2">
          <Field label="Phone" id="phone" type="tel" value={form.phone} onChange={v => set('phone', v)} placeholder="+1 234 567 8900" />
          <Field label="Position applying for" id="position" required value={form.position} onChange={v => set('position', v)} />
        </div>
        <div className="gap-[16px] grid grid-cols-1 md:grid-cols-2">
          <Field label="LinkedIn Profile" id="linkedin" type="url" value={form.linkedin} onChange={v => set('linkedin', v)} placeholder="https://linkedin.com/in/..." />
          <Field label="Portfolio / GitHub" id="portfolio" type="url" value={form.portfolio} onChange={v => set('portfolio', v)} placeholder="https://..." />
        </div>

        {/* CV upload */}
        <div className="flex flex-col gap-[8px]">
          <label className="font-inter text-[#111212] text-[14px]">CV / Resume <span className="text-[#929296]">(PDF, DOC — max 5MB)</span></label>
          <div
            onClick={() => fileRef.current?.click()}
            className="flex flex-col items-center gap-[8px] px-[24px] py-[32px] border-[#CCC] border-2 hover:border-[#111212] border-dashed rounded-[12px] w-full transition-colors duration-200 cursor-pointer">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#929296" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            <p className="font-inter text-[#929296] text-[14px]">{file ? file.name : 'Click to upload your CV'}</p>
          </div>
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
            onChange={e => setFile(e.target.files?.[0] ?? null)} />
        </div>

        {/* Cover note */}
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="message" className="font-inter text-[#111212] text-[14px]">Cover note <span className="text-[#929296]">(optional)</span></label>
          <textarea id="message" rows={5} value={form.message} onChange={e => set('message', e.target.value)}
            placeholder="Tell us why you'd be a great fit..."
            className="px-[16px] py-[14px] border border-[#CCC] focus:border-[#111212] rounded-[10px] outline-0 w-full font-inter text-[16px] transition-colors resize-none" />
        </div>

        {error && <p className="font-inter text-[14px] text-red-500">{error}</p>}

        <button type="submit" disabled={submitting}
          className="flex justify-center items-center bg-black disabled:opacity-50 px-[32px] pt-[14px] pb-[12px] rounded-full w-fit font-mont font-semibold text-[14px] text-white hover:scale-105 transition-all duration-300">
          {submitting ? 'Sending...' : 'Submit Application'}
        </button>
      </form>
    </>

  )
}

function Field({ label, id, type = 'text', value, onChange, placeholder, required }:
  { label: string; id: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label htmlFor={id} className="font-inter text-[#111212] text-[14px]">{label}{required && <span className="ml-1 text-red-500">*</span>}</label>
      <input id={id} type={type} value={value} placeholder={placeholder} required={required}
        onChange={e => onChange(e.target.value)}
        className="px-[16px] border border-[#CCC] focus:border-[#111212] rounded-[10px] outline-0 w-full h-[48px] font-inter text-[16px] transition-colors" />
    </div>
  )
}

export default function ApplyPage() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto px-[16px] md:px-[36px] py-[64px] md:py-[80px] w-full max-w-[1440px]">
        <div className="mx-auto max-w-180">
          <Suspense>
            <ApplyForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
