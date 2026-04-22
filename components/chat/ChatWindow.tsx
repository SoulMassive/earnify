"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  fileUrl?: string;
  workLink?: string;
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
  const [workLink, setWorkLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Auto-detect URL in message text
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const found = newMessage.match(urlRegex);
    if (found && found.length > 0) {
      setWorkLink(found[0]);
    }
  }, [newMessage]);

  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/conversations/${conversationId}/messages`);
        let data;
        try {
          data = await res.json();
        } catch (e) {
          console.error("Non-JSON response from messages GET API");
          return;
        }
        if (res.ok) {
          setMessages(data);
        } else {
          console.error("Failed to fetch messages:", data?.error);
        }
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
        if (!res.ok) return;
        
        let data;
        try {
          data = await res.json();
        } catch (e) {
          return;
        }

        if (data && Array.isArray(data) && data.length > messages.length) {
          setMessages(data);
          setTimeout(scrollToBottom, 50);
        }
      } catch (e) {}
    }, 5000);

    return () => clearInterval(interval);
  }, [conversationId]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 25 * 1024 * 1024) {
      toast.error("File exceeds 25MB. Please upload it to Google Drive and share the link.");
      return;
    }

    setFile(selectedFile);
    setUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setFileUrl(data.fileUrl);
        toast.success("File uploaded successfully");
      } else {
        toast.error(data.error || "Upload failed");
        setFile(null);
      }
    } catch (error) {
      toast.error("Network error during upload");
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSend = async () => {
    if ((!newMessage.trim() && !fileUrl) || !conversationId) return;

    setSending(true);
    try {
      const res = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messageText: newMessage.trim() || (fileUrl ? "📎 File attachment" : ""),
          workLink,
          fileUrl
        })
      });
      if (res.ok) {
        let msg;
        try {
          msg = await res.json();
        } catch (e) {
          toast.error("Invalid response from server");
          return;
        }
        setMessages([...messages, msg]);
        setNewMessage("");
        setWorkLink("");
        setFile(null);
        setFileUrl(null);
        setTimeout(scrollToBottom, 50);
      } else {
        let err;
        try {
          err = await res.json();
        } catch (e) {
          toast.error("Failed to send message (Server error)");
          return;
        }
        toast.error(err?.error || "Failed to send message");
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
          <MessageSquareIcon className="w-10 h-10 text-primary" />
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

  const isStudent = currentUser?.role !== 'admin';
  const canSend = (newMessage.trim() || fileUrl) && !uploading;

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
           <div className="text-center py-20 opacity-25 text-white">No messages yet. Say hi!</div>
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
                  
                  {msg.workLink && (
                    <a 
                      href={msg.workLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`mt-3 flex items-center gap-2 p-2 rounded-lg text-xs font-bold transition-all ${
                        isMe ? 'bg-[#0a0f10]/10 hover:bg-[#0a0f10]/20' : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[200px]">{msg.workLink}</span>
                      {msg.workLink.includes('drive.google.com') && (
                        <span className="ml-auto px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[8px]">
                          DRIVE LINK
                        </span>
                      )}
                    </a>
                  )}

                  {msg.fileUrl && (
                    <a 
                      href={msg.fileUrl} 
                      download
                      className={`mt-2 flex items-center gap-2 p-2 rounded-lg text-xs font-bold transition-all ${
                        isMe ? 'bg-[#0a0f10]/10 hover:bg-[#0a0f10]/20' : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>Download Attachment</span>
                    </a>
                  )}
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
        {/* Upload Preview */}
        {file && (
          <div 
            className="mb-4 p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3"
          >
            <div className="p-2 bg-primary/20 rounded-lg">
              <Paperclip className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-white truncate max-w-[200px]">{file.name}</p>
              <p className="text-[10px] text-white/40">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            )}
            <button 
              onClick={() => { setFile(null); setFileUrl(null); }}
              className="p-1 hover:text-red-400 text-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-2 pl-4">
           <input 
             type="file" 
             ref={fileInputRef}
             onChange={handleFileChange}
             className="hidden"
             accept=".pdf,.docx,.zip,.png,.jpg,.jpeg,.mp4"
           />
           <Button 
             variant="ghost" 
             size="icon" 
             onClick={() => fileInputRef.current?.click()}
             className="text-white/30 hover:text-white transition-colors"
           >
              <Paperclip className="w-5 h-5" />
           </Button>
           
           <input 
             type="text" 
             value={newMessage}
             onChange={(e) => setNewMessage(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && canSend && handleSend()}
             placeholder={isStudent ? "Paste work link + message..." : "Type a message..."}
             className="flex-1 bg-transparent border-none text-white text-sm outline-none placeholder:text-white/20"
           />
           
           <Button 
             disabled={sending || !canSend}
             onClick={handleSend}
             className="bg-primary text-[#0a0f10] hover:bg-primary-light h-10 w-10 p-0 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-20 disabled:grayscale"
           >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
           </Button>
        </div>
        
        {workLink && (
          <div className="mt-3 flex items-center gap-2 text-[9px] font-bold text-primary px-1">
             <CheckCircle2 className="w-3 h-3" />
             LINK DETECTED: {workLink.substring(0, 30)}...
          </div>
        )}
      </div>
    </div>
  );
}

function X(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" stroke="currentColor" 
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  )
}

function MessageSquareIcon(props: any) {
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

