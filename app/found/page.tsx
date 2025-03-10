"use client"

import { Navbar } from "@/components/navbar"
import { ItemForm } from "./item-form"
import { motion } from "framer-motion"

export default function FoundPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold mb-6 text-[#0a1a1f] dark:text-white">Report a Found Item</h1>
          <ItemForm type="found" />
        </motion.div>
      </div>
    </main>
  )
}

