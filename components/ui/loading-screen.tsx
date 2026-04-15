"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

const DURATION = 2000

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      const raw = Math.min(elapsed / DURATION, 1)
      const eased = 1 - Math.pow(1 - raw, 3)
      setProgress(eased * 100)

      if (raw < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        // Small pause at 100% then signal done
        setTimeout(() => {
          setDone(true)
        }, 200)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (done) {
      // Wait for exit animation then call complete
      const t = setTimeout(onComplete, 600)
      return () => clearTimeout(t)
    }
  }, [done, onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={done ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#080810",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: done ? "none" : "all",
      }}
    >
      {/* Background glows */}
      <div aria-hidden style={{
        position: "absolute",
        top: "30%", left: "50%", transform: "translate(-50%, -50%)",
        width: 600, height: 400, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(107,45,124,0.18) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute",
        top: "45%", left: "50%", transform: "translate(-50%, -50%)",
        width: 350, height: 280, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(29,78,216,0.12) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 64, height: 64, borderRadius: 18,
            background: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2rem",
            boxShadow: "0 0 40px rgba(107,45,124,0.5), 0 0 80px rgba(107,45,124,0.2)",
          }}
        >
          🦎
        </motion.div>

        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1,
            background: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.55) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: 8,
          }}>
            geko<span style={{
              background: "linear-gradient(135deg, #9B4DBC, #3B82F6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>.</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            style={{
              fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.32)", letterSpacing: "0.05em",
            }}
          >
            Transformamos seguidores en clientes
          </motion.p>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 2, background: "rgba(255,255,255,0.05)",
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #6B2D7C, #9B4DBC, #3B82F6)",
          borderRadius: "0 2px 2px 0",
          boxShadow: "0 0 12px rgba(155,77,188,0.6)",
          transition: "width 0.05s linear",
        }} />
      </div>

      {/* Percentage */}
      <span style={{
        position: "absolute", bottom: 14, right: 20,
        fontFamily: "var(--font-ui)", fontSize: "0.68rem", fontWeight: 600,
        color: "rgba(255,255,255,0.18)", letterSpacing: "0.05em",
        fontVariantNumeric: "tabular-nums",
      }}>
        {Math.round(progress)}%
      </span>
    </motion.div>
  )
}
