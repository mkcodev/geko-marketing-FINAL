"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Star, Users, TrendingUp, ChevronDown } from "lucide-react"
import { Typewriter } from "@/components/ui/typewriter"
import { Magnetic } from "@/components/ui/magnetic"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Icon } from "@/lib/icons"
import type { IconName } from "@/lib/icons"

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const TYPEWRITER_WORDS = [
  "clientes",
  "ventas",
  "resultados",
  "impacto",
]

const STATS = [
  { icon: <Users size={16} />, value: "50+", label: "Clientes activos" },
  { icon: <TrendingUp size={16} />, value: "3+", label: "Años de experiencia" },
  { icon: <Star size={16} />, value: "98%", label: "Tasa de retención" },
]

const FLOATING_CARDS: { id: string; icon: IconName; platform: string; metric: string; label: string; top: string; left: string; delay: number }[] = [
  { id: "ig", icon: "Camera",    platform: "Instagram", metric: "+247%", label: "Engagement",      top: "12%", left: "5%",  delay: 0 },
  { id: "tk", icon: "Music2",    platform: "TikTok",    metric: "2.4M",  label: "Visualizaciones", top: "55%", left: "-5%", delay: 0.3 },
  { id: "li", icon: "Briefcase", platform: "LinkedIn",  metric: "+183%", label: "Alcance orgánico", top: "78%", left: "55%", delay: 0.6 },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.65, delay, ease: EASE },
  })

  const scrollToNext = () => {
    if (!ref.current) return
    const next = ref.current.nextElementSibling as HTMLElement | null
    if (next) {
      const top = next.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "calc(100svh - 56px - var(--ann-h, 40px))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Background />

      <div
        className="section-container"
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          alignItems: "center",
          gap: isDesktop ? "48px" : "32px",
          paddingTop: isDesktop ? 32 : 20,
          paddingBottom: 72, // space for scroll indicator
        }}
      >
        {/* LEFT: Copy */}
        <div>
          {/* Badge */}
          <motion.div {...anim(0)} style={{ marginBottom: 20 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "5px 14px 5px 8px",
                borderRadius: 9999,
                border: "1px solid rgba(107,45,124,0.35)",
                background: "rgba(107,45,124,0.10)",
                fontFamily: "var(--font-ui)",
                fontSize: "0.8125rem",
                color: "rgba(255,255,255,0.80)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6B2D7C, #1D4ED8)",
                  fontSize: "0.75rem",
                }}
              >
                🦎
              </span>
              Agencia de Marketing Digital · Tres Cantos, Madrid
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...anim(0.1)}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isDesktop ? "clamp(2.5rem, 4.5vw, 4rem)" : "clamp(2rem, 8vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.96)",
              marginBottom: 12,
            }}
          >
            Transformamos
            <br />
            seguidores en
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <Typewriter words={TYPEWRITER_WORDS} />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...anim(0.2)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isDesktop ? "1.0625rem" : "1rem",
              color: "rgba(255,255,255,0.52)",
              lineHeight: 1.7,
              marginBottom: 28,
              maxWidth: 480,
            }}
          >
            Gestionamos tus redes sociales y potenciamos tu marca para que{" "}
            <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
              atraigas más clientes y aumentes tus ventas
            </strong>
            . Sin complicaciones. Con resultados medibles en 60 días.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...anim(0.3)}
            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}
          >
            <Magnetic>
              <Link
                href="/servicios"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: isDesktop ? "14px 28px" : "13px 22px",
                  borderRadius: 12,
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "#fff",
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
                  boxShadow: "0 4px 24px rgba(107,45,124,0.45), 0 1px 4px rgba(0,0,0,0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                Ver nuestros servicios
                <ArrowRight size={16} />
              </Link>
            </Magnetic>

            <Magnetic>
              <Link
                href="/contacto"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: isDesktop ? "14px 28px" : "13px 22px",
                  borderRadius: 12,
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.82)",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  whiteSpace: "nowrap",
                }}
              >
                Habla con nosotros
              </Link>
            </Magnetic>
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...anim(0.4)}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: isDesktop ? "32px" : "20px",
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: "rgba(107,45,124,0.15)",
                    color: "#9B4DBC",
                    border: "1px solid rgba(107,45,124,0.25)",
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.40)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Visual (desktop only) */}
        {isDesktop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            style={{ position: "relative", height: 520, overflow: "hidden" }}
          >
            <SocialCommandCenter />
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        whileHover={{ opacity: 0.75 }}
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: "rgba(255,255,255,0.30)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px 16px",
        }}
        aria-label="Ir a la siguiente sección"
      >
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={15} />
        </motion.div>
      </motion.button>
    </section>
  )
}

// ── Background animated orbs ────────────────────────────────

function Background() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-5%",
          width: "55%",
          height: "70%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(107,45,124,0.22) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "float 9s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-10%",
          width: "45%",
          height: "55%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(29,78,216,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "float 12s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "35%",
          width: "35%",
          height: "35%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(107,45,124,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 7s ease-in-out infinite 2s",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />
    </div>
  )
}

// ── Social Command Center ────────────────────────────────────

const PLATFORMS: { id: string; label: string; color: string; icon: IconName; handle: string }[] = [
  { id: "ig", label: "Instagram", color: "#E1306C", icon: "Camera",    handle: "@geko.marketing" },
  { id: "tk", label: "TikTok",    color: "#69C9D0", icon: "Music2",    handle: "@gekomarketing" },
  { id: "li", label: "LinkedIn",  color: "#0A66C2", icon: "Briefcase", handle: "Geko Marketing" },
]

const NOTIFICATIONS: { id: number; text: string; icon: IconName; color: string }[] = [
  { id: 1, text: "+847 seguidores esta semana",     icon: "TrendingUp", color: "#9B4DBC" },
  { id: 2, text: "Post publicado en 3 plataformas", icon: "CheckSquare", color: "#10B981" },
  { id: 3, text: "ROAS ×4.2 en campaña activa",     icon: "Target",     color: "#3B82F6" },
  { id: 4, text: "Nueva reseña 5 estrellas",         icon: "Star",       color: "#F59E0B" },
]

const SCHEDULED_POSTS: { time: string; platform: IconName; label: string; status: string; color: string }[] = [
  { time: "10:00", platform: "Camera",    label: "Reel semana",      status: "live",      color: "#E1306C" },
  { time: "13:30", platform: "Briefcase", label: "Artículo blog",    status: "scheduled", color: "#0A66C2" },
  { time: "17:00", platform: "Music2",    label: "TikTok tendencia", status: "scheduled", color: "#69C9D0" },
  { time: "20:00", platform: "Camera",    label: "Story producto",   status: "scheduled", color: "#E1306C" },
]

function SocialCommandCenter() {
  const [activePlatform, setActivePlatform] = useState(0)
  const [notifIdx, setNotifIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActivePlatform(p => (p + 1) % PLATFORMS.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setNotifIdx(i => (i + 1) % NOTIFICATIONS.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const platform = PLATFORMS[activePlatform]
  const notif = NOTIFICATIONS[notifIdx]

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, paddingTop: 8 }}>

      {/* ── Floating notification — top right of card ── */}
      <div style={{ position: "absolute", top: 0, right: 0, zIndex: 20 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 16, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.92 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 12px", borderRadius: 12,
              background: "rgba(8,8,16,0.92)",
              border: `1px solid ${notif.color}30`,
              backdropFilter: "blur(20px)",
              boxShadow: `0 6px 20px rgba(0,0,0,0.4)`,
              whiteSpace: "nowrap",
            }}
          >
            <div style={{
              width: 26, height: 26, borderRadius: 8, flexShrink: 0,
              background: `${notif.color}18`, border: `1px solid ${notif.color}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: notif.color,
            }}><Icon name={notif.icon} size={13} /></div>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.74rem", fontWeight: 500, color: "rgba(255,255,255,0.80)" }}>
              {notif.text}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Main card — dashboard ── */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          borderRadius: 20,
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(24px)",
          overflow: "hidden",
          boxShadow: "0 24px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset",
          marginTop: 24,
        }}
      >
        {/* Window bar */}
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.02)",
        }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#FF5F57", "#FFBD2E", "#28C840"].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.85 }} />
            ))}
          </div>
          <div style={{
            flex: 1,
            textAlign: "center",
            fontFamily: "var(--font-ui)",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.03em",
          }}>
            geko · panel de control
          </div>
        </div>

        {/* Platform tabs */}
        <div style={{
          display: "flex",
          padding: "12px 16px 0",
          gap: 6,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          {PLATFORMS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActivePlatform(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 12px",
                borderRadius: "8px 8px 0 0",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-ui)",
                fontSize: "0.75rem",
                fontWeight: 600,
                background: i === activePlatform ? "rgba(255,255,255,0.07)" : "transparent",
                color: i === activePlatform ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.30)",
                borderBottom: i === activePlatform ? `2px solid ${p.color}` : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <Icon name={p.icon} size={13} style={{ flexShrink: 0 }} />
              {p.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div style={{ padding: "16px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlatform}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
            >
              {/* Mock post composer */}
              <div style={{
                borderRadius: 12,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden",
                marginBottom: 12,
              }}>
                {/* Image preview */}
                <div style={{
                  height: 100,
                  background: `linear-gradient(135deg, ${platform.color}22 0%, rgba(29,78,216,0.15) 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <Icon name={platform.icon} size={40} style={{ color: platform.color, opacity: 0.7, filter: `drop-shadow(0 0 20px ${platform.color}50)` }} />
                  <div style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    padding: "3px 8px",
                    borderRadius: 6,
                    background: "rgba(16,185,129,0.20)",
                    border: "1px solid rgba(16,185,129,0.35)",
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "#10B981",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}>
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                      style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981" }}
                    />
                    EN VIVO
                  </div>
                </div>

                <div style={{ padding: "10px 12px" }}>
                  <p style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.5,
                    marginBottom: 8,
                  }}>
                    <span style={{ color: "rgba(255,255,255,0.75)" }}>Gestión activa</span> en {platform.handle} · Publicando contenido optimizado para máximo alcance orgánico...
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["#marketing", "#madrid", "#digitalmarketing"].map(tag => (
                      <span key={tag} style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.65rem",
                        color: platform.color,
                        background: `${platform.color}15`,
                        padding: "2px 7px",
                        borderRadius: 4,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule strip */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <p style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 2,
                }}>
                  Calendario hoy
                </p>
                {SCHEDULED_POSTS.map((post, i) => (
                  <motion.div
                    key={post.time}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "7px 10px",
                      borderRadius: 8,
                      background: post.status === "live" ? "rgba(16,185,129,0.07)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${post.status === "live" ? "rgba(16,185,129,0.20)" : "rgba(255,255,255,0.04)"}`,
                    }}
                  >
                    <Icon name={post.platform} size={13} style={{ color: post.color, flexShrink: 0 }} />
                    <span style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: post.status === "live" ? "#10B981" : "rgba(255,255,255,0.40)",
                      minWidth: 36,
                    }}>
                      {post.time}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.55)",
                      flex: 1,
                    }}>
                      {post.label}
                    </span>
                    <span style={{
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 600,
                      color: post.status === "live" ? "#10B981" : "rgba(255,255,255,0.25)",
                    }}>
                      {post.status === "live" ? "● Live" : "·"}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Bottom metrics strip ── */}
      <div style={{
        borderRadius: 14,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        {[
          { value: "12.4K", label: "Alcance semanal", color: "#9B4DBC" },
          { value: "+247%", label: "Engagement", color: "#3B82F6" },
          { value: "×4.2", label: "ROAS medio", color: "#10B981" },
        ].map((m) => (
          <div key={m.label} style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: m.color, lineHeight: 1.1, marginBottom: 2 }}>
              {m.value}
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: "rgba(255,255,255,0.30)" }}>
              {m.label}
            </p>
          </div>
        ))}
      </div>

      {/* Ambient glows */}
      <div aria-hidden style={{
        position: "absolute",
        top: "30%",
        left: "40%",
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(107,45,124,0.18) 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
        zIndex: -1,
      }} />
      <div aria-hidden style={{
        position: "absolute",
        bottom: "20%",
        right: "10%",
        width: 160,
        height: 160,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(29,78,216,0.15) 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
        zIndex: -1,
      }} />
    </div>
  )
}

// ── Geko visual (old — movido al playground) ─────────────────

function GekoVisual() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Main card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "75%",
          aspectRatio: "3/4",
          borderRadius: 24,
          background: "linear-gradient(135deg, rgba(107,45,124,0.3) 0%, rgba(29,78,216,0.2) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 60px rgba(107,45,124,0.2), inset 0 1px 0 rgba(255,255,255,0.10)",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: "7rem", filter: "drop-shadow(0 0 40px rgba(107,45,124,0.6))", marginBottom: 16 }}>
          🦎
        </div>
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}
        >
          Animación Rive
          <br />
          <span style={{ fontSize: "0.8rem", fontWeight: 400, color: "rgba(255,255,255,0.35)" }}>
            próximamente
          </span>
        </p>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "60%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
            animation: "shimmer 3s ease-in-out infinite 1s",
            pointerEvents: "none",
          }}
        />
      </motion.div>

      {/* Floating metric cards */}
      {FLOATING_CARDS.map((card) => (
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
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 14,
              background: "rgba(10,10,22,0.85)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            <Icon name={card.icon} size={22} style={{ color: "#9B4DBC", flexShrink: 0 }} />
            <div>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#9B4DBC",
                  lineHeight: 1,
                  marginBottom: 2,
                }}
              >
                {card.metric}
              </p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "rgba(255,255,255,0.45)" }}>
                {card.label}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Glow rings */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "85%",
          height: "85%",
          borderRadius: "50%",
          border: "1px solid rgba(107,45,124,0.12)",
          animation: "spin-slow 20s linear infinite",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95%",
          height: "95%",
          borderRadius: "50%",
          border: "1px solid rgba(29,78,216,0.08)",
          animation: "spin-slow 30s linear infinite reverse",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
