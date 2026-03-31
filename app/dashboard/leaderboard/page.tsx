'use client'
export const dynamic = 'force-dynamic';

import React from 'react'
import { Leaderboard } from '@/components/leaderboard'
import { motion } from 'framer-motion'
import { Trophy, Star, Zap, UserCircle } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthContext'

export default function LeaderboardPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="space-y-10 animate-fade-in">
       {/* Gamification Header */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gradient-to-br from-[#1a1f20] to-[#0a0f10] border border-white/10 p-8 rounded-[40px] relative overflow-hidden group">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-primary" />
                   </div>
                   <h1 className="text-3xl font-bold font-[family-name:var(--font-syne)] text-white">Season 1 Rankings</h1>
                </div>
                <p className="text-white/40 text-sm max-w-md leading-relaxed">
                   Climb the global student ranks to unlock massive rewards, premium branding, and direct hiring opportunities from industry leaders.
                </p>
             </div>
             <Trophy className="absolute -bottom-10 -right-10 w-64 h-64 text-primary opacity-5 stroke-[0.5px] scale-125 rotate-[-10deg] group-hover:scale-150 transition-transform duration-1000" />
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] flex flex-col justify-center items-center text-center gap-4 group">
             <div className="relative">
                <div className="h-20 w-20 rounded-3xl overflow-hidden border-2 border-primary/50 group-hover:scale-110 transition-transform">
                   <img src={user.avatar} alt="Me" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-primary flex items-center justify-center border-4 border-[#0a0f10] shadow-xl">
                   <Star className="w-3.5 h-3.5 text-[#0a0f10] fill-[#0a0f10]" />
                </div>
             </div>
             <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest leading-none">Your Rank</h3>
                <p className="text-3xl font-black text-white mt-1">#{user.globalRank || '---'}</p>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-0.5">Global Tier</p>
             </div>
          </div>
       </div>

       {/* Sub-Ranking Stats */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total XP', value: (user.points || 0).toLocaleString(), icon: Zap, color: 'text-amber-400' },
            { label: 'Verified Badges', value: '2', icon: Star, color: 'text-primary' },
            { label: 'Profile Views', value: '1.2K', icon: UserCircle, color: 'text-blue-400' },
            { label: 'Season Best', value: '#12', icon: Trophy, color: 'text-pink-400' },
          ].map((stat, i) => (
             <motion.div 
               key={stat.label}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 * i }}
               className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center group hover:bg-white/10 transition-all hover:border-white/20"
             >
                <stat.icon className={`w-5 h-5 mx-auto mb-3 ${stat.color} group-hover:scale-125 transition-transform`} />
                <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-white font-[family-name:var(--font-jetbrains)]">{stat.value}</p>
             </motion.div>
          ))}
       </div>

       {/* Leaderboard Table */}
       <div className="pb-20">
          <Leaderboard />
       </div>
    </div>
  )
}
