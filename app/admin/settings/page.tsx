"use client"

import React, { useEffect, useState } from "react"
import { 
  Shield, Plus, Trash2, Globe, Database, 
  ToggleLeft, ToggleRight, LayoutGrid, Loader2,
  AlertCircle, CheckCircle2, MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AdminSettings() {
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [admins, setAdmins] = useState<any[]>([])
  
  // Modal states
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCatName, setNewCatName] = useState("")
  const [showAddAdmin, setShowAddAdmin] = useState(false)
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: 'admin' })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      console.log("STARTING API SYNC...")
      const [setRes, catRes, admRes] = await Promise.all([
        fetch('/api/admin/settings'),
        fetch('/api/categories'),
        fetch('/api/admin/create-admin')
      ])
      
      console.log("RESPONSES:", { settings: setRes.status, categories: catRes.status, admins: admRes.status })
      
      if (setRes.status === 404) console.error("!!! CRITICAL: /api/admin/settings is 404 !!!")
      if (admRes.status === 404) console.error("!!! CRITICAL: /api/admin/create-admin is 404 !!!")
      
      const [setData, catData, admData] = await Promise.all([
        setRes.json(),
        catRes.json(),
        admRes.json()
      ])
      
      setSettings(setData)
      setCategories(catData)
      setAdmins(Array.isArray(admData) ? admData : [])
    } catch (err: any) {
      console.error("SYNC ERROR:", err)
      toast.error(`Sync Failed: ${err.message || 'Network Error'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleMarketplace = async () => {
    const newVal = !settings.marketplaceEnabled
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marketplaceEnabled: newVal })
      })
      if (res.ok) {
        setSettings({ ...settings, marketplaceEnabled: newVal })
        toast.success(`Marketplace ${newVal ? 'LIVE' : 'DISABLED'}`)
      } else {
        const err = await res.json()
        toast.error(err.error || "Permission denied")
      }
    } catch (e) {
      toast.error("System connection error")
    }
  }

  const handleToggleAutoSub = async () => {
    const newVal = !settings.autoSubmissionEnabled
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autoSubmissionEnabled: newVal })
      })
      if (res.ok) {
        setSettings({ ...settings, autoSubmissionEnabled: newVal })
        toast.success(`Auto-Processing ${newVal ? 'ENABLED' : 'DISABLED'}`)
      } else {
        const err = await res.json()
        toast.error(err.error || "Permission denied")
      }
    } catch (e) {
      toast.error("System connection error")
    }
  }

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName })
      })
      if (res.ok) {
        const cat = await res.json()
        setCategories([...categories, cat])
        setNewCatName("")
        setShowAddCategory(false)
        toast.success("Category Added")
      }
    } catch (e) {
      toast.error("Failed to add category")
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure? This cannot be undone.")) return
    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCategories(categories.filter(c => c._id !== id))
        toast.success("Category archived")
      } else {
        const err = await res.json()
        toast.error(err.error || "Failed to delete")
      }
    } catch (e) {
      toast.error("Deletion failed")
    }
  }

  const handleAddAdmin = async () => {
    try {
      const res = await fetch('/api/admin/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdmin)
      })
      if (res.ok) {
        toast.success("Privilege Granted Successfully")
        setShowAddAdmin(false)
        fetchData()
      } else {
        const err = await res.json()
        toast.error(err.error || "Failed to grant privilege")
      }
    } catch (e) {
      toast.error("Admin creation failed")
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6 min-h-[60vh]">
        <div className="relative">
           <Loader2 className="w-12 h-12 animate-spin text-[var(--primary)]" />
           <div className="absolute inset-0 blur-xl bg-[var(--primary)] opacity-20 animate-pulse" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] animate-pulse">Syncing Control Center...</p>
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-fade-in-up pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Master Logic Active</span>
           </div>
           <h1 className="text-4xl font-bold font-[family-name:var(--font-syne)] tracking-tight text-white mb-2 leading-none">Security & Infrastructure</h1>
           <p className="text-[var(--text-muted)] max-w-xl font-medium">Platform-wide toggles, category architecture, and administrative privilege management.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Section 1: System Config */}
           <div className="bg-[#1a1f20]/50 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                <Database className="w-32 h-32" />
              </div>
              
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                    <Globe className="w-6 h-6 text-primary" />
                 </div>
                 <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] text-white">Marketplace Engine</h2>
              </div>

              <div className="grid gap-6">
                 {/* Marketplace Toggle */}
                 <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/[0.08] transition-all flex items-center justify-between group/row">
                    <div>
                       <p className="font-bold text-white text-lg mb-1">Global Marketplace Status</p>
                       <p className="text-xs text-[var(--text-muted)] font-bold max-w-md leading-relaxed">Instantly enable/disable applications for all gigs site-wide.</p>
                    </div>
                    <button onClick={handleToggleMarketplace} className="active:scale-90 transition-transform">
                       {settings?.marketplaceEnabled 
                        ? <ToggleRight className="w-14 h-14 text-primary" /> 
                        : <ToggleLeft className="w-14 h-14 text-white/10" />}
                    </button>
                 </div>

                 {/* Auto-Submission Toggle */}
                 <div className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/[0.08] transition-all flex items-center justify-between group/row">
                    <div>
                       <p className="font-bold text-white text-lg mb-1">Automated Submission Processing</p>
                       <p className="text-xs text-[var(--text-muted)] font-bold max-w-md leading-relaxed">Enable system-verified approval for eligible micro-tasks.</p>
                    </div>
                    <button onClick={handleToggleAutoSub} className="active:scale-90 transition-transform">
                       {settings?.autoSubmissionEnabled 
                        ? <ToggleRight className="w-14 h-14 text-primary" /> 
                        : <ToggleLeft className="w-14 h-14 text-white/10" />}
                    </button>
                 </div>
              </div>
           </div>

           {/* Section 2: Categories */}
           <div className="bg-[#1a1f20]/50 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#8b5cf6]/20 flex items-center justify-center border border-[#8b5cf6]/20">
                       <LayoutGrid className="w-6 h-6 text-[#8b5cf6]" />
                    </div>
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] text-white">Marketplace Taxonomy</h2>
                 </div>
                 <Button 
                   onClick={() => setShowAddCategory(true)}
                   className="btn-primary-gradient rounded-2xl px-6 h-12 font-bold flex items-center gap-2 shadow-lg shadow-primary/20"
                 >
                    <Plus className="w-5 h-5" />
                    Archive New Category
                 </Button>
              </div>

              {showAddCategory && (
                <div className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-3xl animate-in zoom-in-95">
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Designate Category Name</p>
                   <div className="flex gap-4">
                      <input 
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        placeholder="e.g. AI Prompt Engineering" 
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none text-white font-bold h-14 shadow-inner"
                      />
                      <Button onClick={handleAddCategory} className="bg-primary text-[#0a0f10] h-14 px-8 rounded-2xl font-bold hover:bg-primary-light">
                        Deploy Logic
                      </Button>
                      <Button onClick={() => setShowAddCategory(false)} variant="ghost" className="h-14 px-6 rounded-2xl font-bold text-white/40 hover:text-white">
                        Cancel
                      </Button>
                   </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                 {categories.map((cat: any) => (
                    <div key={cat._id} className="group/item relative p-6 bg-white/2 rounded-2xl border border-white/5 hover:bg-white/5 hover:border-primary/30 transition-all">
                       <div className="flex items-start justify-between">
                          <div>
                             <p className="font-bold text-white mb-1 group-hover/item:text-primary transition-colors">{cat.name || cat.title || 'Untitled Category'}</p>
                             <p className="text-[9px] font-black tracking-widest uppercase text-white/20 mb-4">{cat.opportunityCount || 0} OPPORTUNITIES</p>
                             <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                                <span className="text-[8px] font-bold text-[var(--success)] uppercase">{cat.isActive ? 'Active' : 'Disabled'}</span>
                             </div>
                          </div>
                          <button 
                            onClick={() => handleDeleteCategory(cat._id)}
                            className="bg-red-500/10 text-red-400 p-2 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                          >
                             <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Column: Role Management */}
        <div className="lg:col-span-4 space-y-8 h-full">
           <div className="bg-[#1a1f20]/50 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl h-full shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                <Shield className="w-24 h-24" />
              </div>

              <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-12 rounded-2xl bg-[var(--cta)]/20 flex items-center justify-center border border-[var(--cta)]/20">
                    <Shield className="w-6 h-6 text-[var(--cta)]" />
                 </div>
                 <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] text-white">Privilege Layer</h2>
              </div>

              <div className="space-y-4 mb-10">
                 {admins.length === 0 ? (
                    <div className="py-20 text-center opacity-20">
                       <MoreHorizontal className="w-10 h-10 mx-auto mb-4" />
                       <p className="text-xs font-bold uppercase tracking-widest">No privileged accounts</p>
                    </div>
                 ) : (
                    admins.map((adm: any) => (
                       <div key={adm.email} className="p-5 bg-white/5 rounded-3xl border border-white/10 flex items-center gap-4 group/adm hover:bg-white/[0.08] transition-all">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary border border-primary/20">
                             {adm.name.charAt(0)}
                          </div>
                          <div className="flex-1 overflow-hidden">
                             <p className="text-sm font-bold text-white truncate mb-0.5">{adm.name}</p>
                             <div className="flex items-center gap-2">
                                <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${
                                  adm.role === 'superadmin' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/40'
                                }`}>
                                   {adm.role}
                                </span>
                             </div>
                          </div>
                       </div>
                    ))
                 )}
              </div>

              {showAddAdmin && (
                 <div className="mb-8 space-y-4 p-6 bg-white/5 border border-white/10 rounded-2xl animate-in fade-in">
                    <input 
                      placeholder="Name" 
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm"
                      onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                    />
                    <input 
                      placeholder="Email" 
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm"
                      onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                    />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm"
                      onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                    />
                    <select 
                      className="w-full bg-white/10 border border-white/5 rounded-xl px-4 py-3 text-sm text-white"
                      onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                    >
                       <option value="admin">Admin</option>
                       <option value="superadmin">Superadmin</option>
                       <option value="moderator">Moderator</option>
                       <option value="reviewer">Reviewer</option>
                    </select>
                    <div className="flex gap-2">
                       <Button onClick={handleAddAdmin} className="flex-1 bg-primary text-black font-bold h-10 rounded-xl">Grant Access</Button>
                       <Button onClick={() => setShowAddAdmin(false)} variant="ghost" className="h-10 text-white/40">Cancel</Button>
                    </div>
                 </div>
              )}

              <Button 
                onClick={() => setShowAddAdmin(true)}
                className="w-full group/btn relative overflow-hidden bg-white text-[#0a0f10] h-14 rounded-2xl font-bold flex items-center justify-center gap-3 border-none transition-all shadow-xl hover:shadow-primary/20"
              >
                 <Plus className="w-6 h-6" />
                 Privilege New Admin
                 <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 -z-10" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  )
}
