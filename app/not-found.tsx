"use client"

import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { ArrowLeft, Home, Search } from "lucide-react"
import { EASE } from "@/lib/animations"

const LINKS = [
  { href: "/", label: "Inicio", icon: <Home size={15} /> },
  { href: "/servicios", label: "Servicios", icon: null },
  { href: "/blog", label: "Blog", icon: null },
  { href: "/contacto", label: "Contacto", icon: null },
]

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Floating particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; hue: number }
    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.4 + 0.05,
      hue: Math.random() > 0.5 ? 280 : 220,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.alpha})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div style={{
      minHeight: "100dvh",
      background: "#080810",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      padding: "0 24px",
    }}>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* Ambient glow blobs */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "10%", left: "15%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(ellipse, var(--color-geko-purple-a18) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none",
        animation: "blob-drift 8s ease-in-out infinite",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "10%", right: "15%",
        width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(ellipse, var(--color-geko-blue-a15) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none",
        animation: "blob-drift 10s ease-in-out infinite reverse",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 560 }}>
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ position: "relative", marginBottom: 8 }}
        >
          <span style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(7rem, 20vw, 12rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            background: "linear-gradient(135deg, var(--color-geko-purple-a25) 0%, rgba(59,130,246,0.20) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            display: "block",
            userSelect: "none",
          }}>
            404
          </span>
          {/* Overlaid gradient text */}
          <span aria-hidden="true" style={{
            position: "absolute",
            inset: 0,
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(7rem, 20vw, 12rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            background: "linear-gradient(135deg, var(--color-geko-purple-accent) 0%, var(--color-geko-blue-light) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: 0.6,
            filter: "blur(20px)",
            display: "block",
            userSelect: "none",
          }}>
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            marginBottom: 14,
          }}
        >
          Página no encontrada
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.0625rem",
            color: "var(--fg-muted)",
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Esta URL no existe o fue movida. Usa los enlaces de abajo para volver al camino correcto.
        </motion.p>

        {/* Nav links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 32 }}
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 20px",
                borderRadius: 10,
                fontFamily: "var(--font-ui)",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "var(--fg-secondary)",
                textDecoration: "none",
                border: "1px solid var(--border-strong)",
                background: "var(--surface)",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = "var(--color-geko-purple-a15)"
                el.style.borderColor = "var(--color-geko-purple-a35)"
                el.style.color = "var(--fg)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = "var(--surface)"
                el.style.borderColor = "var(--border-strong)"
                el.style.color = "var(--fg-secondary)"
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              borderRadius: 12,
              fontFamily: "var(--font-ui)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
              background: "var(--gradient-brand)",
              boxShadow: "0 4px 24px var(--color-geko-purple-a45)",
            }}
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </motion.div>

        {/* Search suggestion */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontFamily: "var(--font-ui)",
            fontSize: "0.82rem",
            color: "var(--fg-subtle)",
          }}
        >
          <Search size={12} />
          ¿Buscas algo concreto?{" "}
          <Link
            href="/contacto"
            style={{ color: "var(--color-geko-purple-accent-a75)", textDecoration: "none" }}
          >
            Contáctanos
          </Link>
        </motion.p>
      </div>

      <style>{`
        @keyframes blob-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.05); }
          66%       { transform: translate(-20px, 15px) scale(0.97); }
        }
      `}</style>
    </div>
  )
}
