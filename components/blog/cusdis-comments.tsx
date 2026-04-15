"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"

declare global {
  interface Window {
    CUSDIS_LOCALE?: string
    renderCusdis?: (el: HTMLElement) => void
  }
}

interface CusdisCommentsProps {
  pageId: string
  pageUrl: string
  pageTitle: string
}

const APP_ID = process.env.NEXT_PUBLIC_CUSDIS_APP_ID ?? ""

export function CusdisComments({ pageId, pageUrl, pageTitle }: CusdisCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!APP_ID || !containerRef.current) return

    const el = containerRef.current

    // On page navigation, clear previous iframe so Cusdis re-renders cleanly
    el.innerHTML = ""
    setLoaded(false)
    window.CUSDIS_LOCALE = "es"

    const existingScript = document.getElementById("cusdis-script")

    if (existingScript) {
      // Script already in DOM — manually trigger re-render for new page
      window.renderCusdis?.(el)
      setLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.id = "cusdis-script"
    script.src = "https://cusdis.com/js/cusdis.es.js"
    script.async = true
    script.defer = true
    script.onload = () => setLoaded(true)
    document.body.appendChild(script)
  }, [pageId])

  // Don't render anything if the env var is not set
  if (!APP_ID) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: 16 }}
    >
      {/* Gradient divider */}
      <div
        aria-hidden="true"
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(155,77,188,0.35) 40%, rgba(59,130,246,0.35) 60%, transparent 100%)",
          marginBottom: 40,
        }}
      />

      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(155,77,188,0.10)",
            border: "1px solid rgba(155,77,188,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9B4DBC",
            flexShrink: 0,
          }}
        >
          <MessageCircle size={17} strokeWidth={1.8} />
        </div>

        <div>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.125rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "rgba(255,255,255,0.90)",
              lineHeight: 1,
              marginBottom: 5,
            }}
          >
            Comentarios
          </h3>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            ¿Tienes alguna pregunta o quieres aportar algo? Déjalo aquí.
          </p>
        </div>
      </div>

      {/* Widget container */}
      <div
        style={{
          borderRadius: 18,
          padding: "28px 28px 24px",
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          position: "relative",
          overflow: "hidden",
          minHeight: 120,
        }}
      >
        {/* Subtle top edge highlight */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(155,77,188,0.30), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Loading state */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {/* Pulsing dots */}
              <div style={{ display: "flex", gap: 6 }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "rgba(155,77,188,0.45)",
                      animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.22)",
                }}
              >
                Cargando comentarios…
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cusdis mount point */}
        <div
          ref={containerRef}
          id="cusdis_thread"
          data-host="https://cusdis.com"
          data-app-id={APP_ID}
          data-page-id={pageId}
          data-page-url={pageUrl}
          data-page-title={pageTitle}
          data-theme="dark"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </motion.section>
  )
}
