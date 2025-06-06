"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Button } from "../../ui/button"
import { motion } from "framer-motion"
import { heavyWasteTypes } from "../../../constants/booking-data"

interface HeavyWasteModalProps {
  isOpen: boolean
  onClose: () => void
  selectedHeavyWaste: string[]
  onHeavyWasteSelect: (waste: string) => void
  onContinue: () => void
}

export function HeavyWasteModal({
  isOpen,
  onClose,
  selectedHeavyWaste,
  onHeavyWasteSelect,
  onContinue,
}: HeavyWasteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-slate-200 text-slate-900 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">Do You Have Any Heavy Waste Types?</DialogTitle>
          <p className="text-slate-600 text-center">Select All That Apply</p>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {heavyWasteTypes.map((waste, index) => (
              <motion.div
                key={waste}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={selectedHeavyWaste.includes(waste) ? "default" : "outline"}
                  size="sm"
                  onClick={() => onHeavyWasteSelect(waste)}
                  className={`text-sm h-12 ${
                    selectedHeavyWaste.includes(waste)
                      ? "bg-gradient-to-r from-violet-500 to-purple-600 border-violet-500"
                      : "bg-white border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {waste}
                </Button>
              </motion.div>
            ))}
          </div>
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3"
            onClick={() => {
              // Clear selection and continue
              selectedHeavyWaste.forEach((waste) => onHeavyWasteSelect(waste))
              onContinue()
            }}
          >
            I Don't Have Any
          </Button>
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
