"use client"
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const Player = dynamic(
  () => import("@remotion/player").then((m) => ({ default: m.Player })),
  {
    ssr: false,
    loading: () => (
      <div style={{ aspectRatio: "16/9", background: "rgba(255,255,255,0.04)", borderRadius: 12, animation: "pulse 2s ease-in-out infinite" }} />
    ),
  }
)
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion"

// ─────────────────────────────────────────────────────────────
// CARD A — Instagram Post Animator
// ─────────────────────────────────────────────────────────────

function InstagramPostComposition() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const profileOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" })
  const profileScale = spring({ fps, frame, from: 0.82, to: 1, delay: 0, config: { damping: 18 } })

  const postY = interpolate(frame, [22, 52], [36, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  const postOpacity = interpolate(frame, [22, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })

  const captionOpacity = interpolate(frame, [58, 82], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })

  const likes = Math.round(interpolate(frame, [88, 138], [0, 2400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
  const comments = Math.round(interpolate(frame, [94, 138], [0, 183], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
  const shares = Math.round(interpolate(frame, [100, 138], [0, 441], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))

  const ctaOpacity = interpolate(frame, [142, 162], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  const ctaScale = spring({ fps, frame, from: 0.88, to: 1, delay: 142, config: { damping: 13 } })
  const heartPulse = spring({ fps, frame, from: 1, to: 1.45, delay: 110, config: { damping: 7, stiffness: 420 } })

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(180deg, #080810 0%, #120628 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 268, fontFamily: "-apple-system, sans-serif" }}>
        {/* Profile row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 11,
          opacity: profileOpacity,
          transform: `scale(${profileScale})`, transformOrigin: "left center",
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "linear-gradient(135deg, #6B2D7C, #1D4ED8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, flexShrink: 0,
            boxShadow: "0 0 0 2px rgba(107,45,124,0.45), 0 0 0 4px rgba(107,45,124,0.15)",
          }}>🦎</div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#fff", fontSize: 12, fontWeight: 700, margin: 0, letterSpacing: -0.2 }}>geko.marketing</p>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 9.5, margin: 0 }}>Madrid · Patrocinado</p>
          </div>
          <div style={{
            padding: "4px 10px", borderRadius: 20, flexShrink: 0,
            background: "rgba(59,130,246,0.14)", border: "1px solid rgba(59,130,246,0.28)",
            color: "#60A5FA", fontSize: 9.5, fontWeight: 700,
          }}>Seguir</div>
        </div>

        {/* Post image */}
        <div style={{
          borderRadius: 14, overflow: "hidden", marginBottom: 10,
          transform: `translateY(${postY}px)`, opacity: postOpacity,
          height: 168,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          position: "relative",
          background: "linear-gradient(135deg, rgba(107,45,124,0.9) 0%, rgba(29,78,216,0.9) 100%)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.10) 0%, transparent 55%)",
          }} />
          <p style={{ fontSize: 30, margin: "0 0 6px" }}>🦎</p>
          <p style={{ color: "#fff", fontSize: 21, fontWeight: 900, letterSpacing: -1, margin: "0 0 4px", position: "relative" }}>
            +247% Engagement
          </p>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, margin: 0, position: "relative" }}>
            en 90 días · Geko Marketing
          </p>
        </div>

        {/* Engagement */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 7 }}>
          <span style={{ color: "#fff", fontSize: 11.5, display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{
              display: "inline-block",
              transform: `scale(${frame >= 88 && frame <= 126 ? heartPulse : 1})`,
            }}>❤️</span>
            {likes >= 1000 ? `${(likes / 1000).toFixed(1)}K` : likes}
          </span>
          <span style={{ color: "#fff", fontSize: 11.5 }}>💬 {comments}</span>
          <span style={{ color: "#fff", fontSize: 11.5 }}>↗ {shares}</span>
          <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.3)", fontSize: 11.5 }}>🔖</span>
        </div>

        {/* Caption */}
        <div style={{ opacity: captionOpacity }}>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 10.5, lineHeight: 1.55, margin: "0 0 4px" }}>
            <span style={{ color: "#fff", fontWeight: 700 }}>geko.marketing</span>{" "}
            ¿Quieres resultados así? Convertimos seguidores en clientes reales. 🦎✨{" "}
            <span style={{ color: "#60A5FA" }}>#MarketingDigital</span>
          </p>
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 9.5, margin: 0 }}>
            Ver los {comments} comentarios
          </p>
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 12, padding: "10px 16px", borderRadius: 10, textAlign: "center",
          background: "linear-gradient(135deg, #6B2D7C, #1D4ED8)",
          opacity: ctaOpacity, transform: `scale(${ctaScale})`,
          color: "#fff", fontSize: 11, fontWeight: 700,
          boxShadow: "0 4px 18px rgba(107,45,124,0.55)",
        }}>
          Consulta gratuita →
        </div>
      </div>
    </AbsoluteFill>
  )
}

export function InstagramReelCard() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 420 }}>
      {/* Player full-bleed */}
      {mounted ? (
        <Player
          component={InstagramPostComposition}
          durationInFrames={210}
          fps={30}
          compositionWidth={320}
          compositionHeight={460}
          style={{ width: "100%", height: "100%", display: "block" }}
          autoPlay
          loop
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.02)" }} />
      )}

      {/* Pill top-left */}
      <div style={{ position: "absolute", top: 16, left: 16, zIndex: 10, pointerEvents: "none" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 12px", borderRadius: 999,
          background: "rgba(8,8,16,0.72)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(236,72,153,0.30)",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#EC4899", boxShadow: "0 0 5px #EC4899" }} />
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Content Creation
          </p>
        </div>
      </div>

      {/* Gradient footer label */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: "48px 20px 20px",
        background: "linear-gradient(to top, rgba(8,8,16,0.95) 0%, rgba(8,8,16,0.60) 60%, transparent 100%)",
        pointerEvents: "none",
      }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", margin: "0 0 3px" }}>
          Post en tiempo real
        </h3>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "rgba(255,255,255,0.40)", margin: 0 }}>
          Así se construye tu contenido branded
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CARD B — Campaign ROAS Dashboard
// ─────────────────────────────────────────────────────────────

const METRICS = [
  { label: "ROAS",  value: "×4.2",  fill: 0.84, color: "#10B981" },
  { label: "CTR",   value: "3.8%",  fill: 0.76, color: "#3B82F6" },
  { label: "CPL",   value: "€2.80", fill: 0.92, color: "#8B5CF6" },
  { label: "Conv.", value: "12.4%", fill: 0.62, color: "#F59E0B" },
]

function CampaignMetricsComposition() {
  const frame = useCurrentFrame()
  useVideoConfig()

  const headerY = interpolate(frame, [0, 24], [14, 0], { extrapolateRight: "clamp" })
  const headerOpacity = interpolate(frame, [0, 24], [0, 1], { extrapolateRight: "clamp" })
  const budget = Math.round(interpolate(frame, [18, 68], [0, 1200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
  const revenue = Math.round(interpolate(frame, [18, 68], [0, 5040], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
  const statsOpacity = interpolate(frame, [14, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  const footerOpacity = interpolate(frame, [118, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })

  return (
    <AbsoluteFill style={{
      background: "#080810",
      padding: "26px 22px 20px",
      fontFamily: "-apple-system, sans-serif",
    }}>
      {/* Header */}
      <div style={{ opacity: headerOpacity, transform: `translateY(${headerY}px)`, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 9.5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px" }}>
              Meta Ads + Google Ads
            </p>
            <p style={{ color: "#fff", fontSize: 15.5, fontWeight: 800, margin: 0, letterSpacing: -0.6 }}>
              Resultados del mes
            </p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "4px 10px", borderRadius: 6,
            background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.28)",
            color: "#10B981", fontSize: 9.5, fontWeight: 700,
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: "50%", background: "#10B981",
              boxShadow: "0 0 4px #10B981",
            }} />
            LIVE
          </div>
        </div>
      </div>

      {/* Budget cards */}
      <div style={{ display: "flex", gap: 10, marginBottom: 18, opacity: statsOpacity }}>
        {[
          { label: "Inversión", value: `€${budget.toLocaleString()}`, accent: false },
          { label: "Ingresos", value: `€${revenue.toLocaleString()}`, accent: true },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, padding: "11px 13px", borderRadius: 10,
            background: s.accent ? "rgba(16,185,129,0.07)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${s.accent ? "rgba(16,185,129,0.22)" : "rgba(255,255,255,0.07)"}`,
          }}>
            <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 8.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, margin: "0 0 4px" }}>{s.label}</p>
            <p style={{ color: s.accent ? "#10B981" : "#fff", fontSize: 19, fontWeight: 900, margin: 0, letterSpacing: -1 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Metric bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {METRICS.map((m, i) => {
          const delay = 38 + i * 18
          const barW = interpolate(frame, [delay, delay + 40], [0, m.fill * 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
          const mOpacity = interpolate(frame, [delay - 6, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })

          return (
            <div key={m.label} style={{ opacity: mOpacity }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <p style={{ color: "rgba(255,255,255,0.50)", fontSize: 10, fontWeight: 600, margin: 0 }}>{m.label}</p>
                <p style={{ color: m.color, fontSize: 11, fontWeight: 800, margin: 0 }}>{m.value}</p>
              </div>
              <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.055)", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 999,
                  width: `${barW}%`,
                  background: `linear-gradient(90deg, ${m.color}bb, ${m.color})`,
                  boxShadow: `0 0 10px ${m.color}66`,
                }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 16, opacity: footerOpacity,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.055)",
      }}>
        <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 9, margin: 0 }}>Powered by Geko Marketing</p>
        <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 9, margin: 0 }}>Actualizado hace 2 min</p>
      </div>
    </AbsoluteFill>
  )
}

export function CampaignResultsCard() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 420 }}>
      {mounted ? (
        <Player
          component={CampaignMetricsComposition}
          durationInFrames={185}
          fps={30}
          compositionWidth={440}
          compositionHeight={400}
          style={{ width: "100%", height: "100%", display: "block" }}
          autoPlay
          loop
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.02)" }} />
      )}

      {/* Pill top-left */}
      <div style={{ position: "absolute", top: 16, left: 16, zIndex: 10, pointerEvents: "none" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 12px", borderRadius: 999,
          background: "rgba(8,8,16,0.72)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(16,185,129,0.30)",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 5px #10B981" }} />
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Paid Media
          </p>
        </div>
      </div>

      {/* Footer label */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: "48px 20px 20px",
        background: "linear-gradient(to top, rgba(8,8,16,0.95) 0%, rgba(8,8,16,0.60) 60%, transparent 100%)",
        pointerEvents: "none",
      }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", margin: "0 0 3px" }}>
          Dashboard de campaña
        </h3>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "rgba(255,255,255,0.40)", margin: 0 }}>
          Métricas reales en tiempo real
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CARD C — Lead Conversion Funnel
// ─────────────────────────────────────────────────────────────

const FUNNEL_STAGES = [
  { label: "Impresiones", raw: 100000, icon: "👁️", width: 1.00, color: "#6B2D7C" },
  { label: "Clics al enlace", raw: 28000, icon: "🖱️", width: 0.62, color: "#3B82F6" },
  { label: "Leads captados", raw: 8400, icon: "📋", width: 0.38, color: "#8B5CF6" },
  { label: "Clientes nuevos", raw: 3200, icon: "🎯", width: 0.22, color: "#10B981" },
]

function FunnelComposition() {
  const frame = useCurrentFrame()

  const headerOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" })
  const footerOpacity = interpolate(frame, [120, 142], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })

  return (
    <AbsoluteFill style={{
      background: "#080810",
      padding: "22px 22px 18px",
      fontFamily: "-apple-system, sans-serif",
    }}>
      <div style={{ opacity: headerOpacity, marginBottom: 16 }}>
        <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 9.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 4px" }}>
          Embudo de conversión · 30 días
        </p>
        <p style={{ color: "#fff", fontSize: 15, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
          De impresión a cliente
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {FUNNEL_STAGES.map((stage, i) => {
          const delay = 16 + i * 24
          const stageOp = interpolate(frame, [delay, delay + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
          const barW = interpolate(frame, [delay, delay + 36], [0, stage.width * 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
          const num = Math.round(interpolate(frame, [delay + 4, delay + 40], [0, stage.raw], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
          const displayNum = num >= 1000 ? `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}K` : num.toLocaleString()
          const convPct = i === 0 ? "100%" : `${((stage.raw / FUNNEL_STAGES[0].raw) * 100).toFixed(1)}%`

          return (
            <div key={stage.label} style={{ opacity: stageOp }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 13 }}>{stage.icon}</span>
                <p style={{ color: "rgba(255,255,255,0.50)", fontSize: 10, fontWeight: 600, margin: 0, flex: 1 }}>{stage.label}</p>
                <p style={{ color: stage.color, fontSize: 12, fontWeight: 800, margin: 0 }}>{displayNum}</p>
                <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 9.5, margin: 0, minWidth: 36, textAlign: "right" }}>{convPct}</p>
              </div>
              {/* Bar track */}
              <div style={{ height: 7, borderRadius: 999, background: "rgba(255,255,255,0.055)", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 999,
                  width: `${barW}%`,
                  background: `linear-gradient(90deg, ${stage.color}aa, ${stage.color})`,
                  boxShadow: `0 0 10px ${stage.color}55`,
                }} />
              </div>

              {/* Drop-off arrow between stages */}
              {i < FUNNEL_STAGES.length - 1 && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 5,
                  margin: "4px 0 1px 22px",
                  opacity: interpolate(frame, [delay + 36, delay + 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                }}>
                  <div style={{ width: 1, height: 10, background: "rgba(255,255,255,0.10)" }} />
                  <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 8.5, margin: 0 }}>
                    ↓ {(100 - (FUNNEL_STAGES[i + 1].raw / stage.raw) * 100).toFixed(0)}% abandono
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* CRO badge */}
      <div style={{
        marginTop: 14, opacity: footerOpacity,
        display: "flex", gap: 8,
      }}>
        {[
          { label: "Tasa final", value: "3.2%", color: "#10B981" },
          { label: "Coste por lead", value: "€8.40", color: "#8B5CF6" },
          { label: "Coste cliente", value: "€22.50", color: "#3B82F6" },
        ].map(b => (
          <div key={b.label} style={{
            flex: 1, padding: "8px 10px", borderRadius: 8,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            textAlign: "center",
          }}>
            <p style={{ color: b.color, fontSize: 12, fontWeight: 800, margin: "0 0 2px", letterSpacing: -0.3 }}>{b.value}</p>
            <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 8, margin: 0 }}>{b.label}</p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}

export function AudienceFunnelCard() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 400 }}>
      {mounted ? (
        <Player
          component={FunnelComposition}
          durationInFrames={165}
          fps={30}
          compositionWidth={420}
          compositionHeight={400}
          style={{ width: "100%", height: "100%", display: "block" }}
          autoPlay
          loop
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.02)" }} />
      )}

      {/* Pill top-left */}
      <div style={{ position: "absolute", top: 16, left: 16, zIndex: 10, pointerEvents: "none" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 12px", borderRadius: 999,
          background: "rgba(8,8,16,0.72)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(139,92,246,0.30)",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8B5CF6", boxShadow: "0 0 5px #8B5CF6" }} />
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Conversión
          </p>
        </div>
      </div>

      {/* Footer label */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: "48px 20px 20px",
        background: "linear-gradient(to top, rgba(8,8,16,0.95) 0%, rgba(8,8,16,0.60) 60%, transparent 100%)",
        pointerEvents: "none",
      }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", margin: "0 0 3px" }}>
          Embudo de audiencia
        </h3>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "rgba(255,255,255,0.40)", margin: 0 }}>
          Del scroll al contrato firmado
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CARD D — Content Calendar
// ─────────────────────────────────────────────────────────────

const DAYS = ["L", "M", "X", "J", "V", "S", "D"]
const DATES = [14, 15, 16, 17, 18, 19, 20]

type PlatformKey = "IG" | "TK" | "LI" | "FB" | "✉"
const PLATFORM_CONFIG: Record<PlatformKey, { color: string }> = {
  IG: { color: "#E1306C" },
  TK: { color: "#69C9D0" },
  LI: { color: "#0A66C2" },
  FB: { color: "#1877F2" },
  "✉": { color: "#F59E0B" },
}

const POSTS: Array<{ day: number; platform: PlatformKey; time: string; done: boolean }> = [
  { day: 0, platform: "IG", time: "09:00", done: true },
  { day: 0, platform: "LI", time: "14:00", done: true },
  { day: 1, platform: "TK", time: "18:00", done: true },
  { day: 1, platform: "✉", time: "08:30", done: true },
  { day: 2, platform: "IG", time: "12:00", done: true },
  { day: 2, platform: "FB", time: "11:00", done: false },
  { day: 3, platform: "TK", time: "19:00", done: false },
  { day: 3, platform: "LI", time: "12:00", done: false },
  { day: 4, platform: "IG", time: "09:00", done: false },
  { day: 4, platform: "✉", time: "17:00", done: false },
  { day: 5, platform: "IG", time: "11:00", done: false },
  { day: 6, platform: "TK", time: "15:00", done: false },
]

function ContentCalendarComposition() {
  const frame = useCurrentFrame()

  const headerOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" })
  const footerOpacity = interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })

  return (
    <AbsoluteFill style={{
      background: "#080810",
      padding: "20px 18px 16px",
      fontFamily: "-apple-system, sans-serif",
    }}>
      {/* Header */}
      <div style={{ opacity: headerOpacity, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 9.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 3px" }}>Semana 15 · Abril 2025</p>
          <p style={{ color: "#fff", fontSize: 14.5, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>Calendario de contenido</p>
        </div>
        <div style={{ display: "flex", gap: 3, flexWrap: "wrap", maxWidth: 110, justifyContent: "flex-end" }}>
          {(Object.keys(PLATFORM_CONFIG) as PlatformKey[]).map(p => (
            <div key={p} style={{
              width: 20, height: 20, borderRadius: 5, fontSize: 8, fontWeight: 800,
              background: `${PLATFORM_CONFIG[p].color}22`,
              border: `1px solid ${PLATFORM_CONFIG[p].color}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: PLATFORM_CONFIG[p].color,
            }}>{p}</div>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
        {/* Day headers */}
        {DAYS.map((d, i) => (
          <div key={d} style={{
            textAlign: "center", paddingBottom: 6,
            color: i >= 5 ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.45)",
            fontSize: 10, fontWeight: 700,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>{d}</div>
        ))}

        {/* Day cells */}
        {DAYS.map((_, dayIdx) => {
          const dayPosts = POSTS.filter(p => p.day === dayIdx)
          const isToday = dayIdx === 2
          return (
            <div key={dayIdx} style={{
              minHeight: 80, borderRadius: 8, padding: "5px 4px",
              background: isToday ? "rgba(107,45,124,0.10)" : "rgba(255,255,255,0.025)",
              border: `1px solid ${isToday ? "rgba(107,45,124,0.32)" : "rgba(255,255,255,0.055)"}`,
              display: "flex", flexDirection: "column", gap: 3,
            }}>
              <p style={{
                fontSize: 9.5, fontWeight: 700, margin: "0 0 2px",
                color: isToday ? "#A855F7" : "rgba(255,255,255,0.28)",
              }}>{DATES[dayIdx]}</p>

              {dayPosts.map((post, postIdx) => {
                const postDelay = 16 + dayIdx * 11 + postIdx * 7
                const pOp = interpolate(frame, [postDelay, postDelay + 13], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
                const pY = interpolate(frame, [postDelay, postDelay + 13], [5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
                const cfg = PLATFORM_CONFIG[post.platform]

                return (
                  <div key={postIdx} style={{
                    opacity: pOp, transform: `translateY(${pY}px)`,
                    padding: "2px 4px", borderRadius: 4,
                    background: `${cfg.color}18`, border: `1px solid ${cfg.color}35`,
                    display: "flex", alignItems: "center", gap: 3,
                  }}>
                    <span style={{ fontSize: 7.5, fontWeight: 800, color: cfg.color }}>{post.platform}</span>
                    <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 7, flex: 1 }}>{post.time}</span>
                    {post.done && (
                      <span style={{ fontSize: 7.5, color: "#10B981" }}>✓</span>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Footer stats */}
      <div style={{
        marginTop: 10, display: "flex", gap: 7,
        opacity: footerOpacity,
      }}>
        {[
          { label: "Posts semana", value: "12" },
          { label: "Plataformas", value: "5" },
          { label: "Alcance est.", value: "48K" },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, padding: "6px 8px", borderRadius: 7,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.055)",
            textAlign: "center",
          }}>
            <p style={{ color: "#fff", fontSize: 12, fontWeight: 800, margin: "0 0 1px", letterSpacing: -0.3 }}>{s.value}</p>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 7.5, margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}

export function ContentCalendarCard() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 400 }}>
      {mounted ? (
        <Player
          component={ContentCalendarComposition}
          durationInFrames={185}
          fps={30}
          compositionWidth={500}
          compositionHeight={400}
          style={{ width: "100%", height: "100%", display: "block" }}
          autoPlay
          loop
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.02)" }} />
      )}

      {/* Pill top-left */}
      <div style={{ position: "absolute", top: 16, left: 16, zIndex: 10, pointerEvents: "none" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 12px", borderRadius: 999,
          background: "rgba(8,8,16,0.72)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(245,158,11,0.30)",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", boxShadow: "0 0 5px #F59E0B" }} />
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Programación
          </p>
        </div>
      </div>

      {/* Footer label */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: "48px 20px 20px",
        background: "linear-gradient(to top, rgba(8,8,16,0.95) 0%, rgba(8,8,16,0.60) 60%, transparent 100%)",
        pointerEvents: "none",
      }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", margin: "0 0 3px" }}>
          Calendario semanal
        </h3>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "rgba(255,255,255,0.40)", margin: 0 }}>
          Publicaciones coordinadas en 5 canales
        </p>
      </div>
    </div>
  )
}
