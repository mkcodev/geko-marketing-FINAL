"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ChevronRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SERVICES } from "@/constants/services"
import { Icon } from "@/lib/icons"
import type { IconName } from "@/lib/icons"

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const STAT_CARDS: { value: string; label: string; icon: IconName }[] = [
  { value: "50+", label: "Marcas creciendo", icon: "TrendingUp" },
  { value: "3 años", label: "En el mercado", icon: "Calendar" },
  { value: "98%", label: "Clientes satisfechos", icon: "Star" },
]

export function ServiciosHero() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.6, delay, ease: EASE },
  })

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        paddingTop: isDesktop ? 72 : 48,
        paddingBottom: isDesktop ? 80 : 56,
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Background orbs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-20%", right: "0%",
          width: "50%", height: "80%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(29,78,216,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "-5%",
          width: "40%", height: "60%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(107,45,124,0.15) 0%, transparent 70%)",
          filter: "blur(70px)",
        }} />
      </div>

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>

        {/* Breadcrumb */}
        <motion.div {...anim(0)} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
          <Link href="/" style={{
            fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
            color: "rgba(255,255,255,0.35)", textDecoration: "none",
            transition: "color 0.2s",
          }}>
            Inicio
          </Link>
          <ChevronRight size={13} style={{ color: "rgba(255,255,255,0.20)" }} />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)" }}>
            Servicios
          </span>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr auto" : "1fr",
          gap: isDesktop ? 64 : 40,
          alignItems: "start",
        }}>
          {/* Left: copy */}
          <div>
            {/* Label */}
            <motion.div {...anim(0.05)} style={{ marginBottom: 20 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "5px 14px 5px 8px", borderRadius: 9999,
                border: "1px solid rgba(107,45,124,0.35)",
                background: "rgba(107,45,124,0.10)",
                fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
                color: "rgba(255,255,255,0.80)",
              }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 20, height: 20, borderRadius: "50%",
                  background: "linear-gradient(135deg, #6B2D7C, #1D4ED8)",
                  fontSize: "0.75rem",
                }}>🦎</span>
                Marketing digital desde Tres Cantos, Madrid
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...anim(0.1)}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isDesktop ? "clamp(2.5rem, 4vw, 3.75rem)" : "clamp(2rem, 7vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "rgba(255,255,255,0.96)",
                marginBottom: 20,
                maxWidth: 620,
              }}
            >
              Todo lo que necesita
              <br />
              <span style={{
                background: "linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                tu marca para crecer
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...anim(0.18)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: isDesktop ? "1.0625rem" : "1rem",
                color: "rgba(255,255,255,0.50)",
                lineHeight: 1.75,
                maxWidth: 520,
                marginBottom: 32,
              }}
            >
              Desde la estrategia de redes sociales hasta tu nueva web. Un equipo completo trabajando
              para hacer crecer tu marca — con resultados medibles en los primeros 60 días.
            </motion.p>

            {/* Service chips */}
            <motion.div
              {...anim(0.24)}
              style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}
            >
              {SERVICES.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    padding: "7px 14px", borderRadius: 9999,
                    border: `1px solid ${s.color}35`,
                    background: `${s.color}10`,
                    fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 500,
                    color: "rgba(255,255,255,0.72)",
                    textDecoration: "none",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                >
                  <Icon name={s.icon} size={14} style={{ color: s.color, flexShrink: 0 }} />
                  {s.name}
                </a>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div {...anim(0.3)} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/contacto"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 12,
                  background: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
                  color: "#fff", textDecoration: "none",
                  fontFamily: "var(--font-ui)", fontSize: "0.9375rem", fontWeight: 600,
                  boxShadow: "0 4px 24px rgba(107,45,124,0.40)",
                  whiteSpace: "nowrap",
                }}
              >
                Pedir auditoría gratis
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#servicios-detalle"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 24px", borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.65)", textDecoration: "none",
                  fontFamily: "var(--font-ui)", fontSize: "0.9375rem", fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                Ver servicios
                <ChevronRight size={15} />
              </Link>
            </motion.div>
          </div>

          {/* Right: stats floating cards (desktop only) */}
          {isDesktop && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 }}
            >
              {STAT_CARDS.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "16px 20px", borderRadius: 14,
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    minWidth: 220,
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                    background: "linear-gradient(135deg, rgba(107,45,124,0.25), rgba(29,78,216,0.20))",
                    border: "1px solid rgba(107,45,124,0.20)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.70)",
                  }}>
                    <Icon name={card.icon} size={20} />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-heading)", fontSize: "1.375rem",
                      fontWeight: 700, color: "#fff", lineHeight: 1,
                    }}>{card.value}</p>
                    <p style={{
                      fontFamily: "var(--font-ui)", fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.40)", marginTop: 2,
                    }}>{card.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
