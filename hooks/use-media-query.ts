"use client"

import { useState, useEffect } from "react"

/**
 * Hook SSR-safe para media queries.
 * Usa lazy initializer para leer el valor real en el primer render en cliente,
 * eliminando el hydration flash (CLS) que causaba el useState(false) anterior.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [query])

  return matches
}
