'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { CheckCircle2, TrendingUp, Users, ArrowLeft } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring animations for cursor following glow
  const springConfig = { damping: 25, stiffness: 200 }
  const glowX = useSpring(mouseX, springConfig)
  const glowY = useSpring(mouseY, springConfig)

  // Parallax motion values
  const blob1X = useSpring(useMotionValue(0), springConfig)
  const blob1Y = useSpring(useMotionValue(0), springConfig)
  const blob2X = useSpring(useMotionValue(0), springConfig)
  const blob2Y = useSpring(useMotionValue(0), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Parallax effect: blobs move slightly in opposite direction
      const moveX = (e.clientX - window.innerWidth / 2) / 25
      const moveY = (e.clientY - window.innerHeight / 2) / 25
      
      blob1X.set(moveX)
      blob1Y.set(moveY)
      blob2X.set(-moveX)
      blob2Y.set(-moveY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, blob1X, blob1Y, blob2X, blob2Y])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0f10] text-white selection:bg-primary/30">
      {/* Dynamic Cursor Glow */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="pointer-events-none fixed z-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]"
      />

      <div className="relative z-10 flex min-h-screen flex-col md:flex-row">
        {/* Left Side: Visual Experience */}
        <div className="relative hidden w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0f10] via-[#112a2c] to-[#120a1d] p-12 md:flex md:w-[55%]">
          {/* Animated Background Blobs with Parallax */}
          <motion.div
            style={{ x: blob1X, y: blob1Y }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]"
          />
          <motion.div
            style={{ x: blob2X, y: blob2Y }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-[-10%] right-[-20%] h-[700px] w-[700px] rounded-full bg-purple-500/10 blur-[140px]"
          />

          {/* Home Link */}
          <Link 
            href="/" 
            className="absolute top-12 left-12 flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          {/* Centered Content */}
          <div className="relative z-20 max-w-lg text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-display mb-2 text-2xl font-bold tracking-tight text-primary">
                Earnify
              </h1>
              <h2 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                Turn your time <br />
                <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
                  into income
                </span>
              </h2>
              <div className="flex items-center gap-3 text-white/70">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="h-8 w-8 rounded-full border-2 border-[#112a2c] bg-neutral-800"
                      style={{
                        backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}')`,
                        backgroundSize: 'cover'
                      }}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium">
                  Join <span className="text-white">12,000+</span> student earners
                </p>
              </div>
            </motion.div>

            {/* Floating UI Elements */}
            <div className="mt-16 space-y-6">
              {/* Earnings Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="animate-float flex w-fit items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Total Earned</p>
                  <p className="text-xl font-bold text-white">+₹2,400</p>
                </div>
              </motion.div>

              {/* Active Gigs Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="animate-float flex w-fit items-center gap-4 self-end rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:ml-20"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">14 Active Gigs</p>
                  <p className="text-xs text-white/50">4 expiring today</p>
                </div>
              </motion.div>

              {/* Rating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                className="animate-float flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 backdrop-blur-md"
                style={{ animationDelay: '2s' }}
              >
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Top Rated Student</span>
              </motion.div>
            </div>
          </div>

          {/* Subtle Parallax Background Shapes using mouse position if needed */}
          {/* We'll use the CSS variables for parallax if we want more control, but simple framer motion is fine */}
        </div>

        {/* Right Side: Auth Form Container */}
        <div className="relative flex w-full flex-col items-center justify-center bg-[#0a0f10] p-6 md:w-[45%] md:p-12 lg:p-24">
          {/* Mobile Back Link */}
          <Link 
            href="/" 
            className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white md:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>

          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
