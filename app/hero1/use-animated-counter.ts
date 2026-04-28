"use client"

import { useState, useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"

export function useAnimatedCounter(target: number, active: boolean): number {
  const prefersReduced = useReducedMotion()
  const [value, setValue] = useState(prefersReduced ? target : 0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (prefersReduced) { setValue(target); return }
    if (!active) return

    const startTime = performance.now()
    const duration = 1800

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setValue(target)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, [target, active, prefersReduced])

  return value
}
