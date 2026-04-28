"use client"

import Link from "next/link"
import { useRef } from "react"
import { motion, useReducedMotion, useInView } from "motion/react"
import { TrendingUp, Users, Zap, Star, ArrowRight } from "lucide-react"
import { staggerContainer, fadeInUp, EASE_SMOOTH, DUR_SLOW } from "@/lib/animations"
import { useAnimatedCounter } from "./use-animated-counter"

// ── Metric row ─────────────────────────────────────────────────

interface MetricRowProps {
  label: string
  target: number
  suffix: string
  barPercent: number
  barGradient: string
  active: boolean
  delay: number
}

function MetricRow({ label, target, suffix, barPercent, barGradient, active, delay }: MetricRowProps) {
  const prefersReduced = useReducedMotion()
  const count = useAnimatedCounter(target, active)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--fg-secondary)", letterSpacing: "0.02em" }}>
          {label}
        </span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--fg)" }}>
          {count.toLocaleString("es-ES")}{suffix}
        </span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: "100%",
          background: barGradient,
          borderRadius: 2,
          transformOrigin: "left center",
          transform: active ? `scaleX(${barPercent / 100})` : "scaleX(0)",
          transition: prefersReduced ? undefined : `transform 1.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
        }} />
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────

const METRICS: MetricRowProps[] = [
  { label: "Seguidores ganados", target: 12847, suffix: "", barPercent: 82, barGradient: "linear-gradient(90deg,var(--color-geko-purple),var(--color-geko-purple-accent))", active: false, delay: 0.2 },
  { label: "Publicaciones / mes",  target: 94,    suffix: "", barPercent: 65, barGradient: "linear-gradient(90deg,var(--color-geko-blue),var(--color-geko-blue-light))", active: false, delay: 0.45 },
  { label: "Valor generado",       target: 3240,  suffix: "€", barPercent: 72, barGradient: "linear-gradient(90deg,var(--color-geko-purple),var(--color-geko-blue))", active: false, delay: 0.7 },
]

export function Hero1Client() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      aria-label="Hero — Command Center"
      style={{ minHeight: "100dvh", background: "var(--color-bg-dark)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}
    >
      {/* Aurora */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 70% 60% at 8% 0%, var(--color-geko-purple-a22) 0%, transparent 62%),
          radial-gradient(ellipse 50% 45% at 92% 100%, var(--color-geko-blue-a15) 0%, transparent 62%)
        `,
      }} />

      {/* Subtle grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 100%)",
      }} />

      <div className="section-container" style={{ width: "100%", paddingTop: "var(--space-20)", paddingBottom: "var(--space-20)" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "clamp(1fr, 55fr, 55fr) clamp(1fr, 45fr, 45fr)",
          gap: "clamp(2rem,5vw,4rem)",
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto",
        }}>

          {/* ── LEFT ── */}
          <motion.div
            variants={staggerContainer}
            initial={prefersReduced ? false : "hidden"}
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}
          >
            <motion.div variants={fadeInUp}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "5px 14px", borderRadius: "var(--radius-full)",
                background: "var(--color-geko-purple-a10)", border: "1px solid var(--color-geko-purple-a28)",
                color: "var(--color-geko-purple-accent)",
                fontSize: "var(--text-xs)", fontFamily: "var(--font-ui)", fontWeight: 500,
                letterSpacing: "0.07em", textTransform: "uppercase",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-geko-purple-accent)", flexShrink: 0, animation: "pulse-glow 2s ease-in-out infinite" }} />
                Agencia de Marketing · Tres Cantos, Madrid
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem,1.4rem+5.5vw,5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--fg)", margin: 0 }}
            >
              Transforma tus{" "}
              <span className="text-gradient-brand">seguidores</span>
              <br />en clientes reales.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", lineHeight: 1.65, color: "var(--fg-secondary)", maxWidth: 460, margin: 0 }}
            >
              Gestión de redes, branding y webs que convierten visitantes en clientes.
              Sin humo. Con datos que importan.
            </motion.p>

            <motion.div variants={fadeInUp} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="/contacto"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", background: "var(--gradient-brand)", color: "#fff", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: "var(--text-sm)", textDecoration: "none", letterSpacing: "0.01em", transition: "filter 200ms ease,transform 200ms ease,box-shadow 200ms ease" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.filter = "brightness(1.15)"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 28px var(--color-geko-purple-a40)" }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.filter = "brightness(1)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none" }}
              >
                Empieza ahora <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
              </a>
              <Link
                href="/servicios"
                style={{ display: "inline-flex", alignItems: "center", padding: "13px 26px", background: "transparent", color: "var(--fg)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-ui)", fontWeight: 500, fontSize: "var(--text-sm)", textDecoration: "none", transition: "border-color 200ms ease,background 200ms ease" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.28)"; el.style.background = "rgba(255,255,255,0.04)" }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.13)"; el.style.background = "transparent" }}
              >
                Ver servicios
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", gap: 2 }} aria-label="Valoración 5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} strokeWidth={0} fill="#F59E0B" color="#F59E0B" aria-hidden="true" />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-xs)", color: "var(--fg-secondary)" }}>
                <strong style={{ color: "var(--fg)", fontWeight: 600 }}>+50 empresas</strong> ya confían en Geko
              </span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Dashboard ── */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: DUR_SLOW, delay: 0.2, ease: EASE_SMOOTH }}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            <div style={{ animation: prefersReduced ? undefined : "float 6s ease-in-out infinite", position: "relative", width: "100%", maxWidth: 360 }}>

              {/* Main card */}
              <div style={{
                background: "rgba(13,13,26,0.92)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.09)", borderRadius: "var(--radius-xl)",
                padding: "var(--space-6)", boxShadow: "0 40px 80px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.07)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-5)", paddingBottom: "var(--space-4)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--fg)" }}>
                    Panel de Resultados
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: "var(--radius-full)", background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.25)", color: "var(--color-success)", fontSize: "var(--text-xs)", fontFamily: "var(--font-ui)", fontWeight: 500 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-success)", animation: "pulse-glow 1.5s ease-in-out infinite" }} />
                    LIVE
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                  {METRICS.map((m) => (
                    <MetricRow key={m.label} {...m} active={isInView} />
                  ))}
                </div>

                <div style={{ marginTop: "var(--space-5)", paddingTop: "var(--space-4)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--fg-muted)", fontFamily: "var(--font-ui)" }}>Últimos 30 días</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--color-success)", fontSize: "var(--text-xs)", fontFamily: "var(--font-ui)", fontWeight: 600 }}>
                    <TrendingUp size={11} strokeWidth={2} aria-hidden="true" />
                    +18.2% vs mes anterior
                  </span>
                </div>
              </div>

              {/* Floating toast — seguidores */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, x: 14, y: -8 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: DUR_SLOW, delay: 0.75, ease: EASE_SMOOTH }}
                style={{ position: "absolute", top: -18, right: -22, background: "rgba(8,8,16,0.96)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(16,185,129,0.22)", borderRadius: "var(--radius-lg)", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.45)" }}
              >
                <Users size={14} strokeWidth={1.5} color="var(--color-success)" aria-hidden="true" />
                <div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--fg)", fontFamily: "var(--font-ui)", fontWeight: 600, whiteSpace: "nowrap" }}>+247 seguidores</div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--fg-muted)", fontFamily: "var(--font-ui)" }}>esta semana</div>
                </div>
              </motion.div>

              {/* Floating toast — publicaciones */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, x: -14, y: 8 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: DUR_SLOW, delay: 1.0, ease: EASE_SMOOTH }}
                style={{ position: "absolute", bottom: -18, left: -22, background: "rgba(8,8,16,0.96)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid var(--color-geko-purple-a22)", borderRadius: "var(--radius-lg)", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.45)" }}
              >
                <Zap size={14} strokeWidth={1.5} color="var(--color-geko-purple-accent)" aria-hidden="true" />
                <div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--fg)", fontFamily: "var(--font-ui)", fontWeight: 600, whiteSpace: "nowrap" }}>94 publicaciones</div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--fg-muted)", fontFamily: "var(--font-ui)" }}>gestionadas este mes</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
