"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Upload } from "lucide-react"
import { motion } from "framer-motion"

interface ItemFormProps {
  type: "lost" | "found"
}

export function ItemForm({ type }: ItemFormProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to home page
    router.push("/")
  }

  return (
    <Card className="border-t-4 border-t-[#0e87c7] dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Label htmlFor="title" className="dark:text-white">
              Item Name
            </Label>
            <Input
              id="title"
              placeholder="e.g. iPhone 13, Black Wallet, etc."
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Label htmlFor="description" className="dark:text-white">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide details about the item..."
              className="min-h-[100px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Label htmlFor="location" className="dark:text-white">
              Location
            </Label>
            <Input
              id="location"
              placeholder={type === "lost" ? "Where did you lose it?" : "Where did you find it?"}
              required
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Label className="dark:text-white">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:border-gray-700">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="dark:bg-gray-800 dark:text-white"
                />
              </PopoverContent>
            </Popover>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Label htmlFor="image" className="dark:text-white">
              Upload Image
            </Label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-[#0e87c7] transition-colors duration-300">
              <input type="file" id="image" accept="image/*" className="hidden" onChange={handleImageChange} />
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="mx-auto max-h-[200px] rounded-lg"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 hover:bg-[#0e87c7] hover:text-white transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      onClick={() => setImagePreview(null)}
                    >
                      Change Image
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <label htmlFor="image" className="cursor-pointer block">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Click to upload an image of the item</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                </label>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              type="submit"
              className={`w-full ${
                type === "lost" ? "bg-[#e74c3c] hover:bg-[#c0392b]" : "bg-[#27ae60] hover:bg-[#219653]"
              } transition-all duration-300`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                `Submit ${type === "lost" ? "Lost" : "Found"} Item Report`
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}

