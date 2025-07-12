"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div
          className="hidden lg:block space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lumo</h1>
                <p className="text-sm text-gray-600">Institution Creator Portal</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                Secure Access to Your
                <span className="text-blue-600"> Educational Platform</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Access your institution's comprehensive learning management system with enterprise-grade security and
                full administrative control.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700">SOC 2 Type II Compliant</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">Multi-Factor Authentication</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-gray-700">End-to-End Encryption</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
                <div className="lg:hidden flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">Lumo</span>
                </div>
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
                <CardDescription className="text-gray-600">Sign in to access your institution portal</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@institution.gov"
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium"
                >
                  Sign In to Portal
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button variant="outline" className="w-full h-11 border-gray-300 hover:bg-gray-50 bg-transparent">
                <Shield className="w-4 h-4 mr-2" />
                Single Sign-On (SSO)
              </Button>

              <div className="text-center text-sm text-gray-600">
                Need access?{" "}
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                  Contact Administrator
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Protected by enterprise-grade security</p>
            <p className="mt-1">© 2025 Lumo Institution Creator Portal</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
