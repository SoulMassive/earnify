"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { 
  X, ExternalLink, Zap, Clock, ShieldCheck, 
  CheckCircle, Loader2, ChevronLeft, ChevronRight,
  Flame, TrendingUp, Sparkles, Heart
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Opportunity {
  _id: string;
  title: string;
  description: string;
  reward: number;
  category: string;
  type: string;
  image: string;
  status: string;
  trending?: boolean;
  hot?: boolean;
}

const MOCK_DATA: Opportunity[] = [
  { _id: 'o1', title: 'React Dashboard UI Fixes', description: 'Design and implement a responsive dashboard using React and Tailwind CSS. Focus on performance and accessibility.', reward: 450, category: 'Development', type: 'Task', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', status: 'Open', hot: true },
  { _id: 'o2', title: 'Social Media Manager', description: 'Create and schedule posts for a fashion brand. Engage with community and grow followers.', reward: 1200, category: 'Marketing', type: 'Job', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', status: 'Open', trending: true },
  { _id: 'o3', title: 'Blog Writer (Tech)', description: 'Write 5 articles about latest tech trends, AI, and software engineering best practices.', reward: 800, category: 'Writing', type: 'Job', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80', status: 'Open' },
  { _id: 'o4', title: 'Graphic Design Set (Canva)', description: 'Create 10 Instagram post templates and 5 story designs using Canva.', reward: 350, category: 'Design', type: 'Task', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80', status: 'Open', hot: true },
  { _id: 'o5', title: 'Python Backend Script', description: 'Develop a small automation script to sync data between two APIs.', reward: 600, category: 'Development', type: 'Task', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80', status: 'Open', trending: true },
  { _id: 'o6', title: 'Brand Identity Design', description: 'Create a full brand identity including logo, typography, and color palette.', reward: 2500, category: 'Design', type: 'Job', image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde7?w=800&q=80', status: 'Open' },
];

export function OpportunityCards() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardsToShow, setCardsToShow] = useState(3);

  // ─── Fetch Data ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/opportunities');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Sort to put best/trending first as per pro tip
          const sorted = data.sort((a: any, b: any) => (b.reward || 0) - (a.reward || 0));
          // Label them so they show badges in the UI
          const labeled = sorted.map((opp: any, idx: number) => ({
            ...opp,
            hot: idx === 0,
            trending: idx === 1 || idx === 2
          }));
          setOpportunities(labeled);
        } else {
          setOpportunities(MOCK_DATA);
        }
      } catch (error) {
        console.error('Failed to fetch opportunities:', error);
        setOpportunities(MOCK_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ─── Responsive Handling ────────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsToShow(1);
      else if (window.innerWidth < 1024) setCardsToShow(2);
      else setCardsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─── Carousel Logic ─────────────────────────────────────────────────────────
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % opportunities.length);
  }, [opportunities.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + opportunities.length) % opportunities.length);
  }, [opportunities.length]);

  useEffect(() => {
    if (isPaused || loading || opportunities.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, loading, opportunities.length, nextSlide]);

  const handleApply = async (opp: Opportunity) => {
    try {
      const authRes = await fetch('/api/auth/me');
      const authData = await authRes.json();
      if (!authData.user) {
        toast.error("Login required", { description: "Sign in to track your earnings." });
        router.push('/login');
        return;
      }
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opportunityId: opp._id })
      });
      if (res.ok) {
        toast.success("Applied successfully!");
        setSelectedOpp(null);
        setTimeout(() => router.push('/dashboard/tasks'), 1000);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to apply");
      }
    } catch (err) {
      toast.error("Error submitting application");
    }
  };

  // ─── Render Helpers ─────────────────────────────────────────────────────────
  const getVisibleIndices = () => {
    if (opportunities.length === 0) return [];
    const indices = [];
    for (let i = 0; i < cardsToShow; i++) {
      indices.push((activeIndex + i) % opportunities.length);
    }
    return indices;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#f8fafb] overflow-hidden" id="opportunities">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-xs uppercase tracking-widest px-3 py-1 bg-[rgba(109,156,159,0.1)] rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Gigs
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-syne)] text-[var(--text-primary)]">
              Top Opportunities <span className="text-[var(--primary)] font-extrabold italic">This Week</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl">
              Handpicked high-payout gigs vetted by our team for students like you.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex gap-2">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center bg-white shadow-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all group active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center bg-white shadow-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all group active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
             </div>
             <Button 
               variant="outline" 
               onClick={() => router.push('/signup')}
               className="hidden sm:flex rounded-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-light)] px-6 h-12 font-bold"
             >
               View All
             </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative min-h-[500px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white/50 backdrop-blur-sm rounded-[40px] border border-dashed border-[var(--border-color)]">
              <div className="relative">
                <Loader2 className="w-12 h-12 animate-spin text-[var(--primary)]" />
                <div className="absolute inset-0 blur-xl bg-[var(--primary)]/20 animate-pulse" />
              </div>
              <p className="text-[var(--text-secondary)] font-medium animate-pulse">Scanning the market for best gigs...</p>
            </div>
          ) : opportunities.length > 0 ? (
            <div className="carousel-track-wrapper">
              <div className="flex gap-6 lg:gap-8 transition-all duration-500 ease-out h-[520px] items-center">
                {getVisibleIndices().map((idx, i) => {
                  const opp = opportunities[idx];
                  // If 3 cards show, center one is index 1
                  const isCenter = cardsToShow === 3 ? i === 1 : cardsToShow === 1 || i === 0;
                  
                  return (
                    <motion.div
                      key={`${opp._id}-${i}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9, x: 50 }}
                      animate={{ 
                        opacity: isCenter ? 1 : 0.6, 
                        scale: isCenter ? 1.05 : 0.95,
                        x: 0
                      }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                      className={`relative flex-1 min-w-[280px] h-fit group`}
                      style={{ willChange: "transform" }}
                    >
                      <div 
                        className={`bg-white rounded-[32px] border transition-all duration-500 overflow-hidden cursor-pointer
                          ${isCenter 
                            ? "shadow-[0_20px_50px_rgba(109,156,159,0.15)] border-[var(--primary)]/30" 
                            : "shadow-sm border-[var(--border-color)] hover:shadow-md"
                          }`}
                        onClick={() => setSelectedOpp(opp)}
                      >
                        {/* Image & Badges */}
                        <div className="relative h-[220px] overflow-hidden">
                          <Image
                            src={opp.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"}
                            alt={opp.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                          
                          {/* Top row badges */}
                          <div className="absolute top-4 left-4 flex gap-2">
                             <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/95 text-[var(--text-primary)] rounded-full shadow-lg backdrop-blur-md">
                                {opp.category}
                             </span>
                             {opp.hot && (
                               <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-red-500 text-white rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                                  <Flame className="w-3 h-3" /> Hot
                               </span>
                             )}
                             {opp.trending && (
                               <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-white rounded-full shadow-lg flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" /> Trending
                               </span>
                             )}
                          </div>

                          <button 
                            onClick={(e) => { e.stopPropagation(); toast.success("Saved!"); }}
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-[var(--primary)] hover:border-transparent transition-all group/heart"
                          >
                            <Heart className="w-4 h-4 transition-transform group-hover/heart:scale-125" />
                          </button>

                          {/* Reward overlay */}
                          <div className="absolute bottom-4 left-4">
                             <p className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-0.5">Reward</p>
                             <p className="text-2xl font-bold text-white font-[family-name:var(--font-jetbrains)]">₹{opp.reward}</p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <Avatar className="h-9 w-9 border-2 border-[var(--primary)]/20">
                                <AvatarImage src={`https://i.pravatar.cc/32?u=${opp._id}`} />
                                <AvatarFallback>E</AvatarFallback>
                              </Avatar>
                              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                                <CheckCircle className="w-2.5 h-2.5 text-white" />
                              </div>
                            </div>
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Verified Partner</p>
                               <p className="text-xs font-bold text-[var(--text-primary)]">Trusted Client • 98% Success</p>
                            </div>
                          </div>

                          <h3 className="text-lg font-bold text-[var(--text-primary)] line-clamp-2 leading-tight min-h-[3.5rem] group-hover:text-[var(--primary)] transition-colors">
                            {opp.title}
                          </h3>

                          <div className="flex flex-wrap gap-2 pb-2">
                             {["Urgent", opp.type].map(tag => (
                               <span key={tag} className="px-2 py-1 text-[10px] font-bold bg-[#f1f5f9] text-[#475569] rounded-lg">
                                  #{tag.toLowerCase()}
                               </span>
                             ))}
                          </div>

                          <Button 
                            className="w-full h-12 rounded-2xl btn-primary-gradient text-white font-black text-sm shadow-xl shadow-[var(--primary)]/10 hover:shadow-[var(--primary)]/30 transition-all border-none group-hover:-translate-y-1"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-[40px] border border-[var(--border-color)]">
               <Zap className="w-12 h-12 text-[var(--border-color)]" />
               <p className="text-[var(--text-secondary)] font-bold">No gigs found right now. Check back soon!</p>
             </div>
          )}

          {/* Dots */}
          {!loading && opportunities.length > 0 && (
            <div className="flex justify-center gap-2 mt-12">
               {opportunities.slice(0, opportunities.length - (cardsToShow - 1)).map((_, idx) => (
                 <button
                   key={idx}
                   onClick={() => setActiveIndex(idx)}
                   className={`h-2 rounded-full transition-all duration-300 ${
                     activeIndex === idx 
                       ? "w-8 bg-[var(--primary)]" 
                       : "w-2 bg-[var(--border-color)] hover:bg-[var(--primary)]/40"
                   }`}
                   aria-label={`Go to slide ${idx + 1}`}
                 />
               ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Modal (details ignored as requested to keep UI logic) ──────────────── */}
      <AnimatePresence>
        {selectedOpp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOpp(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col h-[90vh]"
            >
              {/* Image Header */}
              <div className="relative h-64 shrink-0">
                <Image 
                  src={selectedOpp.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"}
                  alt={selectedOpp.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedOpp(null)}
                  className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10 z-10"
                >
                  <X className="w-6 h-6" />
                </Button>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-4 py-1.5 bg-[var(--primary)] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                      {selectedOpp.category}
                    </span>
                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10">
                      {selectedOpp.type}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-syne)] leading-tight">
                    {selectedOpp.title}
                  </h2>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 sm:p-12">
                 <div className="space-y-12">
                    {/* Rewards & Verification */}
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Guaranteed Reward</p>
                          <p className="text-3xl font-bold text-[var(--primary)] font-[family-name:var(--font-jetbrains)]">₹{selectedOpp.reward}</p>
                       </div>
                       <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex flex-col justify-center">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Trust Score</p>
                          <div className="flex items-center gap-2 text-emerald-500 font-bold text-xl">
                             <ShieldCheck className="w-6 h-6" /> Verified
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                          Project Briefing
                       </h4>
                       <p className="text-slate-600 leading-relaxed text-lg">
                          {selectedOpp.description}
                       </p>
                    </div>

                    <div className="space-y-8 p-10 bg-slate-900 rounded-[40px] text-white">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Application Pipeline</h4>
                        <div className="space-y-8 relative">
                           <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
                           {[
                             { title: "One-Click Apply", desc: "Our AI matches your profile instantly." },
                             { title: "Shortlisting", desc: "Clients review applications within 24 hours." },
                             { title: "Task Execution", desc: "Complete the task as per guidelines provided." },
                             { title: "Instant Payout", desc: "Money credited to Earnify wallet on approval." }
                           ].map((step, i) => (
                             <div key={i} className="flex gap-8 relative z-10">
                                <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-xs font-black shadow-lg shadow-[var(--primary)]/20">
                                   {i + 1}
                                </div>
                                <div>
                                   <p className="font-bold text-base mb-1">{step.title}</p>
                                   <p className="text-slate-400 text-sm">{step.desc}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                    </div>
                 </div>
              </div>

              {/* Action Bar */}
              <div className="p-8 bg-white border-t border-slate-100">
                 <div className="flex gap-4 max-w-md mx-auto">
                    <Button 
                      onClick={() => handleApply(selectedOpp!)}
                      className="flex-1 h-14 rounded-2xl btn-primary-gradient text-white font-black text-lg shadow-2xl shadow-[var(--primary)]/20 border-none"
                    >
                      Apply Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .carousel-track-wrapper {
          overflow: visible;
          padding: 20px 0;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
      `}</style>
    </section>
  )
}

function ArrowRight(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" stroke="currentColor" 
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  )
}
