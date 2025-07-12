"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "@/components/file-upload"
import { Badge } from "@/components/ui/badge"
import { Save, Palette, Settings, Building, Shield } from "lucide-react"

export default function SettingsPage() {
  const [institutionData, setInstitutionData] = useState({
    name: "Ministry of Revenue",
    description: "Government agency responsible for tax collection and revenue management",
    website: "https://revenue.gov",
    email: "contact@revenue.gov",
    phone: "+1 (555) 123-4567",
    address: "123 Government Plaza, Capital City",
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
    logo: null as File | null,
  })

  const handleInputChange = (field: string, value: string) => {
    setInstitutionData((prev) => ({ ...prev, [field]: value }))
  }

  const handleColorChange = (field: string, color: string) => {
    setInstitutionData((prev) => ({ ...prev, [field]: color }))
  }

  const handleSave = () => {
    console.log("Saving settings:", institutionData)
    // Handle save logic here
  }

  const colorPresets = [
    { name: "Blue", primary: "#2563eb", secondary: "#1e40af" },
    { name: "Green", primary: "#16a34a", secondary: "#15803d" },
    { name: "Purple", primary: "#9333ea", secondary: "#7c3aed" },
    { name: "Red", primary: "#dc2626", secondary: "#b91c1c" },
    { name: "Orange", primary: "#ea580c", secondary: "#c2410c" },
    { name: "Teal", primary: "#0d9488", secondary: "#0f766e" },
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portal Settings</h1>
          <p className="text-gray-600 mt-1">Customize your institution's portal appearance and information</p>
        </div>
        
      </motion.div>

      {/* Settings Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">
              <Building className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="branding">
              <Palette className="w-4 h-4 mr-2" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <Settings className="w-4 h-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Institution Information</CardTitle>
                <CardDescription>
                  Basic information about your institution that will be displayed on the portal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Institution Name *</Label>
                    <Input
                      id="name"
                      value={institutionData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={institutionData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Public Description</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    value={institutionData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of your institution..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={institutionData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={institutionData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    rows={2}
                    value={institutionData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="mt-6">
            <div className="space-y-6">
              {/* Logo Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Institution Logo</CardTitle>
                  <CardDescription>
                    Upload your institution's logo. Recommended size: 200x80px, PNG or SVG format.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    accept="image/*"
                    maxSize={5}
                    onUpload={(files) => {
                      if (files.length > 0) {
                        setInstitutionData((prev) => ({ ...prev, logo: files[0] }))
                      }
                    }}
                  />
                </CardContent>
              </Card>

              {/* Color Scheme */}
              <Card>
                <CardHeader>
                  <CardTitle>Color Scheme</CardTitle>
                  <CardDescription>Choose colors that represent your institution's brand identity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Color Presets */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Quick Presets</Label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => {
                            handleColorChange("primaryColor", preset.primary)
                            handleColorChange("secondaryColor", preset.secondary)
                          }}
                          className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                        >
                          <div className="flex gap-1">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }} />
                          </div>
                          <span className="text-xs text-gray-600">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Colors */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          id="primaryColor"
                          value={institutionData.primaryColor}
                          onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <Input
                          value={institutionData.primaryColor}
                          onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                          placeholder="#2563eb"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          id="secondaryColor"
                          value={institutionData.secondaryColor}
                          onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <Input
                          value={institutionData.secondaryColor}
                          onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                          placeholder="#1e40af"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Preview</Label>
                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: institutionData.primaryColor }}
                        >
                          <Building className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{institutionData.name}</h3>
                          <p className="text-sm text-gray-600">Portal Preview</p>
                        </div>
                      </div>
                      <Button
                        style={{ backgroundColor: institutionData.primaryColor }}
                        className="text-white hover:opacity-90"
                      >
                        Sample Button
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure security and access control settings for your portal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Require 2FA for all administrator accounts</p>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-700">
                      Enabled
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Single Sign-On (SSO)</h4>
                      <p className="text-sm text-gray-600">Integration with institutional SSO provider</p>
                    </div>
                    <Badge variant="secondary">Configured</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Session Timeout</h4>
                      <p className="text-sm text-gray-600">Automatic logout after inactivity</p>
                    </div>
                    <Badge variant="outline">30 minutes</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Data Encryption</h4>
                      <p className="text-sm text-gray-600">All data encrypted at rest and in transit</p>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-700">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Configuration</CardTitle>
                  <CardDescription>Advanced settings for system administrators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Default Timezone</Label>
                      <Input id="timezone" value="UTC-5 (EST)" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Input id="language" value="English (US)" readOnly />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Access Key</Label>
                    <div className="flex items-center gap-3">
                      <Input id="apiKey" value="••••••••••••••••••••••••••••••••" readOnly type="password" />
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">System Maintenance</h4>
                    <p className="text-sm text-yellow-800 mb-3">
                      Schedule regular maintenance windows for system updates and backups.
                    </p>
                    <Button variant="outline" size="sm">
                      Configure Maintenance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
