"use client"

import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { Check, ArrowRight, Zap } from "lucide-react"
import { Icon } from "@/lib/icons"
import type { PlanData, Billing } from "./paquetes.types"
import { BILLING_OPTIONS, getPrice } from "./paquetes.types"
import { EASE } from "@/lib/animations"
import { useT } from "@/hooks/use-translations"

export function PriceDisplay({ plan, billing }: { plan: PlanData; billing: Billing }) {
  const t = useT()
  const opt = BILLING_OPTIONS.find((o) => o.id === billing)!
  const price = getPrice(plan.monthly, billing)
  const totalSavings = (plan.monthly - price) * opt.months

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={`${plan.id}-${billing}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: EASE }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              display: "block",
            }}
          >
            {price.toLocaleString("es-ES")}€
          </motion.span>
        </AnimatePresence>
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.85rem",
            color: "var(--fg-muted)",
          }}
        >
          {t.plans.perMonth}
        </span>
      </div>
      <AnimatePresence mode="wait">
        {opt.discount > 0 && (
          <motion.p
            key={billing}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.78rem",
              color: "#10B981",
              marginTop: 4,
            }}
          >
            {t.plans.savings
              .replace("{amount}", totalSavings.toLocaleString("es-ES"))
              .replace("{months}", String(opt.months))}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FeatureList({ plan }: { plan: PlanData }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        flexGrow: 1,
        marginBottom: 24,
      }}
    >
      {plan.features.map((feature) => (
        <li
          key={feature}
          style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: `rgba(${plan.colorRgb}, 0.15)`,
              color: plan.color,
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            <Check size={11} strokeWidth={2.5} />
          </span>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.875rem",
              color: "var(--fg-secondary)",
              lineHeight: 1.4,
            }}
          >
            {feature}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function PlanHeader({ plan }: { plan: PlanData }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <Icon name={plan.icon as Parameters<typeof Icon>[0]["name"]} size={22} style={{ color: plan.color, flexShrink: 0 }} />
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: plan.color,
            letterSpacing: "-0.01em",
          }}
        >
          {plan.name}
        </h3>
      </div>
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "0.82rem",
          color: "var(--fg-muted)",
          lineHeight: 1.4,
        }}
      >
        {plan.tagline}
      </p>
    </div>
  )
}

type CTAVariant = "default" | "gold" | "platinum"

export function PlanCTA({ plan, variant }: { plan: PlanData; variant: CTAVariant }) {
  const t = useT()
  const bg: Record<CTAVariant, string> = {
    default: "var(--surface-strong)",
    gold: "var(--gradient-brand)",
    platinum: "linear-gradient(135deg, #4C1D95 0%, var(--color-geko-blue) 100%)",
  }
  const shadow: Record<CTAVariant, string> = {
    default: "none",
    gold: "0 4px 20px var(--color-geko-purple-a40)",
    platinum: "0 4px 20px rgba(139,92,246,0.40)",
  }

  return (
    <Link
      href="/contacto"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "13px 20px",
        borderRadius: 12,
        fontFamily: "var(--font-ui)",
        fontSize: "0.9375rem",
        fontWeight: 600,
        textDecoration: "none",
        color: variant === "default" ? "var(--fg)" : "#fff",
        background: bg[variant],
        border: variant === "default" ? "1px solid var(--border-strong)" : "none",
        boxShadow: shadow[variant],
        transition: "opacity 0.2s, transform 0.2s",
      }}
    >
      {variant === "platinum" ? t.plans.ctaPlatinum : `${t.plans.ctaDefault} ${plan.name}`}
      <ArrowRight size={15} />
    </Link>
  )
}

// Re-export Zap for GoldCard popular badge
export { Zap }
