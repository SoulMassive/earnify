'use client'

import React from 'react'
import { RegistrationGuide } from './registration-guide'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'

export function HomeOnboardingSection() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  const handleCTA = () => {
    if (loading) return
    if (isAuthenticated) {
      router.push('/explore')
    } else {
      router.push('/signup')
    }
  }

  return (
    <section className="py-24 bg-[#0a0f10] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <RegistrationGuide />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <Button 
              onClick={handleCTA}
              className="btn-shimmer group h-14 px-10 rounded-full font-bold text-lg border-none shadow-2xl shadow-primary/40 bg-primary text-[#0a0f10] hover:scale-105 transition-transform"
            >
              Start Your First Earning
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
