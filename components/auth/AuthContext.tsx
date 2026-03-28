'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  name: string
  email: string
  avatar: string
  isLoggedIn: boolean
  balance: number
  totalEarned: number
  points: number
  globalRank: number
  completedTasks: number
}

interface AuthContextType {
  user: User | null
  login: (userData: any) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('earnify_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (userData: any) => {
    const newUser: User = {
      name: userData.name || 'Student Earner',
      email: userData.email,
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
      isLoggedIn: true,
      balance: userData.balance || 0,
      totalEarned: userData.totalEarned || 0,
      points: userData.points || 0,
      globalRank: userData.globalRank || 0,
      completedTasks: userData.completedTasks || 0
    }
    setUser(newUser)
    localStorage.setItem('earnify_user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('earnify_user')
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
