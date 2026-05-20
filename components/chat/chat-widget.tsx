'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useUIStore } from '@/lib/store'
import { X, Send, MessageCircle, Loader2, Calendar, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────
type Role = 'user' | 'assistant'

interface Message {
  id: string
  role: Role
  content: string
  timestamp: Date
}

type BookingStep = 'idle' | 'date' | 'time' | 'details'

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
]

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`
}

function getNext7Days() {
  const days: Date[] = []
  const today = new Date()
  for (let i = 1; i <= 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }
  return days
}

// unique id — counter-based to avoid Date.now() collisions
let msgCounter = 0
function nextId() {
  return `msg_${++msgCounter}_${Math.random().toString(36).slice(2, 7)}`
}

const QUICK_REPLIES = [
  'What services do you offer?',
  'How much does it cost?',
  'Book a meeting',
  'Talk to a human',
]

// simple greeting patterns
const GREETING_RE = /^(hi|hello|hey|salam|assalam|good morning|good afternoon|good evening|howdy|sup|yo)\b/i

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-[#929296] animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
        />
      ))}
    </div>
  )
}

export function ChatWidget() {
  const { isChatOpen, setChatOpen, toggleChat } = useUIStore()

  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId(),
      role: 'assistant',
      content: "Welcome to Thrill Edge Technologies! 👋\n\nI'm EdgeAI, your AI assistant. How may I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)

  // booking state
  const [bookingStep, setBookingStep] = useState<BookingStep>('idle')
  const [meetingBooked, setMeetingBooked] = useState(false) // once booked, never re-trigger
  const [bookingDate, setBookingDate] = useState<Date | null>(null)
  const [bookingTime, setBookingTime] = useState<string | null>(null)
  const [bookingName, setBookingName] = useState('')
  const [bookingEmail, setBookingEmail] = useState('')
  const [bookingPhone, setBookingPhone] = useState('')
  const [bookingLoading, setBookingLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, bookingStep])

  useEffect(() => {
    if (isChatOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isChatOpen])

  const addMessage = useCallback((role: Role, content: string) => {
    const id = nextId()
    setMessages(prev => [...prev, { id, role, content, timestamp: new Date() }])
  }, [])

  function detectBookingIntent(text: string) {
    return /\b(book|meeting|schedule|call|appointment)\b/i.test(text)
  }

  function detectHumanIntent(text: string) {
    return /\b(human|real person|whatsapp|agent|talk to someone|speak to someone)\b/i.test(text)
  }

  // check if user is saying they already booked
  function detectAlreadyBooked(text: string) {
    return /already\s+(booked|scheduled|have a meeting|done)/i.test(text)
  }

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return
    setShowQuickReplies(false)
    addMessage('user', text)
    setInput('')

    // greeting — short warm reply, no API call
    if (GREETING_RE.test(text.trim())) {
      await delay(500)
      addMessage('assistant', `Hi there! 😊 How may I help you today?\n\nFeel free to ask about our services, pricing, or anything else — I'm here to help.`)
      return
    }

    // user says they already booked — acknowledge, don't re-trigger booking
    if (detectAlreadyBooked(text)) {
      await delay(500)
      addMessage('assistant', `That's great! 🎉 Your meeting is all set. Is there anything else I can help you with — like learning more about our services or getting answers to any questions?`)
      return
    }

    // booking intent — only if not already in a booking flow and not already booked
    if (detectBookingIntent(text) && bookingStep === 'idle' && !meetingBooked) {
      await delay(500)
      addMessage('assistant', "Sure! Let me help you book a free 30-minute strategy call with Zeerak. Please pick a date below 👇")
      setBookingStep('date')
      return
    }

    // if booking is in progress, don't send to AI
    if (bookingStep !== 'idle') return

    // human/whatsapp intent
    if (detectHumanIntent(text)) {
      await delay(500)
      addMessage('assistant', "Of course! You can reach our team directly on WhatsApp — they typically respond within a few minutes during business hours.\n\n👉 [Chat on WhatsApp](https://wa.me/447853746775)\n\nOr email us at info@thrilledge.com")
      return
    }

    // send to Groq
    setLoading(true)
    try {
      const history = [...messages, { id: 'tmp', role: 'user' as Role, content: text, timestamp: new Date() }]
        .map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      addMessage('assistant', data.reply)
    } catch {
      addMessage('assistant', "Sorry, I'm having a bit of trouble right now. Please reach us on [WhatsApp](https://wa.me/447853746775) or at info@thrilledge.com")
    } finally {
      setLoading(false)
    }
  }

  function handleDateSelect(date: Date) {
    setBookingDate(date)
    setBookingStep('time')
    const label = date.toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' })
    addMessage('user', label)
    addMessage('assistant', `${label} — perfect! Now please pick a time slot 👇`)
  }

  function handleTimeSelect(time: string) {
    setBookingTime(time)
    setBookingStep('details')
    addMessage('user', formatTime(time))
    addMessage('assistant', "Great choice! Just a few details to confirm your booking 👇")
  }

  async function handleBookingSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!bookingDate || !bookingTime || !bookingName || !bookingEmail || !bookingPhone) return
    setBookingLoading(true)

    const dateStr = bookingDate.toISOString().split('T')[0]
    try {
      const res = await fetch('/api/book-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: bookingName, email: bookingEmail, phone: bookingPhone, date: dateStr, time: bookingTime }),
      })
      if (!res.ok) throw new Error()

      const firstName = bookingName.split(' ')[0]
      const dateLabel = bookingDate.toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' })

      addMessage('user', `${bookingName} — ${bookingEmail}`)
      addMessage('assistant', `✅ You're all set, ${firstName}! Your meeting is confirmed for **${dateLabel} at ${formatTime(bookingTime)}**.\n\nA confirmation has been sent to ${bookingEmail}. Looking forward to speaking with you! 🎉`)

      setMeetingBooked(true)
      setBookingStep('idle')
      // reset form fields
      setBookingName('')
      setBookingEmail('')
      setBookingPhone('')
      setBookingDate(null)
      setBookingTime(null)
    } catch {
      addMessage('assistant', "Something went wrong. Please try booking at [/contact](/contact) or reach us on [WhatsApp](https://wa.me/447853746775).")
      setBookingStep('idle')
    } finally {
      setBookingLoading(false)
    }
  }

  function renderContent(content: string) {
    const parts = content.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\n)/)
    return parts.filter(Boolean).map((part, i) => {
      if (part === '\n') return <br key={i} />
      if (/^\*\*(.+)\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-medium">{linkMatch[1]}</a>
      return part
    })
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={toggleChat}
        aria-label="Open chat"
        className={cn(
          'fixed bottom-6 right-6 z-9999 w-14 h-14 rounded-full bg-[#111212] text-white shadow-2xl',
          'flex items-center justify-center transition-all duration-300',
          'hover:scale-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
          isChatOpen && 'scale-0 opacity-0 pointer-events-none'
        )}
      >
        <MessageCircle size={24} />
        <span className="absolute inset-0 rounded-full bg-[#111212] animate-ping opacity-20" />
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-9999 w-92.5 max-w-[calc(100vw-24px)]',
          'flex flex-col bg-white rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.18)]',
          'border border-[#e5e5e5] overflow-hidden',
          'transition-all duration-300 origin-bottom-right',
          isChatOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        )}
        style={{ height: '560px', maxHeight: 'calc(100vh - 100px)' }}
      >
        {/* Header */}
        <div className="bg-[#111212] px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <MessageSquare size={16} className="text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#111212]" />
            </div>
            <div>
              <p className="font-mont font-semibold text-[14px] text-white leading-none">EdgeAI</p>
              <p className="font-inter text-[11px] text-white/50 mt-0.5">Thrill Edge Technologies</p>
            </div>
          </div>
          <button
            onClick={() => setChatOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close chat"
          >
            <X size={15} className="text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[82%] px-4 py-2.5 rounded-2xl font-inter text-[13.5px] leading-[1.55]',
                  msg.role === 'user'
                    ? 'bg-[#111212] text-white rounded-br-sm'
                    : 'bg-[#f3f3f3] text-[#111212] rounded-bl-sm'
                )}
              >
                {renderContent(msg.content)}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#f3f3f3] rounded-2xl rounded-bl-sm">
                <TypingDots />
              </div>
            </div>
          )}

          {/* Booking: date picker */}
          {bookingStep === 'date' && (
            <div className="flex justify-start w-full">
              <div className="bg-[#f3f3f3] rounded-2xl rounded-bl-sm p-3 w-full">
                <p className="font-inter text-[12px] text-[#929296] mb-2 px-1">Select a date</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {getNext7Days().map((d) => (
                    <button
                      key={d.toDateString()}
                      onClick={() => handleDateSelect(d)}
                      className="py-2 px-3 rounded-xl bg-white border border-[#e5e5e5] hover:border-[#111212] hover:bg-[#111212] hover:text-white font-inter text-[12px] text-[#111212] transition-all text-left"
                    >
                      <span className="font-semibold">{d.toLocaleDateString('en-GB', { weekday: 'short' })}</span>
                      <span className="text-[#929296] ml-1 group-hover:text-white">{d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Booking: time picker */}
          {bookingStep === 'time' && (
            <div className="flex justify-start w-full">
              <div className="bg-[#f3f3f3] rounded-2xl rounded-bl-sm p-3 w-full">
                <p className="font-inter text-[12px] text-[#929296] mb-2 px-1">Select a time</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleTimeSelect(t)}
                      className="py-2 rounded-xl bg-white border border-[#e5e5e5] hover:border-[#111212] hover:bg-[#111212] hover:text-white font-inter text-[12px] text-[#111212] transition-all"
                    >
                      {formatTime(t)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Booking: details form */}
          {bookingStep === 'details' && (
            <div className="flex justify-start w-full">
              <div className="bg-[#f3f3f3] rounded-2xl rounded-bl-sm p-3 w-full">
                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-2">
                  <input
                    type="text" required placeholder="Your full name"
                    value={bookingName} onChange={e => setBookingName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e5e5e5] bg-white font-inter text-[13px] text-[#111212] placeholder:text-[#c8c8c8] focus:outline-none focus:border-[#111212] transition-colors"
                  />
                  <input
                    type="email" required placeholder="Email address"
                    value={bookingEmail} onChange={e => setBookingEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e5e5e5] bg-white font-inter text-[13px] text-[#111212] placeholder:text-[#c8c8c8] focus:outline-none focus:border-[#111212] transition-colors"
                  />
                  <input
                    type="tel" required placeholder="Phone number"
                    value={bookingPhone} onChange={e => setBookingPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#e5e5e5] bg-white font-inter text-[13px] text-[#111212] placeholder:text-[#c8c8c8] focus:outline-none focus:border-[#111212] transition-colors"
                  />
                  <button
                    type="submit" disabled={bookingLoading}
                    className="w-full py-2.5 rounded-xl bg-[#111212] text-white font-mont font-semibold text-[13px] hover:bg-black transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {bookingLoading
                      ? <><Loader2 size={14} className="animate-spin" /> Booking…</>
                      : <><Calendar size={14} /> Confirm Meeting</>}
                  </button>
                </form>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        {showQuickReplies && messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="px-3 py-1.5 rounded-full border border-[#e5e5e5] bg-white hover:bg-[#f3f3f3] font-inter text-[12px] text-[#111212] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="px-4 py-3 border-t border-[#f0f0f0] flex items-center gap-2 shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
            placeholder="Ask me anything…"
            disabled={loading}
            className="flex-1 bg-[#f3f3f3] rounded-full px-4 py-2.5 font-inter text-[13.5px] text-[#111212] placeholder:text-[#929296] focus:outline-none focus:ring-2 focus:ring-[#111212]/10 transition-all disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-full bg-[#111212] flex items-center justify-center shrink-0 hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send"
          >
            {loading
              ? <Loader2 size={15} className="text-white animate-spin" />
              : <Send size={15} className="text-white" />}
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 pb-3 flex items-center justify-between shrink-0">
          <a
            href="https://wa.me/447853746775"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-inter text-[11px] text-[#929296] hover:text-[#25D366] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <span className="font-inter text-[10px] text-[#c8c8c8]">Powered by Thrill Edge AI</span>
        </div>
      </div>
    </>
  )
}

// small helper to avoid inline setTimeout promises everywhere
function delay(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms))
}
