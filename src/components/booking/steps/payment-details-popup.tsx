import { useState, type SetStateAction } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "../../../components/ui/card"

import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { X, User, Mail, CreditCard } from "lucide-react"

interface PaymentDetailsPopupProps {
  isOpen: boolean
  onClose: () => void
  onProceed: (details: { firstName: string; lastName: string; email: string }) => void
  totalPrice: number
}

export function PaymentDetailsPopup({ isOpen, onClose, onProceed, totalPrice }: PaymentDetailsPopupProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onProceed({ firstName, lastName, email })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md"
          >
            <Card className="bg-white shadow-2xl border-slate-200 overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 opacity-90" />
                <div className="relative p-6 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Complete Your Details</h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white hover:text-violet-200 transition-colors p-2 hover:bg-white/10 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="firstName" className="text-slate-700 font-semibold text-lg flex items-center">
                        <User className="w-5 h-5 mr-2 text-violet-500" />
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e: { target: { value: SetStateAction<string> } }) => setFirstName(e.target.value)}
                        required
                        className="mt-2 h-12 text-lg border-2 border-slate-200 focus:border-violet-400 focus:ring-violet-400/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lastName" className="text-slate-700 font-semibold text-lg flex items-center">
                        <User className="w-5 h-5 mr-2 text-violet-500" />
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e: { target: { value: SetStateAction<string> } }) => setLastName(e.target.value)}
                        required
                        className="mt-2 h-12 text-lg border-2 border-slate-200 focus:border-violet-400 focus:ring-violet-400/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-slate-700 font-semibold text-lg flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-violet-500" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e: { target: { value: SetStateAction<string> } }) => setEmail(e.target.value)}
                        required
                        className="mt-2 h-12 text-lg border-2 border-slate-200 focus:border-violet-400 focus:ring-violet-400/20"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="bg-slate-50 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center text-slate-600">
                        <span className="font-medium">Total Amount</span>
                        <span className="text-2xl font-bold text-violet-600">£{totalPrice}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 bg-white border-slate-300 text-slate-700 hover:bg-slate-50 h-12 text-lg font-medium"
                      >
                        Go Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white h-12 text-lg font-medium shadow-lg shadow-violet-500/30"
                      >
                        Proceed with Payment
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 