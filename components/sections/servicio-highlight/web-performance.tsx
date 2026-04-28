"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { EASE } from "@/lib/animations"
import { AnimatedCounter } from "./web-performance/AnimatedCounter"
import { PageSpeedGauge } from "./web-performance/PageSpeedGauge"
import { VitalBar } from "./web-performance/VitalBar"
import { BrowserWindow } from "./web-performance/BrowserWindow"
import { CodeBlock } from "./web-performance/CodeBlock"
import { LighthouseRow } from "./web-performance/LighthouseRow"

const TECH_STACK = [
  { name: "Next.js 16", color: "#ffffff", bg: "var(--border)" },
  { name: "React 19", color: "#61DAFB", bg: "rgba(97,218,251,0.10)" },
  { name: "TypeScript", color: "#3178C6", bg: "rgba(49,120,198,0.15)" },
  { name: "Tailwind v4", color: "#06B6D4", bg: "rgba(6,182,212,0.12)" },
  { name: "Vercel Edge", color: "#F0F0F0", bg: "rgba(240,240,240,0.07)" },
  { name: "Turbopack", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  { name: "PNPM", color: "#F69220", bg: "rgba(246,146,32,0.12)" },
  { name: "Framer Motion", color: "#E30082", bg: "rgba(227,0,130,0.12)" },
]

const VITAL_BARS = [
  { label: "LCP — Largest Contentful Paint", value: 1.2, unit: "s", threshold: 4, good: 2.5, delay: 0.3 },
  { label: "FID — First Input Delay", value: 8, unit: "ms", threshold: 300, good: 100, delay: 0.5 },
  { label: "CLS — Cumulative Layout Shift", value: 0.02, unit: "", threshold: 0.25, good: 0.1, delay: 0.7 },
  { label: "TTFB — Time to First Byte", value: 0.18, unit: "s", threshold: 1.8, good: 0.8, delay: 0.9 },
]

const LIGHTHOUSE_ROWS = [
  { label: "Rendimiento", score: 98, delay: 0.2 },
  { label: "Accesibilidad", score: 96, delay: 0.35 },
  { label: "Buenas prácticas", score: 100, delay: 0.5 },
  { label: "SEO técnico", score: 100, delay: 0.65 },
]

const STAT_BARS = [
  { val: 98, suffix: "/100", label: "Google PageSpeed", color: "#22C55E" },
  { val: 312, suffix: "%", label: "Más tráfico orgánico", color: "var(--color-geko-blue-light)" },
  { val: 0.8, suffix: "s", label: "Tiempo de carga medio", color: "var(--color-geko-purple-accent)", dec: 1 },
  { val: 100, suffix: "%", label: "SEO técnico desde día 1", color: "#F59E0B" },
]

export function WebPerformanceHighlight() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReduced = useReducedMotion() ?? false
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isMd = useMediaQuery("(min-width: 768px)")
  const started = inView || prefersReduced

  return (
    <section
      ref={ref}
      style={{
        paddingTop: isDesktop ? 100 : 72,
        paddingBottom: isDesktop ? 100 : 72,
        borderBottom: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
          background: "radial-gradient(ellipse, var(--color-geko-purple-a06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
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
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={inView || prefersReduced ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: isDesktop ? 72 : 48 }}
        >
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 9999,
            border: "1px solid rgba(59,130,246,0.35)", background: "var(--color-geko-blue-light-a10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#60A5FA", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 16,
          }}>Rendimiento técnico</span>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.875rem, 4vw, 3rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            marginBottom: 16,
          }}>
            La web más rápida del sector.{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--color-geko-blue-light) 0%, var(--color-geko-purple-accent) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Medible.</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: isMd ? "1.0625rem" : "0.9375rem",
            color: "var(--fg-muted)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7,
          }}>
            No hablamos de velocidad — la demostramos con datos. Cada web que entregamos pasa por un proceso de optimización exhaustivo antes de salir al mundo.
          </p>
        </motion.div>

        {/* Row 1: PageSpeed + Core Web Vitals + Lighthouse */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr 1fr" : isMd ? "1fr 1fr" : "1fr",
          gap: 16,
          marginBottom: 16,
        }}>
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 32 }}
            animate={inView || prefersReduced ? { opacity: 1, y: 0 } : {}}
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
              textTransform: "uppercase", color: "var(--fg-subtle)",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C3.686 1 1 3.686 1 7s2.686 6 6 6 6-2.686 6-6S10.314 1 7 1zm0 2l1.5 3h-3L7 3zm-4 5.5l2.5-1.5v3L3 8.5zm8 0l-2.5 1.5v-3L11 8.5z" fill="#22C55E" opacity="0.8"/>
              </svg>
              Google PageSpeed
            </div>
            <PageSpeedGauge score={98} started={started} prefersReduced={prefersReduced} />
            <div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "#22C55E", marginBottom: 4 }}>98 / 100</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--fg-muted)" }}>Rendimiento en móvil y escritorio</p>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 32 }}
            animate={inView || prefersReduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            style={{ borderRadius: 20, background: "var(--surface)", border: "1px solid var(--border)", padding: "24px" }}
          >
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--fg-subtle)",
              marginBottom: 20,
            }}>Core Web Vitals</p>
            {VITAL_BARS.map((v) => (
              <VitalBar key={v.label} {...v} started={started} prefersReduced={prefersReduced} />
            ))}
          </motion.div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 32 }}
            animate={inView || prefersReduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            style={{
              borderRadius: 20, background: "var(--surface)", border: "1px solid var(--border)", padding: "24px",
              gridColumn: isDesktop ? "auto" : isMd ? "1 / -1" : "auto",
            }}
          >
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--fg-subtle)",
              marginBottom: 20,
            }}>Lighthouse Audit</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {LIGHTHOUSE_ROWS.map((r) => (
                <LighthouseRow key={r.label} {...r} started={started} prefersReduced={prefersReduced} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Row 2: Browser comparison */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMd ? "1fr 1fr" : "1fr",
          gap: 16,
          marginBottom: 16,
        }}>
          {[
            { label: "Geko — Next.js optimizado", loadTime: "0.8s", isGood: true, delay: 0.4 },
            { label: "Web típica sin optimizar", loadTime: "4.2s", isGood: false, delay: 0.4 },
          ].map((b, i) => (
            <motion.div
              key={b.label}
              initial={prefersReduced ? false : { opacity: 0, y: 32 }}
              animate={inView || prefersReduced ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}
            >
              <BrowserWindow {...b} started={started} prefersReduced={prefersReduced} />
            </motion.div>
          ))}
        </div>

        {/* Row 3: Code editor + Tech stack */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap: 16,
          marginBottom: 16,
        }}>
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 32 }}
            animate={inView || prefersReduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            <CodeBlock started={started} prefersReduced={prefersReduced} />
          </motion.div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 32 }}
            animate={inView || prefersReduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            style={{ borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)", padding: "24px" }}
          >
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--fg-subtle)",
              marginBottom: 20,
            }}>Stack tecnológico</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TECH_STACK.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
                  animate={inView || prefersReduced ? { opacity: 1, scale: 1 } : {}}
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
              marginTop: 24, padding: "16px 20px", borderRadius: 12,
              background: "var(--color-geko-blue-light-a06)", border: "1px solid rgba(59,130,246,0.18)",
            }}>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--fg)", marginBottom: 6 }}>
                Sin código legacy. Sin compromisos.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--fg-muted)", lineHeight: 1.6 }}>
                Cada proyecto arranca desde cero con el stack más moderno disponible. No reutilizamos plantillas. No usamos page builders. Todo a medida.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Row 4: Stats bar */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={inView || prefersReduced ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.5, ease: EASE }}
          style={{
            borderRadius: 20,
            background: "var(--surface)",
            border: "1px solid var(--border-subtle)",
            padding: "24px 32px",
            display: "grid",
            gridTemplateColumns: isMd ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
            gap: 24,
          }}
        >
          {STAT_BARS.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 800, lineHeight: 1,
                color: stat.color, marginBottom: 6,
                filter: `drop-shadow(0 0 16px ${stat.color}50)`,
              }}>
                <AnimatedCounter
                  to={stat.val}
                  suffix={stat.suffix}
                  decimals={stat.dec ?? 0}
                  duration={2}
                  started={started}
                  prefersReduced={prefersReduced}
                />
              </p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--fg-muted)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
