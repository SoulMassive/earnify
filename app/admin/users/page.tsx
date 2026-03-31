"use client"

import React, { useEffect, useState } from "react"
import { Users, Search, Ban, CheckCircle2, MoreVertical, Star, Shield, ShieldAlert, BadgeInfo, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(data)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })
      if (res.ok) {
        toast.success(`User ${status}`)
        fetchUsers()
      }
    } catch (err) {
      toast.error("Failed to update status")
    }
  }

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
           <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)]" />
           <p className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)]">Identifying Student Network...</p>
        </div>
     )
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-syne)] tracking-tight text-white mb-2">User Directory</h1>
        <p className="text-[var(--text-muted)] font-medium">Manage student accounts, track earnings, and moderate permissions.</p>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input 
               type="text" 
               placeholder="Search by student name, college, or email ID..." 
               className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[var(--primary)]/50 transition-all font-medium text-sm" 
            />
         </div>
         <Button variant="outline" className="h-12 px-6 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold flex items-center gap-2 transition-all">
            <Shield className="w-4 h-4" />
            Role: Student
         </Button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <div key={u._id} className="bg-white/5 border border-white/10 rounded-3xl p-6 group transition-all hover:bg-white/10 hover:shadow-2xl shadow-xl relative overflow-hidden">
             
             {/* Account Status Badge */}
             <div className={`absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                u.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
             }`}>
                {u.status}
             </div>

             {/* Profile Info */}
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
               <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/5 shadow-inner">
                  <span className="font-bold text-2xl text-[var(--primary-light)]">{u.name?.charAt(0)}</span>
               </div>
               <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[var(--primary-light)] transition-colors">{u.name}</h3>
                  <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">{u.college || "No College Info"}</p>
               </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4 mb-8">
               <div className="text-center">
                  <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-1">Total Earned</p>
                  <p className="text-sm font-bold text-white font-[family-name:var(--font-jetbrains)]">₹{u.totalEarned || 0}</p>
               </div>
               <div className="text-center border-l border-white/5">
                  <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-1">Task Rating</p>
                  <div className="flex items-center justify-center gap-1">
                     <Star className="w-3 h-3 fill-[var(--warning)] text-[var(--warning)]" />
                     <p className="text-sm font-bold text-white">4.8</p>
                  </div>
               </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
               <Button 
                variant="outline" 
                className="flex-1 h-10 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold flex items-center gap-2 text-xs"
               >
                  <BadgeInfo className="w-4 h-4" />
                  Full Profile
               </Button>
               {u.status === 'active' ? (
                 <Button 
                  onClick={() => handleStatusChange(u._id, 'blocked')}
                  className="w-10 h-10 p-0 rounded-xl bg-red-400/10 hover:bg-red-400 border border-red-400/20 text-red-400 hover:text-white transition-all flex items-center justify-center"
                 >
                    <Ban className="w-4 h-4" />
                 </Button>
               ) : (
                 <Button 
                  onClick={() => handleStatusChange(u._id, 'active')}
                  className="w-10 h-10 p-0 rounded-xl bg-green-400/10 hover:bg-green-400 border border-green-400/20 text-green-400 hover:text-white transition-all flex items-center justify-center"
                 >
                    <CheckCircle2 className="w-4 h-4" />
                 </Button>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
