"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth/AuthContext"
import { ConversationList } from "@/components/chat/ConversationList"
import { ChatWindow } from "@/components/chat/ChatWindow"
import { Loader2 } from "lucide-react"

import { useSearchParams } from "next/navigation"

export default function MessagesPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const initialId = searchParams.get('id')
  
  const [conversations, setConversations] = useState([])
  const [activeId, setActiveId] = useState<string | null>(initialId)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch('/api/conversations')
        const data = await res.json()
        setConversations(data)
        
        // Use query param id if present, else fallback to first conversation
        if (data.length > 0) {
          if (initialId) {
            setActiveId(initialId)
          } else if (!activeId) {
            setActiveId(data[0]._id)
          }
        }
      } catch (error) {
        console.error("Failed to fetch conversations:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchConversations()
    
    // Refresh conversation previews every 10s
    const interval = setInterval(fetchConversations, 10000)
    return () => clearInterval(interval)
  }, [activeId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)] animate-fade-in">
       {/* List (Sidebar-like inside content) */}
       <div className="w-full lg:w-80 h-full">
         <ConversationList 
           conversations={conversations}
           activeId={activeId}
           onSelect={setActiveId}
           role={(user as any)?.role || 'student'}
         />
       </div>

       {/* Chat Window */}
       <div className="flex-1 h-full min-h-[400px]">
          <ChatWindow 
            conversationId={activeId}
            currentUser={user}
          />
       </div>
    </div>
  )
}
