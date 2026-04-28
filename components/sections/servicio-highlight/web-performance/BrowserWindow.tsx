"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence, animate } from "motion/react"
import { EASE } from "@/lib/animations"

interface BrowserWindowProps {
  label: string
  loadTime: string
  isGood: boolean
  started: boolean
  delay: number
  prefersReduced?: boolean
}

export function BrowserWindow({
  label, loadTime, isGood, started, delay, prefersReduced = false,
}: BrowserWindowProps) {
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!started || hasRun.current) return
    hasRun.current = true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (prefersReduced) { setProgress(100); setLoaded(true); return }
    const timer = setTimeout(() => {
      const totalDuration = isGood ? 0.6 : 3.2
      const controls = animate(0, 100, {
        duration: totalDuration,
        ease: isGood ? [0.16, 1, 0.3, 1] : "linear",
        onUpdate: (v) => setProgress(Math.round(v)),
        onComplete: () => setLoaded(true),
      })
      return () => controls.stop()
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [started, isGood, delay, prefersReduced])

  const barColor = isGood ? "#22C55E" : "#EF4444"

  return (
    <div style={{
      borderRadius: 14,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      overflow: "hidden",
      flex: 1,
    }}>
      <div style={{
        padding: "10px 14px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: 20, borderRadius: 4,
          background: "var(--border-subtle)",
          display: "flex", alignItems: "center",
          paddingLeft: 8,
        }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: "var(--fg-subtle)" }}>
            geko-marketing.com
          </span>
        </div>
      </div>

      <div style={{ height: 2, background: "var(--surface)" }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: barColor,
          boxShadow: `0 0 6px ${barColor}`,
          transition: "width 0.05s linear",
        }} />
      </div>

      <div style={{ padding: 14, minHeight: 160 }}>
        <AnimatePresence mode="wait">
          {!loaded ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ height: 12, borderRadius: 4, background: "var(--border-subtle)", marginBottom: 6, width: "70%" }} />
                  <div style={{ height: 8, borderRadius: 4, background: "var(--surface)", marginBottom: 4, width: "90%" }} />
                  <div style={{ height: 8, borderRadius: 4, background: "var(--surface)", width: "60%" }} />
                  <div style={{ height: 22, borderRadius: 6, background: "var(--color-geko-purple-a20)", marginTop: 10, width: "40%" }} />
                </div>
                <div style={{ width: 60, height: 60, borderRadius: 8, background: "var(--surface)", flexShrink: 0 }} />
              </div>
              {[80, 60, 90, 50].map((w, i) => (
                <div key={i} style={{
                  height: 7, borderRadius: 4,
                  background: "var(--surface)",
                  width: `${w}%`,
                  animation: `shimmer 1.6s ease-in-out ${i * 0.15}s infinite`,
                }} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="loaded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.875rem", fontWeight: 700, color: "var(--fg)", marginBottom: 4 }}>
                    {isGood ? "Tu web" : "Web antigua"}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--fg-muted)", lineHeight: 1.5 }}>
                    {isGood ? "Cargada al instante.\nEl usuario ya está comprando." : "Cargando... el usuario ya se fue."}
                  </div>
                  {isGood && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        marginTop: 8, padding: "3px 8px", borderRadius: 5,
                        background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.30)",
                        fontFamily: "var(--font-ui)", fontSize: "0.65rem", fontWeight: 600, color: "#22C55E",
                      }}
                    >
                      ✓ {loadTime}
                    </motion.div>
                  )}
                </div>
                {!isGood && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{
                      width: 18, height: 18, borderRadius: "50%",
                      border: "2px solid rgba(239,68,68,0.3)",
                      borderTopColor: "#EF4444",
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
              {isGood && [
                { w: 40, c: "var(--color-geko-purple)", h: 8 },
                { w: 75, c: "var(--border-strong)", h: 6 },
                { w: 55, c: "var(--border-subtle)", h: 6 },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ width: 0 }}
                  animate={{ width: `${b.w}%` }}
                  transition={{ delay: 0.1 * i, duration: 0.5, ease: EASE }}
                  style={{ height: b.h, borderRadius: 4, background: b.c, marginBottom: 6 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{
        padding: "8px 14px",
        borderTop: "1px solid var(--border-subtle)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", color: "var(--fg-subtle)" }}>
          {label}
        </span>
        <span style={{
          fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700,
          color: isGood ? "#22C55E" : "#EF4444",
        }}>
          {loadTime}
        </span>
      </div>
    </div>
  )
}
