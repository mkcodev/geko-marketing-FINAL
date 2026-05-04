"use client"

import { motion, useReducedMotion } from "motion/react"
import { TrendingUp, Users, Zap, BarChart3 } from "lucide-react"

// ── Glassmorphism token ─────────────────────────────────────────────────────
const glass = {
  background: "rgba(8, 8, 20, 0.52)",
  backdropFilter: "blur(22px)",
  WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.072)",
  boxShadow: "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
} as const

// ── Sparkline data (ROAS trend, 7 weeks) ────────────────────────────────────
const SPARK = [34, 48, 41, 65, 59, 76, 91]
const sparkPath = SPARK.map((v, i) => {
  const x = ((i / (SPARK.length - 1)) * 100).toFixed(1)
  const y = (100 - v).toFixed(1)
  return `${i === 0 ? "M" : "L"}${x} ${y}`
}).join(" ")
const fillPath = `${sparkPath} L100 100 L0 100Z`

// ── Entrance animation helper ─────────────────────────────────────────────
function entrance(prefersReduced: boolean | null, delay: number) {
  return {
    initial: prefersReduced ? (false as const) : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: prefersReduced
      ? { duration: 0 }
      : { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
  }
}

// ── Float animation helper ───────────────────────────────────────────────
function float(prefersReduced: boolean | null, yRange: [number, number], duration: number, delay = 0) {
  if (prefersReduced) return {}
  return {
    animate: { y: yRange },
    transition: {
      duration,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut" as const,
      delay,
    },
  }
}

export function HeroMetrics() {
  const prefersReduced = useReducedMotion()

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>

      {/* ── Ambient glows (behind cards) ──────────────────────────────────── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "18%", left: "15%",
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,45,124,0.22) 0%, transparent 68%)",
          filter: "blur(72px)",
        }} />
        <div style={{
          position: "absolute", bottom: "18%", right: "8%",
          width: 260, height: 260, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.18) 0%, transparent 68%)",
          filter: "blur(64px)",
        }} />
      </div>

      {/* ── Card A — ROAS (hero card, large) ──────────────────────────────── */}
      <motion.div
        {...entrance(prefersReduced, 0.28)}
        style={{ position: "absolute", top: 78, left: 0, zIndex: 2 }}
      >
        <motion.div
          {...float(prefersReduced, [-6, 5], 5.8)}
          style={{ ...glass, borderRadius: 22, padding: "22px 26px", width: 272 }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div>
              <p style={{
                fontFamily: "var(--font-ui)", fontSize: "0.65rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.32)", marginBottom: 8,
              }}>ROAS medio</p>
              <p style={{
                fontFamily: "var(--font-heading)", fontSize: "2.75rem", fontWeight: 800,
                letterSpacing: "-0.045em", lineHeight: 1,
                background: "linear-gradient(135deg, #C084FC 0%, #60A5FA 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>×4.2</p>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: "rgba(139,92,246,0.14)", border: "1px solid rgba(139,92,246,0.22)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <BarChart3 size={18} style={{ color: "#A78BFA" }} />
            </div>
          </div>

          {/* Sparkline */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ width: "100%", height: 50, display: "block", overflow: "visible" }}
          >
            <defs>
              <linearGradient id="hm-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(168,85,247,0.32)" />
                <stop offset="100%" stopColor="rgba(168,85,247,0)" />
              </linearGradient>
              <linearGradient id="hm-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
            <path d={fillPath} fill="url(#hm-fill)" />
            <path d={sparkPath} fill="none" stroke="url(#hm-line)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Last point — pulsing dot */}
            <circle cx="100" cy={100 - SPARK[SPARK.length - 1]} r="4.5" fill="#60A5FA" />
            <circle cx="100" cy={100 - SPARK[SPARK.length - 1]} r="8" fill="rgba(96,165,250,0.22)" />
          </svg>

          {/* Footer */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            marginTop: 12, paddingTop: 12,
            borderTop: "1px solid rgba(255,255,255,0.055)",
          }}>
            <TrendingUp size={11} style={{ color: "#34D399", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.67rem", color: "#34D399", fontWeight: 500 }}>
              +38% vs mes anterior
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Card B — Alcance semanal (top right) ──────────────────────────── */}
      <motion.div
        {...entrance(prefersReduced, 0.40)}
        style={{ position: "absolute", top: 8, right: 0, zIndex: 4 }}
      >
        <motion.div
          {...float(prefersReduced, [8, -4], 4.9, 1.4)}
          style={{ ...glass, borderRadius: 18, padding: "16px 20px", width: 168 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 9, flexShrink: 0,
              background: "rgba(29,78,216,0.16)", border: "1px solid rgba(29,78,216,0.26)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Users size={14} style={{ color: "#60A5FA" }} />
            </div>
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.62rem", fontWeight: 600,
              letterSpacing: "0.09em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.32)",
            }}>Alcance sem.</p>
          </div>
          <p style={{
            fontFamily: "var(--font-heading)", fontSize: "1.875rem", fontWeight: 800,
            letterSpacing: "-0.04em", lineHeight: 1,
            background: "linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: 8,
          }}>12.4K</p>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: "#34D399", fontWeight: 600 }}>↑ 23.5%</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.63rem", color: "rgba(255,255,255,0.24)" }}>esta sem.</span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Card C — Engagement rate (mid right) ──────────────────────────── */}
      <motion.div
        {...entrance(prefersReduced, 0.50)}
        style={{ position: "absolute", top: 250, right: 0, zIndex: 3 }}
      >
        <motion.div
          {...float(prefersReduced, [-5, 7], 6.4, 2.2)}
          style={{ ...glass, borderRadius: 18, padding: "16px 20px", width: 206 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <p style={{
                fontFamily: "var(--font-ui)", fontSize: "0.62rem", fontWeight: 600,
                letterSpacing: "0.09em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.32)", marginBottom: 5,
              }}>Engagement</p>
              <p style={{
                fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800,
                letterSpacing: "-0.04em", lineHeight: 1, color: "#C084FC",
              }}>8.3%</p>
            </div>
            <span style={{
              fontFamily: "var(--font-ui)", fontSize: "0.63rem", fontWeight: 700,
              padding: "3px 9px", borderRadius: 7,
              background: "rgba(52,211,153,0.11)", border: "1px solid rgba(52,211,153,0.22)",
              color: "#34D399", flexShrink: 0,
            }}>+247%</span>
          </div>

          {/* Comparison bars */}
          {[
            { label: "Tu cuenta", value: "8.3%", pct: "83%", bar: "linear-gradient(90deg,#7C3AED,#C084FC)", delay: 0.55 },
            { label: "Media sector", value: "2.1%", pct: "21%", bar: "rgba(255,255,255,0.14)", delay: 0.75 },
          ].map(row => (
            <div key={row.label} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.61rem", color: "rgba(255,255,255,0.36)" }}>{row.label}</span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.61rem", color: "rgba(255,255,255,0.52)", fontWeight: 600 }}>{row.value}</span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: row.pct }}
                  transition={{ duration: 1.3, delay: row.delay, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: "100%", borderRadius: 99, background: row.bar }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Card D — Campañas activas (bottom strip) ───────────────────────── */}
      <motion.div
        {...entrance(prefersReduced, 0.60)}
        style={{ position: "absolute", bottom: 32, left: 8, zIndex: 4 }}
      >
        <motion.div
          {...float(prefersReduced, [5, -5], 5.2, 0.8)}
          style={{ ...glass, borderRadius: 16, padding: "13px 18px", width: 238 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Zap size={15} style={{ color: "#34D399" }} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.88)", marginBottom: 2 }}>
                  3 campañas activas
                </p>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.62rem", color: "rgba(255,255,255,0.30)" }}>
                  Meta · Google · LinkedIn
                </p>
              </div>
            </div>
            {/* Pulsing live indicators */}
            <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
              {(["#E1306C", "#4285F4", "#0A66C2"] as const).map((c, i) => (
                <motion.div
                  key={c}
                  animate={prefersReduced ? {} : { opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" as const }}
                  style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: c, boxShadow: `0 0 7px ${c}AA`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

    </div>
  )
}
