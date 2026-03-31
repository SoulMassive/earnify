"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from '@/components/auth/AuthContext'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </AuthProvider>
    </ThemeProvider>
  );
}
