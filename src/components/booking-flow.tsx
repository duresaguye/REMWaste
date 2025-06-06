"use client"

import { useState } from "react"
import { useBookingState } from "../hooks/use-booking-state"
import { useAutoScroll } from "../hooks/use-auto-scroll"
import { WasteTypeStep } from "./booking/steps/waste-type-step"
import { SkipSelectionStep } from "./booking/steps/skip-selection-step"
import { PermitStep } from "./booking/steps/permit-step"
import { DateStep } from "./booking/steps/date-step"
import { PaymentStep } from "./booking/steps/payment-step"
import { HeavyWasteModal } from "./booking/modals/heavy-waste-modal"
import { PlasterboardModal } from "./booking/modals/plasterboard-modal"
import { PlasterboardPercentageModal } from "./booking/modals/plasterboard-percentage-modal"
import { PhotoUploadModal } from "./booking/modals/photo-upload-modal"
import type { BookingFlowProps } from "../types/booking"

export default function BookingFlow({ onBack }: BookingFlowProps) {
  const { state, updateState } = useBookingState()
  const { navigationRef, scrollToNavigation } = useAutoScroll()

  // Modal states
  const [showHeavyWasteModal, setShowHeavyWasteModal] = useState(false)
  const [showPlasterboardModal, setShowPlasterboardModal] = useState(false)
  const [showPlasterboardPercentageModal, setShowPlasterboardPercentageModal] = useState(false)
  const [showPhotoUpload, setShowPhotoUpload] = useState(false)

  const handleWasteTypeSelect = (wasteId: string) => {
    const newSelection = state.selectedWasteTypes.includes(wasteId)
      ? state.selectedWasteTypes.filter((id) => id !== wasteId)
      : [...state.selectedWasteTypes, wasteId]

    updateState({ selectedWasteTypes: newSelection })

    if (newSelection.length > 0) {
      scrollToNavigation()
    }
  }

  const handleSkipSelect = (skipSize: number) => {
    updateState({ selectedSkip: skipSize })
    scrollToNavigation()
  }

  const handlePlacementSelect = (placement: "private" | "public") => {
    updateState({ skipPlacement: placement })
    scrollToNavigation()
  }

  const handleDateSelect = (date: Date | undefined) => {
    updateState({ selectedDate: date })
    if (date) {
      scrollToNavigation()
    }
  }

  const handleHeavyWasteSelect = (waste: string) => {
    const newSelection = state.selectedHeavyWaste.includes(waste)
      ? state.selectedHeavyWaste.filter((w) => w !== waste)
      : [...state.selectedHeavyWaste, waste]

    updateState({ selectedHeavyWaste: newSelection })
  }

  const handlePlasterboardPercentageSelect = (percentage: string) => {
    updateState({ plasterboardPercentage: percentage })
  }

  const handleContinueFromWaste = () => {
    setShowPlasterboardModal(true)
  }

  const handlePlasterboardYes = () => {
    updateState({ hasPlasterboard: true })
    setShowPlasterboardModal(false)
    setShowPlasterboardPercentageModal(true)
  }

  const handlePlasterboardNo = () => {
    updateState({ hasPlasterboard: false })
    setShowPlasterboardModal(false)

    if (state.selectedWasteTypes.includes("construction") || state.selectedWasteTypes.includes("garden")) {
      setShowHeavyWasteModal(true)
    } else {
      goToStep(2)
    }
  }

  const handleHeavyWasteContinue = () => {
    setShowHeavyWasteModal(false)
    goToStep(2)
  }

  const handlePlasterboardPercentageContinue = () => {
    setShowPlasterboardPercentageModal(false)
    goToStep(2)
  }

  const handlePhotoUploadContinue = () => {
    setShowPhotoUpload(false)
    goToStep(4)
  }

  const goToStep = (step: number) => {
    updateState({ currentStep: step })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Render current step
  switch (state.currentStep) {
    case 0:
    case 1:
      return (
        <>
          <WasteTypeStep
            state={state}
            onWasteTypeSelect={handleWasteTypeSelect}
            onBack={onBack}
            onContinue={handleContinueFromWaste}
            navigationRef={navigationRef as React.RefObject<HTMLDivElement>}
          />
          <HeavyWasteModal
            isOpen={showHeavyWasteModal}
            onClose={() => setShowHeavyWasteModal(false)}
            selectedHeavyWaste={state.selectedHeavyWaste}
            onHeavyWasteSelect={handleHeavyWasteSelect}
            onContinue={handleHeavyWasteContinue}
          />
          <PlasterboardModal
            isOpen={showPlasterboardModal}
            onClose={() => setShowPlasterboardModal(false)}
            onSelectYes={handlePlasterboardYes}
            onSelectNo={handlePlasterboardNo}
          />
          <PlasterboardPercentageModal
            isOpen={showPlasterboardPercentageModal}
            onClose={() => setShowPlasterboardPercentageModal(false)}
            selectedPercentage={state.plasterboardPercentage}
            onPercentageSelect={handlePlasterboardPercentageSelect}
            onContinue={handlePlasterboardPercentageContinue}
          />
        </>
      )

    case 2:
      return (
        <SkipSelectionStep
          state={state}
          onSkipSelect={handleSkipSelect}
          onBack={() => goToStep(1)}
          onContinue={() => goToStep(3)}
          navigationRef={navigationRef as React.RefObject<HTMLDivElement>}
        />
      )

    case 3:
      return (
        <>
          <PermitStep
            state={state}
            onPlacementSelect={handlePlacementSelect}
            onBack={() => goToStep(2)}
            onContinue={() => setShowPhotoUpload(true)}
            navigationRef={navigationRef as React.RefObject<HTMLDivElement>}
          />
          <PhotoUploadModal
            isOpen={showPhotoUpload}
            onClose={() => setShowPhotoUpload(false)}
            skipPlacement={state.skipPlacement}
            onContinue={handlePhotoUploadContinue}
          />
        </>
      )

    case 4:
      return (
        <DateStep
          state={state}
          onDateSelect={handleDateSelect}
          onBack={() => goToStep(3)}
          onContinue={() => goToStep(5)}
          navigationRef={navigationRef as React.RefObject<HTMLDivElement>}
        />
      )

    case 5:
      return <PaymentStep state={state} onBack={() => goToStep(4)} navigationRef={navigationRef as React.RefObject<HTMLDivElement>} />

    default:
      return (
        <WasteTypeStep
          state={state}
          onWasteTypeSelect={handleWasteTypeSelect}
          onBack={onBack}
          onContinue={handleContinueFromWaste}
          navigationRef={navigationRef as React.RefObject<HTMLDivElement>}
        />
      )
  }
}
