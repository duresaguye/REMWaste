"use client"

import { useState } from "react"
import type { BookingState } from "../types/booking"

export function useBookingState() {
  const [state, setState] = useState<BookingState>({
    currentStep: 1,
    selectedWasteTypes: [],
    selectedHeavyWaste: [],
    hasPlasterboard: null,
    plasterboardPercentage: "",
    selectedSkip: null,
    skipPlacement: null,
    selectedDate: undefined,
  })

  const updateState = (updates: Partial<BookingState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  return { state, updateState }
}
