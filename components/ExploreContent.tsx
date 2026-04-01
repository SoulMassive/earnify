"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CategoriesGrid } from "@/components/categories-grid";
import { OpportunityCards } from "@/components/opportunity-cards";
import { CategoryStrip } from "@/components/category-strip";
import { Loader2 } from "lucide-react";

export default function ExploreContent() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/signup");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f10] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
        <p className="text-white/30 font-bold tracking-widest uppercase text-xs">Verifying Access...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-[var(--primary-light)] to-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary-dark)] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            🔍 Explore
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] leading-tight mb-4">
            Find Your Next Opportunity
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Browse gigs, affiliate deals, and micro-tasks built around your schedule and skill level.
          </p>
        </div>
      </section>

      <CategoryStrip />
      <CategoriesGrid />
      <OpportunityCards />

      <Footer />
    </main>
  );
}
