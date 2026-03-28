"use client"

import { Star, Heart, CheckCircle, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Opportunity {
  _id: string;
  title: string;
  description: string;
  reward: number;
  category: string;
  type: string;
  image: string;
  status: string;
}

export function OpportunityCards() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await fetch('/api/opportunities');
        const data = await res.json();
        if (Array.isArray(data)) {
          setOpportunities(data);
        }
      } catch (error) {
        console.error('Failed to fetch opportunities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const handleViewDetails = (title: string, reward: number) => {
    toast.success(`Opening ${title}`, {
      description: `Get ready to earn ₹${reward}! Detailed task brief loading...`
    });
  }

  const handleSave = (title: string) => {
    toast("Saved to your bookmarks", {
      description: `${title} is now in your saved list.`
    });
  }

  return (
    <section className="py-16 sm:py-20 bg-white" id="opportunities">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-syne)] text-[var(--text-primary)]">
              Top Opportunities This Week
            </h2>
            <p className="text-[var(--text-secondary)] mt-2">
              Handpicked gigs matching your skills and schedule
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => toast.info("Viewing all 850+ opportunities...")}
            className="rounded-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-light)]"
          >
            View All Opportunities
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
              <p className="text-sm text-[var(--text-secondary)]">Loading fresh opportunities...</p>
            </div>
          ) : opportunities.length > 0 ? (
            opportunities.map((opp) => (
              <div
                key={opp._id}
                className="group bg-white rounded-2xl border border-[var(--border-color)] overflow-hidden card-hover"
              >
                {/* Image Area */}
                <div className="relative h-[170px] overflow-hidden">
                  <Image
                    src={opp.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"}
                    alt={opp.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-white text-[var(--text-primary)] rounded-full shadow-sm">
                    {opp.category}
                  </span>
                  
                  {/* Save Button */}
                  <button 
                    onClick={() => handleSave(opp.title)}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Heart className="w-4 h-4 text-[var(--text-secondary)]" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Provider Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/32?u=${opp._id}`} />
                      <AvatarFallback>E</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">Verified Partner</span>
                    <CheckCircle className="w-4 h-4 text-[var(--primary)]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-[15px] font-bold text-[var(--text-primary)] line-clamp-2 mb-3 min-h-[44px]">
                    {opp.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-0.5 text-xs bg-[rgba(109,156,159,0.1)] text-[var(--primary)] border border-[rgba(109,156,159,0.25)] rounded-md">
                      #{opp.category.toLowerCase()}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-[rgba(109,156,159,0.1)] text-[var(--primary)] border border-[rgba(109,156,159,0.25)] rounded-md">
                      #{opp.type.toLowerCase()}
                    </span>
                  </div>

                  {/* Rating & Earnings */}
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[var(--warning)] text-[var(--warning)]" />
                      <span className="text-sm font-bold text-[var(--text-primary)]">4.9</span>
                    </div>
                    <span className="text-[14px] font-bold text-[var(--primary)] font-[family-name:var(--font-jetbrains)]">₹{opp.reward}</span>
                  </div>

                  {/* Hover CTA */}
                  <Button 
                    onClick={() => handleViewDetails(opp.title, opp.reward)}
                    className="w-full mt-4 btn-primary-gradient text-white rounded-xl h-9 border-none"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-[var(--text-secondary)]">
              No opportunities found. Check back later!
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
