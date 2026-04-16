"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const SESSION_KEY = "geko-ann-dismissed"
const SCROLL_THRESHOLD = 60

export function AnnouncementBar() {
  // SSR-safe: lazy init reads localStorage on client, defaults to hidden on server
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window === "undefined") return true
    return Boolean(localStorage.getItem(SESSION_KEY))
  })
  const [scrolledPast, setScrolledPast] = useState(false)

  // Sync CSS custom property and listen for scroll
  useEffect(() => {
    if (!dismissed) {
      document.documentElement.style.setProperty("--ann-h", "40px")
    }

    const onScroll = () => {
      const past = window.scrollY > SCROLL_THRESHOLD
      setScrolledPast(past)
      if (!localStorage.getItem(SESSION_KEY)) {
        document.documentElement.style.setProperty("--ann-h", past ? "0px" : "40px")
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [dismissed])

  const dismiss = () => {
    setDismissed(true)
    localStorage.setItem(SESSION_KEY, "1")
    document.documentElement.style.setProperty("--ann-h", "0px")
  }

  const isVisible = !dismissed && !scrolledPast

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 40, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            overflow: "hidden",
            position: "relative",
            background: "linear-gradient(90deg, #4A1F57 0%, #6B2D7C 45%, #1D4ED8 100%)",
          }}
        >
          <div
            style={{
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 40px 0 16px",
              position: "relative",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
            <p
              className="ann-text"
              style={{ fontFamily: "var(--font-ui)", color: "#fff", textAlign: "center", lineHeight: 1.3 }}
            >
              <span style={{ marginRight: 5 }}>🦎</span>
              Solo quedan{" "}
              <strong style={{ fontWeight: 600 }}>3 plazas</strong>
              {" "}para nuevos clientes en Mayo —{" "}
              <a
                href="https://calendly.com/info-gekomarketing/30min"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#fff",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  textDecorationColor: "rgba(255,255,255,0.55)",
                  whiteSpace: "nowrap",
                }}
              >
                Reserva gratis →
              </a>
            </p>
            <button
              onClick={dismiss}
              aria-label="Cerrar anuncio"
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.9)",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <X size={12} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
