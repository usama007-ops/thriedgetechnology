'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Step1 = {
  first_name: string; last_name: string; email: string; phone: string
  company_name: string; website: string; schedule_followup: boolean; agree_to_contact: boolean
}
type Step2 = { rating: string; written_review: string }

const INITIAL_S1: Step1 = { first_name: '', last_name: '', email: '', phone: '', company_name: '', website: '', schedule_followup: false, agree_to_contact: false }
const INITIAL_S2: Step2 = { rating: 'Excellent', written_review: '' }

export default function PublicReviewPage() {
  const [step, setStep] = useState(1)
  const [s1, setS1] = useState<Step1>(INITIAL_S1)
  const [s2, setS2] = useState<Step2>(INITIAL_S2)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...s1, ...s2 }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) return (
    <div className="min-h-screen flex items-center justify-center bg-white px-[16px]">
      <div className="max-w-[480px] w-full text-center flex flex-col gap-[24px]">
        <div className="w-[64px] h-[64px] rounded-full bg-[#111212] flex items-center justify-center mx-auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h1 className="text-[32px] font-mont font-bold text-[#111212]">Thank you!</h1>
        <p className="text-[16px] font-inter text-[#929296] leading-[1.65]">Your review has been submitted and is pending approval. We appreciate your feedback.</p>
        <Link href="/client-reviews" className="inline-flex items-center justify-center px-[24px] py-[12px] bg-black text-white font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300 mx-auto">
          Back to Reviews
        </Link>
      </div>
    </div>
  )

  return (
     <div className="relative bg-[#F3F3F3]">
    <section className="max-w-[1440px] w-full mx-auto md:mt-[64px] mt-[64px]">
      <div className="w-full md:px-[36px] px-[16px] md:pb-[96px] pb-[64px]">
        <div className="w-full flex flex-col px-[28px] py-[64px] gap-[32px] bg-white rounded-[20px]">

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <h2 className="text-lg font-semibold text-[#111212] font-mont">Step {step} of 2</h2>
            </div>
            <div className="h-2 w-full rounded-full bg-black/10">
              <div className="h-2 rounded-full bg-black transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }} />
            </div>
          </div>

          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-[48px] lg:gap-[64px]">
            <div className="w-full flex flex-col gap-[32px]">
              <div className="flex flex-col gap-[16px]">
                <h1 className="text-black font-mont md:text-[64px] text-[32px] md:font-bold font-semibold md:leading-[64px] leading-[32px]">
                  A Public Review of Thrill Edge
                </h1>
                <p className="text-[#111212] font-inter text-[16px] leading-[24px]">
                  We&apos;d love to hear about your experience. Please fill out the review form below:
                </p>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <form className="w-full flex flex-col gap-[24px]" onSubmit={e => { e.preventDefault(); setStep(2) }}>
                  <Field2 label="First Name" id="first_name" value={s1.first_name} onChange={v => setS1(p => ({ ...p, first_name: v }))}
                    label2="Last Name" id2="last_name" value2={s1.last_name} onChange2={v => setS1(p => ({ ...p, last_name: v }))} />
                  <Field2 label="Your email address" id="email" type="email" value={s1.email} onChange={v => setS1(p => ({ ...p, email: v }))}
                    label2="Phone" id2="phone" type2="tel" placeholder2="Your phone number" value2={s1.phone} onChange2={v => setS1(p => ({ ...p, phone: v }))} />
                  <Field2 label="Company name" id="company_name" value={s1.company_name} onChange={v => setS1(p => ({ ...p, company_name: v }))}
                    label2="Website Address (URL)" id2="website" type2="url" placeholder2="https://example.com" value2={s1.website} onChange2={v => setS1(p => ({ ...p, website: v }))} />
                  <div className="w-full flex flex-col gap-[16px]">
                    <Checkbox id="schedule_followup" checked={s1.schedule_followup} onChange={v => setS1(p => ({ ...p, schedule_followup: v }))}
                      label="I'd like to schedule a followup call about my review." />
                    <Checkbox id="agree_to_contact" checked={s1.agree_to_contact} onChange={v => setS1(p => ({ ...p, agree_to_contact: v }))}
                      label={<>You agree to be contacted by Thrill Edge about their services. Your personal information will be processed in accordance with our <Link href="/privacy-policy" className="underline hover:text-[#5c5c5c]">Privacy Policy</Link>.</>} />
                  </div>
                  <button type="submit" className="w-fit flex items-center justify-center px-[24px] pt-[14px] pb-[12px] border border-black text-black font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300">
                    Get started
                  </button>
                </form>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <form className="w-full flex flex-col gap-[24px]" onSubmit={e => { e.preventDefault(); handleSubmit() }}>
                  <div className="w-full flex flex-col gap-[16px]">
                    <p className="text-[#111212] font-mont text-[16px] leading-[24px] font-semibold">How would you rate your overall experience?</p>
                    <div className="flex flex-col gap-[12px]">
                      {['Excellent', 'Good', 'Okay', 'Bad', 'Very Bad'].map(r => (
                        <label key={r} className="flex items-center gap-[12px] cursor-pointer">
                          <input type="radio" name="rating" value={r} checked={s2.rating === r}
                            onChange={() => setS2(p => ({ ...p, rating: r }))}
                            className="w-[14px] h-[14px] border border-[#111212] outline-0 cursor-pointer accent-black" />
                          <span className="text-[#111212] font-inter text-[16px] leading-[24px]">{r}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-[16px]">
                    <h2 className="text-[#111212] font-mont text-[16px] leading-[24px] font-semibold">Write about your experience</h2>
                    <p className="text-[#111212] font-inter text-[16px] leading-[24px]">Answer the 5 questions below:</p>
                    <ol className="list-decimal list-inside flex flex-col gap-[8px] text-[#111212] font-inter text-[16px] leading-[24px]">
                      <li>Describe your company and your position there.</li>
                      <li>What were your goals for this project?</li>
                      <li>Can you share any information demonstrating the impact of partnering with us?</li>
                      <li>How was project management arranged, and how effective was it?</li>
                      <li>What did you find most impressive about Thrill Edge?</li>
                    </ol>
                    <textarea id="written_review" name="written_review" rows={6}
                      value={s2.written_review} onChange={e => setS2(p => ({ ...p, written_review: e.target.value }))}
                      className="w-full px-[16px] py-[16px] border border-[#CCC] rounded-[8px] outline-0 font-inter text-[16px] resize-none focus:border-[#111212] transition-colors" />
                  </div>
                  {error && <p className="text-red-500 font-inter text-[14px]">{error}</p>}
                  <div className="mt-4 flex justify-between items-center">
                    <button type="button" onClick={() => setStep(1)}
                      className="flex items-center gap-[8px] text-sm font-medium text-black cursor-pointer font-inter">
                      ← Back
                    </button>
                    <button type="submit" disabled={submitting}
                      className="flex items-center justify-center px-[24px] pt-[14px] pb-[12px] border border-black text-black font-mont text-[14px] font-semibold rounded-full hover:scale-105 transition-all duration-300 disabled:opacity-50">
                      {submitting ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right image */}
            <div className="w-full flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-[600px] h-[600px] relative rounded-[16px] overflow-hidden bg-[#efeeec]">
                <Image src="/services-menu.avif" alt="Happy customer reviewing" fill sizes="600px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

/* ── Helpers ── */
function Field2({ label, id, type = 'text', value, onChange, placeholder,
  label2, id2, type2 = 'text', value2, onChange2, placeholder2 }:
  { label: string; id: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string
    label2: string; id2: string; type2?: string; value2: string; onChange2: (v: string) => void; placeholder2?: string }) {
  return (
    <div className="w-full flex lg:flex-row flex-col lg:gap-[16px] gap-[24px]">
      <div className="w-full flex flex-col gap-[8px] text-[#111212]">
        <label htmlFor={id} className="text-[14px] leading-[24px] font-inter">{label}</label>
        <input id={id} type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)}
          className="w-full h-[48px] px-[16px] border border-[#CCC] rounded-[8px] outline-0 font-inter text-[16px] focus:border-[#111212] transition-colors" />
      </div>
      <div className="w-full flex flex-col gap-[8px] text-[#111212]">
        <label htmlFor={id2} className="text-[14px] leading-[24px] font-inter">{label2}</label>
        <input id={id2} type={type2} value={value2} placeholder={placeholder2} onChange={e => onChange2(e.target.value)}
          className="w-full h-[48px] px-[16px] border border-[#CCC] rounded-[8px] outline-0 font-inter text-[16px] focus:border-[#111212] transition-colors" />
      </div>
    </div>
  )
}

function Checkbox({ id, checked, onChange, label }: { id: string; checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode }) {
  return (
    <div className="w-full flex items-start gap-[12px]">
      <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        className="w-[14px] h-[14px] mt-[5px] border border-[#111212] rounded-[4px] outline-0 cursor-pointer accent-black shrink-0" />
      <label htmlFor={id} className="text-[#111212] font-inter text-[16px] leading-[24px] cursor-pointer">{label}</label>
    </div>
  )
}
