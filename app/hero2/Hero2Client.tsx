"use client"

import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { motion, useReducedMotion, useInView, AnimatePresence } from "motion/react"
import { ArrowRight, ChevronRight } from "lucide-react"
import { EASE_SMOOTH, DUR_SLOW, DUR_SLOWER } from "@/lib/animations"

// ── Constants ──────────────────────────────────────────────────

const CYCLING_WORDS = ["euros", "clientes", "resultados", "conversiones"]

const MARQUEE_ITEMS = [
  "Gestión de Redes", "Branding", "Páginas Web",
  "ROI Medible", "+50 Clientes", "Tres Cantos · Madrid",
  "Gestión de Redes", "Branding", "Páginas Web",
  "ROI Medible", "+50 Clientes", "Tres Cantos · Madrid",
]

// ── Reveal line ─────────────────────────────────────────────────

interface RevealLineProps {
  children: React.ReactNode
  delay: number
  active: boolean
  prefersReduced: boolean
}

function RevealLine({ children, delay, active, prefersReduced }: RevealLineProps) {
  return (
    <div style={{ overflow: "hidden", lineHeight: 1.0, paddingBottom: "0.04em" }}>
      <motion.div
        initial={prefersReduced ? false : { y: "108%" }}
        animate={active ? { y: 0 } : {}}
        transition={{ duration: DUR_SLOWER, delay, ease: EASE_SMOOTH }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────

export function Hero2Client() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length)
    }, 2600)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Hero — Typographic Manifesto"
      style={{ minHeight: "100dvh", background: "#050508", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      {/* Decorative background "G" */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-10%", right: "-5%",
        fontFamily: "var(--font-heading)",
        fontSize: "clamp(24rem,55vw,72rem)",
        fontWeight: 800,
        lineHeight: 1,
        color: "rgba(255,255,255,0.018)",
        letterSpacing: "-0.06em",
        userSelect: "none",
        pointerEvents: "none",
      }}>
        G
      </div>

      {/* Purple accent line */}
      <div aria-hidden="true" style={{
        position: "absolute",
        right: "clamp(60px, 12vw, 140px)",
        top: "15%",
        width: 1,
        height: "35%",
        background: "linear-gradient(180deg, transparent 0%, var(--color-geko-purple-a55) 40%, var(--color-geko-purple-a55) 60%, transparent 100%)",
        transform: "rotate(18deg)",
        transformOrigin: "top center",
      }} />

      {/* Subtle dot grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px,transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 65% 70% at 30% 50%,transparent 0%,black 70%)",
      }} />

      {/* ── Main content ── */}
      <div className="section-container" style={{ width: "100%", paddingTop: "var(--space-24)", paddingBottom: "var(--space-20)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(2.5rem,5vw,4rem)" }}>

          {/* Tag */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR_SLOW, ease: EASE_SMOOTH }}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "5px 14px", borderRadius: "var(--radius-full)",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)",
              color: "var(--fg-secondary)", fontSize: "var(--text-xs)",
              fontFamily: "var(--font-ui)", fontWeight: 500, letterSpacing: "0.10em", textTransform: "uppercase",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-geko-purple-accent)", flexShrink: 0 }} />
              Geko Marketing · Agencia Digital · Madrid
            </span>
          </motion.div>

          {/* H1 block */}
          <h1
            aria-label="Marketing que se mide en resultados"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3.2rem,2rem+8vw,8.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "var(--fg)",
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.06em",
            }}
          >
            <RevealLine delay={0} active={isInView} prefersReduced={prefersReduced ?? false}>
              Marketing que
            </RevealLine>

            <RevealLine delay={0.14} active={isInView} prefersReduced={prefersReduced ?? false}>
              se mide en
            </RevealLine>

            {/* Cycling word line */}
            <div style={{ overflow: "hidden", lineHeight: 1.0, paddingBottom: "0.04em" }}>
              <motion.div
                initial={prefersReduced ? false : { y: "108%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: DUR_SLOWER, delay: 0.28, ease: EASE_SMOOTH }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={prefersReduced ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={prefersReduced ? undefined : { opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.38, ease: EASE_SMOOTH }}
                    className="text-gradient-brand"
                    style={{ display: "inline-block" }}
                  >
                    {CYCLING_WORDS[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>
          </h1>

          {/* Marquee strip */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: DUR_SLOW, delay: 0.5 }}
            style={{ display: "flex", flexDirection: "column", gap: 0 }}
          >
            <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
            <div style={{ overflow: "hidden", padding: "14px 0" }}>
              <div style={{
                display: "inline-flex", whiteSpace: "nowrap",
                animation: prefersReduced ? undefined : "marquee 28s linear infinite",
              }}>
                {MARQUEE_ITEMS.map((item, i) => (
                  <span
                    key={i}
                    aria-hidden={i >= MARQUEE_ITEMS.length / 2}
                    style={{
                      display: "inline-flex", alignItems: "center",
                      padding: "0 clamp(20px,3vw,40px)",
                      fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)",
                      fontWeight: 500, letterSpacing: "0.05em",
                      color: i % 6 === 0 ? "var(--color-geko-purple-accent)" : "var(--fg-secondary)",
                      textTransform: "uppercase",
                      borderRight: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
          </motion.div>

          {/* Bottom row */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DUR_SLOW, delay: 0.65, ease: EASE_SMOOTH }}
            style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(2rem,5vw,5rem)", alignItems: "end" }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xl)", lineHeight: 1.55, color: "var(--fg-secondary)", margin: 0, maxWidth: 520 }}>
              Sin estrategia, el marketing es ruido.{" "}
              <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Con Geko, es crecimiento medible</strong>{" "}
              que se ve en tu cuenta de resultados.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
              <a
                href="/contacto"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "var(--gradient-brand)", color: "#fff", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: "var(--text-sm)", textDecoration: "none", letterSpacing: "0.01em", transition: "filter 200ms ease,transform 200ms ease", whiteSpace: "nowrap" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.filter = "brightness(1.15)"; el.style.transform = "translateY(-2px)" }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.filter = "brightness(1)"; el.style.transform = "translateY(0)" }}
              >
                Empezar ahora <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
              </a>
              <Link
                href="/servicios"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--fg-secondary)", fontFamily: "var(--font-ui)", fontWeight: 500, fontSize: "var(--text-sm)", textDecoration: "none", transition: "color 200ms ease", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--fg)" }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--fg-secondary)" }}
              >
                Ver nuestro método <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
