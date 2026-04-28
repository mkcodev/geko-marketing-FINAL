import type { ReactNode, ElementType, CSSProperties } from "react"

interface GradientTextProps {
  children: ReactNode
  /** Elemento HTML a renderizar (default: "span") */
  as?: ElementType
  /** "brand" = purple→blue (default) | "accent" = purpleLight→blueLight | "reverse" = blue→purple */
  variant?: "brand" | "accent" | "reverse"
  className?: string
  style?: CSSProperties
}

const GRADIENT_MAP = {
  brand:   "var(--gradient-brand)",
  accent:  "linear-gradient(135deg, var(--color-geko-purple-accent) 0%, var(--color-geko-blue-light) 100%)",
  reverse: "var(--gradient-brand-r)",
} as const

/**
 * Texto con gradiente de marca. Usar solo en la frase de mayor impacto de una sección.
 * NUNCA en párrafos completos ni en texto pequeño (<16px).
 *
 * Uso:
 * ```tsx
 * <h2>
 *   Tu marca,{" "}
 *   <GradientText>redefinida.</GradientText>
 * </h2>
 *
 * <GradientText as="h1" className="text-5xl font-bold">
 *   Resultados que se notan.
 * </GradientText>
 * ```
 */
export function GradientText({
  children,
  as: Tag = "span",
  variant = "accent",
  className,
  style,
}: GradientTextProps) {
  return (
    <Tag
      className={className}
      style={{
        background:           GRADIENT_MAP[variant],
        WebkitBackgroundClip: "text",
        WebkitTextFillColor:  "transparent",
        backgroundClip:       "text",
        display:              "inline",
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
