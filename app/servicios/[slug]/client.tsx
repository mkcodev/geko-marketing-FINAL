"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronRight, Check } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { ServiceData } from "@/constants/services"
import type { ServicioDetalle } from "@/constants/services-detalle"
import { Icon } from "@/lib/icons"
import { RedesDashboard } from "@/components/sections/servicio-highlight/redes-dashboard"
import { RedesProceso } from "@/components/sections/servicio-highlight/redes-proceso"
import { RedesResultados } from "@/components/sections/servicio-highlight/redes-resultados"
import { BrandingReveal } from "@/components/sections/servicio-highlight/branding-reveal"
import { WebPerformanceHighlight } from "@/components/sections/servicio-highlight/web-performance"

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

// ── Hero ─────────────────────────────────────────────────────
function ServicioHero({ service, detalle }: { service: ServiceData; detalle: ServicioDetalle }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay, ease: EASE },
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
      {/* BG orbs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-20%", right: "-5%",
          width: "50%", height: "80%", borderRadius: "50%",
          background: `radial-gradient(ellipse, ${service.color}20 0%, transparent 70%)`,
          filter: "blur(70px)",
        }} />
        <div style={{
          position: "absolute", bottom: "0%", left: "-5%",
          width: "35%", height: "55%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(29,78,216,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
        }} />
      </div>

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <motion.div {...anim(0)} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 28, flexWrap: "wrap" }}>
          <Link href="/" style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.30)", textDecoration: "none" }}>Inicio</Link>
          <ChevronRight size={13} style={{ color: "rgba(255,255,255,0.18)" }} />
          <Link href="/servicios" style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.40)", textDecoration: "none" }}>Servicios</Link>
          <ChevronRight size={13} style={{ color: "rgba(255,255,255,0.18)" }} />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.60)" }}>{service.name}</span>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr auto" : "1fr",
          gap: 48,
          alignItems: "start",
        }}>
          <div style={{ maxWidth: 680 }}>
            {/* Badge */}
            <motion.div {...anim(0.05)} style={{ marginBottom: 20 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "5px 14px 5px 8px", borderRadius: 9999,
                border: `1px solid ${service.color}40`,
                background: `${service.color}10`,
                fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.80)",
              }}>
                <Icon name={service.icon} size={16} style={{ color: service.color, flexShrink: 0 }} />
                {service.name}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...anim(0.1)}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isDesktop ? "clamp(2.5rem, 4vw, 3.75rem)" : "clamp(2rem, 7vw, 2.75rem)",
                fontWeight: 800, lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "rgba(255,255,255,0.96)",
                marginBottom: 20,
              }}
            >
              {detalle.heroHeadline}
              <br />
              <span style={{
                background: `linear-gradient(135deg, ${service.color} 0%, #3B82F6 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {detalle.heroAccent}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...anim(0.18)}
              style={{
                fontFamily: "var(--font-body)", fontSize: isDesktop ? "1.0625rem" : "1rem",
                color: "rgba(255,255,255,0.50)", lineHeight: 1.75,
                marginBottom: 32,
              }}
            >
              {detalle.heroDescription}
            </motion.p>

            {/* CTAs */}
            <motion.div {...anim(0.25)} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
                href="/servicios"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 24px", borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.60)", textDecoration: "none",
                  fontFamily: "var(--font-ui)", fontSize: "0.9375rem", fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                Ver todos los servicios
              </Link>
            </motion.div>
          </div>

          {/* Metrics card (desktop) */}
          {isDesktop && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              style={{
                borderRadius: 18,
                background: `${service.color}0C`,
                border: `1px solid ${service.color}25`,
                padding: "24px 28px",
                minWidth: 240,
              }}
            >
              <p style={{
                fontFamily: "var(--font-ui)", fontSize: "0.72rem",
                fontWeight: 600, letterSpacing: "0.10em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.28)",
                marginBottom: 20,
              }}>Resultados medios</p>
              {service.metrics.map((m) => (
                <div key={m.label} style={{ marginBottom: 16 }}>
                  <p style={{
                    fontFamily: "var(--font-heading)", fontSize: "1.75rem",
                    fontWeight: 800, color: service.color, lineHeight: 1,
                  }}>{m.value}</p>
                  <p style={{
                    fontFamily: "var(--font-ui)", fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.38)", marginTop: 3,
                  }}>{m.label}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

// ── Incluye ───────────────────────────────────────────────────
function ServicioIncluye({ service }: { service: ServiceData }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 40 }}
        >
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 9999,
            border: "1px solid rgba(107,45,124,0.35)", background: "rgba(107,45,124,0.10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#9B4DBC", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 14,
          }}>Qué incluye</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.96)",
          }}>
            Todo lo que está incluido
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
        }}>
          {service.deliverables.map((d, i) => (
            <motion.div
              key={d}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
              style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                padding: "18px 20px", borderRadius: 14,
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                background: `${service.color}18`, border: `1px solid ${service.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: 1,
              }}>
                <Check size={14} style={{ color: service.color }} strokeWidth={2.5} />
              </div>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: "0.9375rem",
                color: "rgba(255,255,255,0.72)", lineHeight: 1.5,
              }}>{d}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Proceso ───────────────────────────────────────────────────
function ServicioProceso({ service, detalle }: { service: ServiceData; detalle: ServicioDetalle }) {
  if (service.slug === "gestion-redes") return <RedesProceso proceso={detalle.proceso} />
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const isWide = useMediaQuery("(min-width: 1100px)")

  const cols = !isDesktop ? "1fr" : isWide ? "repeat(5, 1fr)" : "repeat(auto-fit, minmax(180px, 1fr))"

  return (
    <section ref={ref} style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 48 }}
        >
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 9999,
            border: "1px solid rgba(107,45,124,0.35)", background: "rgba(107,45,124,0.10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#9B4DBC", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 14,
          }}>Cómo trabajamos</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.96)",
          }}>
            El proceso, paso a paso
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: cols,
          gap: isDesktop ? 0 : 16,
          position: "relative",
        }}>
          {/* Connector line — wide desktop only */}
          {isWide && (
            <div style={{
              position: "absolute",
              top: 28, left: "10%", right: "10%",
              height: 1,
              background: `linear-gradient(90deg, transparent, ${service.color}40, ${service.color}40, transparent)`,
              zIndex: 0,
            }} />
          )}

          {detalle.proceso.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              style={{
                display: "flex",
                flexDirection: isDesktop ? "column" : "row",
                alignItems: isDesktop ? "center" : "flex-start",
                gap: 16,
                textAlign: isDesktop ? "center" : "left",
                padding: isDesktop ? "0 12px" : "16px 20px",
                borderRadius: isDesktop ? 0 : 14,
                background: isDesktop ? "transparent" : "rgba(255,255,255,0.025)",
                border: isDesktop ? "none" : "1px solid rgba(255,255,255,0.07)",
                position: "relative", zIndex: 1,
              }}
            >
              {/* Number circle */}
              <div style={{
                width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
                background: i === 0 ? `linear-gradient(135deg, ${service.color}, #1D4ED8)` : "rgba(255,255,255,0.04)",
                border: `1px solid ${i === 0 ? service.color + "60" : "rgba(255,255,255,0.10)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: i === 0 ? `0 0 24px ${service.color}40` : "none",
              }}>
                <span style={{
                  fontFamily: "var(--font-heading)", fontSize: "0.875rem",
                  fontWeight: 700,
                  color: i === 0 ? "#fff" : "rgba(255,255,255,0.45)",
                }}>{step.num}</span>
              </div>

              <div>
                <p style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.9375rem",
                  fontWeight: 600, color: "rgba(255,255,255,0.88)",
                  marginBottom: 6,
                }}>{step.title}</p>
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.42)", lineHeight: 1.6,
                  maxWidth: isDesktop ? 160 : "none",
                }}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Portfolio ─────────────────────────────────────────────────
function ServicioPortfolio({ service, detalle }: { service: ServiceData; detalle: ServicioDetalle }) {
  if (service.slug === "gestion-redes") return <RedesResultados portfolio={detalle.portfolio} />
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 40 }}
        >
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 9999,
            border: "1px solid rgba(107,45,124,0.35)", background: "rgba(107,45,124,0.10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#9B4DBC", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 14,
          }}>Resultados reales</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.96)",
          }}>
            Clientes que ya lo están notando
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}>
          {detalle.portfolio.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              style={{
                borderRadius: 18,
                background: `${item.color}0A`,
                border: `1px solid ${item.color}20`,
                overflow: "hidden",
              }}
            >
              {/* Card top: gradient + icon */}
              <div style={{
                height: 120,
                background: `linear-gradient(135deg, ${item.color}20 0%, rgba(8,8,16,0.5) 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
                borderBottom: `1px solid ${item.color}15`,
              }}>
                <Icon name={item.icon} size={48} style={{ color: item.color, opacity: 0.85, filter: `drop-shadow(0 0 20px ${item.color}60)` }} />
                <span style={{
                  position: "absolute", top: 12, right: 12,
                  padding: "3px 10px", borderRadius: 6,
                  background: "rgba(8,8,16,0.85)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  fontFamily: "var(--font-ui)", fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.40)",
                }}>
                  Caso confidencial
                </span>
              </div>

              {/* Card body */}
              <div style={{ padding: "20px 24px" }}>
                <p style={{
                  fontFamily: "var(--font-heading)", fontSize: "2rem",
                  fontWeight: 800, color: item.color, lineHeight: 1, marginBottom: 4,
                }}>{item.metric}</p>
                <p style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.50)", marginBottom: 12,
                }}>{item.metricNote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: 6,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "var(--font-ui)", fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.38)",
                  }}>{item.sector}</span>
                  <span style={{
                    fontFamily: "var(--font-ui)", fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.25)",
                  }}>{item.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────
function ServicioFaq({ detalle }: { detalle: ServicioDetalle }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="section-container" style={{ maxWidth: 720 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 40 }}
        >
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 9999,
            border: "1px solid rgba(107,45,124,0.35)", background: "rgba(107,45,124,0.10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#9B4DBC", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 14,
          }}>FAQ</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.96)",
          }}>
            Preguntas frecuentes
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {detalle.faq.map((item, i) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
              style={{
                borderRadius: 14,
                background: openIdx === i ? "rgba(107,45,124,0.07)" : "rgba(255,255,255,0.025)",
                border: openIdx === i ? "1px solid rgba(107,45,124,0.25)" : "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden",
                transition: "background 0.3s, border-color 0.3s",
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: 16,
                  padding: "18px 22px",
                  background: "none", border: "none",
                  cursor: "inherit", textAlign: "left",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.9375rem",
                  fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.4,
                }}>{item.question}</span>
                <motion.span
                  animate={{ rotate: openIdx === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    flexShrink: 0, fontSize: "1.2rem",
                    color: openIdx === i ? "#9B4DBC" : "rgba(255,255,255,0.30)",
                    lineHeight: 1,
                  }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{
                      padding: "0 22px 20px",
                      fontFamily: "var(--font-body)", fontSize: "0.9375rem",
                      color: "rgba(255,255,255,0.50)", lineHeight: 1.75,
                    }}>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Highlight section per service ────────────────────────────
function ServicioHighlight({ slug }: { slug: string }) {
  if (slug === "gestion-redes") return <RedesDashboard />
  if (slug === "branding")      return <BrandingReveal />
  if (slug === "paginas-web")   return <WebPerformanceHighlight />
  return null
}

// ── Main export ───────────────────────────────────────────────
export function ServicioDetalleContent({ service, detalle }: { service: ServiceData; detalle: ServicioDetalle }) {
  return (
    <>
      <ServicioHero service={service} detalle={detalle} />
      <ServicioIncluye service={service} />
      <ServicioHighlight slug={service.slug} />
      <ServicioProceso service={service} detalle={detalle} />
      <ServicioPortfolio service={service} detalle={detalle} />
      <ServicioFaq detalle={detalle} />
    </>
  )
}
