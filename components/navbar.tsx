"use client"

import { useState, useEffect } from "react"
import { Search, Bell, Menu, X, ChevronDown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navLinks = [
  { name: "Explore", href: "#explore" },
  { name: "Opportunities", href: "#opportunities" },
  { name: "Community", href: "#community" },
  { name: "Live Sessions", href: "#sessions" },
  { name: "Leaderboard", href: "#leaderboard" },
]

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

  const handleAppleSignIn = () => {
    toast.info("Connecting to Apple...", {
      description: "Secure authentication in progress."
    });
  }

  const handleNotify = () => {
    toast("No new notifications", {
      description: "Check back later for new gig matches!"
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
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-[family-name:var(--font-syne)] text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
              Earnify
            </span>
          </a>

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

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search skills, gigs, opportunities..."
                className="w-full h-10 pl-4 pr-10 rounded-full bg-[var(--secondary)] border border-transparent focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none text-sm transition-all text-black"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const target = document.getElementById('opportunities');
                    target?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
              <button 
                onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button 
              onClick={handleNotify}
              className="hidden sm:flex relative h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--secondary)] transition-colors"
            >
              <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--error)] rounded-full" />
            </button>

            {/* Avatar Dropdown */}
            <div className="hidden sm:block relative group">
              <button className="flex items-center gap-2 h-10 px-2 rounded-full hover:bg-[var(--secondary)] transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/32?img=12" />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
            </div>

            {/* Apple Integration Button */}
            <Button 
              variant="outline"
              onClick={handleAppleSignIn}
              className="hidden md:flex items-center gap-2 rounded-full h-10 px-5 bg-black text-white hover:bg-zinc-800 border-none transition-all hover:scale-105 active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05 1.79-3.48 1.79-1.42 0-1.88-.88-3.54-.88-1.66 0-2.2.85-3.48.88-1.28.03-2.5-1.03-3.48-1.79C1.04 17.3 0 13.56 0 10.14c0-3.43 2.13-5.24 4.18-5.24 1.05 0 2.05.73 2.68.73.63 0 1.73-.85 3-.85 1.08 0 2.45.62 3.2 1.55-1.12.65-1.85 1.83-1.85 3.32 0 2.08 1.63 3.38 3.75 3.38.1 0 .22 0 .32-.02-.2 1.15-.9 2.23-1.63 2.95l3.4-.68c.22 1.45.1 2.95-.4 4.35l3.48.66zm-5-17.2c0-2.03 1.65-3.68 3.68-3.68.05 0 .1 0 .15 0-.05 2.12-1.65 3.8-3.68 3.8-.05 0-.1 0-.15 0z"/>
              </svg>
              <span className="text-sm font-semibold">Sign in</span>
            </Button>

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
          <div className="lg:hidden py-4 border-t border-[var(--border-color)] animate-slide-in">
            {/* Mobile Search */}
            <div className="relative mb-4 md:hidden">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-4 pr-10 rounded-full bg-[var(--secondary)] border border-transparent focus:border-[var(--primary)] outline-none text-sm text-black"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const target = document.getElementById('opportunities');
                    target?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }
                }}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--secondary)] rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex flex-col gap-3">
              <Button 
                variant="outline"
                onClick={() => { handleAppleSignIn(); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 rounded-full h-10 bg-black text-white hover:bg-zinc-800 border-none"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.05 20.28c-.98.95-2.05 1.79-3.48 1.79-1.42 0-1.88-.88-3.54-.88-1.66 0-2.2.85-3.48.88-1.28.03-2.5-1.03-3.48-1.79C1.04 17.3 0 13.56 0 10.14c0-3.43 2.13-5.24 4.18-5.24 1.05 0 2.05.73 2.68.73.63 0 1.73-.85 3-.85 1.08 0 2.45.62 3.2 1.55-1.12.65-1.85 1.83-1.85 3.32 0 2.08 1.63 3.38 3.75 3.38.1 0 .22 0 .32-.02-.2 1.15-.9 2.23-1.63 2.95l3.4-.68c.22 1.45.1 2.95-.4 4.35l3.48.66zm-5-17.2c0-2.03 1.65-3.68 3.68-3.68.05 0 .1 0 .15 0-.05 2.12-1.65 3.8-3.68 3.8-.05 0-.1 0-.15 0z"/>
                </svg>
                Sign in with Apple
              </Button>
              <Button 
                onClick={() => { handleStartEarning(); setIsMobileMenuOpen(false); }}
                className="btn-shimmer text-white font-semibold rounded-full w-full h-10 border-0"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
