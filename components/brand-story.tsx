"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Banknote, TrendingUp, ArrowRight, Zap } from "lucide-react";

const steps = [
  {
    id: "discover",
    title: "DISCOVER",
    description: "Explore curated student-friendly opportunities",
    copy: "Your first ₹1000 shouldn’t feel impossible.",
    icon: Search,
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: "learn",
    title: "LEARN",
    description: "Understand how real digital earning works",
    copy: "We skip the fluff and focus on what actually pays.",
    icon: BookOpen,
    color: "from-indigo-400 to-purple-400",
  },
  {
    id: "earn",
    title: "EARN",
    description: "Start making your first ₹500 → ₹5000",
    copy: "We turn free time into real money.",
    icon: Banknote,
    color: "from-emerald-400 to-teal-400",
  },
  {
    id: "scale",
    title: "SCALE",
    description: "Turn skills into consistent monthly income",
    copy: "Growth is standard when you have a system.",
    icon: TrendingUp,
    color: "from-orange-400 to-amber-400",
  },
];

export function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const handleCTA = () => {
    if (loading) return;
    if (isAuthenticated) {
      router.push("/explore");
    } else {
      router.push("/signup");
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white"
    >
      {/* Visual Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 
            }}
            animate={{ 
              y: ["0%", "-20%", "0%"],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Sticky Content */}
          <div className="lg:sticky lg:top-32 space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              >
                <Zap className="w-4 h-4 text-primary fill-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">The Earnify Method</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl font-extrabold font-[family-name:var(--font-syne)] text-slate-900 leading-tight"
              >
                Not Just Gigs. <br />
                <span className="text-primary">A System</span> to Build Your First Income.
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-600 max-w-md font-medium"
              >
                Earnify is where students stop scrolling and start earning. We transition you from curious to capable.
              </motion.p>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-8 space-y-10">
              {/* Vertical Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-100">
                <motion.div 
                  className="w-full bg-primary origin-top shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                  style={{ scaleY: scrollYProgress }}
                />
              </div>

              {steps.map((step, idx) => (
                <TimelineItem 
                  key={step.id} 
                  step={step} 
                  idx={idx} 
                  containerRef={containerRef} 
                />
              ))}
            </div>
          </div>

          {/* Right Side: Animated Cards */}
          <div className="space-y-12 lg:pt-12">
            {steps.map((step, idx) => (
              <StepCard key={step.id} step={step} idx={idx} />
            ))}
            
            {/* CTA at Bottom */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-12 flex justify-center lg:justify-start"
            >
              <Button 
                onClick={handleCTA}
                className="btn-shimmer group h-14 px-10 rounded-full font-bold text-lg border-none shadow-2xl shadow-primary/20"
              >
                Start Your First Earning
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function TimelineItem({ step, idx, containerRef }: { step: any, idx: number, containerRef: any }) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { margin: "-45% 0px -45% 0px" });

  return (
    <div ref={itemRef} className="relative">
      <div className={`absolute -left-10 top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
        isInView ? "bg-primary border-primary scale-125 shadow-[0_0_15px_rgba(var(--primary-rgb),0.6)]" : "bg-white border-slate-200"
      }`} />
      <div className={`transition-all duration-300 ${isInView ? "opacity-100 translate-x-1" : "opacity-40"}`}>
        <span className="text-xs font-black tracking-[0.2em] text-slate-800">{step.title}</span>
      </div>
    </div>
  );
}

function StepCard({ step, idx }: { step: any, idx: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const Icon = step.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`glass group p-8 rounded-3xl border border-white/50 shadow-xl overflow-hidden relative ${
        isInView ? "ring-2 ring-primary/20 shadow-primary/10" : "grayscale-[0.3] opacity-70"
      }`}
    >
      {/* Card Background Glow */}
      <div className={`absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-br ${step.color} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-3xl transition-opacity`} />
      
      <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 rotate-3 group-hover:rotate-6 transition-transform`}>
          <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
             <Icon className={`w-8 h-8 text-[var(--primary)] group-hover:scale-110 transition-transform`} />
          </div>
        </div>
        
        <div className="flex-1 space-y-1">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{step.title}</h3>
          <p className="text-slate-600 font-medium">{step.description}</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 relative group/tooltip">
        <p className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent italic">
          &quot;{step.copy}&quot;
        </p>
        
        {/* Floating Tooltip Effect Concept */}
        <div className="absolute -top-12 right-0 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-3 rounded-lg shadow-xl translate-y-2 group-hover/tooltip:translate-y-0 transition-transform duration-300">
           Verified Step {idx + 1}
        </div>
      </div>
    </motion.div>
  );
}
