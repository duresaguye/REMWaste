"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Truck, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { skipData } from "../../../constants/booking-data"
import { calculateTotalPrice } from "../../../utils/pricing"
import { NavigationButtons } from "../navigation-buttons"
import { StepLayout } from "../step-layout"
import type { BookingState } from "../../../types/booking"

interface SkipSelectionStepProps {
  state: BookingState
  onSkipSelect: (skipSize: number) => void
  onBack: () => void
  onContinue: () => void
  navigationRef: React.RefObject<HTMLDivElement>
}

export function SkipSelectionStep({ state, onSkipSelect, onBack, onContinue, navigationRef }: SkipSelectionStepProps) {
  return (
    <StepLayout currentStep={state.currentStep}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Perfect Skip Size
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Select the skip size that matches your project needs. All prices include VAT and 14-day hire period.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {skipData.map((skip, index) => {
            const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat)
            const isSelected = state.selectedSkip === skip.size
            const isPopular = skip.size === 8

            return (
              <motion.div
                key={skip.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`relative cursor-pointer transition-all duration-500 hover:shadow-2xl group ${
                    isSelected
                      ? "ring-4 ring-violet-500 shadow-2xl shadow-violet-500/20 transform scale-105"
                      : "hover:shadow-xl hover:shadow-slate-200"
                  }`}
                  onClick={() => onSkipSelect(skip.size)}
                >
                  <AnimatePresence>
                    {isPopular && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                      >
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-sm font-bold shadow-lg">
                          🔥 Most Popular
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <CardContent className="p-8">
                    <motion.div
                      className="relative mb-6 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl p-8 h-40 flex items-center justify-center group-hover:from-violet-200 group-hover:to-purple-200 transition-all duration-300"
                      whileHover={{ rotate: 2 }}
                    >
                      <div className="text-center">
                        <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                          <Truck className="w-16 h-16 text-violet-600 mx-auto mb-4" />
                        </motion.div>
                        <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 text-lg font-bold">
                          {skip.size} Yards
                        </Badge>
                      </div>
                    </motion.div>

                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{skip.size} Yard Skip</h3>
                        <p className="text-slate-600 font-medium">{skip.hire_period_days} day hire period</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-600 font-medium">Road placement:</span>
                          <Badge
                            className={
                              skip.allowed_on_road
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-red-100 text-red-700 border-red-200"
                            }
                          >
                            {skip.allowed_on_road ? "✓ Allowed" : "✗ Not allowed"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-600 font-medium">Heavy waste:</span>
                          <Badge
                            className={
                              skip.allows_heavy_waste
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-red-100 text-red-700 border-red-200"
                            }
                          >
                            {skip.allows_heavy_waste ? "✓ Allowed" : "✗ Not allowed"}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-center pt-4 border-t-2 border-slate-100">
                        <div className="text-3xl font-black text-slate-900 mb-1">£{totalPrice}</div>
                        <div className="text-sm text-slate-500">£{skip.price_before_vat} + VAT</div>
                      </div>

                      <Button
                        className={`w-full mt-6 py-4 text-lg font-semibold transition-all duration-300 ${
                          isSelected
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/30"
                            : "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-500/30"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onSkipSelect(skip.size)
                        }}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Selected
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5 mr-2" />
                            Select This Skip
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <NavigationButtons
          ref={navigationRef}
          onBack={onBack}
          onContinue={onContinue}
          canContinue={state.selectedSkip !== null}
        />
      </div>
    </StepLayout>
  )
}
