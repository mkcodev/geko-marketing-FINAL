"use client"

import { useRef, useEffect, useState } from "react"
import { animate } from "motion/react"
import { motion } from "motion/react"

interface PageSpeedGaugeProps {
  score: number
  started: boolean
  prefersReduced?: boolean
}

export function PageSpeedGauge({ score, started, prefersReduced = false }: PageSpeedGaugeProps) {
  const r = 54
  const circ = 2 * Math.PI * r
  const [progress, setProgress] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!started || hasRun.current) return
    hasRun.current = true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (prefersReduced) { setProgress(score); return }
    const controls = animate(0, score, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
    })
    return () => controls.stop()
  }, [started, score, prefersReduced])

  const offset = circ - (progress / 100) * circ * 0.75
  const color = progress >= 90 ? "#22C55E" : progress >= 50 ? "#F59E0B" : "#EF4444"

  return (
    <div style={{ position: "relative", width: 140, height: 140 }}>
      <svg width="140" height="140" style={{ transform: "rotate(135deg)" }}>
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth="10"
          strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
          strokeLinecap="round"
        />
        <motion.circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 8px ${color}90)`,
            transition: "stroke-dashoffset 0.05s linear, stroke 0.3s ease",
          }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 1,
      }}>
        <span style={{
          fontFamily: "var(--font-heading)", fontSize: "2rem",
          fontWeight: 800, lineHeight: 1,
          color,
          filter: `drop-shadow(0 0 12px ${color}60)`,
        }}>
          {progress}
        </span>
        <span style={{
          fontFamily: "var(--font-ui)", fontSize: "0.65rem",
          fontWeight: 500, letterSpacing: "0.08em",
          color: "var(--fg-muted)", textTransform: "uppercase",
        }}>Score</span>
      </div>
    </div>
  )
}
