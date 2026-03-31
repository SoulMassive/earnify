import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { BookOpen, CreditCard, Shield, Zap, MessageCircle, FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help Center | Earnify",
  description: "Find guides, tutorials, and answers to help you make the most of Earnify.",
}

const guides = [
  {
    icon: Zap,
    title: "Getting Started",
    description: "Create your account, complete onboarding, and land your first gig.",
    link: "/faq",
    color: "from-teal-400 to-cyan-500",
  },
  {
    icon: CreditCard,
    title: "Payouts & Payments",
    description: "How to set up your payout method and track your earnings in real time.",
    link: "/faq",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Shield,
    title: "Account & Security",
    description: "Keep your account safe with 2FA, strong passwords, and session management.",
    link: "/faq",
    color: "from-orange-400 to-amber-500",
  },
  {
    icon: BookOpen,
    title: "Task Guidelines",
    description: "Understand submission standards to avoid rejections and maximise approval rate.",
    link: "/faq",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: MessageCircle,
    title: "Community & Forums",
    description: "Learn to use the forum, post questions, and connect with other earners.",
    link: "/forum",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: FileText,
    title: "Legal & Policies",
    description: "Read our terms, privacy, refund, and cookie policies in plain language.",
    link: "/privacy-policy",
    color: "from-rose-400 to-fuchsia-500",
  },
]

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-12 bg-gradient-to-b from-[var(--secondary)] to-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary-dark)] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            📚 Help Center
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] leading-tight mb-4">
            How Can We Help?
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            Browse our guides or jump straight to the FAQ for quick answers.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((g) => {
              const Icon = g.icon
              return (
                <Link
                  key={g.title}
                  href={g.link}
                  className="group bg-[var(--secondary)] hover:bg-white border border-[var(--border-color)] hover:border-[var(--primary)] rounded-2xl p-7 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${g.color} flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {g.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {g.description}
                  </p>
                </Link>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center p-10 bg-gradient-to-r from-[var(--primary-light)] to-[var(--secondary)] rounded-3xl border border-[var(--border-color)]">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Still need help?</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-6">Our support team responds within 24 hours.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--primary)] text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-[var(--primary-dark)] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
