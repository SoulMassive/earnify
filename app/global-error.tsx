'use client'

import React from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#0a0f10] text-white flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-white/40 mb-8 max-w-md">
            We encountered a critical error. Please try refreshing the page or contact support if the issue persists.
          </p>
          <button
            onClick={() => reset()}
            className="bg-primary text-[#0a0f10] px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-all"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
