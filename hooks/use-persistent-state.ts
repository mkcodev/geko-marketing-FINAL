"use client"

import { useState, useEffect, useCallback } from "react"

/**
 * useState that syncs with localStorage.
 * SSR-safe: initializes with `defaultValue` on first render.
 */
export function usePersistentState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(defaultValue)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored !== null) setState(JSON.parse(stored) as T)
    } catch {
      // corrupted entry — ignore and use default
    }
  }, [key])

  const set = useCallback(
    (value: T) => {
      setState(value)
      try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* quota exceeded */ }
    },
    [key]
  )

  return [state, set]
}
