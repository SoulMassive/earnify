'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Mail, School, Shield, 
  Settings, Save, Key, LogOut,
  Image as ImageIcon, Upload,
  Bell, Check, Loader2
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthContext'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { user, login, logout } = useAuth()
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [college, setCollege] = useState(user?.college || '')
  
  if (!user) return null

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, college })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        // Update local session via login function in context
        login({ ...user, name, college })
        toast.success("Profile Updated Successfully", {
           description: "Your information has been synced across the platform."
        })
      } else {
        toast.error(data.error || "Update failed")
      }
    } catch (err) {
      toast.error("Network error. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-10 animate-fade-in pb-20 max-w-4xl mx-auto">
       {/* Header */}
       <div>
         <h1 className="text-3xl font-bold font-[family-name:var(--font-syne)] text-white">Account Settings</h1>
         <p className="text-white/40 text-sm mt-1">Manage your professional profile and workspace preferences.</p>
       </div>

       {/* Form Section */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Sidebar / Profile Summary */}
          <div className="space-y-6">
             <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] text-center group">
                <div className="relative w-32 h-32 mx-auto mb-6">
                   <div className="absolute inset-0 bg-primary/20 rounded-[40px] blur-2xl group-hover:scale-125 transition-transform" />
                   <div className="relative w-32 h-32 rounded-[40px] overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-all">
                      <img src={user.avatar} alt="Me" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                         <Upload className="w-8 h-8 text-white" />
                      </div>
                   </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{user.name}</h3>
                <p className="text-white/40 text-xs font-medium uppercase tracking-widest">{user.college || 'Verified Student'}</p>
                <div className="flex items-center justify-center gap-2 mt-4 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
                   <Shield className="w-4 h-4 text-primary fill-primary/20" />
                   <span className="text-[10px] uppercase font-black tracking-widest text-primary">KYC Verified Account</span>
                </div>
             </div>

             <div className="bg-white/5 border border-white/10 p-2 rounded-3xl">
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/5 text-white font-bold transition-all border border-white/10">
                   <User className="w-4 h-4 text-primary" />
                   Profile Details
                </button>
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
                   <Key className="w-4 h-4" /> Security & Privacy
                </button>
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all">
                   <Bell className="w-4 h-4" /> Notifications
                </button>
                <button onClick={logout} className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all mt-4">
                   <LogOut className="w-4 h-4" /> Sign Out
                </button>
             </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-2 space-y-8">
             <form onSubmit={handleUpdate} className="bg-white/5 border border-white/10 p-10 rounded-[40px] space-y-8 backdrop-blur-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Full Name</label>
                      <div className="relative group">
                         <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
                         <input 
                           type="text" 
                           value={name} 
                           onChange={(e) => setName(e.target.value)}
                           className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 text-white font-medium outline-none focus:border-primary/30 transition-all" 
                         />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Email Identity</label>
                      <div className="relative group">
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                         <input 
                           type="email" 
                           defaultValue={user.email} 
                           disabled 
                           className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 text-white/30 font-medium outline-none cursor-not-allowed" 
                         />
                      </div>
                   </div>
                   <div className="col-span-full space-y-3">
                      <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">University / College</label>
                      <div className="relative group">
                         <School className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
                         <input 
                           type="text" 
                           value={college} 
                           onChange={(e) => setCollege(e.target.value)}
                           placeholder="Enter your college name..."
                           className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 text-white font-medium outline-none focus:border-primary/30 transition-all" 
                         />
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-end">
                   <Button 
                      type="submit"
                      className="h-14 px-10 rounded-2xl bg-primary text-[#0a0f10] font-black group transition-all"
                      disabled={saving}
                   >
                      {saving ? (
                         <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                         <>
                            Save Changes
                            <Save className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                         </>
                      )}
                   </Button>
                </div>
             </form>

             <div className="bg-red-400/5 border border-red-400/10 p-8 rounded-[40px] flex items-center justify-between gap-6 group">
                <div>
                   <h3 className="text-red-400 font-bold mb-1">Danger Zone</h3>
                   <p className="text-xs text-red-400/60 font-medium max-w-sm">Permanently delete your account and all associated earnings. This action is irreversible.</p>
                </div>
                <Button variant="ghost" className="text-red-400 hover:text-red-400 hover:bg-red-400/10 font-bold px-6 h-12 rounded-2xl group-hover:scale-105 transition-all">
                   Delete Account
                </Button>
             </div>
          </div>
       </div>
    </div>
  )
}
