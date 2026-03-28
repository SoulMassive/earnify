"use client"

import { useEffect, useState } from "react"
import { Play, Search, TrendingUp, Users, Briefcase, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  const [statsData, setStatsData] = useState(stats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        if (Array.isArray(data)) {
          setStatsData([
            { label: "Students Earning", value: data.length + 12000, prefix: "", suffix: "+" },
            { label: "Paid Out", value: 3.4, prefix: "Rs.", suffix: "Cr+" },
            { label: "Opportunities Listed", value: 870, prefix: "", suffix: "+" },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch hero stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
              Turn Your Free Hours Into{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] bg-clip-text text-transparent">
                Real Income
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-[var(--text-muted)] mb-8 max-w-xl mx-auto lg:mx-0">
              Earnify connects college students with affiliate deals, freelance gigs, and micro-tasks — built around your schedule.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto lg:mx-0 mb-6">
              <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden focus-within:ring-2 focus-within:ring-[var(--primary)]/50 transition-all">
                <div className="flex-1 flex items-center">
                  <Search className="w-5 h-5 text-[var(--text-secondary)] ml-4" />
                  <input
                    type="text"
                    placeholder="Search for a skill, gig, or opportunity..."
                    className="flex-1 h-14 px-4 outline-none text-[var(--text-primary)]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const target = document.getElementById('opportunities');
                        target?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  />
                </div>
                <Button 
                  className="btn-primary-gradient text-white font-semibold m-2 px-6 h-10 rounded-xl"
                  onClick={() => {
                    const target = document.getElementById('opportunities');
                    target?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start mb-8">
              <span className="text-sm text-[var(--text-muted)]">Trending:</span>
              {popularSearches.map((search) => (
                <button
                  key={search}
                  className="px-3 py-1.5 text-sm text-[var(--primary-light)] bg-[var(--primary)]/20 rounded-full hover:bg-[var(--primary)]/30 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="btn-cta-gradient text-white font-semibold rounded-full px-8 h-12 text-base">
                Explore Opportunities
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full px-8 h-12 text-base border-[var(--primary)] text-[var(--primary-light)] hover:bg-[var(--primary)]/10 bg-transparent"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch How It Works
              </Button>
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

              {/* Rating Card */}
              <div 
                className="absolute bottom-24 right-4 bg-white rounded-xl shadow-xl p-4 animate-float"
                style={{ animationDelay: '2s' }}
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--warning)] text-[var(--warning)]" />
                  ))}
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)] mt-1">4.9 avg rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {statsData.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="text-sm text-[var(--text-muted)] mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
