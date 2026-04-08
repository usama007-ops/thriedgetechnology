'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Zap, Clock, Shield, Check } from 'lucide-react'

type Step = 1 | 2 | 3

interface FormData {
  projectTypes: string[]
  workStyle: string[]
  budget: string
  timeline: string
  name: string
  email: string
  phone: string
  company: string
  region: string
  notes: string
}

const PROJECT_TYPES = [
  { label: 'Web Application', icon: '🌐' },
  { label: 'Mobile Application', icon: '📱' },
  { label: 'E-commerce Store', icon: '🛒' },
  { label: 'SaaS Platform', icon: '☁️' },
  { label: 'MVP / Prototype', icon: '🚀' },
  { label: 'AI / ML Integration', icon: '🤖' },
  { label: 'Website Redesign', icon: '✏️' },
  { label: 'Custom Software', icon: '⚙️' },
  { label: 'API / Integration', icon: '🔗' },
  { label: 'Not sure yet', icon: '💡' },
]

const WORK_STYLES = [
  { label: 'One-time project', desc: 'Defined scope, fixed delivery' },
  { label: 'Long-term partnership', desc: 'Ongoing collaboration & growth' },
  { label: 'Ongoing support', desc: 'Maintenance & improvements' },
  { label: 'Not decided yet', desc: 'We can help you figure it out' },
]

const BUDGETS = [
  { label: 'Under $10K', sub: 'Small scope / MVP' },
  { label: '$10K – $25K', sub: 'Mid-size project' },
  { label: '$25K – $75K', sub: 'Full product build' },
  { label: '$75K – $200K', sub: 'Complex platform' },
  { label: '$200K+', sub: 'Enterprise scale' },
  { label: 'Not set yet', sub: 'Let\'s discuss' },
]

const TIMELINES = [
  { label: 'ASAP', sub: 'Ready to kick off now' },
  { label: 'Within 1–3 months', sub: 'Planning in progress' },
  { label: 'Planning for later', sub: 'Future roadmap item' },
  { label: 'Just exploring', sub: 'Early research phase' },
]

const REGIONS = [
  'North America', 'Europe', 'Middle East',
  'Asia Pacific', 'Latin America', 'Africa', 'Other',
]

const STEPS = [
  { num: 1, label: 'Project', desc: 'What you\'re building' },
  { num: 2, label: 'Scope', desc: 'Budget & timeline' },
  { num: 3, label: 'Contact', desc: 'Where to send it' },
]

// ── Pill toggle (checkbox style) ──────────────────────────────────────────────
function PillCheck({ label, icon, checked, onClick }: {
  label: string; icon?: string; checked: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl border-2 text-left transition-all duration-200 select-none ${
        checked
          ? 'border-[#111212] bg-[#111212] text-white shadow-lg scale-[1.02]'
          : 'border-[#ebebeb] bg-white text-[#111212] hover:border-[#111212]/40 hover:bg-[#fafafa]'
      }`}
    >
      {icon && <span className="text-[18px] leading-none">{icon}</span>}
      <span className="font-inter font-medium text-[14px] leading-none">{label}</span>
      {checked && (
        <span className="ml-auto pl-2">
          <Check size={13} strokeWidth={3} />
        </span>
      )}
    </button>
  )
}

// ── Card radio (single select) ────────────────────────────────────────────────
function CardRadio({ label, sub, checked, onClick }: {
  label: string; sub?: string; checked: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between gap-4 w-full px-5 py-4 rounded-2xl border-2 text-left transition-all duration-200 ${
        checked
          ? 'border-[#111212] bg-[#111212] text-white shadow-md'
          : 'border-[#ebebeb] bg-white text-[#111212] hover:border-[#111212]/40 hover:bg-[#fafafa]'
      }`}
    >
      <div className="flex flex-col gap-0.5">
        <span className="font-inter font-semibold text-[15px]">{label}</span>
        {sub && (
          <span className={`font-inter text-[12px] ${checked ? 'text-white/60' : 'text-[#929296]'}`}>
            {sub}
          </span>
        )}
      </div>
      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
        checked ? 'border-white bg-white' : 'border-[#d0d0d0]'
      }`}>
        {checked && <span className="bg-[#111212] rounded-full w-2 h-2" />}
      </span>
    </button>
  )
}

// ── Input field ───────────────────────────────────────────────────────────────
function Field({ label, id, type = 'text', value, onChange, placeholder, required }: {
  label: string; id: string; type?: string; value: string
  onChange: (v: string) => void; placeholder?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-inter font-medium text-[#111212] text-[13px] uppercase tracking-wide">
        {label}{required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={id} type={type} value={value} placeholder={placeholder} required={required}
        onChange={e => onChange(e.target.value)}
        className="bg-[#fafafa] focus:bg-white px-4 border-[#ebebeb] border-2 focus:border-[#111212] rounded-xl outline-none w-full h-12 font-inter text-[#111212] text-[15px] placeholder:text-[#c0c0c0] transition-all duration-200"
      />
    </div>
  )
}

// ── Left summary panel ────────────────────────────────────────────────────────
function SummaryPanel({ step, form }: { step: Step; form: FormData }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Trust badges */}
      <div className="flex flex-col gap-3">
        {[
          { icon: <Zap size={15} />, text: '100% free estimate' },
          { icon: <Clock size={15} />, text: 'Response within 24 hrs' },
          { icon: <Shield size={15} />, text: 'No commitment required' },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-3 font-inter text-[#929296] text-[14px]">
            <span className="text-[#111212]">{icon}</span>
            {text}
          </div>
        ))}
      </div>

      {/* Step progress */}
      <div className="flex flex-col gap-1">
        {STEPS.map(s => {
          const done = step > s.num
          const active = step === s.num
          return (
            <div key={s.num} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              active ? 'bg-[#111212] text-white' : done ? 'text-[#111212]' : 'text-[#c0c0c0]'
            }`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-mont font-bold shrink-0 ${
                active ? 'bg-white text-[#111212]' : done ? 'bg-[#111212] text-white' : 'bg-[#ebebeb] text-[#c0c0c0]'
              }`}>
                {done ? <Check size={11} strokeWidth={3} /> : s.num}
              </span>
              <div className="flex flex-col">
                <span className="font-mont font-semibold text-[14px]">{s.label}</span>
                <span className={`font-inter text-[12px] ${active ? 'text-white/60' : 'text-[#929296]'}`}>{s.desc}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Live summary */}
      {(form.projectTypes.length > 0 || form.budget || form.name) && (
        <div className="flex flex-col gap-4 p-5 border border-[#ebebeb] rounded-2xl">
          <p className="font-mont font-semibold text-[#929296] text-[13px] uppercase tracking-widest">Your selections</p>
          {form.projectTypes.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="font-inter text-[#929296] text-[12px]">Building</p>
              <div className="flex flex-wrap gap-1.5">
                {form.projectTypes.map(t => (
                  <span key={t} className="bg-[#f0f0f0] px-2.5 py-1 rounded-full font-inter text-[#111212] text-[12px]">{t}</span>
                ))}
              </div>
            </div>
          )}
          {form.budget && (
            <div className="flex flex-col gap-0.5">
              <p className="font-inter text-[#929296] text-[12px]">Budget</p>
              <p className="font-inter font-semibold text-[#111212] text-[14px]">{form.budget}</p>
            </div>
          )}
          {form.timeline && (
            <div className="flex flex-col gap-0.5">
              <p className="font-inter text-[#929296] text-[12px]">Timeline</p>
              <p className="font-inter font-semibold text-[#111212] text-[14px]">{form.timeline}</p>
            </div>
          )}
          {form.name && (
            <div className="flex flex-col gap-0.5">
              <p className="font-inter text-[#929296] text-[12px]">Contact</p>
              <p className="font-inter font-semibold text-[#111212] text-[14px]">{form.name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ProjectCostEstimation() {
  const [step, setStep] = useState<Step>(1)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<FormData>({
    projectTypes: [], workStyle: [],
    budget: '', timeline: '',
    name: '', email: '', phone: '', company: '', region: '', notes: '',
  })

  const toggle = (key: 'projectTypes' | 'workStyle', val: string) =>
    setForm(p => ({
      ...p,
      [key]: p[key].includes(val) ? p[key].filter(v => v !== val) : [...p[key], val],
    }))

  const set = (key: keyof FormData, val: string) => setForm(p => ({ ...p, [key]: val }))

  const canNext1 = form.projectTypes.length > 0
  const canNext2 = !!form.budget && !!form.timeline
  const canSubmit = !!form.name && !!form.email

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again or email us at info@thrilledge.com')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="flex justify-center items-center bg-white px-4 min-h-screen">
        <div className="flex flex-col items-center gap-6 w-full max-w-md text-center">
          <div className="flex justify-center items-center bg-[#111212] rounded-full w-20 h-20">
            <Check size={32} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-mont font-bold text-[#111212] text-[40px] leading-tight">Estimate on its way</h2>
            <p className="font-inter text-[#929296] text-[16px] leading-relaxed">
              We&apos;ll send a tailored estimate to{' '}
              <span className="font-semibold text-[#111212]">{form.email}</span>{' '}
              within 24 hours.
            </p>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-[#111212] px-7 pt-3.5 pb-3 rounded-full font-mont font-semibold text-[14px] text-white hover:scale-105 transition-all duration-300"
          >
            Back to home <ArrowRight size={15} />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#111212] px-4 md:px-9 pt-20 pb-16 w-full">
        <div className="flex md:flex-row flex-col justify-between md:items-end gap-10 mx-auto max-w-360">
          <div className="flex flex-col gap-4">
            <span className="font-inter font-semibold text-[11px] text-white/40 uppercase tracking-[0.25em]">
              Free Estimation Tool
            </span>
            <h1 className="max-w-2xl font-mont font-bold text-[48px] text-white md:text-[64px] leading-[1.05]">
              Estimate Your<br />Project Cost
            </h1>
            <p className="max-w-lg font-inter text-[16px] text-white/50 leading-[1.7]">
              Answer 3 quick questions and receive a free, tailored estimate from our team, usually within 24 hours.
            </p>
          </div>
          <div className="flex flex-row md:flex-col flex-wrap gap-4 shrink-0">
            {[
              { icon: <Zap size={14} />, text: '100% free estimate' },
              { icon: <Clock size={14} />, text: 'We respond within 24 hrs' },
              { icon: <Shield size={14} />, text: 'No commitment required' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 font-inter text-[14px] text-white/60">
                <span className="text-white/30">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto px-4 md:px-9 py-16 w-full max-w-360">
        <div className="flex lg:flex-row flex-col items-start gap-12 lg:gap-16">

          {/* Left, sticky summary */}
          <div className="lg:top-24 lg:sticky w-full lg:w-72 shrink-0">
            <SummaryPanel step={step} form={form} />
          </div>

          {/* Right, form card */}
          <div className="flex-1 min-w-0">
            <form onSubmit={handleSubmit}>

              {/* ── Step 1 ── */}
              {step === 1 && (
                <div className="flex flex-col gap-10">

                  <div className="flex flex-col gap-2">
                    <p className="font-inter font-semibold text-[#929296] text-[12px] uppercase tracking-[0.2em]">Step 1 of 3</p>
                    <h2 className="font-mont font-bold text-[#111212] text-[32px] md:text-[40px] leading-tight">
                      What are you building?
                    </h2>
                    <p className="font-inter text-[#929296] text-[15px]">
                      Select all that apply, this is the primary cost driver.
                    </p>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-2.5">
                      {PROJECT_TYPES.map(opt => (
                        <PillCheck
                          key={opt.label}
                          label={opt.label}
                          icon={opt.icon}
                          checked={form.projectTypes.includes(opt.label)}
                          onClick={() => toggle('projectTypes', opt.label)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-2 border-[#f0f0f0] border-t">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-mont font-semibold text-[#111212] text-[20px]">
                        How do you want to work together?
                      </h3>
                      <p className="font-inter text-[#929296] text-[14px]">Pick everything that fits.</p>
                    </div>
                    <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                      {WORK_STYLES.map(opt => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => toggle('workStyle', opt.label)}
                          className={`flex items-start justify-between gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                            form.workStyle.includes(opt.label)
                              ? 'border-[#111212] bg-[#111212] text-white'
                              : 'border-[#ebebeb] bg-white text-[#111212] hover:border-[#111212]/40'
                          }`}
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="font-inter font-semibold text-[14px]">{opt.label}</span>
                            <span className={`font-inter text-[12px] ${form.workStyle.includes(opt.label) ? 'text-white/60' : 'text-[#929296]'}`}>
                              {opt.desc}
                            </span>
                          </div>
                          {form.workStyle.includes(opt.label) && <Check size={15} strokeWidth={2.5} className="mt-0.5 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      disabled={!canNext1}
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 bg-[#111212] disabled:opacity-30 px-8 pt-3.5 pb-3 rounded-full font-mont font-semibold text-[14px] text-white hover:scale-105 transition-all duration-300 disabled:pointer-events-none"
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 2 ── */}
              {step === 2 && (
                <div className="flex flex-col gap-10">

                  <div className="flex flex-col gap-2">
                    <p className="font-inter font-semibold text-[#929296] text-[12px] uppercase tracking-[0.2em]">Step 2 of 3</p>
                    <h2 className="font-mont font-bold text-[#111212] text-[32px] md:text-[40px] leading-tight">
                      Scope &amp; Urgency
                    </h2>
                    <p className="font-inter text-[#929296] text-[15px]">
                      Budget and timeline help us tailor the right proposal for you.
                    </p>
                  </div>

                  <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-mont font-semibold text-[#111212] text-[17px]">Approximate budget</h3>
                      <div className="flex flex-col gap-2.5">
                        {BUDGETS.map(opt => (
                          <CardRadio
                            key={opt.label} label={opt.label} sub={opt.sub}
                            checked={form.budget === opt.label}
                            onClick={() => set('budget', opt.label)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <h3 className="font-mont font-semibold text-[#111212] text-[17px]">When to start</h3>
                      <div className="flex flex-col gap-2.5">
                        {TIMELINES.map(opt => (
                          <CardRadio
                            key={opt.label} label={opt.label} sub={opt.sub}
                            checked={form.timeline === opt.label}
                            onClick={() => set('timeline', opt.label)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 px-6 pt-3.5 pb-3 border-[#ebebeb] border-2 hover:border-[#111212] rounded-full font-mont font-semibold text-[#111212] text-[14px] transition-all duration-300"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      disabled={!canNext2}
                      onClick={() => setStep(3)}
                      className="flex items-center gap-2 bg-[#111212] disabled:opacity-30 px-8 pt-3.5 pb-3 rounded-full font-mont font-semibold text-[14px] text-white hover:scale-105 transition-all duration-300 disabled:pointer-events-none"
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 3 ── */}
              {step === 3 && (
                <div className="flex flex-col gap-8">

                  <div className="flex flex-col gap-2">
                    <p className="font-inter font-semibold text-[#929296] text-[12px] uppercase tracking-[0.2em]">Step 3 of 3</p>
                    <h2 className="font-mont font-bold text-[#111212] text-[32px] md:text-[40px] leading-tight">
                      Almost there
                    </h2>
                    <p className="font-inter text-[#929296] text-[15px]">
                      Where should we send your free estimate?
                    </p>
                  </div>

                  <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                    <Field label="Full Name" id="name" required value={form.name} onChange={v => set('name', v)} placeholder="Jane Smith" />
                    <Field label="Work Email" id="email" type="email" required value={form.email} onChange={v => set('email', v)} placeholder="jane@company.com" />
                    <Field label="Phone" id="phone" type="tel" value={form.phone} onChange={v => set('phone', v)} placeholder="Optional, we'll reach out by email first" />
                    <Field label="Company / Startup" id="company" value={form.company} onChange={v => set('company', v)} placeholder="Optional" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="region" className="font-inter font-medium text-[#111212] text-[13px] uppercase tracking-wide">
                      Company Region <span className="font-normal text-[#929296] normal-case">(optional)</span>
                    </label>
                    <div className="relative">
                      <select
                        id="region"
                        value={form.region}
                        onChange={e => set('region', e.target.value)}
                        className="bg-[#fafafa] focus:bg-white px-4 pr-10 border-[#ebebeb] border-2 focus:border-[#111212] rounded-xl outline-none w-full h-12 font-inter text-[#111212] text-[15px] transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="">Select a region (optional)</option>
                        {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <div className="top-1/2 right-4 absolute text-[#929296] -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="notes" className="font-inter font-medium text-[#111212] text-[13px] uppercase tracking-wide">
                      Anything else? <span className="font-normal text-[#929296] normal-case">(optional)</span>
                    </label>
                    <textarea
                      id="notes" rows={4} value={form.notes}
                      onChange={e => set('notes', e.target.value)}
                      placeholder="Briefly describe your idea, goals, or any constraints..."
                      className="bg-[#fafafa] focus:bg-white px-4 py-3.5 border-[#ebebeb] border-2 focus:border-[#111212] rounded-xl outline-none w-full font-inter text-[#111212] text-[15px] placeholder:text-[#c0c0c0] transition-all duration-200 resize-none"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 px-4 py-3 border border-red-200 rounded-xl">
                      <p className="font-inter text-[14px] text-red-600">{error}</p>
                    </div>
                  )}

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-6 pt-3.5 pb-3 border-[#ebebeb] border-2 hover:border-[#111212] rounded-full font-mont font-semibold text-[#111212] text-[14px] transition-all duration-300"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit || submitting}
                      className="flex items-center gap-2 bg-[#111212] disabled:opacity-30 px-8 pt-3.5 pb-3 rounded-full font-mont font-semibold text-[14px] text-white hover:scale-105 transition-all duration-300 disabled:pointer-events-none"
                    >
                      {submitting ? 'Sending...' : 'Get my free estimate'}
                      {!submitting && <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
