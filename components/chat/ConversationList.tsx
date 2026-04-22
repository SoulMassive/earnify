"use client"

import { MessageSquare, Clock } from "lucide-react"

interface Conversation {
  _id: string;
  opportunityId: {
    title: string;
    category: string;
  };
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: {
    student: number;
    admin: number;
  };
  status: string;
}

interface Props {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  role: 'student' | 'admin';
}

export function ConversationList({ conversations, activeId, onSelect, role }: Props) {
  return (
    <div className="flex flex-col h-full bg-white/5 rounded-3xl border border-white/5 overflow-hidden">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Conversations
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {conversations.length === 0 ? (
          <div className="p-10 text-center text-white/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6 opacity-20" />
            </div>
            <p className="text-sm font-medium">No active gig threads yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {conversations.map((conv) => {
              const unread = role === 'admin' 
                ? (conv.unreadCount?.admin ?? 0) 
                : (conv.unreadCount?.student ?? 0);
              const isActive = activeId === conv._id;
              
              return (
                <button
                  key={conv._id}
                  onClick={() => onSelect(conv._id)}
                  className={`w-full text-left p-5 transition-all outline-none ${
                    isActive 
                    ? "bg-primary/10 border-l-4 border-l-primary" 
                    : "hover:bg-white/5 border-l-4 border-l-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className={`font-bold text-sm truncate ${isActive ? 'text-primary' : 'text-white'}`}>
                      {conv.opportunityId?.title || "Untitled Opportunity"}
                    </p>
                    {unread > 0 && (
                      <span className="bg-primary text-[#0a0f10] text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {unread}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                      {conv.status}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-white/30">
                      <Clock className="w-3 h-3" />
                      {new Date(conv.lastMessageAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <p className="text-xs text-white/40 line-clamp-1 italic">
                    {conv.lastMessage || "No messages yet..."}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}
