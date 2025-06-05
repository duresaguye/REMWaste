"use client"

import { useRef } from "react"

export function useAutoScroll() {
  const navigationRef = useRef<HTMLDivElement>(null)

  const scrollToNavigation = () => {
    setTimeout(() => {
      navigationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }, 300)
  }

  return { navigationRef, scrollToNavigation }
}
