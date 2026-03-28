'use client'

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Megaphone, PenTool, Palette, Code, 
  GraduationCap, BarChart3, Share2, Video,
  Briefcase, Loader2
} from "lucide-react"

export function CategoriesGrid() {
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
        console.error('Failed to fetch categories:', err)
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

  const getBgColor = (slug: string) => {
    switch(slug) {
      case 'marketing': return 'bg-[#6d9c9f]'
      case 'writing': return 'bg-[#e8a838]'
      case 'design': return 'bg-[#e91e8c]'
      case 'development': 
      case 'coding': return 'bg-[#7c3aed]'
      default: return 'bg-gray-400'
    }
  }

  return (
    <section className="py-16 sm:py-20 bg-[#f7f9f0]" id="explore">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-syne)] text-[var(--text-primary)] mb-4">
            Choose your Pick
          </h2>
          <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto font-medium">
            Explore and find opportunities that match your skills and interests
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 min-h-[200px]">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-44 bg-white rounded-2xl animate-pulse border border-black/5" />
            ))
          ) : categories.length > 0 ? (
            categories.map((category) => {
              const Icon = getIcon(category.slug)
              return (
                <Link 
                  key={category._id} 
                  href={`/categories/${category.slug}`}
                  className="group bg-white rounded-2xl p-6 border border-[var(--border-color)] card-hover cursor-pointer"
                >
                  <div className={`w-[52px] h-[52px] rounded-xl ${getBgColor(category.slug)} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">{category.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] font-medium">{category.potential || 'Multiple tasks available'}</p>
                </Link>
              )
            })
          ) : (
            <div className="col-span-full py-10 text-center text-[var(--text-secondary)]">
               No categories found. Please seed the database.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
