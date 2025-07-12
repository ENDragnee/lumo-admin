"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, BookOpen, Clock, Download, Filter } from "lucide-react"

// Sample analytics data
const contentAnalytics = [
  {
    id: 1,
    title: "Tax Compliance Fundamentals",
    completionRate: 92,
    avgTimeSpent: 3.5,
    enrolledUsers: 234,
    avgScore: 88,
    trend: "up",
  },
  {
    id: 2,
    title: "VAT Implementation Guide",
    completionRate: 85,
    avgTimeSpent: 4.2,
    enrolledUsers: 456,
    avgScore: 91,
    trend: "up",
  },
  {
    id: 3,
    title: "Business Registration Process",
    completionRate: 78,
    avgTimeSpent: 2.8,
    enrolledUsers: 189,
    avgScore: 82,
    trend: "down",
  },
  {
    id: 4,
    title: "Digital Services Tax Overview",
    completionRate: 73,
    avgTimeSpent: 2.1,
    enrolledUsers: 123,
    avgScore: 79,
    trend: "up",
  },
]

const userAnalytics = [
  { category: "High Performers", count: 156, percentage: 65, color: "bg-green-500" },
  { category: "Average Progress", count: 89, percentage: 37, color: "bg-blue-500" },
  { category: "Struggling Users", count: 23, percentage: 10, color: "bg-red-500" },
  { category: "Inactive Users", count: 12, percentage: 5, color: "bg-gray-400" },
]

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reporting</h1>
          <p className="text-gray-600 mt-1">Insights into content effectiveness and user engagement</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84%</div>
              <p className="text-xs text-gray-600">+5% from last month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-gray-600">+3% from last month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
              <Users className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-gray-600">+12% from last month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Study Time</CardTitle>
              <Clock className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.8h</div>
              <p className="text-xs text-gray-600">per module</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Analytics */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content Analytics</TabsTrigger>
            <TabsTrigger value="users">User Analytics</TabsTrigger>
            <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance Metrics</CardTitle>
                <CardDescription>
                  Detailed analytics for each content module including completion rates and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentAnalytics.map((content) => (
                    <div key={content.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{content.title}</h4>
                          <p className="text-sm text-gray-500">{content.enrolledUsers} enrolled users</p>
                        </div>
                        <Badge variant={content.trend === "up" ? "default" : "secondary"}>
                          {content.trend === "up" ? "↗ Trending Up" : "↘ Needs Attention"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
                          <div className="flex items-center gap-2">
                            <Progress value={content.completionRate} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{content.completionRate}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Avg. Time Spent</p>
                          <p className="text-lg font-semibold text-gray-900">{content.avgTimeSpent}h</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Avg. Score</p>
                          <p className="text-lg font-semibold text-gray-900">{content.avgScore}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Enrolled Users</p>
                          <p className="text-lg font-semibold text-gray-900">{content.enrolledUsers}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Performance Distribution</CardTitle>
                  <CardDescription>Breakdown of user performance categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userAnalytics.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${category.color}`} />
                          <span className="text-sm font-medium text-gray-900">{category.category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">{category.count} users</span>
                          <span className="text-sm font-medium text-gray-900">{category.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Cohorts</CardTitle>
                  <CardDescription>User groups by registration period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">January 2024</p>
                        <p className="text-sm text-gray-500">156 users</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">85%</p>
                        <p className="text-xs text-gray-500">avg. completion</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">December 2023</p>
                        <p className="text-sm text-gray-500">234 users</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-blue-600">92%</p>
                        <p className="text-xs text-gray-500">avg. completion</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">November 2023</p>
                        <p className="text-sm text-gray-500">189 users</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-purple-600">78%</p>
                        <p className="text-xs text-gray-500">avg. completion</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>Important trends and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-900">Positive Trend</span>
                      </div>
                      <p className="text-sm text-green-800">
                        VAT Implementation Guide shows highest engagement with 91% average score
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Recommendation</span>
                      </div>
                      <p className="text-sm text-blue-800">
                        Consider creating more interactive content similar to Tax Compliance module
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-orange-600" />
                        <span className="font-medium text-orange-900">Attention Needed</span>
                      </div>
                      <p className="text-sm text-orange-800">
                        23 users showing signs of struggle - consider targeted support
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardDescription>Key metrics over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">User Registrations</span>
                      <span className="font-medium text-gray-900">+15% growth</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Content Completion</span>
                      <span className="font-medium text-gray-900">+8% improvement</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">User Engagement</span>
                      <span className="font-medium text-gray-900">+12% increase</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Scores</span>
                      <span className="font-medium text-gray-900">+5% improvement</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
