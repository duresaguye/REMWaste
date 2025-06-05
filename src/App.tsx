"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import BookingFlow from "./components/booking-flow"

export default function SkipHireApp() {
  const [currentView, setCurrentView] = useState<"landing" | "booking">("landing")
  const [postcode, setPostcode] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const mockAddresses = [
    "197 Ashby Road, Hinckley LE10 1SH",
    "195 Ashby Road, Hinckley LE10 1SH",
    "193 Ashby Road, Hinckley LE10 1SH",
    "191 Ashby Road, Hinckley LE10 1SH",
    "189 Ashby Road, Hinckley LE10 1SH",
  ]

  const handleInputChange = (value: string) => {
    setPostcode(value)
    if (value.length > 2) {
      setSuggestions(mockAddresses.filter((addr) => addr.toLowerCase().includes(value.toLowerCase())))
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (address: string) => {
    const postcodeMatch = address.match(/([A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2})/i)
    if (postcodeMatch) {
      setPostcode(postcodeMatch[1])
      setCurrentView("booking")
    }
    setShowSuggestions(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (postcode.trim()) {
      setCurrentView("booking")
    }
  }

  const handleBackToLanding = () => {
    setCurrentView("landing")
    setPostcode("")
  }

  if (currentView === "booking") {
    return <BookingFlow initialPostcode={postcode} onBack={handleBackToLanding} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-indigo-500/10" />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center mb-6"
          >
            <Sparkles className="w-12 h-12 text-violet-400 mr-4" />
            <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
              SKIP HIRE
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl text-slate-300 font-light italic"
          >
            Completely Redesigned Experience
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-lg relative"
        >
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-violet-400 transition-colors" />
              <Input
                type="text"
                placeholder="Enter your postcode or address..."
                value={postcode}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full pl-16 pr-6 py-6 text-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-slate-400 rounded-2xl focus:ring-4 focus:ring-violet-400/30 focus:border-violet-400 transition-all duration-300 hover:bg-white/15"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400/20 to-purple-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute top-full left-0 right-0 mt-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20 overflow-hidden"
              >
                {suggestions.map((address, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(address)}
                    className="w-full px-6 py-4 text-left hover:bg-white/10 transition-all duration-200 flex items-center space-x-4 group"
                    whileHover={{ x: 4 }}
                  >
                    <MapPin className="w-5 h-5 text-violet-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-white font-medium text-lg">{address.split(",")[0]}</div>
                      <div className="text-slate-400 text-sm">{address.split(",").slice(1).join(",")}</div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-8"
          >
            <p className="text-slate-400 text-sm">Version 3.0 • Modern Design • React + Vite</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
