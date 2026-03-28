"use client"

import { Zap, TrendingUp, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CategoryHeroProps {
  title: string;
  potential: string;
  description: string;
  avgIncome: string;
  demandLevel: string;
  successRate: string;
}

export function CategoryHero({ title, potential, description, avgIncome, demandLevel, successRate }: CategoryHeroProps) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--primary)]/5 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl overflow-hidden group">
          {/* Animated subtle light streak */}
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/30 mb-4 animate-fade-in">
                <TrendingUp className="w-4 h-4 text-[var(--primary-light)]" />
                <span className="text-xs font-semibold text-[var(--primary-light)]">Independent Micro-Business Hub</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 font-[family-name:var(--font-syne)] tracking-tight">
                {title} 
              </h1>
              
              <p className="text-lg text-[var(--text-muted)] mb-8 leading-relaxed">
                {description}
              </p>

              {/* Business Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">Avg Income</span>
                  <span className="text-sm font-bold text-white">{avgIncome}/mo</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">Demand</span>
                  <span className="text-sm font-bold text-[var(--primary-light)]">{demandLevel}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">Success Rate</span>
                  <span className="text-sm font-bold text-[var(--success)]">{successRate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="btn-primary-gradient px-8 h-12 rounded-full font-bold shadow-lg shadow-[var(--primary)]/20">
                  Start Earning
                </Button>
                <Button variant="outline" className="border-white/20 text-white rounded-full px-8 h-12 bg-white/5 hover:bg-white/10">
                  Learn First
                </Button>
              </div>
            </div>

            <div className="lg:text-right">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center lg:items-end">
                <span className="text-sm text-[var(--text-muted)] mb-1 uppercase tracking-wider font-bold">Max Potential</span>
                <span className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-jetbrains)] text-[var(--primary-light)]">
                   {potential}
                </span>
                <p className="text-xs text-[var(--text-muted)] mt-4 max-w-[200px]">
                  Based on top performance metrics for {title.split(' ')[0]} students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
