"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Icon } from "@/lib/icons"
import type { IconName } from "@/lib/icons"

const PLATFORMS: { id: string; label: string; color: string; icon: IconName; handle: string }[] = [
  { id: "ig", label: "Instagram", color: "#E1306C", icon: "Camera",    handle: "@geko.marketing" },
  { id: "tk", label: "TikTok",    color: "#69C9D0", icon: "Music2",    handle: "@gekomarketing" },
  { id: "li", label: "LinkedIn",  color: "#0A66C2", icon: "Briefcase", handle: "Geko Marketing" },
]

const NOTIFICATIONS: { id: number; text: string; icon: IconName; color: string }[] = [
  { id: 1, text: "+847 seguidores esta semana",     icon: "TrendingUp",  color: "var(--color-geko-purple-accent)" },
  { id: 2, text: "Post publicado en 3 plataformas", icon: "CheckSquare", color: "#10B981" },
  { id: 3, text: "ROAS ×4.2 en campaña activa",     icon: "Target",      color: "var(--color-geko-blue-light)" },
  { id: 4, text: "Nueva reseña 5 estrellas",         icon: "Star",        color: "#F59E0B" },
]

const SCHEDULED_POSTS: { time: string; platform: IconName; label: string; status: string; color: string }[] = [
  { time: "10:00", platform: "Camera",    label: "Reel semana",      status: "live",      color: "#E1306C" },
  { time: "13:30", platform: "Briefcase", label: "Artículo blog",    status: "scheduled", color: "#0A66C2" },
  { time: "17:00", platform: "Music2",    label: "TikTok tendencia", status: "scheduled", color: "#69C9D0" },
  { time: "20:00", platform: "Camera",    label: "Story producto",   status: "scheduled", color: "#E1306C" },
]

export function SocialCommandCenter() {
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
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.74rem", fontWeight: 500, color: "var(--fg)" }}>
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
          background: "var(--surface)",
          border: "1px solid var(--border)",
          backdropFilter: "blur(24px)",
          overflow: "hidden",
          boxShadow: "0 24px 56px rgba(0,0,0,0.45), 0 0 0 1px var(--surface) inset",
          marginTop: 24,
        }}
      >
        {/* Window bar */}
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--surface)",
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
            color: "var(--fg-subtle)",
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
          borderBottom: "1px solid var(--border-subtle)",
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
                background: i === activePlatform ? "var(--border-subtle)" : "transparent",
                color: i === activePlatform ? "var(--fg)" : "var(--fg-muted)",
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
                background: "var(--surface)",
                border: "1px solid var(--border-subtle)",
                overflow: "hidden",
                marginBottom: 12,
              }}>
                {/* Image preview */}
                <div style={{
                  height: 100,
                  background: `linear-gradient(135deg, ${platform.color}22 0%, var(--color-geko-blue-a15) 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  borderBottom: "1px solid var(--border-subtle)",
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
                    color: "var(--fg-secondary)",
                    lineHeight: 1.5,
                    marginBottom: 8,
                  }}>
                    <span style={{ color: "var(--fg)" }}>Gestión activa</span> en {platform.handle} · Publicando contenido optimizado para máximo alcance orgánico...
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
                  color: "var(--fg-subtle)",
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
                      background: post.status === "live" ? "rgba(16,185,129,0.07)" : "var(--surface)",
                      border: `1px solid ${post.status === "live" ? "rgba(16,185,129,0.20)" : "var(--surface)"}`,
                    }}
                  >
                    <Icon name={post.platform} size={13} style={{ color: post.color, flexShrink: 0 }} />
                    <span style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: post.status === "live" ? "#10B981" : "var(--fg-muted)",
                      minWidth: 36,
                    }}>
                      {post.time}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.72rem",
                      color: "var(--fg-secondary)",
                      flex: 1,
                    }}>
                      {post.label}
                    </span>
                    <span style={{
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 600,
                      color: post.status === "live" ? "#10B981" : "var(--fg-subtle)",
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
        background: "var(--surface)",
        border: "1px solid var(--border-subtle)",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        {[
          { value: "12.4K", label: "Alcance semanal", color: "var(--color-geko-purple-accent)" },
          { value: "+247%", label: "Engagement", color: "var(--color-geko-blue-light)" },
          { value: "×4.2", label: "ROAS medio", color: "#10B981" },
        ].map((m) => (
          <div key={m.label} style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: m.color, lineHeight: 1.1, marginBottom: 2 }}>
              {m.value}
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: "var(--fg-muted)" }}>
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
        background: "radial-gradient(circle, var(--color-geko-purple-a18) 0%, transparent 70%)",
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
        background: "radial-gradient(circle, var(--color-geko-blue-a15) 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
        zIndex: -1,
      }} />
    </div>
  )
}
