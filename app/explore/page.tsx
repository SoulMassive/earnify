import type { Metadata } from "next"
import ExploreContent from "@/components/ExploreContent"

export const metadata: Metadata = {
  title: "Explore Gigs & Opportunities | Earnify",
  description: "Browse hundreds of affiliate gigs, freelance tasks, and micro-jobs tailored for college students.",
}

export default function ExplorePage() {
  return <ExploreContent />
}
