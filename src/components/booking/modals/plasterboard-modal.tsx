"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Button } from "../../ui/button"

interface PlasterboardModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectYes: () => void
  onSelectNo: () => void
}

export function PlasterboardModal({ isOpen, onClose, onSelectYes, onSelectNo }: PlasterboardModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-slate-200 text-slate-900 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Do You Have Any Plasterboard?</DialogTitle>
        </DialogHeader>
        <div className="flex space-x-4">
          <Button
            onClick={onSelectYes}
            className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 py-4"
          >
            Yes
          </Button>
          <Button
            onClick={onSelectNo}
            className="flex-1 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 py-4"
          >
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
