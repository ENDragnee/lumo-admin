import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-gray-50">
        <DashboardSidebar />
        <SidebarInset>{children}</SidebarInset>
      </div>
    </SidebarProvider>
  )
}
