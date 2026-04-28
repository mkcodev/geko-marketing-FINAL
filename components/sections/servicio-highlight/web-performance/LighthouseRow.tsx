"use client"

import { useRef, useEffect, useState } from "react"
import { animate } from "motion/react"

interface LighthouseRowProps {
  label: string
  score: number
  started: boolean
  delay: number
  prefersReduced?: boolean
}

export function LighthouseRow({ label, score, started, delay, prefersReduced = false }: LighthouseRowProps) {
  const color = score >= 90 ? "#22C55E" : score >= 50 ? "#F59E0B" : "#EF4444"
  const [current, setCurrent] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!started || hasRun.current) return
    hasRun.current = true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (prefersReduced) { setCurrent(score); return }
    const timer = setTimeout(() => {
      animate(0, score, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setCurrent(Math.round(v)),
      })
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [started, score, delay, prefersReduced])

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
        background: `${color}18`, border: `2px solid ${color}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        <svg width="36" height="36" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
          <circle cx="18" cy="18" r="15" fill="none" stroke={`${color}20`} strokeWidth="2" />
          <circle
            cx="18" cy="18" r="15"
            fill="none" stroke={color} strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 15}`}
            strokeDashoffset={`${2 * Math.PI * 15 * (1 - current / 100)}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
        <span style={{
          fontFamily: "var(--font-heading)", fontSize: "0.65rem",
          fontWeight: 800, color, position: "relative", zIndex: 1,
        }}>{current}</span>
      </div>
      <span style={{
        fontFamily: "var(--font-ui)", fontSize: "0.78rem",
        color: "var(--fg-secondary)",
      }}>{label}</span>
    </div>
  )
}
