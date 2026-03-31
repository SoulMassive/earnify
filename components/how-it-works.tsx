"use client"

import { UserPlus, Search, Wallet, ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

// ─── Static fallback data — no API, no errors, ever ──────────────────────────
const STEPS = [
  {
    id: 1,
    number: "01",
    icon: UserPlus,
    label: "Sign Up",
    title: "Create Your Profile",
    description:
      "Sign up in 60 seconds. Tell us your skills, interests, and availability — we'll match opportunities to you automatically.",
    color: "from-teal-400 to-cyan-500",
    glow: "rgba(45,122,126,0.18)",
    highlight: "#2d7a7e",
    detail: "Free forever · No credit card",
  },
  {
    id: 2,
    number: "02",
    icon: Search,
    label: "Explore",
    title: "Pick Opportunities",
    description:
      "Browse hundreds of curated gigs, micro-tasks, and freelance jobs. Filter by payout, difficulty, and time commitment.",
    color: "from-violet-400 to-purple-500",
    glow: "rgba(124,58,237,0.15)",
    highlight: "#7c3aed",
    detail: "New gigs added daily",
  },
  {
    id: 3,
    number: "03",
    icon: Wallet,
    label: "Earn",
    title: "Start Earning",
    description:
      "Submit your work, get approved, and watch your balance grow. Withdraw instantly to UPI or your bank account.",
    color: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.15)",
    highlight: "#f59e0b",
    detail: "Instant UPI payouts",
  },
]

// ─── Step Card ────────────────────────────────────────────────────────────────
function StepCard({
  step,
  index,
  activeStep,
  onHover,
}: {
  step: (typeof STEPS)[number]
  index: number
  activeStep: number | null
  onHover: (id: number | null) => void
}) {
  const isActive = activeStep === step.id
  const isDimmed = activeStep !== null && !isActive
  const Icon = step.icon

  return (
    <div
      className="hiw-card"
      style={{
        opacity: isDimmed ? 0.45 : 1,
        transform: isActive ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: isActive
          ? `0 20px 48px ${step.glow}, 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)`
          : "0 4px 16px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.85)",
      }}
      onMouseEnter={() => onHover(step.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Step number */}
      <div
        className="hiw-step-number"
        style={{ color: isActive ? step.highlight : undefined }}
      >
        {step.number}
      </div>

      {/* Icon circle */}
      <div
        className={`hiw-icon-circle bg-gradient-to-br ${step.color}`}
        style={{
          boxShadow: isActive ? `0 8px 24px ${step.glow}` : "none",
          transform: isActive ? "scale(1.08) rotate(-4deg)" : "scale(1) rotate(0deg)",
          transition: "all 0.35s ease",
        }}
      >
        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
      </div>

      {/* Badge */}
      <span
        className="hiw-badge"
        style={{
          background: isActive ? step.highlight : undefined,
          color: isActive ? "#fff" : undefined,
          borderColor: isActive ? step.highlight : undefined,
        }}
      >
        {step.label}
      </span>

      {/* Title */}
      <h3
        className="hiw-title"
        style={{ color: isActive ? step.highlight : undefined, transition: "color 0.3s" }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p className="hiw-description">{step.description}</p>

      {/* Detail hint */}
      <div className="hiw-detail">
        <span
          className="hiw-dot"
          style={{ background: step.highlight }}
        />
        {step.detail}
      </div>
    </div>
  )
}

// ─── Animated connector ───────────────────────────────────────────────────────
function Connector({ active }: { active: boolean }) {
  return (
    <div className="hiw-connector" aria-hidden="true">
      <div className="hiw-connector-track">
        <div
          className="hiw-connector-fill"
          style={{
            width: active ? "100%" : "0%",
            transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
      <ArrowRight
        className="hiw-connector-arrow"
        style={{
          opacity: active ? 1 : 0.25,
          transition: "opacity 0.4s ease",
          color: "var(--primary)",
        }}
      />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function HowItWorks() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection Observer for scroll-triggered entrance
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="hiw-section" id="how-it-works">
      {/* Background orbs */}
      <div className="hiw-orb hiw-orb-left" aria-hidden="true" />
      <div className="hiw-orb hiw-orb-right" aria-hidden="true" />

      <div className="hiw-container">

        {/* ── Header ── */}
        <div
          className="hiw-header"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="hiw-badge-top">
            <Sparkles className="w-3.5 h-3.5" />
            How It Works
          </div>
          <h2 className="hiw-heading">
            Start Earning in{" "}
            <span className="hiw-heading-accent">3 Simple Steps</span>
          </h2>
          <p className="hiw-subheading">
            No experience needed. Sign up, find your first gig, and start earning today.
          </p>
        </div>

        {/* ── Steps Row ── */}
        <div className="hiw-steps-wrapper">
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              className="hiw-step-unit"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.6s ease ${i * 0.15 + 0.2}s, transform 0.6s ease ${i * 0.15 + 0.2}s`,
              }}
            >
              <StepCard
                step={step}
                index={i}
                activeStep={activeStep}
                onHover={setActiveStep}
              />
              {/* Connector between steps (desktop only) */}
              {i < STEPS.length - 1 && (
                <Connector active={visible} />
              )}
            </div>
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div
          className="hiw-progress-bar"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.8s",
          }}
        >
          {STEPS.map((step) => (
            <div
              key={step.id}
              className="hiw-progress-dot"
              style={{
                background:
                  activeStep === step.id ? step.highlight : "rgba(109,156,159,0.3)",
                transform: activeStep === step.id ? "scale(1.4)" : "scale(1)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <div
          className="hiw-cta"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.85s, transform 0.6s ease 0.85s",
          }}
        >
          <button
            onClick={() => router.push("/signup")}
            className="hiw-cta-btn"
          >
            Get Started for Free
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        /* ── Section ── */
        .hiw-section {
          position: relative;
          overflow: hidden;
          padding: 6rem 0 5.5rem;
          background: linear-gradient(160deg, #f0f9ff 0%, #e8f4f5 40%, #f1f5e2 100%);
        }

        /* ── Background orbs ── */
        .hiw-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .hiw-orb-left {
          top: -120px; left: -100px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(109,156,159,0.14) 0%, transparent 70%);
        }
        .hiw-orb-right {
          bottom: -140px; right: -100px;
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%);
        }

        /* ── Container ── */
        .hiw-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* ── Header ── */
        .hiw-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .hiw-badge-top {
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

        .hiw-heading {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 700;
          font-family: var(--font-syne, 'Syne', sans-serif);
          color: var(--text-primary);
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin-bottom: 0.85rem;
        }

        .hiw-heading-accent {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hiw-subheading {
          color: var(--text-secondary);
          font-size: 1rem;
          max-width: 440px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Step row ── */
        .hiw-steps-wrapper {
          display: flex;
          align-items: stretch;
          gap: 0;
        }

        .hiw-step-unit {
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 0;
        }

        /* ── Connector ── */
        .hiw-connector {
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 56px;
          gap: 4px;
        }

        .hiw-connector-track {
          width: 100%;
          height: 2px;
          background: rgba(109,156,159,0.15);
          border-radius: 99px;
          overflow: hidden;
        }

        .hiw-connector-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--primary-dark));
          border-radius: 99px;
        }

        .hiw-connector-arrow {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        /* ── Card ── */
        .hiw-card {
          flex: 1;
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.92);
          border-radius: 20px;
          padding: 2rem 1.75rem 1.75rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.85rem;
          cursor: default;
          will-change: transform, opacity;
        }

        /* ── Step number ── */
        .hiw-step-number {
          font-size: 2.75rem;
          font-weight: 900;
          font-family: var(--font-syne, 'Syne', sans-serif);
          color: rgba(109,156,159,0.18);
          line-height: 1;
          letter-spacing: -0.03em;
          transition: color 0.3s ease;
          user-select: none;
        }

        /* ── Icon ── */
        .hiw-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Small badge ── */
        .hiw-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 99px;
          border: 1px solid rgba(109,156,159,0.3);
          color: var(--primary-dark);
          background: rgba(109,156,159,0.08);
          transition: all 0.3s ease;
        }

        /* ── Title ── */
        .hiw-title {
          font-size: 1.15rem;
          font-weight: 700;
          font-family: var(--font-syne, 'Syne', sans-serif);
          color: var(--text-primary);
          line-height: 1.25;
        }

        /* ── Description ── */
        .hiw-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.7;
          flex: 1;
        }

        /* ── Detail line ── */
        .hiw-detail {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
          margin-top: auto;
        }

        .hiw-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Progress dots ── */
        .hiw-progress-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: 2.5rem;
        }

        .hiw-progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        /* ── CTA ── */
        .hiw-cta {
          text-align: center;
          margin-top: 3rem;
        }

        .hiw-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, var(--cta) 0%, var(--cta-dark) 100%);
          color: white;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 99px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(245,158,11,0.25);
        }

        .hiw-cta-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 28px rgba(245,158,11,0.38);
        }

        .hiw-cta-btn:active {
          transform: scale(0.98);
        }


        /* ── Responsive ── */
        @media (min-width: 768px) {
          .hiw-connector {
            display: flex;
          }
        }

        @media (max-width: 767px) {
          .hiw-steps-wrapper {
            flex-direction: column;
            gap: 1.25rem;
          }

          .hiw-step-unit {
            flex-direction: column;
          }

          .hiw-section {
            padding: 4rem 0 3.5rem;
          }
        }
      `}</style>
    </section>
  )
}
