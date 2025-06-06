"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Button } from "../../ui/button"
import { Info, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

interface PlasterboardPercentageModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPercentage: string
  onPercentageSelect: (percentage: string) => void
  onContinue: () => void
}

export function PlasterboardPercentageModal({
  isOpen,
  onClose,
  selectedPercentage,
  onPercentageSelect,
  onContinue,
}: PlasterboardPercentageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-slate-200 text-slate-900 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            What percentage of plasterboard would fill your skip?
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-3">
            {["Under 5%", "5-10%", "Over 10%"].map((option, index) => (
              <motion.div
                key={option}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={selectedPercentage === option ? "default" : "outline"}
                  onClick={() => onPercentageSelect(option)}
                  className={`w-full justify-start py-4 text-lg ${
                    selectedPercentage === option
                      ? "bg-gradient-to-r from-violet-500 to-purple-600"
                      : "bg-white border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <Info className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-blue-700">No Tonne Bag Required</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              For small amounts of plasterboard (under 5%). You need to have your own bag to separate plasterboard from
              other waste in the skip.
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <span className="text-lg font-semibold text-amber-700">Important Information</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Plasterboard has to be disposed of separately and cannot be mixed with the other waste. Failing to do this
              could result in additional charges.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-white border-slate-300">
              Back
            </Button>
            <Button
              onClick={onContinue}
              disabled={!selectedPercentage}
              className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
