import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Briefcase, ArrowLeft, CheckCircle2, Clock, DollarSign, Share2 } from "lucide-react"
import Link from "next/link"

export default async function GigDetailPage({ params }: { params: Promise<{ slug: string, gigId: string }> }) {
  const { slug, gigId } = await params
  
  // Fetch from our internal APIs
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  const [contentRes, gigsRes] = await Promise.all([
    fetch(`${baseUrl}/api/page-content`),
    fetch(`${baseUrl}/api/opportunities?category=${slug}`)
  ])
  
  const contentData = await contentRes.json()
  const gigsData = await gigsRes.json()
  
  const category = contentData.categories?.find((c: any) => c.slug === slug)
  const gig = gigsData?.find((g: any) => g._id === gigId || g.id === gigId)

  if (!gig || !category) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[var(--dark-bg)] text-white">
      <Navbar />
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <Link 
          href={`/categories/${slug}`} 
          className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to {category.title} Hub
        </Link>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Detail Area */}
          <div className="lg:col-span-8">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
               {/* Glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-[80px]" />
               
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                       <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <div>
                       <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-syne)] text-white mb-2">{gig.title}</h1>
                       <p className="text-[var(--primary-light)] font-bold uppercase tracking-wider">{gig.company}</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 py-8 border-y border-white/5">
                    <div>
                       <p className="text-[10px] text-[var(--text-muted)] uppercase font-extrabold tracking-widest mb-1">Payout</p>
                       <p className="text-xl font-bold text-white">₹{gig.payout}</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-[var(--text-muted)] uppercase font-extrabold tracking-widest mb-1">Status</p>
                       <p className="text-sm font-bold text-[var(--success)]">Accepting Apps</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-[var(--text-muted)] uppercase font-extrabold tracking-widest mb-1">Deadline</p>
                       <p className="text-sm font-bold text-white">{gig.deadline}</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-[var(--text-muted)] uppercase font-extrabold tracking-widest mb-1">Difficulty</p>
                       <p className="text-sm font-bold text-white">{gig.difficulty}</p>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <div>
                       <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                       <p className="text-[var(--text-muted)] leading-relaxed">
                          We are looking for a talented individual to help us with {category.title.split(' ')[0]} tasks. 
                          As a {gig.title}, you will be responsible for representing our brand and ensuring high-quality output for {gig.company}.
                          This is a great opportunity for students to gain real-world experience and earn while studying.
                       </p>
                    </div>

                    <div>
                       <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
                       <ul className="space-y-3">
                          {["Basic understanding of category tasks", "Good communication skills", "Ability to meet deadlines", "Access to stable internet"].map(req => (
                            <li key={req} className="flex items-start gap-3 text-[var(--text-muted)]">
                               <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0" />
                               {req}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl sticky top-32">
               <h3 className="text-xl font-bold text-white mb-6">Apply Now</h3>
               <div className="space-y-4">
                  <Button className="w-full btn-cta-gradient h-14 rounded-2xl font-bold text-lg shadow-xl shadow-[var(--primary)]/20">
                     Start Task
                  </Button>
                  <Button variant="outline" className="w-full h-12 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-white">
                     <Share2 className="w-4 h-4 mr-2" />
                     Share Opportunity
                  </Button>
               </div>
               
               <p className="text-[10px] text-[var(--text-muted)] text-center mt-6 uppercase font-bold tracking-widest">
                  Verified by Earnify Trust & Safety
               </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
