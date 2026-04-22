"use client"
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { CategoryHero } from "@/components/category-hub/CategoryHero"
import { CategoryFilters } from "@/components/category-hub/CategoryFilters"
import { CategoryGigList } from "@/components/category-hub/CategoryGigList"
import { CategoryLearning } from "@/components/category-hub/CategoryLearning"
import { CategoryDashboard } from "@/components/category-hub/CategoryDashboard"
import { CategoryCustomTools } from "@/components/category-hub/CategoryCustomTools"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LayoutGrid, GraduationCap, Briefcase, BarChart3, Loader2 } from "lucide-react"

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'gigs' | 'learn' | 'work' | 'analytics'>('gigs')
  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch('/api/page-content')
        const data = await res.json()
        if (data.categories) {
          const cat = data.categories.find((c: any) => c.slug === slug)
          if (!cat) {
             setLoading(false)
             return
          }
          
          // Also fetch gigs for this category
          const gigsRes = await fetch(`/api/opportunities?category=${slug}`)
          const gigsData = await gigsRes.json()
          
          // Ensure gigs is always an array
          const finalGigs = Array.isArray(gigsData) ? gigsData : []
          
          setCategory({ ...cat, gigs: finalGigs })
        }
      } catch (err) {
        console.error('Failed to fetch category page data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategory()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--dark-bg)] text-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-white/50 font-bold uppercase tracking-widest">Constructing Hub...</p>
      </div>
    )
  }

  if (!category) {
    notFound()
  }

  const tabs = [
    { id: 'gigs', label: 'Marketplace', icon: LayoutGrid },
    { id: 'learn', label: 'Skill Academy', icon: GraduationCap },
    { id: 'work', label: 'My Work', icon: Briefcase },
    { id: 'analytics', label: 'Business Analytics', icon: BarChart3 },
  ]

  return (
    <main className="min-h-screen bg-[var(--dark-bg)] text-white">
      <Navbar />
      
      <CategoryHero slug={slug} onViewResources={() => {
        setActiveTab('learn');
        document.getElementById('learning-track')?.scrollIntoView({ behavior: 'smooth' });
      }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] hover:text-white transition-colors group px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-white/20"
        >
          <LayoutGrid className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          Back to Marketplace
        </Link>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold text-sm ${
                  isActive 
                    ? "bg-[var(--primary)] text-white shadow-[var(--primary)]/20 shadow-lg" 
                    : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[var(--text-muted)]'}`} />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Area (8 Columns) */}
          <div className="lg:col-span-8 space-y-12">
            
            {activeTab === 'gigs' && (
              <section id="marketplace" className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                   <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] tracking-tight">Active Opportunities</h2>
                   <div className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10">
                      {category.gigs.length} Total Gigs
                   </div>
                </div>
                <CategoryFilters />
                  <CategoryGigList gigs={category.gigs || []} categorySlug={slug} />
              </section>
            )}

            {activeTab === 'learn' && (
               <section id="learning-track" className="animate-fade-in">
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] mb-6 tracking-tight">Learning Track</h2>
                  <div className="grid grid-cols-1 gap-6">
                     <CategoryLearning resources={category.learningResources || []} />
                     <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--primary)]/20 to-transparent border border-[var(--primary)]/30">
                        <h3 className="text-xl font-bold mb-4">Why Learning First Matters?</h3>
                        <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                           Students who complete at least 2 resources in the Skill Academy have a 45% higher chance of their first gig application being approved.
                        </p>
                        <button className="text-[var(--primary-light)] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                           Explore advanced certifications <LayoutGrid className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </section>
            )}

            {activeTab === 'work' && (
               <section className="animate-fade-in">
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] mb-6 tracking-tight">Work Progress</h2>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                     <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Briefcase className="w-10 h-10 text-[var(--text-muted)]" />
                     </div>
                     <h3 className="text-xl font-bold mb-2">No active work found</h3>
                     <p className="text-[var(--text-muted)] mb-8 max-w-sm mx-auto">
                        Apply to your first gig in the Marketplace to see it tracked here.
                     </p>
                     <button 
                        onClick={() => setActiveTab('gigs')}
                        className="btn-primary-gradient px-8 h-12 rounded-full font-bold"
                     >
                        Go to Marketplace
                     </button>
                  </div>
               </section>
            )}

            {activeTab === 'analytics' && (
               <section className="animate-fade-in">
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] mb-6 tracking-tight">Performance Stats</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                     <CategoryCustomTools categorySlug={slug} />
                     <CategoryDashboard categoryTitle={category.title} />
                  </div>
               </section>
            )}

          </div>

          {/* Sidebar Area (4 Columns) */}
          <div className="lg:col-span-4 space-y-8 sticky top-32">
            
            {/* Quick Summary Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-2xl overflow-hidden relative group">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BarChart3 className="w-12 h-12" />
               </div>
               <h3 className="font-bold text-lg mb-4 text-white">Quick Insights</h3>
               <ul className="space-y-4">
                  <li className="flex justify-between items-center text-sm">
                     <span className="text-[var(--text-muted)]">Active Students</span>
                     <span className="font-bold text-white">{(category.gigs.length * 12).toLocaleString()}+</span>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                     <span className="text-[var(--text-muted)]">Gigs Available</span>
                     <span className="font-bold text-white">{category.gigs.length} Total</span>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                     <span className="text-[var(--text-muted)]">Average Payout</span>
                     <span className="font-bold text-[var(--primary)]">{category.avgIncome || '₹4,200'}</span>
                  </li>
               </ul>
            </div>

            {/* Next Steps / Suggested */}
            <div className="p-6 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-2xl">
               <h3 className="font-bold mb-2 text-[var(--primary-light)]">Founder's Tip</h3>
               <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Focus on building your **Success Rate** first. High-rated students get private gig invites from premium brands.
               </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

