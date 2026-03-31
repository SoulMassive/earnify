"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  Zap,
  ShieldCheck,
  MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/AuthContext"
import { toast } from "sonner"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Messages", icon: MessageSquare, href: "/admin/messages" },
  { label: "Gig Management", icon: Briefcase, href: "/admin/gigs" },
  { label: "Submissions", icon: CheckSquare, href: "/admin/submissions" },
  { label: "User Management", icon: Users, href: "/admin/users" },
  { label: "Payout Control", icon: CreditCard, href: "/admin/payouts" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return // Wait for auth state to load

    if (!user) {
      // Not logged in at all → redirect to login
      router.replace('/login')
      return
    }

    if (user.role !== 'admin') {
      // Logged in but not admin → redirect home
      toast.error("Unauthorized: Admin access only")
      router.replace('/')
    }
  }, [user, isLoading, router])

  // Show spinner while auth is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0f10] flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Verifying admin credentials...</p>
      </div>
    )
  }

  // Not logged in or not admin — don't render panel (useEffect will redirect)
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0a0f10] flex flex-col items-center justify-center gap-4">
        <ShieldCheck className="w-12 h-12 text-[var(--primary)] opacity-20" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Checking permissions...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0f10] text-[#f0f4f5] flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } border-r border-white/5 bg-[#0d1213] transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        {/* Logo Section */}
        <Link href="/" className="p-6 flex items-center gap-3 group hover:opacity-80 transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
             <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && (
             <span className="font-bold text-lg font-[family-name:var(--font-syne)] tracking-tight text-white transition-colors group-hover:text-[var(--primary-light)]">Earnify <span className="opacity-60 text-xs uppercase tracking-widest ml-1">Admin</span></span>
          )}
        </Link>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 mt-6">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-[var(--primary)]/10 text-[var(--primary-light)] border border-[var(--primary)]/20 shadow-[0_0_20px_rgba(109,156,159,0.1)]" 
                    : "text-[#8a9294] hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[var(--primary-light)]" : "text-[#8a9294] group-hover:text-white"}`} />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                {isActive && isSidebarOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--primary-light)] shadow-[0_0_10px_var(--primary-light)]" />}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Toggle */}
        <div className="p-4 border-t border-white/5">
           <Button 
            variant="ghost" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full justify-start text-[#8a9294] hover:text-white hover:bg-white/5 p-4 rounded-xl"
           >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              {isSidebarOpen && <span className="ml-3">Collapse</span>}
           </Button>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 mb-4 rounded-xl bg-white/5 border border-white/5">
             <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                <span className="font-bold text-xs">{user?.name?.charAt(0)}</span>
             </div>
             {isSidebarOpen && (
                <div className="overflow-hidden">
                   <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                   <p className="text-[10px] text-[var(--text-muted)] truncate">{user?.email}</p>
                </div>
             )}
          </div>
          <Button 
            onClick={() => logout()}
            className="w-full justify-start text-[#8a9294] hover:text-[#ff5c5c] hover:bg-[#ff5c5c]/5 p-4 rounded-xl border-none h-auto bg-transparent"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="ml-3 font-bold">Logout Session</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${isSidebarOpen ? "ml-64" : "ml-20"} flex-1 transition-all duration-300 p-8`}>
         <div className="max-w-[1400px] mx-auto">
            {children}
         </div>
      </main>
    </div>
  )
}
