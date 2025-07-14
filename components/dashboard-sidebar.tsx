"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation" // ✨ NEW: Hook to get current URL path
import { cn } from "@/lib/utils"
import { Home, BookOpen, Users, BarChart3, Settings, FileText } from "lucide-react"
import Link from "next/link"

const navigationItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Content", href: "/dashboard/content", icon: BookOpen },
  { title: "Users", href: "/dashboard/users", icon: Users },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Reports", href: "/dashboard/reports", icon: FileText },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname(); // ✨ Get the current path

  return (
    <aside className="w-64 flex-col border-r bg-white dark:bg-gray-950 dark:border-gray-800 p-4 space-y-6">
      {/* Sidebar Header */}
      <div className="px-2">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-gray-50">Lumo Portal</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ministry of Revenue</p>
          </div>
        </Link>
        {/* ✨ REMOVED: The SidebarTrigger is gone */}
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 space-y-1">
        {navigationItems.map((item, index) => {
          // ✨ DYNAMIC ACTIVE STATE: Check if the current path starts with the item's href
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </Link>
            </motion.div>
          )
        })}
      </nav>
      {/* ✨ REMOVED: The entire SidebarFooter is gone */}
    </aside>
  )
}
