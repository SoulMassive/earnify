"use client"
export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Briefcase, ArrowLeft, CheckCircle2, Share2, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

export default function GigDetailPage() {
  const { slug, gigId } = useParams()
  const router = useRouter()
  
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<{ category: any, gig: any } | null>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, gigsRes, settingsRes] = await Promise.all([
          fetch('/api/page-content'),
          fetch(`/api/opportunities?category=${slug}`),
          fetch('/api/admin/settings')
        ])
        
        const contentData = await contentRes.json()
        const gigsData = await gigsRes.json()
        const settingsData = await settingsRes.json()
        
        const category = contentData.categories?.find((c: any) => c.slug === slug)
        const gig = gigsData?.find((g: any) => g._id === gigId || g.id === gigId)
        
        if (!gig || !category) {
          router.push('/404')
          return
        }

        setData({ category, gig })
        setSettings(settingsData)
      } catch (error) {
        console.error('Failed to fetch gig details:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [slug, gigId, router])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setIsCopied(true)
    toast.success("Link copied to clipboard!")
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleApply = async () => {
    if (settings && !settings.marketplaceEnabled) {
      toast.error("Marketplace is temporarily disabled")
      return
    }

    try {
      const authRes = await fetch('/api/auth/me')
      const authData = await authRes.json()
      
      if (!authData.user) {
        toast.error("Please login to apply")
        router.push('/login')
        return
      }

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          opportunityId: data?.gig._id,
        })
      })

      if (res.ok) {
        toast.success("Application successfully submitted!")
        setTimeout(() => router.push('/dashboard/messages'), 1500)
      } else {
        const err = await res.json()
        toast.error(err.error || "Failed to apply")
      }
    } catch (err) {
      toast.error("An unexpected error occurred")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--dark-bg)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
      </div>
    )
  }

  if (!data) return null
  const { category, gig } = data

  return (
    <main className="min-h-screen bg-[var(--dark-bg)] text-white">
      <Navbar />
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <Link 
          href={`/categories/${slug}`} 
          className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to {category.title.replace(' Hub', '')} Hub
        </Link>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Detail Area */}
          <div className="lg:col-span-8">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-[80px]" />
               
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                       <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <div>
                       <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-syne)] text-white mb-2">{gig.title}</h1>
                       <p className="text-[var(--primary-light)] font-bold uppercase tracking-wider">{gig.company || category.title.split(' ')[0]}</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12 py-8 border-y border-white/5">
                    <div>
                       <p className="text-[10px] text-[var(--text-muted)] uppercase font-extrabold tracking-widest mb-1">Payout</p>
                       <p className="text-xl font-bold text-white font-[family-name:var(--font-jetbrains)]">₹{gig.reward || gig.payout}</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-[var(--text-muted)] uppercase font-extrabold tracking-widest mb-1">Status</p>
                       <p className="text-sm font-bold text-[var(--success)]">Accepting Apps</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-[var(--text-muted)] uppercase font-extrabold tracking-widest mb-1">Difficulty</p>
                       <p className="text-sm font-bold text-white">{gig.difficulty || "Beginner"}</p>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <div>
                       <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                       <p className="text-[var(--text-muted)] leading-relaxed">
                          {gig.description || `We are looking for a talented individual to help us with ${category.title.split(' ')[0]} tasks.`}
                       </p>
                    </div>

                    <div>
                       <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
                       <ul className="space-y-3">
                          {(gig.requirements?.length > 0 ? gig.requirements : ["Basic understanding of category tasks", "Good communication skills", "Ability to meet deadlines", "Access to stable internet"]).map((req: string) => (
                            <li key={req} className="flex items-start gap-3 text-[var(--text-muted)]">
                               <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0" />
                               {req}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl sticky top-32">
               <h3 className="text-xl font-bold text-white mb-6">Apply Now</h3>
               <div className="space-y-4">
                  <Button 
                    onClick={handleApply}
                    disabled={settings && !settings.marketplaceEnabled}
                    className={`w-full h-14 rounded-2xl font-bold text-lg shadow-xl active:scale-[0.98] transition-all ${
                      settings && !settings.marketplaceEnabled 
                      ? 'bg-white/5 border border-white/10 text-white/20 cursor-not-allowed shadow-none' 
                      : 'btn-cta-gradient text-white shadow-[var(--primary)]/20 shadow-xl'
                    }`}
                  >
                     {settings && !settings.marketplaceEnabled ? 'Marketplace Offline' : 'Start Task'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleShare}
                    className={`w-full h-12 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 transition-all ${isCopied ? 'text-[var(--success)] border-[var(--success)]/30 bg-[var(--success)]/5' : 'text-[var(--text-muted)] hover:text-white'}`}
                  >
                     <Share2 className={`w-4 h-4 mr-2 ${isCopied ? 'animate-bounce' : ''}`} />
                     {isCopied ? 'Link Copied' : 'Share Opportunity'}
                  </Button>
               </div>
               
               <p className="text-[10px] text-[var(--text-muted)] text-center mt-6 uppercase font-bold tracking-widest">
                  Verified by Earnify Trust & Safety
               </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

