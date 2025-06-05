export function calculateTotalPrice(priceBeforeVat: number, vat: number): number {
  return Math.round(priceBeforeVat * (1 + vat / 100))
}

export function getStepProgress(currentStep: number, totalSteps: number): number {
  return (currentStep / totalSteps) * 100
}
