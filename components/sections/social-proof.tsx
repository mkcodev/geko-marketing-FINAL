"use client"

import { useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { useT } from "@/hooks/use-translations"
import { CLIENT_LOGOS } from "@/constants/social-proof"

const TRACK = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS]

export function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const prefersReduced = useReducedMotion()
  const t = useT()

  return (
    <section
      ref={ref}
      style={{
        paddingTop: "var(--section-padding-tight)",
        paddingBottom: "var(--section-padding-tight)",
        borderTop: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      {/* Label */}
      <motion.p
        initial={prefersReduced ? false : { opacity: 0, y: 10 }}
        animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.5 }}
        style={{
          textAlign: "center",
          fontFamily: "var(--font-ui)",
          fontSize: "0.78rem",
          fontWeight: 500,
          letterSpacing: "0.12em",
          color: "var(--fg-subtle)",
          textTransform: "uppercase",
          marginBottom: 40,
        }}
      >
        {t.socialProof.label}
      </motion.p>

      {/* ── ROW: left → ── */}
      <MarqueeRow direction="left" speed={55} paused={!!prefersReduced} />

      {/* Trust stats */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.25 }}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px 56px",
          marginTop: 56,
        }}
      >
        {t.socialProof.stats.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.625rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: 5,
              background: "linear-gradient(135deg, var(--color-geko-purple-accent), var(--color-geko-blue-light))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {s.value}
            </p>
            <p style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.8125rem",
              color: "var(--fg-muted)",
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
  paused: reducedMotionPaused,
}: {
  direction: "left" | "right"
  speed: number
  paused: boolean
}) {
  const [hoverPaused, setHoverPaused] = useState(false)
  const paused = reducedMotionPaused || hoverPaused
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
              onHoverStart={() => setHoverPaused(true)}
              onHoverEnd={() => setHoverPaused(false)}
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
      className="marquee-logo-item"
      style={{
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
