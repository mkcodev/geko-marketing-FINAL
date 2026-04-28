"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useReducedMotion, useInView } from "motion/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useT } from "@/hooks/use-translations"
import { Section } from "@/components/ui/section"
import { Icon } from "@/lib/icons"
import type { IconName } from "@/lib/icons"
import { EASE } from "@/lib/animations"

gsap.registerPlugin(ScrollTrigger)

const STEP_META: { icon: IconName; color: string }[] = [
  { icon: "Target",    color: "var(--color-geko-blue-light)" },
  { icon: "Layers",    color: "#8B5CF6" },
  { icon: "Megaphone", color: "#EC4899" },
  { icon: "LineChart", color: "#10B981" },
]

// SVG path control points for the connector line (horizontal, desktop)
// We use a gentle S-curve passing through 4 nodes evenly spaced
const LINE_PATH = "M 60 50 C 160 50, 200 50, 300 50 C 400 50, 440 50, 540 50 C 640 50, 680 50, 780 50 C 880 50, 920 50, 1020 50"
// Node X positions as fractions of total path — keep last well below 1.0 so it activates
const NODE_FRACTIONS = [0, 0.26, 0.54, 0.82]

// ─── Main section ─────────────────────────────────────────────────────────────

export function Proceso() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeNodes, setActiveNodes] = useState<boolean[]>([false, false, false, false])
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })
  const t = useT()

  useEffect(() => {
    if (!isDesktop || prefersReduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveNodes([true, true, true, true])
      return
    }

    const path = pathRef.current
    if (!path) return

    const totalLength = path.getTotalLength()
    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    })

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      end: "center 15%",
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress
        gsap.set(path, {
          strokeDashoffset: totalLength * (1 - progress),
        })
        // Activate nodes as the line reaches them
        const newActive = NODE_FRACTIONS.map((frac) => progress >= frac + 0.02)
        setActiveNodes(newActive)
      },
    })

    return () => {
      st.kill()
      gsap.killTweensOf(path)
    }
  }, [isDesktop, prefersReduced])

  return (
    <Section background="var(--section-alt)" borderTop borderBottom className="overflow-hidden">
      <div ref={sectionRef} className="section-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={headerInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: 64, textAlign: "center" }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: 9999,
              background: "var(--color-geko-blue-a12)",
              border: "1px solid var(--color-geko-blue-a30)",
              fontFamily: "var(--font-ui)",
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "var(--color-geko-blue-light)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {t.process.label}
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
              color: "var(--fg)",
            }}
          >
            {t.process.headline}
          </h2>
        </motion.div>

        {/* Steps container */}
        <div style={{ position: "relative" }}>
          {/* SVG connector line (desktop only) */}
          {isDesktop && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 44,
                left: 0,
                right: 0,
                height: 100,
                pointerEvents: "none",
                zIndex: 0,
                overflow: "visible",
              }}
            >
              <svg
                ref={svgRef}
                width="100%"
                height="100"
                viewBox="0 0 1080 100"
                preserveAspectRatio="none"
                overflow="visible"
              >
                {/* Ghost track */}
                <path
                  d={LINE_PATH}
                  fill="none"
                  style={{ stroke: "var(--border-subtle)" }}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* Animated glowing line */}
                <path
                  ref={pathRef}
                  d={LINE_PATH}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-geko-blue-light)" stopOpacity="0.8" />
                    <stop offset="33%" stopColor="#8B5CF6" stopOpacity="0.9" />
                    <stop offset="66%" stopColor="#EC4899" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {/* Steps grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isDesktop ? "repeat(4, 1fr)" : "1fr",
              gap: isDesktop ? 20 : 16,
              position: "relative",
              zIndex: 1,
            }}
          >
            {t.process.steps.map((step, i) => (
              <StepCard
                key={step.number}
                step={{ ...step, ...STEP_META[i] }}
                index={i}
                isDesktop={isDesktop}
                active={activeNodes[i]}
                prefersReduced={!!prefersReduced}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── Step card ─────────────────────────────────────────────────────────────────

interface Step {
  number: string
  title: string
  description: string
  duration: string
  icon: IconName
  color: string
}

function StepCard({
  step,
  index,
  isDesktop,
  active,
  prefersReduced,
}: {
  step: Step
  index: number
  isDesktop: boolean
  active: boolean
  prefersReduced: boolean
}) {
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.5,
        delay: prefersReduced ? index * 0.08 : 0,
        ease: EASE,
      }}
    >
      <div
        style={{
          padding: isDesktop ? "28px 22px" : "22px",
          borderRadius: 20,
          background: "var(--surface)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${active ? "var(--border-strong)" : "var(--border-subtle)"}`,
          display: "flex",
          flexDirection: isDesktop ? "column" : "row",
          gap: isDesktop ? 20 : 16,
          alignItems: "flex-start",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.5s",
        }}
      >
        {/* Glass highlight top edge */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${step.color}44, transparent)`,
            opacity: active ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        />

        {/* Corner glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -30,
            right: -20,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: `radial-gradient(ellipse, ${step.color}18 0%, transparent 70%)`,
            filter: "blur(20px)",
            pointerEvents: "none",
            opacity: active ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        />

        {/* Node circle */}
        <div style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
          <motion.div
            animate={
              active
                ? { scale: 1, opacity: 1 }
                : prefersReduced
                ? { scale: 1, opacity: 1 }
                : { scale: 0.7, opacity: 0.4 }
            }
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: active
                ? `linear-gradient(135deg, ${step.color}33, ${step.color}18)`
                : "var(--surface)",
              border: `1.5px solid ${active ? step.color + "66" : "var(--border-strong)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: active ? step.color : "var(--fg-muted)",
              transition: "background 0.4s, border-color 0.4s, color 0.4s",
              boxShadow: active ? `0 0 20px ${step.color}30` : "none",
            }}
          >
            <Icon name={step.icon} size={22} />
          </motion.div>

          {/* Step number badge */}
          <div
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: active
                ? `linear-gradient(135deg, ${step.color}, ${step.color}cc)`
                : "var(--border-strong)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-ui)",
              fontSize: "0.6rem",
              fontWeight: 700,
              color: active ? "#fff" : "var(--fg-muted)",
              transition: "background 0.4s, color 0.4s",
            }}
          >
            {step.number}
          </div>
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.70rem",
              color: active ? `${step.color}cc` : "var(--fg-subtle)",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 6,
              transition: "color 0.4s",
            }}
          >
            {step.duration}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1rem",
              fontWeight: 700,
              color: active ? "var(--fg)" : "var(--fg-secondary)",
              letterSpacing: "-0.01em",
              marginBottom: 8,
              transition: "color 0.4s",
            }}
          >
            {step.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: active ? "var(--fg-secondary)" : "var(--fg-subtle)",
              lineHeight: 1.7,
              transition: "color 0.4s",
            }}
          >
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
