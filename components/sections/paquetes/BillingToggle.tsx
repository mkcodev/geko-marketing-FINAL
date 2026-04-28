"use client"

import { motion } from "motion/react"
import type { Billing } from "./paquetes.types"
import { BILLING_OPTIONS } from "./paquetes.types"
import { useT } from "@/hooks/use-translations"

interface BillingToggleProps {
  billing: Billing
  onChange: (b: Billing) => void
}

export function BillingToggle({ billing, onChange }: BillingToggleProps) {
  const t = useT()
  const BILLING_LABELS: Record<Billing, string> = {
    monthly: t.plans.billingMonthly,
    quarterly: t.plans.billingQuarterly,
    biannual: t.plans.billingBiannual,
    annual: t.plans.billingAnnual,
  }
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px",
        borderRadius: 14,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        position: "relative",
      }}
    >
      {BILLING_OPTIONS.map((opt) => {
        const active = billing === opt.id
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            style={{
              position: "relative",
              padding: "7px 14px",
              borderRadius: 10,
              border: "none",
              background: "transparent",
              fontFamily: "var(--font-ui)",
              fontSize: "0.82rem",
              fontWeight: active ? 600 : 400,
              color: active ? "#fff" : "var(--fg-muted)",
              cursor: "pointer",
              transition: "color 0.2s",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              whiteSpace: "nowrap",
            }}
          >
            {active && (
              <motion.div
                layoutId="toggle-bg"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 10,
                  background: opt.discount > 0
                    ? "linear-gradient(135deg, var(--color-geko-purple), var(--color-geko-blue))"
                    : "var(--border-strong)",
                  zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            {BILLING_LABELS[opt.id]}
            {opt.discount > 0 && (
              <span
                style={{
                  fontSize: "0.60rem",
                  fontWeight: 700,
                  color: active ? "var(--fg)" : "#10B981",
                  letterSpacing: "0.03em",
                  lineHeight: 1,
                }}
              >
                -{opt.discount}%
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
