import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, Clock, Users, MapPin } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Events | Earnify",
  description: "Join live workshops, webinars, and community meetups to level up your earning game.",
}

const events = [
  {
    date: "Apr 05, 2025",
    day: "05",
    month: "APR",
    title: "Affiliate Marketing Masterclass for Students",
    host: "Earnify Team",
    time: "6:00 PM IST",
    type: "Webinar",
    seats: "241 attending",
    tag: "Free",
    tagColor: "bg-green-100 text-green-700",
    color: "from-teal-400 to-cyan-500",
  },
  {
    date: "Apr 12, 2025",
    day: "12",
    month: "APR",
    title: "How I Earned ₹22K in 60 Days — Live AMA",
    host: "Rohit Verma (Top Earner)",
    time: "7:30 PM IST",
    type: "AMA",
    seats: "178 attending",
    tag: "Free",
    tagColor: "bg-green-100 text-green-700",
    color: "from-orange-400 to-amber-500",
  },
  {
    date: "Apr 20, 2025",
    day: "20",
    month: "APR",
    title: "Content Writing Workshop: Write to Rank",
    host: "Sneha Kapoor",
    time: "5:00 PM IST",
    type: "Workshop",
    seats: "89 attending",
    tag: "Premium",
    tagColor: "bg-purple-100 text-purple-700",
    color: "from-purple-400 to-pink-500",
  },
  {
    date: "May 03, 2025",
    day: "03",
    month: "MAY",
    title: "Earnify City Meetup — Delhi NCR",
    host: "Community Team",
    time: "11:00 AM IST",
    type: "In-Person",
    seats: "64 attending",
    tag: "Free",
    tagColor: "bg-green-100 text-green-700",
    color: "from-blue-400 to-indigo-500",
  },
]

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[var(--secondary)]">
      <Navbar />

      <section className="pt-28 pb-10 bg-gradient-to-b from-[var(--primary-light)] to-[var(--secondary)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary-dark)] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            📅 Events
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] leading-tight mb-4">
            Upcoming Events
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            Workshops, webinars, and meetups to help you earn smarter.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {events.map((ev) => (
            <div key={ev.title} className="bg-white rounded-2xl border border-[var(--border-color)] p-5 sm:p-6 flex items-start gap-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
              {/* Date Block */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ev.color} flex flex-col items-center justify-center text-white flex-shrink-0 shadow-sm`}>
                <span className="text-xl font-black leading-none">{ev.day}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest mt-0.5">{ev.month}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${ev.tagColor}`}>{ev.tag}</span>
                  <span className="text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--secondary)] px-2 py-0.5 rounded-full">{ev.type}</span>
                </div>
                <h3 className="font-bold text-[var(--text-primary)] leading-snug mb-2">{ev.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{ev.time}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{ev.seats}</span>
                  <span className="flex items-center gap-1">
                    {ev.type === "In-Person" ? <MapPin className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
                    Hosted by {ev.host}
                  </span>
                </div>
              </div>

              {/* RSVP */}
              <button className="flex-shrink-0 px-5 py-2.5 rounded-full bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors hidden sm:block">
                RSVP
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
