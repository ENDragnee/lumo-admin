"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "@/components/file-upload"
import { ArrowLeft, Save, Eye, Upload } from "lucide-react"
import Link from "next/link"

// Import the advanced editor
import { RichTextEditorAdvanced } from "@/components/rich-text-editor-advanced"

export default function CreateContentPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    chapter: "",
    content: "",
    status: "draft",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = (status: "draft" | "published") => {
    console.log("Saving content:", { ...formData, status })
    // Handle save logic here
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
            <h1 className="text-2xl font-bold text-gray-900">Create New Content</h1>
            <p className="text-gray-600 mt-1">Add new educational module or material</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => handleSave("draft")}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave("published")}>
            <Eye className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </motion.div>

      {/* Content Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>Content Details</CardTitle>
            <CardDescription>Fill in the basic information about your content module</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter content title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tax-compliance">Tax Compliance</SelectItem>
                    <SelectItem value="business-registration">Business Registration</SelectItem>
                    <SelectItem value="vat">VAT</SelectItem>
                    <SelectItem value="digital-tax">Digital Tax</SelectItem>
                    <SelectItem value="audit">Audit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="chapter">Chapter/Module</Label>
                <Input
                  id="chapter"
                  placeholder="e.g., Chapter 1, Module A"
                  value={formData.chapter}
                  onChange={(e) => handleInputChange("chapter", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the content"
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content Editor */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Content Editor</CardTitle>
            <CardDescription>
              Create your content using the rich text editor with support for multimedia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="editor">Rich Text Editor</TabsTrigger>
                <TabsTrigger value="media">Media Upload</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="mt-6">
                <RichTextEditorAdvanced
                  value={formData.content}
                  onChange={(value) => handleInputChange("content", value)}
                  placeholder="Start creating your educational content..."
                  maxLength={10000}
                />
              </TabsContent>

              <TabsContent value="media" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Media Files</h3>
                    <FileUpload
                      accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx"
                      multiple
                      maxSize={50}
                      onUpload={(files) => console.log("Uploaded files:", files)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-6">
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{formData.title || "Content Title"}</h3>
                  {formData.description && <p className="text-gray-600 mb-6">{formData.description}</p>}
                  <div className="prose max-w-none">
                    {formData.content ? (
                      <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, "<br>") }} />
                    ) : (
                      <p className="text-gray-400 italic">Content preview will appear here...</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200"
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/content">Cancel</Link>
        </Button>
        <Button variant="outline" onClick={() => handleSave("draft")}>
          <Save className="w-4 h-4 mr-2" />
          Save as Draft
        </Button>
        <Button onClick={() => handleSave("published")}>
          <Upload className="w-4 h-4 mr-2" />
          Publish Content
        </Button>
      </motion.div>
    </div>
  )
}
