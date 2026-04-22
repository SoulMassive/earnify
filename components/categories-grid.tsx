'use client'

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Megaphone, PenTool, Palette, Code, 
  GraduationCap, BarChart3, Share2, Video,
  Briefcase, Loader2, Sparkles, TrendingUp
} from "lucide-react"

const categoryStyles: Record<string, { gradient: string, glow: string, iconBg: string, shadow: string, stats: string, skills: string }> = {
  marketing: { 
    gradient: "from-teal-500/20 to-emerald-500/10", 
    glow: "bg-teal-500/20", 
    iconBg: "from-teal-500 to-emerald-500", 
    shadow: "shadow-teal-500/20",
    stats: "₹15k–₹60k",
    skills: "SEO, Copywriting"
  },
  writing: { 
    gradient: "from-orange-500/20 to-yellow-500/10", 
    glow: "bg-orange-500/20", 
    iconBg: "from-orange-500 to-yellow-500", 
    shadow: "shadow-orange-500/20",
    stats: "₹10k–₹50k",
    skills: "Blogs, Ghostwriting"
  },
  development: { 
    gradient: "from-purple-500/20 to-indigo-500/10", 
    glow: "bg-purple-500/20", 
    iconBg: "from-purple-500 to-indigo-500", 
    shadow: "shadow-purple-500/20",
    stats: "₹25k–₹1.2L",
    skills: "React, Node.js"
  },
  coding: { 
    gradient: "from-purple-500/20 to-indigo-500/10", 
    glow: "bg-purple-500/20", 
    iconBg: "from-purple-500 to-indigo-500", 
    shadow: "shadow-purple-500/20",
    stats: "₹25k–₹1.2L",
    skills: "React, Node.js"
  },
  design: { 
    gradient: "from-pink-500/20 to-rose-500/10", 
    glow: "bg-pink-500/20", 
    iconBg: "from-pink-500 to-rose-500", 
    shadow: "shadow-pink-500/20",
    stats: "₹12k–₹80k",
    skills: "UI/UX, Figma"
  },
  data: { 
    gradient: "from-blue-500/20 to-cyan-500/10", 
    glow: "bg-blue-500/20", 
    iconBg: "from-blue-500 to-cyan-500", 
    shadow: "shadow-blue-500/20",
    stats: "₹8k–₹35k",
    skills: "Excel, Python"
  },
  video: { 
    gradient: "from-indigo-500/20 to-blue-500/10", 
    glow: "bg-indigo-500/20", 
    iconBg: "from-indigo-500 to-blue-500", 
    shadow: "shadow-indigo-500/20",
    stats: "₹18k–₹1L",
    skills: "Editing, Motion"
  },
  tutoring: { 
    gradient: "from-emerald-500/20 to-teal-500/10", 
    glow: "bg-emerald-500/20", 
    iconBg: "from-emerald-500 to-teal-500", 
    shadow: "shadow-emerald-500/20",
    stats: "₹15k–₹75k",
    skills: "Maths, Science"
  },
  social: { 
    gradient: "from-rose-500/20 to-orange-500/10", 
    glow: "bg-rose-500/20", 
    iconBg: "from-rose-500 to-orange-500", 
    shadow: "shadow-rose-500/20",
    stats: "₹10k–₹60k",
    skills: "Ads, Community"
  },
}

export function CategoriesGrid() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const mockDefaultCategories = [
    { _id: 'fallback-marketing', slug: 'marketing', title: 'Affiliate Marketing', trending: true, badge: '🔥 Trending' },
    { _id: 'fallback-writing', slug: 'writing', title: 'Content Writing Hub' },
    { _id: 'fallback-development', slug: 'development', title: 'Coding & Dev Hub', trending: true, badge: '💸 High Demand' },
    { _id: 'fallback-design', slug: 'design', title: 'Graphic Design Studio' },
    { _id: 'fallback-data', slug: 'data', title: 'Data & Virtual Support' },
    { _id: 'fallback-video', slug: 'video', title: 'Video & Animation Hub' },
    { _id: 'fallback-tutoring', slug: 'tutoring', title: 'Online Tutoring Hub' },
    { _id: 'fallback-social', slug: 'social', title: 'Social Media Hub' },
  ]

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/page-content')
        const data = await res.json()
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories)
        } else {
          setCategories(mockDefaultCategories)
        }
      } catch (err) {
        setCategories(mockDefaultCategories)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const getIcon = (slug: string) => {
    switch(slug) {
      case 'marketing': return Megaphone
      case 'writing': return PenTool
      case 'design': return Palette
      case 'development': return Code
      case 'coding': return Code
      case 'tutoring': return GraduationCap
      case 'data': return BarChart3
      case 'social': return Share2
      case 'video': return Video
      default: return Briefcase
    }
  }

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 1 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section className="relative py-24 sm:py-32 bg-slate-50 overflow-hidden" id="explore">
       {/* Background WASH */}
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary)]/5 to-transparent pointer-events-none" />
       <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--primary)]/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
       <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--cta)]/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--border-color)] shadow-sm mb-2"
          >
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Discovery Hub</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-syne)] text-[var(--text-primary)] leading-tight"
          >
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]">Pick</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--text-secondary)] max-w-2xl mx-auto font-medium text-lg"
          >
            Stop scrolling and start specializing. Select a path that resonates with your skills and goals.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 min-h-[400px]"
        >
          {loading ? (
             Array(8).fill(0).map((_, i) => (
                <div key={i} className="h-56 bg-white/50 backdrop-blur-md rounded-3xl animate-pulse border border-white" />
             ))
          ) : categories.length > 0 ? (
            categories.map((category, idx) => {
              const Icon = getIcon(category.slug)
              const style = categoryStyles[category.slug] || categoryStyles.marketing
              const isTrending = category.trending || [0, 2].includes(idx % 8) // Dynamic trending mock
              
              return (
                <CategoryCard 
                  key={category._id} 
                  category={category} 
                  Icon={Icon} 
                  style={style} 
                  idx={idx}
                  isTrending={isTrending}
                  variants={itemVariants}
                />
              )
            })
          ) : (
            <div className="col-span-full py-20 text-center">
               <Briefcase className="w-12 h-12 text-[var(--border-color)] mx-auto mb-4 opacity-30" />
               <p className="text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">Database Sync Required</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function CategoryCard({ category, Icon, style, idx, isTrending, variants }: any) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Stagger / Stagger effect concept
  const yOffset = idx % 2 === 0 ? "0px" : "20px"

  return (
    <motion.div
      variants={variants}
      style={{ marginTop: yOffset }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group h-full"
    >
      {/* Radial Glow Component */}
      <div className={`absolute inset-0 ${style.glow} blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full`} />

      <Link href={`/categories/${category.slug}`} className="block h-full">
        <motion.div 
          whileHover={{ 
            scale: 1.03, 
            y: -6,
            rotateX: 3,
            rotateY: 3,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative h-full glass-card p-8 rounded-[32px] border border-white hover:border-[var(--primary)]/30 shadow-xl ${style.shadow} transition-all duration-300 overflow-hidden flex flex-col`}
          style={{ perspective: "1000px" }}
        >
          {/* Card Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
          
          {/* Trending Badge */}
          {isTrending && (
             <div className="absolute top-6 right-6 z-20">
               <div className="flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-sm border border-white rounded-full shadow-sm">
                 <TrendingUp className="w-3 h-3 text-[var(--primary)]" />
                 <span className="text-[10px] font-black uppercase tracking-tighter text-[var(--primary)]">
                    {category.badge || "🔥 Trending"}
                 </span>
               </div>
             </div>
          )}

          {/* Icon Container Card */}
          <div className="relative mb-8 z-10 w-16 h-16">
            <div className={`absolute inset-0 bg-gradient-to-br ${style.iconBg} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity scale-90`} />
            <div className={`relative w-full h-full bg-gradient-to-br ${style.iconBg} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-black/5`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-2 mt-auto">
            <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight group-hover:text-[var(--primary)] transition-colors leading-none">
              {category.title}
            </h3>
            
            {/* Tooltip-like Mini Preview */}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-[var(--text-secondary)] opacity-80 group-hover:opacity-100 transition-opacity">
                {style.stats}
              </span>
            </div>
          </div>

          {/* Interactive Tooltip Reveal */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 pt-6 border-t border-black/5 space-y-2"
              >
                <div className="flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-[var(--primary)]" />
                   <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest whitespace-nowrap">
                      Top Skills: {style.skills}
                   </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>
    </motion.div>
  )
}
