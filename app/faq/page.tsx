"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "How do I get started on Earnify?",
    a: "Sign up for a free account, complete a quick onboarding, and you'll instantly see gigs matched to your skills and availability. Your first task can be completed within hours of joining.",
  },
  {
    q: "Is Earnify free to join?",
    a: "Yes, completely free. There are no hidden fees, no subscriptions, and no upfront costs. You earn money — we don't charge you for the privilege.",
  },
  {
    q: "How fast are payouts processed?",
    a: "Payouts are processed within 24–48 hours of task approval. We support UPI, bank transfer, and popular wallets. Most users receive funds the same day approval is granted.",
  },
  {
    q: "What kind of tasks are available?",
    a: "Affiliate marketing, content writing, graphic design, data entry, video editing, social media tasks, coding micro-projects, online surveys, and more. New gigs are added daily.",
  },
  {
    q: "Do I need prior experience?",
    a: "No experience is needed for entry-level tasks. We have gigs suited for complete beginners through seasoned freelancers. The platform matches you to tasks appropriate for your skill level.",
  },
  {
    q: "How much can I realistically earn?",
    a: "Students typically earn ₹3,000–₹25,000 per month depending on hours invested and skill level. Some top earners make significantly more by taking on higher-value gigs.",
  },
  {
    q: "Is my data safe on Earnify?",
    a: "We take privacy seriously. Your data is encrypted, never sold to third parties, and you control what you share. Read our Privacy Policy for full details.",
  },
  {
    q: "What happens if a task is rejected?",
    a: "If a task is flagged for revision, you'll receive specific feedback and get a chance to resubmit. Outright rejections are rare and always explained clearly.",
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[var(--border-color)] rounded-2xl overflow-hidden bg-white transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-[var(--secondary)] transition-colors duration-200"
      >
        <span className="font-semibold text-[var(--text-primary)] text-[15px] leading-snug">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--primary)] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)]">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-12 bg-gradient-to-b from-[var(--secondary)] to-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary-dark)] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            💬 FAQ
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] leading-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            Everything you need to know before getting started.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
