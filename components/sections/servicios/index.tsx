"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  SpotlightCard,
  CardTag,
  SocialDashboard,
  RoasGauge,
  TrafficChart,
  EmailStats,
  DashboardPreview,
  cardTitle,
  cardDesc,
} from "./ServicioCard"
import { EASE } from "@/lib/animations"

export function Servicios() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()

  return (
    <section ref={ref} className="section-container" style={{ paddingTop: 96, paddingBottom: 96 }}>
      {/* Header */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: EASE }}
        style={{ marginBottom: 56 }}
      >
        <p style={{
          fontFamily: "var(--font-ui)", fontSize: "0.75rem", fontWeight: 500,
          letterSpacing: "0.12em", textTransform: "uppercase", color: "#9B4DBC", marginBottom: 14,
        }}>
          Servicios
        </p>
        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: isDesktop ? "clamp(2.25rem, 4vw, 3.25rem)" : "clamp(1.875rem, 7vw, 2.5rem)",
          fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05,
          color: "rgba(255,255,255,0.96)", maxWidth: 560,
        }}>
          Todo lo que tu marca necesita
          <br />
          <span style={{
            background: "linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            para dominar online
          </span>
        </h2>
      </motion.div>

      {/* Bento grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr",
        gap: 12,
      }}>
        {/* CARD 1 — Redes Sociales: dominant 2×2 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0, ease: EASE }}
          style={{ gridColumn: isDesktop ? "1 / 3" : "span 1", gridRow: isDesktop ? "1 / 3" : undefined }}
        >
          <SpotlightCard color="#6B2D7C" glow="rgba(107,45,124,0.25)">
            <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: isDesktop ? 420 : 320 }}>
              <CardTag color="#9B4DBC" label="Instagram · TikTok · LinkedIn" />
              <h3 style={cardTitle}>Gestión de Redes Sociales</h3>
              <p style={cardDesc}>
                Estrategia, contenido y comunidad en las plataformas que importan. Cada publicación con un propósito claro.
              </p>
              <div style={{ marginTop: "auto", paddingTop: 20 }}>
                <SocialDashboard />
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* CARD 2 — Publicidad */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          style={{ gridColumn: isDesktop ? "3 / 4" : "span 1", gridRow: isDesktop ? "1 / 2" : undefined }}
        >
          <SpotlightCard color="#3B82F6" glow="rgba(59,130,246,0.22)">
            <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 200 }}>
              <CardTag color="#3B82F6" label="Meta Ads · Google Ads" />
              <h3 style={cardTitle}>Publicidad Digital</h3>
              <p style={cardDesc}>Campañas con ROAS real. Cada euro medido y optimizado.</p>
              <div style={{ marginTop: "auto", paddingTop: 20 }}>
                <RoasGauge />
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* CARD 3 — SEO */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
          style={{ gridColumn: isDesktop ? "3 / 4" : "span 1", gridRow: isDesktop ? "2 / 3" : undefined }}
        >
          <SpotlightCard color="#10B981" glow="rgba(16,185,129,0.18)">
            <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 200 }}>
              <CardTag color="#10B981" label="SEO · Blog · Posicionamiento" />
              <h3 style={cardTitle}>SEO & Contenido</h3>
              <p style={cardDesc}>Tráfico orgánico 24/7 que posiciona y convierte.</p>
              <div style={{ marginTop: "auto", paddingTop: 20 }}>
                <TrafficChart />
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* CARD 4 — Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.20, ease: EASE }}
          style={{ gridColumn: isDesktop ? "1 / 2" : "span 1", gridRow: isDesktop ? "3 / 4" : undefined }}
        >
          <SpotlightCard color="#F59E0B" glow="rgba(245,158,11,0.18)">
            <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 280 }}>
              <CardTag color="#F59E0B" label="Email · Secuencias · Nurturing" />
              <h3 style={cardTitle}>Email Marketing</h3>
              <p style={cardDesc}>Automatizaciones que nutren leads y convierten mientras duermes.</p>
              <div style={{ marginTop: "auto", paddingTop: 20 }}>
                <EmailStats />
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* CARD 5 — Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.27, ease: EASE }}
          style={{ gridColumn: isDesktop ? "2 / 4" : "span 1", gridRow: isDesktop ? "3 / 4" : undefined }}
        >
          <SpotlightCard color="#8B5CF6" glow="rgba(139,92,246,0.20)">
            <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 280 }}>
              <CardTag color="#8B5CF6" label="Métricas · KPIs · Informes" />
              <h3 style={cardTitle}>Dashboard & Reporting</h3>
              <p style={cardDesc}>Métricas en tiempo real. Sin vanity metrics — solo lo que mueve el negocio.</p>
              <div style={{ marginTop: "auto", paddingTop: 20 }}>
                <DashboardPreview />
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
        style={{ marginTop: 32, display: "flex", justifyContent: "center" }}
      >
        <Link
          href="/servicios"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 26px", borderRadius: 12,
            fontFamily: "var(--font-ui)", fontSize: "0.9rem", fontWeight: 500,
            color: "rgba(255,255,255,0.70)", textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.03)",
          }}
        >
          Ver todos los servicios
          <ArrowUpRight size={14} />
        </Link>
      </motion.div>
    </section>
  )
}
