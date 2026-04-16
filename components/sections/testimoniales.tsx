"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Icon } from "@/lib/icons"
import type { IconName } from "@/lib/icons"
import { EASE } from "@/lib/animations"
const AUTOPLAY_INTERVAL = 4500

const REVIEWS = [
  {
    name: "Laura Martínez",
    role: "CEO · Clínica Estética Lumina",
    avatar: "LM",
    color: "#9B4DBC",
    stars: 5,
    text: "En 3 meses duplicamos las reservas online desde Instagram. Geko no solo gestiona las redes — entienden el negocio y crean contenido que convierte. El equipo es increíblemente rápido y profesional.",
    platform: "Google",
    result: "+112% reservas online",
  },
  {
    name: "Carlos Ruiz",
    role: "Fundador · TechFix Soluciones",
    avatar: "CR",
    color: "#3B82F6",
    stars: 5,
    text: "Llevábamos años sin presencia digital real. En 60 días teníamos una estrategia sólida, contenido diario y nuestras primeras campañas de Meta con un ROAS de ×3.8. Ahora no podemos imaginar el negocio sin Geko.",
    platform: "Google",
    result: "ROAS ×3.8 desde el mes 2",
  },
  {
    name: "Sofía Delgado",
    role: "Directora · Academia Idiomas Berlin",
    avatar: "SD",
    color: "#10B981",
    stars: 5,
    text: "Lo que más me sorprendió fue la rapidez. El primer mes ya notamos el cambio en las consultas. Ahora tenemos lista de espera para septiembre — algo que nunca habíamos conseguido con otras agencias.",
    platform: "Google",
    result: "Lista de espera en 90 días",
  },
  {
    name: "Marcos Jiménez",
    role: "Propietario · Restaurante La Brasa",
    avatar: "MJ",
    color: "#F59E0B",
    stars: 5,
    text: "Con Geko pasamos de 400 a 8.200 seguidores en Instagram en 4 meses. Las reservas por redes sociales aumentaron un 340%. Su estrategia de contenido es diferente — cada publicación tiene un propósito.",
    platform: "Google",
    result: "+8K seguidores · +340% reservas",
  },
  {
    name: "Ana Vega",
    role: "Directora Mkt · Grupo Inmobiliario Solaris",
    avatar: "AV",
    color: "#EC4899",
    stars: 5,
    text: "Gestionamos con Geko tres marcas a la vez y el nivel de organización es impresionante. Reportes semanales claros, respuesta en menos de 2 horas siempre y resultados que presentamos sin vergüenza a dirección.",
    platform: "Google",
    result: "3 marcas · Reportes semanales",
  },
]

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
      ))}
    </div>
  )
}

export function Testimoniales() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [hovered, setHovered] = useState(false)

  const prev = useCallback(() => { setDir(-1); setIdx(i => (i - 1 + REVIEWS.length) % REVIEWS.length) }, [])
  const next = useCallback(() => { setDir(1); setIdx(i => (i + 1) % REVIEWS.length) }, [])

  // Autoplay
  useEffect(() => {
    if (hovered) return
    const id = setInterval(next, AUTOPLAY_INTERVAL)
    return () => clearInterval(id)
  }, [hovered, next])

  const review = REVIEWS[idx]

  return (
    <section
      ref={ref}
      style={{
        paddingTop: 96, paddingBottom: 96,
        background: "rgba(255,255,255,0.008)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span style={{
            display: "inline-block", padding: "4px 12px", borderRadius: 9999,
            background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#F59E0B", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16,
          }}>
            Testimoniales
          </span>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: isDesktop ? "clamp(2rem, 3.5vw, 3rem)" : "clamp(1.75rem, 7vw, 2.5rem)",
            fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05,
            color: "rgba(255,255,255,0.96)", marginBottom: 14,
          }}>
            Lo que dicen nuestros clientes
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "1.0625rem",
            color: "rgba(255,255,255,0.42)", maxWidth: 440, margin: "0 auto", lineHeight: 1.7,
          }}>
            Reseñas verificadas en Google Business. Sin filtros.
          </p>
        </motion.div>

        {/* Main review card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          style={{ maxWidth: 780, margin: "0 auto" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div style={{
            position: "relative",
            padding: isDesktop ? "48px 52px" : "32px 24px",
            borderRadius: 24,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
            minHeight: 280,
          }}>
            {/* Glow */}
            <div aria-hidden style={{
              position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
              width: "60%", height: "60%", borderRadius: "50%",
              background: `radial-gradient(ellipse, ${review.color}14 0%, transparent 70%)`,
              filter: "blur(40px)", pointerEvents: "none",
              transition: "background 0.4s",
            }} />

            {/* Quote mark */}
            <div aria-hidden style={{
              position: "absolute", top: 24, right: 32,
              fontFamily: "Georgia, serif", fontSize: "6rem", lineHeight: 1,
              color: "rgba(255,255,255,0.04)", fontWeight: 900,
              pointerEvents: "none", userSelect: "none",
            }}>
              &ldquo;
            </div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={idx}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.32, ease: EASE }}
              >
                {/* Stars + platform */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, position: "relative" }}>
                  <Stars n={review.stars} />
                  <span style={{
                    fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600,
                    color: "rgba(255,255,255,0.30)", letterSpacing: "0.05em",
                  }}>
                    via {review.platform}
                  </span>
                  <span style={{
                    marginLeft: "auto",
                    padding: "3px 10px", borderRadius: 6,
                    background: `${review.color}18`, border: `1px solid ${review.color}30`,
                    fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 700,
                    color: review.color,
                  }}>
                    {review.result}
                  </span>
                </div>

                {/* Text */}
                <blockquote style={{
                  fontFamily: "var(--font-body)",
                  fontSize: isDesktop ? "1.125rem" : "1rem",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.78)",
                  fontStyle: "italic",
                  margin: "0 0 28px",
                  position: "relative",
                }}>
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg, ${review.color}60, ${review.color}30)`,
                    border: `1px solid ${review.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-ui)", fontSize: "0.8rem", fontWeight: 700,
                    color: review.color,
                  }}>
                    {review.avatar}
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.88)", margin: 0 }}>
                      {review.name}
                    </p>
                    <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>
                      {review.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Autoplay progress bar */}
          <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 16, overflow: "hidden" }}>
            {!hovered && (
              <motion.div
                key={`progress-${idx}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
                style={{ height: "100%", background: "linear-gradient(90deg, #6B2D7C, #3B82F6)", borderRadius: 2 }}
              />
            )}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 20 }}>
            <button
              onClick={prev}
              aria-label="Anterior"
              style={{
                width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.60)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "border-color 0.2s",
              }}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: 6 }}>
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i) }}
                  aria-label={`Reseña ${i + 1}`}
                  style={{
                    width: i === idx ? 20 : 6, height: 6, borderRadius: 999, border: "none",
                    background: i === idx ? "linear-gradient(90deg,#6B2D7C,#3B82F6)" : "rgba(255,255,255,0.18)",
                    cursor: "pointer", padding: 0, transition: "all 0.3s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Siguiente"
              style={{
                width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.60)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "border-color 0.2s",
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Mini trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 32, marginTop: 48, flexWrap: "wrap" }}
        >
          {([
            { label: "50+ clientes", icon: "Users" as IconName },
            { label: "5.0 en Google", icon: "Star" as IconName },
            { label: "+15 reseñas verificadas", icon: "CheckSquare" as IconName },
          ]).map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name={item.icon} size={15} style={{ color: "rgba(255,255,255,0.45)", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.85rem", color: "rgba(255,255,255,0.40)", fontWeight: 500 }}>
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
