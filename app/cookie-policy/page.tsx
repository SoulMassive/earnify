import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Earnify",
  description: "Learn how Earnify uses cookies and how you can manage your preferences.",
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-28 pb-12 bg-gradient-to-b from-[var(--secondary)] to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold mb-3">Legal</p>
          <h1 className="text-4xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] mb-3">Cookie Policy</h1>
          <p className="text-sm text-[var(--text-secondary)]">Last updated: March 31, 2025</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {[
            { h: "What Are Cookies?", p: "Cookies are small text files stored on your device by your browser. They help websites remember your preferences, stay logged in, and understand how you use the site." },
            { h: "Essential Cookies", p: "These cookies are required for the platform to function. They handle authentication, session management, and security. You cannot opt out of essential cookies while using Earnify." },
            { h: "Analytics Cookies", p: "We use anonymous analytics cookies (via Vercel Analytics) to understand which pages are visited and how users navigate the platform. This helps us improve the experience." },
            { h: "Preference Cookies", p: "These remember your language, currency, and display settings so you don't have to re-select them each visit." },
            { h: "Third-Party Cookies", p: "Some features (e.g., embedded videos, social sharing) may set cookies from third-party providers. We do not control these cookies." },
            { h: "Managing Cookies", p: "You can manage or disable cookies through your browser settings. Note that disabling essential cookies will prevent the platform from functioning correctly." },
          ].map((s) => (
            <div key={s.h} className="mb-8">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">{s.h}</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{s.p}</p>
            </div>
          ))}
          <div className="mt-10 flex gap-4 flex-wrap">
            <Link href="/privacy-policy" className="text-sm text-[var(--primary)] hover:underline">Privacy Policy →</Link>
            <Link href="/terms-of-service" className="text-sm text-[var(--primary)] hover:underline">Terms of Service →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
