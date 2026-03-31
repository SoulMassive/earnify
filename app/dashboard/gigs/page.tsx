'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, Filter, SlidersHorizontal, 
  ChevronRight, Briefcase, BookText, 
  Palette, Code, Clock, Zap, Loader2,
  X, Send, Link as LinkIcon, FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
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
  
  // Submission Modal State
  const [selectedGig, setSelectedGig] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [proofText, setProofText] = useState('')
  const [proofUrl, setProofUrl] = useState('')

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
    const matchSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCat = filterCategory === 'All' || gig.category === filterCategory
    const matchDiff = filterDifficulty === 'All' || gig.difficulty === filterDifficulty
    return matchSearch && matchCat && matchDiff
  })

  const categories = ['All', 'Writing', 'Design', 'Coding', 'Marketing', 'Development']
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Expert']

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
              className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col justify-between group hover:border-primary/30 hover:bg-white/[0.08] transition-all relative overflow-hidden"
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
                onClick={() => setSelectedGig(gig)}
                className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary group-hover:text-[#0a0f10] text-white font-bold transition-all"
              >
                Apply for Gig
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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

      {/* Submission Modal */}
      <AnimatePresence>
        {selectedGig && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGig(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[#0a0f10] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
            >
              <div className="p-8 sm:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-syne)]">Apply for Gig</h2>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSelectedGig(null)}
                    className="h-10 w-10 rounded-full border border-white/5 text-white/40 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="mb-8 p-6 bg-white/5 rounded-3xl border border-white/5">
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Gig Target</p>
                   <h3 className="text-lg font-bold text-white leading-tight">{selectedGig.title}</h3>
                   <div className="flex items-center gap-4 mt-3 text-sm font-bold text-white/40">
                      <span>₹{(selectedGig.reward || selectedGig.payout || 0).toLocaleString()} Reward</span>
                      <span className="w-1 h-1 bg-white/10 rounded-full" />
                      <span className="capitalize">{selectedGig.category}</span>
                   </div>
                   {selectedGig.description && (
                      <p className="text-white/50 text-sm mt-6 leading-relaxed border-t border-white/5 pt-6 italic">
                         &ldquo;{selectedGig.description}&rdquo;
                      </p>
                   )}
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5" /> Work Proof / Description
                    </label>
                    <textarea 
                      placeholder="Explain what you've done or paste the required text proof..."
                      value={proofText}
                      onChange={(e) => setProofText(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[120px] text-white outline-none focus:border-primary/50 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                      <LinkIcon className="w-3.5 h-3.5" /> Proof Link (Optional)
                    </label>
                    <input 
                      type="url"
                      placeholder="e.g., https://github.com/... or https://instagram.com/p/..."
                      value={proofUrl}
                      onChange={(e) => setProofUrl(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-primary/50 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-10">
                  <Button 
                    onClick={async () => {
                      if (!proofText) return toast.error("Please provide work proof");
                      setSubmitting(true)
                      try {
                        const res = await fetch('/api/submissions', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ 
                            opportunityId: selectedGig._id, 
                            proofText, 
                            proofUrl 
                          })
                        })
                        const data = await res.json()
                        if (res.ok) {
                          toast.success("Submission Received!", {
                            description: "Your work is now in the review queue. We'll release your reward once verified."
                          })
                          setSelectedGig(null)
                        } else {
                          toast.error(data.error || "Submission failed")
                        }
                      } finally {
                        setSubmitting(false)
                      }
                    }}
                    disabled={submitting}
                    className="flex-1 h-14 rounded-2xl bg-primary text-[#0a0f10] font-black text-lg group shadow-xl shadow-primary/10"
                  >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        Deploy Proof
                        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
