"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence, useReducedMotion } from "motion/react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useT } from "@/hooks/use-translations"
import { Icon } from "@/lib/icons"
import type { IconName } from "@/lib/icons"
import { EASE } from "@/lib/animations"
const AUTOPLAY_INTERVAL = 4500

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
  const t = useT()
  const REVIEWS = t.testimonials.items
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [hovered, setHovered] = useState(false)

  const prev = useCallback(() => { setDir(-1); setIdx(i => (i - 1 + REVIEWS.length) % REVIEWS.length) }, [REVIEWS.length])
  const next = useCallback(() => { setDir(1); setIdx(i => (i + 1) % REVIEWS.length) }, [REVIEWS.length])

  // Autoplay
  useEffect(() => {
    if (hovered) return
    const id = setInterval(next, AUTOPLAY_INTERVAL)
    return () => clearInterval(id)
  }, [hovered, next])

  const review = REVIEWS[idx]

  return (
    <Section background="var(--section-alt)" borderTop borderBottom>
      <div ref={ref} className="section-container">
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
            color: "var(--fg)", marginBottom: 14,
          }}>
            {t.testimonials.headline}
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "1.0625rem",
            color: "var(--fg-secondary)", maxWidth: 440, margin: "0 auto", lineHeight: 1.7,
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
            background: "var(--surface)",
            border: "1px solid var(--border)",
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
              color: "var(--border-subtle)", fontWeight: 900,
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
                    color: "var(--fg-muted)", letterSpacing: "0.05em",
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
                  color: "var(--fg)",
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
                    <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", fontWeight: 600, color: "var(--fg)", margin: 0 }}>
                      {review.name}
                    </p>
                    <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.78rem", color: "var(--fg-muted)", margin: 0 }}>
                      {review.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Autoplay progress bar */}
          <div style={{ height: 2, background: "var(--border-subtle)", borderRadius: 2, marginTop: 16, overflow: "hidden" }}>
            {!hovered && (
              <motion.div
                key={`progress-${idx}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
                style={{ height: "100%", background: "var(--gradient-brand-90)", borderRadius: 2 }}
              />
            )}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 20 }}>
            <button
              onClick={prev}
              aria-label="Anterior"
              style={{
                width: 38, height: 38, borderRadius: "50%", border: "1px solid var(--border-strong)",
                background: "var(--surface)", color: "var(--fg-secondary)",
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
                    background: i === idx ? "linear-gradient(90deg,var(--color-geko-purple),var(--color-geko-blue-light))" : "var(--border-strong)",
                    cursor: "pointer", padding: 0, transition: "all 0.3s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Siguiente"
              style={{
                width: 38, height: 38, borderRadius: "50%", border: "1px solid var(--border-strong)",
                background: "var(--surface)", color: "var(--fg-secondary)",
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
              <Icon name={item.icon} size={15} style={{ color: "var(--fg-secondary)", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.85rem", color: "var(--fg-secondary)", fontWeight: 500 }}>
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
