"use client"

import { Progress } from "../../components/ui/progress"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { steps } from "../../constants/booking-data"
import { getStepProgress } from "../../utils/pricing"

interface ProgressBarProps {
  currentStep: number
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const progress = getStepProgress(currentStep, steps.length)

  return (
    <div className="bg-white shadow-lg border-b border-slate-200 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-8">
          <Progress value={progress} className="h-3 bg-slate-200" />
          <motion.div
            className="absolute top-0 left-0 h-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 border-2 transition-all duration-300 ${
                  index < currentStep
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 border-green-500 text-white shadow-lg shadow-green-500/30"
                    : index === currentStep
                      ? "bg-gradient-to-r from-violet-500 to-purple-600 border-violet-500 text-white shadow-lg shadow-violet-500/30"
                      : "bg-white border-slate-300 text-slate-400"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {index < currentStep ? <CheckCircle className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
              </motion.div>
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  index === currentStep ? "text-violet-600" : index < currentStep ? "text-green-600" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
