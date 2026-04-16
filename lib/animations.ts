import type { Variants } from "framer-motion"

// ── Easings ────────────────────────────────────────────────────
// Importar desde aquí. NUNCA copiar la constante en cada componente.
export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
export const EASE_OUT:    [number, number, number, number] = [0.0,  0.0,  0.2,  1.0]
export const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1.0]
export const EASE_IN_OUT: [number, number, number, number] = [0.4,  0.0,  0.2,  1.0]

// Alias para compatibilidad con código existente
export const EASE = EASE_SMOOTH

// ── Duraciones (segundos — para Framer Motion) ─────────────────
export const DUR_FAST   = 0.15  // hover states, micro-interactions
export const DUR_BASE   = 0.25  // transiciones UI estándar
export const DUR_SLOW   = 0.45  // entradas de sección
export const DUR_SLOWER = 0.65  // animaciones de página / cinematic

// ── Variantes reutilizables ────────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR_SLOW, ease: EASE_SMOOTH },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DUR_BASE, ease: EASE_OUT },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR_SLOW, ease: EASE_SMOOTH },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR_SLOW, ease: EASE_SMOOTH },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
}

// ── Variante de reducción de movimiento ───────────────────────
// Usar cuando el componente NO importa useReducedMotion directamente
export const noMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
}
