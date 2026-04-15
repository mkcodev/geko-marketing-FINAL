"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CtaSticky() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Desktop only — via CSS
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            right: 24,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 200,
            // Hide on mobile
            display: "none",
          }}
          className="cta-sticky-desktop"
        >
          <Link
            href="/contacto"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              padding: hovered ? "18px 16px" : "16px 14px",
              borderRadius: 16,
              background: hovered
                ? "rgba(107,45,124,0.20)"
                : "rgba(8,8,16,0.90)",
              border: hovered
                ? "1px solid rgba(107,45,124,0.50)"
                : "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(20px)",
              boxShadow: hovered
                ? "0 8px 32px rgba(107,45,124,0.30), 0 0 0 1px rgba(107,45,124,0.15)"
                : "0 8px 24px rgba(0,0,0,0.40)",
              textDecoration: "none",
              transition: "all 0.3s ease",
              cursor: "inherit",
            }}
            aria-label="Pedir auditoría gratuita"
          >
            {/* Pulse dot */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "linear-gradient(135deg, #9B4DBC, #3B82F6)",
                boxShadow: "0 0 8px rgba(107,45,124,0.6)",
              }}
            />

            {/* Rotated text */}
            <div style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
            }}>
              <span style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: hovered ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.55)",
                transition: "color 0.2s",
                whiteSpace: "nowrap",
              }}>
                Auditoría gratis
              </span>
            </div>

            {/* Arrow */}
            <motion.div
              animate={hovered ? { y: [0, 3, 0] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{
                color: hovered ? "#9B4DBC" : "rgba(255,255,255,0.30)",
                transition: "color 0.2s",
                transform: "rotate(90deg)",
              }}
            >
              <ArrowRight size={14} />
            </motion.div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
