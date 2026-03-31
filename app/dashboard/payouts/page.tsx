'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Wallet, TrendingUp, BarChart3, 
  ArrowUpRight, ArrowDownLeft, Clock, 
  CheckCircle2, AlertCircle, Loader2,
  Calendar, Gift, CreditCard, Send,
  Briefcase
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthContext'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function PayoutsDashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    const fetchTransactions = async () => {
      // In real app, fetch from /api/payouts?userId=user.id
      setTransactions([])
      setLoading(false)
    }
    fetchTransactions()
  }, [])

  if (!user) return null

  const handleWithdraw = () => {
    toast.info("Withdrawal Request Initiated", {
       description: "Your available balance (₹" + user.balance + ") will be processed via your primary UPI ID."
    })
  }

  return (
    <div className="space-y-10 animate-fade-in">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
           <h1 className="text-3xl font-bold font-[family-name:var(--font-syne)] text-white">Payouts & Earnings</h1>
           <p className="text-white/40 text-sm mt-1">Track your wallet balance and recent financial activities.</p>
         </div>
         <Button 
           onClick={handleWithdraw}
           className="h-12 px-8 rounded-2xl bg-primary text-[#0a0f10] font-black group transition-all"
         >
            Withdraw Balance
            <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </Button>
       </div>

       {/* Balance Section */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gradient-to-br from-primary to-primary-dark p-10 rounded-[40px] relative overflow-hidden shadow-2xl shadow-primary/20">
             <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                   <div className="flex items-center gap-2 text-[#0a0f10]/60 font-black uppercase tracking-[0.2em] text-[10px] mb-2">
                      <Wallet className="w-3.5 h-3.5" /> Secure Earnify Wallet
                   </div>
                   <h2 className="text-5xl font-black text-[#0a0f10] font-[family-name:var(--font-jetbrains)] mb-2">
                     ₹{(user.balance || 0).toLocaleString()}
                   </h2>
                   <p className="text-[#0a0f10]/60 text-sm font-bold">Instantly withdrawable to your bank account.</p>
                </div>

                <div className="flex items-center gap-8 mt-12 bg-black/5 p-6 rounded-3xl border border-black/5">
                   <div>
                      <p className="text-[#0a0f10]/40 text-[10px] uppercase font-black tracking-widest leading-none mb-1">Total Earned</p>
                      <p className="text-xl font-black text-[#0a0f10]">₹{(user.totalEarned || 0).toLocaleString()}</p>
                   </div>
                   <div className="w-px h-8 bg-black/10" />
                   <div>
                      <p className="text-[#0a0f10]/40 text-[10px] uppercase font-black tracking-widest leading-none mb-1">Next Payout</p>
                      <p className="text-xl font-black text-[#0a0f10]">₹1,250</p>
                   </div>
                </div>
             </div>
             <CreditCard className="absolute -bottom-10 -right-10 w-64 h-64 text-black/5 stroke-[0.5px] scale-150 rotate-[-15deg]" />
          </div>

          <div className="space-y-6">
             <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] flex flex-col justify-center gap-2">
                <div className="h-12 w-12 rounded-2xl bg-[#0a0f10] border border-white/10 flex items-center justify-center mb-2">
                   <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest leading-none">Earnings Growth</h3>
                <p className="text-2xl font-black text-white">+12.4% <span className="text-xs text-primary font-bold">vs last month</span></p>
             </div>
             <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] flex flex-col justify-center gap-2">
                <div className="h-12 w-12 rounded-2xl bg-[#0a0f10] border border-white/10 flex items-center justify-center mb-2">
                   <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest leading-none">Settled Payments</h3>
                <p className="text-2xl font-black text-white">{transactions.filter(tx => tx.status === 'Settled').length} <span className="text-xs text-white/20 font-bold">Total TXs</span></p>
             </div>
          </div>
       </div>

       {/* Transaction History */}
       <div className="space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold font-[family-name:var(--font-syne)] text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-white/40" />
                Recent History
             </h2>
             <Button variant="ghost" className="text-xs font-bold text-white/40 hover:text-white">Download CSV</Button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-sm">
             {loading ? (
                Array(4).fill(0).map((_, i) => (
                   <div key={i} className="h-16 bg-white/5 animate-pulse border-b border-white/5" />
                ))
             ) : transactions.length > 0 ? (
                <div className="divide-y divide-white/5">
                   {transactions.map((tx, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        key={tx._id}
                        className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.03] transition-colors group cursor-default"
                      >
                         <div className="flex items-center gap-5">
                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border border-white/5 ${
                              tx.type === 'Credit' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'
                            }`}>
                               {tx.type === 'Credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                            </div>
                            <div>
                               <p className="font-bold text-white group-hover:text-primary transition-colors text-base truncate leading-tight line-clamp-1">{tx.title}</p>
                               <div className="flex items-center gap-4 text-xs text-white/40 mt-0.5">
                                  <span>{tx.date}</span>
                                  <span className="w-1 h-1 bg-white/10 rounded-full" />
                                  <span>{tx.method}</span>
                               </div>
                            </div>
                         </div>

                         <div className="flex items-center gap-8 justify-between md:justify-end">
                            <div className="text-right">
                               <p className={`text-lg font-black font-[family-name:var(--font-jetbrains)] ${
                                 tx.type === 'Credit' ? 'text-white' : 'text-white/40'
                               }`}>
                                 {tx.type === 'Credit' ? '+' : '-'} ₹{tx.amount.toLocaleString()}
                               </p>
                            </div>
                            <div className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                               tx.status === 'Settled' ? 'bg-emerald-400/5 text-emerald-400 border-emerald-400/20' : 
                               tx.status === 'In Review' ? 'bg-amber-400/5 text-amber-400 border-amber-400/20' :
                               'bg-red-400/5 text-red-400 border-red-400/20'
                            }`}>
                               {tx.status}
                            </div>
                         </div>
                      </motion.div>
                   ))}
                </div>
             ) : (
                <div className="py-20 text-center text-white/20 font-bold uppercase tracking-[0.2em] text-xs">No transactions found.</div>
             )}
          </div>
       </div>
    </div>
  )
}
