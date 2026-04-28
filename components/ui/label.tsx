import type { ReactNode, CSSProperties } from "react"

interface LabelProps {
  children: ReactNode
  /** "purple" = acento de marca (default) | "blue" = azul | "emerald" | "amber" | "muted" */
  color?: "purple" | "blue" | "emerald" | "amber" | "muted"
  className?: string
  style?: CSSProperties
}

const COLOR_MAP = {
  purple:  { text: "var(--color-geko-purple-accent)", bg: "var(--color-geko-purple-a10)", border: "var(--color-geko-purple-a20)" },
  blue:    { text: "var(--color-geko-blue-light)", bg: "var(--color-geko-blue-a10)",  border: "var(--color-geko-blue-a20)"  },
  emerald: { text: "#10B981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.20)" },
  amber:   { text: "#F59E0B", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.20)" },
  muted:   { text: "var(--fg-muted)", bg: "var(--surface)", border: "var(--border)" },
} as const

/**
 * Pill/tag de sección — el "Servicios", "ROI Calculator", "¿Te suena?" que aparece
 * encima de títulos. Fuente UI, uppercase, letra espaciada.
 *
 * Uso:
 * ```tsx
 * <Label>Resultados reales</Label>
 * <Label color="blue">Proceso</Label>
 * ```
 */
export function Label({ children, color = "purple", className, style }: LabelProps) {
  const { text, bg, border } = COLOR_MAP[color]

  return (
    <span
      className={className}
      style={{
        display:        "inline-block",
        padding:        "4px 14px",
        borderRadius:   9999,
        border:         `1px solid ${border}`,
        background:     bg,
        fontFamily:     "var(--font-ui)",
        fontSize:       "0.7rem",
        fontWeight:     600,
        letterSpacing:  "0.1em",
        textTransform:  "uppercase",
        color:          text,
        lineHeight:     1.5,
        ...style,
      }}
    >
      {children}
    </span>
  )
}
