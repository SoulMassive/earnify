"use client"

import { Star, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

interface TestimonialData {
  _id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  college: string;
  rating: number;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-content');
        const data = await res.json();
        if (data.testimonials) {
          setTestimonials(data.testimonials);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-white" id="community">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-syne)] text-[var(--text-primary)]">
            What Students Are Saying
          </h2>
          <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto">
            Join thousands of students who are already earning with Earnify
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
          {loading ? (
             <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3">
               <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
               <p className="text-sm text-[var(--text-secondary)]">Fetching student reviews...</p>
             </div>
          ) : testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="bg-[var(--secondary)] rounded-2xl p-6 border-l-4 border-l-[var(--primary)] card-hover"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://i.pravatar.cc/48?u=${testimonial._id}`} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--text-primary)]">{testimonial.name}</h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {testimonial.college}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "fill-[var(--warning)] text-[var(--warning)]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Role Badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[11px] font-bold uppercase tracking-wider">
                  {testimonial.role} Verified
                </span>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-[var(--text-secondary)] py-10">No testimonials found.</p>
          )}
        </div>
      </div>
    </section>
  )
}
