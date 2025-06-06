"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Button } from "../../ui/button"
import { Upload, X } from "lucide-react"
import { motion } from "framer-motion"

interface PhotoUploadModalProps {
  isOpen: boolean
  onClose: () => void
  skipPlacement: "private" | "public" | null
  onContinue: () => void
}

export function PhotoUploadModal({ isOpen, onClose, skipPlacement, onContinue }: PhotoUploadModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-slate-200 text-slate-900 max-w-lg">
        <DialogHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <DialogTitle className="text-2xl font-bold text-center pr-8">Skip Placement Photo</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-slate-700 text-center leading-relaxed">
            {skipPlacement === "public"
              ? "A photo of the skip placement location is required for public road placement. This helps us ensure proper placement and identify any potential access issues."
              : "Please provide a photo of where you plan to place the skip. This helps us ensure proper placement and identify any potential access issues."}
          </p>
          <motion.div
            className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-violet-400 transition-colors cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Upload className="w-12 h-12 text-slate-400 group-hover:text-violet-500 mx-auto mb-4 transition-colors" />
            <p className="text-slate-600 group-hover:text-violet-600 text-lg transition-colors font-medium">
              Upload Photo
            </p>
          </motion.div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-white border-slate-300">
              Cancel
            </Button>
            <Button onClick={onContinue} className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600">
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
