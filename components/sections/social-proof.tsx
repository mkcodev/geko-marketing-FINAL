"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const LOGOS = [
  { src: "/logos/logo-bioresina.webp",   alt: "Bioresina" },
  { src: "/logos/logo-camaron.webp",     alt: "Camarón" },
  { src: "/logos/logo-ducha.webp",       alt: "Ducha" },
  { src: "/logos/logo-la-sala.webp",     alt: "La Sala" },
  { src: "/logos/logo-malabella.webp",   alt: "Malabella" },
  { src: "/logos/logo-marpe.webp",       alt: "Marpe" },
  { src: "/logos/logo-mkcodev.webp",     alt: "MKCoDev" },
  { src: "/logos/logo-pull-people.webp", alt: "Pull People" },
]

// Quadruple the array so both rows have enough content to fill wide screens
const TRACK = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS]

export function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section
      ref={ref}
      style={{
        paddingTop: 72,
        paddingBottom: 72,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}
    >
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          fontFamily: "var(--font-ui)",
          fontSize: "0.78rem",
          fontWeight: 500,
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.28)",
          textTransform: "uppercase",
          marginBottom: 40,
        }}
      >
        Empresas que confían en nosotros
      </motion.p>

      {/* ── ROW: left → ── */}
      <MarqueeRow direction="left" speed={55} />

      {/* Trust stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px 56px",
          marginTop: 56,
        }}
      >
        {[
          { value: "50+",  label: "Clientes activos" },
          { value: "3 años", label: "De experiencia" },
          { value: "98%",  label: "Tasa de retención" },
          { value: "€2M+", label: "En ventas generadas" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.625rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: 5,
              background: "linear-gradient(135deg, #9B4DBC, #3B82F6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {s.value}
            </p>
            <p style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.35)",
            }}>
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

// ─── Marquee row ──────────────────────────────────────────────────────────────

function MarqueeRow({
  direction,
  speed,
}: {
  direction: "left" | "right"
  speed: number
}) {
  const [paused, setPaused] = useState(false)
  const anim = direction === "left" ? "marquee" : "marquee-reverse"

  return (
    <div style={{ position: "relative" }}>
      {/* Left fade mask */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: 140,
          background: "linear-gradient(to right, var(--bg, #080810), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Right fade mask */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0, top: 0, bottom: 0,
          width: 140,
          background: "linear-gradient(to left, var(--bg, #080810), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Track */}
      <div style={{ display: "flex", overflow: "hidden", userSelect: "none" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            animation: `${anim} ${speed}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
            flexShrink: 0,
            willChange: "transform",
          }}
        >
          {TRACK.map((logo, i) => (
            <LogoItem
              key={i}
              logo={logo}
              onHoverStart={() => setPaused(true)}
              onHoverEnd={() => setPaused(false)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Logo item ────────────────────────────────────────────────────────────────

function LogoItem({
  logo,
  onHoverStart,
  onHoverEnd,
}: {
  logo: { src: string; alt: string }
  onHoverStart: () => void
  onHoverEnd: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
        height: 80,
        flexShrink: 0,
      }}
      onMouseEnter={() => { setHovered(true); onHoverStart() }}
      onMouseLeave={() => { setHovered(false); onHoverEnd() }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.alt}
        style={{
          height: 52,
          width: "auto",
          maxWidth: 160,
          objectFit: "contain",
          filter: hovered ? "grayscale(0) brightness(1.05)" : "grayscale(1) brightness(0.55)",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "filter 0.3s, transform 0.3s",
        }}
      />
    </div>
  )
}
