"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComputerIcon as Microsoft } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [rollNo, setRollNo] = useState("")
  const [emailError, setEmailError] = useState("")

  const validateRollNo = (input: string) => {
    const rollNoRegex = /^cb\.sc\.u4aie\d{5}$/i
    return rollNoRegex.test(input.toLowerCase())
  }

  const handleRollNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase()
    setRollNo(input)
    
    if (input && !validateRollNo(input)) {
      setEmailError("Please enter a valid roll number (e.g., cb.sc.u4aie23272)")
    } else {
      setEmailError("")
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateRollNo(rollNo)) {
      setEmailError("Please enter a valid roll number")
      return
    }
    
    setIsLoading(true)
    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Redirect to home page after login
    router.push("/")
  }

  const handleMicrosoftLogin = async () => {
    setIsLoading(true)

    // Simulate Microsoft login process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to home page after login
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a1a1f] dark:bg-[#0a1a1f] text-white overflow-hidden relative">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 left-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="/placeholder.svg?height=300&width=300"
          alt="Decorative leaves"
          className="w-200 h-150 object-contain opacity-70"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <img
          src="/placeholder1.svg?height=300&width=300"
          alt="Decorative leaves"
          className="w-200 h-150 object-contain opacity-70"
        />
      </motion.div>

      {/* Login content */}
      <div className="flex-1 flex items-center justify-center z-10">
        <motion.div
          className="w-full max-w-md px-8 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <motion.div
            className="text-center mb-8"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <h1 className="text-4xl font-bold mb-2">Login</h1>
            <p className="text-gray-400">Welcome to FoundU</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Label htmlFor="email" className="text-gray-300">
                Roll Number
              </Label>
              <div className="space-y-1">
                <Input
                  id="email"
                  type="text"
                  value={rollNo}
                  onChange={handleRollNoChange}
                  placeholder="cb.sc.u4aie23272"
                  required
                  className="bg-[#132a31] border-[#1e3d47] text-white"
                />
                {rollNo && (
                  <p className="text-sm text-gray-400">
                    {rollNo}@cb.students.amrita.edu
                  </p>
                )}
                {emailError && (
                  <p className="text-sm text-red-500">
                    {emailError}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-[#132a31] border-[#1e3d47] text-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                type="submit"
                className="w-full bg-[#0e87c7] hover:bg-[#0a6da0] text-white transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </Button>
            </motion.div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0a1a1f] text-gray-400">Or continue with</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                onClick={handleMicrosoftLogin}
                className="w-full mt-4 bg-[#f8d24b] hover:bg-[#e9c43c] text-black font-medium transition-all duration-300"
                disabled={isLoading}
              >
                <Microsoft className="mr-2 h-5 w-5" />
                Login with Microsoft Account
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

