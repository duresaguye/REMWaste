"use client"

import type React from "react"

import { Card, CardContent } from "../../../components/ui/card"
import { Calendar } from "../../../components/ui/calendar"

import { CalendarIcon, Truck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { NavigationButtons } from "../navigation-buttons"
import { StepLayout } from "../step-layout"
import type { BookingState } from "../../../types/booking"

interface DateStepProps {
  state: BookingState
  onDateSelect: (date: Date | undefined) => void
  onBack: () => void
  onContinue: () => void
  navigationRef: React.RefObject<HTMLDivElement>
}

export function DateStep({ state, onDateSelect, onBack, onContinue, navigationRef }: DateStepProps) {
  return (
    <StepLayout currentStep={state.currentStep}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Delivery Date
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Select your preferred skip delivery date. We'll aim to deliver between 7am and 6pm on your chosen day.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center text-slate-900">
              <CalendarIcon className="w-8 h-8 mr-3 text-violet-600" />
              Delivery Date
            </h3>
            <Card className="bg-white border-slate-200 p-6">
              <Calendar
                mode="single"
                selected={state.selectedDate}
                onSelect={onDateSelect}
                disabled={(date: Date) => date.getTime() < new Date().getTime()}
                className="rounded-xl border-0 w-full"
              />
            </Card>
          </motion.div>

          <AnimatePresence>
            {state.selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center text-slate-900">
                  <Truck className="w-8 h-8 mr-3 text-blue-600" />
                  Collection Date
                </h3>
                <Card className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-3 text-violet-700">
                      {new Date(state.selectedDate.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      We'll collect your skip on this date. Please ensure it's accessible and ready for collection.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <NavigationButtons
          ref={navigationRef}
          onBack={onBack}
          onContinue={onContinue}
          canContinue={state.selectedDate !== undefined}
          continueText="Continue to Payment"
        />
      </div>
    </StepLayout>
  )
}
