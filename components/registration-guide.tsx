'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Search, CheckCircle2, ArrowRight, Sparkles, Filter, Briefcase } from 'lucide-react'

export function RegistrationGuide() {
  const steps = [
    {
      id: 'step-1',
      title: 'Step 1: Account Creation & Profiling',
      icon: UserPlus,
      description: 'Begin by clicking "Start Earning" or "Get Started for Free". Enter your details and set up your student profile.',
      color: 'primary'
    },
    {
      id: 'step-2',
      title: 'Step 2: Exploring Opportunities',
      icon: Search,
      description: 'Navigate to "Find Gigs" to browse curated micro-tasks and freelance jobs. New opportunities are added daily.',
      color: 'blue-400',
      details: [
        { icon: Filter, text: 'Filter by Domain' },
        { icon: Briefcase, text: 'Difficulty level' }
      ]
    }
  ]

  return (
    <div className="space-y-6 mt-12">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        <h3 className="text-lg font-bold font-[family-name:var(--font-syne)] text-white/90">
          Registration & Onboarding Guide
        </h3>
      </div>

      <div className="grid gap-4">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="relative group p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/20 transition-all"
          >
            <div className="absolute -left-2 -top-2 w-8 h-8 rounded-full bg-[#0a0f10] border border-white/10 flex items-center justify-center text-[10px] font-bold text-primary">
              0{idx + 1}
            </div>

            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-opacity-10 flex items-center justify-center ${
                step.color === 'primary' ? 'bg-primary text-primary' : 'bg-blue-400 text-blue-400'
              } bg-white/5`}>
                <step.icon className="w-6 h-6" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  {step.description}
                </p>

                {step.details && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {step.details.map((detail, di) => (
                      <div key={di} className="flex items-center gap-1.5 text-[10px] font-medium text-white/30">
                        <detail.icon className="w-3 h-3" />
                        {detail.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="p-4 rounded-xl bg-primary/10 border border-primary/20"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <p className="text-xs font-bold text-white">
            You have successfully registered!
          </p>
        </div>
        <p className="text-[10px] text-white/60 mt-1 ml-6">
          Pick your favourite gig and start working on optimising your time!
        </p>
      </motion.div>
    </div>
  )
}
