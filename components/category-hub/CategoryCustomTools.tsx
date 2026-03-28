"use client"

import { BarChart3, Image, Video, PenTool, Code, Table, Activity, PlayCircle, PlusCircle, CheckCircle2, TrendingUp, AlertTriangle, Users, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CategoryCustomToolsProps {
  categorySlug: string;
}

export function CategoryCustomTools({ categorySlug }: CategoryCustomToolsProps) {
  const renderTool = () => {
    switch(categorySlug) {
      case 'marketing':
        return (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden relative group">
             {/* Glow Effect */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-3xl" />
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                   <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white font-[family-name:var(--font-syne)] tracking-tight">Analytics & Pixel</h2>
             </div>
             
             <div className="space-y-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden group/item">
                   <div className="absolute top-0 right-0 p-4">
                      <TrendingUp className="w-4 h-4 text-[var(--success)] opacity-40" />
                   </div>
                   <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-1">Total Hits</p>
                   <p className="text-2xl font-bold font-[family-name:var(--font-jetbrains)] text-white">0</p>
                   <div className="mt-4 flex gap-4">
                      <div>
                         <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Conversions</p>
                         <p className="text-lg font-bold text-white">0</p>
                      </div>
                      <div>
                         <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">CR %</p>
                         <p className="text-lg font-bold text-white">0.00%</p>
                      </div>
                   </div>
                </div>

                <Button className="w-full btn-cta-gradient h-10 rounded-xl font-bold shadow-lg shadow-[var(--primary)]/20 animate-fade-in">
                   Connect Facebook Pixel
                </Button>
             </div>
          </div>
        )

      case 'design':
        return (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl relative group h-full">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                   <Image className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white font-[family-name:var(--font-syne)] tracking-tight">Your Portfolio</h2>
             </div>
             
             <div className="grid grid-cols-2 gap-4 mb-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group/item hover:bg-white/10 transition-colors border-dashed text-[var(--text-muted)] hover:text-white cursor-pointer">
                     <PlusCircle className="w-6 h-6" />
                  </div>
                ))}
             </div>
             <p className="text-xs text-[var(--text-muted)] text-center font-bold uppercase tracking-widest">Upload your design samples</p>
          </div>
        )

      case 'video':
        return (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl relative group h-full">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                   <Video className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white font-[family-name:var(--font-syne)] tracking-tight">Showcase & Preview</h2>
             </div>
             
             <div className="aspect-video bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden mb-6 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                   <PlayCircle className="w-12 h-12 text-[var(--text-muted)]" />
                   <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest">No video uploaded yet</p>
                </div>
             </div>

             <Button className="w-full btn-primary-gradient h-10 rounded-xl font-bold">
               Upload Showreel
             </Button>
          </div>
        )

       case 'writing':
        return (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl relative group h-full">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                   <PenTool className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white font-[family-name:var(--font-syne)] tracking-tight">Portfolio & Drafts</h2>
             </div>
             
             <div className="space-y-4 mb-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group/item hover:bg-white/10 cursor-pointer">
                   <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
                      <p className="text-sm text-white font-bold tracking-tight line-clamp-1">Best SEO Hooks Guide</p>
                   </div>
                   <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl border-dashed flex items-center justify-center text-[var(--text-muted)] hover:text-white cursor-pointer hover:bg-white/10 transition-colors">
                   <PlusCircle className="w-5 h-5 mr-3" />
                   <span className="text-xs font-bold uppercase tracking-widest">Add a sample article</span>
                </div>
             </div>
          </div>
        )

      case 'development':
        return (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl relative group h-full">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                   <Code className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white font-[family-name:var(--font-syne)] tracking-tight">Task Submissions</h2>
             </div>

             <div className="p-6 bg-[#0d1117] rounded-xl border border-white/10 font-[family-name:var(--font-jetbrains)] text-xs mb-6 relative overflow-hidden group/code shadow-inner">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                   <p className="text-[var(--text-muted)] uppercase tracking-wider font-bold">test_submission.js</p>
                   <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                   </div>
                </div>
                <code>
                   <span className="text-purple-400">async function</span> <span className="text-blue-400">submitTask</span>(userId, taskData) &#123;<br />
                   &nbsp;&nbsp;<span className="text-gray-500">// Your code goes here...</span><br />
                   &#125;
                </code>
             </div>

             <div className="flex items-center gap-4">
                <div className="flex-1 p-3 bg-red-400/10 border border-red-400/20 rounded-xl text-center">
                   <p className="text-[10px] text-red-400 font-bold uppercase tracking-tighter">0 Failures</p>
                </div>
                <div className="flex-1 p-3 bg-green-400/10 border border-green-400/20 rounded-xl text-center">
                   <p className="text-[10px] text-green-400 font-bold uppercase tracking-tighter">0 Passes</p>
                </div>
             </div>
          </div>
        )

      case 'data':
        return (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl relative group h-full">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                   <Table className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white font-[family-name:var(--font-syne)] tracking-tight">Active Queue</h2>
             </div>
             
             <div className="space-y-4">
                <div className="p-5 flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl border-dashed min-h-[160px]">
                   <AlertTriangle className="w-8 h-8 text-[var(--text-muted)] mb-3 opacity-30" />
                   <p className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">Queue is empty</p>
                </div>
                
                <Button className="w-full btn-primary-gradient h-10 rounded-xl font-bold shadow-lg shadow-[var(--primary)]/20">
                   Start Hunting Tasks
                </Button>
             </div>
          </div>
        )

      case 'tutoring':
        return (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl relative group h-full">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                   <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white font-[family-name:var(--font-syne)] tracking-tight">Your Schedule</h2>
             </div>
             
             <div className="space-y-3 mb-6">
                {[
                  { time: '14:00', title: 'Calculus Review', student: 'Rahul S.' },
                  { time: '16:30', title: 'Intro to Python', student: 'Sneha M.' }
                ].map(session => (
                  <div key={session.time} className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                     <div>
                        <p className="text-xs font-bold text-white">{session.title}</p>
                        <p className="text-[10px] text-[var(--text-muted)]">{session.student}</p>
                     </div>
                     <span className="text-[10px] text-[var(--primary-light)] font-bold">{session.time}</span>
                  </div>
                ))}
             </div>

             <Button className="w-full btn-primary-gradient h-10 rounded-xl font-bold">
               Set Availability
             </Button>
          </div>
        )

      case 'social':
        return (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl relative group h-full">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                   <Share2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white font-[family-name:var(--font-syne)] tracking-tight">Campaign Tracker</h2>
             </div>
             
             <div className="space-y-4 mb-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                   <div className="flex justify-between items-center mb-2">
                      <p className="text-xs font-bold text-white">Ad Campaign #12</p>
                      <span className="px-2 py-0.5 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-[10px] font-bold">Live</span>
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                       <div className="text-center p-2 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-sm font-bold text-white">1.2k</p>
                          <p className="text-[10px] text-[var(--text-muted)] uppercase">Reach</p>
                       </div>
                       <div className="text-center p-2 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-sm font-bold text-white">45</p>
                          <p className="text-[10px] text-[var(--text-muted)] uppercase">Clicks</p>
                       </div>
                   </div>
                </div>
             </div>

             <Button className="w-full btn-cta-gradient h-10 rounded-xl font-bold">
               Submit Posting Proof
             </Button>
          </div>
        )
      
      default:
        return null;
    }
  }

  return renderTool()
}
