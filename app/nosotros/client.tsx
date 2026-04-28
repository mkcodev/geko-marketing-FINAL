"use client"

import { Target, Users2, Zap, Repeat2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { CtaFinal } from "@/components/sections/cta-final"
import { Label } from "@/components/ui/label"
import { useT } from "@/hooks/use-translations"

const VALUE_META: { icon: LucideIcon; color: string; bg: string; border: string }[] = [
  { icon: Target,  color: "var(--color-geko-purple-accent)", bg: "var(--color-geko-purple-a08)",  border: "var(--color-geko-purple-a18)" },
  { icon: Users2,  color: "var(--color-geko-blue-light)", bg: "var(--color-geko-blue-a08)",   border: "var(--color-geko-blue-a18)" },
  { icon: Zap,     color: "#F59E0B", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.18)" },
  { icon: Repeat2, color: "#10B981", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.18)" },
]

export function NosotrosClient() {
  const t = useT()

  return (
    <>
      {/* Hero */}
      <div className="section-container" style={{ paddingTop: "var(--section-padding-tight)", paddingBottom: "var(--section-padding-tight)" }}>
        <div style={{ marginBottom: 20 }}>
          <Label>{t.about.label}</Label>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.25rem, 5vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            marginBottom: 24,
            maxWidth: 640,
          }}
        >
          {t.about.headline}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.125rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.75,
            maxWidth: 580,
            marginBottom: 48,
          }}
        >
          {t.about.subheadline}
        </p>

        {/* Mission */}
        <blockquote
          style={{
            padding: "32px",
            borderRadius: 20,
            background: "var(--surface)",
            border: "1px solid var(--border-subtle)",
            borderLeft: "3px solid var(--color-geko-purple-a50)",
            maxWidth: 720,
            marginBottom: 64,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              color: "var(--fg-secondary)",
              lineHeight: 1.8,
              fontStyle: "italic",
              margin: 0,
            }}
          >
            &ldquo;{t.about.mission.text}&rdquo;
          </p>
        </blockquote>

        {/* Values */}
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700,
            color: "var(--fg)",
            letterSpacing: "-0.02em",
            marginBottom: 32,
          }}
        >
          {t.about.values.headline}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 64,
          }}
        >
          {t.about.values.items.map((v, i) => {
            const meta = VALUE_META[i]
            const Icon = meta.icon
            return (
              <div
                key={v.title}
                style={{
                  padding: "24px",
                  borderRadius: 16,
                  background: "var(--surface)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: meta.bg,
                    border: `1px solid ${meta.border}`,
                    color: meta.color,
                    marginBottom: 16,
                  }}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.0625rem",
                    fontWeight: 700,
                    color: "var(--fg)",
                    marginBottom: 8,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    color: "var(--fg-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {v.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <CtaFinal />
    </>
  )
}
