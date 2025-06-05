"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Home, MapPin, FileText, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { NavigationButtons } from "../navigation-buttons"
import { StepLayout } from "../step-layout"
import type { BookingState } from "../../../types/booking"

interface PermitStepProps {
  state: BookingState
  onPlacementSelect: (placement: "private" | "public") => void
  onBack: () => void
  onContinue: () => void
  navigationRef: React.RefObject<HTMLDivElement>
}

export function PermitStep({ state, onPlacementSelect, onBack, onContinue, navigationRef }: PermitStepProps) {
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
            Where will the skip be placed?
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            This helps us determine if you need a permit for your skip
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-500 hover:shadow-2xl group h-full ${
                state.skipPlacement === "private"
                  ? "ring-2 ring-green-500 bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-xl shadow-green-500/20"
                  : "bg-white border-slate-200 hover:border-green-300 hover:shadow-lg"
              }`}
              onClick={() => onPlacementSelect("private")}
            >
              <CardContent className="p-8">
                <div className="flex items-center space-x-6 mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Home className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                      Private Property
                    </h3>
                    <p className="text-slate-600 text-lg">Driveway or private land</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  No permit required when placed on your private property. Quick and hassle-free setup.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-500 hover:shadow-2xl group h-full ${
                state.skipPlacement === "public"
                  ? "ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300 shadow-xl shadow-blue-500/20"
                  : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg"
              }`}
              onClick={() => onPlacementSelect("public")}
            >
              <CardContent className="p-8">
                <div className="flex items-center space-x-6 mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <MapPin className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Public Road
                    </h3>
                    <p className="text-slate-600 text-lg">Council or public property</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Permit required for placement on public roads. We'll handle the application process for you.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <AnimatePresence>
          {state.skipPlacement === "public" && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              className="space-y-6 mb-8"
            >
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-amber-700">Permit Required</h4>
                      <p className="text-amber-600">Additional documentation needed</p>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    A permit is required when placing a skip on a public road. We'll handle the permit application
                    process for you to ensure everything is compliant.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-blue-700">Processing Time</h4>
                      <p className="text-blue-600">Plan ahead for delivery</p>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    The council requires 5 working days notice to process permit applications. Please plan your delivery
                    date accordingly to avoid any delays.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <NavigationButtons
          ref={navigationRef}
          onBack={onBack}
          onContinue={onContinue}
          canContinue={state.skipPlacement !== null}
        />
      </div>
    </StepLayout>
  )
}
