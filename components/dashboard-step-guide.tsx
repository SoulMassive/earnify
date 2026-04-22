'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Sparkles, Filter, Briefcase, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function DashboardStepGuide() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Show guide every time the component mounts
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="mb-8 relative group"
        >
          {/* Main Card */}
          <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-[#0a0f10] border border-primary/30 rounded-[32px] p-8 md:p-10 relative overflow-hidden backdrop-blur-xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 p-12 text-primary opacity-5 group-hover:opacity-10 transition-opacity">
              <Search className="w-40 h-40 rotate-12" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-primary text-[#0a0f10] text-[10px] font-bold uppercase tracking-widest">
                    Next Step
                  </div>
                  <div className="flex items-center gap-1.5 text-primary">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Leveling Up</span>
                  </div>
                </div>
                
                <h2 className="text-3xl font-extrabold font-[family-name:var(--font-syne)] text-white tracking-tight">
                  Exploring Opportunities
                </h2>
                
                <p className="text-white/60 text-sm leading-relaxed">
                  Once your profile is set up, navigate to the <span className="text-white font-bold">"Find Gigs"</span> section to browse hundreds of curated gigs, micro-tasks, and freelance jobs. New opportunities are added daily!
                </p>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-medium text-white/50">
                    <Filter className="w-3.5 h-3.5 text-primary" />
                    Filter by Domain
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-medium text-white/50">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    Difficulty Level
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <button
                  onClick={() => {
                    router.push('/dashboard/gigs')
                    dismiss()
                  }}
                  className="flex items-center justify-center gap-2 px-8 h-14 rounded-2xl bg-primary text-[#0a0f10] font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 w-full sm:w-auto whitespace-nowrap"
                >
                  Go to Find Gigs
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={dismiss}
                  className="px-8 h-14 rounded-2xl bg-white/5 border border-white/10 text-white/40 font-bold hover:text-white hover:bg-white/10 transition-all w-full sm:w-auto"
                >
                  Dismiss
                </button>
              </div>
            </div>

            {/* Close button top right */}
            <button 
              onClick={dismiss}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/20 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
