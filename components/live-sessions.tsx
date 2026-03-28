"use client"

import { Play, Calendar, Users, Clock, ChevronRight, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface Session {
  _id: string;
  title: string;
  instructor: string;
  date: string;
  category: string;
  imageUrl: string;
  spotsRemaining: number;
}

import { toast } from "sonner"

export function LiveSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-content');
        const data = await res.json();
        if (data.liveSessions) {
          setSessions(data.liveSessions);
        }
      } catch (error) {
        console.error('Failed to fetch live sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleJoinSession = (title: string) => {
    toast.success(`Joining ${title}...`, {
      description: "Redirecting to the live stream. Get your notepad ready!"
    });
  }

  const handleBookSeat = (title: string) => {
    toast.success(`Spot Reserved for ${title}!`, {
      description: "We've sent a calendar invite to your student email."
    });
  }

  const featured = sessions[0];
  const upcoming = sessions.slice(1);

  return (
    <section className="py-16 sm:py-20 bg-white" id="sessions">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 gap-3 min-h-[400px]">
             <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)]" />
             <p className="text-lg font-medium text-[var(--text-secondary)]">Fetching upcoming masterclasses...</p>
           </div>
        ) : sessions.length > 0 ? (
          <>
            {/* Live Now Banner */}
            {featured && (
              <div className="bg-gradient-to-r from-[var(--dark-bg)] to-[var(--primary-dark)] rounded-2xl p-6 sm:p-8 mb-12 relative overflow-hidden group">
                {/* Decorative Glass Circle */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
                
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
                  {/* Left Content */}
                  <div className="flex items-start gap-4">
                    {/* Live Badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--error)] rounded-full shadow-lg shadow-red-500/20">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold tracking-widest text-white uppercase">TOP PICK</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-syne)] text-white mb-2 leading-tight">
                        {featured.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-4">
                        <Avatar className="h-10 w-10 border border-white/20">
                          <AvatarImage src={`https://i.pravatar.cc/40?u=${featured._id}`} />
                          <AvatarFallback>{featured.instructor[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-semibold text-base">{featured.instructor}</p>
                          <p className="text-sm text-[var(--text-muted)] font-medium">Expert Mentor</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex flex-col items-end">
                      <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest mb-1">Status</p>
                      <p className="text-white font-bold text-sm">{featured.spotsRemaining} spots left</p>
                    </div>

                    <Button 
                      onClick={() => handleJoinSession(featured.title)}
                      className="btn-cta-gradient text-white font-bold rounded-full px-10 h-12 shadow-2xl hover:scale-105 transition-transform border-none"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Join Session
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-syne)] text-[var(--text-primary)]">
                    Upcoming Masterclasses
                  </h2>
                  <p className="text-[var(--text-secondary)] mt-1">Learn from the community's top 1%</p>
                </div>
                <Button variant="ghost" className="text-[var(--primary)] font-bold hover:bg-[var(--primary-light)] rounded-full transition-all">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {/* Events Scroll */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {upcoming.map((event) => {
                  const date = new Date(event.date);
                  const day = date.getDate();
                  const month = date.toLocaleString('default', { month: 'short' });
                  
                  return (
                    <div
                      key={event._id}
                      className="bg-white rounded-2xl border border-[var(--border-color)] p-6 card-hover group"
                    >
                      {/* Date Chip */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20">
                          <span className="text-[10px] font-bold uppercase tracking-wider">{month}</span>
                          <span className="text-xl font-bold leading-none">{day}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--secondary)] text-[var(--text-secondary)] font-bold text-[10px] tracking-wider uppercase">
                          <Clock className="w-3.5 h-3.5" />
                          <span>4:30 PM</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="font-bold text-[var(--text-primary)] mb-4 line-clamp-2 min-h-[48px] text-[15px] group-hover:text-[var(--primary)] transition-colors">
                        {event.title}
                      </h4>

                      {/* Host */}
                      <div className="flex items-center gap-3 mb-5">
                        <Avatar className="h-8 w-8 ring-2 ring-[var(--secondary)]">
                          <AvatarImage src={`https://i.pravatar.cc/32?u=${event._id}`} />
                          <AvatarFallback>{event.instructor[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-[13px] font-bold text-[var(--text-primary)]">{event.instructor}</p>
                          <p className="text-[11px] font-medium text-[var(--text-secondary)]">{event.category} Expert</p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
                        <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                          <Users className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-bold">Registering</span>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleBookSeat(event.title)}
                          className="h-8 text-[11px] font-bold btn-primary-gradient text-white rounded-full px-5 border-none"
                        >
                          Book Seat
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-[var(--text-secondary)]">No upcoming sessions. Check back tomorrow!</div>
        )}
      </div>
    </section>
  )
}
