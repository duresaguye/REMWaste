import { MapPin, Trash2, Truck, Shield, CalendarIcon, CreditCard, Building, Home } from "lucide-react"
import type { Skip, WasteType, BookingStep } from "../types/booking"

export const skipData: Skip[] = [
  {
    id: 17933,
    size: 4,
    hire_period_days: 14,
    price_before_vat: 278,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17934,
    size: 6,
    hire_period_days: 14,
    price_before_vat: 305,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17935,
    size: 8,
    hire_period_days: 14,
    price_before_vat: 375,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17936,
    size: 10,
    hire_period_days: 14,
    price_before_vat: 400,
    vat: 20,
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17937,
    size: 12,
    hire_period_days: 14,
    price_before_vat: 439,
    vat: 20,
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17938,
    size: 14,
    hire_period_days: 14,
    price_before_vat: 470,
    vat: 20,
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
]

export const steps: BookingStep[] = [
  { icon: MapPin, label: "Location", key: "postcode" },
  { icon: Trash2, label: "Waste Type", key: "waste" },
  { icon: Truck, label: "Skip Size", key: "skip" },
  { icon: Shield, label: "Placement", key: "permit" },
  { icon: CalendarIcon, label: "Schedule", key: "date" },
  { icon: CreditCard, label: "Payment", key: "payment" },
]

export const wasteTypes: WasteType[] = [
  {
    id: "construction",
    name: "Construction Waste",
    description: "Building materials, renovation debris, and construction waste.",
    icon: Building,
    color: "from-orange-400 to-red-500",
  },
  {
    id: "household",
    name: "Household Waste",
    description: "General household items, furniture, and domestic waste.",
    icon: Home,
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: "garden",
    name: "Garden Waste",
    description: "Green waste, landscaping materials, and garden debris.",
    icon: Trash2,
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "commercial",
    name: "Commercial Waste",
    description: "Business waste, office clearance, and commercial debris.",
    icon: Building,
    color: "from-purple-400 to-pink-500",
  },
]

export const heavyWasteTypes = ["Soil", "Concrete", "Bricks", "Tiles", "Sand", "Gravel", "Rubble"]
