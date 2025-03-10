"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserCircle, LogOut, Menu, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(true) // For demo purposes
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    setIsLoggedIn(false)
    router.push("/login")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 py-2">
      <div className="bg-gray-300 dark:bg-gray-800 rounded-full px-6 py-3 flex items-center justify-between transition-colors duration-300">
        <div className="flex items-center">
          <Link href="/">
            <Button
              variant={pathname === "/" ? "secondary" : "ghost"}
              className="font-semibold rounded-full hidden md:flex"
            >
              HOME
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <motion.div
          className="text-3xl font-bold text-[#0a1a1f] dark:text-white"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          FoundU
        </motion.div>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}

          <div className="hidden md:flex items-center gap-2">
            <Link href="/lost">
              <Button variant={pathname === "/lost" ? "secondary" : "ghost"} className="font-semibold rounded-full">
                Lost
              </Button>
            </Link>

            <Link href="/found">
              <Button variant={pathname === "/found" ? "secondary" : "ghost"} className="font-semibold rounded-full">
                Found
              </Button>
            </Link>
          </div>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0 w-10 h-10">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      <UserCircle className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                variant="default"
                className="rounded-full bg-[#0e87c7] hover:bg-[#0a6da0] transition-all duration-300"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-2 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Button variant={pathname === "/" ? "secondary" : "ghost"} className="w-full justify-start">
                  Home
                </Button>
              </Link>
              <Link href="/lost" onClick={() => setMobileMenuOpen(false)}>
                <Button variant={pathname === "/lost" ? "secondary" : "ghost"} className="w-full justify-start">
                  Lost Items
                </Button>
              </Link>
              <Link href="/found" onClick={() => setMobileMenuOpen(false)}>
                <Button variant={pathname === "/found" ? "secondary" : "ghost"} className="w-full justify-start">
                  Found Items
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

