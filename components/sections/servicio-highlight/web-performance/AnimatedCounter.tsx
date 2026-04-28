"use client"

import { useRef, useEffect, useState } from "react"
import { animate } from "motion/react"

interface AnimatedCounterProps {
  to: number
  from?: number
  duration?: number
  suffix?: string
  decimals?: number
  started: boolean
  prefersReduced?: boolean
}

export function AnimatedCounter({
  to,
  from = 0,
  duration = 2,
  suffix = "",
  decimals = 0,
  started,
  prefersReduced = false,
}: AnimatedCounterProps) {
  const [val, setVal] = useState(from)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!started || hasRun.current) return
    hasRun.current = true
    if (prefersReduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVal(to)
      return
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(decimals > 0 ? parseFloat(v.toFixed(decimals)) : Math.round(v)),
    })
    return () => controls.stop()
  }, [started, from, to, duration, decimals, prefersReduced])

  return <>{decimals > 0 ? val.toFixed(decimals) : val}{suffix}</>
}
