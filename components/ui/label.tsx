import type { ReactNode, CSSProperties } from "react"

interface LabelProps {
  children: ReactNode
  /** "purple" = acento de marca (default) | "blue" = azul | "emerald" | "amber" | "muted" */
  color?: "purple" | "blue" | "emerald" | "amber" | "muted"
  className?: string
  style?: CSSProperties
}

const COLOR_MAP = {
  purple:  { text: "#9B4DBC", bg: "rgba(107,45,124,0.10)", border: "rgba(107,45,124,0.20)" },
  blue:    { text: "#3B82F6", bg: "rgba(29,78,216,0.10)",  border: "rgba(29,78,216,0.20)"  },
  emerald: { text: "#10B981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.20)" },
  amber:   { text: "#F59E0B", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.20)" },
  muted:   { text: "rgba(255,255,255,0.40)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)" },
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
