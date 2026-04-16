import type { CSSProperties, ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  /** Padding vertical reducido en mobile automáticamente */
  spacing?: "normal" | "tight" | "none"
  /** Color/imagen de fondo opcional */
  background?: string
  borderTop?: boolean
  borderBottom?: boolean
  style?: CSSProperties
  id?: string
}

/**
 * Componente base para todas las secciones de página.
 * Gestiona el padding vertical responsive de forma centralizada.
 *
 * Uso:
 * ```tsx
 * <Section>
 *   <div className="section-container">...</div>
 * </Section>
 * ```
 */
export function Section({
  children,
  className,
  spacing = "normal",
  background,
  borderTop,
  borderBottom,
  style,
  id,
}: SectionProps) {
  const paddingMap = {
    normal: "var(--section-padding-v, clamp(64px, 10vw, 96px))",
    tight:  "var(--section-padding-tight, clamp(40px, 6vw, 64px))",
    none:   "0",
  }

  const padding = paddingMap[spacing]

  return (
    <section
      id={id}
      className={className}
      style={{
        paddingTop: padding,
        paddingBottom: padding,
        background,
        borderTop:    borderTop    ? "1px solid rgba(255,255,255,0.06)" : undefined,
        borderBottom: borderBottom ? "1px solid rgba(255,255,255,0.06)" : undefined,
        position: "relative",
        ...style,
      }}
    >
      {children}
    </section>
  )
}
