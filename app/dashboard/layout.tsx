'use client'

import React, { useState, useEffect } from 'react'
import { 
  BarChart3, Wallet, Trophy, 
  Zap, Search, Bell, Settings, LogOut,
  Clock, UserCircle, Loader2
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthContext'
import { useRouter, usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [greeting, setGreeting] = useState('Good morning')
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  useEffect(() => {
    const hours = new Date().getHours()
    if (hours >= 12 && hours < 17) setGreeting('Good afternoon')
    else if (hours >= 17) setGreeting('Good evening')
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0f10] flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  const navItems = [
    { icon: BarChart3, label: 'Overview', path: '/dashboard' },
    { icon: Search, label: 'Find Gigs', path: '/dashboard/gigs' },
    { icon: Clock, label: 'Ongoing Tasks', path: '/dashboard/tasks' },
    { icon: Wallet, label: 'Payouts', path: '/dashboard/payouts' },
    { icon: Trophy, label: 'Leaderboard', path: '/dashboard/leaderboard' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0f10] text-white font-sans selection:bg-primary selection:text-[#0a0f10]">
      {/* Side Navigation (Fixed) */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-white/5 bg-[#0a0f10]/50 backdrop-blur-xl hidden lg:flex flex-col p-6 z-40">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-3 mb-12 group hover:opacity-80 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
            <Zap className="w-5 h-5 text-[#0a0f10]" />
          </div>
          <span className="text-xl font-bold font-[family-name:var(--font-syne)] tracking-tight text-white">Earnify</span>
        </button>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                pathname === item.path 
                ? "bg-primary text-[#0a0f10] font-bold shadow-lg shadow-primary/20" 
                : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
          <button 
            onClick={() => router.push('/dashboard/settings')}
            className={`w-full flex items-center gap-3 px-4 py-2 transition-all ${
               pathname === '/dashboard/settings' 
               ? "text-primary font-bold" 
               : "text-white/40 hover:text-white"
            }`}
          >
            <Settings className="w-5 h-5" /> Settings
          </button>
          <button onClick={logout} className="flex items-center gap-3 px-4 py-2 text-red-400/60 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0f10]/50 backdrop-blur-xl sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-white">{greeting}, {user.name.split(' ')[0]}!</h1>
            <p className="text-xs text-white/30 truncate max-w-[200px] sm:max-w-none">Track your earnings and verified student gigs.</p>
          </div>

          <div className="flex items-center gap-4 relative">
            <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 bg-white/5 rounded-2xl p-1.5 pr-4 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className="h-8 w-8 rounded-xl overflow-hidden bg-white/10 border border-white/5 group-hover:ring-2 ring-primary/50 transition-all">
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none text-white">₹{(user.balance || 0).toLocaleString()}</p>
                <p className="text-[10px] text-primary font-bold">Lvl {Math.floor((user.points || 0)/100) + 1}</p>
              </div>
            </div>

            {/* Profile Dropdown */}
            {showProfileMenu && (
               <div className="absolute top-full mt-2 right-0 w-48 bg-[#1a1f20] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up z-50">
                  <div className="p-4 border-b border-white/5 bg-white/5">
                     <p className="text-sm font-bold text-white">{user.name}</p>
                     <p className="text-[10px] text-white/40 truncate">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => { router.push('/dashboard/settings'); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  >
                     <UserCircle className="w-4 h-4" /> My Profile
                  </button>
                  <button 
                    onClick={() => { router.push('/dashboard/settings'); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  >
                     <Settings className="w-4 h-4" /> Settings
                  </button>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-colors border-t border-white/5"
                  >
                     <LogOut className="w-4 h-4" /> Logout
                  </button>
               </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-8 max-w-6xl mx-auto pb-24">
          {children}
        </div>
      </main>
    </div>
  )
}
