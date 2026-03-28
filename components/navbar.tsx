"use client"

import { useState, useEffect } from "react"
import { Menu, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Explore", href: "/#explore" },
  { name: "Opportunities", href: "/#opportunities" },
  { name: "Community", href: "/#community" },
  { name: "Live Sessions", href: "/#sessions" },
  { name: "Leaderboard", href: "/#leaderboard" },
]

import Link from "next/link"
import { toast } from "sonner"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleStartEarning = () => {
    toast.success("Ready to join the community! Opening signup...", {
      description: "You're one step away from your first student-gig."
    });
  }

  const handleLogin = () => {
    toast.info("Opening Login...", {
      description: "Secure authentication in progress."
    });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass border-b border-[var(--border-color)] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-[family-name:var(--font-syne)] text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
              Earnify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--primary)] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Desktop Login */}
            <button 
              onClick={handleLogin}
              className="hidden sm:block text-sm font-bold text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors px-4 py-2"
            >
              Login
            </button>

            {/* CTA Button */}
            <Button 
              onClick={handleStartEarning}
              className="btn-shimmer text-white font-semibold rounded-full px-7 h-10 hidden sm:flex border-0"
            >
              Start Earning
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-[var(--secondary)] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[var(--text-primary)]" />
              ) : (
                <Menu className="w-5 h-5 text-[var(--text-primary)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-[var(--border-color)] animate-fade-in bg-[var(--dark-bg)]">
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-base font-bold text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile CTA & Login */}
            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4 px-4">
               <button 
                onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }}
                className="w-full h-12 rounded-2xl border border-white/10 text-white font-bold bg-white/5 hover:bg-white/10"
              >
                Login
              </button>
              <Button 
                onClick={() => { handleStartEarning(); setIsMobileMenuOpen(false); }}
                className="btn-shimmer text-white font-bold rounded-2xl w-full h-12 border-0 shadow-xl shadow-[var(--primary)]/20"
              >
                Start Earning
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
