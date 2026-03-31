"use client"

import { useState, useEffect } from "react"
import { Menu, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Explore", href: "/#explore" },
  { name: "Opportunities", href: "/#opportunities" },
  { name: "Community", href: "/#community" },
  { name: "Leaderboard", href: "/#leaderboard" },
]

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/auth/AuthContext"
import { LogOut, LayoutDashboard, UserCircle } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { user, login, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleStartEarning = () => {
    router.push("/signup")
  }

  const handleLogin = () => {
    router.push("/login")
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
            <span className={`text-xl font-bold font-[family-name:var(--font-syne)] transition-colors ${
              isScrolled ? "text-[var(--text-primary)]" : "text-white"
            } group-hover:text-[var(--primary)]`}>
              Earnify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--primary)] hover:after:w-full after:transition-all ${
                  isScrolled ? "text-[var(--text-secondary)]" : "text-white/80"
                } hover:text-[var(--primary)]`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 sm:gap-6">
            {!user ? (
              <>
                {/* Desktop Login */}
                <button 
                  onClick={handleLogin}
                  className={`hidden sm:block text-sm font-bold transition-colors px-4 py-2 ${
                    isScrolled ? "text-[var(--text-primary)]" : "text-white"
                  } hover:text-[var(--primary)]`}
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
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-4">
                <Link 
                  href="/dashboard"
                  className={`flex items-center gap-2 text-sm font-bold transition-colors px-4 py-2 ${
                    isScrolled ? "text-[var(--text-primary)]" : "text-white"
                  } hover:text-[var(--primary)] group`}
                >
                  <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Dashboard
                </Link>

                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                  <div className="h-8 w-8 rounded-full border border-[var(--primary)]/30 overflow-hidden bg-white/5">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-red-400 transition-all hover:rotate-12"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className={`w-5 h-5 transition-colors ${isScrolled || isMobileMenuOpen ? "text-[var(--text-primary)]" : "text-white"}`} />
              ) : (
                <Menu className={`w-5 h-5 transition-colors ${isScrolled ? "text-[var(--text-primary)]" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-[var(--border-color)] animate-fade-in bg-[var(--dark-bg)] shadow-2xl rounded-b-3xl">
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-3 text-base font-bold text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile CTA & Login */}
            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4 px-4">
              {!user ? (
                <>
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
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl border border-white/10 text-white font-bold bg-white/5 hover:bg-white/10"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Go to Dashboard
                  </Link>
                  <button 
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-red-400 font-bold bg-red-400/5 hover:bg-red-400/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
