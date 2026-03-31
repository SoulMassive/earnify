"use client"

import React, { useEffect, useState } from "react"
import { CheckCircle2, XCircle, Clock, Eye, MessageSquare, Download, Filter, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSub, setSelectedSub] = useState<any>(null)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/admin/submissions')
      const data = await res.json()
      setSubmissions(data)
    } finally {
      setLoading(false)
    }
  }

  const handleProcess = async (id: string, status: 'approved' | 'rejected') => {
    if (!feedback && status === 'rejected') {
      toast.error("Please provide feedback for rejection")
      return
    }

    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, feedback })
      })
      if (res.ok) {
        toast.success(status === 'approved' ? "Task Approved" : "Task Rejected")
        setSelectedSub(null)
        setFeedback("")
        fetchSubmissions()
      }
    } catch (err) {
      toast.error("Failed to process submission")
    }
  }

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
           <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)]" />
           <p className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)]">Verifying Submissions Hub...</p>
        </div>
     )
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-syne)] tracking-tight text-white mb-2">Submissions Hub</h1>
        <p className="text-[var(--text-muted)] font-medium">Review student tasks, verify work quality, and release payouts.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input 
               type="text" 
               placeholder="Search submissions by student name or gig title..." 
               className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[var(--primary)]/50 transition-all font-medium text-sm" 
            />
         </div>
         <Button variant="outline" className="h-12 px-6 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold flex items-center gap-2 transition-all">
            <Filter className="w-4 h-4" />
            Status: All
         </Button>
      </div>

      {/* Submissions Table / Grid */}
      <div className="grid grid-cols-1 gap-6">
        {submissions.map((sub) => (
          <div key={sub._id} className="bg-white/5 border border-white/10 rounded-3xl p-6 group transition-all hover:bg-white/10 hover:shadow-2xl shadow-xl flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Student Info */}
            <div className="flex items-center gap-4 min-w-[200px]">
               <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/5 shadow-inner">
                  <span className="font-bold text-lg text-[var(--primary-light)]">{sub.userId?.name?.charAt(0)}</span>
               </div>
               <div>
                  <p className="font-bold text-white group-hover:text-[var(--primary-light)] transition-colors line-clamp-1">{sub.userId?.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest truncate">{sub.userId?.email}</p>
               </div>
            </div>

            {/* Opportunity Info */}
            <div className="flex-1 min-w-[300px]">
               <h3 className="font-bold text-white mb-1 line-clamp-1">{sub.opportunityId?.title}</h3>
               <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold uppercase tracking-tighter text-[var(--text-muted)] border border-white/5">
                     #{sub.opportunityId?.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[var(--primary)]/10 text-[10px] font-bold uppercase tracking-tighter text-[var(--primary-light)] border border-[var(--primary)]/20 shadow-sm">
                     ₹{sub.reward || sub.opportunityId?.reward}
                  </span>
               </div>
            </div>

            {/* Status & Date */}
            <div className="min-w-[140px]">
               <div className="flex items-center gap-2 mb-1">
                  {sub.status === 'approved' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : 
                   sub.status === 'rejected' ? <XCircle className="w-4 h-4 text-red-400" /> : 
                   <Clock className="w-4 h-4 text-yellow-400 animate-pulse-slow" />}
                  <span className={`text-xs font-bold uppercase tracking-widest ${
                    sub.status === 'approved' ? 'text-green-400' : 
                    sub.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'
                  }`}>{sub.status}</span>
               </div>
               <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">{new Date(sub.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
               <Button 
                onClick={() => {
                  setSelectedSub(sub)
                  setFeedback(sub.feedback || "")
                }}
                className="btn-shimmer bg-white text-[#0a0f10] h-10 px-6 rounded-xl font-bold flex items-center gap-2 border-none transition-all group-hover:scale-105"
               >
                  <Eye className="w-4 h-4" />
                  Review Work
               </Button>
            </div>
          </div>
        ))}
        {submissions.length === 0 && (
           <div className="py-20 text-center bg-white/2 border border-dashed border-white/10 rounded-3xl">
              <p className="text-[var(--text-muted)] uppercase font-bold tracking-widest text-sm">No submissions in system yet.</p>
           </div>
        )}
      </div>

      {/* Review Modal */}
      {selectedSub && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0d1213] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
               <h3 className="text-xl font-bold font-[family-name:var(--font-syne)]">Reviewing: {selectedSub.opportunityId?.title}</h3>
               <Button variant="ghost" onClick={() => setSelectedSub(null)} className="w-8 h-8 p-0 rounded-full hover:bg-white/5">
                <XCircle className="w-5 h-5 text-[var(--text-muted)]" />
               </Button>
            </div>
            
            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
               <div className="space-y-4">
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Student Information</p>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary-light)] font-bold shadow-sm">{selectedSub.userId?.name?.charAt(0)}</div>
                     <div>
                        <p className="font-bold text-white leading-tight">{selectedSub.userId?.name}</p>
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase">{selectedSub.userId?.email}</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2">
                    <MessageSquare className="w-3 h-3 text-[var(--primary)]" />
                    Submitted Work Proof
                  </p>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 min-h-[100px]">
                     <p className="text-white font-medium whitespace-pre-wrap leading-relaxed">
                        {selectedSub.proofText || "No description provided."}
                     </p>
                  </div>
                  
                  {selectedSub.proofUrl && (
                    <div className="p-4 bg-[var(--primary)]/5 rounded-2xl border border-[var(--primary)]/20 flex items-center justify-between">
                       <div className="flex items-center gap-3 overflow-hidden">
                          <Eye className="w-4 h-4 text-[var(--primary)] shrink-0" />
                          <span className="text-xs font-bold text-white/60 truncate uppercase tracking-widest">{selectedSub.proofUrl}</span>
                       </div>
                       <a 
                        href={selectedSub.proofUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="h-10 px-6 rounded-xl bg-white text-[#0a0f10] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                       >
                          Open Link
                       </a>
                    </div>
                  )}
               </div>

               <div className="space-y-4">
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Final Status & Feedback</p>
                  <textarea 
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[var(--primary)]/50 transition-all min-h-[120px] font-medium placeholder:text-white/20" 
                    placeholder="Enter review feedback for the student here..."
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                  />
               </div>
            </div>

            <div className="p-8 bg-white/2 border-t border-white/5 flex gap-4">
               {selectedSub.status === 'pending' ? (
                 <>
                   <Button 
                    onClick={() => handleProcess(selectedSub._id, 'rejected')}
                    className="flex-1 h-12 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold border border-red-500/20 transition-all uppercase tracking-widest text-[10px]"
                   >
                     Reject Submission
                   </Button>
                   <Button 
                    onClick={() => handleProcess(selectedSub._id, 'approved')}
                    className="flex-1 h-12 rounded-xl btn-primary-gradient font-bold shadow-xl shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 transition-all uppercase tracking-widest text-[10px]"
                   >
                     Approve & Pay ₹{selectedSub.reward || selectedSub.opportunityId?.reward}
                   </Button>
                 </>
               ) : (
                 <div className="w-full py-4 text-center rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#8a9294]">Processed: {selectedSub.status}</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
