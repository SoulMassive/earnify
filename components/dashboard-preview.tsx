"use client"

import { 
  Home, 
  Briefcase, 
  CheckSquare, 
  MessageSquare,
  Users, 
  Wallet, 
  Settings,
  TrendingUp,
  ArrowUpRight,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Briefcase, label: "Opportunities", active: false },
  { icon: CheckSquare, label: "My Tasks", active: false },
  { icon: MessageSquare, label: "Messages", active: false },
  { icon: Users, label: "Referrals", active: false },
  { icon: Wallet, label: "Wallet", active: false },
  { icon: Settings, label: "Settings", active: false },
]

const stats = [
  { label: "Total Earned", value: "Rs.12,450", icon: Wallet, trend: "+23%", color: "text-[var(--primary)]" },
  { label: "Active Tasks", value: "7", icon: CheckSquare, trend: "+2", color: "text-[var(--cta)]" },
  { label: "Referrals", value: "23", icon: Users, trend: "+5", color: "text-[#8b5cf6]" },
  { label: "Pending Payout", value: "Rs.2,300", icon: TrendingUp, trend: "Processing", color: "text-[var(--success)]" },
]

const recentActivity = [
  { task: "Content Writing - Blog Post", platform: "Medium Partner", status: "Completed", amount: "+Rs.800" },
  { task: "Amazon Affiliate Link", platform: "WhatsApp Share", status: "Pending", amount: "+Rs.450" },
  { task: "Social Media Post", platform: "Instagram", status: "In Review", amount: "+Rs.200" },
]

export function DashboardPreview() {
  return (
    <section className="py-16 sm:py-20 bg-[var(--dark-bg)] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-syne)] text-white">
            Your Personal Earnings Dashboard
          </h2>
          <p className="text-[var(--text-muted)] mt-2 max-w-2xl mx-auto">
            Track every rupee earned, manage tasks, and withdraw earnings anytime
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mx-auto max-w-5xl">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/20 via-transparent to-[var(--primary)]/20 blur-3xl" />
          
          {/* Dashboard Container */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-[var(--border-color)]">
            <div className="flex">
              {/* Sidebar */}
              <div className="hidden md:flex flex-col w-56 bg-[var(--secondary)] border-r border-[var(--border-color)] p-4">
                <div className="flex items-center gap-2 mb-8 px-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">E</span>
                  </div>
                  <span className="font-bold text-[var(--text-primary)]">Earnify</span>
                </div>
                
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.label}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          item.active
                            ? "bg-[var(--primary)] text-white"
                            : "text-[var(--text-secondary)] hover:bg-[var(--primary-light)]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <div
                        key={stat.label}
                        className="bg-[var(--secondary)] rounded-xl p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`w-4 h-4 ${stat.color}`} />
                          <span className="text-xs text-[var(--text-secondary)]">{stat.label}</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <span className="text-xl font-bold font-[family-name:var(--font-jetbrains)] text-[var(--text-primary)]">
                            {stat.value}
                          </span>
                          <span className="text-xs text-[var(--success)] flex items-center gap-0.5">
                            {stat.trend}
                            {stat.trend.startsWith("+") && <ArrowUpRight className="w-3 h-3" />}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Chart Placeholder */}
                <div className="bg-[var(--secondary)] rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[var(--text-primary)]">Earnings This Month</h3>
                    <div className="flex gap-2">
                      {["7d", "30d", "3m", "1y"].map((period) => (
                        <button
                          key={period}
                          className={`px-2 py-1 text-xs rounded ${
                            period === "30d"
                              ? "bg-[var(--primary)] text-white"
                              : "text-[var(--text-secondary)] hover:bg-[var(--primary-light)]"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Simple Chart Visual */}
                  <div className="h-32 flex items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[var(--primary)] to-[var(--primary-light)] rounded-t opacity-80"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-[var(--secondary)] rounded-xl p-4">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2 border-b border-[var(--border-color)] last:border-b-0"
                      >
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">{activity.task}</p>
                          <p className="text-xs text-[var(--text-secondary)]">{activity.platform}</p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                              activity.status === "Completed"
                                ? "bg-[var(--success)]/10 text-[var(--success)]"
                                : activity.status === "Pending"
                                ? "bg-[var(--warning)]/10 text-[var(--warning)]"
                                : "bg-[var(--primary)]/10 text-[var(--primary)]"
                            }`}
                          >
                            {activity.status}
                          </span>
                          <p className="text-sm font-bold text-[var(--success)] mt-1">{activity.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <Button className="btn-primary-gradient text-white rounded-xl">
                    Browse New Tasks
                  </Button>
                  <Button variant="outline" className="rounded-xl border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-light)]">
                    Refer a Friend
                  </Button>
                  <Button variant="outline" className="rounded-xl border-[var(--success)] text-[var(--success)] hover:bg-[var(--success)]/10">
                    Withdraw Earnings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button className="btn-cta-gradient text-white font-semibold rounded-full px-8 h-12 text-base">
            <ExternalLink className="w-4 h-4 mr-2" />
            Create Your Dashboard
          </Button>
        </div>
      </div>
    </section>
  )
}
