import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund Policy | Earnify",
  description: "Read Earnify's refund and cancellation policy.",
}

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-28 pb-12 bg-gradient-to-b from-[var(--secondary)] to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold mb-3">Legal</p>
          <h1 className="text-4xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] mb-3">Refund Policy</h1>
          <p className="text-sm text-[var(--text-secondary)]">Last updated: March 31, 2025</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {[
            { h: "1. Platform Fees", p: "Earnify is free to use. We do not charge any registration or subscription fees. A small service commission is retained on completed tasks at the rate disclosed in each task's details page." },
            { h: "2. Task Earnings", p: "Earnings are credited to your Earnify wallet upon task approval. Once credited, earnings are yours and will not be clawed back unless task fraud or policy violations are confirmed after investigation." },
            { h: "3. Rejected Tasks", p: "If a task is rejected, no earnings are credited. You will receive specific feedback and, in most cases, the opportunity to revise and resubmit." },
            { h: "4. Payout Refunds", p: "Once a payout has been successfully processed to your UPI ID or bank account, it cannot be reversed or refunded. It is your responsibility to ensure payout details are accurate before requesting withdrawal." },
            { h: "5. Premium Features", p: "If Earnify offers optional premium subscriptions or one-time paid features in the future, a 7-day refund window will apply from the date of purchase, provided the feature has not been substantially used." },
            { h: "6. Disputes", p: "For any payout or earnings disputes, contact support@earnify.in within 14 days of the event. We investigate all disputes and respond within 5 business days." },
            { h: "7. Contact", p: "For refund-related questions, email support@earnify.in or use the Contact page." },
          ].map((s) => (
            <div key={s.h} className="mb-8">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">{s.h}</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{s.p}</p>
            </div>
          ))}
          <div className="mt-10 flex gap-4 flex-wrap">
            <Link href="/terms-of-service" className="text-sm text-[var(--primary)] hover:underline">Terms of Service →</Link>
            <Link href="/privacy-policy" className="text-sm text-[var(--primary)] hover:underline">Privacy Policy →</Link>
            <Link href="/contact" className="text-sm text-[var(--primary)] hover:underline">Contact Support →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
