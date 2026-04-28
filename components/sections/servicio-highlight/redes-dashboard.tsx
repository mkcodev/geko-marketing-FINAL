"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, AnimatePresence, animate } from "motion/react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Icon } from "@/lib/icons"
import type { IconName } from "@/lib/icons"
import { EASE } from "@/lib/animations"

function AnimatedCounter({ to, from = 0, duration = 1.8, suffix = "", started }: {
  to: number; from?: number; duration?: number; suffix?: string; started: boolean
}) {
  const [val, setVal] = useState(from)
  const hasRun = useRef(false)
  useEffect(() => {
    if (!started || hasRun.current) return
    hasRun.current = true
    animate(from, to, {
      duration, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
  }, [started, from, to, duration])
  return <>{val.toLocaleString("es-ES")}{suffix}</>
}

// ── Notification toast ────────────────────────────────────────
const NOTIFICATIONS: { platform: string; icon: IconName; text: string; color: string }[] = [
  { platform: "Instagram", icon: "Camera",   text: "15 comentarios nuevos en tu último post", color: "#E1306C" },
  { platform: "TikTok",    icon: "Music2",   text: "Tu reel ya tiene 4.200 likes",             color: "#EE1D52" },
  { platform: "LinkedIn",  icon: "Briefcase",text: "Tu empresa fue vista 2.800 veces",         color: "#0077B5" },
  { platform: "Facebook",  icon: "Users",    text: "32 compartidos en las últimas 2 horas",    color: "#1877F2" },
]

function NotificationToast({ notif, visible }: { notif: typeof NOTIFICATIONS[0]; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 24, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 24, scale: 0.94 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{
            position: "absolute",
            top: 0, right: 0,
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px",
            borderRadius: 12,
            background: "rgba(10,10,20,0.95)",
            border: `1px solid ${notif.color}30`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${notif.color}15`,
            backdropFilter: "blur(12px)",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: `${notif.color}18`,
            border: `1px solid ${notif.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: notif.color,
          }}><Icon name={notif.icon} size={14} /></div>
          <div>
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.7rem",
              fontWeight: 600, color: notif.color,
              marginBottom: 1, letterSpacing: "0.04em",
            }}>{notif.platform}</p>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "0.75rem",
              color: "var(--fg-secondary)",
            }}>{notif.text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Engagement sparkline ──────────────────────────────────────
function Sparkline({ color, started }: { color: string; started: boolean }) {
  const [progress, setProgress] = useState(0)
  const hasRun = useRef(false)
  const points = [20, 28, 22, 35, 30, 42, 38, 55, 48, 62, 58, 72, 65, 80, 74, 88, 82, 95]

  useEffect(() => {
    if (!started || hasRun.current) return
    hasRun.current = true
    animate(0, 1, {
      duration: 2.2, ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setProgress(v),
    })
  }, [started])

  const w = 200, h = 60
  const max = Math.max(...points)
  const min = Math.min(...points)
  const visible = Math.round(progress * points.length)
  const visiblePts = points.slice(0, Math.max(visible, 2))

  const toSvgPt = (val: number, i: number) => {
    const x = (i / (points.length - 1)) * w
    const y = h - ((val - min) / (max - min)) * (h - 8) - 4
    return `${x},${y}`
  }

  const pathD = visiblePts.map((v, i) => `${i === 0 ? "M" : "L"}${toSvgPt(v, i)}`).join(" ")
  const areaD = visiblePts.length > 1
    ? `${pathD} L${toSvgPt(visiblePts[visiblePts.length - 1], visiblePts.length - 1).split(",")[0]},${h} L0,${h} Z`
    : ""

  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {areaD && (
        <path d={areaD} fill={`url(#grad-${color.replace("#", "")})`} />
      )}
      {visiblePts.length > 1 && (
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {visiblePts.length > 0 && (
        <circle
          cx={toSvgPt(visiblePts[visiblePts.length - 1], visiblePts.length - 1).split(",")[0]}
          cy={toSvgPt(visiblePts[visiblePts.length - 1], visiblePts.length - 1).split(",")[1]}
          r="3.5" fill={color}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
      )}
    </svg>
  )
}

// ── Platform metric card ──────────────────────────────────────
function PlatformCard({ platform, icon, color, followers, growth, engagement, started, delay }: {
  platform: string; icon: IconName; color: string
  followers: number; growth: string; engagement: string
  started: boolean; delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        borderRadius: 16,
        background: `${color}08`,
        border: `1px solid ${color}20`,
        padding: "18px 20px",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Icon name={icon} size={16} style={{ color, flexShrink: 0 }} />
        <span style={{
          fontFamily: "var(--font-ui)", fontSize: "0.78rem",
          fontWeight: 600, color: "var(--fg-secondary)",
        }}>{platform}</span>
        <span style={{
          marginLeft: "auto",
          padding: "2px 8px", borderRadius: 5,
          background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)",
          fontFamily: "var(--font-ui)", fontSize: "0.65rem",
          fontWeight: 600, color: "#22C55E",
        }}>↑ {growth}</span>
      </div>
      <p style={{
        fontFamily: "var(--font-heading)", fontSize: "1.5rem",
        fontWeight: 800, color, lineHeight: 1, marginBottom: 4,
      }}>
        <AnimatedCounter to={followers} duration={2} started={started} />
      </p>
      <p style={{
        fontFamily: "var(--font-ui)", fontSize: "0.72rem",
        color: "var(--fg-muted)", marginBottom: 10,
      }}>seguidores</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: "0.72rem",
          color: "var(--fg-muted)",
        }}>Engagement</span>
        <span style={{
          fontFamily: "var(--font-heading)", fontSize: "0.875rem",
          fontWeight: 700, color,
        }}>{engagement}</span>
      </div>
    </motion.div>
  )
}

// ── Post preview card ─────────────────────────────────────────
const MOCK_POSTS: { platform: string; icon: IconName; color: string; likes: number; comments: number; time: string; content: string; img: IconName }[] = [
  { platform: "Instagram", icon: "Camera",    color: "#E1306C", likes: 847,  comments: 62,  time: "hace 2h", content: "El secreto que diferencia a las marcas que convierten de las que solo publican", img: "ImageIcon" },
  { platform: "TikTok",    icon: "Music2",    color: "#EE1D52", likes: 4200, comments: 183, time: "hace 5h", content: "5 errores que cometen el 90% de las pymes en redes sociales (y cómo evitarlos)", img: "Film" },
  { platform: "LinkedIn",  icon: "Briefcase", color: "#0077B5", likes: 312,  comments: 28,  time: "hace 1d", content: "Cómo pasamos a este cliente de 0 a 12.400 seguidores en 6 meses con una estrategia clara", img: "BarChart2" },
]

export function RedesDashboard() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isMd = useMediaQuery("(min-width: 768px)")
  const [notifIdx, setNotifIdx] = useState(-1)
  const [postIdx, setPostIdx] = useState(0)

  // Rotate notifications
  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      let i = 0
      setNotifIdx(0)
      const interval = setInterval(() => {
        i = (i + 1) % NOTIFICATIONS.length
        setNotifIdx(i)
      }, 2400)
      return () => clearInterval(interval)
    }, 800)
    return () => clearTimeout(timer)
  }, [inView])

  // Rotate posts
  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setPostIdx((i) => (i + 1) % MOCK_POSTS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section
      ref={ref}
      style={{
        paddingTop: isDesktop ? 100 : 72,
        paddingBottom: isDesktop ? 100 : 72,
        borderBottom: "1px solid var(--border-subtle)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* BG */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: "50%", height: "70%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(225,48,108,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", bottom: "0", left: "-5%",
          width: "40%", height: "50%",
          background: "radial-gradient(ellipse, var(--color-geko-purple-a07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
      </div>

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: isDesktop ? 64 : 48 }}
        >
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 9999,
            border: "1px solid rgba(225,48,108,0.35)", background: "rgba(225,48,108,0.10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#F472B6", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 16,
          }}>Resultados en tiempo real</span>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.875rem, 4vw, 3rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            marginBottom: 16,
          }}>
            Tu marca activa.{" "}
            <span style={{
              background: "linear-gradient(135deg, #E1306C 0%, var(--color-geko-purple-accent) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Cada día.</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: isMd ? "1.0625rem" : "0.9375rem",
            color: "var(--fg-muted)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7,
          }}>
            Así se ve el panel de control de nuestros clientes. Métricas reales, contenido publicado a diario y notificaciones que nunca dejan de llegar.
          </p>
        </motion.div>

        {/* Platform cards */}
        <div style={{
          display: "flex",
          gap: 12,
          flexWrap: isMd ? "nowrap" : "wrap",
          marginBottom: 16,
        }}>
          <PlatformCard platform="Instagram" icon="Camera"    color="#E1306C" followers={12400} growth="+247%" engagement="8.4%" started={inView} delay={0.1} />
          <PlatformCard platform="TikTok"    icon="Music2"    color="#EE1D52" followers={8750}  growth="+189%" engagement="12.1%" started={inView} delay={0.18} />
          <PlatformCard platform="LinkedIn"  icon="Briefcase" color="#0077B5" followers={3200}  growth="+94%"  engagement="5.3%" started={inView} delay={0.26} />
          {isMd && <PlatformCard platform="Facebook" icon="Users" color="#1877F2" followers={5600} growth="+72%" engagement="3.9%" started={inView} delay={0.34} />}
        </div>

        {/* Main grid: chart + notifications + post preview */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "2fr 1fr" : "1fr",
          gap: 16,
          marginBottom: 16,
        }}>
          {/* Engagement chart */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            style={{
              borderRadius: 20,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "24px",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.72rem",
                  fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: "var(--fg-subtle)",
                  marginBottom: 6,
                }}>Crecimiento de seguidores</p>
                <p style={{
                  fontFamily: "var(--font-heading)", fontSize: "2rem",
                  fontWeight: 800, color: "#E1306C", lineHeight: 1,
                }}>
                  +<AnimatedCounter to={247} duration={2.2} suffix="%" started={inView} />
                </p>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--fg-muted)", marginTop: 2 }}>
                  en los últimos 90 días
                </p>
              </div>
              <div style={{ position: "relative", width: 220, height: 60, flexShrink: 0 }}>
                {/* Notification toast */}
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Sparkline color="#E1306C" started={inView} />
                  <div style={{ position: "absolute", top: -40, right: -10, width: 300 }}>
                    {NOTIFICATIONS.map((n, i) => (
                      <NotificationToast key={n.platform} notif={n} visible={notifIdx === i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly breakdown */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 4,
              alignItems: "flex-end",
              height: 64,
            }}>
              {[35, 48, 42, 65, 58, 78, 92].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: EASE }}
                  style={{
                    height: `${h}%`,
                    borderRadius: "4px 4px 0 0",
                    background: i === 6
                      ? "linear-gradient(180deg, #E1306C, var(--color-geko-purple-accent))"
                      : "rgba(225,48,108,0.25)",
                    transformOrigin: "bottom",
                    boxShadow: i === 6 ? "0 0 12px rgba(225,48,108,0.4)" : "none",
                  }}
                />
              ))}
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
              gap: 4, marginTop: 6,
            }}>
              {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
                <span key={d} style={{
                  textAlign: "center",
                  fontFamily: "var(--font-ui)", fontSize: "0.65rem",
                  color: "var(--fg-subtle)",
                }}>{d}</span>
              ))}
            </div>
          </motion.div>

          {/* Post preview card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            style={{
              borderRadius: 20,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <p style={{
                fontFamily: "var(--font-ui)", fontSize: "0.72rem",
                fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", color: "var(--fg-subtle)",
              }}>Último contenido</p>
              <div style={{ display: "flex", gap: 4 }}>
                {MOCK_POSTS.map((_, i) => (
                  <div key={i} style={{
                    width: i === postIdx ? 16 : 6, height: 6,
                    borderRadius: 9999,
                    background: i === postIdx ? "#E1306C" : "var(--fg-faint)",
                    transition: "all 0.3s ease",
                  }} />
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              {MOCK_POSTS.map((post, i) => i === postIdx && (
                <motion.div
                  key={post.platform}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  style={{ padding: "20px" }}
                >
                  {/* Post header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 10,
                      background: `${post.color}18`,
                      border: `1px solid ${post.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: post.color,
                    }}><Icon name={post.icon} size={15} /></div>
                    <div>
                      <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--fg)" }}>{post.platform}</p>
                      <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", color: "var(--fg-subtle)" }}>{post.time}</p>
                    </div>
                  </div>

                  {/* Post image placeholder */}
                  <div style={{
                    height: 100, borderRadius: 10,
                    background: `${post.color}12`,
                    border: `1px solid ${post.color}18`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: post.color, opacity: 0.6, marginBottom: 12,
                  }}><Icon name={post.img} size={40} /></div>

                  {/* Caption */}
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: "0.8rem",
                    color: "var(--fg-secondary)", lineHeight: 1.55,
                    marginBottom: 14,
                  }}>{post.content}</p>

                  {/* Stats */}
                  <div style={{ display: "flex", gap: 16 }}>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.78rem", color: "var(--fg-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon name="Heart" size={12} style={{ color: "#E1306C" }} /> {post.likes.toLocaleString("es-ES")}
                    </span>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.78rem", color: "var(--fg-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon name="MessageCircle" size={12} style={{ color: "var(--fg-muted)" }} /> {post.comments}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.45, ease: EASE }}
          style={{
            borderRadius: 18,
            background: "rgba(225,48,108,0.05)",
            border: "1px solid rgba(225,48,108,0.15)",
            padding: "20px 28px",
            display: "grid",
            gridTemplateColumns: isMd ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
            gap: 20,
          }}
        >
          {[
            { val: 29900, suffix: "", label: "Alcance semanal total", color: "#E1306C" },
            { val: 247, suffix: "%",  label: "Crecimiento engagement", color: "var(--color-geko-purple-accent)" },
            { val: 28,  suffix: "",   label: "Posts publicados/mes",   color: "var(--color-geko-blue-light)" },
            { val: 4,   suffix: ".2×", label: "ROAS en Social Ads",    color: "#F59E0B" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "var(--font-heading)", fontSize: "clamp(1.4rem, 2.5vw, 1.875rem)",
                fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4,
                filter: `drop-shadow(0 0 12px ${s.color}50)`,
              }}>
                <AnimatedCounter to={s.val} duration={2} started={inView} />{s.suffix}
              </p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", color: "var(--fg-muted)" }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
