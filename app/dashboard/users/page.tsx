"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, UserCheck, UserX, Eye, Check, X, Mail } from "lucide-react"
import Link from "next/link"

// Import the BulkActionBar
import { BulkActionBar } from "@/components/bulk-action-bar"

// Sample user data
const userData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "s.johnson@company.gov",
    registrationDate: "2024-01-15",
    status: "Active",
    progress: 85,
    tin: "TIN123456789",
    businessName: "Johnson Consulting Ltd",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@ministry.gov",
    registrationDate: "2024-01-20",
    status: "Pending",
    progress: 0,
    tin: "TIN987654321",
    businessName: "Chen & Associates",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "e.rodriguez@business.gov",
    registrationDate: "2024-01-10",
    status: "Active",
    progress: 92,
    tin: "TIN456789123",
    businessName: "Rodriguez Enterprises",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "David Kim",
    email: "d.kim@finance.gov",
    registrationDate: "2024-01-25",
    status: "Pending",
    progress: 0,
    tin: "TIN789123456",
    businessName: "Kim Financial Services",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "l.wang@trade.gov",
    registrationDate: "2024-01-30",
    status: "Active",
    progress: 67,
    tin: "TIN321654987",
    businessName: "Wang Trading Co.",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const columns = [
  {
    key: "name",
    label: "User",
    sortable: true,
    render: (value: string, row: any) => (
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={row.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {value
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "businessName",
    label: "Business/Organization",
    sortable: true,
    render: (value: string, row: any) => (
      <div>
        <p className="font-medium text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">TIN: {row.tin}</p>
      </div>
    ),
  },
  {
    key: "registrationDate",
    label: "Registration Date",
    sortable: true,
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value: string) => (
      <Badge variant={value === "Active" ? "default" : value === "Pending" ? "secondary" : "destructive"}>
        {value}
      </Badge>
    ),
  },
  {
    key: "progress",
    label: "Overall Progress",
    sortable: true,
    render: (value: number) => (
      <div className="flex items-center gap-2">
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${value}%` }} />
        </div>
        <span className="text-sm text-gray-600">{value}%</span>
      </div>
    ),
  },
]

export default function UserManagementPage() {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])

  const handleRowSelect = (rows: any[]) => {
    setSelectedUsers(rows)
  }

  const handleBulkApprove = () => {
    console.log("Bulk approving users:", selectedUsers)
    // Handle bulk approve logic
  }

  const handleBulkReject = () => {
    console.log("Bulk rejecting users:", selectedUsers)
    // Handle bulk reject logic
  }

  const renderActions = (row: any) => (
    <>
      <DropdownMenuItem asChild>
        <Link href={`/dashboard/users/${row.id}`}>
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Link>
      </DropdownMenuItem>
      {row.status === "Pending" && (
        <>
          <DropdownMenuItem className="text-green-600">
            <Check className="w-4 h-4 mr-2" />
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">
            <X className="w-4 h-4 mr-2" />
            Reject
          </DropdownMenuItem>
        </>
      )}
      <DropdownMenuItem>
        <Mail className="w-4 h-4 mr-2" />
        Send Message
      </DropdownMenuItem>
    </>
  )

  const activeUsers = userData.filter((user) => user.status === "Active").length
  const pendingUsers = userData.filter((user) => user.status === "Pending").length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage user registrations, approvals, and progress tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Export Users</Button>
          <Button>Invite Users</Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.length}</div>
              <p className="text-xs text-gray-600">registered users</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeUsers}</div>
              <p className="text-xs text-gray-600">approved and active</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <UserX className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingUsers}</div>
              <p className="text-xs text-gray-600">awaiting approval</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
              <Users className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(userData.reduce((acc, user) => acc + user.progress, 0) / userData.length)}%
              </div>
              <p className="text-xs text-gray-600">completion rate</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bulk Actions */}
      {/* Replace the existing bulk actions section with: */}
      <BulkActionBar
        selectedCount={selectedUsers.length}
        selectedItems={selectedUsers}
        actions={{
          approve: handleBulkApprove,
          reject: handleBulkReject,
          message: () => console.log("Send message to users"),
          export: () => console.log("Export user data"),
        }}
        type="users"
      />

      {/* Users Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>User Directory</CardTitle>
            <CardDescription>Manage user registrations, approvals, and track learning progress</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={userData}
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
