"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, AnimatePresence } from "motion/react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Icon } from "@/lib/icons"
import type { IconName } from "@/lib/icons"
import { EASE } from "@/lib/animations"

// Paleta de color de ejemplo
const PALETTE = [
  { name: "Principal", hex: "var(--color-geko-purple)", rgb: "107 · 45 · 124" },
  { name: "Acento",    hex: "var(--color-geko-blue-light)", rgb: "59 · 130 · 246" },
  { name: "Claro",     hex: "var(--color-geko-purple-accent)", rgb: "155 · 77 · 188" },
  { name: "Oscuro",    hex: "#1E1B2E", rgb: "30 · 27 · 46"  },
  { name: "Neutro",    hex: "#F4F4F8", rgb: "244 · 244 · 248" },
]

const TYPOGRAPHY = [
  { name: "Bricolage Grotesque", role: "Heading", weight: "800", sample: "Marca poderosa", size: "2rem" },
  { name: "Geist Variable",      role: "UI / Labels", weight: "500", sample: "Gestión impecable", size: "1rem" },
  { name: "Satoshi",             role: "Body copy", weight: "400", sample: "Texto que convierte y conecta con tu público ideal.", size: "0.875rem" },
]

const BRAND_ELEMENTS: { label: string; icon: IconName; stage: number }[] = [
  { label: "Logo principal",  icon: "Hexagon",  stage: 2 },
  { label: "Paleta de color", icon: "Palette",  stage: 1 },
  { label: "Tipografías",     icon: "Type",     stage: 3 },
  { label: "Tarjeta visita",  icon: "CreditCard", stage: 4 },
  { label: "Templates RRSS",  icon: "Ruler",    stage: 5 },
  { label: "Manual de marca", icon: "BookOpen", stage: 6 },
]

// Stages: 0=nothing, 1=palette, 2=logo, 3=typo, 4=card, 5=templates, 6=manual
const STAGE_DURATION = 900 // ms per stage

function PaletteReveal({ active }: { active: boolean }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {PALETTE.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ scale: 0, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: i * 0.08, type: "spring", stiffness: 400, damping: 20 }}
          style={{
            width: 44, height: 44, borderRadius: 12,
            background: p.hex,
            border: "1px solid var(--border-strong)",
            cursor: "default",
            boxShadow: `0 4px 16px ${p.hex}40`,
            position: "relative",
          }}
          title={`${p.name}: ${p.hex}`}
        />
      ))}
    </div>
  )
}

function LogoReveal({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0, filter: "blur(8px)" }}
      animate={active ? { scale: 1, opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        display: "flex", alignItems: "center", gap: 8,
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: "linear-gradient(135deg, var(--color-geko-purple) 0%, var(--color-geko-blue-light) 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 32px var(--color-geko-purple-a50)",
      }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.25rem", color: "#fff" }}>G</span>
      </div>
      <div>
        <span style={{
          fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem",
          background: "linear-gradient(135deg, var(--color-geko-purple-accent) 0%, var(--color-geko-blue-light) 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
        }}>Geko</span>
        <span style={{
          fontFamily: "var(--font-heading)", fontWeight: 400, fontSize: "1.25rem",
          color: "var(--fg)",
          letterSpacing: "-0.02em",
        }}>.mkt</span>
      </div>
    </motion.div>
  )
}

function TypographyReveal({ active }: { active: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {TYPOGRAPHY.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, x: -16 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45, delay: i * 0.12, ease: EASE }}
        >
          <p style={{
            fontFamily: i === 0 ? "var(--font-heading)" : i === 1 ? "var(--font-ui)" : "var(--font-body)",
            fontSize: t.size, fontWeight: parseInt(t.weight),
            color: "var(--fg)", lineHeight: 1.2,
          }}>{t.sample}</p>
          <p style={{
            fontFamily: "var(--font-ui)", fontSize: "0.68rem",
            color: "var(--fg-subtle)", marginTop: 2,
          }}>{t.name} · {t.role} · {t.weight}w</p>
        </motion.div>
      ))}
    </div>
  )
}

function BusinessCard({ active }: { active: boolean }) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setFlipped(true), 800)
    return () => clearTimeout(t)
  }, [active])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotateY: -30 }}
      animate={active ? { opacity: 1, scale: 1, rotateY: flipped ? 180 : 0 } : {}}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        width: "100%", maxWidth: 280,
        aspectRatio: "1.75",
        borderRadius: 14,
        position: "relative",
        transformStyle: "preserve-3d",
        perspective: 1000,
        cursor: "default",
      }}
    >
      {/* Front */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: 14,
        background: "linear-gradient(135deg, #1E1B2E 0%, #0d0d1a 100%)",
        border: "1px solid var(--color-geko-purple-a35)",
        backfaceVisibility: "hidden",
        padding: "20px 24px",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px var(--color-geko-purple-a20)",
      }}>
        <div>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg, var(--color-geko-purple), var(--color-geko-blue-light))",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 8,
          }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.875rem", color: "#fff" }}>G</span>
          </div>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--fg)" }}>María García</p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "var(--fg-muted)", marginTop: 1 }}>Directora de Cuentas</p>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.62rem", color: "var(--fg-muted)" }}>+34 600 000 000</span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.62rem", color: "var(--fg-muted)" }}>geko-marketing.com</span>
        </div>
      </div>

      {/* Back */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: 14,
        background: "var(--gradient-brand)",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 20px 60px var(--color-geko-purple-a40)",
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.5rem", color: "#fff", letterSpacing: "-0.025em" }}>Geko.mkt</p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", color: "var(--fg-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Agencia de marketing</p>
        </div>
      </div>
    </motion.div>
  )
}

function SocialTemplate({ active, index }: { active: boolean; index: number }) {
  const colors = ["#E1306C", "var(--color-geko-blue-light)", "#F59E0B"]
  const color = colors[index % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={active ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 250, damping: 22 }}
      style={{
        flex: 1, aspectRatio: "1",
        borderRadius: 12,
        background: `${color}12`,
        border: `1px solid ${color}25`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 6, padding: 12,
        minWidth: 0,
      }}
    >
      <div style={{
        width: "100%", height: "55%",
        borderRadius: 8,
        background: `linear-gradient(135deg, ${color}25 0%, rgba(8,8,16,0.5) 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color,
      }}><Icon name="LayoutTemplate" size={24} /></div>
      <p style={{
        fontFamily: "var(--font-ui)", fontSize: "0.62rem",
        fontWeight: 600, color: "var(--fg-muted)",
        textAlign: "center",
      }}>{["Story 9:16", "Post 1:1", "Cover"][index]}</p>
    </motion.div>
  )
}

// ── Main ─────────────────────────────────────────────────────
export function BrandingReveal() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isMd = useMediaQuery("(min-width: 768px)")
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!inView) return
    let s = 0
    const interval = setInterval(() => {
      s++
      setStage(s)
      if (s >= BRAND_ELEMENTS.length) clearInterval(interval)
    }, STAGE_DURATION)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section
      ref={ref}
      style={{
        paddingTop: isDesktop ? 100 : 72,
        paddingBottom: isDesktop ? 100 : 72,
        borderBottom: "1px solid var(--border-subtle)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* BG */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
          width: "60%", height: "60%", borderRadius: "50%",
          background: "radial-gradient(ellipse, var(--color-geko-purple-accent-a08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
      </div>

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: isDesktop ? 64 : 48 }}
        >
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 9999,
            border: "1px solid var(--color-geko-purple-accent-a35)", background: "var(--color-geko-purple-accent-a10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#C084FC", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 16,
          }}>Identidad de marca</span>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.875rem, 4vw, 3rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            marginBottom: 16,
          }}>
            Una marca construida.{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--color-geko-purple-accent) 0%, var(--color-geko-blue-light) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Pieza a pieza.</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: isMd ? "1.0625rem" : "0.9375rem",
            color: "var(--fg-muted)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7,
          }}>
            Esto es lo que construimos para cada cliente. Cada elemento diseñado con intención, cada decisión tomada para que tu marca sea inconfundible.
          </p>
        </motion.div>

        {/* Progress steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap", justifyContent: "center" }}
        >
          {BRAND_ELEMENTS.map((el) => {
            const done = stage > el.stage - 1
            return (
              <div key={el.label} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "5px 12px", borderRadius: 9999,
                background: done ? "var(--color-geko-purple-accent-a12)" : "var(--surface)",
                border: done ? "1px solid var(--color-geko-purple-accent-a30)" : "1px solid var(--border)",
                transition: "all 0.4s ease",
              }}>
                <motion.span
                  animate={{ scale: done ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", color: done ? "var(--color-geko-purple-accent-a80)" : "var(--fg-subtle)" }}
                ><Icon name={el.icon} size={13} /></motion.span>
                <span style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.75rem",
                  fontWeight: 500,
                  color: done ? "var(--color-geko-purple-accent-a90)" : "var(--fg-subtle)",
                  transition: "color 0.4s ease",
                }}>{el.label}</span>
                {done && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    style={{ color: "#22C55E", fontSize: "0.75rem" }}
                  >✓</motion.span>
                )}
              </div>
            )
          })}
        </motion.div>

        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr 1fr" : isMd ? "1fr 1fr" : "1fr",
          gap: 16,
          marginBottom: 16,
        }}>
          {/* Palette card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            style={{
              borderRadius: 20,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "24px",
            }}
          >
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--fg-subtle)",
              marginBottom: 20,
            }}>Paleta de color</p>
            <PaletteReveal active={stage >= 1} />
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {PALETTE.slice(0, 3).map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={stage >= 1 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1, ease: EASE }}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: 5, background: p.hex, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", color: "var(--fg-secondary)" }}>{p.name}</span>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", color: "var(--fg-subtle)", marginLeft: "auto" }}>{p.hex}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Logo + Business card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            style={{
              borderRadius: 20,
              background: "var(--color-geko-purple-a06)",
              border: "1px solid var(--color-geko-purple-a20)",
              padding: "24px",
              display: "flex", flexDirection: "column", gap: 20,
              alignItems: "center",
            }}
          >
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--fg-subtle)",
              alignSelf: "flex-start",
            }}>Logo · Tarjeta</p>
            <LogoReveal active={stage >= 2} />
            <BusinessCard active={stage >= 4} />
          </motion.div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
            style={{
              borderRadius: 20,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "24px",
              gridColumn: isDesktop ? "auto" : isMd ? "1 / -1" : "auto",
            }}
          >
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--fg-subtle)",
              marginBottom: 20,
            }}>Sistema tipográfico</p>
            <TypographyReveal active={stage >= 3} />
          </motion.div>
        </div>

        {/* Templates + Manual row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMd ? "1fr 1fr" : "1fr",
          gap: 16,
        }}>
          {/* Social templates */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
            style={{
              borderRadius: 20,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "24px",
            }}
          >
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--fg-subtle)",
              marginBottom: 20,
            }}>20+ Templates para RRSS</p>
            <div style={{ display: "flex", gap: 10 }}>
              {[0, 1, 2].map((i) => <SocialTemplate key={i} active={stage >= 5} index={i} />)}
            </div>
          </motion.div>

          {/* Brand manual preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.5, ease: EASE }}
            style={{
              borderRadius: 20,
              background: "var(--color-geko-blue-light-a05)",
              border: "1px solid rgba(59,130,246,0.18)",
              padding: "24px",
            }}
          >
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem",
              fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--fg-subtle)",
              marginBottom: 16,
            }}>Manual de marca</p>

            <AnimatePresence>
              {stage >= 6 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {([
                    { icon: "Hexagon" as IconName,    label: "Reglas de uso del logo" },
                    { icon: "Palette" as IconName,    label: "Guía de color con valores HEX / RGB / CMYK" },
                    { icon: "Type" as IconName,       label: "Jerarquía tipográfica completa" },
                    { icon: "Ruler" as IconName,      label: "Espaciados y márgenes definidos" },
                    { icon: "CheckSquare" as IconName, label: "Ejemplos de uso correcto e incorrecto" },
                  ]).map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.1, ease: EASE }}
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Icon name={item.icon} size={15} style={{ color: "var(--color-geko-blue-light)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--fg-secondary)" }}>
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {stage < 6 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[85, 65, 75, 55, 70].map((w, i) => (
                  <div key={i} style={{ height: 8, borderRadius: 4, background: "var(--border-subtle)", width: `${w}%` }} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
