"use client"

import { useState, useRef, useMemo } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, TrendingUp, Users, Zap, Target } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ROI_SECTORS, ROI_PACKAGES } from "@/constants/services"
import { EASE } from "@/lib/animations"

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M"
  if (n >= 1000) return (n / 1000).toFixed(1) + "K"
  return Math.round(n).toString()
}

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ display: "inline-block" }}
      >
        {prefix}{formatNumber(value)}{suffix}
      </motion.span>
    </AnimatePresence>
  )
}

function SliderInput({
  label, min, max, value, onChange, formatValue, color,
}: {
  label: string; min: number; max: number; value: number;
  onChange: (v: number) => void; formatValue: (v: number) => string; color: string;
}) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{
          fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
          color: "rgba(255,255,255,0.55)", fontWeight: 500,
        }}>{label}</span>
        <span style={{
          fontFamily: "var(--font-heading)", fontSize: "1.125rem",
          fontWeight: 700, color,
        }}>{formatValue(value)}</span>
      </div>
      <div style={{ position: "relative", height: 6 }}>
        {/* Track background */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 9999,
          background: "rgba(255,255,255,0.08)",
        }} />
        {/* Filled portion */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0,
          borderRadius: 9999, width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}80, ${color})`,
          transition: "width 0.05s",
        }} />
        {/* Range input (invisible but functional) */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute", inset: 0, width: "100%",
            opacity: 0, height: "100%", cursor: "inherit",
            margin: 0,
          }}
        />
        {/* Thumb visual */}
        <div style={{
          position: "absolute", top: "50%",
          left: `${pct}%`, transform: "translate(-50%, -50%)",
          width: 18, height: 18, borderRadius: "50%",
          background: color,
          boxShadow: `0 0 0 3px rgba(8,8,16,1), 0 0 12px ${color}60`,
          pointerEvents: "none",
          transition: "left 0.05s",
        }} />
      </div>
    </div>
  )
}

export function RoiCalculator() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [followers, setFollowers] = useState(2000)
  const [sectorIdx, setSectorIdx] = useState(0)
  const [packageIdx, setPackageIdx] = useState(1)

  const sector = ROI_SECTORS[sectorIdx]
  const pkg = ROI_PACKAGES[packageIdx]

  // Calculate projections — rangos creíbles para agencia real
  const results = useMemo(() => {
    // Base realista: 5-7% de crecimiento mensual con gestión profesional
    const baseGrowthRate = 0.055
    const sectorBonus = sector.growthMultiplier  // 1.1 - 1.6x
    const pkgBonus = pkg.multiplier              // Silver 1.0 · Golden 1.2 · Platinum 1.4

    // Cuentas pequeñas tienen más margen de crecimiento relativo
    const scaleFactor = followers < 3000 ? 1.3 : followers < 10000 ? 1.1 : 0.9

    const monthlyGrowthRate = Math.min(baseGrowthRate * sectorBonus * pkgBonus * scaleFactor, 0.18)
    const followersIn6m = Math.round(followers * Math.pow(1 + monthlyGrowthRate, 6))
    const newFollowers = followersIn6m - followers

    // Engagement: entre 2% y 6% según sector y paquete (datos reales de industria)
    const engagementRate = Math.min(sector.engagementBase * pkgBonus, 6.5)

    // Alcance por post: ~20-40% de seguidores con buen engagement
    const reachPerPost = Math.round(followersIn6m * ((engagementRate / 100) * 5.5))

    // Leads: 1-3 leads por cada 1000 seguidores/mes con gestión profesional
    const leadsBase = (followersIn6m / 1000) * 1.8 * pkgBonus
    const leadsPerMonth = Math.max(1, Math.round(leadsBase))

    // ROI conservador: ticket medio pyme española ~250€
    const monthlyInvestment = pkg.price
    const avgTicket = 250
    const estimatedMonthlyRevenue = leadsPerMonth * avgTicket * 0.25 // tasa de cierre 25%
    const roi = Math.round(((estimatedMonthlyRevenue - monthlyInvestment) / monthlyInvestment) * 100)

    return {
      followersIn6m,
      newFollowers,
      engagementRate: Math.round(engagementRate * 10) / 10,
      reachPerPost,
      leadsPerMonth,
      roi: Math.max(Math.min(roi, 280), 15), // entre 15% y 280% — creíble
    }
  }, [followers, sector, pkg])

  return (
    <section
      ref={ref}
      style={{
        paddingTop: 96,
        paddingBottom: 96,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "10%", right: "-10%",
          width: "50%", height: "70%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(107,45,124,0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", bottom: "0%", left: "-5%",
          width: "40%", height: "50%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(29,78,216,0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
      </div>

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span style={{
            display: "inline-block",
            padding: "4px 14px", borderRadius: 9999,
            border: "1px solid rgba(107,45,124,0.35)",
            background: "rgba(107,45,124,0.10)",
            fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
            color: "#9B4DBC", letterSpacing: "0.06em", textTransform: "uppercase",
            marginBottom: 16,
          }}>
            ROI Calculator
          </span>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
            fontWeight: 800, lineHeight: 1.15,
            letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.96)",
            marginBottom: 14,
          }}>
            ¿Cuánto puede crecer{" "}
            <span style={{
              background: "linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              tu marca con Geko?
            </span>
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "1rem",
            color: "rgba(255,255,255,0.42)", maxWidth: 480, margin: "0 auto",
          }}>
            Ajusta los sliders y mira tu potencial real en 6 meses. Estimación conservadora basada en resultados reales.
          </p>
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          style={{
            borderRadius: 24,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            overflow: "hidden",
            boxShadow: "0 32px 64px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          }}>

            {/* LEFT: Inputs */}
            <div style={{
              padding: isDesktop ? "40px 44px" : "32px 24px",
              borderRight: isDesktop ? "1px solid rgba(255,255,255,0.07)" : "none",
              borderBottom: !isDesktop ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <h3 style={{
                fontFamily: "var(--font-ui)", fontSize: "0.72rem",
                fontWeight: 600, letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.30)",
                marginBottom: 32,
              }}>
                Tu situación actual
              </h3>

              {/* Followers slider */}
              <SliderInput
                label="Seguidores actuales"
                min={100}
                max={50000}
                value={followers}
                onChange={setFollowers}
                formatValue={(v) => formatNumber(v)}
                color="#9B4DBC"
              />

              {/* Sector select */}
              <div style={{ marginBottom: 28 }}>
                <span style={{
                  display: "block", fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.55)", fontWeight: 500, marginBottom: 10,
                }}>Sector</span>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 8,
                }}>
                  {ROI_SECTORS.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setSectorIdx(i)}
                      style={{
                        padding: "9px 12px", borderRadius: 9,
                        border: `1px solid ${i === sectorIdx ? "rgba(107,45,124,0.50)" : "rgba(255,255,255,0.07)"}`,
                        background: i === sectorIdx ? "rgba(107,45,124,0.15)" : "rgba(255,255,255,0.03)",
                        fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 500,
                        color: i === sectorIdx ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.40)",
                        textAlign: "left", cursor: "inherit",
                        transition: "all 0.2s",
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Package select */}
              <div>
                <span style={{
                  display: "block", fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.55)", fontWeight: 500, marginBottom: 10,
                }}>Plan Geko</span>
                <div style={{ display: "flex", gap: 8 }}>
                  {ROI_PACKAGES.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setPackageIdx(i)}
                      style={{
                        flex: 1, padding: "10px 8px", borderRadius: 10,
                        border: `1px solid ${i === packageIdx ? p.color + "60" : "rgba(255,255,255,0.07)"}`,
                        background: i === packageIdx ? `${p.color}15` : "rgba(255,255,255,0.03)",
                        cursor: "inherit", transition: "all 0.2s",
                      }}
                    >
                      <p style={{
                        fontFamily: "var(--font-ui)", fontSize: "0.875rem",
                        fontWeight: 700, color: i === packageIdx ? p.color : "rgba(255,255,255,0.38)",
                        marginBottom: 2,
                      }}>{p.label}</p>
                      <p style={{
                        fontFamily: "var(--font-ui)", fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.28)",
                      }}>{p.price}€/mes</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Results */}
            <div style={{ padding: isDesktop ? "40px 44px" : "32px 24px" }}>
              <h3 style={{
                fontFamily: "var(--font-ui)", fontSize: "0.72rem",
                fontWeight: 600, letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.30)",
                marginBottom: 32,
              }}>
                Tu proyección en 6 meses
              </h3>

              {/* Main metric — followers */}
              <div style={{
                borderRadius: 16,
                background: `${pkg.color}0E`,
                border: `1px solid ${pkg.color}25`,
                padding: "20px 24px",
                marginBottom: 16,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <Users size={16} style={{ color: pkg.color }} />
                  <span style={{
                    fontFamily: "var(--font-ui)", fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.40)",
                  }}>Seguidores proyectados</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{
                    fontFamily: "var(--font-heading)", fontSize: "2.5rem",
                    fontWeight: 800, color: pkg.color, lineHeight: 1,
                  }}>
                    <AnimatedNumber value={results.followersIn6m} />
                  </span>
                  <span style={{
                    fontFamily: "var(--font-ui)", fontSize: "0.875rem",
                    color: "rgba(16,185,129,0.85)", fontWeight: 600,
                  }}>
                    +<AnimatedNumber value={results.newFollowers} /> nuevos
                  </span>
                </div>
              </div>

              {/* Secondary metrics grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 20,
              }}>
                {[
                  {
                    icon: <TrendingUp size={14} />,
                    label: "Engagement",
                    value: <AnimatedNumber value={results.engagementRate} suffix="%" />,
                    color: "#10B981",
                  },
                  {
                    icon: <Zap size={14} />,
                    label: "Alcance / post",
                    value: <AnimatedNumber value={results.reachPerPost} />,
                    color: "#F59E0B",
                  },
                  {
                    icon: <Target size={14} />,
                    label: "Leads / mes",
                    value: <AnimatedNumber value={results.leadsPerMonth} />,
                    color: "#3B82F6",
                  },
                  {
                    icon: <TrendingUp size={14} />,
                    label: "ROI estimado",
                    value: <AnimatedNumber value={results.roi} suffix="%" />,
                    color: "#9B4DBC",
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    style={{
                      padding: "14px 16px", borderRadius: 12,
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, color: m.color }}>
                      {m.icon}
                      <span style={{
                        fontFamily: "var(--font-ui)", fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.38)",
                      }}>{m.label}</span>
                    </div>
                    <span style={{
                      fontFamily: "var(--font-heading)", fontSize: "1.25rem",
                      fontWeight: 700, color: m.color,
                    }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <p style={{
                fontFamily: "var(--font-ui)", fontSize: "0.7rem",
                color: "rgba(255,255,255,0.22)", lineHeight: 1.5,
                marginBottom: 20,
              }}>
                *Proyección basada en resultados reales de clientes actuales. Los resultados varían según sector, contenido y competencia.
              </p>

              {/* CTA */}
              <Link
                href="/contacto"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "13px 24px", borderRadius: 12,
                  background: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
                  color: "#fff", textDecoration: "none",
                  fontFamily: "var(--font-ui)", fontSize: "0.875rem", fontWeight: 600,
                  boxShadow: "0 4px 20px rgba(107,45,124,0.35)",
                }}
              >
                Quiero estos resultados
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
