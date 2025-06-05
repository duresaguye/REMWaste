export interface Skip {
  id: number
  size: number
  hire_period_days: number
  price_before_vat: number
  vat: number
  allowed_on_road: boolean
  allows_heavy_waste: boolean
}

export interface WasteType {
  id: string
  name: string
  description: string
  icon: any
  color: string
}

export interface BookingStep {
  icon: any
  label: string
  key: string
}

export interface BookingState {
  currentStep: number
  selectedWasteTypes: string[]
  selectedHeavyWaste: string[]
  hasPlasterboard: boolean | null
  plasterboardPercentage: string
  selectedSkip: number | null
  skipPlacement: "private" | "public" | null
  selectedDate: Date | undefined
}

export interface BookingFlowProps {
  initialPostcode: string
  onBack: () => void
}
