'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, CheckCircle2, AlertCircle, 
  ChevronRight, Calendar, Briefcase, 
  BookText, Palette, Code, Loader2,
  FileText, Send, MoreVertical, XCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function OngoingTasks() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'Active' | 'Submitted' | 'Completed' | 'Rejected'>('Active')
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For now, we seed some mock tasks because we haven't implemented application logic yet
    const fetchTasks = async () => {
      // simulate API delay
      await new Promise(r => setTimeout(r, 1000))
      
      const mockTasks = [
        { _id: 't-1', title: 'Write 10 Instagram Captions', category: 'Writing', payout: 1200, deadline: 'Tomorrow', status: 'Active', client: 'SocialPulse' },
        { _id: 't-2', title: 'Promote AmazePay App', category: 'Marketing', payout: 50, deadline: 'Ongoing', status: 'Active', client: 'AmazePay' },
        { _id: 't-3', title: 'Design Logo for StartupX', category: 'Design', payout: 4500, deadline: '3 days ago', status: 'Submitted', client: 'StartupX' },
        { _id: 't-4', title: 'React Dashboard Bug Fix', category: 'Coding', payout: 8500, deadline: 'Completed', status: 'Completed', client: 'OpenSourceX' },
      ]
      setTasks(mockTasks)
      setLoading(false)
    }
    fetchTasks()
  }, [])

  const filteredTasks = tasks.filter(t => t.status === activeTab)

  const tabs = [
     { id: 'Active', icon: Clock, count: tasks.filter(t => t.status === 'Active').length },
     { id: 'Submitted', icon: Send, count: tasks.filter(t => t.status === 'Submitted').length },
     { id: 'Completed', icon: CheckCircle2, count: tasks.filter(t => t.status === 'Completed').length },
     { id: 'Rejected', icon: XCircle, count: tasks.filter(t => t.status === 'Rejected').length },
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
                         {task.category === 'Writing' && <BookText className="w-6 h-6 text-blue-400" />}
                         {task.category === 'Design' && <Palette className="w-6 h-6 text-pink-400" />}
                         {(task.category === 'Development' || task.category === 'Coding') && <Code className="w-6 h-6 text-purple-400" />}
                         {!['Writing', 'Design', 'Coding', 'Development'].includes(task.category) && <Briefcase className="w-6 h-6 text-primary" />}
                      </div>
                      <div className="min-w-0">
                         <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-white group-hover:text-primary transition-colors text-lg truncate leading-tight">{task.title}</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/30 border border-white/5 whitespace-nowrap">{task.client}</span>
                         </div>
                         <div className="flex flex-wrap items-center gap-4 text-xs">
                            <span className="flex items-center gap-1.5 text-white/40"><Calendar className="w-3.5 h-3.5" /> Due: {task.deadline}</span>
                            <span className="flex items-center gap-1.5 text-white/40 font-bold"><Zap className="w-3.5 h-3.5 text-primary" /> Est. Payout: ₹{task.payout}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                               activeTab === 'Active' ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' : 
                               activeTab === 'Submitted' ? 'bg-blue-400/10 text-blue-400 border border-blue-400/20' :
                               'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                            }`}>{activeTab}</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-3 justify-end w-full md:w-auto">
                      {activeTab === 'Active' && (
                         <Button className="h-11 px-6 rounded-2xl bg-primary text-[#0a0f10] font-black group transition-all">
                            Submit Task
                            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                         </Button>
                      )}
                      <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl border-white/10 text-white/40 hover:text-white hover:bg-white/10 group">
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
    </div>
  )
}
