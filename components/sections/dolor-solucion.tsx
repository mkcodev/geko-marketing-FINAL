"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { X, Check } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useT } from "@/hooks/use-translations"
import { EASE } from "@/lib/animations"
import { Section } from "@/components/ui/section"

export function DolorSolucion() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const t = useT()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()

  return (
    <Section background="var(--section-alt)" borderTop borderBottom>
      <div ref={ref} className="section-container">
        {/* Header */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: "var(--section-header-mb)" }}
        >
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: isDesktop ? "clamp(2rem, 3.5vw, 3rem)" : "clamp(1.75rem, 7vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            color: "var(--fg)",
            maxWidth: 600,
            margin: "0 auto 16px",
          }}>
            {t.painSolution.headline}
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.0625rem",
            color: "var(--fg-secondary)",
            maxWidth: 480,
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            {t.painSolution.subheadline}
          </p>
        </motion.div>

        {/* Two columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap: isDesktop ? 16 : 20,
        }}>
          {/* Dolor */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: -20 }}
            animate={prefersReduced || inView ? { opacity: 1, x: 0 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.55, delay: 0.1, ease: EASE }}
            style={{
              padding: "28px 28px",
              borderRadius: 20,
              background: "rgba(239,68,68,0.04)",
              border: "1px solid rgba(239,68,68,0.12)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#EF4444", flexShrink: 0,
              }}>
                <X size={14} strokeWidth={2.5} />
              </div>
              <h3 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1rem", fontWeight: 700,
                color: "var(--fg-secondary)",
                letterSpacing: "-0.01em",
              }}>
                Sin Geko Marketing
              </h3>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {t.painSolution.pains.map((p, i) => (
                <motion.li
                  key={i}
                  initial={prefersReduced ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={prefersReduced ? { duration: 0 } : { delay: 0.15 + i * 0.06, ease: EASE }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: "rgba(239,68,68,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#EF4444", flexShrink: 0, marginTop: 1,
                  }}>
                    <X size={10} strokeWidth={2.5} />
                  </div>
                  <span style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.9rem",
                    color: "var(--fg-secondary)",
                    lineHeight: 1.4,
                  }}>{p}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solución */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 20 }}
            animate={prefersReduced || inView ? { opacity: 1, x: 0 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.55, delay: 0.15, ease: EASE }}
            style={{
              padding: "28px 28px",
              borderRadius: 20,
              background: "rgba(16,185,129,0.04)",
              border: "1px solid rgba(16,185,129,0.14)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow */}
            <div aria-hidden="true" style={{
              position: "absolute", top: "-20%", right: "-10%",
              width: "60%", height: "60%", borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)",
              filter: "blur(30px)", pointerEvents: "none",
            }} />

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22, position: "relative" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.30)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#10B981", flexShrink: 0,
              }}>
                <Check size={14} strokeWidth={2.5} />
              </div>
              <h3 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1rem", fontWeight: 700,
                color: "var(--fg)",
                letterSpacing: "-0.01em",
              }}>
                Con Geko Marketing
              </h3>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
              {t.painSolution.gains.map((g, i) => (
                <motion.li
                  key={i}
                  initial={prefersReduced ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={prefersReduced ? { duration: 0 } : { delay: 0.2 + i * 0.06, ease: EASE }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: "rgba(16,185,129,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#10B981", flexShrink: 0, marginTop: 1,
                  }}>
                    <Check size={10} strokeWidth={2.5} />
                  </div>
                  <span style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.9rem",
                    color: "var(--fg)",
                    lineHeight: 1.4,
                  }}>{g}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
