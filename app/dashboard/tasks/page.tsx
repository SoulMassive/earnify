'use client'
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, CheckCircle2, AlertCircle, 
  ChevronRight, Calendar, Briefcase, 
  BookText, Palette, Code, Loader2,
  FileText, Send, MoreVertical, XCircle, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function OngoingTasks() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'Active' | 'Submitted' | 'Completed' | 'Rejected'>('Active')
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('/api/submissions')
        const data = await res.json()
        if (Array.isArray(data)) {
          setTasks(data)
        }
      } catch (err) {
        console.error('Failed to fetch tasks:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

   const [submittingTask, setSubmittingTask] = useState<any>(null)
   const [proofText, setProofText] = useState('')
   const [proofUrl, setProofUrl] = useState('')
   const [isSubmitting, setIsSubmitting] = useState(false)

   const handleSubmitWork = async () => {
      if (!proofText) return toast.error("Please provide work proof text")
      setIsSubmitting(true)
      try {
         const res = await fetch(`/api/submissions/${submittingTask._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               status: 'submitted',
               proofText,
               proofUrl
            })
         })
         if (res.ok) {
            toast.success("Work submitted for review!")
            setSubmittingTask(null)
            setProofText('')
            setProofUrl('')
            // refresh
            const refreshRes = await fetch('/api/submissions')
            const data = await refreshRes.json()
            setTasks(data || [])
         }
      } catch (err) {
         toast.error("Failed to submit work")
      } finally {
         setIsSubmitting(false)
      }
   }

  const getStatusForTab = (status: string) => {
    if (status === 'applied' || status === 'approved_to_start') return 'Active'
    if (status === 'submitted') return 'Submitted'
    if (status === 'completed') return 'Completed'
    if (status === 'rejected') return 'Rejected'
    return 'Active'
  }

  const filteredTasks = tasks.filter(t => getStatusForTab(t.status) === activeTab)

  const tabs = [
     { id: 'Active', icon: Clock, count: tasks.filter(t => getStatusForTab(t.status) === 'Active').length },
     { id: 'Submitted', icon: Send, count: tasks.filter(t => getStatusForTab(t.status) === 'Submitted').length },
     { id: 'Completed', icon: CheckCircle2, count: tasks.filter(t => getStatusForTab(t.status) === 'Completed').length },
     { id: 'Rejected', icon: XCircle, count: tasks.filter(t => getStatusForTab(t.status) === 'Rejected').length },
  ]

   return (
    <div className="space-y-10 animate-fade-in">
       {/* Header */}
       <div>
         <h1 className="text-3xl font-bold font-[family-name:var(--font-syne)] text-white">Ongoing Tasks</h1>
         <p className="text-white/40 text-sm mt-1">Manage your active projects and track your submissions.</p>
       </div>

       {/* Tabs Navigation */}
       <div className="flex flex-wrap items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl w-fit">
          {tabs.map(tab => (
             <button 
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all font-bold text-sm ${
                 activeTab === tab.id 
                 ? "bg-white text-[#0a0f10] shadow-xl shadow-white/10" 
                 : "text-white/40 hover:text-white hover:bg-white/5"
               }`}
             >
                <tab.icon className="w-4 h-4" />
                {tab.id}
                {tab.count > 0 && (
                   <span className={`text-[10px] px-1.5 rounded-md font-black ${
                     activeTab === tab.id ? 'bg-black/10 text-black' : 'bg-white/10 text-white/40'
                   }`}>
                      {tab.count}
                   </span>
                )}
             </button>
          ))}
       </div>

       {/* Tasks List */}
       <div className="space-y-4 pb-20">
          {loading ? (
             Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-24 bg-white/5 border border-white/10 rounded-2xl animate-pulse" />
             ))
          ) : filteredTasks.length > 0 ? (
             filteredTasks.map((task, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={task._id}
                  className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-white/20 hover:bg-white/[0.08] transition-all relative overflow-hidden"
                >
                   <div className="flex items-center gap-5 w-full">
                      <div className="h-14 w-14 rounded-2xl bg-[#0a0f10] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                         {((task.opportunityId as any)?.category === 'Writing' || task.category === 'Writing') && <BookText className="w-6 h-6 text-blue-400" />}
                         {((task.opportunityId as any)?.category === 'Design' || task.category === 'Design') && <Palette className="w-6 h-6 text-pink-400" />}
                         {((task.opportunityId as any)?.category === 'Development' || (task.opportunityId as any)?.category === 'Coding') && <Code className="w-6 h-6 text-purple-400" />}
                         {!['Writing', 'Design', 'Coding', 'Development'].includes((task.opportunityId as any)?.category || task.category) && <Briefcase className="w-6 h-6 text-primary" />}
                      </div>
                      <div className="min-w-0">
                         <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-white group-hover:text-primary transition-colors text-lg truncate leading-tight">{(task.opportunityId as any)?.title || task.title}</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/30 border border-white/5 whitespace-nowrap">{(task.opportunityId as any)?.category || 'General Task'}</span>
                         </div>
                         <div className="flex flex-wrap items-center gap-4 text-xs">
                            <span className="flex items-center gap-1.5 text-white/40"><Calendar className="w-3.5 h-3.5" /> Start Date: {new Date(task.createdAt).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1.5 text-white/40 font-bold"><Zap className="w-3.5 h-3.5 text-primary" /> Reward: ₹{task.reward || (task.opportunityId as any)?.reward}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                               task.status === 'applied' ? 'bg-orange-400/10 text-orange-400 border border-orange-400/20' : 
                               task.status === 'approved_to_start' ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' : 
                               task.status === 'submitted' ? 'bg-blue-400/10 text-blue-400 border border-blue-400/20' :
                               'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                            }`}>{task.status.replace(/_/g, ' ').toUpperCase()}</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-3 justify-end w-full md:w-auto">
                      {activeTab === 'Active' && (
                         task.status === 'approved_to_start' ? (
                           <Button 
                             onClick={() => setSubmittingTask(task)}
                             className="h-11 px-6 rounded-2xl bg-primary text-[#0a0f10] font-black group transition-all shrink-0"
                           >
                              Submit Task
                              <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                           </Button>
                         ) : (
                           <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-[#0a0f10] px-4 py-2 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]">Waiting for Approval</span>
                         )
                      )}
                      <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl border border-transparent text-white/40 hover:text-white hover:bg-white/5 group transition-all">
                         <MoreVertical className="w-4 h-4 transition-transform group-hover:rotate-90" />
                      </Button>
                   </div>
                </motion.div>
             ))
          ) : (
             <div className="py-24 text-center space-y-4 bg-white/5 border border-dashed border-white/10 rounded-[40px]">
                <div className="relative w-20 h-20 mx-auto">
                   <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                   <div className="relative w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                     <FileText className="w-8 h-8 text-white/20" />
                   </div>
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white">No {activeTab} Tasks</h3>
                   <p className="text-white/40 text-sm max-w-[240px] mx-auto">Tasks you apply for will appear here during the project lifecycle.</p>
                </div>
                <Button 
                   onClick={() => router.push('/dashboard/gigs')}
                   variant="ghost" 
                   className="text-primary hover:text-primary-dark font-bold hover:bg-primary/5"
                >
                   Browse marketplace to get started
                </Button>
             </div>
          )}
       </div>

       {/* Submission Modal */}
       <AnimatePresence>
         {submittingTask && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSubmittingTask(null)}
               className="absolute inset-0 bg-black/80 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-lg bg-[#0d1213] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
             >
               <div className="p-8 space-y-8">
                 <div className="flex items-center justify-between">
                   <div>
                     <h4 className="text-xl font-bold text-white">Submit Work Proof</h4>
                     <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">{(submittingTask.opportunityId as any)?.title || submittingTask.title}</p>
                   </div>
                   <Button variant="ghost" onClick={() => setSubmittingTask(null)} className="rounded-full h-10 w-10 p-0 text-white/20 hover:text-white">
                     <XCircle className="w-6 h-6" />
                   </Button>
                 </div>

                 <div className="space-y-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black tracking-widest text-white/40 uppercase">Textual Proof / Work Description</label>
                     <textarea 
                       value={proofText}
                       onChange={e => setProofText(e.target.value)}
                       placeholder="Paste your content, links, or describe the work done..."
                       className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-primary/50 transition-all font-medium text-sm"
                     />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-widest text-white/40 uppercase">Direct Link (Optional)</label>
                      <input 
                       type="url"
                       value={proofUrl}
                       onChange={e => setProofUrl(e.target.value)}
                       placeholder="https://google.docs/..."
                       className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 text-white outline-none focus:border-primary/50 transition-all font-medium text-sm"
                      />
                   </div>
                 </div>

                 <Button 
                   onClick={handleSubmitWork}
                   disabled={isSubmitting}
                   className="w-full h-14 rounded-2xl bg-primary text-[#0a0f10] font-black text-lg group transition-all"
                 >
                   {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                     <>
                       Confirm Submission
                       <Send className="w-5 h-5 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                     </>
                   )}
                 </Button>
               </div>
             </motion.div>
           </div>
         )}
       </AnimatePresence>
    </div>
  )
}
