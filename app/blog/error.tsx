"use client"

import { useEffect } from "react"
import Link from "next/link"
import { FileX, RotateCcw, ArrowLeft } from "lucide-react"

export default function BlogError({
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
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "var(--color-geko-purple-a12)",
            border: "1px solid var(--color-geko-purple-a25)",
            color: "var(--color-geko-purple-accent)",
            marginBottom: 20,
          }}
        >
          <FileX size={24} />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--fg)",
            marginBottom: 10,
            letterSpacing: "-0.02em",
          }}
        >
          No se pudo cargar el blog
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9375rem",
            color: "var(--fg-muted)",
            lineHeight: 1.7,
            marginBottom: 28,
          }}
        >
          Ocurrió un error al cargar los artículos. Inténtalo de nuevo o vuelve al inicio.
        </p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "11px 22px",
              borderRadius: 10,
              background: "var(--gradient-brand)",
              border: "none",
              fontFamily: "var(--font-ui)",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <RotateCcw size={14} />
            Reintentar
          </button>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "11px 22px",
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              fontFamily: "var(--font-ui)",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--fg-secondary)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} />
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
