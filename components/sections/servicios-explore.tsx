"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SERVICES, type ServiceData } from "@/constants/services"
import { Icon } from "@/lib/icons"

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
const HEADER_OFFSET = "calc(56px + var(--ann-h, 40px) + 32px)"

// ── Deliverable row with animated check ─────────────────────
function Deliverable({ text, delay, color }: { text: string; delay: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: EASE }}
      style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0" }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.1, type: "spring", stiffness: 400, damping: 20 }}
        style={{
          width: 22, height: 22, borderRadius: 6, flexShrink: 0,
          background: `${color}18`, border: `1px solid ${color}45`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginTop: 1,
        }}
      >
        <Check size={12} style={{ color }} strokeWidth={2.5} />
      </motion.div>
      <span style={{
        fontFamily: "var(--font-body)", fontSize: "0.9375rem",
        color: "rgba(255,255,255,0.72)", lineHeight: 1.55,
      }}>
        {text}
      </span>
    </motion.div>
  )
}

// ── Case study card ──────────────────────────────────────────
function CaseStudyCard({ service }: { service: ServiceData }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const cs = service.caseStudy

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE }}
      style={{
        borderRadius: 16,
        background: `${cs.color}0D`,
        border: `1px solid ${cs.color}25`,
        padding: "20px 24px",
        display: "flex",
        gap: 20,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div style={{
        display: "flex", flexDirection: "column", gap: 3,
        paddingRight: 20, borderRight: `1px solid ${cs.color}20`,
        minWidth: 100,
      }}>
        <span style={{
          fontFamily: "var(--font-heading)", fontSize: "2rem",
          fontWeight: 800, lineHeight: 1,
          color: cs.color,
        }}>{cs.metric}</span>
        <span style={{
          fontFamily: "var(--font-ui)", fontSize: "0.75rem",
          color: "rgba(255,255,255,0.45)", lineHeight: 1.4,
        }}>{cs.metricLabel}</span>
      </div>
      <div style={{ flex: 1, minWidth: 160 }}>
        <p style={{
          fontFamily: "var(--font-ui)", fontSize: "0.875rem",
          fontWeight: 600, color: "rgba(255,255,255,0.85)",
          marginBottom: 3,
        }}>{cs.detail}</p>
        <p style={{
          fontFamily: "var(--font-ui)", fontSize: "0.78rem",
          color: "rgba(255,255,255,0.38)",
        }}>{cs.client}</p>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 12px", borderRadius: 8,
        background: `${cs.color}15`, border: `1px solid ${cs.color}20`,
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: cs.color,
          boxShadow: `0 0 8px ${cs.color}`,
          animation: "pulse 2s infinite",
        }} />
        <span style={{
          fontFamily: "var(--font-ui)", fontSize: "0.72rem",
          fontWeight: 600, color: cs.color,
          letterSpacing: "0.04em",
        }}>Caso real</span>
      </div>
    </motion.div>
  )
}

// ── Metrics strip ────────────────────────────────────────────
function MetricsStrip({ service }: { service: ServiceData }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
      }}
    >
      {service.metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
          style={{
            padding: "16px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            textAlign: "center",
          }}
        >
          <p style={{
            fontFamily: "var(--font-heading)", fontSize: "1.375rem",
            fontWeight: 700, color: service.color, lineHeight: 1,
            marginBottom: 6,
          }}>{m.value}</p>
          <p style={{
            fontFamily: "var(--font-ui)", fontSize: "0.72rem",
            color: "rgba(255,255,255,0.40)", lineHeight: 1.4,
          }}>{m.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

// ── Single service content (right panel) ────────────────────
function ServiceContent({ service }: { service: ServiceData }) {
  return (
    <div
      id={service.id}
      data-service={service.id}
      style={{ paddingBottom: 96, paddingTop: 16 }}
    >
      {/* Header */}
      <div style={{
        borderRadius: 20,
        background: service.accentGradient,
        border: `1px solid ${service.color}20`,
        padding: "28px 32px",
        marginBottom: 36,
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, flexShrink: 0,
          background: `${service.color}20`, border: `1px solid ${service.color}35`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: service.color,
        }}>
          <Icon name={service.icon} size={22} />
        </div>
        <div>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 800, lineHeight: 1.15,
            letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.96)",
            marginBottom: 8,
          }}>{service.name}</h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "0.9375rem",
            color: "rgba(255,255,255,0.50)", lineHeight: 1.6,
          }}>{service.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "var(--font-body)", fontSize: "1rem",
        color: "rgba(255,255,255,0.60)", lineHeight: 1.8,
        marginBottom: 36, maxWidth: 600,
      }}>
        {service.description}
      </p>

      {/* Deliverables */}
      <div style={{ marginBottom: 36 }}>
        <h3 style={{
          fontFamily: "var(--font-ui)", fontSize: "0.72rem",
          fontWeight: 600, letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.30)",
          marginBottom: 16,
        }}>
          ¿Qué incluye?
        </h3>
        <div style={{
          borderRadius: 14,
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "8px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          columnGap: 32,
        }}>
          {service.deliverables.map((d, i) => (
            <Deliverable key={d} text={d} delay={i * 0.07} color={service.color} />
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div style={{ marginBottom: 36 }}>
        <h3 style={{
          fontFamily: "var(--font-ui)", fontSize: "0.72rem",
          fontWeight: 600, letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.30)",
          marginBottom: 14,
        }}>
          Plataformas
        </h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {service.platforms.map((p) => (
            <div
              key={p.name}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "8px 14px", borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Icon name={p.icon} size={14} style={{ color: "rgba(255,255,255,0.55)", flexShrink: 0 }} />
              <span style={{
                fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
                fontWeight: 500, color: "rgba(255,255,255,0.65)",
              }}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Case study */}
      <div style={{ marginBottom: 36 }}>
        <h3 style={{
          fontFamily: "var(--font-ui)", fontSize: "0.72rem",
          fontWeight: 600, letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.30)",
          marginBottom: 14,
        }}>
          Resultado real
        </h3>
        <CaseStudyCard service={service} />
      </div>

      {/* Metrics */}
      <div style={{ marginBottom: 36 }}>
        <h3 style={{
          fontFamily: "var(--font-ui)", fontSize: "0.72rem",
          fontWeight: 600, letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.30)",
          marginBottom: 14,
        }}>
          Cifras que importan
        </h3>
        <MetricsStrip service={service} />
      </div>

      {/* CTA row */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link
          href={service.href}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", borderRadius: 10,
            background: `${service.color}18`,
            border: `1px solid ${service.color}35`,
            color: service.color,
            fontFamily: "var(--font-ui)", fontSize: "0.875rem", fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.2s",
          }}
        >
          Ver todo sobre {service.name.toLowerCase()}
          <ArrowRight size={15} />
        </Link>
        <Link
          href="/contacto"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", borderRadius: 10,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.60)",
            fontFamily: "var(--font-ui)", fontSize: "0.875rem", fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Pedir presupuesto
        </Link>
      </div>
    </div>
  )
}

// ── Left sticky navigator ────────────────────────────────────
function StickyNav({ activeId }: { activeId: string }) {
  return (
    <div style={{
      position: "sticky",
      top: HEADER_OFFSET,
      display: "flex",
      flexDirection: "column",
      gap: 4,
    }}>
      {/* Section label */}
      <p style={{
        fontFamily: "var(--font-ui)", fontSize: "0.68rem",
        fontWeight: 600, letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.22)",
        marginBottom: 20,
        paddingLeft: 20,
      }}>
        Nuestros servicios
      </p>

      {SERVICES.map((s, i) => {
        const isActive = activeId === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
            }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              padding: "16px 20px",
              borderRadius: 12,
              borderLeft: `2px solid ${isActive ? s.color : "rgba(255,255,255,0.06)"}`,
              background: isActive ? `${s.color}0A` : "transparent",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
          >
            {/* Number */}
            <span style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, color: isActive ? s.color : "rgba(255,255,255,0.20)",
              marginTop: 3, minWidth: 20, transition: "color 0.3s",
            }}>
              0{i + 1}
            </span>

            {/* Text */}
            <div>
              <p style={{
                fontFamily: "var(--font-ui)", fontSize: "0.9375rem",
                fontWeight: 600,
                color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.40)",
                marginBottom: 4, lineHeight: 1.3,
                transition: "color 0.3s",
              }}>
                {s.name}
              </p>
              <AnimatePresence>
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      fontFamily: "var(--font-ui)", fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.38)",
                      lineHeight: 1.5, overflow: "hidden",
                    }}
                  >
                    {s.tagline}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </a>
        )
      })}

      {/* Divider + CTA */}
      <div style={{
        marginTop: 24, paddingTop: 24,
        borderTop: "1px solid rgba(255,255,255,0.07)",
        paddingLeft: 20,
      }}>
        <Link
          href="/contacto"
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "10px 18px", borderRadius: 10,
            background: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
            color: "#fff", textDecoration: "none",
            fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 600,
            boxShadow: "0 4px 20px rgba(107,45,124,0.35)",
          }}
        >
          Auditoría gratis
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────
export function ServiciosExplore() {
  const [activeId, setActiveId] = useState(SERVICES[0].id)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const containerRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver to sync left nav with scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-service")
            if (id) setActiveId(id)
          }
        })
      },
      {
        threshold: 0.25,
        rootMargin: "-15% 0px -55% 0px",
      }
    )

    SERVICES.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="servicios-detalle"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Section header */}
      <div className="section-container" style={{ paddingTop: 80, paddingBottom: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ marginBottom: 64 }}
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
            Qué hacemos
          </span>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
            fontWeight: 800, lineHeight: 1.15,
            letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.96)",
            maxWidth: 560,
          }}>
            Servicios diseñados para{" "}
            <span style={{
              background: "linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              generar resultados reales
            </span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div
          ref={containerRef}
          style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "260px 1fr" : "1fr",
            gap: isDesktop ? 64 : 0,
            alignItems: "start",
          }}
        >
          {/* Left sticky nav — desktop only */}
          {isDesktop && (
            <StickyNav activeId={activeId} />
          )}

          {/* Mobile tabs */}
          {!isDesktop && (
            <div style={{
              display: "flex", gap: 8, overflowX: "auto",
              paddingBottom: 24,
              scrollbarWidth: "none",
            }}>
              {SERVICES.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
                  }}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "8px 14px", borderRadius: 9999, flexShrink: 0,
                    border: `1px solid ${activeId === s.id ? s.color : "rgba(255,255,255,0.08)"}`,
                    background: activeId === s.id ? `${s.color}15` : "rgba(255,255,255,0.03)",
                    fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 500,
                    color: activeId === s.id ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.45)",
                    textDecoration: "none", transition: "all 0.2s",
                  }}
                >
                  <Icon name={s.icon} size={14} style={{ flexShrink: 0, color: "inherit", opacity: 0.7 }} />
                  {s.name}
                </a>
              ))}
            </div>
          )}

          {/* Right: service sections */}
          <div style={{ paddingBottom: 48 }}>
            {SERVICES.map((s) => (
              <ServiceContent key={s.id} service={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
