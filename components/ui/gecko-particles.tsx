"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"

// Brand palette — particles cycle through these
const PALETTE: [number, number, number][] = [
  [107, 45, 124],   // #6B2D7C geko purple
  [139, 92, 246],   // #8B5CF6 violet
  [29, 78, 216],    // #1D4ED8 blue
  [96, 165, 250],   // #60A5FA blue-300
  [167, 139, 250],  // #A78BFA violet-300
]

interface Particle {
  x: number; y: number
  ox: number; oy: number   // target position inside gecko
  vx: number; vy: number
  size: number
  alpha: number
  r: number; g: number; b: number
}

export function GeckoParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReduced) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rafId: number
    let mounted = true
    const particles: Particle[] = []

    function setSize() {
      if (!canvas) return
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    const ro = new ResizeObserver(setSize)
    ro.observe(canvas)
    setSize()

    const img = new Image()
    img.src = "/gecko_PNG14.png"

    img.onload = () => {
      if (!mounted) return

      const W = canvas.width || canvas.clientWidth
      const H = canvas.height || canvas.clientHeight

      // Scale gecko to 80% of canvas, centered
      const fit = Math.min(W / img.width, H / img.height) * 0.80
      const gW = Math.round(img.width * fit)
      const gH = Math.round(img.height * fit)
      const gX = Math.round((W - gW) / 2)
      const gY = Math.round((H - gH) / 2)

      // Read silhouette from offscreen canvas
      const off = document.createElement("canvas")
      off.width = gW
      off.height = gH
      const offCtx = off.getContext("2d")!
      offCtx.drawImage(img, 0, 0, gW, gH)
      const { data } = offCtx.getImageData(0, 0, gW, gH)

      // Sample positions — larger step on mobile for fewer particles
      const step = window.innerWidth < 768 ? 10 : 7
      const positions: [number, number][] = []
      for (let y = 0; y < gH; y += step) {
        for (let x = 0; x < gW; x += step) {
          const a = data[(y * gW + x) * 4 + 3]
          if (a > 80) positions.push([gX + x, gY + y])
        }
      }

      // Cap at 900 particles
      const MAX = 900
      const ratio = positions.length > MAX ? Math.ceil(positions.length / MAX) : 1
      const sampled = positions.filter((_, i) => i % ratio === 0)

      for (const [ox, oy] of sampled) {
        const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)]
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          ox, oy,
          vx: 0, vy: 0,
          size: Math.random() * 1.6 + 0.5,
          alpha: Math.random() * 0.55 + 0.2,
          r, g, b,
        })
      }

      function draw() {
        if (!mounted || !ctx || !canvas) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (const p of particles) {
          // Spring toward target with gentle noise
          p.vx += (p.ox - p.x) * 0.045 + (Math.random() - 0.5) * 0.5
          p.vy += (p.oy - p.y) * 0.045 + (Math.random() - 0.5) * 0.5
          p.vx *= 0.87
          p.vy *= 0.87
          p.x += p.vx
          p.y += p.vy

          // Gentle opacity shimmer
          p.alpha += (Math.random() - 0.5) * 0.022
          p.alpha = Math.max(0.12, Math.min(0.82, p.alpha))

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha.toFixed(2)})`
          ctx.fill()
        }

        rafId = requestAnimationFrame(draw)
      }

      draw()
    }

    return () => {
      mounted = false
      ro.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [prefersReduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.6,
        pointerEvents: "none",
      }}
    />
  )
}
