import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CategoryStrip } from "@/components/category-strip"
import { CategoriesGrid } from "@/components/categories-grid"
import { OpportunityCards } from "@/components/opportunity-cards"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { Leaderboard } from "@/components/leaderboard"
import { DashboardPreview } from "@/components/dashboard-preview"
import { LiveSessions } from "@/components/live-sessions"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoryStrip />
      <CategoriesGrid />
      <OpportunityCards />
      <HowItWorks />
      <DashboardPreview />
      <LiveSessions />
      <Testimonials />
      <Leaderboard />
      <Footer />
    </main>
  )
}
