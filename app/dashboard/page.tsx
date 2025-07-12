"use client"

import { motion } from "framer-motion"
import { StatsCard } from "@/components/stats-card"
import { ActivityFeed } from "@/components/activity-feed"
import { QuickActions } from "@/components/quick-actions"
import { Users, UserCheck, BookOpen, TrendingUp, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const statsData = [
  {
    title: "Total Enrolled Users",
    value: 2847,
    change: { value: 12, type: "increase" as const },
    icon: Users,
    description: "from last month",
    trend: { value: 12, direction: "up" as const },
  },
  {
    title: "Pending Registrations",
    value: 23,
    change: { value: 8, type: "increase" as const },
    icon: UserCheck,
    description: "awaiting approval",
    trend: { value: 8, direction: "up" as const },
  },
  {
    title: "Published Content Modules",
    value: 156,
    change: { value: 5, type: "increase" as const },
    icon: BookOpen,
    description: "active modules",
    trend: { value: 5, direction: "up" as const },
  },
  {
    title: "Average User Progress",
    value: "78%", // This is a string, which caused the previous error
    change: { value: 3, type: "increase" as const },
    icon: TrendingUp,
    description: "completion rate",
    trend: { value: 3, direction: "up" as const },
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your institution.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            System Status: Online
          </Badge>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={stat.title}
            icon={stat.icon}
            value={stat.value}
            title={stat.title}
            change={stat.change}
            description={stat.description}
            trend={stat.trend}
            index={index}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed - Takes 2 columns on large screens */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <ActivityFeed />
        </motion.div>

        {/* Quick Actions - Takes 1 column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <QuickActions />
        </motion.div>
      </div>

      {/* Additional Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">System Health</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Server Uptime</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                99.9%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Response Time</span>
              <Badge variant="secondary">120ms</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Sessions</span>
              <Badge variant="secondary">1,247</Badge>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Content Statistics</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Most Popular Module</span>
              <span className="text-sm font-medium text-gray-900">Tax Compliance</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completion Rate</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                85%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Avg. Study Time</span>
              <span className="text-sm font-medium text-gray-900">2.5 hours</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Recent Updates</h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Platform Update:</span> New analytics features deployed
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Security:</span> SSL certificates renewed
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Content:</span> 5 new modules published this week
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
