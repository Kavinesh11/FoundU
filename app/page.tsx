"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Eye } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for demonstration
const recentItems = [
  {
    id: 1,
    type: "lost",
    title: "iPhone 13 Pro",
    description: "Lost my iPhone at Central Park",
    location: "Central Park, New York",
    time: "2023-03-09T14:30:00",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    type: "found",
    title: "Car Keys",
    description: "Found car keys with a red keychain",
    location: "Main Street Coffee Shop",
    time: "2023-03-08T09:15:00",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    type: "lost",
    title: "Black Wallet",
    description: "Lost my wallet with ID cards",
    location: "Downtown Bus Station",
    time: "2023-03-07T18:45:00",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    type: "found",
    title: "Prescription Glasses",
    description: "Found glasses with black frame",
    location: "City Library",
    time: "2023-03-06T16:20:00",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-[#0a1a1f] dark:text-white">
              Find what you've lost, return what you've found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Connect with people to recover lost items or return found ones
            </p>
          </div>

          <div className="flex gap-4">
            <Link href="/lost">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#e74c3c] hover:bg-[#c0392b] transition-all duration-300">
                  Report Lost Item
                </Button>
              </motion.div>
            </Link>
            <Link href="/found">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#27ae60] hover:bg-[#219653] transition-all duration-300">
                  Report Found Item
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-200 dark:bg-gray-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#0e87c7] data-[state=active]:text-white">
              All Items
            </TabsTrigger>
            <TabsTrigger value="lost" className="data-[state=active]:bg-[#e74c3c] data-[state=active]:text-white">
              Lost Items
            </TabsTrigger>
            <TabsTrigger value="found" className="data-[state=active]:bg-[#27ae60] data-[state=active]:text-white">
              Found Items
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ItemCard item={item} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lost" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentItems
                .filter((item) => item.type === "lost")
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ItemCard item={item} />
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="found" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentItems
                .filter((item) => item.type === "found")
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ItemCard item={item} />
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function ItemCard({ item }: { item: any }) {
  const formattedDate = new Date(item.time).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-t-[#0e87c7] dark:bg-gray-800 dark:border-gray-700">
        <div className="relative">
          <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
          <Badge className={`absolute top-2 right-2 ${item.type === "lost" ? "bg-[#e74c3c]" : "bg-[#27ae60]"}`}>
            {item.type === "lost" ? "Lost" : "Found"}
          </Badge>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="dark:text-white">{item.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 pb-2">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <p className="text-sm line-clamp-2 dark:text-gray-300">{item.description}</p>
        </CardContent>

        <CardFooter>
          <Link href={`/items/${item.id}`} className="w-full">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                className="w-full hover:bg-[#0e87c7] hover:text-white transition-all duration-300 dark:border-gray-600 dark:text-gray-300 dark:hover:text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </motion.div>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

