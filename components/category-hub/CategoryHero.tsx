"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Rocket, TrendingUp, Users, CheckCircle2, Star, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CategoryData {
  title: string;
  potential: string;
  description: string;
  avgIncome: string;
  demandLevel: string;
  successRate: string;
}

export function CategoryHero({ slug }: { slug: string }) {
  const router = useRouter()
  const [category, setCategory] = useState<CategoryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch('/api/page-content')
        const data = await res.json()
        if (data.categories) {
          const cat = data.categories.find((c: any) => c.slug === slug)
          setCategory(cat)
        }
      } catch (err) {
        console.error('Failed to fetch category hub data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategory()
  }, [slug])

  const handleStartEarning = () => {
    router.push('/signup')
  }

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-white/50">Loading hub data...</p>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold">Category not found</h2>
        <Button 
          variant="outline" 
          onClick={() => router.push('/')}
          className="mt-4"
        >
          Back to Home
        </Button>
      </div>
    )
  }

  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Rocket className="w-3.5 h-3.5" />
              Verified Earning Potential
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold font-[family-name:var(--font-syne)] tracking-tight text-white leading-[1.1]">
              {category.title} <span className="text-primary italic">Hub</span>
            </h1>

            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              {category.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                onClick={handleStartEarning}
                className="btn-shimmer h-14 px-8 rounded-2xl text-[#0a0f10] font-bold text-lg gap-2 shadow-xl shadow-primary/20"
              >
                Start Earning <TrendingUp className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                className="h-14 px-8 rounded-2xl border-white/10 hover:bg-white/5 text-white font-bold"
              >
                View Resources
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Earning Potential', value: category.potential, icon: TrendingUp, color: 'text-primary' },
              { label: 'Avg. Income', value: category.avgIncome, icon: Users, color: 'text-blue-400' },
              { label: 'Demand Level', value: category.demandLevel, icon: Star, color: 'text-yellow-400' },
              { label: 'Success Rate', value: category.successRate, icon: CheckCircle2, color: 'text-teal-400' },
            ].map((stat, i) => (
              <div 
                key={stat.label}
                className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm card-hover"
              >
                <div className={`p-2 rounded-xl bg-white/5 ${stat.color} inline-block mb-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-jetbrains)]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
