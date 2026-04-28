"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"

const STORAGE_KEY = "geko-cookie-consent"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 2500)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted")
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            zIndex: 9000,
            maxWidth: 360,
            width: "calc(100vw - 48px)",
            background: "rgba(8,8,16,0.92)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid var(--border)",
            // esquina superior derecha más redondeada
            borderRadius: "12px 28px 12px 12px",
            padding: "20px 22px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px var(--surface) inset",
          }}
          role="dialog"
          aria-label="Aviso de cookies"
        >
          {/* Icono + título */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8, flexShrink: 0,
              background: "linear-gradient(135deg, var(--color-geko-purple-a25), var(--color-geko-blue-a20))",
              border: "1px solid var(--color-geko-purple-a30)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.85rem",
            }}>
              🍪
            </div>
            <span style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--fg)",
            }}>
              Cookies
            </span>
          </div>

          {/* Texto */}
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.6,
            marginBottom: 18,
          }}>
            Usamos cookies para mejorar tu experiencia y analizar el tráfico.{" "}
            <Link
              href="/privacidad"
              style={{
                color: "var(--color-geko-purple-accent-a85)",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-geko-purple-accent-a30)",
              }}
            >
              Política de privacidad
            </Link>
            .
          </p>

          {/* Botones */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={accept}
              style={{
                flex: 1,
                padding: "9px 0",
                borderRadius: 9,
                border: "none",
                background: "var(--gradient-brand)",
                color: "#fff",
                fontFamily: "var(--font-ui)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "inherit",
                boxShadow: "0 2px 12px var(--color-geko-purple-a35)",
              }}
            >
              Aceptar
            </button>
            <button
              onClick={reject}
              style={{
                flex: 1,
                padding: "9px 0",
                borderRadius: 9,
                border: "1px solid var(--border-strong)",
                background: "var(--surface)",
                color: "var(--fg-secondary)",
                fontFamily: "var(--font-ui)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                cursor: "inherit",
              }}
            >
              Rechazar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
