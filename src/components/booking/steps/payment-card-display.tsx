import { motion } from "framer-motion"
import { Wifi, CreditCard } from "lucide-react"

interface PaymentCardDisplayProps {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cardType: "visa" | "mastercard" | "amex" | null
}

export function PaymentCardDisplay({ cardNumber, cardHolder, expiryDate, cardType }: PaymentCardDisplayProps) {
  const getCardTypeColor = () => {
    switch (cardType) {
      case "visa":
        return "from-[#1A1F71] to-[#00579F]"
      case "mastercard":
        return "from-[#FF5F00] to-[#EB001B]"
      case "amex":
        return "from-[#006FCF] to-[#2E77BB]"
      default:
        return "from-slate-600 to-slate-800"
    }
  }

  const formatCardNumber = (number: string) => {
    if (!number) return "**** **** **** ****"
    const cleaned = number.replace(/\s/g, "")
    const groups = cleaned.match(/.{1,4}/g) || []
    return groups.join(" ").padEnd(19, "*")
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 0 }}
        className={`relative w-full h-56 rounded-2xl bg-gradient-to-br ${getCardTypeColor()} p-6 shadow-2xl`}
      >
        <div className="absolute top-6 right-6">
          {cardType === "visa" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-white font-bold text-2xl"
            >
              VISA
            </motion.div>
          )}
          {cardType === "mastercard" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-white font-bold text-2xl"
            >
              MASTERCARD
            </motion.div>
          )}
          {cardType === "amex" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-white font-bold text-2xl"
            >
              AMEX
            </motion.div>
          )}
        </div>

        <div className="absolute top-6 left-6">
          <Wifi className="w-8 h-8 text-white/80" />
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-white/80 text-sm mb-2">Card Number</div>
          <div className="text-white text-2xl font-mono tracking-wider mb-6">
            {formatCardNumber(cardNumber)}
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-white/80 text-sm mb-1">Card Holder</div>
              <div className="text-white text-lg font-medium">
                {cardHolder || "YOUR NAME"}
              </div>
            </div>
            <div>
              <div className="text-white/80 text-sm mb-1">Expires</div>
              <div className="text-white text-lg font-medium">
                {expiryDate || "MM/YY"}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

     {/* Card Type Selectors */}
<div className="flex justify-center flex-wrap gap-4">
  <motion.div
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0px 4px 12px rgba(26, 31, 113, 0.2)"
    }}
    className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
      cardType === "visa" 
        ? "bg-gradient-to-r from-[#1A1F71] to-[#00579F] text-white border-[#1A1F71] shadow-lg"
        : "bg-white border-slate-200 text-slate-600 hover:border-[#1A1F71]"
    }`}
  >
    {/* Visa Logo */}
    <div className={`${cardType === "visa" ? "bg-white rounded p-1" : ""}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" className="h-5 w-7">
        <path 
          fill={cardType === "visa" ? "#1A1F71" : "#1A1F71"} 
          d="M9.6,12.5c0-1.2,1.7-2,3.3-2.3c0.5-0.1,1-0.2,1-0.5c0-0.4-0.4-0.6-0.9-0.6c-0.6,0-1,0.2-1.5,0.5l-0.6-1.1 c0.6-0.4,1.4-0.6,2.3-0.6c1.4,0,2.3,0.7,2.3,1.8c0,1.1-1.6,1.7-3,2c-0.5,0.1-0.9,0.2-0.9,0.5c0,0.3,0.3,0.5,0.8,0.5 c0.6,0,1.1-0.2,1.6-0.5l0.6,1.1c-0.6,0.4-1.5,0.6-2.4,0.6C10.5,14.5,9.6,13.7,9.6,12.5z"
        />
        <path 
          fill={cardType === "visa" ? "#F79E1B" : "#1A1F71"} 
          d="M17.6,8.1h-1.8l-1.1,6.8h1.8L17.6,8.1z"
        />
        <path 
          fill={cardType === "visa" ? "#1A1F71" : "#1A1F71"} 
          d="M15.5,8.1l-2.3,6.8h1.7l0.4-1.3h2.1l0.2,1.3h1.5L18,10.1c0.3-0.8,0.8-1.4,1.5-1.7 c-0.4-0.3-1-0.4-1.5-0.4H15.5z M16.9,10.9l0.5-1.5l0.4,1.5H16.9z"
        />
      </svg>
    </div>
    <span className="font-bold">Visa</span>
  </motion.div>

  <motion.div
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0px 4px 12px rgba(235, 0, 27, 0.2)"
    }}
    className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
      cardType === "mastercard" 
        ? "bg-gradient-to-r from-[#EB001B] to-[#F79E1B] text-white border-[#EB001B] shadow-lg"
        : "bg-white border-slate-200 text-slate-600 hover:border-[#EB001B]"
    }`}
  >
    {/* Mastercard Logo */}
    <div className="flex">
      <div className={`w-6 h-6 rounded-full ${cardType === "mastercard" ? "bg-[#EB001B]" : "bg-[#EB001B] opacity-40"}`}></div>
      <div className={`w-6 h-6 rounded-full ml-[-8px] ${cardType === "mastercard" ? "bg-[#F79E1B]" : "bg-[#F79E1B] opacity-40"}`}></div>
    </div>
    <span className="font-bold">Mastercard</span>
  </motion.div>

  <motion.div
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0px 4px 12px rgba(0, 111, 207, 0.2)"
    }}
    className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
      cardType === "amex" 
        ? "bg-gradient-to-r from-[#006FCF] to-[#009DDC] text-white border-[#006FCF] shadow-lg"
        : "bg-white border-slate-200 text-slate-600 hover:border-[#006FCF]"
    }`}
  >
    {/* Amex Logo */}
    <svg width="24" height="24" viewBox="0 0 24 24" className="h-5 w-7">
      <path 
        fill={cardType === "amex" ? "white" : "#006FCF"} 
        d="M18.5,12.5h-2v-1h2v1z M8.5,11.5H6.5v1h2V11.5z M16.5,8.5h-8v5h8V8.5z M15.5,12.5h-6v-3h6V12.5z"
      />
      <path 
        fill={cardType === "amex" ? "white" : "#006FCF"} 
        d="M20.5,8.5h-16c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-4C22.5,9.4,21.6,8.5,20.5,8.5z M18.5,14.5h-12v-1h12V14.5z M18.5,12.5h-12v-1h12V12.5z"
      />
    </svg>
    <span className="font-bold">Amex</span>
  </motion.div>
</div>
    </div>
  )
} 