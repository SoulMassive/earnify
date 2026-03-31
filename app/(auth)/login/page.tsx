'use client'
export const dynamic = 'force-dynamic';

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, LogIn, ChevronRight, ChevronLeft } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthContext'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        login(data.user)
        toast.success('Welcome back to Earnify!')
        // Redirect based on role
        if (data.user.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/dashboard')
        }
      } else {
        toast.error(data.error || 'Login failed')
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Back Button */}
      <Link 
        href="/" 
        className="group mb-12 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white/40 transition-all hover:text-white hover:bg-white/10 w-fit"
      >
        <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Link>

      <div className="mb-12">
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Welcome Back
        </h2>
        <p className="text-sm font-medium text-white/50 md:text-base">
          Ready to turn your time into more income?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-sm font-semibold tracking-wider text-white/40 uppercase">Email Address</label>
          <div className="group relative">
            <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-primary" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-white/5 py-4 pr-4 pl-12 text-sm text-white outline-none transition-all placeholder:text-white/10 hover:bg-white/[0.07] focus:border-primary/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </motion.div>

        {/* Password Field */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold tracking-wider text-white/40 uppercase">Password</label>
            <Link 
              href="/forgot-password" 
              className="text-xs font-semibold text-primary transition-colors hover:text-primary/70"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="group relative">
            <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-primary" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-white/5 py-4 pr-12 pl-12 text-sm text-white outline-none transition-all placeholder:text-white/10 hover:bg-white/[0.07] focus:border-primary/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-primary/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-white/20 transition-colors hover:text-white"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>

        {/* Login Button */}
        <motion.button
          variants={itemVariants}
          type="submit"
          disabled={isLoading}
          className="btn-shimmer group relative mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-[#0a0f10] shadow-[0_4px_20px_rgba(109,156,159,0.2)] disabled:opacity-70"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0a0f10]/30 border-t-[#0a0f10]" />
          ) : (
            <>
              Login to Earnify
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </motion.button>
      </form>

      {/* Divider */}
      <motion.div variants={itemVariants} className="my-10 flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-white/5" />
        <span className="text-xs font-bold text-white/20 uppercase tracking-widest leading-none">OR CONTINUE WITH</span>
        <div className="h-[1px] flex-1 bg-white/5" />
      </motion.div>

      {/* Google Login */}
      <motion.button
        variants={itemVariants}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 focus:outline-none"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Google
      </motion.button>

      {/* Footer Link */}
      <motion.p 
        variants={itemVariants}
        className="mt-10 text-center text-sm font-medium text-white/50"
      >
        New to Earnify?{' '}
        <Link 
          href="/signup" 
          className="text-primary font-bold hover:underline transition-colors decoration-primary/30 underline-offset-4"
        >
          Create account
        </Link>
      </motion.p>
    </motion.div>
  )
}
