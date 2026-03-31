"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { AlertTriangle, Send, CheckCircle } from "lucide-react"

const issueTypes = [
  "Payment not received",
  "Task wrongly rejected",
  "Technical bug",
  "Account access issue",
  "Verification problem",
  "Other",
]

export default function ReportIssuePage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", type: "", description: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-12 bg-gradient-to-b from-[var(--secondary)] to-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            🚨 Report Issue
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] leading-tight mb-4">
            Report a Problem
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            Encountered something broken or unfair? We investigate every report within 48 hours.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {sent ? (
            <div className="text-center py-20 space-y-4">
              <CheckCircle className="w-16 h-16 text-[var(--success)] mx-auto" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Issue Reported</h2>
              <p className="text-[var(--text-secondary)]">Our team will review it within 48 hours and reach out if needed.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", type: "", description: "" }) }}
                className="mt-4 px-6 py-2 rounded-full bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors"
              >
                Report Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[var(--border-color)] rounded-3xl p-8 shadow-sm space-y-5">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Please be as specific as possible. Include task IDs, dates, or screenshots if relevant.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2 block">Your Name</label>
                  <input required type="text" placeholder="Your name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 bg-[var(--secondary)]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2 block">Email</label>
                  <input required type="email" placeholder="you@email.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 bg-[var(--secondary)]" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2 block">Issue Type</label>
                <select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 bg-[var(--secondary)] text-[var(--text-primary)]">
                  <option value="">Select issue type...</option>
                  {issueTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2 block">Description</label>
                <textarea required rows={5} placeholder="Describe the issue in detail..." value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 bg-[var(--secondary)] resize-none" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl py-3.5 hover:opacity-90 transition-opacity disabled:opacity-70">
                {loading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Send className="w-4 h-4" />}
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
