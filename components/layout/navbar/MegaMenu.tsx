"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useT } from "@/hooks/use-translations"
import { SERVICES } from "@/constants/services"
import { Icon } from "@/lib/icons"

export function MegaMenu({ open, onClose, pathname }: {
  open: boolean; onClose: () => void; pathname: string
}) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const t = useT()
  const MEGA_STATS = t.nav.megaMenu.stats
  const MEGA_TAGS = t.nav.megaMenu.tags

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          onMouseLeave={onClose}
          style={{
            position: "absolute",
            top: "100%",
            left: 0, right: 0,
            zIndex: 300,
            borderTop: "1px solid var(--color-geko-purple-a20)",
            borderBottom: "1px solid var(--border-subtle)",
            background: "var(--glass-bg-strong)",
            backdropFilter: "blur(24px) saturate(180%)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.30), 0 0 80px var(--glow-brand-sm)",
          }}
        >
          <div style={{
            maxWidth: 1400,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1px 380px",
            minHeight: 240,
          }}>
            {/* ── Left: proof panel ── */}
            <div style={{
              padding: "32px 36px 32px 28px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              <div aria-hidden style={{
                position: "absolute", top: "-30%", left: "-5%",
                width: "55%", height: "100%",
                background: "radial-gradient(ellipse, var(--color-geko-purple-a10) 0%, transparent 70%)",
                filter: "blur(50px)", pointerEvents: "none",
              }} />

              <div style={{ position: "relative", zIndex: 1, marginBottom: 24 }}>
                <p style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.68rem", fontWeight: 600,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--color-geko-purple-accent-a75)", marginBottom: 8,
                }}>
                  {t.nav.megaMenu.whyGeko}
                </p>
                <p style={{
                  fontFamily: "var(--font-heading)", fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
                  fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2,
                  color: "var(--fg)",
                }}>
                  {t.nav.megaMenu.headline}<br />
                  <span style={{
                    background: "var(--gradient-brand-text)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>{t.nav.megaMenu.headlineAccent}</span>
                </p>
              </div>

              <div style={{
                position: "relative", zIndex: 1,
                display: "flex", gap: 12, marginBottom: 20,
              }}>
                {MEGA_STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 + 0.06, duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      flex: 1,
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: "var(--surface)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <p style={{
                      fontFamily: "var(--font-heading)", fontSize: "1.375rem",
                      fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1,
                      background: "linear-gradient(135deg, var(--color-geko-purple-accent), var(--color-geko-blue-light))",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      backgroundClip: "text", marginBottom: 4,
                    }}>
                      {stat.value}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-ui)", fontSize: "0.78rem",
                      fontWeight: 600, color: "var(--fg-secondary)", marginBottom: 2,
                    }}>
                      {stat.label}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-ui)", fontSize: "0.69rem",
                      color: "var(--fg-subtle)", lineHeight: 1.3,
                    }}>
                      {stat.sub}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 6, flexWrap: "wrap" }}>
                {MEGA_TAGS.map((tag) => (
                  <span key={tag} style={{
                    padding: "4px 10px", borderRadius: 6,
                    background: "var(--color-geko-purple-a10)",
                    border: "1px solid var(--color-geko-purple-a22)",
                    fontFamily: "var(--font-ui)", fontSize: "0.69rem",
                    fontWeight: 500, color: "var(--color-geko-purple-accent-a80)",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Divider ── */}
            <div style={{ background: "var(--border-subtle)", margin: "28px 0" }} />

            {/* ── Right: service cards ── */}
            <div style={{
              padding: "28px 24px 28px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              justifyContent: "center",
            }}>
              {SERVICES.map((service, i) => {
                const isActive = pathname.startsWith(service.href)
                const isHovered = hoveredSlug === service.slug
                return (
                  <Link key={service.slug} href={service.href} style={{ textDecoration: "none" }}>
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.04, duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
                      onMouseEnter={() => setHoveredSlug(service.slug)}
                      onMouseLeave={() => setHoveredSlug(null)}
                      style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "13px 16px", borderRadius: 12,
                        background: isActive || isHovered ? `${service.color}0E` : "transparent",
                        border: isActive || isHovered
                          ? `1px solid ${service.color}28`
                          : "1px solid transparent",
                        transition: "background 0.2s ease, border-color 0.2s ease",
                      }}
                    >
                      <div style={{
                        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                        background: isHovered || isActive ? `${service.color}18` : "var(--surface)",
                        border: `1px solid ${isHovered || isActive ? service.color + "30" : "var(--border)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.2s, border-color 0.2s",
                      }}>
                        <Icon
                          name={service.icon} size={18}
                          color={isHovered || isActive ? service.color : "var(--fg-muted)"}
                          strokeWidth={1.75}
                          style={{ transition: "color 0.2s" }}
                        />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontFamily: "var(--font-ui)", fontSize: "0.9rem", fontWeight: 600,
                          color: isHovered || isActive ? "var(--fg)" : "var(--fg-secondary)",
                          marginBottom: 2, transition: "color 0.2s",
                        }}>{service.name}</p>
                        <p style={{
                          fontFamily: "var(--font-body)", fontSize: "0.75rem",
                          color: "var(--fg-subtle)", lineHeight: 1.35,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>{service.tagline}</p>
                      </div>

                      <motion.div
                        animate={{ x: isHovered ? 3 : 0, opacity: isHovered ? 1 : 0.25 }}
                        transition={{ duration: 0.18 }}
                        style={{ flexShrink: 0, color: service.color }}
                      >
                        <ArrowRight size={15} strokeWidth={2} />
                      </motion.div>
                    </motion.div>
                  </Link>
                )
              })}

              <div style={{ marginTop: 6, paddingTop: 14, borderTop: "1px solid var(--border-subtle)" }}>
                <Link
                  href="/servicios"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "9px 16px", borderRadius: 9,
                    background: "var(--color-geko-purple-a08)",
                    border: "1px solid var(--color-geko-purple-a20)",
                    textDecoration: "none",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-ui)", fontSize: "0.8rem",
                    fontWeight: 500, color: "var(--color-geko-purple-accent)",
                  }}>{t.nav.megaMenu.viewAll}</span>
                  <ArrowRight size={13} color="var(--color-geko-purple-accent)" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
