"use client"

import type React from "react"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"

import { Info, Sparkles, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { wasteTypes } from "../../../constants/booking-data"
import { NavigationButtons } from "../navigation-buttons"
import { StepLayout } from "../step-layout"
import type { BookingState } from "../../../types/booking"

interface WasteTypeStepProps {
  state: BookingState
  onWasteTypeSelect: (wasteId: string) => void
  onBack: () => void
  onContinue: () => void
  navigationRef: React.RefObject<HTMLDivElement>
}

export function WasteTypeStep({ state, onWasteTypeSelect, onBack, onContinue, navigationRef }: WasteTypeStepProps) {
  return (
    <StepLayout currentStep={state.currentStep}>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            What type of waste are you disposing of?
          </h2>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-violet-100 to-purple-100 border border-violet-200 rounded-2xl p-6 mb-8 max-w-md mx-auto"
          >
            <p className="text-violet-700 flex items-center justify-center text-lg font-medium">
              <Info className="w-6 h-6 mr-3" />
              Select all that apply
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {wasteTypes.map((waste, index) => (
            <motion.div
              key={waste.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-500 hover:shadow-2xl group ${
                  state.selectedWasteTypes.includes(waste.id)
                    ? "ring-2 ring-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-300 shadow-xl shadow-violet-500/20"
                    : "bg-white border-slate-200 hover:border-violet-300 hover:shadow-lg"
                }`}
                onClick={() => onWasteTypeSelect(waste.id)}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${waste.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <waste.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                        {waste.name}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{waste.description}</p>
                    </div>
                    <AnimatePresence>
                      {state.selectedWasteTypes.includes(waste.id) && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle className="w-8 h-8 text-violet-600" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {state.selectedWasteTypes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              className="mb-12"
            >
              <Card className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
                <CardContent className="p-6">
                  <h4 className="text-slate-900 font-semibold mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-violet-600" />
                    Selected Waste Types
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {state.selectedWasteTypes.map((wasteId) => {
                      const waste = wasteTypes.find((w) => w.id === wasteId)
                      return (
                        <motion.div
                          key={wasteId}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Badge
                            className={`bg-gradient-to-r ${waste?.color} text-white px-4 py-2 text-sm font-medium`}
                          >
                            {waste?.name}
                          </Badge>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <NavigationButtons
          ref={navigationRef}
          onBack={onBack}
          onContinue={onContinue}
          canContinue={state.selectedWasteTypes.length > 0}
        />
      </div>
    </StepLayout>
  )
}
