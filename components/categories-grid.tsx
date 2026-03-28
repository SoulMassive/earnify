"use client"

import Link from "next/link"
import { Megaphone, PenTool, Palette, Code, GraduationCap, BarChart3, Share2, Video } from "lucide-react"

const categories = [
  { name: "Affiliate Marketing", slug: "marketing", icon: Megaphone, count: 124, bgColor: "bg-[#6d9c9f]" },
  { name: "Content Writing", slug: "writing", icon: PenTool, count: 89, bgColor: "bg-[#e8a838]" },
  { name: "Graphic Design", slug: "design", icon: Palette, count: 67, bgColor: "bg-[#e91e8c]" },
  { name: "Coding & Dev", slug: "development", icon: Code, count: 54, bgColor: "bg-[#7c3aed]" },
  { name: "Online Tutoring", slug: "tutoring", icon: GraduationCap, count: 98, bgColor: "bg-[#4caf7d]" },
  { name: "Data Entry", slug: "data", icon: BarChart3, count: 145, bgColor: "bg-[#8b5cf6]" },
  { name: "Social Media", slug: "social", icon: Share2, count: 76, bgColor: "bg-[#e05252]" },
  { name: "Video Editing", slug: "video", icon: Video, count: 43, bgColor: "bg-[#ef4444]" },
]

export function CategoriesGrid() {
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link 
                key={category.name} 
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-2xl p-5 border border-[var(--border-color)] card-hover cursor-pointer"
              >
                <div className={`w-[52px] h-[52px] rounded-xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">{category.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{category.count} opportunities</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
