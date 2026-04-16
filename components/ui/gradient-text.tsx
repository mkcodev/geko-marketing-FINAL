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
  brand:   "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
  accent:  "linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%)",
  reverse: "linear-gradient(135deg, #1D4ED8 0%, #6B2D7C 100%)",
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
