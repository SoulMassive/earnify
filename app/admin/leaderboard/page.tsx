"use client"

import React, { useEffect, useState } from "react"
import { Trophy, RefreshCcw, Star, Medal, Users, TrendingUp, Filter, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AdminLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard')
      const data = await res.json()
      setLeaderboard(data)
    } finally {
      setLoading(false)
    }
  }

  const handleResetSeason = () => {
    if (!confirm("Are you sure? This will reset all current student points to 0!")) return
    toast.info("Resetting season...")
    // In real app, call API to reset points
  }

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
           <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)]" />
           <p className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)]">Calculating Power Rankings...</p>
        </div>
     )
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-syne)] tracking-tight text-white mb-2">Arena Leaderboard Control</h1>
          <p className="text-[var(--text-muted)] font-medium">Moderate student rankings, adjust power scores, and manage seasonal cycles.</p>
        </div>
        <Button 
          onClick={handleResetSeason}
          className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 h-12 px-6 rounded-2xl font-bold group"
        >
          <RefreshCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform" />
          Reset Current Season
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         {[
            { label: "Top Earner", value: leaderboard[0]?.name || "None", icon: Trophy, color: "text-yellow-400" },
            { label: "Total Points", value: leaderboard.reduce((acc, current) => acc + (current.points || 0), 0), icon: Star, color: "text-[var(--primary)]" },
            { label: "Active Participants", value: leaderboard.length, icon: Users, color: "text-blue-400" },
         ].map(stat => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-6 group hover:bg-white/10 transition-colors">
               <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">{stat.label}</p>
                  <p className="text-lg font-bold text-white truncate max-w-[150px]">{stat.value}</p>
               </div>
            </div>
         ))}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#0d1213] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
         <div className="p-8 border-b border-white/5 bg-white/2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-lg font-bold">Top Performing Students</h2>
            <div className="flex gap-2">
               <Button variant="outline" className="h-10 px-4 rounded-xl border-white/10 bg-white/5 text-xs text-white font-bold">Adjust Weights</Button>
               <Button variant="outline" className="h-10 px-4 rounded-xl border-white/10 bg-white/5 text-xs text-white font-bold">Export CSV</Button>
            </div>
         </div>
         <table className="w-full text-left">
            <thead>
               <tr className="border-b border-white/5 bg-white/1">
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Rank</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Student Profile</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Power Points (RP)</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Earned Total</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] text-right">Moderation</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
               {leaderboard.map((user, i) => (
                  <tr key={user._id} className="group hover:bg-white/5 transition-all">
                     <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                           {i < 3 ? (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border ${
                                 i === 0 ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-400" : 
                                 i === 1 ? "border-slate-300/40 bg-slate-300/10 text-slate-300" : 
                                 "border-amber-700/40 bg-amber-700/10 text-amber-700"
                              }`}>
                                 {i + 1}
                              </div>
                           ) : (
                              <span className="text-sm font-bold text-[var(--text-muted)] ml-3 tracking-tighter">#{i + 1}</span>
                           )}
                        </div>
                     </td>
                     <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-xs font-bold text-white shadow-inner">{user.name?.charAt(0)}</div>
                           <div>
                              <p className="text-sm font-bold text-white group-hover:text-[var(--primary-light)] transition-colors line-clamp-1">{user.name}</p>
                              <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase truncate">{user.college || "No College"}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-5">
                         <div className="flex items-center gap-2">
                           <Medal className="w-4 h-4 text-[var(--primary)]" />
                           <span className="text-sm font-bold text-white font-[family-name:var(--font-jetbrains)]">{user.points?.toLocaleString()} RP</span>
                         </div>
                     </td>
                     <td className="px-8 py-5">
                         <span className="text-sm font-bold text-green-400 font-[family-name:var(--font-jetbrains)]">₹{user.totalEarned?.toLocaleString()}</span>
                     </td>
                     <td className="px-8 py-5 text-right">
                        <Button variant="ghost" onClick={() => toast.info(`Accessing ${user.name}'s performance scores...`)} className="w-10 h-10 p-0 rounded-xl hover:bg-white/10 border border-white/5 flex items-center justify-center ml-auto">
                           <TrendingUp className="w-4 h-4 text-white" />
                        </Button>
                     </td>
                  </tr>
               ))}
               {leaderboard.length === 0 && (
                  <tr>
                     <td colSpan={5} className="py-20 text-center text-[var(--text-muted)] font-bold uppercase tracking-widest text-sm">No ranking data yet.</td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  )
}
