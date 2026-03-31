'use client'
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, Wallet, CheckSquare, Trophy, 
  ArrowUpRight, Clock, Star, Zap,
  ChevronRight, BookText, Palette, Code, Briefcase
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthContext'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function OverviewPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [recommendedGigs, setRecommendedGigs] = useState<any[]>([])
  const [loadingGigs, setLoadingGigs] = useState(true)

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch('/api/opportunities?limit=3')
        const data = await res.json()
        setRecommendedGigs(data || [])
      } catch (err) {
        console.error('Failed to fetch recommended gigs:', err)
      } finally {
        setLoadingGigs(false)
      }
    }
    fetchGigs()
  }, [])

  if (!user) return null

  // Calculate stats
  const completionRate = user.completedTasks > 0 ? '98%' : '0%' 
  const seasonProgress = Math.min(Math.floor((user.points / 500) * 100), 100)

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Available Balance', value: `₹${(user.balance || 0).toLocaleString()}`, icon: Wallet, color: 'text-primary' },
          { label: 'Total Earned', value: `₹${(user.totalEarned || 0).toLocaleString()}`, icon: BarChart3, color: 'text-blue-400' },
          { label: 'Task Completion', value: completionRate, icon: CheckSquare, color: 'text-teal-400' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all"
          >
            <div className="relative z-10">
              <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-jetbrains)] text-white">{stat.value}</h3>
              <div className={`p-2 rounded-xl bg-white/5 ${stat.color} inline-flex items-center gap-2 text-[10px] font-bold border border-white/5`}>
                <stat.icon className="w-3.5 h-3.5" />
                Live Tracking
              </div>
            </div>
            <div className={`absolute top-0 right-0 p-8 ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}>
               <stat.icon className="w-16 h-16" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-[family-name:var(--font-syne)] text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              Handpicked for You
            </h2>
            <button 
              onClick={() => router.push('/dashboard/gigs')}
              className="text-xs font-bold text-primary hover:underline hover:text-primary-dark transition-colors"
            >
              View All Gigs
            </button>
          </div>

          <div className="space-y-4">
            {loadingGigs ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-white/5 border border-white/10 rounded-3xl animate-pulse" />
              ))
            ) : recommendedGigs.length > 0 ? (
              recommendedGigs.map((gig, i) => (
                <motion.div 
                  key={gig._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 group hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-5 w-full">
                    <div className="h-14 w-14 rounded-2xl bg-[#0a0f10] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 transition-all">
                      {gig.category === 'Writing' && <BookText className="w-7 h-7 text-blue-400" />}
                      {gig.category === 'Design' && <Palette className="w-7 h-7 text-pink-400" />}
                      {(gig.category === 'Development' || gig.category === 'Coding') && <Code className="w-7 h-7 text-purple-400" />}
                      {!['Writing', 'Design', 'Coding', 'Development'].includes(gig.category) && <Briefcase className="w-7 h-7 text-primary" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/60 font-bold">{gig.category}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-primary/20 text-primary font-bold">Best Match</span>
                      </div>
                      <h4 className="font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{gig.title}</h4>
                      <div className="flex items-center gap-4 text-xs text-white/40 mt-1">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {gig.deadline || 'Ongoing'}</span>
                        <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-primary" /> {gig.difficulty || 'Intermediate'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <p className="text-xl font-bold text-white whitespace-nowrap">₹{(gig.payout || gig.reward).toLocaleString()}</p>
                      <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest whitespace-nowrap">Est. Payout</p>
                    </div>
                    <Button 
                      onClick={() => router.push(`/categories/${(gig.category || '').toLowerCase()}/${gig._id}`)}
                      size="icon" 
                      className="h-12 w-12 min-w-[3rem] rounded-2xl bg-primary hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 text-[#0a0f10]"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center bg-white/5 border border-dashed border-white/10 rounded-3xl">
                 <p className="text-white/40 font-bold uppercase tracking-widest text-xs">No matching gigs found right now.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-8 rounded-[32px] relative overflow-hidden group">
            <h3 className="text-lg font-bold mb-4 relative z-10 text-white">Scale Your Earnings</h3>
            <p className="text-sm text-white/60 mb-8 leading-relaxed relative z-10">
              Verified accounts earn 40% more on average. Complete your profile verification to unlock premium high-ticket gigs.
            </p>
            <Button 
              onClick={() => router.push('/dashboard/gigs')}
              className="w-full h-12 rounded-2xl bg-primary text-[#0a0f10] font-bold group relative z-10 hover:bg-primary-dark transition-all"
            >
              Unlock Premium Gigs
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
            <Zap className="absolute -bottom-8 -right-8 w-32 h-32 text-primary opacity-5 stroke-[1px] group-hover:scale-110 transition-transform" />
          </div>

          {/* Progress Tracker */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-[32px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white">Season 1 Progress</h3>
              <span className="text-xs font-bold text-primary">{seasonProgress}%</span>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] transition-all duration-1000" 
                style={{ width: `${seasonProgress}%` }}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Current Points</span>
                <span className="font-bold text-white">{user.points} pts</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Next Milestone</span>
                <span className="font-bold text-primary">{user.points < 500 ? 'Gold Tier' : 'Diamond Tier'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
