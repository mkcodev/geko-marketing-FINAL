"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Search, CalendarDays, Wand2, Send, TrendingUp } from "lucide-react"
import type { ProcesoStep } from "@/constants/services-detalle"

const EASE: [number,number,number,number] = [0.25, 0.46, 0.45, 0.94]

const STEP_META = [
  { Icon: Search,      color: "#9B4DBC", label: "Diagnóstico" },
  { Icon: CalendarDays, color: "#3B82F6", label: "Planificación" },
  { Icon: Wand2,       color: "#E1306C", label: "Creación" },
  { Icon: Send,        color: "#10B981", label: "Publicación" },
  { Icon: TrendingUp,  color: "#F59E0B", label: "Optimización" },
]

// ── Step mini visuals ─────────────────────────────────────────
function AuditVisual() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
      {[
        { label: "Alcance semanal", val: "1.240", pct: 28 },
        { label: "Engagement rate", val: "2.1 %", pct: 21 },
        { label: "Posts / semana", val: "2", pct: 12 },
      ].map((row) => (
        <div key={row.label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "rgba(255,255,255,0.38)" }}>{row.label}</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.60)" }}>{row.val}</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.07)" }}>
            <div style={{ height: "100%", width: `${row.pct}%`, borderRadius: 2, background: "rgba(155,77,188,0.55)" }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function CalendarVisual() {
  const days = ["L","M","X","J","V","S","D"]
  const posts: Record<number, string> = { 0: "#E1306C", 2: "#9B4DBC", 4: "#3B82F6", 6: "#F59E0B" }
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {days.map((d, i) => (
          <div key={d} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", color: "rgba(255,255,255,0.28)", marginBottom: 4 }}>{d}</div>
            <div style={{
              height: 22, borderRadius: 5,
              background: posts[i] ? `${posts[i]}22` : "rgba(255,255,255,0.04)",
              border: posts[i] ? `1px solid ${posts[i]}44` : "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {posts[i] && <div style={{ width: 6, height: 6, borderRadius: "50%", background: posts[i] }} />}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[["#E1306C","Reel"], ["#9B4DBC","Post"], ["#3B82F6","Story"], ["#F59E0B","Carrusel"]].map(([c,l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: c as string }} />
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", color: "rgba(255,255,255,0.30)" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContentVisual() {
  return (
    <div style={{ display: "flex", gap: 8, width: "100%" }}>
      {[["#E1306C","#9B4DBC"], ["#3B82F6","#10B981"], ["#F59E0B","#E1306C"]].map(([a,b], i) => (
        <div key={i} style={{
          flex: 1, borderRadius: 8, overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{
            height: 48,
            background: `linear-gradient(135deg, ${a}44, ${b}22)`,
          }} />
          <div style={{ padding: "6px 6px 4px", background: "rgba(8,8,16,0.7)" }}>
            <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", marginBottom: 3 }} />
            <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.04)", width: "70%" }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function PublishVisual() {
  const notes = [
    { emoji: "💬", text: "Nuevo comentario", time: "ahora" },
    { emoji: "❤️", text: "+124 me gusta", time: "2m" },
    { emoji: "👥", text: "+18 seguidores", time: "5m" },
  ]
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      {notes.map((n, i) => (
        <motion.div
          key={n.text}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + i * 0.3, duration: 0.4, ease: EASE }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "6px 10px", borderRadius: 8,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "rgba(255,255,255,0.55)" }}>
            <span>{n.emoji}</span>{n.text}
          </span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.62rem", color: "rgba(255,255,255,0.25)" }}>{n.time}</span>
        </motion.div>
      ))}
    </div>
  )
}

function AnalyticsVisual() {
  const bars = [22, 38, 31, 55, 48, 72, 65, 88, 78, 95]
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 52 }}>
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.6 + i * 0.06, duration: 0.5, ease: EASE }}
            style={{
              flex: 1, borderRadius: "3px 3px 0 0",
              background: i >= 6
                ? "linear-gradient(180deg, #9B4DBC, #3B82F6)"
                : "rgba(255,255,255,0.08)",
            }}
          />
        ))}
      </div>
      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginTop: 1 }} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", color: "rgba(255,255,255,0.22)" }}>Ene</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", color: "rgba(255,255,255,0.22)" }}>Mar</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", color: "#9B4DBC" }}>Hoy ↑</span>
      </div>
    </div>
  )
}

const VISUALS = [AuditVisual, CalendarVisual, ContentVisual, PublishVisual, AnalyticsVisual]

// ── Main component ─────────────────────────────────────────────
export function RedesProceso({ proceso }: { proceso: ProcesoStep[] }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [active, setActive] = useState(0)

  return (
    <section ref={ref} style={{ paddingTop: 80, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 56 }}
        >
          <span style={{
            display: "inline-block", padding: "4px 14px", borderRadius: 9999,
            border: "1px solid rgba(107,45,124,0.35)", background: "rgba(107,45,124,0.10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#9B4DBC", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 14,
          }}>Cómo trabajamos</span>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.96)",
          }}>
            El proceso, paso a paso
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          {/* Left: step selector */}
          <div style={{
            flexShrink: 0,
            display: "flex", flexDirection: "column", alignItems: "center",
            position: "relative",
            paddingTop: 4,
          }}>
            {/* Vertical track */}
            <div style={{
              position: "absolute",
              top: 28, bottom: 28, left: "50%", transform: "translateX(-50%)",
              width: 2,
              background: "rgba(255,255,255,0.06)",
            }} />
            {/* Animated fill */}
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: `${(active / (proceso.length - 1)) * 100}%` } : { height: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                position: "absolute",
                top: 28, left: "50%", transform: "translateX(-50%)",
                width: 2,
                background: "linear-gradient(180deg, #6B2D7C, #3B82F6)",
                transformOrigin: "top",
                zIndex: 1,
              }}
            />

            {proceso.map((step, i) => {
              const meta = STEP_META[i]
              const isActive = i === active
              const isPast = i < active
              return (
                <motion.button
                  key={step.num}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.4, ease: EASE }}
                  onClick={() => setActive(i)}
                  style={{
                    position: "relative", zIndex: 2,
                    width: 52, height: 52, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    marginBottom: i < proceso.length - 1 ? 40 : 0,
                    cursor: "pointer",
                    background: isActive
                      ? `linear-gradient(135deg, ${meta.color}, #1D4ED8)`
                      : isPast
                      ? "rgba(107,45,124,0.15)"
                      : "rgba(255,255,255,0.04)",
                    border: isActive
                      ? `2px solid ${meta.color}80`
                      : isPast
                      ? "2px solid rgba(107,45,124,0.30)"
                      : "1px solid rgba(255,255,255,0.10)",
                    boxShadow: isActive ? `0 0 24px ${meta.color}50, 0 0 8px ${meta.color}30` : "none",
                    transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
                    outline: "none",
                  }}
                >
                  {isPast ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke={meta.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span style={{
                      fontFamily: "var(--font-heading)", fontSize: "0.75rem",
                      fontWeight: 700,
                      color: isActive ? "#fff" : "rgba(255,255,255,0.35)",
                    }}>{step.num}</span>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Right: content + visual */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${STEP_META[active].color}30`,
                  overflow: "hidden",
                  boxShadow: `0 0 40px ${STEP_META[active].color}0A`,
                }}
              >
                {/* Card top bar */}
                <div style={{
                  height: 3,
                  background: `linear-gradient(90deg, ${STEP_META[active].color}, #1D4ED8)`,
                }} />

                <div style={{ padding: "28px 32px 32px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24 }}>
                    {/* Icon */}
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: `${STEP_META[active].color}18`,
                      border: `1px solid ${STEP_META[active].color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {(() => { const I = STEP_META[active].Icon; return <I size={22} style={{ color: STEP_META[active].color }} /> })()}
                    </div>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <span style={{
                          fontFamily: "var(--font-heading)", fontSize: "0.7rem",
                          fontWeight: 700, letterSpacing: "0.08em",
                          color: STEP_META[active].color,
                        }}>PASO {proceso[active].num}</span>
                        <span style={{
                          padding: "2px 8px", borderRadius: 4,
                          background: `${STEP_META[active].color}15`,
                          border: `1px solid ${STEP_META[active].color}25`,
                          fontFamily: "var(--font-ui)", fontSize: "0.65rem",
                          color: `${STEP_META[active].color}CC`,
                        }}>{STEP_META[active].label}</span>
                      </div>
                      <h3 style={{
                        fontFamily: "var(--font-heading)", fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                        fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em",
                        color: "rgba(255,255,255,0.95)",
                      }}>{proceso[active].title}</h3>
                    </div>
                  </div>

                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: "1rem",
                    color: "rgba(255,255,255,0.55)", lineHeight: 1.75,
                    marginBottom: 28,
                    maxWidth: 520,
                  }}>{proceso[active].description}</p>

                  {/* Visual */}
                  <div style={{
                    borderRadius: 14, padding: "20px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-ui)", fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.28)", marginBottom: 14,
                      letterSpacing: "0.05em", textTransform: "uppercase",
                    }}>Vista previa</div>
                    {(() => { const V = VISUALS[active]; return <V /> })()}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Step dots navigation at bottom */}
            <div style={{ display: "flex", gap: 8, marginTop: 20, paddingLeft: 4 }}>
              {proceso.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                    background: i === active ? STEP_META[active].color : "rgba(255,255,255,0.12)",
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
