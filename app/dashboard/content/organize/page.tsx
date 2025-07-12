"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CourseBuilder } from "@/components/course-builder"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface Module {
  id: string
  title: string
  description?: string
  duration?: number // in minutes
  enrolledUsers?: number
  status: "draft" | "published" | "archived"
  order: number
}

// Sample module data
const initialModules: Module[] = [
  {
    id: "1",
    title: "Introduction to Tax Compliance",
    description: "Basic overview of tax compliance requirements",
    duration: 45,
    enrolledUsers: 234,
    status: "published",
    order: 0,
  },
  {
    id: "2",
    title: "Business Registration Fundamentals",
    description: "Step-by-step guide to business registration",
    duration: 60,
    enrolledUsers: 189,
    status: "published",
    order: 1,
  },
  {
    id: "3",
    title: "VAT Implementation Guide",
    description: "Comprehensive VAT implementation strategies",
    duration: 90,
    enrolledUsers: 456,
    status: "draft",
    order: 2,
  },
  {
    id: "4",
    title: "Digital Services Tax Overview",
    description: "Understanding digital services taxation",
    duration: 30,
    enrolledUsers: 123,
    status: "published",
    order: 3,
  },
]

export default function OrganizeContentPage() {
  const [modules, setModules] = useState(initialModules)
  const [hasChanges, setHasChanges] = useState(false)

  const handleReorder = (newOrder: Module[]) => {
    setModules(newOrder)
    setHasChanges(true)
  }

  const handleAddModule = () => {
    const newModule: Module = {
      id: `new-${Date.now()}`,
      title: "New Module",
      description: "Module description",
      duration: 30,
      enrolledUsers: 0,
      status: "draft",
      order: modules.length,
    }
    setModules([...modules, newModule])
    setHasChanges(true)
  }

  const handleEditModule = (moduleId: string) => {
    console.log("Edit module:", moduleId)
    // Navigate to edit page or open modal
  }

  const handleDeleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m.id !== moduleId))
    setHasChanges(true)
  }

  const handleSave = () => {
    console.log("Saving module order:", modules)
    setHasChanges(false)
    // Save to API
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/content">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Content
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Organize Course Modules</h1>
            <p className="text-gray-600 mt-1">Drag and drop to reorder your course content</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && <span className="text-sm text-orange-600 font-medium">Unsaved changes</span>}
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Order
          </Button>
        </div>
      </motion.div>

      {/* Course Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>Tax Compliance and Business Registration Course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{modules.length}</div>
                <p className="text-sm text-gray-600">Total Modules</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {modules.filter((m) => m.status === "published").length}
                </div>
                <p className="text-sm text-gray-600">Published</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {modules.reduce((acc, m) => acc + (m.duration || 0), 0)} min
                </div>
                <p className="text-sm text-gray-600">Total Duration</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {modules.reduce((acc, m) => acc + (m.enrolledUsers || 0), 0)}
                </div>
                <p className="text-sm text-gray-600">Total Enrolled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Course Builder */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <CourseBuilder
          modules={modules}
          onReorder={handleReorder}
          onAddModule={handleAddModule}
          onEditModule={handleEditModule}
          onDeleteModule={handleDeleteModule}
        />
      </motion.div>
    </div>
  )
}
