"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence, useReducedMotion } from "motion/react"
import { ChevronDown } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useT } from "@/hooks/use-translations"
import { EASE } from "@/lib/animations"
import { Section } from "@/components/ui/section"


export function Faq() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()
  const [open, setOpen] = useState<number | null>(null)
  const t = useT()

  return (
    <Section spacing="tight">
      <div ref={ref} className="section-container">
      {/* Header */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: EASE }}
        style={{ marginBottom: "var(--section-header-mb)", textAlign: "center" }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 9999,
            background: "rgba(16,185,129,0.10)",
            border: "1px solid rgba(16,185,129,0.25)",
            fontFamily: "var(--font-ui)",
            fontSize: "0.78rem",
            fontWeight: 500,
            color: "#10B981",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          FAQ
        </span>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: isDesktop ? "clamp(2rem, 3.5vw, 3rem)" : "clamp(1.75rem, 7vw, 2.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
          }}
        >
          {t.faq.headline}
        </h2>
      </motion.div>

      {/* Accordion */}
      <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
        {t.faq.items.map((faq, i) => (
          <motion.div
            key={i}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.45, delay: i * 0.06, ease: EASE }}
          >
            <div
              style={{
                borderRadius: 14,
                border: open === i ? "1px solid var(--color-geko-purple-a35)" : "1px solid var(--border-subtle)",
                background: open === i ? "var(--color-geko-purple-a06)" : "var(--surface)",
                overflow: "hidden",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              {/* Question */}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: open === i ? "var(--fg)" : "var(--fg)",
                    lineHeight: 1.3,
                  }}
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.25 }}
                  style={{ flexShrink: 0, color: open === i ? "var(--color-geko-purple-accent)" : "var(--fg-muted)" }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={prefersReduced ? { duration: 0 } : { duration: 0.28, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      style={{
                        padding: "0 24px 20px",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9375rem",
                        color: "var(--fg-secondary)",
                        lineHeight: 1.7,
                      }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </Section>
  )
}
