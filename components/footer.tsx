"use client"

import { Zap, Twitter, Instagram, Linkedin, Youtube, Globe, ChevronDown } from "lucide-react"

const footerLinks = {
  platform: {
    title: "Platform",
    links: [
      { name: "Explore", href: "#explore" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Pricing", href: "#pricing" },
      { name: "Success Stories", href: "#stories" },
    ],
  },
  community: {
    title: "Community",
    links: [
      { name: "Forum", href: "#forum" },
      { name: "Live Sessions", href: "#sessions" },
      { name: "Events", href: "#events" },
      { name: "Leaderboard", href: "#leaderboard" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "FAQ", href: "#faq" },
      { name: "Contact Us", href: "#contact" },
      { name: "Report Issue", href: "#report" },
      { name: "Help Center", href: "#help" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "Refund Policy", href: "#refund" },
    ],
  },
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-[var(--dark-surface)] pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="col-span-2">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-[family-name:var(--font-syne)] text-white">
                Earnify
              </span>
            </a>
            
            {/* Tagline */}
            <p className="text-[var(--text-muted)] text-sm mb-6 max-w-xs">
              Empowering students, one task at a time. Join thousands of college students earning while studying.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--primary)] transition-colors group"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4 text-[var(--text-muted)] group-hover:text-white transition-colors" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          {/* Copyright */}
          <p className="text-sm text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Earnify. All rights reserved.
          </p>

          {/* Made With Love */}
          <p className="text-sm text-[var(--text-muted)]">
            Made with{" "}
            <span className="text-[var(--error)]">&#9829;</span>
            {" "}for College Students during their Free Hours
          </p>

          {/* Selectors */}
          <div className="flex items-center gap-4">
            {/* Language */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-sm text-[var(--text-muted)] hover:bg-white/10 transition-colors">
              <Globe className="w-4 h-4" />
              English
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Currency */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-sm text-[var(--text-muted)] hover:bg-white/10 transition-colors">
              Rs. INR
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
