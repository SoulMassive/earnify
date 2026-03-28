"use client"

import Link from "next/link"
import { Zap, Briefcase, Star, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Gig {
  id: string;
  title: string;
  payout: number;
  deadline: string;
  difficulty: string;
  company: string;
  tags: string[];
}

interface CategoryGigListProps {
  gigs: Gig[];
  categorySlug: string;
}

export function CategoryGigList({ gigs, categorySlug }: CategoryGigListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
      {gigs.map((gig) => (
        <div 
          key={gig.id} 
          className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all hover:-translate-y-1 shadow-2xl hover:shadow-[var(--primary)]/10"
        >
          {/* Subtle Glow Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-[var(--primary-light)] transition-colors line-clamp-1">{gig.title}</h3>
                <p className="text-xs text-[var(--text-muted)] group-hover:text-white/60 transition-colors uppercase tracking-widest font-bold">{gig.company}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xl font-bold font-[family-name:var(--font-jetbrains)] text-[var(--primary-light)]">₹{gig.payout}</div>
              <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Payout</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 mt-4">
             <span className="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-[10px] font-bold text-white uppercase tracking-tight">
              {gig.deadline}
            </span>
             <span className="px-2 py-1 rounded-md bg-[var(--primary)]/20 border border-[var(--primary)]/30 text-[10px] font-bold text-[var(--primary-light)] uppercase tracking-tight">
              {gig.difficulty}
            </span>
            {gig.tags.map(tag => (
              <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] sm:text-xs font-bold text-[var(--text-muted)] uppercase">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <Link 
              href={`/categories/${categorySlug}/${gig.id}`}
              className="flex-1 btn-primary-gradient h-10 rounded-xl font-bold shadow-lg shadow-[var(--primary)]/20 group-hover:shadow-[var(--primary)]/40 transition-all flex items-center justify-center text-sm"
            >
              Apply
            </Link>
            <Link 
              href={`/categories/${categorySlug}/${gig.id}`}
              className="w-10 h-10 p-0 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 shrink-0 flex items-center justify-center"
            >
               <ExternalLink className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
