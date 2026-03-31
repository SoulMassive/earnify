import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Earnify",
  description: "Read Earnify's terms of service before using the platform.",
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-28 pb-12 bg-gradient-to-b from-[var(--secondary)] to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold mb-3">Legal</p>
          <h1 className="text-4xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] mb-3">Terms of Service</h1>
          <p className="text-sm text-[var(--text-secondary)]">Last updated: March 31, 2025</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {[
            { h: "1. Acceptance of Terms", p: "By accessing or using Earnify, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform." },
            { h: "2. Eligibility", p: "You must be at least 18 years old, or the age of legal majority in your jurisdiction, to use Earnify. By registering, you represent that you meet this requirement." },
            { h: "3. Account Responsibilities", p: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorised use." },
            { h: "4. Permitted Use", p: "Earnify is for legitimate task completion and affiliate marketing activities only. You may not use the platform for fraud, spam, manipulation, or any unlawful purpose." },
            { h: "5. Task Submissions", p: "You agree to submit only original, honest work. Fake submissions, inflated metrics, or plagiarised content will result in task rejection, balance forfeiture, and possible account termination." },
            { h: "6. Payments & Fees", p: "Earnify is free to join. We retain a platform service fee on each completed task as disclosed in the task details. Payout timelines and methods are subject to our Payout Policy." },
            { h: "7. Intellectual Property", p: "All Earnify branding, design, and functionality is the property of Earnify Pvt. Ltd. User-submitted content remains owned by the user, but you grant us a licence to use it for platform operations." },
            { h: "8. Termination", p: "We reserve the right to suspend or terminate accounts that violate these terms, with or without prior notice, at our sole discretion." },
            { h: "9. Limitation of Liability", p: "Earnify is not liable for indirect, incidental, or consequential damages arising from your use of the platform. Our total liability to you shall not exceed the amount paid by you in the last 12 months." },
            { h: "10. Changes to Terms", p: "We may modify these Terms at any time. Continued use of the platform after changes constitutes acceptance of the updated Terms." },
          ].map((s) => (
            <div key={s.h} className="mb-8">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">{s.h}</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{s.p}</p>
            </div>
          ))}
          <div className="mt-10 flex gap-4 flex-wrap">
            <Link href="/privacy-policy" className="text-sm text-[var(--primary)] hover:underline">Privacy Policy →</Link>
            <Link href="/refund-policy" className="text-sm text-[var(--primary)] hover:underline">Refund Policy →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
