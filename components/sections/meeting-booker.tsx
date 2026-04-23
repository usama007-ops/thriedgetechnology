'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

// ── Config ──────────────────────────────────────────────────────────────────
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00',
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
}

function toDateStr(y: number, mo: number, d: number) {
  return `${y}-${String(mo + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

type Step = 'calendar' | 'time' | 'form' | 'done'

export default function MeetingBooker() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [step, setStep] = useState<Step>('calendar')
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const cells: (number | null)[] = Array(firstDay).fill(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)
    // pad to full weeks
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [viewYear, viewMonth])

  function isPast(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    return d < today
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  function canGoPrev() {
    return viewYear > today.getFullYear() || viewMonth > today.getMonth()
  }

  function selectDay(day: number) {
    if (isPast(day)) return
    setSelectedDate(toDateStr(viewYear, viewMonth, day))
    setSelectedTime(null)
    setStep('time')
  }

  function selectTime(t: string) {
    setSelectedTime(t)
    setStep('form')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !name || !email) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/book-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, date: selectedDate, time: selectedTime }),
      })
      if (!res.ok) throw new Error('Failed')
      setStep('done')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Formatted display values ─────────────────────────────────────────────
  const displayDate = selectedDate
    ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-GB', {
        weekday: 'long', month: 'long', day: 'numeric',
      })
    : null

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[20px] overflow-hidden shadow-sm">

      {/* Header */}
      <div className="bg-[#111212] px-6 py-5">
        <p className="font-inter text-[11px] text-white/40 uppercase tracking-[2px] mb-1">Schedule a call</p>
        <h3 className="font-mont font-semibold text-[18px] text-white">Zeerak Jamshaid</h3>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1.5 font-inter text-[13px] text-white/60">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            30 min
          </span>
          <span className="flex items-center gap-1.5 font-inter text-[13px] text-white/60">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            Web conference
          </span>
        </div>
        <p className="font-inter text-[11px] text-white/40 mt-1.5">
          Web conferencing details provided upon confirmation.
        </p>
      </div>

      {/* Step indicator */}
      {step !== 'done' && (
        <div className="flex border-b border-[#f0f0f0]">
          {(['calendar', 'time', 'form'] as Step[]).map((s, i) => {
            const labels = ['Date', 'Time', 'Details']
            const stepIndex = ['calendar', 'time', 'form'].indexOf(step)
            const isActive = s === step
            const isDone = i < stepIndex
            return (
              <button
                key={s}
                onClick={() => {
                  if (isDone) {
                    if (i === 0) setStep('calendar')
                    if (i === 1 && selectedDate) setStep('time')
                  }
                }}
                className={cn(
                  'flex-1 py-3 font-inter text-[12px] font-medium transition-colors',
                  isActive ? 'text-[#111212] border-b-2 border-[#111212]' : '',
                  isDone ? 'text-[#929296] cursor-pointer hover:text-[#111212]' : '',
                  !isActive && !isDone ? 'text-[#c8c8c8] cursor-default' : '',
                )}
              >
                {i + 1}. {labels[i]}
              </button>
            )
          })}
        </div>
      )}

      <div className="p-6">

        {/* ── STEP 1: Calendar ── */}
        {step === 'calendar' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                disabled={!canGoPrev()}
                className={cn(
                  'w-8 h-8 flex items-center justify-center rounded-full transition-colors',
                  canGoPrev() ? 'hover:bg-[#f3f3f3] text-[#111212]' : 'text-[#d0d0d0] cursor-not-allowed'
                )}
                aria-label="Previous month"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <span className="font-mont font-semibold text-[15px] text-[#111212]">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                onClick={nextMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f3f3f3] text-[#111212] transition-colors"
                aria-label="Next month"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS.map(d => (
                <div key={d} className="text-center font-inter text-[11px] text-[#929296] py-1.5">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-1">
              {calendarDays.map((day, idx) => {
                if (!day) return <div key={idx} />
                const past = isPast(day)
                const dateStr = toDateStr(viewYear, viewMonth, day)
                const isSelected = dateStr === selectedDate
                return (
                  <button
                    key={idx}
                    onClick={() => selectDay(day)}
                    disabled={past}
                    className={cn(
                      'mx-auto w-9 h-9 flex items-center justify-center rounded-full font-inter text-[13px] transition-all',
                      past ? 'text-[#eee] cursor-not-allowed' : 'bg-[#f3f3f3] hover:bg-[#111212] cursor-pointer hover:text-[#fff]',
                      isSelected ? 'bg-[#111212] text-white hover:bg-[#111212]' : 'text-[#111212]',
                    )}
                    aria-label={`Select ${dateStr}`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── STEP 2: Time slots ── */}
        {step === 'time' && selectedDate && (
          <div>
            <p className="font-inter text-[13px] text-[#929296] mb-4">
              {displayDate}
            </p>
            <div className="grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1">
              {TIME_SLOTS.map(t => (
                <button
                  key={t}
                  onClick={() => selectTime(t)}
                  className={cn(
                    'py-2.5 px-3 rounded-[10px] border font-inter text-[13px] font-medium transition-all',
                    selectedTime === t
                      ? 'bg-[#111212] text-white border-[#111212]'
                      : 'border-[#e5e5e5] text-[#111212] hover:border-[#111212] hover:bg-[#f9f9f9]'
                  )}
                >
                  {formatTime(t)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 3: Contact form ── */}
        {step === 'form' && selectedDate && selectedTime && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="bg-[#f9f9f9] rounded-[10px] p-3 border border-[#f0f0f0]">
              <p className="font-inter text-[12px] text-[#929296]">Your meeting</p>
              <p className="font-mont font-semibold text-[14px] text-[#111212] mt-0.5">
                {displayDate} · {formatTime(selectedTime)}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-inter text-[12px] text-[#929296] uppercase tracking-wide">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="border border-[#e5e5e5] rounded-[10px] px-4 py-2.5 font-inter text-[14px] text-[#111212] placeholder:text-[#c8c8c8] focus:outline-none focus:border-[#111212] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-inter text-[12px] text-[#929296] uppercase tracking-wide">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="border border-[#e5e5e5] rounded-[10px] px-4 py-2.5 font-inter text-[14px] text-[#111212] placeholder:text-[#c8c8c8] focus:outline-none focus:border-[#111212] transition-colors"
              />
            </div>

            {error && (
              <p className="font-inter text-[13px] text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                'mt-1 py-3 rounded-full font-mont font-semibold text-[14px] transition-all',
                loading
                  ? 'bg-[#929296] text-white cursor-not-allowed'
                  : 'bg-[#111212] text-white hover:scale-[1.02]'
              )}
            >
              {loading ? 'Booking…' : 'Confirm Meeting'}
            </button>
          </form>
        )}

        {/* ── STEP 4: Done ── */}
        {step === 'done' && (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#111212] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <h4 className="font-mont font-semibold text-[20px] text-[#111212]">You&apos;re booked!</h4>
              <p className="font-inter text-[14px] text-[#929296] mt-1">
                A confirmation has been sent to <span className="text-[#111212] font-medium">{email}</span>
              </p>
            </div>
            <div className="bg-[#f9f9f9] rounded-[12px] p-4 border border-[#f0f0f0] w-full text-left">
              <p className="font-inter text-[12px] text-[#929296] uppercase tracking-wide mb-1">Meeting details</p>
              <p className="font-mont font-semibold text-[15px] text-[#111212]">Zeerak Jamshaid — 30 min</p>
              <p className="font-inter text-[14px] text-[#555] mt-1">
                {displayDate} · {selectedTime ? formatTime(selectedTime) : ''}
              </p>
              <p className="font-inter text-[12px] text-[#929296] mt-1">
                Web conferencing details provided upon confirmation.
              </p>
            </div>
            <button
              onClick={() => {
                setStep('calendar')
                setSelectedDate(null)
                setSelectedTime(null)
                setName('')
                setEmail('')
              }}
              className="font-inter text-[13px] text-[#929296] hover:text-[#111212] transition-colors underline underline-offset-2"
            >
              Book another meeting
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
