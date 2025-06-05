"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { forwardRef } from "react"

interface NavigationButtonsProps {
  onBack: () => void
  onContinue: () => void
  canContinue: boolean
  continueText?: string
  backText?: string
}

export const NavigationButtons = forwardRef<HTMLDivElement, NavigationButtonsProps>(
  ({ onBack, onContinue, canContinue, continueText = "Continue", backText = "Back" }, ref) => {
    return (
      <div ref={ref} className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center bg-white border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {backText}
        </Button>
        <Button
          onClick={onContinue}
          disabled={!canContinue}
          className="flex items-center bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 px-8 py-3 shadow-lg shadow-violet-500/30"
        >
          {continueText}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    )
  },
)

NavigationButtons.displayName = "NavigationButtons"
