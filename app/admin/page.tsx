"use client"

import React, { useEffect, useState } from "react"
import { 
  Users, 
  Briefcase, 
  CreditCard, 
  CheckSquare, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingDown,
  Activity,
  Zap
} from "lucide-react"
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  CartesianGrid 
} from "recharts"

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  if (loading) {
// ... existing loading code ...
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-white/5 border border-white/10 rounded-3xl" />
          ))}
        </div>
        <div className="h-96 bg-white/5 border border-white/10 rounded-3xl" />
      </div>
    )
  }

  const statCards = [
    { label: "Total Students", value: stats.totalUsers || 0, icon: Users, color: "text-blue-400", change: "" },
    { label: "Active Gigs", value: stats.totalGigs || 0, icon: Briefcase, color: "text-[var(--primary)]", change: "" },
    { label: "Pending Tasks", value: stats.pendingSubmissions || 0, icon: CheckSquare, color: "text-yellow-400", change: "" },
    { label: "Total Revenue", value: `₹${(stats.totalRevenue || 0).toLocaleString()}`, icon: CreditCard, color: "text-teal-400", change: "" },
  ]

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div>
         <h1 className="text-3xl font-bold font-[family-name:var(--font-syne)] tracking-tight text-white mb-2">Platform Control Hub</h1>
         <p className="text-[var(--text-muted)] font-medium">Manage Earnify ecosystem, monitor growth, and control payouts.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 relative overflow-hidden group hover:shadow-[var(--primary)]/10 shadow-2xl transition-all">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon className="w-16 h-16" />
             </div>
             <div className="flex items-center gap-4 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 ${stat.color}`}>
                   <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">{stat.label}</p>
             </div>
             <div className="flex items-end justify-between">
                <div>
                   <p className="text-3xl font-bold text-white font-[family-name:var(--font-jetbrains)]">{stat.value}</p>
                </div>
                {stat.change && (
                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {stat.change.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                  </div>
                )}
             </div>
          </div>
        ))}
      </div>

      {/* Charts & Activity View Section */}
      <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 bg-white/5 rounded-3xl border border-white/10 p-8 min-h-[400px]">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-bold font-[family-name:var(--font-syne)] tracking-tight flex items-center gap-3">
                  <Activity className="w-5 h-5 text-[var(--primary)]" />
                  Activity Performance
               </h2>
               <div className="flex gap-2">
                  {['Weekly', 'Monthly', 'Annual'].map(filter => (
                     <button key={filter} className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 transition-colors">
                        {filter}
                     </button>
                  ))}
               </div>
            </div>

            {/* Real Dashboard Chart */}
            <div className="w-full h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.activityTrends || []}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }}
                    dy={10}
                  />
                  <YAxis 
                    hide={true}
                  />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: '#0d1213', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                    itemStyle={{ color: 'var(--primary)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="var(--primary)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorCount)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 rounded-3xl border border-white/10 p-8">
               <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  Recent Submissions
               </h2>
               <div className="space-y-6">
                  {stats.recentSubmissions?.length > 0 ? stats.recentSubmissions.map((sub: any) => (
                     <div key={sub._id} className="flex items-start gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] text-[10px] font-black shrink-0">
                           {sub.userId?.name?.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                           <p className="text-xs font-bold text-white truncate">{sub.userId?.name}</p>
                           <p className="text-[10px] text-[var(--text-muted)] truncate font-medium">Submitted: {sub.opportunityId?.title}</p>
                        </div>
                     </div>
                  )) : (
                     <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest text-center py-10 opacity-30">No recent submissions.</p>
                  )}
               </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--primary)]/20 to-transparent border border-[var(--primary)]/30">
               <h3 className="text-lg font-bold mb-4">Admin Efficiency Score</h3>
               <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-4xl font-bold font-[family-name:var(--font-jetbrains)] text-white">0%</p>
               </div>
               <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Respond to task submissions within 12 hours to increase your efficiency score.
               </p>
            </div>
         </div>
      </div>
    </div>
  )
}
