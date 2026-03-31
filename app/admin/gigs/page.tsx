"use client"

import React, { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Search, Briefcase, Filter, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AdminGigs() {
  const [gigs, setGigs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingGig, setEditingGig] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "marketing",
    reward: 0,
    difficulty: "Beginner",
    type: "Task",
    image: "",
  })

  useEffect(() => {
    fetchGigs()
  }, [])

  const fetchGigs = async () => {
    try {
      const res = await fetch('/api/admin/gigs')
      const data = await res.json()
      setGigs(data)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingGig ? 'PUT' : 'POST'
    const payload = editingGig ? { ...formData, id: editingGig._id } : formData

    try {
      const res = await fetch('/api/admin/gigs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        toast.success(editingGig ? "Gig updated" : "Gig created")
        setShowModal(false)
        setEditingGig(null)
        fetchGigs()
      }
    } catch (err) {
      toast.error("Failed to save gig")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    try {
      const res = await fetch(`/api/admin/gigs?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success("Gig deleted")
        fetchGigs()
      }
    } catch (err) {
      toast.error("Failed to delete gig")
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)]" />
        <p className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)]">Loading Gigs Hub...</p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-syne)] tracking-tight text-white mb-2">Gig Management</h1>
          <p className="text-[var(--text-muted)] font-medium">Create, edit, and control active opportunities on Earnify.</p>
        </div>
        <Button 
          onClick={() => {
            setEditingGig(null)
            setFormData({ title: "", description: "", category: "marketing", reward: 0, difficulty: "Beginner", type: "Task", image: "" })
            setShowModal(true)
          }}
          className="btn-primary-gradient h-12 px-6 rounded-2xl font-bold group"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
          Create New Gig
        </Button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input 
               type="text" 
               placeholder="Search by gig title, company, or category..." 
               className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[var(--primary)]/50 transition-all text-sm font-medium" 
            />
         </div>
         <Button variant="outline" className="h-12 px-6 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Category: All
         </Button>
      </div>

      {/* Gigs Table */}
      <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Gig Details</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Category</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Earnings</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Level</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {gigs.map((gig) => (
              <tr key={gig._id} className="group hover:bg-white/5 transition-all">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-white group-hover:text-[var(--primary-light)] transition-colors">{gig.title}</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-tighter mt-1">{new Date(gig.createdAt).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                      <span className="text-xs font-bold capitalize">{gig.category}</span>
                   </div>
                </td>
                <td className="px-6 py-4 font-bold text-[var(--primary-light)] font-[family-name:var(--font-jetbrains)]">₹{gig.reward}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                    gig.difficulty === 'Expert' ? 'bg-red-500/10 text-red-400' : 
                    gig.difficulty === 'Intermediate' ? 'bg-blue-500/10 text-blue-400' : 
                    'bg-green-500/10 text-green-400'
                  }`}>
                    {gig.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        setEditingGig(gig)
                        setFormData({
                          title: gig.title,
                          description: gig.description,
                          category: gig.category,
                          reward: gig.reward,
                          difficulty: gig.difficulty,
                          type: gig.type || "Task",
                          image: gig.image || "",
                        })
                        setShowModal(true)
                      }}
                      className="w-8 h-8 p-0 rounded-lg hover:bg-[var(--primary)]/20 hover:text-[var(--primary-light)] border border-white/5"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleDelete(gig._id)}
                      className="w-8 h-8 p-0 rounded-lg hover:bg-red-500/20 hover:text-red-400 border border-white/5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0d1213] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
               <h3 className="text-xl font-bold font-[family-name:var(--font-syne)]">{editingGig ? "Edit Opportunity" : "Create New Opportunity"}</h3>
               <Button variant="ghost" onClick={() => setShowModal(false)} className="w-8 h-8 p-0 rounded-full hover:bg-white/5"><X className="w-5 h-5" /></Button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Title</label>
                     <input required className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[var(--primary)]/50 transition-all font-medium" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Category</label>
                     <select className="w-full h-12 px-4 bg-[#0d1213] border border-white/10 rounded-xl outline-none focus:border-[var(--primary)]/50 transition-all font-medium" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        {['marketing', 'writing', 'development', 'design', 'data', 'video', 'tutoring', 'social'].map(c => <option key={c} value={c}>{c}</option>)}
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Payout (₹)</label>
                     <input 
                        type="number" 
                        required 
                        className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[var(--primary)]/50 transition-all font-bold font-[family-name:var(--font-jetbrains)]" 
                        value={formData.reward || ""} 
                        onChange={e => setFormData({...formData, reward: e.target.value === "" ? 0 : Number(e.target.value)})} 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Difficulty</label>
                     <select className="w-full h-12 px-4 bg-[#0d1213] border border-white/10 rounded-xl outline-none focus:border-[var(--primary)]/50 transition-all font-medium" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}>
                        {['Beginner', 'Intermediate', 'Expert'].map(d => <option key={d} value={d}>{d}</option>)}
                     </select>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Description</label>
                  <textarea required className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[var(--primary)]/50 transition-all min-h-[120px] font-medium" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
               </div>
               
               <div className="flex gap-4 pt-4 border-t border-white/5">
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1 h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold transition-all">Cancel Interaction</Button>
                  <Button type="submit" className="flex-1 h-12 rounded-xl btn-primary-gradient font-bold shadow-xl shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 transition-all">{editingGig ? "Update Live Gig" : "Deploy Opportunity"}</Button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  )
}
