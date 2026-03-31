import type { Metadata } from 'next'
import { DM_Sans, Syne, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  display: 'swap',
})

const syne = Syne({ 
  subsets: ["latin"],
  variable: '--font-syne',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Earnify - Turn Your Free Hours Into Real Income',
  description: 'Earnify connects college students with affiliate deals, freelance gigs, and micro-tasks — built around your schedule. Join 12,000+ students earning while studying.',
  keywords: 'student earning, freelance, affiliate marketing, micro tasks, side income, college students',
}

import { Toaster } from 'sonner'
import { AuthProvider } from '@/components/auth/AuthContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
