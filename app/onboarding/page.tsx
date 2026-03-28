'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  User, School, MapPin, GraduationCap, 
  ChevronRight, ChevronLeft, Check,
  BookText, Code, Palette, Video, Megaphone,
  Briefcase, TrendingUp, Zap, Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

const skills = [
  { id: 'writing', label: 'Content Writing', icon: BookText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'coding', label: 'Coding', icon: Code, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { id: 'design', label: 'Graphic Design', icon: Palette, color: 'text-pink-400', bg: 'bg-pink-400/10' },
  { id: 'video', label: 'Video Editing', icon: Video, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, color: 'text-teal-400', bg: 'bg-teal-400/10' }
]

const goals = [
  { id: '5k', label: '₹5,000 / month', sub: 'Starting small' },
  { id: '10k', label: '₹10,000 / month', sub: 'Serious side-hustle' },
  { id: '20k', label: '₹20,000+ / month', sub: 'High earner mode' }
]

const interests = [
  { id: 'freelance', label: 'Freelancing', icon: Briefcase },
  { id: 'affiliate', label: 'Affiliate Marketing', icon: TrendingUp },
  { id: 'micro', label: 'Micro Tasks', icon: Zap },
  { id: 'intern', label: 'Internships', icon: Star }
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    year: '',
    course: '',
    city: '',
    selectedSkills: [] as string[],
    earningGoal: '',
    interestAreas: [] as string[]
  })

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem('earnify_onboarding_progress')
    if (saved) {
      const { step: s, data } = JSON.parse(saved)
      setStep(s)
      setFormData(data)
    }
  }, [])

  // Save progress
  useEffect(() => {
    localStorage.setItem('earnify_onboarding_progress', JSON.stringify({ step, data: formData }))
  }, [step, formData])

  const nextStep = () => setStep(s => Math.min(s + 1, 5))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const toggleSkill = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(id)
        ? prev.selectedSkills.filter(s => s !== id)
        : [...prev.selectedSkills, id]
    }))
  }

  const toggleInterest = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interestAreas: prev.interestAreas.includes(id)
        ? prev.interestAreas.filter(s => s !== id)
        : [...prev.interestAreas, id]
    }))
  }

  const handleFinalSubmit = async () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Building your personalized dashboard...',
        success: 'Welcome to Earnify!',
        error: 'Oops! Something went wrong.'
      }
    )
    setTimeout(() => {
      router.push('/dashboard')
    }, 2200)
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <div className="min-h-screen bg-[#0a0f10] text-white flex flex-col font-sans selection:bg-primary selection:text-[#0a0f10] overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--primary)]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--primary-dark)]/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto w-full px-4 pt-12 pb-24 flex-1 flex flex-col">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-3xl font-extrabold font-[family-name:var(--font-syne)] tracking-tight">
                Let's set up your profile
              </h1>
              <p className="text-white/40 text-sm mt-1">Step {step} of 5</p>
            </div>
            <div className="text-right">
              <span className="text-primary font-bold">{Math.round((step / 5) * 100)}%</span>
            </div>
          </div>
          <Progress value={(step / 5) * 100} className="h-2 bg-white/5" />
        </div>

        {/* Form Steps */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all focus:border-primary/50"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">College Name</label>
                    <div className="relative group">
                      <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="text" 
                        value={formData.college}
                        onChange={(e) => setFormData({...formData, college: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all focus:border-primary/50"
                        placeholder="Harvard University"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Current Year</label>
                      <div className="relative group">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                        <select 
                          value={formData.year}
                          onChange={(e) => setFormData({...formData, year: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all focus:border-primary/50 appearance-none pointer-events-auto"
                        >
                          <option value="" className="bg-[#0a0f10]">Select Year</option>
                          <option value="1" className="bg-[#0a0f10]">1st Year</option>
                          <option value="2" className="bg-[#0a0f10]">2nd Year</option>
                          <option value="3" className="bg-[#0a0f10]">3rd Year</option>
                          <option value="4" className="bg-[#0a0f10]">4th Year</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">City</label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                        <input 
                          type="text" 
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all focus:border-primary/50"
                          placeholder="San Francisco"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold mb-2">What are you good at?</h2>
                  <p className="text-white/40 text-sm">Select one or more skills to get personalized gigs</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skills.map((skill) => {
                    const Icon = skill.icon
                    const isSelected = formData.selectedSkills.includes(skill.id)
                    return (
                      <button
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={`relative flex items-center p-6 rounded-3xl border-2 transition-all text-left group overflow-hidden ${
                          isSelected 
                           ? "border-primary bg-primary/10" 
                           : "border-white/5 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className={`p-3 rounded-2xl ${skill.bg} ${skill.color} mr-4 transition-transform group-hover:scale-110`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`font-bold ${isSelected ? "text-white" : "text-white/60"}`}>
                          {skill.label}
                        </span>
                        {isSelected && (
                          <div className="absolute top-4 right-4 bg-primary text-[#0a0f10] rounded-full p-1">
                            <Check className="w-3 h-3 stroke-[4px]" />
                          </div>
                        )}
                        {/* Subtle glow on hover/select */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2">Build your earning goal</h2>
                  <p className="text-white/40 text-sm">How much do you want to earn per month?</p>
                </div>
                <div className="space-y-4">
                  {goals.map((goal) => {
                    const isSelected = formData.earningGoal === goal.id
                    return (
                      <button
                        key={goal.id}
                        onClick={() => setFormData({...formData, earningGoal: goal.id})}
                        className={`w-full flex items-center justify-between p-7 rounded-3xl border-2 transition-all group ${
                          isSelected 
                            ? "border-primary bg-primary/10" 
                            : "border-white/5 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="text-left">
                          <p className={`font-bold text-lg ${isSelected ? "text-white" : "text-white/70"}`}>{goal.label}</p>
                          <p className="text-white/30 text-sm">{goal.sub}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "border-primary bg-primary" : "border-white/20"}`}>
                          {isSelected && <Check className="w-4 h-4 text-[#0a0f10] stroke-[4px]" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2">What interests you?</h2>
                  <p className="text-white/40 text-sm">We'll show you opportunities in these areas</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {interests.map((interest) => {
                    const Icon = interest.icon
                    const isSelected = formData.interestAreas.includes(interest.id)
                    return (
                      <button
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`flex flex-col items-center justify-center p-8 rounded-3xl border-2 transition-all gap-4 group ${
                          isSelected 
                            ? "border-primary bg-primary/10" 
                            : "border-white/5 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <Icon className={`w-8 h-8 transition-transform group-hover:scale-110 ${isSelected ? "text-primary" : "text-white/30"}`} />
                        <span className={`font-bold text-sm ${isSelected ? "text-white" : "text-white/50"}`}>{interest.label}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-8 py-8"
              >
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                    <Check className="w-12 h-12 text-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold font-[family-name:var(--font-syne)] mb-4">You're all set!</h2>
                  <p className="text-white/40 max-w-sm mx-auto">
                    We've filtered {Math.floor(Math.random() * 50) + 50}+ gigs matched to your skills.
                    Your student earning journey starts here.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark" />
                    <div>
                      <p className="text-sm font-bold text-white">{formData.name || 'Anonymous User'}</p>
                      <p className="text-xs text-secondary">{formData.college || 'College Student'}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedSkills.map(s => (
                      <span key={s} className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-1 rounded-md text-white/60">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 px-8 h-14 rounded-2xl border border-white/10 bg-white/5 text-white/40 font-bold hover:text-white hover:bg-white/10 transition-all group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <Button
              onClick={nextStep}
              className="btn-shimmer text-[#0a0f10] font-bold rounded-2xl h-14 px-10 gap-2 grow sm:grow-0"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleFinalSubmit}
              className="btn-shimmer text-[#0a0f10] font-bold rounded-2xl h-14 px-10 gap-2 grow sm:grow-0 shadow-xl shadow-primary/20"
            >
              Build My Dashboard
              <Zap className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
