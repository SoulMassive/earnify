'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, SlidersHorizontal, 
  ChevronRight, Briefcase, BookText, 
  Palette, Code, Clock, Zap, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/components/auth/AuthContext'

export default function GigsMarketplace() {
  const router = useRouter()
  const { user } = useAuth()
  const [gigs, setGigs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterDifficulty, setFilterDifficulty] = useState('All')
  
  // Submission State
  const [selectedGig, setSelectedGig] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch('/api/opportunities')
        const data = await res.json()
        setGigs(data || [])
      } catch (err) {
        console.error('Failed to fetch marketplace gigs:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchGigs()
  }, [])

  const filteredGigs = gigs.filter(gig => {
    const matchSearch = gig.title?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCat = filterCategory === 'All' || gig.category?.toLowerCase() === filterCategory.toLowerCase()
    const matchDiff = filterDifficulty === 'All' || gig.difficulty?.toLowerCase() === filterDifficulty.toLowerCase()
    return matchSearch && matchCat && matchDiff
  })

  const categories = ['All', 'Writing', 'Design', 'Coding', 'Marketing', 'Development']
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Expert']

  // Apply logic - Direct Apply as requested by user
  const handleApply = async (gig: any) => {
    if (!user) {
      toast.error("Please login to apply");
      return;
    }
    
    setSubmitting(true)
    setSelectedGig(gig) // track which gig is being applied for the loader
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opportunityId: gig._id })
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("Applied Successfully!", {
          description: "Check 'Ongoing Tasks' to track your progress. We'll notify you once approved."
        })
      } else {
        toast.error(data.error || "Failed to apply")
      }
    } catch (err) {
      toast.error("An unexpected error occurred")
    } finally {
      setSubmitting(false)
      setSelectedGig(null)
    }
  }

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-syne)] text-white">Find Gigs</h1>
          <p className="text-white/40 text-sm mt-1">Browse verified opportunities from top global brands.</p>
        </div>

        <div className="relative group max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-hover:text-primary transition-colors" />
          <input 
            type="text"
            placeholder="Search by title, skills or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none hover:border-white/20 focus:border-primary/50 transition-all font-medium text-white placeholder:text-white/20"
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-sm">
        <div className="flex items-center gap-2 px-4 border-r border-white/10 mr-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <span className="text-sm font-bold uppercase tracking-widest text-white/60">Filters</span>
        </div>

        <div className="flex gap-2">
           {categories.map(cat => (
             <button 
               key={cat}
               onClick={() => setFilterCategory(cat)}
               className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                 filterCategory === cat 
                 ? "bg-primary border-primary text-[#0a0f10]" 
                 : "bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10"
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        <div className="h-8 w-px bg-white/10 mx-2 hidden md:block" />

        <div className="flex gap-2">
           {difficulties.map(diff => (
             <button 
               key={diff}
               onClick={() => setFilterDifficulty(diff)}
               className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                 filterDifficulty === diff 
                 ? "bg-white border-white text-[#0a0f10]" 
                 : "bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10"
               }`}
             >
               {diff}
             </button>
           ))}
        </div>
      </div>

      {/* Gig Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-64 bg-white/5 border border-white/10 rounded-3xl animate-pulse" />
          ))
        ) : filteredGigs.length > 0 ? (
          filteredGigs.map((gig, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={gig._id}
              className="h-full bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col justify-between group hover:border-primary/30 hover:bg-white/[0.08] transition-all relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-[#0a0f10] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {gig.category === 'Writing' && <BookText className="w-6 h-6 text-blue-400" />}
                    {gig.category === 'Design' && <Palette className="w-6 h-6 text-pink-400" />}
                    {(gig.category === 'Development' || gig.category === 'Coding') && <Code className="w-6 h-6 text-purple-400" />}
                    {!['Writing', 'Design', 'Coding', 'Development'].includes(gig.category) && <Briefcase className="w-6 h-6 text-primary" />}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-bold font-[family-name:var(--font-jetbrains)] text-white">₹{(gig.reward || 0).toLocaleString()}</span>
                    <span className="text-[10px] text-white/30 uppercase font-black tracking-widest leading-none mt-1">Reward</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/60 font-medium capitalize">{gig.category}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-primary/20 text-primary font-bold">{gig.difficulty || 'Beginner'}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-2 mb-4 leading-snug">
                  {gig.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-white/40 mb-8">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {gig.deadline || 'Ongoing'}
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                    Verified
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handleApply(gig)}
                disabled={submitting && selectedGig?._id === gig._id}
                className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary group-hover:text-[#0a0f10] text-white font-bold transition-all"
              >
                {submitting && selectedGig?._id === gig._id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Apply for Gig
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-dashed border-white/10">
              <Search className="w-8 h-8 text-white/20" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">No Gigs Found</h3>
              <p className="text-white/40 max-w-sm">We couldn't find any opportunities matching your current filters. Try adjusting your search.</p>
            </div>
            <Button 
              onClick={() => { setSearchTerm(''); setFilterCategory('All'); setFilterDifficulty('All'); }}
              variant="outline" 
              className="border-white/10 text-white/60 hover:text-white"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
