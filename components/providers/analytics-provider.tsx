"use client"

import { useRef, useCallback } from "react"
import { useScrollEvents } from "@/hooks/use-scroll-events"
import { Analytics } from "@/lib/analytics"

export function AnalyticsProvider() {
  const fired = useRef({ d50: false, d90: false })

  const handleScroll = useCallback((scrollY: number) => {
    const scrolled = scrollY + window.innerHeight
    const total = document.documentElement.scrollHeight
    const pct = (scrolled / total) * 100
    if (!fired.current.d50 && pct >= 50) {
      fired.current.d50 = true
      Analytics.scroll50()
    }
    if (!fired.current.d90 && pct >= 90) {
      fired.current.d90 = true
      Analytics.scroll90()
    }
  }, [])
  useScrollEvents(handleScroll)

  return null
}
