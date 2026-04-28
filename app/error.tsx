"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RotateCcw, Home } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#080810",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.25)",
            color: "#EF4444",
            marginBottom: 24,
          }}
        >
          <AlertTriangle size={28} />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--fg)",
            marginBottom: 12,
            letterSpacing: "-0.02em",
          }}
        >
          Algo salió mal
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          Ha ocurrido un error inesperado. Puedes intentar recargar la página o volver al inicio.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 10,
              background: "var(--gradient-brand)",
              border: "none",
              fontFamily: "var(--font-ui)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <RotateCcw size={16} />
            Intentar de nuevo
          </button>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 10,
              border: "1px solid var(--border-strong)",
              background: "var(--surface)",
              fontFamily: "var(--font-ui)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: "var(--fg)",
              textDecoration: "none",
            }}
          >
            <Home size={16} />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
