"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, Star, Users, TrendingUp, ChevronDown } from "lucide-react"
import { Typewriter } from "@/components/ui/typewriter"
import { Magnetic } from "@/components/ui/magnetic"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useT } from "@/hooks/use-translations"
import { HeroBackground } from "./HeroBackground"
import { SocialCommandCenter } from "./SocialCommandCenter"
import { EASE } from "@/lib/animations"

const STAT_ICONS = [<Users size={16} key="u" />, <TrendingUp size={16} key="t" />, <Star size={16} key="s" />]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const t = useT()
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
      className="hero-height"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        borderBottom: "1px solid var(--border-subtle)",
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
          paddingTop: isDesktop ? 32 : 16,
          paddingBottom: isDesktop ? 72 : 56,
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
                border: "1px solid var(--color-geko-purple-a35)",
                background: "var(--color-geko-purple-a10)",
                fontFamily: "var(--font-ui)",
                fontSize: "0.8125rem",
                color: "var(--fg)",
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
                  background: "linear-gradient(135deg, var(--color-geko-purple), var(--color-geko-blue))",
                }}
              >
                <Image
                  src="/logos/geko/white-minimal-clean.svg"
                  alt=""
                  width={13}
                  height={13}
                />
              </span>
              {t.hero.badge}
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
              color: "var(--fg)",
              marginBottom: 12,
            }}
          >
            {t.hero.headline}
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, var(--color-geko-purple-accent) 0%, var(--color-geko-blue-light) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <Typewriter words={t.hero.typewriterWords} />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...anim(0.2)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isDesktop ? "1.0625rem" : "1rem",
              color: "var(--fg-secondary)",
              lineHeight: 1.7,
              marginBottom: 28,
              maxWidth: 480,
            }}
          >
            {t.hero.subheadline}
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
                  background: "var(--gradient-brand)",
                  boxShadow: "0 4px 24px var(--color-geko-purple-a45), 0 1px 4px rgba(0,0,0,0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                {t.hero.ctaSecondary}
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
                  color: "var(--fg)",
                  textDecoration: "none",
                  border: "1px solid var(--border-strong)",
                  background: "var(--surface)",
                  backdropFilter: "blur(12px)",
                  whiteSpace: "nowrap",
                }}
              >
                {t.hero.cta}
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
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            {t.hero.stats.map((stat, i) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: "var(--color-geko-purple-a15)",
                    color: "var(--color-geko-purple-accent)",
                    border: "1px solid var(--color-geko-purple-a25)",
                    flexShrink: 0,
                  }}
                >
                  {STAT_ICONS[i]}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "var(--fg)",
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.78rem",
                      color: "var(--fg-muted)",
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
          color: "var(--fg-muted)",
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
