'use client'

import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { 
  ChevronLeft, ChevronRight, Megaphone, Laptop, 
  CheckSquare, Smartphone, GraduationCap, Users, 
  ShoppingBag, BarChart3, Briefcase, 
  PenTool, Palette, Code, Video, Globe
} from "lucide-react"

export function CategoryStrip() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState(-1)
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/page-content')
        const data = await res.json()
        if (data.categories) {
          setCategories(data.categories)
        }
      } catch (err) {
        console.error('Failed to fetch category strip data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const getIcon = (slug: string) => {
    switch(slug) {
      case 'marketing': return Megaphone
      case 'writing': return PenTool
      case 'design': return Palette
      case 'development':
      case 'coding': return Code
      case 'tutoring': return GraduationCap
      case 'data': return BarChart3
      case 'video': return Video
      default: return Briefcase
    }
  }

  return (
    <section className="sticky top-16 z-40 bg-white border-b border-[var(--border-color)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-md border border-[var(--border-color)] hover:border-[var(--primary)] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-[var(--text-secondary)]" />
          </button>

          {/* Categories */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide mx-10 scroll-smooth items-center min-h-[48px]"
          >
            {loading ? (
                Array(5).fill(0).map((_, i) => (
                   <div key={i} className="h-10 w-32 bg-[var(--secondary)] rounded-full animate-pulse" />
                ))
            ) : categories.length > 0 ? (
                categories.map((category, index) => {
                  const Icon = getIcon(category.slug)
                  const isActive = activeCategory === index
                  return (
                    <Link
                      key={category._id}
                      href={`/categories/${category.slug}`}
                      onClick={() => setActiveCategory(index)}
                      className={`flex items-center gap-2 px-6 py-2 rounded-full whitespace-nowrap transition-all border ${
                        isActive
                          ? "bg-[var(--primary)] text-white shadow-md font-bold border-[var(--primary)]"
                          : "bg-[var(--secondary)] text-[var(--text-secondary)] hover:bg-[var(--primary-light)] hover:border-[var(--primary)] border-transparent"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[var(--primary)]'}`} />
                      <span className="text-sm font-bold uppercase tracking-widest text-[10px] sm:text-xs">
                         {category.title.split(' ')[0]}
                      </span>
                    </Link>
                  )
                })
            ) : (
                <div className="text-xs text-[var(--text-muted)] font-medium">No active categories found.</div>
            )}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-md border border-[var(--border-color)] hover:border-[var(--primary)] transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
          </button>
        </div>
      </div>
    </section>
  )
}
