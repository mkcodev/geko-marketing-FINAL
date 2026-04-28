"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ArrowRight, ChevronRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SERVICES } from "@/constants/services"
import { Icon } from "@/lib/icons"
import type { IconName } from "@/lib/icons"
import { EASE } from "@/lib/animations"
import { useT } from "@/hooks/use-translations"

const STAT_ICONS: IconName[] = ["TrendingUp", "Calendar", "Star"]

export function ServiciosHero() {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()

  const STAT_CARDS = t.servicesHero.stats.map((s, i) => ({
    ...s,
    icon: STAT_ICONS[i],
  }))

  const anim = (delay: number) => ({
    initial: prefersReduced ? false : { opacity: 0, y: 24 },
    animate: prefersReduced || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: prefersReduced ? { duration: 0 } : { duration: 0.6, delay, ease: EASE },
  })

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        paddingTop: "var(--section-padding-v)",
        paddingBottom: "var(--section-padding-v)",
        overflow: "hidden",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      {/* Background orbs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-20%", right: "0%",
          width: "50%", height: "80%", borderRadius: "50%",
          background: "radial-gradient(ellipse, var(--color-geko-blue-a18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "-5%",
          width: "40%", height: "60%", borderRadius: "50%",
          background: "radial-gradient(ellipse, var(--color-geko-purple-a15) 0%, transparent 70%)",
          filter: "blur(70px)",
        }} />
      </div>

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>

        {/* Breadcrumb */}
        <motion.div {...anim(0)} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
          <Link href="/" style={{
            fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
            color: "var(--fg-muted)", textDecoration: "none",
            transition: "color 0.2s",
          }}>
            {t.nav.home}
          </Link>
          <ChevronRight size={13} style={{ color: "var(--fg-subtle)" }} />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "var(--fg-secondary)" }}>
            {t.nav.services}
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
                border: "1px solid var(--color-geko-purple-a35)",
                background: "var(--color-geko-purple-a10)",
                fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
                color: "var(--fg)",
              }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 20, height: 20, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-geko-purple), var(--color-geko-blue))",
                  fontSize: "0.75rem",
                }}>🦎</span>
                {t.servicesHero.label}
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
                color: "var(--fg)",
                marginBottom: 20,
                maxWidth: 620,
              }}
            >
              {t.servicesHero.headlineTop}
              <br />
              <span style={{
                background: "linear-gradient(135deg, var(--color-geko-purple-accent) 0%, var(--color-geko-blue-light) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {t.servicesHero.headlineAccent}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...anim(0.18)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: isDesktop ? "1.0625rem" : "1rem",
                color: "var(--fg-secondary)",
                lineHeight: 1.75,
                maxWidth: 520,
                marginBottom: 32,
              }}
            >
              {t.servicesHero.description}
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
                    color: "var(--fg-secondary)",
                    textDecoration: "none",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                >
                  <Icon name={s.icon} size={14} style={{ color: s.color, flexShrink: 0 }} />
                  {(t.services.items[s.slug as keyof typeof t.services.items]?.name) ?? s.name}
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
                  background: "var(--gradient-brand)",
                  color: "#fff", textDecoration: "none",
                  fontFamily: "var(--font-ui)", fontSize: "0.9375rem", fontWeight: 600,
                  boxShadow: "0 4px 24px var(--color-geko-purple-a40)",
                  whiteSpace: "nowrap",
                }}
              >
                {t.servicesHero.ctaAudit}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#servicios-detalle"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 24px", borderRadius: 12,
                  border: "1px solid var(--border-strong)",
                  background: "var(--surface)",
                  color: "var(--fg-secondary)", textDecoration: "none",
                  fontFamily: "var(--font-ui)", fontSize: "0.9375rem", fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {t.servicesHero.ctaServices}
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
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    backdropFilter: "blur(12px)",
                    minWidth: 220,
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                    background: "linear-gradient(135deg, var(--color-geko-purple-a25), var(--color-geko-blue-a20))",
                    border: "1px solid var(--color-geko-purple-a20)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--fg-secondary)",
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
                      color: "var(--fg-muted)", marginTop: 2,
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
