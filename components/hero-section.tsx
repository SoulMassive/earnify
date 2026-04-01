"use client"

import { useEffect, useState } from "react"
import { Play, Search, TrendingUp, Users, Briefcase, Star, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

const stats = [
  { label: "Students Earning", value: 12400, prefix: "", suffix: "+" },
  { label: "Paid Out", value: 3.2, prefix: "Rs.", suffix: "Cr+" },
  { label: "Opportunities Listed", value: 850, prefix: "", suffix: "+" },
]

const popularSearches = [
  "Amazon Affiliate",
  "Content Writing",
  "Canva Gigs",
  "Tutoring",
]

function AnimatedCounter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current * 10) / 10)
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])
  
  return (
    <span className="font-[family-name:var(--font-jetbrains)] text-2xl sm:text-3xl font-bold text-[var(--primary)]">
      {prefix}{typeof value === 'number' && value < 100 ? count.toFixed(1) : Math.floor(count).toLocaleString()}{suffix}
    </span>
  )
}

export function HeroSection() {
  const { isAuthenticated, loading: loadingAuth } = useAuth()
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [statsData, setStatsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const res = await fetch('/api/page-content');
        const data = await res.json();
        if (data.siteSettings) {
          setSiteSettings(data.siteSettings);
          setStatsData([
            { label: "Students Earning", value: data.siteSettings.totalStudentsEarning, prefix: "", suffix: "+" },
            { label: "Paid Out", value: data.siteSettings.totalPaidOut, prefix: "Rs.", suffix: "Cr+" },
            { label: "Opportunities Listed", value: data.siteSettings.totalOpportunities, prefix: "", suffix: "+" },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4 bg-[var(--dark-bg)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-white/30 uppercase font-bold tracking-widest">Waking up Earnify...</p>
      </div>
    )
  }

  const { heroHeadline, heroSubheadline, popularSearches = [] } = siteSettings || {}

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--dark-bg)]">
        {/* Dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(109, 156, 159, 0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-bg)] via-transparent to-[var(--primary)]/10" />
        {/* Radial glow */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--primary)]/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/30 mb-6">
              <span className="text-sm font-medium text-[var(--primary-light)]">
                #1 Platform for Student Earners
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-syne)] text-white leading-tight mb-6">
              {heroHeadline || "Turn Your Free Hours Into Real Income"}
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-[var(--text-muted)] mb-8 max-w-xl mx-auto lg:mx-0">
              {heroSubheadline || "Earnify connects college students with affiliate deals, freelance gigs, and micro-tasks."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start min-h-[48px]">
              {loadingAuth ? (
                <div className="h-12 w-48 bg-white/5 rounded-full animate-pulse border border-white/10" />
              ) : (
                <ExploreButton />
              )}
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="relative hidden lg:block">
            <div className="relative h-[500px]">
              {/* Main Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-white rounded-2xl shadow-2xl p-6 animate-float">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">Active Opportunities</p>
                    <p className="text-sm text-[var(--text-secondary)]">Ready to apply</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {["Content Writing", "Social Media", "Data Entry"].map((gig, i) => (
                    <div key={gig} className="flex items-center justify-between p-3 bg-[var(--secondary)] rounded-xl">
                      <span className="text-sm font-medium text-[var(--text-primary)]">{gig}</span>
                      <span className="text-xs text-[var(--primary)] font-semibold">Rs.{(i + 1) * 500}/task</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Notification */}
              <div 
                className="absolute top-16 right-8 bg-[var(--success)] text-white px-4 py-2 rounded-full shadow-lg animate-float"
                style={{ animationDelay: '0.5s' }}
              >
                <span className="text-sm font-semibold">+Rs.2,400 earned</span>
              </div>

              {/* Stats Card */}
              <div 
                className="absolute bottom-16 left-8 bg-white rounded-xl shadow-xl p-4 animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[var(--success)]" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">This Month</span>
                </div>
                <p className="text-2xl font-bold font-[family-name:var(--font-jetbrains)] text-[var(--primary)]">Rs.12,450</p>
              </div>

              {/* Users Card */}
              <div 
                className="absolute top-24 left-4 bg-white rounded-xl shadow-xl p-4 animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">1,234 students online</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExploreButton() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  const handleClick = () => {
    if (loading) return

    if (isAuthenticated) {
      router.push("/explore")
    } else {
      router.push("/signup")
    }
  }

  return (
    <Button 
      onClick={handleClick} 
      className="btn-cta-gradient text-white font-semibold rounded-full px-8 h-12 text-base hover:shadow-[0_0_20px_rgba(var(--cta-rgb),0.4)] hover:scale-105 transition-all duration-300 border-0"
    >
      Explore Opportunities
    </Button>
  )
}
