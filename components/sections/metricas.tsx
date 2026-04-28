"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useT } from "@/hooks/use-translations"
import { EASE } from "@/lib/animations"
import { Section } from "@/components/ui/section"

const STAT_COLORS = ["var(--color-geko-purple-accent)", "var(--color-geko-blue-light)", "#10B981", "#F59E0B"]
const STAT_DECIMALS = [0, 1, 0, 1]

function useCounter(target: number, decimals: number, active: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const duration = 1800
    const start = performance.now()
    const frame = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(parseFloat((target * ease).toFixed(decimals)))
      if (p < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [active, target, decimals])
  return val
}

interface StatItem { value: number; suffix: string; label: string; sublabel: string; color: string; decimals: number }
function StatCard({ stat, index, inView }: { stat: StatItem; index: number; inView: boolean }) {
  const prefersReduced = useReducedMotion()
  const val = useCounter(stat.value, stat.decimals, inView)

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.55, delay: index * 0.10, ease: EASE }}
      style={{
        padding: "32px 28px",
        borderRadius: 20,
        background: "var(--surface)",
        border: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Glow */}
      <div aria-hidden style={{
        position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)",
        width: "80%", height: "60%", borderRadius: "50%",
        background: `radial-gradient(ellipse, ${stat.color}18 0%, transparent 70%)`,
        filter: "blur(24px)", pointerEvents: "none",
      }} />

      {/* Value */}
      <div style={{
        fontFamily: "var(--font-heading)",
        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
        fontWeight: 900,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        marginBottom: 12,
        color: stat.color,
        position: "relative",
      }}>
        {stat.decimals > 0 ? val.toFixed(stat.decimals) : Math.round(val)}
        <span style={{ fontSize: "0.65em", fontWeight: 700 }}>{stat.suffix}</span>
      </div>

      {/* Label */}
      <p style={{
        fontFamily: "var(--font-ui)", fontSize: "0.9rem", fontWeight: 600,
        color: "var(--fg)", lineHeight: 1.3, marginBottom: 6, position: "relative",
      }}>
        {stat.label}
      </p>
      <p style={{
        fontFamily: "var(--font-ui)", fontSize: "0.78rem",
        color: "var(--fg-muted)", lineHeight: 1.4, position: "relative",
      }}>
        {stat.sublabel}
      </p>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 40, height: 2, borderRadius: 999,
        background: stat.color, opacity: 0.5,
      }} />
    </motion.div>
  )
}

export function Metricas() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()
  const t = useT()

  return (
    <Section>
      <div ref={ref} className="section-container">
        {/* Header */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span style={{
            display: "inline-block", padding: "4px 12px", borderRadius: 9999,
            background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.25)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#10B981", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16,
          }}>
            Resultados reales
          </span>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: isDesktop ? "clamp(2rem, 3.5vw, 3rem)" : "clamp(1.75rem, 7vw, 2.5rem)",
            fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05,
            color: "var(--fg)", marginBottom: 14,
          }}>
            {t.metrics.headline}
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "1.0625rem",
            color: "var(--fg-secondary)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7,
          }}>
            Datos reales de clientes actuales. Sin humo, sin inventar.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
          gap: 16,
        }}>
          {t.metrics.items.map((item, i) => (
            <StatCard
              key={item.label}
              stat={{ ...item, color: STAT_COLORS[i], decimals: STAT_DECIMALS[i] }}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReduced ? { duration: 0 } : { delay: 0.6, duration: 0.4 }}
          style={{
            textAlign: "center", marginTop: 28,
            fontFamily: "var(--font-ui)", fontSize: "0.78rem",
            color: "var(--fg-subtle)",
          }}
        >
          * Datos medios de clientes activos 2023–2024. Resultados individuales pueden variar.
        </motion.p>
      </div>
    </Section>
  )
}
