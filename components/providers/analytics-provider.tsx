"use client"

import { useEffect, useRef } from "react"
import { Analytics } from "@/lib/analytics"

export function AnalyticsProvider() {
  const fired = useRef({ d50: false, d90: false })

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight
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
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return null
}
