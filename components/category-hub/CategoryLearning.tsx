"use client"

import { GraduationCap, PlayCircle, FileText, ChevronRight } from "lucide-react"

interface Resource {
  title: string;
  type: string;
  duration: string;
}

interface CategoryLearningProps {
  resources: Resource[];
}

export function CategoryLearning({ resources }: CategoryLearningProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-2xl overflow-hidden group">
      <div className="flex items-center gap-3 mb-8">
         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
         </div>
         <h2 className="text-xl font-bold text-white font-[family-name:var(--font-syne)] tracking-tight">Mini Learning Deck</h2>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.title} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group/item">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                 {resource.type === 'Video' ? <PlayCircle className="w-5 h-5 text-[var(--primary-light)]" /> : <FileText className="w-5 h-5 text-[var(--primary-light)]" />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover/item:text-[var(--primary-light)] transition-colors">{resource.title}</h3>
                <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest">{resource.type} • {resource.duration}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover/item:translate-x-1 transition-transform" />
          </div>
        ))}
      </div>
    </div>
  )
}
