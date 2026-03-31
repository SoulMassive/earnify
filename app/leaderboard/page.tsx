import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Leaderboard } from "@/components/leaderboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leaderboard | Earnify",
  description: "See this week's top earners and climb the Earnify rankings to unlock exclusive premium opportunities.",
}

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-[var(--secondary)]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-10 bg-gradient-to-b from-[var(--primary-light)] to-[var(--secondary)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary-dark)] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            🏆 Rankings
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] leading-tight mb-4">
            Top Earners This Week
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Compete, climb, and unlock exclusive perks as you rise through the ranks.
          </p>
        </div>
      </section>

      <Leaderboard />

      <Footer />
    </main>
  )
}
