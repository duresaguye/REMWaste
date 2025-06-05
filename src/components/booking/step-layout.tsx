import type React from "react"
import { ProgressBar } from "./progress-bar"

interface StepLayoutProps {
  currentStep: number
  children: React.ReactNode
}

export function StepLayout({ currentStep, children }: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <ProgressBar currentStep={currentStep} />
      {children}
    </div>
  )
}
