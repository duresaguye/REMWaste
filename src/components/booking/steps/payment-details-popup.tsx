import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md"
          >
            <Card className="bg-white shadow-2xl border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">Complete Your Details</h3>
                <button onClick={onClose} className="text-white hover:text-violet-200">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-700 font-semibold text-lg">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="mt-2 h-12 text-lg border-2 border-slate-200 focus:border-violet-400 focus:ring-violet-400/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="text-slate-700 font-semibold text-lg">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="mt-2 h-12 text-lg border-2 border-slate-200 focus:border-violet-400 focus:ring-violet-400/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-semibold text-lg">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-2 h-12 text-lg border-2 border-slate-200 focus:border-violet-400 focus:ring-violet-400/20"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      Go Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                    >
                      Proceed with Payment
                    </Button>
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