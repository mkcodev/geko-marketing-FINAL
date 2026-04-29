"use client"

import { useMemo } from "react"
import { useReducedMotion } from "motion/react"

/**
 * Returns an array of Framer Motion transition objects, each staggered by `staggerMs`.
 * Respects `prefers-reduced-motion` — all delays collapse to 0 when set.
 *
 * @example
 * const delays = useStaggeredReveal(3, 120)
 * // delays[0] = { delay: 0 }, delays[1] = { delay: 0.12 }, delays[2] = { delay: 0.24 }
 */
export function useStaggeredReveal(
  count: number,
  staggerMs = 100
): Array<{ delay: number }> {
  const prefersReduced = useReducedMotion()

  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        delay: prefersReduced ? 0 : (i * staggerMs) / 1000,
      })),
    [count, staggerMs, prefersReduced]
  )
}
