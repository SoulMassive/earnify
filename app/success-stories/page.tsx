import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Success Stories | Earnify",
  description: "Read real stories from students who transformed their free time into real income with Earnify.",
}

const journeys = [
  {
    name: "Aman Sharma",
    role: "Engineering Student → ₹12,400 earned",
    college: "IIT Roorkee",
    story:
      "I started with affiliate marketing during my 3rd semester. Within 6 weeks, I had earned enough to cover my semester books and internet bill. Earnify made it dead simple to get started without any prior experience.",
    highlight: "First payout in 9 days",
    avatar: "AS",
    color: "from-teal-400 to-cyan-500",
  },
  {
    name: "Priya Mehta",
    role: "BBA Student → ₹8,200 earned",
    college: "Delhi University",
    story:
      "I was always looking for a flexible income source that wouldn't interfere with my classes. Earnify let me pick tasks on weekends and earn consistently. Now I mentor 3 juniors on the platform too.",
    highlight: "20+ tasks completed",
    avatar: "PM",
    color: "from-purple-400 to-pink-500",
  },
  {
    name: "Rohit Verma",
    role: "Freelancer → ₹21,000 earned",
    college: "NMIMS Mumbai",
    story:
      "After trying multiple platforms, Earnify was the only one that paid on time, every time. The gig quality is genuinely good — no scam tasks, no fake promises. Just real work and real money.",
    highlight: "₹21K in 2 months",
    avatar: "RV",
    color: "from-orange-400 to-amber-500",
  },
]

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[var(--secondary)] to-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary-dark)] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            🏆 Success Stories
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] leading-tight mb-4">
            Real Students. Real Results.
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            These aren't hypothetical numbers — these are real journeys from students just like you.
          </p>
        </div>
      </section>

      {/* Journey Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journeys.map((j) => (
              <div key={j.name} className="bg-[var(--secondary)] rounded-2xl p-8 border border-[var(--border-color)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${j.color} flex items-center justify-center text-white font-black text-sm shadow-md`}>
                    {j.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">{j.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{j.college}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">"{j.story}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)] font-medium">{j.role}</span>
                  <span className="text-xs bg-[var(--primary)]/10 text-[var(--primary-dark)] font-bold px-3 py-1 rounded-full">
                    ✓ {j.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      <Footer />
    </main>
  )
}
