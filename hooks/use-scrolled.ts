"use client"

import { useState, useCallback } from "react"
import { useScrollEvents } from "./use-scroll-events"

/** Returns true when scroll position exceeds `threshold` px. */
export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false)
  const cb = useCallback((y: number) => { setScrolled(y > threshold) }, [threshold])
  useScrollEvents(cb)
  return scrolled
}
