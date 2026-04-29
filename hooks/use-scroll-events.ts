"use client"

import { useEffect } from "react"

export type ScrollCallback = (scrollY: number) => void

// Module-level singleton — one RAF loop, one native listener, N callbacks
const registry = new Set<ScrollCallback>()
let rafId: number | null = null
let dirty = false

function onNativeScroll() {
  dirty = true
}

function tick() {
  if (dirty) {
    dirty = false
    const y = window.scrollY
    registry.forEach((cb) => cb(y))
  }
  rafId = requestAnimationFrame(tick)
}

function ensureRunning() {
  if (rafId !== null) return
  window.addEventListener("scroll", onNativeScroll, { passive: true })
  dirty = true // read initial position on first frame
  rafId = requestAnimationFrame(tick)
}

function stopIfIdle() {
  if (registry.size > 0) return
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  window.removeEventListener("scroll", onNativeScroll)
}

/**
 * Subscribes to scroll events via a shared RAF loop.
 * Callback must be stable (wrap with useCallback in the caller).
 */
export function useScrollEvents(callback: ScrollCallback): void {
  useEffect(() => {
    registry.add(callback)
    ensureRunning()
    return () => {
      registry.delete(callback)
      stopIfIdle()
    }
  }, [callback])
}
