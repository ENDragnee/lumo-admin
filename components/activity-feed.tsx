"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserPlus, BookOpen, FileText, Clock, Eye } from "lucide-react"

const activityData = [
  {
    id: 1,
    type: "user_registration",
    user: {
      name: "Sarah Johnson",
      email: "s.johnson@company.gov",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "registered for the platform",
    timestamp: "2 minutes ago",
    icon: UserPlus,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    id: 2,
    type: "content_interaction",
    user: {
      name: "Michael Chen",
      email: "m.chen@ministry.gov",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "completed Tax Compliance Module",
    timestamp: "15 minutes ago",
    icon: BookOpen,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    id: 3,
    type: "content_published",
    user: {
      name: "Admin User",
      email: "admin@revenue.gov",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "published new content module",
    timestamp: "1 hour ago",
    icon: FileText,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  {
    id: 4,
    type: "user_registration",
    user: {
      name: "Emily Rodriguez",
      email: "e.rodriguez@business.gov",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "submitted registration request",
    timestamp: "2 hours ago",
    icon: Clock,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
  },
  {
    id: 5,
    type: "content_interaction",
    user: {
      name: "David Kim",
      email: "d.kim@finance.gov",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "viewed Business Registration Guide",
    timestamp: "3 hours ago",
    icon: Eye,
    iconColor: "text-gray-600",
    iconBg: "bg-gray-100",
  },
]

export function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activityData.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`w-8 h-8 ${activity.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900 text-sm">{activity.user.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {activity.type.replace("_", " ")}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">{activity.action}</p>
              <p className="text-xs text-gray-400">{activity.timestamp}</p>
            </div>
            <Avatar className="w-8 h-8">
              <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">
                {activity.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
