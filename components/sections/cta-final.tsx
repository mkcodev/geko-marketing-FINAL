"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { ArrowRight, Phone } from "lucide-react"
import { Magnetic } from "@/components/ui/magnetic"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useT } from "@/hooks/use-translations"
import { EASE } from "@/lib/animations"

export function CtaFinal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()
  const t = useT()

  return (
    <Section spacing="tight">
      <div ref={ref} className="section-container">
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease: EASE }}
        style={{
          position: "relative",
          padding: isDesktop ? "72px 64px" : "48px 28px",
          borderRadius: 28,
          background: "linear-gradient(135deg, var(--color-geko-purple-a15) 0%, var(--color-geko-blue-a12) 100%)",
          border: "1px solid var(--color-geko-purple-a25)",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Animated shimmer border */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: 29,
            padding: 1,
            background: "linear-gradient(var(--shimmer-angle, 0deg), transparent 0%, var(--color-geko-purple-a80) 40%, rgba(59,130,246,0.80) 60%, transparent 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
            animation: "border-spin 4s linear infinite",
          }}
        />

        {/* Background orbs */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-30%",
            left: "-5%",
            width: "50%",
            height: "120%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, var(--color-geko-purple-a20) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-30%",
            right: "-5%",
            width: "50%",
            height: "120%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, var(--color-geko-blue-a18) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        {/* Grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
            animate={prefersReduced || inView ? { opacity: 1, scale: 1 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.5, delay: 0.1 }}
            style={{ marginBottom: 20 }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 9999,
                background: "var(--color-geko-purple-a15)",
                border: "1px solid var(--color-geko-purple-a35)",
                fontFamily: "var(--font-ui)",
                fontSize: "0.8125rem",
                color: "var(--color-geko-purple-accent)",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--color-geko-purple-accent)",
                  animation: "pulse-glow 2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              {t.ctaFinal.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.15 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isDesktop ? "clamp(2.25rem, 4vw, 3.5rem)" : "clamp(1.875rem, 8vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, var(--color-geko-purple-accent) 0%, var(--color-geko-blue-light) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.ctaFinal.headline}
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              color: "var(--fg-secondary)",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto 36px",
            }}
          >
            {t.ctaFinal.subheadline}
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.5, delay: 0.25 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}
          >
            <Magnetic>
              <Link
                href="/contacto"
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 32px",
                  borderRadius: 14,
                  fontFamily: "var(--font-ui)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#fff",
                  textDecoration: "none",
                  background: "var(--gradient-brand)",
                  boxShadow: "0 4px 32px var(--color-geko-purple-a50)",
                  whiteSpace: "nowrap",
                  animation: "cta-breathe 3s ease-in-out infinite",
                  overflow: "hidden",
                }}
              >
                {/* Shimmer sweep */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
                    animation: "btn-shimmer 2.8s ease-in-out infinite",
                    borderRadius: "inherit",
                    pointerEvents: "none",
                  }}
                />
                {t.ctaFinal.cta}
                <ArrowRight size={17} />
              </Link>
            </Magnetic>

            <Magnetic>
              <a
                href="tel:+34633197798"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 28px",
                  borderRadius: 14,
                  fontFamily: "var(--font-ui)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "var(--fg)",
                  textDecoration: "none",
                  border: "1px solid var(--border-strong)",
                  background: "var(--surface)",
                  backdropFilter: "blur(12px)",
                  whiteSpace: "nowrap",
                }}
              >
                <Phone size={16} />
                633 197 798
              </a>
            </Magnetic>
          </motion.div>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={prefersReduced || inView ? { opacity: 1 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.4, delay: 0.35 }}
            style={{
              marginTop: 24,
              fontFamily: "var(--font-ui)",
              fontSize: "0.82rem",
              color: "var(--fg-subtle)",
            }}
          >
            {t.ctaFinal.disclaimer}
          </motion.p>
        </div>
      </motion.div>

      <style>{`
        @keyframes border-spin {
          0%   { --shimmer-angle: 0deg }
          100% { --shimmer-angle: 360deg }
        }
        @property --shimmer-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes cta-breathe {
          0%, 100% { box-shadow: 0 4px 32px var(--color-geko-purple-a50); }
          50%       { box-shadow: 0 4px 48px var(--color-geko-purple-a75), 0 0 0 6px var(--color-geko-purple-a12); }
        }
        @keyframes btn-shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
    </Section>
  )
}
