"use client"

import { UserPlus, Search, Wallet, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const iconMap: Record<string, any> = {
  UserPlus,
  Search,
  Wallet,
}

interface Step {
  _id: string;
  number: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export function HowItWorks() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-content');
        const data = await res.json();
        if (data.benefits) {
          setSteps(data.benefits);
        }
      } catch (error) {
        console.error('Failed to fetch how-it-works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-[var(--secondary)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-syne)] text-[var(--text-primary)]">
            Start Earning in 3 Simple Steps
          </h2>
          <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto">
            No experience needed. Just sign up, find opportunities, and start earning.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative min-h-[300px]">
          {/* Connector Line - Desktop */}
          {steps.length > 0 && (
            <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--primary-dark)] to-[var(--primary)] opacity-30" />
          )}

          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-10 gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
              <p className="text-sm text-[var(--text-secondary)]">Fetching process steps...</p>
            </div>
          ) : steps.length > 0 ? (
            steps.map((step, index) => {
              const Icon = iconMap[step.icon] || UserPlus;
              return (
                <div key={step._id} className="relative text-center group">
                  {/* Step Number Badge */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center shadow-lg relative z-10 transform group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--cta)] text-white text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold font-[family-name:var(--font-syne)] text-[var(--text-primary)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              )
            })
          ) : (
             <p className="col-span-full text-center text-[var(--text-secondary)]">Error loading process roadmap.</p>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button className="btn-cta-gradient text-white font-semibold rounded-full px-8 h-12 text-base">
            Get Started for Free
          </Button>
        </div>
      </div>
    </section>
  )
}
