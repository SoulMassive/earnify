"use client"

import { Search, Filter, SortAsc, MapPin, Briefcase, GraduationCap } from "lucide-react"

export function CategoryFilters() {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 sticky top-10 z-30 mb-8 animate-fade-in shadow-xl">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search */}
        <div className="flex-1 relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
          <input
            type="text"
            placeholder="Search specific gigs or tasks..."
            className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] text-sm text-white placeholder-[var(--text-muted)] transition-all"
          />
        </div>

        {/* Skill Level */}
        <div className="flex flex-row items-center gap-2 w-full lg:w-auto overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors shrink-0">
            <GraduationCap className="w-4 h-4 text-[var(--primary-light)]" />
            <span className="text-sm text-white font-medium">Any Skill</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors shrink-0">
            <Briefcase className="w-4 h-4 text-[var(--primary-light)]" />
            <span className="text-sm text-white font-medium">Gig Type</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors shrink-0">
             <SortAsc className="w-4 h-4 text-[var(--primary-light)]" />
             <span className="text-sm text-white font-medium">Highest Pay</span>
          </div>
        </div>
      </div>
    </div>
  )
}
