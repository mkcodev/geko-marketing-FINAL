"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Star, Users, TrendingUp, ChevronDown } from "lucide-react"
import { Typewriter } from "@/components/ui/typewriter"
import { Magnetic } from "@/components/ui/magnetic"
import { useMediaQuery } from "@/hooks/use-media-query"
import { HeroBackground } from "./HeroBackground"
import { SocialCommandCenter } from "./SocialCommandCenter"
import { EASE } from "@/lib/animations"

const TYPEWRITER_WORDS = ["clientes", "ventas", "resultados", "impacto"]

const STATS = [
  { icon: <Users size={16} />, value: "50+", label: "Clientes activos" },
  { icon: <TrendingUp size={16} />, value: "3+", label: "Años de experiencia" },
  { icon: <Star size={16} />, value: "98%", label: "Tasa de retención" },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()

  const anim = (delay: number) => ({
    initial: prefersReduced ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: prefersReduced ? { duration: 0 } : { duration: 0.65, delay, ease: EASE },
  })

  const scrollToNext = () => {
    if (!ref.current) return
    const next = ref.current.nextElementSibling as HTMLElement | null
    if (next) {
      const top = next.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "calc(100svh - 56px - var(--ann-h, 40px))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <HeroBackground />

      <div
        className="section-container"
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          alignItems: "center",
          gap: isDesktop ? "48px" : "32px",
          paddingTop: isDesktop ? 32 : 20,
          paddingBottom: 72,
        }}
      >
        {/* LEFT: Copy */}
        <div>
          {/* Badge */}
          <motion.div {...anim(0)} style={{ marginBottom: 20 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "5px 14px 5px 8px",
                borderRadius: 9999,
                border: "1px solid rgba(107,45,124,0.35)",
                background: "rgba(107,45,124,0.10)",
                fontFamily: "var(--font-ui)",
                fontSize: "0.8125rem",
                color: "rgba(255,255,255,0.80)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6B2D7C, #1D4ED8)",
                  fontSize: "0.75rem",
                }}
              >
                🦎
              </span>
              Agencia de Marketing Digital · Tres Cantos, Madrid
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...anim(0.1)}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isDesktop ? "clamp(2.5rem, 4.5vw, 4rem)" : "clamp(2rem, 8vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.96)",
              marginBottom: 12,
            }}
          >
            Transformamos
            <br />
            seguidores en
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <Typewriter words={TYPEWRITER_WORDS} />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...anim(0.2)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isDesktop ? "1.0625rem" : "1rem",
              color: "rgba(255,255,255,0.52)",
              lineHeight: 1.7,
              marginBottom: 28,
              maxWidth: 480,
            }}
          >
            Gestionamos tus redes sociales y potenciamos tu marca para que{" "}
            <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
              atraigas más clientes y aumentes tus ventas
            </strong>
            . Sin complicaciones. Con resultados medibles en 60 días.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...anim(0.3)}
            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}
          >
            <Magnetic>
              <Link
                href="/servicios"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: isDesktop ? "14px 28px" : "13px 22px",
                  borderRadius: 12,
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "#fff",
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
                  boxShadow: "0 4px 24px rgba(107,45,124,0.45), 0 1px 4px rgba(0,0,0,0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                Ver nuestros servicios
                <ArrowRight size={16} />
              </Link>
            </Magnetic>

            <Magnetic>
              <Link
                href="/contacto"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: isDesktop ? "14px 28px" : "13px 22px",
                  borderRadius: 12,
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.82)",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  whiteSpace: "nowrap",
                }}
              >
                Habla con nosotros
              </Link>
            </Magnetic>
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...anim(0.4)}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: isDesktop ? "32px" : "20px",
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: "rgba(107,45,124,0.15)",
                    color: "#9B4DBC",
                    border: "1px solid rgba(107,45,124,0.25)",
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.40)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Visual (desktop only) */}
        {isDesktop && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.8, delay: 0.25, ease: EASE }}
            style={{ position: "relative", height: 520, overflow: "hidden" }}
          >
            <SocialCommandCenter />
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReduced ? { duration: 0 } : { delay: 1.8 }}
        whileHover={{ opacity: 0.75 }}
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: "rgba(255,255,255,0.30)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px 16px",
        }}
        aria-label="Ir a la siguiente sección"
      >
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={15} />
        </motion.div>
      </motion.button>
    </section>
  )
}
