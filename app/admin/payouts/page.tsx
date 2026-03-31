"use client"

import React, { useEffect, useState } from "react"
import { CreditCard, CheckCircle2, XCircle, Clock, ExternalLink, ArrowUpRight, HandCoins, History, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AdminPayouts() {
  const [payouts, setPayouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [transactionId, setTransactionId] = useState("")

  useEffect(() => {
    fetchPayouts()
  }, [])

  const fetchPayouts = async () => {
    try {
      const res = await fetch('/api/admin/payouts')
      const data = await res.json()
      setPayouts(data)
    } finally {
      setLoading(false)
    }
  }

  const handleProcess = async (id: string, status: string) => {
    if (status === 'processed' && !transactionId) {
      toast.error("Please enter a transaction ID")
      return
    }

    try {
      const res = await fetch('/api/admin/payouts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, transactionId })
      })
      if (res.ok) {
        toast.success(`Withdrawal ${status}`)
        setProcessingId(null)
        setTransactionId("")
        fetchPayouts()
      }
    } catch (err) {
      toast.error("Failed to process payout")
    }
  }

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
           <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)]" />
           <p className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)]">Validating Financial Ledger...</p>
        </div>
     )
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-syne)] tracking-tight text-white mb-2">Payout Control Center</h1>
        <p className="text-[var(--text-muted)] font-medium">Approve, reject, and process student withdrawal requests with full transparency.</p>
      </div>

      {/* Tabs / Filter Navigation */}
      <div className="flex border-b border-white/5 space-x-12 mb-8">
         <button className="pb-4 border-b-2 border-[var(--primary)] text-[var(--primary-light)] font-bold text-sm tracking-tight flex items-center gap-2">
            <HandCoins className="w-4 h-4" />
            Pending Requests
            <span className="ml-2 w-5 h-5 rounded-full bg-[var(--primary)]/10 text-[var(--primary-light)] text-[10px] flex items-center justify-center">{payouts.filter(p => p.status === 'pending').length}</span>
         </button>
         <button className="pb-4 text-[#8a9294] font-bold text-sm tracking-tight flex items-center gap-2 hover:text-white transition-colors">
            <History className="w-4 h-4" />
            Transaction Logs
         </button>
      </div>

      {/* Payout Requests List */}
      <div className="space-y-6">
        {payouts.map((p) => (
          <div key={p._id} className="bg-white/5 border border-white/10 rounded-3xl p-6 group transition-all hover:bg-white/10 hover:shadow-2xl shadow-xl flex flex-col lg:flex-row gap-8 items-start lg:items-center relative overflow-hidden">
             
             {/* Left Info: User & Amount */}
            <div className="flex items-center gap-6 min-w-[280px]">
               <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-inner group-hover:bg-[var(--primary)]/10 transition-colors">
                  <span className="font-bold text-xl text-[var(--primary-light)] font-[family-name:var(--font-jetbrains)]">{p.userId?.name?.charAt(0)}</span>
               </div>
               <div>
                  <p className="text-lg font-bold text-white group-hover:text-[var(--primary-light)] transition-colors line-clamp-1">{p.userId?.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest truncate mb-2">{p.userId?.email}</p>
                  <div className="flex items-center gap-2">
                     <div className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-bold text-white border border-white/10 uppercase tracking-tighter">
                        Withdraw {p.method || 'UPI'}
                     </div>
                  </div>
               </div>
            </div>

            {/* Middle Info: Stats */}
            <div className="flex-1 min-w-[300px] grid grid-cols-2 gap-4">
               <div>
                  <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Requested Amount</p>
                  <p className="text-2xl font-bold text-[var(--primary-light)] font-[family-name:var(--font-jetbrains)]">₹{p.amount?.toLocaleString()}</p>
               </div>
               <div className="border-l border-white/5 pl-4">
                  <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Current Balance</p>
                  <p className="text-sm font-bold text-white">₹{p.userId?.balance?.toLocaleString()}</p>
               </div>
            </div>

            {/* Status & Date */}
            <div className="min-w-[160px]">
                <div className="flex items-center gap-2 mb-1">
                  {p.status === 'processed' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : 
                   p.status === 'rejected' ? <XCircle className="w-4 h-4 text-red-400" /> : 
                   <Clock className="w-4 h-4 text-yellow-400 animate-pulse-slow" />}
                  <span className={`text-xs font-bold uppercase tracking-widest ${
                    p.status === 'processed' ? 'text-green-400' : 
                    p.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'
                  }`}>{p.status}</span>
               </div>
               <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">{new Date(p.requestedAt).toLocaleDateString()}</p>
            </div>

            {/* Actions */}
            <div className="flex w-full lg:w-auto gap-4">
               {p.status === 'pending' ? (
                 <>
                   {processingId === p._id ? (
                      <div className="flex-1 flex gap-2">
                         <input 
                          type="text" 
                          placeholder="Enter Transaction ID (UPI Ref, etc)" 
                          className="flex-1 h-12 bg-[#0d1213] border border-[var(--primary)]/30 rounded-xl px-4 outline-none text-xs font-medium focus:border-[var(--primary)]"
                          value={transactionId}
                          onChange={e => setTransactionId(e.target.value)}
                         />
                         <Button onClick={() => handleProcess(p._id, 'processed')} className="btn-primary-gradient h-12 px-6 rounded-xl font-bold shadow-xl shadow-[var(--primary)]/20 uppercase tracking-widest text-[10px]">Verify & Paid</Button>
                         <Button variant="ghost" onClick={() => setProcessingId(null)} className="h-12 w-12 p-0 rounded-xl hover:bg-white/5 border border-white/5 flex items-center justify-center"><XCircle className="w-5 h-5 text-[var(--text-muted)]" /></Button>
                      </div>
                   ) : (
                      <>
                        <Button 
                          onClick={() => handleProcess(p._id, 'rejected')}
                          className="flex-1 h-12 px-8 rounded-xl bg-red-400/10 hover:bg-red-400/20 text-red-400 border border-red-400/20 font-bold uppercase tracking-widest text-[10px] transition-all"
                        >
                          Reject Request
                        </Button>
                        <Button 
                          onClick={() => setProcessingId(p._id)}
                          className="flex-1 h-12 px-8 rounded-xl btn-shimmer bg-white text-[#0a0f10] font-bold border-none transition-all hover:scale-105 uppercase tracking-widest text-[10px]"
                        >
                          Process Payment
                        </Button>
                      </>
                   )}
                 </>
               ) : (
                  <div className="flex-1 flex flex-col items-end gap-1 overflow-hidden">
                     <p className="text-[10px] font-bold text-white/40 uppercase">Transaction Hash</p>
                     <p className="text-xs font-bold font-[family-name:var(--font-jetbrains)] text-white/60 truncate max-w-[200px]">{p.transactionId || "NO_HASH_AVAILABLE"}</p>
                  </div>
               )}
            </div>
          </div>
        ))}
        {payouts.length === 0 && (
           <div className="py-20 text-center bg-white/2 border border-dashed border-white/10 rounded-3xl">
              <p className="text-[var(--text-muted)] uppercase font-bold tracking-widest text-sm">No payment requests in queue.</p>
           </div>
        )}
      </div>
    </div>
  )
}
