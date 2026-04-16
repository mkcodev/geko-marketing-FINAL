"use client"

import { useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { IconName } from "@/lib/icons"
import type { Billing, PlanData } from "./paquetes.types"
import { EASE } from "@/lib/animations"
import { BillingToggle } from "./BillingToggle"
import { SilverCard, GoldCard, PlatinumCard } from "./PaqueteCards"

const PLANS: PlanData[] = [
  {
    id: "silver",
    name: "Silver",
    icon: "Package" as IconName,
    tagline: "Para empezar con fuerza",
    monthly: 399,
    color: "#94A3B8",
    colorRgb: "148,163,184",
    features: [
      "Gestión de 2 redes sociales",
      "12 publicaciones/mes",
      "Diseño de contenido",
      "Reporte mensual",
      "Soporte por email",
      "1 campaña Meta Ads/mes",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    icon: "Star" as IconName,
    tagline: "El más popular entre nuestros clientes",
    monthly: 699,
    color: "#F59E0B",
    colorRgb: "245,158,11",
    popular: true,
    features: [
      "Gestión de 4 redes sociales",
      "24 publicaciones/mes",
      "Reels & stories semanales",
      "Gestión de comunidad",
      "Reportes semanales",
      "Campañas Meta + Google Ads",
      "Email marketing (2/mes)",
      "Soporte prioritario",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    icon: "Sparkles" as IconName,
    tagline: "Para marcas con ambición",
    monthly: 1097,
    color: "#8B5CF6",
    colorRgb: "139,92,246",
    features: [
      "Gestión ilimitada de redes",
      "Contenido diario",
      "Producción de vídeo mensual",
      "Estrategia SEO & blog",
      "Dashboard en tiempo real",
      "Campañas multi-plataforma",
      "Email marketing ilimitado",
      "Account manager dedicado",
      "Reunión estratégica quincenal",
    ],
  },
]

export function Paquetes() {
  const ref = useRef(null)
  const [billing, setBilling] = useState<Billing>("monthly")
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()

  return (
    <section
      ref={ref}
      className="section-container"
      style={{ paddingTop: 96, paddingBottom: 96 }}
    >
      {/* Header */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ marginBottom: 48, textAlign: "center" }}
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
          Paquetes
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
            color: "rgba(255,255,255,0.96)",
            marginBottom: 12,
          }}
        >
          Elige tu plan
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.0625rem",
            color: "rgba(255,255,255,0.45)",
            marginBottom: 28,
          }}
        >
          Sin permanencia. Cancela cuando quieras.
        </p>

        <BillingToggle billing={billing} onChange={setBilling} />
      </motion.div>

      {/* Cards */}
      <div
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
          >
            {plan.id === "silver" && <SilverCard plan={plan} billing={billing} />}
            {plan.id === "gold" && <GoldCard plan={plan} billing={billing} />}
            {plan.id === "platinum" && <PlatinumCard plan={plan} billing={billing} />}
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={prefersReduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.45 }}
        style={{
          textAlign: "center",
          marginTop: 36,
          fontFamily: "var(--font-ui)",
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.28)",
        }}
      >
        ¿Necesitas algo personalizado?{" "}
        <Link href="/contacto" style={{ color: "#9B4DBC", textDecoration: "none" }}>
          Hablemos →
        </Link>
      </motion.p>
    </section>
  )
}
