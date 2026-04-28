"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from "motion/react"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  InstagramReelCard,
  CampaignResultsCard,
  AudienceFunnelCard,
  ContentCalendarCard,
} from "./remotion-cards"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ─────────────────────────────────────────────────────────────
// PLAYGROUND — Interactive Bento Grid Demos
// Inspirado en: Vercel.com · Linear.app · Liveblocks.io
// ─────────────────────────────────────────────────────────────

export default function PlaygroundPage() {
  const isDesktop = useMediaQuery("(min-width: 900px)")
  const isTablet = useMediaQuery("(min-width: 640px)")

  // col helper: desktop | tablet | mobile
  const col = (d: string, t: string, m = "span 12") =>
    isDesktop ? d : isTablet ? t : m

  return (
    <div style={{ minHeight: "100vh", padding: "60px 0 120px", background: "#080810" }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: 56 }}
        >
          <p style={{
            fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "#9B4DBC", marginBottom: 12,
          }}>
            Playground · Demos interactivos
          </p>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05,
            color: "rgba(255,255,255,0.96)", marginBottom: 14,
          }}>
            Bento grids interactivos
          </h1>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "1.0625rem",
            color: "rgba(255,255,255,0.38)", lineHeight: 1.7, maxWidth: 520,
          }}>
            Hover, click e interactúa con cada card. Animaciones de entrada, spotlight y demos en vivo.
          </p>
        </motion.div>

        {/* Grid principal — 12 cols desktop, 2 cols tablet, 1 col mobile */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "repeat(12, 1fr)" : isTablet ? "repeat(2, 1fr)" : "1fr",
          gap: 12,
        }}>
          {/* CARD 1 — Deploy (span 7 / 1 tab / 1 mob) */}
          <BentoCell col={col("span 7", "span 1")} delay={0}>
            <DeployCard />
          </BentoCell>

          {/* CARD 2 — AI Stream (span 5) */}
          <BentoCell col={col("span 5", "span 1")} delay={0.08}>
            <AIStreamCard />
          </BentoCell>

          {/* CARD 3 — Live Cursors (span 5) */}
          <BentoCell col={col("span 5", "span 1")} delay={0.14}>
            <LiveCursorsCard />
          </BentoCell>

          {/* CARD 4 — Analytics (span 7) */}
          <BentoCell col={col("span 7", "span 1")} delay={0.2}>
            <AnalyticsCard />
          </BentoCell>

          {/* CARD 5 — Network (span 4) */}
          <BentoCell col={col("span 4", "span 1")} delay={0.26}>
            <NetworkCard />
          </BentoCell>

          {/* CARD 6 — Speed gauge (span 4) */}
          <BentoCell col={col("span 4", "span 1")} delay={0.3}>
            <SpeedCard />
          </BentoCell>

          {/* CARD 7 — Notifications (span 4) */}
          <BentoCell col={col("span 4", "span 2")} delay={0.34}>
            <NotificationsCard />
          </BentoCell>

          {/* ── REMOTION — Marketing Digital ── */}

          {/* CARD 8 — Instagram Post Animator (span 5) */}
          <BentoCell col={col("span 5", "span 1")} delay={0.10} minH={420} remotion>
            <InstagramReelCard />
          </BentoCell>

          {/* CARD 9 — Campaign ROAS Dashboard (span 7) */}
          <BentoCell col={col("span 7", "span 1")} delay={0.16} minH={420} remotion>
            <CampaignResultsCard />
          </BentoCell>

          {/* CARD 10 — Audience Funnel (span 6) */}
          <BentoCell col={col("span 6", "span 1")} delay={0.20} minH={400} remotion>
            <AudienceFunnelCard />
          </BentoCell>

          {/* CARD 11 — Content Calendar (span 6) */}
          <BentoCell col={col("span 6", "span 1")} delay={0.24} minH={400} remotion>
            <ContentCalendarCard />
          </BentoCell>

        </div>

        {/* ── OLD COMPONENTS ── */}
        <div style={{ marginTop: 80 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
            paddingBottom: 16,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{
              padding: "3px 10px",
              borderRadius: 6,
              background: "rgba(239,68,68,0.10)",
              border: "1px solid rgba(239,68,68,0.20)",
              fontFamily: "var(--font-ui)",
              fontSize: "0.68rem",
              fontWeight: 700,
              color: "#EF4444",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              Deprecated
            </div>
            <p style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.50)",
              letterSpacing: "-0.02em",
            }}>
              Old Components
            </p>
            <p style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.20)",
            }}>
              — reemplazados, guardados como referencia
            </p>
          </div>

          {/* Old Hero Visual */}
          <div style={{ marginBottom: 20 }}>
            <p style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 12,
              letterSpacing: "0.05em",
            }}>
              Hero right side — v1 (reemplazado por SocialCommandCenter)
            </p>
            <div style={{
              borderRadius: 16,
              border: "1px dashed rgba(239,68,68,0.15)",
              background: "rgba(239,68,68,0.02)",
              padding: 24,
              height: 480,
              position: "relative",
            }}>
              <OldHeroGekoVisual />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Old Hero Visual (GekoVisual v1) ───────────────────────────

const OLD_FLOATING_CARDS = [
  { id: "ig", icon: "📸", platform: "Instagram", metric: "+247%", label: "Engagement", top: "12%", left: "5%", delay: 0 },
  { id: "tk", icon: "🎵", platform: "TikTok", metric: "2.4M", label: "Visualizaciones", top: "55%", left: "-5%", delay: 0.3 },
  { id: "li", icon: "💼", platform: "LinkedIn", metric: "+183%", label: "Alcance orgánico", top: "78%", left: "55%", delay: 0.6 },
]

function OldHeroGekoVisual() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", width: "75%", aspectRatio: "3/4",
          borderRadius: 24,
          background: "linear-gradient(135deg, rgba(107,45,124,0.3) 0%, rgba(29,78,216,0.2) 100%)",
          border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 60px rgba(107,45,124,0.2), inset 0 1px 0 rgba(255,255,255,0.10)",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: "7rem", filter: "drop-shadow(0 0 40px rgba(107,45,124,0.6))", marginBottom: 16 }}>🦎</div>
        <p style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", textAlign: "center", letterSpacing: "-0.01em" }}>
          Animación Rive<br />
          <span style={{ fontSize: "0.8rem", fontWeight: 400, color: "rgba(255,255,255,0.35)" }}>próximamente</span>
        </p>
      </motion.div>
      {OLD_FLOATING_CARDS.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: card.delay + 0.6, duration: 0.5, ease: "backOut" }}
          style={{ position: "absolute", top: card.top, left: card.left, zIndex: 10 }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4 + card.delay * 2, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
            style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
              borderRadius: 14, background: "rgba(10,10,22,0.85)",
              border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(16px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)", whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "1.25rem" }}>{card.icon}</span>
            <div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "#9B4DBC", lineHeight: 1, marginBottom: 2 }}>{card.metric}</p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "rgba(255,255,255,0.45)" }}>{card.label}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BentoCell — wrapper con spotlight + entry animation
// ─────────────────────────────────────────────────────────────

function BentoCell({
  children,
  col,
  delay,
  minH = 320,
  remotion = false,
}: {
  children: React.ReactNode
  col: string
  delay: number
  minH?: number
  remotion?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [hovered, setHovered] = useState(false)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  // Doble borde gradiente para cards Remotion
  const remotionBg = hovered
    ? "linear-gradient(#080812, #0e0624) padding-box, linear-gradient(135deg, rgba(139,92,246,0.70) 0%, rgba(255,255,255,0.22) 38%, rgba(29,78,216,0.60) 68%, rgba(107,45,124,0.55) 100%) border-box"
    : "linear-gradient(#080812, #0c061e) padding-box, linear-gradient(135deg, rgba(107,45,124,0.45) 0%, rgba(255,255,255,0.12) 40%, rgba(29,78,216,0.40) 70%, rgba(107,45,124,0.30) 100%) border-box"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: col,
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        minHeight: minH,
        padding: remotion ? 0 : 28,
        transition: "background 0.4s, box-shadow 0.3s",
        // Estilos condicionales normal vs remotion
        ...(remotion ? {
          background: remotionBg,
          border: "1.5px solid transparent",
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 50px rgba(107,45,124,0.22), 0 24px 70px rgba(0,0,0,0.55)"
            : "inset 0 0 0 1px rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.40)",
        } : {
          background: "rgba(255,255,255,0.026)",
          border: "1px solid rgba(255,255,255,0.075)",
          boxShadow: hovered
            ? "0 0 0 1px rgba(107,45,124,0.25), 0 20px 60px rgba(0,0,0,0.5)"
            : "0 4px 24px rgba(0,0,0,0.3)",
          borderColor: hovered ? "rgba(107,45,124,0.30)" : "rgba(255,255,255,0.075)",
        }),
        borderColor: hovered ? "rgba(107,45,124,0.30)" : "rgba(255,255,255,0.075)",
      }}
    >
      {/* Spotlight */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,45,124,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          x: useTransform(mouseX, (v) => v - 200),
          y: useTransform(mouseY, (v) => v - 200),
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s",
        }}
      />

      {/* Noise texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        opacity: 0.018, zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
        {children}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// CARD 1 — Deploy Terminal
// ─────────────────────────────────────────────────────────────

const DEPLOY_STEPS = [
  { text: "$ git push origin main", color: "rgba(255,255,255,0.55)", delay: 0 },
  { text: "→ Triggering deployment...", color: "#9B4DBC", delay: 400 },
  { text: "✓ Build started", color: "rgba(255,255,255,0.45)", delay: 900 },
  { text: "✓ Installing dependencies (12s)", color: "rgba(255,255,255,0.45)", delay: 1500 },
  { text: "✓ Building application (8s)", color: "rgba(255,255,255,0.45)", delay: 2100 },
  { text: "✓ Running checks...", color: "rgba(255,255,255,0.45)", delay: 2700 },
  { text: "✓ Deploying to edge network", color: "#3B82F6", delay: 3200 },
  { text: "🎉 Production ready!", color: "#10B981", delay: 3800 },
  { text: "→ https://geko-marketing.com", color: "#9B4DBC", delay: 4100 },
]

function DeployCard() {
  const [deploying, setDeploying] = useState(false)
  const [lines, setLines] = useState<typeof DEPLOY_STEPS>([])
  const [done, setDone] = useState(false)
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  const startDeploy = useCallback(() => {
    if (deploying) return
    setDeploying(true)
    setDone(false)
    setLines([])
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []

    DEPLOY_STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setLines((l) => [...l, step])
        if (i === DEPLOY_STEPS.length - 1) {
          setDone(true)
          setTimeout(() => setDeploying(false), 2000)
        }
      }, step.delay)
      timeouts.current.push(t)
    })
  }, [deploying])

  useEffect(() => () => timeouts.current.forEach(clearTimeout), [])

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9B4DBC", marginBottom: 6 }}>Deploy</p>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em" }}>
            Un push. En producción.
          </h3>
        </div>
        <button
          onClick={startDeploy}
          disabled={deploying}
          style={{
            padding: "9px 18px", borderRadius: 10, border: "none",
            fontFamily: "var(--font-ui)", fontSize: "0.82rem", fontWeight: 600,
            cursor: deploying ? "wait" : "pointer",
            background: done
              ? "rgba(16,185,129,0.2)"
              : deploying
              ? "rgba(107,45,124,0.3)"
              : "linear-gradient(135deg, #6B2D7C, #1D4ED8)",
            color: done ? "#10B981" : "#fff",
            transition: "all 0.3s",
            whiteSpace: "nowrap",
            boxShadow: deploying ? "none" : "0 4px 16px rgba(107,45,124,0.4)",
          }}
        >
          {done ? "✓ Deployed" : deploying ? "Deploying..." : "Deploy →"}
        </button>
      </div>

      {/* Terminal */}
      <div style={{
        flex: 1, borderRadius: 14,
        background: "rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: "16px 18px",
        fontFamily: "monospace", fontSize: "0.82rem",
        overflow: "hidden", position: "relative",
        minHeight: 160,
      }}>
        {/* Fake dots */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>

        {lines.length === 0 && !deploying && (
          <p style={{ color: "rgba(255,255,255,0.20)", fontSize: "0.8rem" }}>
            Pulsa Deploy para ver el proceso →
          </p>
        )}

        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              style={{ color: line.color, marginBottom: 4, lineHeight: 1.5 }}
            >
              {line.text}
            </motion.p>
          ))}
        </AnimatePresence>

        {deploying && !done && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ display: "inline-block", width: 8, height: 14, background: "#9B4DBC", borderRadius: 1, verticalAlign: "text-bottom", marginLeft: 2 }}
          />
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CARD 2 — AI Stream
// ─────────────────────────────────────────────────────────────

const AI_PROMPTS = [
  {
    user: "¿Cómo puedo conseguir más clientes en Instagram?",
    answer: "Para conseguir más clientes en Instagram necesitas: (1) Publicar contenido de valor diariamente con consistencia, (2) Usar Reels cortos con hooks en los primeros 3 segundos, (3) Interactuar con tu audiencia en los comentarios, (4) Colaborar con microinfluencers de tu nicho, (5) Usar Stories para mostrar el detrás de las cámaras. Con esta estrategia nuestros clientes consiguen un +247% de engagement en 90 días. 🦎",
  },
  {
    user: "¿Qué presupuesto necesito para publicidad en Meta?",
    answer: "Para empezar con Meta Ads recomendamos un mínimo de €300-500/mes de inversión publicitaria. Con ese presupuesto puedes testear 2-3 audiencias diferentes y encontrar las que mejor convierten. A partir de ahí escalamos lo que funciona. Nuestros clientes obtienen un ROAS medio de ×4.2, es decir, por cada €1 invertido retornan €4.20.",
  },
]

function AIStreamCard() {
  const [idx, setIdx] = useState(0)
  const [streaming, setStreaming] = useState(false)
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startStream = () => {
    if (streaming) return
    const next = (idx + 1) % AI_PROMPTS.length
    setIdx(next)
    setStreaming(true)
    setDone(false)
    setDisplayed("")
    const full = AI_PROMPTS[next].answer
    let i = 0
    intervalRef.current = setInterval(() => {
      i += Math.floor(Math.random() * 4) + 2
      if (i >= full.length) {
        setDisplayed(full)
        setStreaming(false)
        setDone(true)
        if (intervalRef.current) clearInterval(intervalRef.current)
      } else {
        setDisplayed(full.slice(0, i))
      }
    }, 28)
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  const prompt = AI_PROMPTS[idx]

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 6 }}>IA Geko</p>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em" }}>
          Consulta en tiempo real
        </h3>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* User bubble */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{
            maxWidth: "85%", padding: "10px 14px", borderRadius: "14px 14px 4px 14px",
            background: "linear-gradient(135deg, rgba(107,45,124,0.5), rgba(29,78,216,0.5))",
            border: "1px solid rgba(107,45,124,0.3)",
          }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
              {prompt.user}
            </p>
          </div>
        </div>

        {/* AI bubble */}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #6B2D7C, #1D4ED8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.75rem",
          }}>🦎</div>
          <div style={{
            flex: 1, padding: "10px 14px", borderRadius: "4px 14px 14px 14px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            minHeight: 80,
          }}>
            {displayed || (!streaming && !done) ? (
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                {displayed || "Haz click en Preguntar para ver la respuesta →"}
                {streaming && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.7 }}
                    style={{ display: "inline-block", width: 2, height: "0.85em", background: "#3B82F6", marginLeft: 2, verticalAlign: "text-bottom", borderRadius: 1 }}
                  />
                )}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <button
        onClick={startStream}
        disabled={streaming}
        style={{
          marginTop: 16, padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(59,130,246,0.3)",
          background: streaming ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.12)",
          fontFamily: "var(--font-ui)", fontSize: "0.82rem", fontWeight: 600,
          color: streaming ? "rgba(255,255,255,0.35)" : "#3B82F6",
          cursor: streaming ? "wait" : "pointer", width: "100%",
        }}
      >
        {streaming ? "Generando respuesta..." : "Preguntar algo nuevo →"}
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CARD 3 — Live Cursors
// ─────────────────────────────────────────────────────────────

const USERS = [
  { name: "Guillermo", color: "#9B4DBC", emoji: "🦎" },
  { name: "María", color: "#3B82F6", emoji: "🎨" },
  { name: "Carlos", color: "#10B981", emoji: "📊" },
  { name: "Ana", color: "#F59E0B", emoji: "✍️" },
]

function LiveCursorsCard() {
  const areaRef = useRef<HTMLDivElement>(null)
  const [cursors, setCursors] = useState(
    USERS.map((u, i) => ({
      ...u,
      x: 20 + i * 22,
      y: 30 + (i % 2) * 20,
      tx: 20 + i * 22,
      ty: 30 + (i % 2) * 20,
    }))
  )
  const [active, setActive] = useState(false)

  useEffect(() => {
    let frame: number
    let t = 0

    const animate = () => {
      t += 0.008
      setCursors(prev => prev.map((c, i) => {
        const speed = 0.6 + i * 0.15
        const nx = 15 + ((Math.sin(t * speed + i * 1.8) + 1) / 2) * 70
        const ny = 20 + ((Math.cos(t * speed * 0.7 + i * 2.5) + 1) / 2) * 55
        return {
          ...c,
          tx: nx,
          ty: ny,
          x: c.x + (nx - c.x) * 0.06,
          y: c.y + (ny - c.y) * 0.06,
        }
      }))
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const addMyself = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = areaRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = ((e.clientX - rect.left) / rect.width) * 100
    const py = ((e.clientY - rect.top) / rect.height) * 100
    setActive(true)
    setCursors(prev => {
      const copy = [...prev]
      copy[0] = { ...copy[0], tx: px, ty: py }
      return copy
    })
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#10B981", marginBottom: 6 }}>Colaboración</p>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em" }}>
          Tu equipo, en tiempo real
        </h3>
      </div>

      {/* Cursor area */}
      <div
        ref={areaRef}
        onMouseMove={addMyself}
        style={{
          flex: 1, borderRadius: 14, position: "relative",
          background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden", cursor: "none", minHeight: 160,
        }}
      >
        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        {cursors.map((c, i) => (
          <div
            key={c.name}
            style={{
              position: "absolute",
              left: `${c.x}%`,
              top: `${c.y}%`,
              transform: "translate(-4px, -4px)",
              pointerEvents: "none",
              zIndex: i,
            }}
          >
            {/* Cursor SVG */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 2L16 10L10 11L7 18L4 2Z" fill={c.color} stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
            </svg>
            {/* Name tag */}
            <div style={{
              position: "absolute", top: 18, left: 8,
              padding: "2px 8px", borderRadius: 6,
              background: c.color, whiteSpace: "nowrap",
              fontFamily: "var(--font-ui)", fontSize: "0.68rem",
              fontWeight: 600, color: "#fff",
            }}>
              {i === 0 && active ? "Tú" : c.name}
            </div>
          </div>
        ))}

        <p style={{
          position: "absolute", bottom: 12, left: 0, right: 0,
          textAlign: "center",
          fontFamily: "var(--font-ui)", fontSize: "0.7rem",
          color: "rgba(255,255,255,0.18)",
        }}>
          Mueve el cursor dentro del área
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CARD 4 — Analytics Chart (hover = zoom / click = periodo)
// ─────────────────────────────────────────────────────────────

const PERIODS: Record<string, number[]> = {
  "7D":  [42, 55, 48, 71, 65, 88, 100],
  "30D": [28, 32, 45, 38, 52, 48, 63, 58, 72, 69, 84, 78, 91, 87, 100, 94, 88, 97, 100, 95, 88, 92, 96, 100, 93, 88, 95, 98, 100, 96],
  "90D": [15,18,22,19,25,28,24,30,35,32,38,42,39,45,48,44,50,55,52,58,62,59,65,70,67,72,76,73,78,82,79,85,89,86,91,95,92,97,100,96],
}

function AnalyticsCard() {
  const [period, setPeriod] = useState("30D")
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const data = PERIODS[period]
  const W = 500; const H = 100
  const max = Math.max(...data)
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - (v / max) * H,
  ])
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ")
  const fill = `${line} L${W},${H} L0,${H} Z`

  const current = data[data.length - 1]
  const prev = data[0]
  const delta = (((current - prev) / prev) * 100).toFixed(1)

  return (
    <div ref={ref} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B5CF6", marginBottom: 6 }}>Analytics</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>
              {hoveredIdx !== null ? data[hoveredIdx] : "12.4K"}
            </h3>
            <span style={{
              fontFamily: "var(--font-ui)", fontSize: "0.8rem", fontWeight: 600,
              color: parseFloat(delta) > 0 ? "#10B981" : "#EF4444",
              padding: "2px 8px", borderRadius: 6,
              background: parseFloat(delta) > 0 ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
            }}>
              +{delta}%
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.78rem", color: "rgba(255,255,255,0.30)", marginTop: 2 }}>
            Sesiones totales
          </p>
        </div>

        {/* Period selector */}
        <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {Object.keys(PERIODS).map(p => (
            <button
              key={p}
              onClick={() => { setPeriod(p); setHoveredIdx(null) }}
              style={{
                padding: "5px 10px", borderRadius: 7, border: "none",
                fontFamily: "var(--font-ui)", fontSize: "0.75rem", fontWeight: 600,
                cursor: "pointer",
                background: period === p ? "rgba(139,92,246,0.25)" : "transparent",
                color: period === p ? "#8B5CF6" : "rgba(255,255,255,0.35)",
                transition: "all 0.18s",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, position: "relative", minHeight: 120 }}>
        <svg
          width="100%"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, height: "100%", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="analytics-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
            <clipPath id="analytics-clip">
              <motion.rect
                x="0" y="0" height={H + 10}
                initial={{ width: 0 }}
                animate={inView ? { width: W } : { width: 0 }}
                transition={{ duration: 1.2, ease: EASE }}
                key={period}
              />
            </clipPath>
          </defs>

          {/* Area fill */}
          <motion.path
            key={`fill-${period}`}
            d={fill}
            fill="url(#analytics-grad)"
            clipPath="url(#analytics-clip)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Line */}
          <motion.path
            key={`line-${period}`}
            d={line}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          />

          {/* Hover dots */}
          {pts.map((p, i) => (
            <g key={i}>
              <rect
                x={p[0] - W / data.length / 2}
                y={0}
                width={W / data.length}
                height={H}
                fill="transparent"
                style={{ cursor: "crosshair" }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              {hoveredIdx === i && (
                <>
                  <line x1={p[0]} y1={0} x2={p[0]} y2={H} stroke="rgba(139,92,246,0.3)" strokeWidth="1" strokeDasharray="3,3" />
                  <circle cx={p[0]} cy={p[1]} r="4" fill="#8B5CF6" stroke="rgba(139,92,246,0.3)" strokeWidth="6" />
                </>
              )}
            </g>
          ))}
        </svg>

        {/* Grid lines background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "100% 25%",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CARD 5 — Network / Globe
// ─────────────────────────────────────────────────────────────

const NODES = [
  { cx: 50, cy: 50, r: 5, label: "Madrid", primary: true },
  { cx: 52, cy: 30, r: 3, label: "París" },
  { cx: 30, cy: 38, r: 3, label: "Londres" },
  { cx: 70, cy: 28, r: 3, label: "Berlín" },
  { cx: 75, cy: 55, r: 3, label: "Roma" },
  { cx: 62, cy: 68, r: 3, label: "Lisboa" },
  { cx: 20, cy: 55, r: 2.5, label: "NYC" },
  { cx: 85, cy: 42, r: 2, label: "Varsovia" },
]

function NetworkCard() {
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F59E0B", marginBottom: 6 }}>Red global</p>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em" }}>
          Presencia sin fronteras
        </h3>
      </div>

      {/* SVG network */}
      <div style={{ flex: 1, position: "relative", minHeight: 180 }}>
        <svg
          viewBox="0 0 100 100"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {/* Connection lines */}
          {NODES.map((n, i) => {
            if (i === 0) return null
            const isActive = activeNode === i
            return (
              <motion.line
                key={i}
                x1={NODES[0].cx} y1={NODES[0].cy}
                x2={n.cx} y2={n.cy}
                stroke={isActive ? "#F59E0B" : "rgba(245,158,11,0.15)"}
                strokeWidth={isActive ? "0.5" : "0.3"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            )
          })}

          {/* Nodes */}
          {NODES.map((n, i) => {
            const isActive = activeNode === i
            return (
              <g
                key={i}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActiveNode(i)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Pulse ring (primary) */}
                {n.primary && (
                  <motion.circle
                    cx={n.cx} cy={n.cy}
                    r={n.r + 3}
                    fill="none"
                    stroke="rgba(245,158,11,0.3)"
                    strokeWidth="0.5"
                    animate={{ r: [n.r + 2, n.r + 6, n.r + 2], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                )}
                <motion.circle
                  cx={n.cx} cy={n.cy}
                  r={isActive ? n.r + 1.5 : n.r}
                  fill={n.primary ? "#F59E0B" : isActive ? "#F59E0B" : "rgba(245,158,11,0.45)"}
                  stroke={isActive ? "#F59E0B" : "rgba(245,158,11,0.2)"}
                  strokeWidth="0.5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                  style={{ transition: "fill 0.2s, r 0.2s" }}
                />

                {/* Label */}
                {(isActive || n.primary) && (
                  <text
                    x={n.cx + (n.cx > 50 ? n.r + 2 : -(n.r + 2))}
                    y={n.cy + 0.5}
                    fontSize="4"
                    fill="rgba(255,255,255,0.75)"
                    textAnchor={n.cx > 50 ? "start" : "end"}
                    fontFamily="sans-serif"
                  >
                    {n.label}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        {["Madrid", "Europa", "América"].map((z, i) => (
          <div key={z} style={{
            flex: 1, padding: "7px 10px", borderRadius: 8, textAlign: "center",
            background: i === 0 ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${i === 0 ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.07)"}`,
          }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: i === 0 ? "#F59E0B" : "rgba(255,255,255,0.35)", fontWeight: 600 }}>{z}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CARD 6 — Speed / Performance Gauge
// ─────────────────────────────────────────────────────────────

function SpeedCard() {
  const [score, setScore] = useState(94)
  const [running, setRunning] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const runAudit = () => {
    if (running) return
    setRunning(true)
    setScore(0)
    let s = 0
    const interval = setInterval(() => {
      s += Math.random() * 8 + 4
      if (s >= 94 + Math.random() * 4) {
        s = 92 + Math.floor(Math.random() * 7)
        setScore(Math.min(100, Math.round(s)))
        setRunning(false)
        clearInterval(interval)
      } else {
        setScore(Math.round(s))
      }
    }, 60)
  }

  // Gauge arc
  const R = 52; const cx = 70; const cy = 70
  const startAngle = -200; const totalAngle = 220
  const toRad = (d: number) => (d * Math.PI) / 180
  const arcPath = (angle: number) => {
    const end = startAngle + angle
    const sx = cx + R * Math.cos(toRad(startAngle))
    const sy = cy + R * Math.sin(toRad(startAngle))
    const ex = cx + R * Math.cos(toRad(end))
    const ey = cy + R * Math.sin(toRad(end))
    const large = angle > 180 ? 1 : 0
    return `M ${sx} ${sy} A ${R} ${R} 0 ${large} 1 ${ex} ${ey}`
  }
  const scoreAngle = (score / 100) * totalAngle
  const color = score >= 90 ? "#10B981" : score >= 50 ? "#F59E0B" : "#EF4444"

  return (
    <div ref={ref} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 8 }}>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#10B981", marginBottom: 6 }}>Performance</p>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em" }}>
          Lighthouse Score
        </h3>
      </div>

      {/* Gauge SVG */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 140 110" width="100%" style={{ maxHeight: 160, overflow: "visible" }}>
          {/* Track */}
          <path d={arcPath(totalAngle)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" strokeLinecap="round" />

          {/* Score arc */}
          <motion.path
            d={arcPath(totalAngle)}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(scoreAngle / totalAngle) * 100} 100`}
            pathLength={totalAngle}
            strokeDashoffset={0}
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: scoreAngle / totalAngle } : { pathLength: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />

          {/* Score text */}
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="28" fontWeight="800"
            fontFamily="var(--font-heading)" fill={color}>
            {score}
          </text>
          <text x={cx} y={cy + 22} textAnchor="middle" fontSize="8"
            fontFamily="sans-serif" fill="rgba(255,255,255,0.30)">
            / 100
          </text>
        </svg>
      </div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 14 }}>
        {[
          ["FCP", "0.8s", "#10B981"],
          ["LCP", "1.2s", "#10B981"],
          ["CLS", "0.001", "#10B981"],
          ["TTI", "1.5s", "#F59E0B"],
        ].map(([k, v, c]) => (
          <div key={k} style={{ padding: "7px 10px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: "rgba(255,255,255,0.28)", marginBottom: 2 }}>{k}</p>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 700, color: c }}>{v}</p>
          </div>
        ))}
      </div>

      <button
        onClick={runAudit}
        disabled={running}
        style={{
          padding: "10px", borderRadius: 10, border: "1px solid rgba(16,185,129,0.25)",
          background: "rgba(16,185,129,0.08)", fontFamily: "var(--font-ui)",
          fontSize: "0.82rem", fontWeight: 600, color: running ? "rgba(255,255,255,0.30)" : "#10B981",
          cursor: running ? "wait" : "pointer",
        }}
      >
        {running ? "Analizando..." : "Ejecutar auditoría →"}
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CARD 7 — Live Notifications
// ─────────────────────────────────────────────────────────────

const NOTIF_TEMPLATES = [
  { icon: "📈", title: "Nuevo lead captado", desc: "Un visitante completó tu formulario de contacto", color: "#9B4DBC" },
  { icon: "❤️", title: "Post viral detectado", desc: "Tu último Reel alcanzó 50K visualizaciones", color: "#EF4444" },
  { icon: "💬", title: "Nuevo comentario", desc: "@usuario_madrid: '¡Increíble contenido!'", color: "#3B82F6" },
  { icon: "🎯", title: "Meta Ads optimizado", desc: "CPC reducido un 18% automáticamente", color: "#F59E0B" },
  { icon: "✅", title: "Publicación programada", desc: "Mañana 09:00 · Instagram + LinkedIn", color: "#10B981" },
  { icon: "🔥", title: "Tendencia detectada", desc: "#MarketingDigital trending en Madrid", color: "#F97316" },
]

function NotificationsCard() {
  const counter = useRef(100)
  const [notifs, setNotifs] = useState(() =>
    NOTIF_TEMPLATES.slice(0, 3).map((n, i) => ({ ...n, uid: i }))
  )
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setNotifs(prev => {
        const next = NOTIF_TEMPLATES[Math.floor(Math.random() * NOTIF_TEMPLATES.length)]
        counter.current += 1
        return [{ ...next, uid: counter.current }, ...prev].slice(0, 4)
      })
    }, 2200)
    return () => clearInterval(interval)
  }, [paused])

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#EF4444", marginBottom: 6 }}>Live</p>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em" }}>
            Centro de actividad
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <motion.div
            animate={{ opacity: paused ? 0.3 : [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }}
          />
          <button
            onClick={() => setPaused(p => !p)}
            style={{
              fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600,
              color: "rgba(255,255,255,0.35)", background: "transparent",
              border: "1px solid rgba(255,255,255,0.09)", borderRadius: 6,
              padding: "4px 8px", cursor: "pointer",
            }}
          >
            {paused ? "▶ Play" : "⏸ Pausar"}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>
        <AnimatePresence mode="popLayout">
          {notifs.map((n, i) => (
            <motion.div
              key={n.uid}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "10px 12px", borderRadius: 12,
                background: i === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${i === 0 ? n.color + "33" : "rgba(255,255,255,0.05)"}`,
                transition: "border-color 0.3s",
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                background: `${n.color}18`, border: `1px solid ${n.color}28`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem",
              }}>
                {n.icon}
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", fontWeight: 600, color: "rgba(255,255,255,0.82)", marginBottom: 2 }}>
                  {n.title}
                </p>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>
                  {n.desc}
                </p>
              </div>
              {i === 0 && (
                <div style={{
                  marginLeft: "auto", padding: "2px 6px", borderRadius: 5,
                  background: `${n.color}20`, flexShrink: 0,
                  fontFamily: "var(--font-ui)", fontSize: "0.62rem",
                  fontWeight: 700, color: n.color,
                }}>
                  Ahora
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
