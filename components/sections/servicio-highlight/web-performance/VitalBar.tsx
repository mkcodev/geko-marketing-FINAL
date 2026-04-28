"use client"

import { useRef, useEffect, useState } from "react"
import { animate } from "motion/react"
import { AnimatedCounter } from "./AnimatedCounter"

interface VitalBarProps {
  label: string
  value: number
  unit: string
  threshold: number
  good: number
  started: boolean
  delay: number
  prefersReduced?: boolean
}

export function VitalBar({
  label, value, unit, threshold, good, started, delay, prefersReduced = false,
}: VitalBarProps) {
  const pct = Math.min((value / threshold) * 100, 100)
  const [width, setWidth] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!started || hasRun.current) return
    hasRun.current = true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (prefersReduced) { setWidth(pct); return }
    const timer = setTimeout(() => {
      const controls = animate(0, pct, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setWidth(v),
      })
      return () => controls.stop()
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [started, pct, delay, prefersReduced])

  const isGood = value <= good
  const color = isGood ? "#22C55E" : value <= threshold ? "#F59E0B" : "#EF4444"
  const statusLabel = isGood ? "Bueno" : value <= threshold ? "Regular" : "Lento"

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "center" }}>
        <span style={{
          fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
          fontWeight: 500, color: "var(--fg-secondary)",
        }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontFamily: "var(--font-heading)", fontSize: "0.875rem",
            fontWeight: 700, color,
          }}>
            <AnimatedCounter to={value} decimals={value < 1 ? 2 : 1} suffix={` ${unit}`} started={started} />
          </span>
          <span style={{
            padding: "1px 7px", borderRadius: 4,
            background: `${color}18`, border: `1px solid ${color}35`,
            fontFamily: "var(--font-ui)", fontSize: "0.65rem",
            fontWeight: 600, color,
          }}>{statusLabel}</span>
        </div>
      </div>
      <div style={{
        height: 5, borderRadius: 9999,
        background: "var(--border-subtle)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 9999,
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}aa, ${color})`,
          boxShadow: `0 0 8px ${color}60`,
          transition: "width 0.05s linear",
        }} />
      </div>
    </div>
  )
}
