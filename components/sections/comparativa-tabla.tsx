"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { EASE } from "@/lib/animations"

const FEATURES = [
  "Estrategia personalizada",
  "Gestión diaria de contenido",
  "Social Ads optimizados",
  "Diseño visual profesional",
  "Informes mensuales",
  "Soporte directo (WhatsApp)",
  "Gestor dedicado",
  "Sin permanencia",
  "Resultados en 60 días",
]

type FeatureValue = "yes" | "partial" | "no"

const COLUMNS: {
  id: string
  name: string
  price: string
  priceNote: string
  highlight: boolean
  badge?: string
  color: string
  values: FeatureValue[]
}[] = [
  {
    id: "geko",
    name: "Geko",
    price: "desde 399€",
    priceNote: "/ mes · sin permanencia",
    highlight: true,
    badge: "Nuestra propuesta",
    color: "#9B4DBC",
    values: ["yes","yes","yes","yes","yes","yes","yes","yes","yes"],
  },
  {
    id: "agencia",
    name: "Agencia grande",
    price: "desde 2.000€",
    priceNote: "/ mes · contrato anual",
    highlight: false,
    color: "#64748B",
    values: ["yes","yes","yes","yes","partial","no","no","no","no"],
  },
  {
    id: "freelance",
    name: "Freelancer",
    price: "Variable",
    priceNote: "según proyecto",
    highlight: false,
    color: "#64748B",
    values: ["partial","partial","partial","partial","no","partial","yes","yes","no"],
  },
  {
    id: "solo",
    name: "Tú solo",
    price: "Solo tu tiempo",
    priceNote: "~20h / semana",
    highlight: false,
    color: "#64748B",
    values: ["no","no","no","no","no","yes","yes","yes","no"],
  },
]

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
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)",
      fontSize: "0.75rem", color: "rgba(255,255,255,0.35)",
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
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()

  return (
    <section
      ref={ref}
      style={{
        paddingTop: 96,
        paddingBottom: 96,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: "60%", height: "50%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(29,78,216,0.07) 0%, transparent 70%)",
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
            border: "1px solid rgba(107,45,124,0.35)",
            background: "rgba(107,45,124,0.10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#9B4DBC", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 16,
          }}>
            Comparativa
          </span>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
            fontWeight: 800, lineHeight: 1.15,
            letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.96)",
            marginBottom: 14,
          }}>
            ¿Por qué elegir{" "}
            <span style={{
              background: "linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Geko?
            </span>
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "1rem",
            color: "rgba(255,255,255,0.42)", maxWidth: 460, margin: "0 auto",
          }}>
            Sin rodeos. Así es como nos comparamos con las alternativas.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop
            ? "repeat(4, 1fr)"
            : "repeat(2, 1fr)",
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
                  ? "rgba(107,45,124,0.08)"
                  : "rgba(255,255,255,0.025)",
                border: col.highlight
                  ? "1px solid rgba(107,45,124,0.35)"
                  : "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Top glow for Geko */}
              {col.highlight && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg, #6B2D7C, #9B4DBC, #3B82F6)",
                }} />
              )}

              {/* Header */}
              <div style={{
                padding: "20px 20px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
                {col.badge && (
                  <span style={{
                    display: "inline-block",
                    padding: "2px 10px", borderRadius: 9999,
                    background: "rgba(107,45,124,0.20)",
                    border: "1px solid rgba(107,45,124,0.40)",
                    fontFamily: "var(--font-ui)", fontSize: "0.68rem", fontWeight: 600,
                    color: "#9B4DBC", letterSpacing: "0.04em",
                    marginBottom: 10,
                  }}>
                    {col.badge}
                  </span>
                )}
                <p style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.1rem",
                  fontWeight: 700, color: col.highlight ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.60)",
                  marginBottom: 4,
                }}>{col.name}</p>
                <p style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.875rem",
                  fontWeight: 700,
                  color: col.highlight ? col.color : "rgba(255,255,255,0.40)",
                }}>{col.price}</p>
                <p style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.25)", marginTop: 2,
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
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                    }}
                  >
                    <FeatureIcon value={col.values[fi]} color={col.color} />
                    <span style={{
                      fontFamily: "var(--font-ui)", fontSize: "0.78rem",
                      color: col.highlight ? "rgba(255,255,255,0.68)" : "rgba(255,255,255,0.38)",
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
                      background: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
                      color: "#fff", textDecoration: "none",
                      fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 600,
                      boxShadow: "0 4px 20px rgba(107,45,124,0.35)",
                    }}
                  >
                    Empezar ahora
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
            color: "rgba(255,255,255,0.20)",
          }}
        >
          ~ = Depende del profesional. Basado en condiciones habituales del mercado.
        </motion.p>
      </div>
    </section>
  )
}
