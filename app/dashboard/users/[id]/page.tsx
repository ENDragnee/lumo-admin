"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Mail, Phone, Building, Calendar, TrendingUp, BookOpen, Clock } from "lucide-react"
import Link from "next/link"

// Sample user data - in real app, this would be fetched based on the ID
const userData = {
  id: 1,
  name: "Sarah Johnson",
  email: "s.johnson@company.gov",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=80&width=80",
  registrationDate: "2024-01-15",
  status: "Active",
  tin: "TIN123456789",
  businessName: "Johnson Consulting Ltd",
  businessType: "Professional Services",
  address: "123 Business District, Capital City",
  overallProgress: 85,
  totalModules: 12,
  completedModules: 10,
  timeSpent: 24.5, // hours
  lastActivity: "2024-02-01",
}

const moduleProgress = [
  { id: 1, title: "Tax Compliance Fundamentals", progress: 100, timeSpent: 3.5, status: "Completed" },
  { id: 2, title: "Business Registration Process", progress: 100, timeSpent: 2.8, status: "Completed" },
  { id: 3, title: "VAT Implementation Guide", progress: 85, timeSpent: 4.2, status: "In Progress" },
  { id: 4, title: "Digital Services Tax Overview", progress: 75, timeSpent: 2.1, status: "In Progress" },
  { id: 5, title: "Audit Preparation Checklist", progress: 0, timeSpent: 0, status: "Not Started" },
]

const activityTimeline = [
  { date: "2024-02-01", action: "Completed VAT Implementation Quiz", score: "92%" },
  { date: "2024-01-30", action: "Started Digital Services Tax module", score: null },
  { date: "2024-01-28", action: "Completed Business Registration Process", score: "88%" },
  { date: "2024-01-25", action: "Downloaded Tax Compliance certificate", score: null },
  { date: "2024-01-20", action: "Completed Tax Compliance Fundamentals", score: "95%" },
]

export default function UserDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/users">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Users
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
            <p className="text-gray-600 mt-1">Detailed view of user information and progress</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          <Button>Generate Report</Button>
        </div>
      </motion.div>

      {/* User Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                  <Badge variant={userData.status === "Active" ? "default" : "secondary"}>{userData.status}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {userData.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {userData.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    {userData.businessName}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Registered {new Date(userData.registrationDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 mb-1">{userData.overallProgress}%</div>
                <p className="text-sm text-gray-600">Overall Progress</p>
                <Progress value={userData.overallProgress} className="w-24 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Information */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-gray-900">{userData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email Address</label>
                    <p className="text-gray-900">{userData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone Number</label>
                    <p className="text-gray-900">{userData.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Registration Date</label>
                    <p className="text-gray-900">{new Date(userData.registrationDate).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Business Name</label>
                    <p className="text-gray-900">{userData.businessName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">TIN Number</label>
                    <p className="text-gray-900">{userData.tin}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Business Type</label>
                    <p className="text-gray-900">{userData.businessType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Address</label>
                    <p className="text-gray-900">{userData.address}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{userData.completedModules}</div>
                    <p className="text-sm text-gray-600">Completed Modules</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{userData.timeSpent}h</div>
                    <p className="text-sm text-gray-600">Time Spent</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{userData.overallProgress}%</div>
                    <p className="text-sm text-gray-600">Overall Progress</p>
                  </CardContent>
                </Card>
              </div>

              {/* Module Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Module Progress</CardTitle>
                  <CardDescription>Detailed progress through each learning module</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {moduleProgress.map((module) => (
                      <div
                        key={module.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{module.title}</h4>
                            <Badge
                              variant={
                                module.status === "Completed"
                                  ? "default"
                                  : module.status === "In Progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {module.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <Progress value={module.progress} className="h-2" />
                            </div>
                            <span className="text-sm text-gray-600">{module.progress}%</span>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="w-3 h-3" />
                              {module.timeSpent}h
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Timeline of user learning activities and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityTimeline.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          {activity.score && (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Score: {activity.score}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Certificates & Achievements</CardTitle>
                <CardDescription>Earned certificates and completion badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Tax Compliance Certificate</h4>
                        <p className="text-sm text-gray-500">Completed Jan 25, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Download Certificate
                    </Button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Business Registration Expert</h4>
                        <p className="text-sm text-gray-500">Completed Jan 28, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Download Certificate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
