"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, X, Mail, Download, Trash2, Edit } from "lucide-react"

interface BulkActionBarProps {
  selectedCount: number
  selectedItems: any[]
  actions: {
    approve?: () => void
    reject?: () => void
    delete?: () => void
    edit?: () => void
    message?: () => void
    export?: () => void
  }
  type: "users" | "content" | "generic"
}

export function BulkActionBar({ selectedCount, selectedItems, actions, type }: BulkActionBarProps) {
  if (selectedCount === 0) return null

  const getUserActions = () => (
    <>
      {actions.approve && (
        <Button size="sm" onClick={actions.approve} className="bg-green-600 hover:bg-green-700">
          <Check className="w-4 h-4 mr-2" />
          Approve Selected
        </Button>
      )}
      {actions.reject && (
        <Button
          size="sm"
          variant="outline"
          onClick={actions.reject}
          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
        >
          <X className="w-4 h-4 mr-2" />
          Reject Selected
        </Button>
      )}
      {actions.message && (
        <Button size="sm" variant="outline" onClick={actions.message}>
          <Mail className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      )}
    </>
  )

  const getContentActions = () => (
    <>
      {actions.edit && (
        <Button size="sm" onClick={actions.edit}>
          <Edit className="w-4 h-4 mr-2" />
          Bulk Edit
        </Button>
      )}
      <Button size="sm" variant="outline">
        Publish Selected
      </Button>
      {actions.delete && (
        <Button
          size="sm"
          variant="outline"
          onClick={actions.delete}
          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Selected
        </Button>
      )}
    </>
  )

  const getGenericActions = () => (
    <>
      {actions.export && (
        <Button size="sm" variant="outline" onClick={actions.export}>
          <Download className="w-4 h-4 mr-2" />
          Export Selected
        </Button>
      )}
      {actions.delete && (
        <Button
          size="sm"
          variant="outline"
          onClick={actions.delete}
          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Selected
        </Button>
      )}
    </>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4"
    >
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {selectedCount}
        </Badge>
        <span className="text-sm font-medium text-blue-900">{selectedCount === 1 ? "item" : "items"} selected</span>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-2">
        {type === "users" && getUserActions()}
        {type === "content" && getContentActions()}
        {type === "generic" && getGenericActions()}
      </div>

      <div className="ml-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            // Clear selection logic would be handled by parent component
            console.log("Clear selection")
          }}
          className="text-gray-600 hover:text-gray-800"
        >
          Clear Selection
        </Button>
      </div>
    </motion.div>
  )
}
