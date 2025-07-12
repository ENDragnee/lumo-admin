"use client"

import { useState, useCallback } from "react"
import { motion, Reorder } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { GripVertical, Plus, Edit, Trash2, Eye, Clock, Users, BookOpen } from "lucide-react"

interface Module {
  id: string
  title: string
  description?: string
  duration?: number // in minutes
  enrolledUsers?: number
  status: "draft" | "published" | "archived"
  order: number
}

interface CourseBuilderProps {
  modules: Module[]
  onReorder: (newOrder: Module[]) => void
  onAddModule: () => void
  onEditModule: (moduleId: string) => void
  onDeleteModule: (moduleId: string) => void
}

export function CourseBuilder({ modules, onReorder, onAddModule, onEditModule, onDeleteModule }: CourseBuilderProps) {
  const [items, setItems] = useState(modules)
  const [isAddingModule, setIsAddingModule] = useState(false)
  const [newModuleTitle, setNewModuleTitle] = useState("")

  const handleReorder = useCallback(
    (newOrder: Module[]) => {
      const reorderedItems = newOrder.map((item, index) => ({
        ...item,
        order: index,
      }))
      setItems(reorderedItems)
      onReorder(reorderedItems)
    },
    [onReorder],
  )

  const handleAddModule = () => {
    if (newModuleTitle.trim()) {
      onAddModule()
      setNewModuleTitle("")
      setIsAddingModule(false)
    }
  }

  const getStatusColor = (status: Module["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700"
      case "draft":
        return "bg-yellow-100 text-yellow-700"
      case "archived":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Builder</h2>
          <p className="text-gray-600 mt-1">Drag and drop to reorder modules</p>
        </div>
        <Button onClick={() => setIsAddingModule(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Module
        </Button>
      </div>

      {/* Add Module Form */}
      {isAddingModule && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="border-dashed border-2 border-blue-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Enter module title..."
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddModule()
                    if (e.key === "Escape") setIsAddingModule(false)
                  }}
                  autoFocus
                />
                <Button onClick={handleAddModule} disabled={!newModuleTitle.trim()}>
                  Add
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingModule(false)
                    setNewModuleTitle("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Module List */}
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-3">
        {items.map((module, index) => (
          <Reorder.Item
            key={module.id}
            value={module}
            className="cursor-grab active:cursor-grabbing"
            whileDrag={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
          >
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Drag Handle */}
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-700">
                      {index + 1}
                    </div>
                  </div>

                  {/* Module Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{module.title}</h3>
                      <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                    </div>

                    {module.description && <p className="text-sm text-gray-600 mb-2">{module.description}</p>}

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {module.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{module.duration} min</span>
                        </div>
                      )}
                      {module.enrolledUsers && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{module.enrolledUsers} enrolled</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>Module {index + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditModule(module.id)}
                      aria-label={`Edit ${module.title}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditModule(module.id)}
                      aria-label={`Edit ${module.title}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteModule(module.id)}
                      aria-label={`Delete ${module.title}`}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {items.length === 0 && !isAddingModule && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No modules yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first course module</p>
            <Button onClick={() => setIsAddingModule(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Module
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
