"use client"

import { useRef, useState } from "react"
import { motion, useReducedMotion, useInView } from "motion/react"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { IconName } from "@/lib/icons"
import type { Billing, PlanData } from "./paquetes.types"
import { EASE } from "@/lib/animations"
import { BillingToggle } from "./BillingToggle"
import { SilverCard, GoldCard, PlatinumCard } from "./PaqueteCards"
import { useT } from "@/hooks/use-translations"
import { Section } from "@/components/ui/section"

export function Paquetes() {
  const t = useT()
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLParagraphElement>(null)
  const [billing, setBilling] = useState<Billing>("monthly")
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" })
  const footerInView = useInView(footerRef, { once: true })

  const PLANS: PlanData[] = [
    {
      id: "silver",
      name: t.plans.items.silver.name,
      icon: "Package" as IconName,
      tagline: t.plans.items.silver.tagline,
      monthly: 399,
      color: "#94A3B8",
      colorRgb: "148,163,184",
      features: t.plans.items.silver.features,
    },
    {
      id: "gold",
      name: t.plans.items.golden.name,
      icon: "Star" as IconName,
      tagline: t.plans.items.golden.tagline,
      monthly: 699,
      color: "#F59E0B",
      colorRgb: "245,158,11",
      popular: true,
      features: t.plans.items.golden.features,
    },
    {
      id: "platinum",
      name: t.plans.items.platinum.name,
      icon: "Sparkles" as IconName,
      tagline: t.plans.items.platinum.tagline,
      monthly: 1097,
      color: "#8B5CF6",
      colorRgb: "139,92,246",
      features: t.plans.items.platinum.features,
    },
  ]

  return (
    <Section>
      <div ref={sectionRef} className="section-container">
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={headerInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ marginBottom: "var(--section-header-mb)", textAlign: "center" }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 9999,
            background: "rgba(139,92,246,0.12)",
            border: "1px solid rgba(139,92,246,0.30)",
            fontFamily: "var(--font-ui)",
            fontSize: "0.78rem",
            fontWeight: 500,
            color: "#8B5CF6",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {t.plans.label}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: isDesktop
              ? "clamp(2rem, 3.5vw, 3rem)"
              : "clamp(1.75rem, 7vw, 2.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            marginBottom: 12,
          }}
        >
          {t.plans.headline}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.0625rem",
            color: "var(--fg-secondary)",
            marginBottom: 28,
          }}
        >
          {t.plans.subheadline}
        </p>

        <BillingToggle billing={billing} onChange={setBilling} />
      </motion.div>

      {/* Cards */}
      <div
        ref={cardsRef}
        style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={prefersReduced ? false : { opacity: 0, y: 32 }}
            animate={
              cardsInView || prefersReduced
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 32 }
            }
            transition={{ duration: 0.55, delay: prefersReduced ? 0 : i * 0.1, ease: EASE }}
          >
            {plan.id === "silver" && <SilverCard plan={plan} billing={billing} />}
            {plan.id === "gold" && <GoldCard plan={plan} billing={billing} />}
            {plan.id === "platinum" && <PlatinumCard plan={plan} billing={billing} />}
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        ref={footerRef}
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={footerInView || prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.45 }}
        style={{
          textAlign: "center",
          marginTop: 36,
          fontFamily: "var(--font-ui)",
          fontSize: "0.85rem",
          color: "var(--fg-subtle)",
        }}
      >
        {t.plans.customNote}{" "}
        <Link href="/contacto" style={{ color: "var(--color-geko-purple-accent)", textDecoration: "none" }}>
          {t.plans.customCta}
        </Link>
      </motion.p>
      </div>
    </Section>
  )
}
