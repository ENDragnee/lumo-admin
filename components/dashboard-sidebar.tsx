"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, BookOpen, Users, BarChart3, Settings, FileText, Bell, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"
import { signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    active: true,
  },
  {
    title: "Content Management",
    href: "/dashboard/content",
    icon: BookOpen,
  },
  {
    title: "User Management",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Lumo Portal</h1>
            <p className="text-xs text-gray-500">Ministry of Revenue</p>
          </div>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item, index) => (
            <SidebarMenuItem key={item.href}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={item.href}>
                  <SidebarMenuButton
                    variant={item.active ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-10",
                      item.active
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </SidebarMenuButton>
                </Link>
              </motion.div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-full justify-start gap-3 h-12 p-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">System Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
