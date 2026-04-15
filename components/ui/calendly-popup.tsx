"use client"

import { useState, useEffect, useCallback } from "react"
import { InlineWidget } from "react-calendly"
import { motion, AnimatePresence } from "framer-motion"
import { X, CalendarDays, Clock, Video } from "lucide-react"

const CALENDLY_URL = "https://calendly.com/info-gekomarketing/30min"

const PAGE_SETTINGS = {
  backgroundColor: "080810",
  primaryColor: "6B2D7C",
  textColor: "ffffff",
  hideEventTypeDetails: true,
  hideLandingPageDetails: true,
}

const PERKS = [
  { icon: <Clock size={14} />, text: "30 minutos sin compromiso" },
  { icon: <Video size={14} />, text: "Videollamada o teléfono" },
  { icon: <CalendarDays size={14} />, text: "Elige el horario que más te convenga" },
]

// ── Modal de Calendly ─────────────────────────────────────────
function CalendlyModal({ onClose }: { onClose: () => void }) {
  // Cierra con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    // Bloquea scroll del body
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(8,8,16,0.88)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%", maxWidth: 480,
          borderRadius: 20,
          overflow: "hidden",
          background: "#080810",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.80)",
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute", top: 14, right: 14, zIndex: 10,
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "rgba(255,255,255,0.60)",
            transition: "background 0.2s",
          }}
        >
          <X size={16} />
        </button>

        {/* Calendly InlineWidget — sin scroll interno */}
        <div style={{ height: 660, overflow: "hidden" }}>
          <InlineWidget
            url={`${CALENDLY_URL}?locale=es&hide_event_type_details=1&hide_gdpr_banner=1`}
            pageSettings={PAGE_SETTINGS}
            styles={{ width: "100%", height: "100%", minWidth: "auto" }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Card de la sidebar ────────────────────────────────────────
export function CalendlyCard() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <div
        style={{
          padding: "28px 24px",
          borderRadius: 20,
          background: "linear-gradient(135deg, rgba(107,45,124,0.12) 0%, rgba(29,78,216,0.08) 100%)",
          border: "1px solid rgba(107,45,124,0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orb */}
        <div aria-hidden style={{
          position: "absolute", top: -40, right: -40,
          width: 160, height: 160, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(107,45,124,0.30) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Icon */}
        <div style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 48, height: 48, borderRadius: 14,
          background: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
          marginBottom: 16,
          boxShadow: "0 4px 16px rgba(107,45,124,0.45)",
        }}>
          <CalendarDays size={22} color="#fff" />
        </div>

        {/* Text */}
        <p style={{
          fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 600,
          letterSpacing: "0.10em", textTransform: "uppercase",
          color: "#9B4DBC", marginBottom: 8,
        }}>
          Gratis · Sin compromiso
        </p>
        <h3 style={{
          fontFamily: "var(--font-heading)", fontSize: "1.25rem",
          fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em",
          color: "rgba(255,255,255,0.95)", marginBottom: 8,
        }}>
          Consulta gratuita de 30&nbsp;min
        </h3>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "0.875rem",
          color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 20,
        }}>
          Cuéntanos tu situación y te damos una estrategia inicial adaptada a tu negocio.
        </p>

        {/* Perks */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
          {PERKS.map((p) => (
            <li key={p.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#9B4DBC", flexShrink: 0 }}>{p.icon}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)" }}>
                {p.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {mounted && (
          <button
            onClick={() => setOpen(true)}
            style={{
              width: "100%", padding: "13px 20px", borderRadius: 12,
              background: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
              border: "none", cursor: "pointer",
              fontFamily: "var(--font-ui)", fontSize: "0.9375rem", fontWeight: 600,
              color: "#fff", boxShadow: "0 4px 20px rgba(107,45,124,0.45)",
              transition: "opacity 0.2s",
            }}
          >
            Reservar mi llamada gratis →
          </button>
        )}
      </div>

      {/* Portal-less modal — montado en el mismo árbol */}
      {mounted && (
        <AnimatePresence>
          {open && <CalendlyModal onClose={close} />}
        </AnimatePresence>
      )}
    </>
  )
}
