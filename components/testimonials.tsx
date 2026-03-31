"use client"

import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"

// ─── Fallback Demo Data ────────────────────────────────────────────────────────
const FALLBACK_TESTIMONIALS = [
  {
    _id: "t1",
    name: "Aman Sharma",
    role: "Engineering Student",
    earning: "₹12,400",
    content:
      "Earnify helped me earn my first income online. Super smooth experience — I completed my first gig in under 2 hours and got paid instantly!",
    avatar: "AS",
    avatarColor: "from-teal-400 to-cyan-500",
    rating: 5,
  },
  {
    _id: "t2",
    name: "Priya Mehta",
    role: "BBA Student",
    earning: "₹8,200",
    content:
      "I started with zero skills and now I earn every week. This platform is pure gold for students who want real side income without any drama.",
    avatar: "PM",
    avatarColor: "from-purple-400 to-pink-500",
    rating: 5,
  },
  {
    _id: "t3",
    name: "Rohit Verma",
    role: "Freelancer",
    earning: "₹21,000",
    content:
      "The gigs are 100% legit and payouts are lightning fast. Way better than random freelancing sites where you wait weeks to get paid.",
    avatar: "RV",
    avatarColor: "from-orange-400 to-amber-500",
    rating: 4,
  },
  {
    _id: "t4",
    name: "Sneha Kapoor",
    role: "Content Writer",
    earning: "₹15,600",
    content:
      "Perfect for students who want side income without stress. The tasks are clear, the UI is beautiful, and the support team actually responds!",
    avatar: "SK",
    avatarColor: "from-emerald-400 to-teal-500",
    rating: 5,
  },
  {
    _id: "t5",
    name: "Dev Patel",
    role: "MBA Student",
    earning: "₹9,800",
    content:
      "I was skeptical at first, but Earnify proved me wrong. The onboarding took 5 minutes and I was earning the same day. Absolutely recommend!",
    avatar: "DP",
    avatarColor: "from-blue-400 to-indigo-500",
    rating: 5,
  },
  {
    _id: "t6",
    name: "Kavya Reddy",
    role: "Graphic Designer",
    earning: "₹18,300",
    content:
      "As a designer, I love how Earnify matches tasks to your skill set. No generic gigs — every opportunity felt tailor-made. My best side hustle yet.",
    avatar: "KR",
    avatarColor: "from-rose-400 to-fuchsia-500",
    rating: 5,
  },
]

interface TestimonialItem {
  _id: string
  name: string
  role: string
  earning: string
  content: string
  avatar: string
  avatarColor: string
  rating: number
}

// ─── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 transition-colors ${
            i < rating
              ? "fill-[var(--warning)] text-[var(--warning)]"
              : "fill-transparent text-gray-300"
          }`}
        />
      ))}
    </div>
  )
}

// ─── Testimonial Card ──────────────────────────────────────────────────────────
function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: TestimonialItem
  isActive: boolean
}) {
  return (
    <div
      className="testimonial-card"
      style={{
        transform: isActive ? "scale(1.03)" : "scale(0.96)",
        opacity: isActive ? 1 : 0.55,
        transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease",
        filter: isActive ? "none" : "blur(0.5px)",
      }}
    >
      {/* Quote Icon */}
      <div className="quote-icon">
        <Quote className="w-5 h-5" />
      </div>

      {/* Avatar + Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`avatar-circle bg-gradient-to-br ${testimonial.avatarColor}`}>
          <span>{testimonial.avatar}</span>
        </div>
        <div>
          <p className="font-bold text-[var(--text-primary)] text-[15px]">{testimonial.name}</p>
          <p className="text-xs text-[var(--text-secondary)]">{testimonial.role}</p>
        </div>
      </div>

      {/* Rating */}
      <StarRating rating={testimonial.rating} />

      {/* Review */}
      <p className="testimonial-review">"{testimonial.content}"</p>
    </div>
  )
}

// ─── Main Testimonials Component ────────────────────────────────────────────────
export function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // ── Fetch or fallback ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-content")
        const data = await res.json()
        if (data.testimonials && data.testimonials.length > 0) {
          // Merge backend data with fallback for missing fields
          const merged = data.testimonials.map(
            (t: { _id: string; name: string; role: string; content: string; rating: number; earning?: string; avatar?: string; avatarColor?: string; college?: string }, i: number) => ({
              _id: t._id,
              name: t.name,
              role: t.role,
              earning: t.earning ?? FALLBACK_TESTIMONIALS[i % FALLBACK_TESTIMONIALS.length].earning,
              content: t.content,
              avatar: t.avatar ?? t.name.slice(0, 2).toUpperCase(),
              avatarColor:
                t.avatarColor ??
                FALLBACK_TESTIMONIALS[i % FALLBACK_TESTIMONIALS.length].avatarColor,
              rating: t.rating,
            })
          )
          setTestimonials(merged)
        } else {
          setTestimonials(FALLBACK_TESTIMONIALS)
        }
      } catch {
        setTestimonials(FALLBACK_TESTIMONIALS)
      }
    }
    fetchData()
  }, [])

  // ── How many cards are visible based on viewport ──
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount())
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const total = testimonials.length

  const goToNext = useCallback(() => {
    if (isTransitioning || total === 0) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev + 1) % total)
    setTimeout(() => setIsTransitioning(false), 550)
  }, [isTransitioning, total])

  const goToPrev = useCallback(() => {
    if (isTransitioning || total === 0) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev - 1 + total) % total)
    setTimeout(() => setIsTransitioning(false), 550)
  }, [isTransitioning, total])

  // ── Auto-play ──
  useEffect(() => {
    if (isPaused || total === 0) return
    timerRef.current = setInterval(goToNext, 4000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, goToNext, total])

  // ── Touch / swipe ──
  const touchStartX = useRef<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) {
      dx > 0 ? goToNext() : goToPrev()
    }
    touchStartX.current = null
  }

  // ── Build visible window ──
  const getVisibleItems = () => {
    if (total === 0) return []
    const half = Math.floor(visibleCount / 2)
    const items = []
    for (let i = -half; i <= half; i++) {
      const idx = (activeIndex + i + total) % total
      items.push({ testimonial: testimonials[idx], isActive: i === 0 })
    }
    return items
  }

  const visibleItems = getVisibleItems()

  return (
    <section
      className="testimonials-section"
      id="community"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background decoration */}
      <div className="testimonials-bg-left" aria-hidden="true" />
      <div className="testimonials-bg-right" aria-hidden="true" />

      <div className="testimonials-container">
        {/* ── Section Header ── */}
        <div className="testimonials-header">
          <div className="testimonials-badge">
            <span>⭐</span> Trusted by Students
          </div>
          <h2 className="testimonials-heading">
            Real Students.&nbsp;
            <span className="testimonials-heading-accent">Real Earnings.</span>
          </h2>
        </div>

        {/* ── Carousel Track ── */}
        <div
          ref={trackRef}
          className="carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left nav */}
          <button
            onClick={goToPrev}
            className="carousel-nav carousel-nav-left"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards */}
          <div
            className="carousel-track"
            style={{
              gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
            }}
          >
            {visibleItems.map(({ testimonial, isActive }, i) => (
              <TestimonialCard key={`${testimonial._id}-${i}`} testimonial={testimonial} isActive={isActive} />
            ))}
          </div>

          {/* Right nav */}
          <button
            onClick={goToNext}
            className="carousel-nav carousel-nav-right"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ── Dot Indicators ── */}
        <div className="carousel-dots" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`carousel-dot ${i === activeIndex ? "carousel-dot-active" : ""}`}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true)
                  setActiveIndex(i)
                  setTimeout(() => setIsTransitioning(false), 550)
                }
              }}
            />
          ))}
        </div>

      </div>

      <style>{`
        /* ── Testimonials Section ── */
        .testimonials-section {
          position: relative;
          overflow: hidden;
          padding: 6rem 0 5.5rem;
          background: linear-gradient(160deg, #f0f9ff 0%, #e8f4f5 40%, #f1f5e2 100%);
        }

        .testimonials-bg-left {
          position: absolute;
          top: -80px;
          left: -80px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(109,156,159,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .testimonials-bg-right {
          position: absolute;
          bottom: -100px;
          right: -80px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .testimonials-container {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* ── Header ── */
        .testimonials-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .testimonials-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(109,156,159,0.10);
          border: 1px solid rgba(109,156,159,0.25);
          color: var(--primary-dark);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 5px 13px;
          border-radius: 99px;
          margin-bottom: 1.25rem;
        }

        .testimonials-heading {
          font-size: clamp(1.75rem, 3.5vw, 2.4rem);
          font-weight: 700;
          font-family: var(--font-syne, 'Syne', sans-serif);
          color: var(--text-primary);
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin-bottom: 0;
        }

        .testimonials-heading-accent {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Carousel ── */
        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .carousel-track {
          display: grid;
          gap: 1.25rem;
          flex: 1;
          min-height: 280px;
          align-items: center;
        }

        /* ── Navigation Buttons ── */
        .carousel-nav {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(109,156,159,0.4);
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(8px);
          color: var(--primary-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 12px rgba(109,156,159,0.15);
          z-index: 10;
        }
        .carousel-nav:hover {
          background: var(--primary);
          color: #fff;
          border-color: var(--primary);
          transform: scale(1.08);
          box-shadow: 0 4px 20px rgba(109,156,159,0.35);
        }

        /* ── Card ── */
        .testimonial-card {
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.92);
          border-radius: 18px;
          padding: 1.75rem 1.6rem;
          box-shadow:
            0 2px 16px rgba(109,156,159,0.08),
            0 1px 3px rgba(0,0,0,0.04),
            inset 0 1px 0 rgba(255,255,255,0.85);
          position: relative;
          will-change: transform, opacity;
          min-height: 240px;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        /* ── Quote Icon ── */
        .quote-icon {
          position: absolute;
          top: 14px;
          right: 16px;
          color: rgba(109,156,159,0.25);
        }

        /* ── Avatar ── */
        .avatar-circle {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
        }

        .avatar-circle span {
          font-size: 13px;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.02em;
        }

        /* ── Review text ── */
        .testimonial-review {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
          flex: 1;
          font-style: italic;
          margin: 0;
        }

        /* ── Dots ── */
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 2rem;
        }

        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 99px;
          background: rgba(109,156,159,0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .carousel-dot-active {
          width: 24px;
          background: var(--primary);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .testimonials-section {
            padding: 4rem 0 3.5rem;
          }
          .carousel-nav {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </section>
  )
}
