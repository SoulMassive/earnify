import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Earnify",
  description: "Read Earnify's privacy policy to understand how we collect, use, and protect your data.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-28 pb-12 bg-gradient-to-b from-[var(--secondary)] to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold mb-3">Legal</p>
          <h1 className="text-4xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] mb-3">Privacy Policy</h1>
          <p className="text-sm text-[var(--text-secondary)]">Last updated: March 31, 2025</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none">
          {[
            { h: "1. Information We Collect", p: "We collect information you provide directly when you register, complete your profile, submit tasks, or contact support. This includes your name, email address, phone number, bank/UPI details for payouts, and any content you upload or share on the platform." },
            { h: "2. How We Use Your Information", p: "We use your information to operate and improve the Earnify platform, process payments, send transactional and marketing communications, prevent fraud, and comply with legal obligations. We do not sell your personal data to third parties." },
            { h: "3. Data Sharing", p: "We share data with trusted service providers (payment processors, cloud infrastructure, analytics) strictly for platform operations. All third-party providers are contractually bound to protect your data." },
            { h: "4. Cookies", p: "We use essential cookies to operate the platform and optional analytics cookies to understand usage patterns. You can manage cookie preferences at any time via our Cookie Policy page." },
            { h: "5. Data Retention", p: "We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting support." },
            { h: "6. Your Rights", p: "You have the right to access, correct, or delete your personal data; object to processing; and request data portability. To exercise any of these rights, contact us at privacy@earnify.in." },
            { h: "7. Security", p: "We implement industry-standard security measures including TLS encryption, secure data centres, and regular security audits. However, no transmission over the internet is 100% secure." },
            { h: "8. Changes to This Policy", p: "We may update this Privacy Policy periodically. We will notify you of material changes via email or a prominent notice on the platform before they take effect." },
            { h: "9. Contact", p: "For privacy-related questions, email privacy@earnify.in or use the Contact page." },
          ].map((s) => (
            <div key={s.h} className="mb-8">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">{s.h}</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{s.p}</p>
            </div>
          ))}
          <div className="mt-10 flex gap-4 flex-wrap">
            <Link href="/terms-of-service" className="text-sm text-[var(--primary)] hover:underline">Terms of Service →</Link>
            <Link href="/cookie-policy" className="text-sm text-[var(--primary)] hover:underline">Cookie Policy →</Link>
            <Link href="/refund-policy" className="text-sm text-[var(--primary)] hover:underline">Refund Policy →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
