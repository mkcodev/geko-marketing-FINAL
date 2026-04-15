"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion"
import Link from "next/link"
import { Check, Zap, ArrowRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Icon } from "@/lib/icons"
import type { IconName } from "@/lib/icons"

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

type Billing = "monthly" | "quarterly" | "biannual" | "annual"

const BILLING_OPTIONS: { id: Billing; label: string; discount: number; months: number }[] = [
  { id: "monthly",   label: "Mensual",    discount: 0,  months: 1  },
  { id: "quarterly", label: "Trimestral", discount: 5,  months: 3  },
  { id: "biannual",  label: "Semestral",  discount: 10, months: 6  },
  { id: "annual",    label: "Anual",      discount: 15, months: 12 },
]

const PLANS = [
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

function getPrice(monthly: number, billing: Billing): number {
  const opt = BILLING_OPTIONS.find((o) => o.id === billing)!
  return Math.round(monthly * (1 - opt.discount / 100))
}

// ─── Main section ─────────────────────────────────────────────────────────────

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

        {/* Billing toggle */}
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
            {plan.id === "silver" && (
              <SilverCard plan={plan} billing={billing} />
            )}
            {plan.id === "gold" && (
              <GoldCard plan={plan} billing={billing} />
            )}
            {plan.id === "platinum" && (
              <PlatinumCard plan={plan} billing={billing} />
            )}
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

// ─── Billing toggle ────────────────────────────────────────────────────────────

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing
  onChange: (b: Billing) => void
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
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
              color: active ? "#fff" : "rgba(255,255,255,0.38)",
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
                    ? "linear-gradient(135deg, #6B2D7C, #1D4ED8)"
                    : "rgba(255,255,255,0.10)",
                  zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            {opt.label}
            {opt.discount > 0 && (
              <span
                style={{
                  fontSize: "0.60rem",
                  fontWeight: 700,
                  color: active ? "rgba(255,255,255,0.80)" : "#10B981",
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

// ─── Shared card types ─────────────────────────────────────────────────────────

interface PlanData {
  id: string
  name: string
  icon: IconName
  tagline: string
  monthly: number
  color: string
  colorRgb: string
  popular?: boolean
  features: string[]
}

function PriceDisplay({
  plan,
  billing,
}: {
  plan: PlanData
  billing: Billing
}) {
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
              color: "#fff",
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
            color: "rgba(255,255,255,0.35)",
          }}
        >
          /mes
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
            Ahorras {totalSavings.toLocaleString("es-ES")}€ en {opt.months} meses
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function FeatureList({ plan }: { plan: PlanData }) {
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
              color: "rgba(255,255,255,0.65)",
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

// ─── Silver card: 3D tilt + metallic shimmer ──────────────────────────────────

function SilverCard({ plan, billing }: { plan: PlanData; billing: Billing }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const rotateY = useTransform(mouseX, [0, 1], [-7, 7])
  const rotateX = useTransform(mouseY, [0, 1], [6, -6])
  const glareX = useTransform(mouseX, [0, 1], ["-50%", "150%"])
  const glareY = useTransform(mouseY, [0, 1], ["-50%", "150%"])
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set((e.clientX - rect.left) / rect.width)
      mouseY.set((e.clientY - rect.top) / rect.height)
    },
    [mouseX, mouseY]
  )

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        mouseX.set(0.5)
        mouseY.set(0.5)
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "24px",
          borderRadius: 20,
          background: "rgba(148,163,184,0.04)",
          border: "1px solid rgba(148,163,184,0.18)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "border-color 0.3s, box-shadow 0.3s",
          boxShadow: hovered
            ? "0 20px 60px rgba(148,163,184,0.12), 0 0 0 1px rgba(148,163,184,0.25)"
            : "none",
        }}
      >
        {/* Metallic shimmer sweep */}
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-120%", "220%"] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "55%",
            height: "100%",
            background:
              "linear-gradient(105deg, transparent 0%, rgba(200,210,230,0.08) 40%, rgba(220,230,248,0.22) 50%, rgba(200,210,230,0.08) 60%, transparent 100%)",
            transform: "skewX(-15deg)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Dynamic glare */}
        {hovered && (
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(200,210,230,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 1,
              x: glareX,
              y: glareY,
            }}
          />
        )}

        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-30%",
            right: "-20%",
            width: "70%",
            height: "70%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(148,163,184,0.1) 0%, transparent 70%)",
            filter: "blur(24px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", height: "100%" }}>
          <PlanHeader plan={plan} />
          <PriceDisplay plan={plan} billing={billing} />
          <FeatureList plan={plan} />
          <PlanCTA plan={plan} variant="default" />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Gold card: floating particles + glow scale ───────────────────────────────

function GoldCard({ plan, billing }: { plan: PlanData; billing: Billing }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height * (0.4 + Math.random() * 0.6),
      size: Math.random() * 1.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.7 + 0.2),
      life: Math.random(),
      maxLife: 0.7 + Math.random() * 0.3,
    }))

    let animId: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY
        p.life -= 0.004
        if (p.life <= 0) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height
          p.life = p.maxLife
        }
        const alpha = (p.life / p.maxLife) * 0.75
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,158,11,${alpha})`
        ctx.fill()
      }
      animId = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(animId)
  }, [prefersReduced])

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { scale: 1.025 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      style={{ height: "100%", position: "relative" }}
    >
      <div
        style={{
          position: "relative",
          padding: "24px",
          borderRadius: 20,
          background:
            "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(107,45,124,0.06) 100%)",
          border: `1px solid rgba(245,158,11,${hovered ? "0.45" : "0.25"})`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "border-color 0.3s",
          boxShadow: hovered
            ? "0 24px 64px rgba(245,158,11,0.18), 0 0 0 1px rgba(245,158,11,0.35)"
            : "0 8px 32px rgba(245,158,11,0.08)",
        }}
      >
        {/* Popular badge — esquina superior derecha */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 10px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #F59E0B, #EF4444)",
            fontFamily: "var(--font-ui)",
            fontSize: "0.68rem",
            fontWeight: 600,
            color: "#fff",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          <Zap size={10} />
          Más popular
        </div>
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.4s",
            borderRadius: 20,
          }}
        />

        {/* Gold ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: `radial-gradient(ellipse, rgba(245,158,11,${hovered ? "0.18" : "0.10"}) 0%, transparent 70%)`,
            filter: "blur(30px)",
            pointerEvents: "none",
            transition: "background 0.4s",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
          <PlanHeader plan={plan} />
          <PriceDisplay plan={plan} billing={billing} />
          <FeatureList plan={plan} />
          <PlanCTA plan={plan} variant="gold" />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Platinum card: aurora border + particles + spotlight + magnetic ──────────

function PlatinumCard({ plan, billing }: { plan: PlanData; billing: Billing }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 180, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 180, damping: 20 })
  const spotX = useMotionValue(0)
  const spotY = useMotionValue(0)
  const spotOffsetX = useTransform(spotX, (v) => v - 150)
  const spotOffsetY = useTransform(spotY, (v) => v - 150)
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      mouseX.set(((e.clientX - cx) / rect.width) * 12)
      mouseY.set(((e.clientY - cy) / rect.height) * 12)
      spotX.set(e.clientX - rect.left)
      spotY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY, spotX, spotY]
  )

  useEffect(() => {
    if (prefersReduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height * (0.3 + Math.random() * 0.7),
      size: Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -(Math.random() * 0.6 + 0.15),
      life: Math.random(),
      maxLife: 0.6 + Math.random() * 0.4,
      hue: 260 + Math.round(Math.random() * 60 - 30),
    }))

    let animId: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY
        p.life -= 0.003
        if (p.life <= 0) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height
          p.life = p.maxLife
        }
        const alpha = (p.life / p.maxLife) * 0.65
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},80%,70%,${alpha})`
        ctx.fill()
      }
      animId = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(animId)
  }, [prefersReduced])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      style={{ x: springX, y: springY, height: "100%" }}
    >
      {/* Aurora rotating border wrapper */}
      <div
        style={{
          position: "relative",
          borderRadius: 21,
          padding: "1px",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Spinning aurora gradient */}
        <motion.div
          aria-hidden="true"
          animate={prefersReduced ? {} : { rotate: [0, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "200%",
            height: "200%",
            top: "-50%",
            left: "-50%",
            background:
              "conic-gradient(from 0deg at 50% 50%, #8B5CF6 0%, #EC4899 25%, #3B82F6 50%, #10B981 70%, #8B5CF6 100%)",
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.4s",
          }}
        />

        {/* Card body */}
        <div
          style={{
            position: "relative",
            borderRadius: 20,
            background: "linear-gradient(135deg, #0d0918 0%, #0a0a14 100%)",
            padding: "24px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              opacity: hovered ? 1 : 0.45,
              transition: "opacity 0.4s",
              borderRadius: 20,
            }}
          />

          {/* Cursor spotlight */}
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(139,92,246,0.20) 0%, transparent 70%)",
              pointerEvents: "none",
              x: spotOffsetX,
              y: spotOffsetY,
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          />

          {/* Ambient glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "60%",
              height: "60%",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(139,92,246,0.20) 0%, transparent 70%)",
              filter: "blur(30px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
            <PlanHeader plan={plan} />
            <PriceDisplay plan={plan} billing={billing} />
            <FeatureList plan={plan} />
            <PlanCTA plan={plan} variant="platinum" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Shared subcomponents ──────────────────────────────────────────────────────

function PlanHeader({ plan }: { plan: PlanData }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <Icon name={plan.icon} size={22} style={{ color: plan.color, flexShrink: 0 }} />
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
          color: "rgba(255,255,255,0.40)",
          lineHeight: 1.4,
        }}
      >
        {plan.tagline}
      </p>
    </div>
  )
}

function PlanCTA({
  plan,
  variant,
}: {
  plan: PlanData
  variant: "default" | "gold" | "platinum"
}) {
  const bg: Record<typeof variant, string> = {
    default: "rgba(255,255,255,0.06)",
    gold: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
    platinum: "linear-gradient(135deg, #4C1D95 0%, #1D4ED8 100%)",
  }
  const shadow: Record<typeof variant, string> = {
    default: "none",
    gold: "0 4px 20px rgba(107,45,124,0.40)",
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
        color: variant === "default" ? "rgba(255,255,255,0.80)" : "#fff",
        background: bg[variant],
        border: variant === "default" ? "1px solid rgba(255,255,255,0.10)" : "none",
        boxShadow: shadow[variant],
        transition: "opacity 0.2s, transform 0.2s",
      }}
    >
      Empezar con {plan.name}
      <ArrowRight size={15} />
    </Link>
  )
}
