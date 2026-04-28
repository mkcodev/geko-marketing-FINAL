"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react"
import { Zap } from "lucide-react"
import type { PlanData, Billing } from "./paquetes.types"
import { PriceDisplay, FeatureList, PlanHeader, PlanCTA } from "./PlanSubcomponents"

// ─── Silver card: 3D tilt + metallic shimmer ──────────────────────────────────

export function SilverCard({ plan, billing }: { plan: PlanData; billing: Billing }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const rotateY = useTransform(mouseX, [0, 1], [-7, 7])
  const rotateX = useTransform(mouseY, [0, 1], [6, -6])
  const glareX = useTransform(mouseX, [0, 1], ["-50%", "150%"])
  const glareY = useTransform(mouseY, [0, 1], ["-50%", "150%"])
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set((e.clientX - rect.left) / rect.width)
      mouseY.set((e.clientY - rect.top) / rect.height)
    },
    [mouseX, mouseY]
  )

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        mouseX.set(0.5)
        mouseY.set(0.5)
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "24px",
          borderRadius: 20,
          background: "rgba(148,163,184,0.04)",
          border: "1px solid rgba(148,163,184,0.18)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "border-color 0.3s, box-shadow 0.3s",
          boxShadow: hovered
            ? "0 20px 60px rgba(148,163,184,0.12), 0 0 0 1px rgba(148,163,184,0.25)"
            : "none",
        }}
      >
        {/* Metallic shimmer sweep */}
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-120%", "220%"] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "55%",
            height: "100%",
            background:
              "linear-gradient(105deg, transparent 0%, rgba(200,210,230,0.08) 40%, rgba(220,230,248,0.22) 50%, rgba(200,210,230,0.08) 60%, transparent 100%)",
            transform: "skewX(-15deg)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Dynamic glare */}
        {hovered && (
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(200,210,230,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 1,
              x: glareX,
              y: glareY,
            }}
          />
        )}

        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-30%",
            right: "-20%",
            width: "70%",
            height: "70%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(148,163,184,0.1) 0%, transparent 70%)",
            filter: "blur(24px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", height: "100%" }}>
          <PlanHeader plan={plan} />
          <PriceDisplay plan={plan} billing={billing} />
          <FeatureList plan={plan} />
          <PlanCTA plan={plan} variant="default" />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Gold card: floating particles + glow scale ───────────────────────────────

export function GoldCard({ plan, billing }: { plan: PlanData; billing: Billing }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height * (0.4 + Math.random() * 0.6),
      size: Math.random() * 1.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.7 + 0.2),
      life: Math.random(),
      maxLife: 0.7 + Math.random() * 0.3,
    }))

    let animId: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY
        p.life -= 0.004
        if (p.life <= 0) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height
          p.life = p.maxLife
        }
        const alpha = (p.life / p.maxLife) * 0.75
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,158,11,${alpha})`
        ctx.fill()
      }
      animId = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(animId)
  }, [prefersReduced])

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { scale: 1.025 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      style={{ height: "100%", position: "relative" }}
    >
      <div
        style={{
          position: "relative",
          padding: "24px",
          borderRadius: 20,
          background:
            "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, var(--color-geko-purple-a06) 100%)",
          border: `1px solid rgba(245,158,11,${hovered ? "0.45" : "0.25"})`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "border-color 0.3s",
          boxShadow: hovered
            ? "0 24px 64px rgba(245,158,11,0.18), 0 0 0 1px rgba(245,158,11,0.35)"
            : "0 8px 32px rgba(245,158,11,0.08)",
        }}
      >
        {/* Popular badge */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 10px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #F59E0B, #EF4444)",
            fontFamily: "var(--font-ui)",
            fontSize: "0.68rem",
            fontWeight: 600,
            color: "#fff",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          <Zap size={10} />
          Más popular
        </div>

        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.4s",
            borderRadius: 20,
          }}
        />

        {/* Gold ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: `radial-gradient(ellipse, rgba(245,158,11,${hovered ? "0.18" : "0.10"}) 0%, transparent 70%)`,
            filter: "blur(30px)",
            pointerEvents: "none",
            transition: "background 0.4s",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
          <PlanHeader plan={plan} />
          <PriceDisplay plan={plan} billing={billing} />
          <FeatureList plan={plan} />
          <PlanCTA plan={plan} variant="gold" />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Platinum card: aurora border + particles + spotlight + magnetic ──────────

export function PlatinumCard({ plan, billing }: { plan: PlanData; billing: Billing }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 180, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 180, damping: 20 })
  const spotX = useMotionValue(0)
  const spotY = useMotionValue(0)
  const spotOffsetX = useTransform(spotX, (v) => v - 150)
  const spotOffsetY = useTransform(spotY, (v) => v - 150)
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      mouseX.set(((e.clientX - cx) / rect.width) * 12)
      mouseY.set(((e.clientY - cy) / rect.height) * 12)
      spotX.set(e.clientX - rect.left)
      spotY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY, spotX, spotY]
  )

  useEffect(() => {
    if (prefersReduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height * (0.3 + Math.random() * 0.7),
      size: Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -(Math.random() * 0.6 + 0.15),
      life: Math.random(),
      maxLife: 0.6 + Math.random() * 0.4,
      hue: 260 + Math.round(Math.random() * 60 - 30),
    }))

    let animId: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY
        p.life -= 0.003
        if (p.life <= 0) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height
          p.life = p.maxLife
        }
        const alpha = (p.life / p.maxLife) * 0.65
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},80%,70%,${alpha})`
        ctx.fill()
      }
      animId = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(animId)
  }, [prefersReduced])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      style={{ x: springX, y: springY, height: "100%" }}
    >
      {/* Aurora rotating border wrapper */}
      <div
        style={{
          position: "relative",
          borderRadius: 21,
          padding: "1px",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Spinning aurora gradient */}
        <motion.div
          aria-hidden="true"
          animate={prefersReduced ? {} : { rotate: [0, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "200%",
            height: "200%",
            top: "-50%",
            left: "-50%",
            background:
              "conic-gradient(from 0deg at 50% 50%, #8B5CF6 0%, #EC4899 25%, var(--color-geko-blue-light) 50%, #10B981 70%, #8B5CF6 100%)",
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.4s",
          }}
        />

        {/* Card body — always dark, force dark tokens so subcomponents read correct vars */}
        <div
          style={{
            position: "relative",
            borderRadius: 20,
            background: "linear-gradient(135deg, #0d0918 0%, #0a0a14 100%)",
            padding: "24px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            ...({
              "--fg": "rgba(255,255,255,0.95)",
              "--fg-secondary": "rgba(255,255,255,0.55)",
              "--fg-muted": "rgba(255,255,255,0.35)",
              "--border-strong": "rgba(255,255,255,0.12)",
              "--surface-strong": "rgba(255,255,255,0.10)",
            } as React.CSSProperties),
          }}
        >
          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              opacity: hovered ? 1 : 0.45,
              transition: "opacity 0.4s",
              borderRadius: 20,
            }}
          />

          {/* Cursor spotlight */}
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(139,92,246,0.20) 0%, transparent 70%)",
              pointerEvents: "none",
              x: spotOffsetX,
              y: spotOffsetY,
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          />

          {/* Ambient glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "60%",
              height: "60%",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(139,92,246,0.20) 0%, transparent 70%)",
              filter: "blur(30px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
            <PlanHeader plan={plan} />
            <PriceDisplay plan={plan} billing={billing} />
            <FeatureList plan={plan} />
            <PlanCTA plan={plan} variant="platinum" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
