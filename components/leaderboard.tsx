"use client"

import { Trophy, Medal, Award, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface LeaderboardUser {
  _id: string;
  name: string;
  avatar: string;
  points: number;
  balance: number;
  completedTasks: number;
  rank: string;
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

import { toast } from "sonner"

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
      description: "Complete 3 tasks to unlock your official rank badge."
    });
  }

  const handleUserClick = (name: string, tier: string) => {
    toast.info(`${name}'s Stats`, {
      description: `Current Rank: ${tier} Tier. Top skills: Digital Sales, Marketing.`
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
          <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto">
            Climb the leaderboard and win exclusive badges and rewards
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto min-h-[400px]">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[var(--primary-light)] text-sm font-semibold text-[var(--text-primary)]">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Student</div>
            <div className="col-span-3 text-center">Tasks Done</div>
            <div className="col-span-3 text-right">Points</div>
          </div>

          {/* Rows */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
              <p className="text-sm text-[var(--text-secondary)]">Loading real-time rankings...</p>
            </div>
          ) : users.length > 0 ? (
            users.map((user, index) => {
              const rank = index + 1;
              return (
                <div
                  key={user._id}
                  onClick={() => handleUserClick(user.name, user.rank)}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-[var(--border-color)] last:border-b-0 cursor-pointer hover:bg-[var(--secondary)] transition-colors ${
                    rank <= 3 ? "bg-[var(--primary)]/5" : ""
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(rank)}`}>
                      {getRankIcon(rank)}
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="col-span-5 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://i.pravatar.cc/40?u=${user._id}`} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">{user.name}</p>
                      <p className="text-xs text-[var(--text-secondary)] font-bold">{user.rank} Tier</p>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="col-span-3 text-center">
                    <span className="font-[family-name:var(--font-jetbrains)] font-semibold text-[var(--text-primary)]">
                      {user.completedTasks}
                    </span>
                  </div>

                  {/* Earnings */}
                  <div className="col-span-3 text-right">
                    <span className="font-[family-name:var(--font-jetbrains)] font-bold text-[var(--primary)]">
                      {user.points.toLocaleString()} pts
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 text-[var(--text-secondary)]">
              No data available yet. Be the first to join!
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
