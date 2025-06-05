"use client"

import React, { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Sparkles, X, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import BookingFlow from "./components/booking-flow"

export default function SkipHireApp() {
  const [currentView, setCurrentView] = useState<"landing" | "booking">("landing")
  const [postcode, setPostcode] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const mockAddresses = [
    "197 Ashby Road, Hinckley LE10 1SH",
    "195 Ashby Road, Hinckley LE10 1SH",
    "193 Ashby Road, Hinckley LE10 1SH",
    "191 Ashby Road, Hinckley LE10 1SH",
    "189 Ashby Road, Hinckley LE10 1SH",
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (value: string) => {
    setPostcode(value)
    if (value.length > 2) {
      setSuggestions(mockAddresses.filter(addr => 
        addr.toLowerCase().includes(value.toLowerCase())
      ))
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (address: string) => {
    setSelectedAddress(address)
    const postcodeMatch = address.match(/([A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2})/i)
    if (postcodeMatch) {
      setPostcode(postcodeMatch[1])
      setCurrentView("booking")
    }
    setShowSuggestions(false)
  }

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address)
    setIsDropdownOpen(false)
    
    // Extract postcode from the selected address
    const postcodeMatch = address.match(/([A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2})/i)
    if (postcodeMatch) {
      setPostcode(postcodeMatch[1])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (postcode.trim()) {
      setCurrentView("booking")
    }
  }

  const handleClearInput = () => {
    setPostcode("")
    setSelectedAddress("")
    setShowSuggestions(false)
    setIsDropdownOpen(false)
  }

  const handleBackToLanding = () => {
    setCurrentView("landing")
    setPostcode("")
    setSelectedAddress("")
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center mb-6"
          >
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-violet-400 mr-3" />
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                SKIP HIRE
              </h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl sm:text-2xl text-slate-300 font-light italic max-w-lg mx-auto"
            >
              Modern skip booking experience
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full max-w-md relative"
        >
          <form onSubmit={handleSubmit} className="relative">
            {/* Address dropdown */}
            <div className="mb-4 relative" ref={dropdownRef}>
              <div 
                className="relative group cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center justify-between w-full pl-4 pr-12 py-4 text-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white rounded-2xl focus:ring-4 focus:ring-violet-400/30 focus:border-violet-400 transition-all duration-300 hover:bg-white/15">
                  <div className="truncate">
                    {selectedAddress || "Select your address"}
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                    {isDropdownOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20 overflow-hidden"
                  >
                    {mockAddresses.map((address, index) => (
                      <motion.div
                        key={index}
                        onClick={() => handleAddressSelect(address)}
                        className="px-6 py-4 hover:bg-white/10 transition-all duration-200 cursor-pointer flex items-center space-x-3 group"
                        whileHover={{ x: 4 }}
                      >
                        <MapPin className="w-5 h-5 text-violet-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium truncate">{address.split(",")[0]}</div>
                          <div className="text-slate-400 text-sm truncate">{address.split(",").slice(1).join(",")}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Postcode input */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-violet-400 transition-colors" />
              <Input
                type="text"
                placeholder="Or enter postcode manually..."
                value={postcode}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full pl-12 pr-10 py-5 text-lg bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-slate-400 rounded-2xl focus:ring-4 focus:ring-violet-400/30 focus:border-violet-400 transition-all duration-300 hover:bg-white/15"
              />
              {postcode && (
                <button
                  type="button"
                  onClick={handleClearInput}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400/20 to-purple-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Postcode suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20 overflow-hidden"
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
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate">{address.split(",")[0]}</div>
                      <div className="text-slate-400 text-sm truncate">{address.split(",").slice(1).join(",")}</div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!postcode}
              className={`w-full mt-6 py-5 text-xl font-semibold rounded-2xl shadow-lg transition-all ${
                postcode 
                  ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white cursor-pointer"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Find Available Skips
            </motion.button>
          </form>

         
        </motion.div>
      </div>
    </div>
  )
}