"use client"

import { useEffect, useState, useRef } from "react"
import { Send, User as UserIcon, Loader2, Link2, Paperclip, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { User } from "@/components/auth/AuthContext"

interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  senderRole: 'student' | 'admin';
  messageText: string;
  attachments?: string[];
  createdAt: string;
}

interface Props {
  conversationId: string | null;
  currentUser: User | null;
}

export function ChatWindow({ conversationId, currentUser }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/conversations/${conversationId}/messages`);
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
        setTimeout(scrollToBottom, 100);
      }
    };

    fetchMessages();
    
    // Simple polling for real-time vibe
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/conversations/${conversationId}/messages`);
        const data = await res.json();
        if (data.length > messages.length) {
          setMessages(data);
          setTimeout(scrollToBottom, 50);
        }
      } catch (e) {}
    }, 5000);

    return () => clearInterval(interval);
  }, [conversationId]);

  const handleSend = async () => {
    if (!newMessage.trim() || !conversationId) return;
    setSending(true);
    try {
      const res = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageText: newMessage })
      });
      if (res.ok) {
        const msg = await res.json();
        setMessages([...messages, msg]);
        setNewMessage("");
        setTimeout(scrollToBottom, 50);
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Network error sending message");
    } finally {
      setSending(false);
    }
  };

  if (!conversationId) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-10 bg-white/5 rounded-3xl border border-white/5 space-y-6">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
          <MessageSquare className="w-10 h-10 text-primary" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Your Workspace Chat</h3>
          <p className="text-[var(--text-muted)] max-w-sm">
            Select a gig from the left to start collaborating with your assigned admin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white/5 rounded-3xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
             <UserIcon className="w-6 h-6 text-[#0a0f10]" />
           </div>
           <div>
             <h3 className="text-sm font-bold text-white uppercase tracking-widest">
               Gig Discussion Thread
             </h3>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] text-white/40 font-bold">LIVE CHAT ACTIVE</span>
             </div>
           </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : messages.length === 0 ? (
           <div className="text-center py-20 opacity-25">No messages yet. Say hi!</div>
        ) : (
          messages.map((msg, i) => {
            const isMe = msg.senderId === currentUser?.id;
            const isAdmin = msg.senderRole === 'admin';
            
            return (
              <div
                key={msg._id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
                    isMe 
                    ? "bg-primary text-[#0a0f10] rounded-tr-none" 
                    : "bg-white/10 text-white rounded-tl-none border border-white/5"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.messageText}</p>
                </div>
                <div className="flex items-center gap-2 mt-2 px-1">
                   <span className="text-[9px] font-black uppercase text-white/20">
                     {isAdmin ? "Admin Team" : "Me"}
                   </span>
                   <span className="text-[9px] font-bold text-white/20">•</span>
                   <span className="text-[9px] font-bold text-white/20">
                     {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/5 bg-[#0a0f10]/30 backdrop-blur-md">
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-2 pl-4">
           <Button variant="ghost" size="icon" className="text-white/30 hover:text-white transition-colors">
              <Link2 className="w-5 h-5" />
           </Button>
           <input 
             type="text" 
             value={newMessage}
             onChange={(e) => setNewMessage(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             placeholder="Type message or paste work link..."
             className="flex-1 bg-transparent border-none text-white text-sm outline-none placeholder:text-white/20"
           />
           <Button 
             disabled={sending || !newMessage.trim()}
             onClick={handleSend}
             className="bg-primary text-[#0a0f10] hover:bg-primary-light h-10 w-10 p-0 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
           >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
           </Button>
        </div>
      </div>
    </div>
  );
}

function MessageSquare(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" stroke="currentColor" 
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}
