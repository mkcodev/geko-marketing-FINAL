"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

// ── Animated number counter ───────────────────────────────────
function Counter({ to, duration = 1.8, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef(false)
  const inView = useInView(useRef<HTMLSpanElement>(null), { once: true })

  // Trigger once parent is in view (passed via prop instead of useInView on the same el)
  useEffect(() => {
    if (!ref.current) return
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [to, duration])

  return <><span>{val}</span>{suffix}</>
}

// Triggered counter — starts when a boolean fires
function AnimatedCounter({
  to,
  from = 0,
  duration = 2,
  suffix = "",
  decimals = 0,
  started,
}: {
  to: number
  from?: number
  duration?: number
  suffix?: string
  decimals?: number
  started: boolean
}) {
  const [val, setVal] = useState(from)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!started || hasRun.current) return
    hasRun.current = true
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(decimals > 0 ? parseFloat(v.toFixed(decimals)) : Math.round(v)),
    })
    return () => controls.stop()
  }, [started, from, to, duration, decimals])

  return <>{decimals > 0 ? val.toFixed(decimals) : val}{suffix}</>
}

// ── PageSpeed Gauge ───────────────────────────────────────────
function PageSpeedGauge({ score, started }: { score: number; started: boolean }) {
  const r = 54
  const circ = 2 * Math.PI * r
  const [progress, setProgress] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!started || hasRun.current) return
    hasRun.current = true
    const controls = animate(0, score, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
    })
    return () => controls.stop()
  }, [started, score])

  const offset = circ - (progress / 100) * circ * 0.75 // 270° arc
  const color = progress >= 90 ? "#22C55E" : progress >= 50 ? "#F59E0B" : "#EF4444"

  return (
    <div style={{ position: "relative", width: 140, height: 140 }}>
      <svg width="140" height="140" style={{ transform: "rotate(135deg)" }}>
        {/* Track */}
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
          strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
          strokeLinecap="round"
        />
        {/* Progress */}
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
          color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
        }}>Score</span>
      </div>
    </div>
  )
}

// ── Core Web Vital bar ────────────────────────────────────────
function VitalBar({
  label, value, unit, threshold, good, started, delay,
}: {
  label: string; value: number; unit: string
  threshold: number; good: number; started: boolean; delay: number
}) {
  const [width, setWidth] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!started || hasRun.current) return
    hasRun.current = true
    const pct = Math.min((value / threshold) * 100, 100)
    const timer = setTimeout(() => {
      const controls = animate(0, pct, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setWidth(v),
      })
      return () => controls.stop()
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [started, value, threshold, delay])

  const isGood = value <= good
  const color = isGood ? "#22C55E" : value <= threshold ? "#F59E0B" : "#EF4444"
  const label2 = isGood ? "Bueno" : value <= threshold ? "Regular" : "Lento"

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "center" }}>
        <span style={{
          fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
          fontWeight: 500, color: "rgba(255,255,255,0.65)",
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
          }}>{label2}</span>
        </div>
      </div>
      <div style={{
        height: 5, borderRadius: 9999,
        background: "rgba(255,255,255,0.06)",
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

// ── Browser window mockup ─────────────────────────────────────
function BrowserWindow({
  label, loadTime, isGood, started, delay,
}: {
  label: string; loadTime: string; isGood: boolean; started: boolean; delay: number
}) {
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!started || hasRun.current) return
    hasRun.current = true
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
  }, [started, isGood, delay])

  const barColor = isGood ? "#22C55E" : "#EF4444"

  return (
    <div style={{
      borderRadius: 14,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      overflow: "hidden",
      flex: 1,
    }}>
      {/* Window chrome */}
      <div style={{
        padding: "10px 14px",
        background: "rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
        <div style={{
          flex: 1, height: 20, borderRadius: 4,
          background: "rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center",
          paddingLeft: 8,
        }}>
          <span style={{
            fontFamily: "var(--font-ui)", fontSize: "0.65rem",
            color: "rgba(255,255,255,0.25)",
          }}>geko-marketing.com</span>
        </div>
      </div>

      {/* Loading bar */}
      <div style={{ height: 2, background: "rgba(255,255,255,0.04)" }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: barColor,
          boxShadow: `0 0 6px ${barColor}`,
          transition: "width 0.05s linear",
        }} />
      </div>

      {/* Content skeleton → loaded */}
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
              {/* Hero skeleton */}
              <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ height: 12, borderRadius: 4, background: "rgba(255,255,255,0.06)", marginBottom: 6, width: "70%" }} />
                  <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.04)", marginBottom: 4, width: "90%" }} />
                  <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.04)", width: "60%" }} />
                  <div style={{ height: 22, borderRadius: 6, background: "rgba(107,45,124,0.20)", marginTop: 10, width: "40%" }} />
                </div>
                <div style={{ width: 60, height: 60, borderRadius: 8, background: "rgba(255,255,255,0.04)", flexShrink: 0 }} />
              </div>
              {[80, 60, 90, 50].map((w, i) => (
                <div key={i} style={{
                  height: 7, borderRadius: 4,
                  background: "rgba(255,255,255,0.035)",
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
              {/* Rendered content */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.875rem", fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>
                    {isGood ? "Tu web" : "Web antigua"}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>
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
                { w: 40, c: "#6B2D7C", h: 8 },
                { w: 75, c: "rgba(255,255,255,0.10)", h: 6 },
                { w: 55, c: "rgba(255,255,255,0.07)", h: 6 },
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

      {/* Footer: load time badge */}
      <div style={{
        padding: "8px 14px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", color: "rgba(255,255,255,0.25)" }}>
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

// ── Code → Visual transform ───────────────────────────────────
const CODE_LINES = [
  { indent: 0, content: "<", accent: "tag", rest: "Page", close: ">" },
  { indent: 1, content: "<", accent: "tag", rest: "Hero title", close: ' loading="eager" />' },
  { indent: 1, content: "<", accent: "tag", rest: "Image", close: ' priority width={1200} />' },
  { indent: 1, content: "<", accent: "tag", rest: "Section", close: ">" },
  { indent: 2, content: "<", accent: "tag", rest: "Feature", close: " />" },
  { indent: 1, content: "</", accent: "tag", rest: "Section", close: ">" },
  { indent: 0, content: "</", accent: "tag", rest: "Page", close: ">" },
]

function CodeBlock({ started }: { started: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (!started) return
    let i = 0
    const timer = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i >= CODE_LINES.length) clearInterval(timer)
    }, 200)
    return () => clearInterval(timer)
  }, [started])

  return (
    <div style={{
      borderRadius: 14,
      background: "#0d0d1a",
      border: "1px solid rgba(107,45,124,0.25)",
      overflow: "hidden",
      fontFamily: "'Geist Variable', monospace",
      fontSize: "0.78rem",
      lineHeight: 1.7,
    }}>
      {/* Editor header */}
      <div style={{
        padding: "10px 14px",
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: "rgba(255,255,255,0.25)" }}>
          page.tsx — Next.js 16
        </span>
        <div style={{
          marginLeft: "auto",
          padding: "1px 7px", borderRadius: 4,
          background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)",
          fontFamily: "var(--font-ui)", fontSize: "0.6rem", color: "#22C55E",
        }}>✓ 0 errors</div>
      </div>

      <div style={{ padding: "12px 0" }}>
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={i < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{
              padding: "0 16px",
              display: "flex",
              gap: 0,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.18)", marginRight: 16, minWidth: 20, textAlign: "right", userSelect: "none" }}>
              {i + 1}
            </span>
            <span>
              {"  ".repeat(line.indent)}
              <span style={{ color: "rgba(155,77,188,0.90)" }}>{line.content}</span>
              <span style={{ color: "#60A5FA" }}>{line.rest}</span>
              <span style={{ color: "rgba(155,77,188,0.90)" }}>{line.close}</span>
            </span>
          </motion.div>
        ))}
        {/* Cursor */}
        {visibleLines < CODE_LINES.length && (
          <div style={{ padding: "0 16px", display: "flex", gap: 16 }}>
            <span style={{ color: "rgba(255,255,255,0.18)", minWidth: 20, textAlign: "right" }}>
              {visibleLines + 1}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ color: "#9B4DBC" }}
            >▌</motion.span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Tech stack pills ──────────────────────────────────────────
const TECH_STACK = [
  { name: "Next.js 16", color: "#ffffff", bg: "rgba(255,255,255,0.08)" },
  { name: "React 19", color: "#61DAFB", bg: "rgba(97,218,251,0.10)" },
  { name: "TypeScript", color: "#3178C6", bg: "rgba(49,120,198,0.15)" },
  { name: "Tailwind v4", color: "#06B6D4", bg: "rgba(6,182,212,0.12)" },
  { name: "Vercel Edge", color: "#F0F0F0", bg: "rgba(240,240,240,0.07)" },
  { name: "Turbopack", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  { name: "PNPM", color: "#F69220", bg: "rgba(246,146,32,0.12)" },
  { name: "Framer Motion", color: "#E30082", bg: "rgba(227,0,130,0.12)" },
]

// ── Lighthouse row ────────────────────────────────────────────
function LighthouseRow({ label, score, started, delay }: {
  label: string; score: number; started: boolean; delay: number
}) {
  const color = score >= 90 ? "#22C55E" : score >= 50 ? "#F59E0B" : "#EF4444"
  const [current, setCurrent] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!started || hasRun.current) return
    hasRun.current = true
    const timer = setTimeout(() => {
      animate(0, score, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setCurrent(Math.round(v)),
      })
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [started, score, delay])

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
        color: "rgba(255,255,255,0.55)",
      }}>{label}</span>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────
export function WebPerformanceHighlight() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isMd = useMediaQuery("(min-width: 768px)")

  return (
    <section
      ref={ref}
      style={{
        paddingTop: isDesktop ? 100 : 72,
        paddingBottom: isDesktop ? 100 : 72,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "0%", left: "50%",
          transform: "translateX(-50%)",
          width: "80%", height: "60%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", bottom: "0", right: "0",
          width: "40%", height: "50%",
          background: "radial-gradient(ellipse, rgba(107,45,124,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        {/* Grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)",
        }} />
      </div>

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: isDesktop ? 72 : 48 }}
        >
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 9999,
            border: "1px solid rgba(59,130,246,0.35)", background: "rgba(59,130,246,0.10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#60A5FA", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 16,
          }}>Rendimiento técnico</span>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.875rem, 4vw, 3rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "rgba(255,255,255,0.96)",
            marginBottom: 16,
          }}>
            La web más rápida del sector.{" "}
            <span style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #9B4DBC 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Medible.</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: isMd ? "1.0625rem" : "0.9375rem",
            color: "rgba(255,255,255,0.40)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7,
          }}>
            No hablamos de velocidad — la demostramos con datos. Cada web que entregamos pasa por un proceso de optimización exhaustivo antes de salir al mundo.
          </p>
        </motion.div>

        {/* ── Row 1: PageSpeed + Core Web Vitals + Lighthouse ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr 1fr" : isMd ? "1fr 1fr" : "1fr",
          gap: 16,
          marginBottom: 16,
        }}>

          {/* PageSpeed Gauge */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{
              borderRadius: 20,
              background: "rgba(34,197,94,0.04)",
              border: "1px solid rgba(34,197,94,0.15)",
              padding: "28px 24px",
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 16, textAlign: "center",
            }}
          >
            <div style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.28)",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C3.686 1 1 3.686 1 7s2.686 6 6 6 6-2.686 6-6S10.314 1 7 1zm0 2l1.5 3h-3L7 3zm-4 5.5l2.5-1.5v3L3 8.5zm8 0l-2.5 1.5v-3L11 8.5z" fill="#22C55E" opacity="0.8"/>
              </svg>
              Google PageSpeed
            </div>
            <PageSpeedGauge score={98} started={inView} />
            <div>
              <p style={{
                fontFamily: "var(--font-heading)", fontSize: "1rem",
                fontWeight: 700, color: "#22C55E", marginBottom: 4,
              }}>98 / 100</p>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "0.78rem",
                color: "rgba(255,255,255,0.30)",
              }}>Rendimiento en móvil y escritorio</p>
            </div>
          </motion.div>

          {/* Core Web Vitals */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            style={{
              borderRadius: 20,
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "24px",
            }}
          >
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.28)",
              marginBottom: 20,
            }}>Core Web Vitals</p>
            <VitalBar label="LCP — Largest Contentful Paint" value={1.2} unit="s" threshold={4} good={2.5} started={inView} delay={0.3} />
            <VitalBar label="FID — First Input Delay" value={8} unit="ms" threshold={300} good={100} started={inView} delay={0.5} />
            <VitalBar label="CLS — Cumulative Layout Shift" value={0.02} unit="" threshold={0.25} good={0.1} started={inView} delay={0.7} />
            <VitalBar label="TTFB — Time to First Byte" value={0.18} unit="s" threshold={1.8} good={0.8} started={inView} delay={0.9} />
          </motion.div>

          {/* Lighthouse scores */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            style={{
              borderRadius: 20,
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "24px",
              gridColumn: isDesktop ? "auto" : isMd ? "1 / -1" : "auto",
            }}
          >
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.28)",
              marginBottom: 20,
            }}>Lighthouse Audit</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <LighthouseRow label="Rendimiento" score={98} started={inView} delay={0.2} />
              <LighthouseRow label="Accesibilidad" score={96} started={inView} delay={0.35} />
              <LighthouseRow label="Buenas prácticas" score={100} started={inView} delay={0.5} />
              <LighthouseRow label="SEO técnico" score={100} started={inView} delay={0.65} />
            </div>
          </motion.div>
        </div>

        {/* ── Row 2: Browser comparison ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMd ? "1fr 1fr" : "1fr",
          gap: 16,
          marginBottom: 16,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          >
            <BrowserWindow
              label="Geko — Next.js optimizado"
              loadTime="0.8s"
              isGood={true}
              started={inView}
              delay={0.4}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          >
            <BrowserWindow
              label="Web típica sin optimizar"
              loadTime="4.2s"
              isGood={false}
              started={inView}
              delay={0.4}
            />
          </motion.div>
        </div>

        {/* ── Row 3: Code editor + Tech stack ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap: 16,
          marginBottom: 16,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            <CodeBlock started={inView} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            style={{
              borderRadius: 14,
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "24px",
            }}
          >
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.28)",
              marginBottom: 20,
            }}>Stack tecnológico</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TECH_STACK.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.06, type: "spring", stiffness: 300 }}
                  style={{
                    padding: "5px 12px", borderRadius: 8,
                    background: tech.bg,
                    border: `1px solid ${tech.color}20`,
                    fontFamily: "var(--font-ui)", fontSize: "0.78rem",
                    fontWeight: 500, color: tech.color,
                    whiteSpace: "nowrap",
                  }}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>

            <div style={{
              marginTop: 24,
              padding: "16px 20px",
              borderRadius: 12,
              background: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(59,130,246,0.18)",
            }}>
              <p style={{
                fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
                fontWeight: 600, color: "rgba(255,255,255,0.75)",
                marginBottom: 6,
              }}>Sin código legacy. Sin compromisos.</p>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "0.78rem",
                color: "rgba(255,255,255,0.35)", lineHeight: 1.6,
              }}>
                Cada proyecto arranca desde cero con el stack más moderno disponible. No reutilizamos plantillas. No usamos page builders. Todo a medida.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Row 4: Stat bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.5, ease: EASE }}
          style={{
            borderRadius: 20,
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "24px 32px",
            display: "grid",
            gridTemplateColumns: isMd ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
            gap: 24,
          }}
        >
          {[
            { val: 98, suffix: "/100", label: "Google PageSpeed", color: "#22C55E" },
            { val: 312, suffix: "%", label: "Más tráfico orgánico", color: "#3B82F6" },
            { val: 0.8, suffix: "s", label: "Tiempo de carga medio", color: "#9B4DBC", dec: 1 },
            { val: 100, suffix: "%", label: "SEO técnico desde día 1", color: "#F59E0B" },
          ].map((stat, i) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 800, lineHeight: 1,
                color: stat.color,
                marginBottom: 6,
                filter: `drop-shadow(0 0 16px ${stat.color}50)`,
              }}>
                <AnimatedCounter
                  to={stat.val}
                  suffix={stat.suffix}
                  decimals={stat.dec ?? 0}
                  duration={2}
                  started={inView}
                />
              </p>
              <p style={{
                fontFamily: "var(--font-ui)", fontSize: "0.75rem",
                color: "rgba(255,255,255,0.35)",
              }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
