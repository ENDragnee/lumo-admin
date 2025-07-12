"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Plus, BookOpen, Users, TrendingUp, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

// Import the BulkActionBar
import { BulkActionBar } from "@/components/bulk-action-bar"

// Sample content data
const contentData = [
  {
    id: 1,
    title: "Tax Compliance Fundamentals",
    status: "Published",
    creationDate: "2024-01-15",
    engagementRate: 85,
    category: "Tax Compliance",
    author: "Admin User",
    enrolledUsers: 234,
  },
  {
    id: 2,
    title: "Business Registration Process",
    status: "Draft",
    creationDate: "2024-01-20",
    engagementRate: 0,
    category: "Business Registration",
    author: "Content Creator",
    enrolledUsers: 0,
  },
  {
    id: 3,
    title: "VAT Implementation Guide",
    status: "Published",
    creationDate: "2024-01-10",
    engagementRate: 92,
    category: "VAT",
    author: "Tax Expert",
    enrolledUsers: 456,
  },
  {
    id: 4,
    title: "Digital Services Tax Overview",
    status: "Published",
    creationDate: "2024-01-25",
    engagementRate: 78,
    category: "Digital Tax",
    author: "Policy Analyst",
    enrolledUsers: 123,
  },
  {
    id: 5,
    title: "Audit Preparation Checklist",
    status: "Draft",
    creationDate: "2024-01-30",
    engagementRate: 0,
    category: "Audit",
    author: "Audit Specialist",
    enrolledUsers: 0,
  },
]

const columns = [
  {
    key: "title",
    label: "Title",
    sortable: true,
    render: (value: string, row: any) => (
      <div>
        <p className="font-medium text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{row.category}</p>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value: string) => <Badge variant={value === "Published" ? "default" : "secondary"}>{value}</Badge>,
  },
  {
    key: "creationDate",
    label: "Creation Date",
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    key: "engagementRate",
    label: "Engagement Rate",
    sortable: true,
    render: (value: number) => (
      <div className="flex items-center gap-2">
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${value}%` }} />
        </div>
        <span className="text-sm text-gray-600">{value}%</span>
      </div>
    ),
  },
  {
    key: "enrolledUsers",
    label: "Enrolled Users",
    sortable: true,
    render: (value: number) => value.toLocaleString(),
  },
]

export default function ContentManagementPage() {
  const [selectedContent, setSelectedContent] = useState<any[]>([])

  const handleRowSelect = (rows: any[]) => {
    setSelectedContent(rows)
  }

  const renderActions = (row: any) => (
    <>
      <DropdownMenuItem asChild>
        <Link href={`/dashboard/content/${row.id}`}>
          <Eye className="w-4 h-4 mr-2" />
          View
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={`/dashboard/content/${row.id}/edit`}>
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="text-red-600">
        <Trash2 className="w-4 h-4 mr-2" />
        Delete
      </DropdownMenuItem>
    </>
  )

  // Add bulk actions handlers
  const handleBulkEdit = () => {
    console.log("Bulk editing content:", selectedContent)
  }

  const handleBulkDelete = () => {
    console.log("Bulk deleting content:", selectedContent)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-1">Create, manage, and organize your educational content</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/content/organize">Organize Modules</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/content/new">
              <Plus className="w-4 h-4 mr-2" />
              Create Content
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-gray-600">+12 from last month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">134</div>
              <p className="text-xs text-gray-600">86% of total content</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
              <Users className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-gray-600">+5% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bulk Actions */}
      {selectedContent.length > 0 && (
        <BulkActionBar
          selectedCount={selectedContent.length}
          selectedItems={selectedContent}
          actions={{
            edit: handleBulkEdit,
            delete: handleBulkDelete,
          }}
          type="content"
        />
      )}

      {/* Content Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle>Content Library</CardTitle>
            <CardDescription>Manage all your educational content modules and materials</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={contentData}
              columns={columns}
              selectable
              onRowSelect={handleRowSelect}
              actions={renderActions}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
