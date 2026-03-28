"use client"

import { Trophy, Medal, Award, Loader2, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface LeaderboardUser {
  _id: string;
  name: string;
  avatar: string;
  points: number;
  balance: number;
  completedTasks: number;
  totalEarned: number;
  globalRank: number;
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-500" />
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />
    case 3:
      return <Award className="w-5 h-5 text-amber-600" />
    default:
      return <span className="text-sm font-bold text-[var(--text-secondary)]">#{rank}</span>
  }
}

function getRankBadge(rank: number) {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
    case 2:
      return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800"
    case 3:
      return "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
    default:
      return "bg-[var(--secondary)] text-[var(--text-secondary)]"
  }
}

function getTier(points: number) {
  if (points >= 600) return "Diamond"
  if (points >= 300) return "Gold"
  if (points >= 100) return "Silver"
  return "Bronze"
}

export function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        if (Array.isArray(data)) {
          setUsers(data);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleJoin = () => {
    toast.success("Enrolling you into the Season 1 Rankings!", {
      description: "Complete tasks to climb the leaderboard."
    });
  }

  const handleUserClick = (name: string, points: number) => {
    const tier = getTier(points)
    toast.info(`${name}'s Stats`, {
      description: `Current Rank: ${tier} Tier. Total points: ${points}.`
    });
  }

  return (
    <section className="py-16 sm:py-20 bg-[var(--secondary)]" id="leaderboard">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-[var(--cta)]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-syne)] text-[var(--text-primary)]">
            This Week&apos;s Top Earners
          </h2>
          <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto font-medium">
            Climb the rankings and unlock exclusive premium opportunities.
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-[32px] shadow-2xl shadow-primary/5 overflow-hidden max-w-4xl mx-auto min-h-[400px] border border-white">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-8 py-5 bg-[var(--primary)]/10 text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest border-b border-[var(--border-color)]">
            <div className="col-span-1">Rank</div>
            <div className="col-span-6">Student Earner</div>
            <div className="col-span-2 text-center">Tasks</div>
            <div className="col-span-3 text-right">Points Pool</div>
          </div>

          {/* Rows */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white">
              <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)]" />
              <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">Waking up real-time rankings...</p>
            </div>
          ) : users.length > 0 ? (
            users.map((user, index) => {
              const rank = index + 1;
              const tier = getTier(user.points)
              return (
                <div
                  key={user._id}
                  onClick={() => handleUserClick(user.name, user.points)}
                  className={`grid grid-cols-12 gap-4 px-8 py-5 items-center border-b border-[var(--border-color)] last:border-b-0 cursor-pointer hover:bg-[var(--primary)]/5 transition-all group ${
                    rank <= 3 ? "bg-gradient-to-r from-[var(--primary)]/5 to-transparent" : "bg-white"
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-1">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-110 ${getRankBadge(rank)}`}>
                      {getRankIcon(rank)}
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12 rounded-xl ring-2 ring-white shadow-sm border border-[var(--border-color)]">
                        <AvatarImage src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user._id}`} />
                        <AvatarFallback className="bg-[var(--primary)]/10 text-[var(--primary)] font-bold">{user.name[0]}</AvatarFallback>
                      </Avatar>
                      {rank <= 3 && (
                         <div className="absolute -top-1 -right-1 w-4 h-4 rounded-md bg-yellow-400 flex items-center justify-center border-2 border-white">
                            <Star className="w-2 h-2 text-white fill-white" />
                         </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-primary)] text-base group-hover:text-[var(--primary)] transition-colors">{user.name}</p>
                      <div className="flex items-center gap-2">
                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                           tier === 'Diamond' ? 'bg-blue-100 text-blue-600' : 
                           tier === 'Gold' ? 'bg-yellow-100 text-yellow-600' :
                           tier === 'Silver' ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'
                         }`}>
                           {tier} Tier
                         </span>
                         <span className="text-[10px] text-[var(--text-secondary)] font-medium">Verified Earner</span>
                      </div>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="col-span-2 text-center">
                    <span className="font-[family-name:var(--font-jetbrains)] font-bold text-[var(--text-primary)] text-sm">
                      {user.completedTasks}
                    </span>
                    <p className="text-[8px] uppercase font-bold text-[var(--text-secondary)] tracking-widest leading-none mt-1">Gigs completed</p>
                  </div>

                  {/* Earnings */}
                  <div className="col-span-3 text-right">
                    <span className="font-[family-name:var(--font-jetbrains)] font-black text-[var(--primary)] text-lg">
                      {user.points.toLocaleString()}
                    </span>
                    <p className="text-[8px] uppercase font-bold text-[var(--text-secondary)] tracking-widest leading-none mt-1">Platform Points</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-24 bg-white">
              < Trophy className="w-12 h-12 text-[var(--border-color)] mx-auto mb-4 opacity-30" />
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-[var(--text-secondary)]">No rankings found for this season.</p>
              <p className="text-sm text-[var(--text-secondary)] mt-2">Become the first to climb the leaderboard!</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button 
            onClick={handleJoin}
            className="btn-primary-gradient text-white font-semibold rounded-full px-8 h-12 border-none"
          >
            Join the Leaderboard
          </Button>
        </div>
      </div>
    </section>
  )
}
