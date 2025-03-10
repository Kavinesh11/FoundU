"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, ArrowLeft } from "lucide-react"
import { ChatInterface } from "./chat-interface"
import { motion } from "framer-motion"

// Mock data for demonstration
const items = [
  {
    id: "1",
    type: "lost",
    title: "iPhone 13 Pro",
    description:
      "Lost my iPhone 13 Pro (Sierra Blue) at Central Park near the lake. It has a clear case with a photo of a dog inside. The phone was last seen around 2:30 PM. It's very important as it contains irreplaceable photos. If found, please contact me immediately. Reward offered.",
    location: "Central Park, New York",
    time: "2023-03-09T14:30:00",
    image: "/placeholder.svg?height=400&width=600",
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
  {
    id: "2",
    type: "found",
    title: "Car Keys",
    description:
      "Found car keys with a red keychain at Main Street Coffee Shop. The keys were on a table near the window. They have a Toyota logo and about 3-4 keys on the ring. I've left them with the coffee shop manager. Please describe any additional details to claim.",
    location: "Main Street Coffee Shop",
    time: "2023-03-08T09:15:00",
    image: "/placeholder.svg?height=400&width=600",
    user: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
]

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = items.find((item) => item.id === params.id) || items[0]

  const formattedDate = new Date(item.time).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  })

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/">
          <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" className="mb-6 hover:bg-[#0e87c7] hover:text-white transition-all duration-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all items
            </Button>
          </motion.div>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-[#0a1a1f] dark:text-white">{item.title}</h1>
              <Badge className={item.type === "lost" ? "bg-[#e74c3c]" : "bg-[#27ae60]"}>
                {item.type === "lost" ? "Lost" : "Found"}
              </Badge>
            </div>

            <motion.div
              className="rounded-lg overflow-hidden shadow-md max-w-md mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-auto" />
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-[#0e87c7]" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[#0e87c7]" />
                <span>{formattedDate}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-[#0a1a1f] dark:text-white">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{item.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-[#0a1a1f] dark:text-white">Posted by</h2>
              <div className="flex items-center">
                <img
                  src={item.user.avatar || "/placeholder.svg"}
                  alt={item.user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="dark:text-white">{item.user.name}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-t-4 border-t-[#0e87c7] dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4 text-[#0a1a1f] dark:text-white">Contact {item.user.name}</h2>
                <ChatInterface itemId={params.id} userName={item.user.name} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

