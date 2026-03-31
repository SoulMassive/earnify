import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 — Page Not Found | Earnify",
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-32">
        <p className="text-8xl font-black font-[family-name:var(--font-syne)] text-[var(--primary)] opacity-20 leading-none mb-4">404</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-[family-name:var(--font-syne)] text-[var(--text-primary)] mb-3">
          Page Not Found
        </h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-md mb-8">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link href="/" className="bg-[var(--primary)] text-white font-semibold px-6 py-3 rounded-full hover:bg-[var(--primary-dark)] transition-colors">
            Go Home
          </Link>
          <Link href="/help-center" className="border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold px-6 py-3 rounded-full hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
            Help Center
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
