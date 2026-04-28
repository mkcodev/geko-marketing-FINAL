"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { EASE } from "@/lib/animations"
import { useT } from "@/hooks/use-translations"

type FeatureValue = "yes" | "partial" | "no"

const COLUMN_VALUES: Record<string, FeatureValue[]> = {
  geko:      ["yes","yes","yes","yes","yes","yes","yes","yes","yes"],
  agencia:   ["yes","yes","yes","yes","partial","no","no","no","no"],
  freelance: ["partial","partial","partial","partial","no","partial","yes","yes","no"],
  solo:      ["no","no","no","no","no","yes","yes","yes","no"],
}

function FeatureIcon({ value, color }: { value: FeatureValue; color: string }) {
  if (value === "yes") return (
    <span style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: 22, height: 22, borderRadius: 6,
      background: `${color}18`, border: `1px solid ${color}35`,
      fontSize: "0.75rem", color,
    }}>✓</span>
  )
  if (value === "partial") return (
    <span style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: 22, height: 22, borderRadius: 6,
      background: "var(--surface)", border: "1px solid var(--border-strong)",
      fontSize: "0.75rem", color: "var(--fg-muted)",
    }}>~</span>
  )
  return (
    <span style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: 22, height: 22, borderRadius: 6,
      background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)",
      fontSize: "0.75rem", color: "rgba(239,68,68,0.50)",
    }}>✗</span>
  )
}

export function ComparativaTabla() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const isMedium = useMediaQuery("(min-width: 480px)")
  const prefersReduced = useReducedMotion()

  const FEATURES = t.compare.features

  const COLUMNS = [
    { id: "geko",      name: "Geko",                          price: t.compare.columns.geko.price,      priceNote: t.compare.columns.geko.priceNote,      highlight: true,  badge: t.compare.columns.geko.badge,      color: "var(--color-geko-purple-accent)", values: COLUMN_VALUES.geko },
    { id: "agencia",   name: t.compare.columns.agencia.name,  price: t.compare.columns.agencia.price,   priceNote: t.compare.columns.agencia.priceNote,   highlight: false, color: "#64748B", values: COLUMN_VALUES.agencia },
    { id: "freelance", name: t.compare.columns.freelance.name,price: t.compare.columns.freelance.price, priceNote: t.compare.columns.freelance.priceNote, highlight: false, color: "#64748B", values: COLUMN_VALUES.freelance },
    { id: "solo",      name: t.compare.columns.solo.name,     price: t.compare.columns.solo.price,      priceNote: t.compare.columns.solo.priceNote,      highlight: false, color: "#64748B", values: COLUMN_VALUES.solo },
  ]

  return (
    <section
      ref={ref}
      style={{
        paddingTop: "var(--section-padding-v)",
        paddingBottom: "var(--section-padding-v)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: "60%", height: "50%", borderRadius: "50%",
          background: "radial-gradient(ellipse, var(--color-geko-blue-a07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
      </div>

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.55, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span style={{
            display: "inline-block",
            padding: "4px 14px", borderRadius: 9999,
            border: "1px solid var(--color-geko-purple-a35)",
            background: "var(--color-geko-purple-a10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "var(--color-geko-purple-accent)", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 16,
          }}>
            {t.compare.label}
          </span>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
            fontWeight: 800, lineHeight: 1.15,
            letterSpacing: "-0.025em",
            color: "var(--fg)",
            marginBottom: 14,
          }}>
            {t.compare.headline}
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "1rem",
            color: "var(--fg-secondary)", maxWidth: 460, margin: "0 auto",
          }}>
            {t.compare.subheadline}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop
            ? "repeat(4, 1fr)"
            : isMedium
              ? "repeat(2, 1fr)"
              : "1fr",
          gap: 12,
          alignItems: "start",
        }}>
          {COLUMNS.map((col, ci) => (
            <motion.div
              key={col.id}
              initial={prefersReduced ? false : { opacity: 0, y: 28 }}
              animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.5, delay: ci * 0.08, ease: EASE }}
              style={{
                borderRadius: 18,
                background: col.highlight
                  ? "var(--color-geko-purple-a08)"
                  : "var(--surface)",
                border: col.highlight
                  ? "1px solid var(--color-geko-purple-a35)"
                  : "1px solid var(--border-subtle)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Top glow for Geko */}
              {col.highlight && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg, var(--color-geko-purple), var(--color-geko-purple-accent), var(--color-geko-blue-light))",
                }} />
              )}

              {/* Header */}
              <div style={{
                padding: "20px 20px 16px",
                borderBottom: "1px solid var(--border-subtle)",
              }}>
                {col.badge && (
                  <span style={{
                    display: "inline-block",
                    padding: "2px 10px", borderRadius: 9999,
                    background: "var(--color-geko-purple-a20)",
                    border: "1px solid var(--color-geko-purple-a40)",
                    fontFamily: "var(--font-ui)", fontSize: "0.68rem", fontWeight: 600,
                    color: "var(--color-geko-purple-accent)", letterSpacing: "0.04em",
                    marginBottom: 10,
                  }}>
                    {col.badge}
                  </span>
                )}
                <p style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.1rem",
                  fontWeight: 700, color: col.highlight ? "var(--fg)" : "var(--fg-secondary)",
                  marginBottom: 4,
                }}>{col.name}</p>
                <p style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.875rem",
                  fontWeight: 700,
                  color: col.highlight ? col.color : "var(--fg-muted)",
                }}>{col.price}</p>
                <p style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.72rem",
                  color: "var(--fg-subtle)", marginTop: 2,
                }}>{col.priceNote}</p>
              </div>

              {/* Features */}
              <div style={{ padding: "16px 20px 20px" }}>
                {FEATURES.map((feat, fi) => (
                  <div
                    key={feat}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 0",
                      borderBottom: fi < FEATURES.length - 1
                        ? "1px solid var(--border-subtle)"
                        : "none",
                    }}
                  >
                    <FeatureIcon value={col.values[fi]} color={col.color} />
                    <span style={{
                      fontFamily: "var(--font-ui)", fontSize: "0.78rem",
                      color: col.highlight ? "var(--fg)" : "var(--fg-secondary)",
                      lineHeight: 1.4,
                    }}>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA for Geko card */}
              {col.highlight && (
                <div style={{ padding: "0 20px 20px" }}>
                  <Link
                    href="/contacto"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                      padding: "11px 0", borderRadius: 10,
                      background: "var(--gradient-brand)",
                      color: "#fff", textDecoration: "none",
                      fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 600,
                      boxShadow: "0 4px 20px var(--color-geko-purple-a35)",
                    }}
                  >
                    {t.compare.cta}
                    <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={prefersReduced || inView ? { opacity: 1 } : {}}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.5, delay: 0.5 }}
          style={{
            textAlign: "center", marginTop: 24,
            fontFamily: "var(--font-ui)", fontSize: "0.72rem",
            color: "var(--fg-subtle)",
          }}
        >
          {t.compare.footnote}
        </motion.p>
      </div>
    </section>
  )
}
