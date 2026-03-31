"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth/AuthContext"
import { ConversationList } from "@/components/chat/ConversationList"
import { ChatWindow } from "@/components/chat/ChatWindow"
import { Loader2, ShieldCheck } from "lucide-react"

export default function AdminMessagesPage() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch('/api/conversations')
        const data = await res.json()
        setConversations(data)
        if (data.length > 0 && !activeId) {
          setActiveId(data[0]._id)
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
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
       <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
             <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
             <h2 className="text-3xl font-bold font-[family-name:var(--font-syne)] text-white">Student Communications</h2>
             <p className="text-[var(--text-muted)] text-sm">Manage gig discussions and view work submissions from students.</p>
          </div>
       </div>

       <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-250px)]">
          {/* List */}
          <div className="w-full lg:w-96 h-full">
            <ConversationList 
              conversations={conversations}
              activeId={activeId}
              onSelect={setActiveId}
              role="admin"
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
    </div>
  )
}
