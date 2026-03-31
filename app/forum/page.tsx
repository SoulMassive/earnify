"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MessageSquare, ThumbsUp, Eye, Pin } from "lucide-react"

const threads = [
  {
    title: "Best strategy for affiliate gigs as a beginner?",
    author: "Aman S.",
    avatar: "AS",
    color: "from-teal-400 to-cyan-500",
    replies: 24,
    views: 312,
    likes: 18,
    tag: "Strategy",
    tagColor: "bg-teal-100 text-teal-700",
    pinned: true,
    time: "2h ago",
  },
  {
    title: "My first 3 months on Earnify — full income breakdown",
    author: "Priya M.",
    avatar: "PM",
    color: "from-purple-400 to-pink-500",
    replies: 41,
    views: 897,
    likes: 67,
    tag: "Income Report",
    tagColor: "bg-purple-100 text-purple-700",
    pinned: true,
    time: "5h ago",
  },
  {
    title: "Tips for getting tasks approved faster?",
    author: "Rohit V.",
    avatar: "RV",
    color: "from-orange-400 to-amber-500",
    replies: 15,
    views: 221,
    likes: 9,
    tag: "Tips",
    tagColor: "bg-orange-100 text-orange-700",
    pinned: false,
    time: "Yesterday",
  },
  {
    title: "How do I set up UPI payout on Earnify?",
    author: "Sneha K.",
    avatar: "SK",
    color: "from-emerald-400 to-teal-500",
    replies: 8,
    views: 145,
    likes: 5,
    tag: "Payments",
    tagColor: "bg-green-100 text-green-700",
    pinned: false,
    time: "2 days ago",
  },
  {
    title: "What's the fastest category for new earners in 2025?",
    author: "Dev P.",
    avatar: "DP",
    color: "from-blue-400 to-indigo-500",
    replies: 19,
    views: 403,
    likes: 31,
    tag: "Discussion",
    tagColor: "bg-blue-100 text-blue-700",
    pinned: false,
    time: "3 days ago",
  },
]

export default function ForumPage() {
  return (
    <main className="min-h-screen bg-[var(--secondary)]">
      <Navbar />

      <section className="pt-28 pb-10 bg-gradient-to-b from-[var(--primary-light)] to-[var(--secondary)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary-dark)] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            💬 Forum
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] leading-tight mb-4">
            Community Forum
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            Ask questions, share strategies, and learn from 10,000+ fellow earners.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[var(--text-secondary)] font-medium">{threads.length} active threads</p>
            <button className="bg-[var(--primary)] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[var(--primary-dark)] transition-colors">
              + Start Thread
            </button>
          </div>

          {threads.map((t) => (
            <div key={t.title} className="bg-white rounded-2xl border border-[var(--border-color)] p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-black text-xs flex-shrink-0 shadow-sm`}>
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {t.pinned && <Pin className="w-3.5 h-3.5 text-[var(--primary)]" />}
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${t.tagColor}`}>{t.tag}</span>
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] leading-snug hover:text-[var(--primary)] transition-colors">{t.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">by {t.author} · {t.time}</p>
                </div>
                <div className="flex items-center gap-4 text-[var(--text-muted)] text-xs flex-shrink-0">
                  <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{t.replies}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{t.views}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{t.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
