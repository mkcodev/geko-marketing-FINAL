import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"
import type { ReactNode } from "react"

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{
        fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700,
        color: "var(--fg)", letterSpacing: "-0.01em", marginBottom: 12,
      }}>
        {title}
      </h2>
      <div style={{
        fontFamily: "var(--font-body)", fontSize: "0.9375rem",
        color: "var(--fg-secondary)", lineHeight: 1.75,
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {children}
      </div>
    </section>
  )
}

interface LegalHeaderProps {
  title: string
  breadcrumb: string
  updatedAt: string
}

export function LegalHeader({ title, breadcrumb, updatedAt }: LegalHeaderProps) {
  return (
    <div style={{ marginBottom: 48 }}>
      {/* Back nav + breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 32,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            fontFamily: "var(--font-ui)",
            fontSize: "0.8125rem",
            color: "var(--fg-secondary)",
            textDecoration: "none",
            transition: "border-color 0.2s, color 0.2s",
          }}
        >
          <ArrowLeft size={13} />
          Volver al inicio
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-ui)",
            fontSize: "0.8125rem",
            color: "var(--fg-subtle)",
          }}
        >
          <ChevronRight size={13} />
          <Link href="/" style={{ color: "var(--fg-muted)", textDecoration: "none" }}>
            Inicio
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: "var(--fg-secondary)" }}>{breadcrumb}</span>
        </div>
      </div>

      {/* Title block */}
      <h1
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.875rem, 3vw, 2.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "var(--fg)",
          marginBottom: 8,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "0.875rem",
          color: "var(--fg-muted)",
        }}
      >
        Última actualización: {updatedAt}
      </p>
    </div>
  )
}
