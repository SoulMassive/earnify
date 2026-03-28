"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Megaphone, Laptop, CheckSquare, Smartphone, GraduationCap, Users, ShoppingBag, BarChart3 } from "lucide-react"

const categories = [
  { name: "Affiliate Marketing", slug: "marketing", icon: Megaphone, count: 124 },
  { name: "Freelance Gigs", slug: "writing", icon: Laptop, count: 89 },
  { name: "Micro Tasks", slug: "data", icon: CheckSquare, count: 256 },
  { name: "Social Media", slug: "social", icon: Smartphone, count: 67 },
  { name: "Skill Courses", slug: "tutoring", icon: GraduationCap, count: 43 },
  { name: "Referral Programs", slug: "marketing", icon: Users, count: 78 },
  { name: "Dropshipping", slug: "data", icon: ShoppingBag, count: 32 },
  { name: "Data Entry", slug: "data", icon: BarChart3, count: 145 },
]

export function CategoryStrip() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState(0)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="sticky top-16 z-40 bg-white border-b border-[var(--border-color)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <h2 className="text-center text-xl sm:text-2xl font-bold font-[family-name:var(--font-syne)] text-[var(--text-primary)] mb-1">
          Choose your Pick
        </h2>
        <div className="relative flex items-center py-3">
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
            className="flex gap-3 overflow-x-auto scrollbar-hide mx-10 scroll-smooth"
          >
            {categories.map((category, index) => {
              const Icon = category.icon
              const isActive = activeCategory === index
              return (
                <Link
                  key={category.name}
                  href={`/categories/${category.slug}`}
                  onClick={() => setActiveCategory(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[var(--primary)] text-white shadow-md font-bold"
                      : "bg-[var(--secondary)] text-[var(--text-secondary)] hover:bg-[var(--primary-light)] hover:border-[var(--primary)] border border-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </Link>
              )
            })}
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
