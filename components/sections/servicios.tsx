"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Heart, MessageCircle, Share2, TrendingUp } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export function Servicios() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <section ref={ref} className="section-container" style={{ paddingTop: 96, paddingBottom: 96 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
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

// ─── Spotlight card ─────────────────────────────────────────────────────────

function SpotlightCard({ children, color, glow }: { children: React.ReactNode; color: string; glow: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", borderRadius: 20,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: 24, height: "100%", overflow: "hidden",
        transition: "border-color 0.3s",
        borderColor: hovered ? `${color}55` : "rgba(255,255,255,0.07)",
        cursor: "default",
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute", width: 320, height: 320, borderRadius: "50%",
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          pointerEvents: "none",
          x: useTransform(mouseX, v => v - 160),
          y: useTransform(mouseY, v => v - 160),
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      <div aria-hidden="true" style={{
        position: "absolute", top: -40, right: -20,
        width: 180, height: 180, borderRadius: "50%",
        background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
        filter: "blur(20px)", pointerEvents: "none", opacity: 0.6,
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      <div style={{
        position: "absolute", bottom: 20, right: 20,
        width: 28, height: 28, borderRadius: "50%",
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "rgba(255,255,255,0.35)",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1)" : "scale(0.85)",
        transition: "opacity 0.2s, transform 0.2s",
      }}>
        <ArrowUpRight size={13} />
      </div>
    </div>
  )
}

// ─── Shared styles ───────────────────────────────────────────────────────────

const cardTitle: React.CSSProperties = {
  fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700,
  color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.25,
}
const cardDesc: React.CSSProperties = {
  fontFamily: "var(--font-body)", fontSize: "0.9rem",
  color: "rgba(255,255,255,0.40)", lineHeight: 1.65, maxWidth: 340,
}

function CardTag({ color, label }: { color: string; label: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 9999,
      fontFamily: "var(--font-ui)", fontSize: "0.7rem", fontWeight: 500,
      color, background: `${color}14`, border: `1px solid ${color}28`,
      letterSpacing: "0.02em", marginBottom: 14,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: "50%",
        background: color, flexShrink: 0, opacity: 0.85,
      }} />
      {label}
    </span>
  )
}

// ─── Social Dashboard (dominant card) ────────────────────────────────────────

const PLATFORMS = [
  { name: "Instagram", color: "#E1306C", followers: "12.4K", weekly: "+847", icon: <IgIcon /> },
  { name: "TikTok",    color: "#69C9D0", followers: "8.2K",  weekly: "+1.2K", icon: <TtIcon /> },
  { name: "LinkedIn",  color: "#0077B5", followers: "3.1K",  weekly: "+286",  icon: <LiIcon /> },
]

const MOCK_POSTS = [
  {
    gradient: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
    likes: 847, comments: 124, shares: 58,
    label: "Tendencia ↑",
  },
  {
    gradient: "linear-gradient(135deg, #1D4ED8 0%, #0891B2 100%)",
    likes: 623, comments: 89, shares: 41,
    label: "Viral",
  },
  {
    gradient: "linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)",
    likes: 1204, comments: 203, shares: 97,
    label: "Best post",
  },
]

function SocialDashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [activePost, setActivePost] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setActivePost(p => (p + 1) % MOCK_POSTS.length), 2500)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Platform stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {PLATFORMS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.4, ease: EASE }}
            style={{
              padding: "10px 12px", borderRadius: 12,
              background: `${p.color}10`,
              border: `1px solid ${p.color}22`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ color: p.color, display: "flex" }}>{p.icon}</span>
              <span style={{
                fontFamily: "var(--font-ui)", fontSize: "0.68rem",
                color: "rgba(255,255,255,0.45)", fontWeight: 500,
              }}>{p.name}</span>
            </div>
            <p style={{
              fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700,
              color: "rgba(255,255,255,0.90)", lineHeight: 1, marginBottom: 3,
            }}>{p.followers}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <TrendingUp size={10} style={{ color: "#10B981" }} />
              <span style={{
                fontFamily: "var(--font-ui)", fontSize: "0.66rem",
                color: "#10B981", fontWeight: 600,
              }}>{p.weekly} / sem</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Post previews */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {MOCK_POSTS.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.25 + i * 0.07, ease: EASE }}
            style={{
              borderRadius: 10, overflow: "hidden",
              border: activePost === i ? "1px solid rgba(155,77,188,0.5)" : "1px solid rgba(255,255,255,0.07)",
              transition: "border-color 0.4s",
              cursor: "pointer",
            }}
            onClick={() => setActivePost(i)}
          >
            {/* Thumbnail */}
            <div style={{
              height: isDesktop ? 72 : 56,
              background: post.gradient,
              position: "relative",
              display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
              padding: 6,
            }}>
              <span style={{
                fontFamily: "var(--font-ui)", fontSize: "0.6rem", fontWeight: 700,
                color: "rgba(255,255,255,0.9)",
                background: "rgba(0,0,0,0.35)", padding: "2px 6px", borderRadius: 4,
                backdropFilter: "blur(4px)",
              }}>
                {post.label}
              </span>
            </div>
            {/* Stats */}
            <div style={{
              padding: "7px 8px",
              background: "rgba(255,255,255,0.025)",
              display: "flex", gap: 8,
            }}>
              <Stat icon={<Heart size={9} />} value={post.likes} color="rgba(255,255,255,0.55)" />
              <Stat icon={<MessageCircle size={9} />} value={post.comments} color="rgba(255,255,255,0.55)" />
              <Stat icon={<Share2 size={9} />} value={post.shares} color="rgba(255,255,255,0.55)" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Engagement bar chart */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "rgba(255,255,255,0.30)" }}>
            Engagement rate — últimos 12 meses
          </span>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 700, color: "#9B4DBC" }}>
            +247%
          </span>
        </div>
        <EngagementBars inView={inView} />
      </div>
    </div>
  )
}

function Stat({ icon, value, color }: { icon: React.ReactNode; value: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <span style={{ color }}>{icon}</span>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.64rem", color, fontWeight: 500 }}>
        {value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value}
      </span>
    </div>
  )
}

const ENG_DATA = [28, 35, 32, 48, 42, 58, 55, 72, 68, 89, 82, 100]

function EngagementBars({ inView }: { inView: boolean }) {
  const max = Math.max(...ENG_DATA)
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 42 }}>
      {ENG_DATA.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={inView ? { height: `${(v / max) * 42}px` } : { height: 0 }}
          transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
          style={{
            flex: 1, borderRadius: "3px 3px 0 0",
            background: i === ENG_DATA.length - 1
              ? "linear-gradient(180deg, #C06DD8, #3B82F6)"
              : i > ENG_DATA.length - 4
                ? "rgba(107,45,124,0.55)"
                : "rgba(107,45,124,0.28)",
            minWidth: 0,
          }}
        />
      ))}
    </div>
  )
}

// ─── Platform SVG icons ───────────────────────────────────────────────────────

function IgIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}
function TtIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z"/>
    </svg>
  )
}
function LiIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

// ─── Other card visualizations ────────────────────────────────────────────────

function RoasGauge() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const ROAS = 4.2
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", color: "rgba(255,255,255,0.30)" }}>ROAS medio</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "#3B82F6" }}
        >×{ROAS}</motion.span>
      </div>
      <div style={{ height: 6, borderRadius: 9999, background: "rgba(59,130,246,0.12)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${(ROAS / 8) * 100}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          style={{ height: "100%", borderRadius: 9999, background: "linear-gradient(90deg, #1D4ED8, #3B82F6)" }}
        />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {[["Inversión", "€2.400"], ["Retorno", "€10.080"], ["Beneficio", "€7.680"]].map(([l, v]) => (
          <div key={l} style={{ flex: 1 }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", marginBottom: 2 }}>{l}</p>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.70)" }}>{v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const TRAFFIC_POINTS = [10, 14, 12, 18, 22, 20, 30, 35, 32, 48, 52, 65]

function TrafficChart() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const W = 200; const H = 52
  const max = Math.max(...TRAFFIC_POINTS)
  const pts = TRAFFIC_POINTS.map((v, i) => [
    (i / (TRAFFIC_POINTS.length - 1)) * W,
    H - (v / max) * H,
  ])
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ")
  const fill = `${d} L${W},${H} L0,${H} Z`
  return (
    <div ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", color: "rgba(255,255,255,0.30)" }}>Tráfico orgánico</span>
        <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 700, color: "#10B981" }}>+183%</span>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height: 52, overflow: "visible" }}>
        <defs>
          <linearGradient id="seo-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
          <clipPath id="seo-clip">
            <motion.rect x="0" y="0" height={H}
              initial={{ width: 0 }}
              animate={inView ? { width: W } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
            />
          </clipPath>
        </defs>
        <path d={fill} fill="url(#seo-grad)" clipPath="url(#seo-clip)" />
        <motion.path d={d} fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
        />
        <motion.circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill="#10B981"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 1.3 }}
        />
      </svg>
    </div>
  )
}

function EmailStats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const stats = [
    { label: "Open rate", value: 38, unit: "%", color: "#F59E0B" },
    { label: "Click rate", value: 12, unit: "%", color: "#F59E0B" },
    { label: "Conversión", value: 4.8, unit: "%", color: "#F59E0B" },
  ]
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {stats.map((s, i) => (
        <div key={s.label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>{s.label}</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600, color: s.color }}>{s.value}{s.unit}</span>
          </div>
          <div style={{ height: 4, borderRadius: 9999, background: "rgba(245,158,11,0.10)", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${(s.value / 50) * 100}%` } : { width: 0 }}
              transition={{ duration: 0.8, delay: i * 0.12 + 0.1, ease: EASE }}
              style={{ height: "100%", borderRadius: 9999, background: `linear-gradient(90deg, ${s.color}88, ${s.color})` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const DASH_BARS = [64, 82, 71, 90, 78, 95, 88, 100, 92, 84, 97, 89]

function DashboardPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref}>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {[
          { label: "Sesiones", value: "12.4K", delta: "+18%" },
          { label: "Conversiones", value: "284", delta: "+31%" },
          { label: "Ingresos", value: "€8.2K", delta: "+24%" },
        ].map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08 + 0.1 }}
            style={{
              flex: "1 1 auto", padding: "8px 12px", borderRadius: 10,
              background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: "rgba(255,255,255,0.30)", marginBottom: 2 }}>{k.label}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>{k.value}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: "#10B981", fontWeight: 600 }}>{k.delta}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40 }}>
        {DASH_BARS.map((v, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={inView ? { height: `${(v / 100) * 40}px` } : { height: 0 }}
            transition={{ duration: 0.5, delay: i * 0.035, ease: EASE }}
            style={{
              flex: 1, borderRadius: "2px 2px 0 0",
              background: i % 3 === 0
                ? "linear-gradient(180deg, #8B5CF6, #6D28D9)"
                : "rgba(139,92,246,0.28)",
              minWidth: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}
