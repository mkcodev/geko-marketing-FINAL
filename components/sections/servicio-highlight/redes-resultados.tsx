"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "motion/react"
import type { PortfolioItem } from "@/constants/services-detalle"
import { Icon } from "@/lib/icons"
import { EASE } from "@/lib/animations"

// ── Animated counter ──────────────────────────────────────────
function useCounter(target: number, decimals: number, duration: number, triggered: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!triggered) return
    const start = performance.now()
    const raf = requestAnimationFrame(function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(parseFloat((target * eased).toFixed(decimals)))
      if (t < 1) requestAnimationFrame(tick)
      else setValue(target)
    })
    return () => cancelAnimationFrame(raf)
  }, [target, decimals, duration, triggered])
  return value
}

function formatMetricDisplay(raw: string, counted: number): string {
  if (raw.startsWith("+")) return `+${Math.round(counted)}%`
  if (raw.startsWith("×")) return `×${counted.toFixed(1)}`
  // thousands with dot separator (12.400)
  return Math.round(counted).toLocaleString("es-ES")
}

function parseMetric(raw: string): { target: number; decimals: number } {
  if (raw.startsWith("+")) return { target: parseInt(raw.replace(/\D/g, "")), decimals: 0 }
  if (raw.startsWith("×")) return { target: parseFloat(raw.slice(1)), decimals: 1 }
  return { target: parseFloat(raw.replace(/\./g, "").replace(",", ".")), decimals: 0 }
}

// ── Sparkline SVG ─────────────────────────────────────────────
function Sparkline({ color, triggered }: { color: string; triggered: boolean }) {
  const points = [8, 22, 14, 36, 28, 44, 35, 58, 48, 52, 62, 72, 75, 80, 88, 95]
  const w = 120, h = 40
  const max = Math.max(...points)
  const coords = points.map((p, i) => [
    (i / (points.length - 1)) * w,
    h - (p / max) * (h - 4) - 2,
  ])
  const path = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
  const fill = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
    + ` L${w},${h} L0,${h} Z`

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id={`sfill-${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`spark-clip-${color.slice(1)}`}>
          <motion.rect
            x="0" y="0" height={h}
            initial={{ width: 0 }}
            animate={triggered ? { width: w } : { width: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          />
        </clipPath>
      </defs>
      <path d={fill} fill={`url(#sfill-${color.slice(1)})`} clipPath={`url(#spark-clip-${color.slice(1)})`} />
      <path
        d={path}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath={`url(#spark-clip-${color.slice(1)})`}
      />
      {/* End dot */}
      {triggered && (
        <motion.circle
          cx={coords[coords.length - 1][0]}
          cy={coords[coords.length - 1][1]}
          r="3"
          fill={color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.3 }}
        />
      )}
    </svg>
  )
}

// ── Single case card ──────────────────────────────────────────
function CaseCard({ item, index, triggered }: { item: PortfolioItem; index: number; triggered: boolean }) {
  const { target, decimals } = parseMetric(item.metric)
  const counted = useCounter(target, decimals, 1800, triggered)
  const display = triggered ? formatMetricDisplay(item.metric, counted) : "—"

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={triggered ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: EASE }}
      style={{
        borderRadius: 22,
        overflow: "hidden",
        background: "var(--surface)",
        border: `1px solid ${item.color}25`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: `0 8px 40px ${item.color}08`,
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, borderRadius: 22,
        background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${item.color}10 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Top gradient band */}
      <div style={{
        height: 140, position: "relative",
        background: `linear-gradient(135deg, ${item.color}18 0%, rgba(8,8,16,0.4) 100%)`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        borderBottom: `1px solid ${item.color}15`,
      }}>
        {/* Watermark number */}
        <div style={{
          position: "absolute", right: 16, bottom: -8,
          fontFamily: "var(--font-heading)", fontSize: "4rem",
          fontWeight: 900, color: `${item.color}10`,
          lineHeight: 1, letterSpacing: "-0.04em",
          userSelect: "none",
        }}>{String(index + 1).padStart(2, "0")}</div>

        <Icon name={item.icon} size={44} style={{
          color: item.color, opacity: 0.9,
          filter: `drop-shadow(0 0 16px ${item.color}80)`,
        }} />

        {/* Confidential badge */}
        <span style={{
          position: "absolute", top: 12, left: 12,
          padding: "3px 10px", borderRadius: 6,
          background: "rgba(8,8,16,0.80)",
          border: "1px solid var(--border)",
          fontFamily: "var(--font-ui)", fontSize: "0.65rem",
          color: "var(--fg-muted)",
          letterSpacing: "0.03em",
        }}>Caso confidencial</span>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Sector tag */}
        <span style={{
          display: "inline-flex", alignSelf: "flex-start",
          padding: "3px 10px", borderRadius: 6, marginBottom: 14,
          background: `${item.color}15`,
          border: `1px solid ${item.color}25`,
          fontFamily: "var(--font-ui)", fontSize: "0.7rem",
          color: item.color, fontWeight: 500,
        }}>{item.sector}</span>

        {/* Big metric */}
        <div style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
          fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em",
          color: item.color,
          marginBottom: 6,
          textShadow: `0 0 32px ${item.color}60`,
        }}>
          {display}
        </div>

        <p style={{
          fontFamily: "var(--font-ui)", fontSize: "0.875rem",
          color: "var(--fg-secondary)", marginBottom: 20,
          lineHeight: 1.4,
        }}>{item.metricNote}</p>

        {/* Sparkline */}
        <div style={{ marginBottom: 16 }}>
          <Sparkline color={item.color} triggered={triggered} />
        </div>

        {/* Label */}
        <div style={{
          marginTop: "auto",
          display: "flex", alignItems: "center", gap: 8,
          paddingTop: 16,
          borderTop: "1px solid var(--border-subtle)",
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: item.color, flexShrink: 0,
            boxShadow: `0 0 8px ${item.color}`,
          }} />
          <span style={{
            fontFamily: "var(--font-ui)", fontSize: "0.78rem",
            color: "var(--fg-muted)",
          }}>{item.label}</span>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────
export function RedesResultados({ portfolio }: { portfolio: PortfolioItem[] }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 16 }}
        >
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 9999,
            border: "1px solid var(--color-geko-purple-a35)", background: "var(--color-geko-purple-a10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "var(--color-geko-purple-accent)", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 14,
          }}>Resultados reales</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em",
            color: "var(--fg)",
            marginBottom: 10,
          }}>
            Clientes que ya lo están notando
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "1rem",
            color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 540,
          }}>
            Datos reales de clientes actuales. Por confidencialidad no mostramos nombres ni cuentas.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
          marginTop: 40,
        }}>
          {portfolio.map((item, i) => (
            <CaseCard key={item.label} item={item} index={i} triggered={inView} />
          ))}
        </div>

        {/* Trust note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            marginTop: 32,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: -4 }}>
            {["#E1306C","var(--color-geko-purple-accent)","#10B981"].map((c, i) => (
              <div key={c} style={{
                width: 24, height: 24, borderRadius: "50%",
                background: `${c}30`, border: `2px solid rgba(8,8,16,1)`,
                marginLeft: i > 0 ? -8 : 0,
              }} />
            ))}
          </div>
          <span style={{
            fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
            color: "var(--fg-subtle)",
          }}>Negocios reales en Madrid · Resultados verificables</span>
        </motion.div>
      </div>
    </section>
  )
}
