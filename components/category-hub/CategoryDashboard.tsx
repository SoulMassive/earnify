"use client"

import { Activity, Star, Clock, Zap, TrendingUp, CheckCircle2 } from "lucide-react"

interface CategoryDashboardProps {
  categoryTitle: string;
}

export function CategoryDashboard({ categoryTitle }: CategoryDashboardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden h-full">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-3xl" />
      
      <div className="flex items-center gap-3 mb-8">
         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
         </div>
         <h2 className="text-xl font-bold text-white font-[family-name:var(--font-syne)] tracking-tight">Your Progress</h2>
      </div>

      <div className="space-y-6">
        {/* Earnings Progress */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3">
             <TrendingUp className="w-4 h-4 text-[var(--success)] opacity-40" />
          </div>
          <p className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">Total Earned</p>
          <p className="text-3xl font-bold font-[family-name:var(--font-jetbrains)] text-white">Rs. 0.00</p>
          <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
             <div className="w-0 h-full bg-[var(--primary)] group-hover:w-full transition-all duration-1000 ease-out" />
          </div>
          <p className="text-[10px] text-[var(--text-muted)] mt-2 font-bold uppercase tracking-tighter">Rs. 5000 to reach Silver Rank</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center text-center">
             <CheckCircle2 className="w-5 h-5 text-[var(--primary-light)] mb-2" />
             <p className="text-xl font-bold text-white">0</p>
             <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-tighter">Tasks Done</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center text-center">
             <Clock className="w-5 h-5 text-[var(--primary-light)] mb-2" />
             <p className="text-xl font-bold text-white">0.0h</p>
             <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-tighter">Hours Active</p>
          </div>
        </div>

        {/* Recommended Action */}
        <div className="p-4 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 animate-pulse">
           <p className="text-xs text-[var(--primary-light)] font-bold text-center">Ready to start? Pick your first task now!</p>
        </div>
      </div>
    </div>
  )
}
