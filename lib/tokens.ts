/**
 * GEKO MARKETING — Design Tokens (TypeScript)
 * Fuente única de verdad para valores de diseño usados en componentes.
 * Si cambias algo aquí → se propaga a todo el proyecto.
 *
 * Equivalentes CSS están en app/globals.css (@theme).
 * Estos tokens son para uso en inline styles y lógica de componentes.
 */

// ── Colores ────────────────────────────────────────────────────

export const COLORS = {
  // Marca principal
  purpleCore:  "#6B2D7C",   // CTAs primarios, borders activos, bg de acento
  purpleLight: "#9B4DBC",   // Labels, tags, texto de acento, iconos
  purpleDark:  "#4A1F57",   // Hover de CTAs, sombras

  // Azul complementario
  blueCore:    "#1D4ED8",   // Secundario en gradientes
  blueLight:   "#3B82F6",   // Hover states, highlights, links

  // Funcionales (solo para estados semánticos — nunca decorativos)
  emerald:     "#10B981",   // Éxito, métricas positivas, live indicators
  amber:       "#F59E0B",   // Advertencias suaves, próximamente
  red:         "#EF4444",   // Errores de formulario únicamente

  // Backgrounds dark (jerarquía de profundidad)
  bgBase:      "#080810",   // Level 0 — fondo de página
  bgElevated:  "#0d0d1a",   // Level 1 — cards, paneles, modales
  bgFloat:     "#12121f",   // Level 2 — tooltips, dropdowns
} as const

// ── Gradientes ─────────────────────────────────────────────────

export const GRADIENTS = {
  // Para botones, backgrounds, overlays de impacto
  brand:    "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
  brandRev: "linear-gradient(135deg, #1D4ED8 0%, #6B2D7C 100%)",

  // Para texto con gradiente (H2 de sección, solo la frase de mayor impacto)
  accent:   "linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%)",
  accentH:  "linear-gradient(90deg, #9B4DBC 0%, #3B82F6 100%)",

  // Para fondos sutiles de sección
  subtle:   "linear-gradient(135deg, rgba(107,45,124,0.06) 0%, rgba(29,78,216,0.06) 100%)",

  // Aurora del hero
  aurora:   "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(107,45,124,0.35) 0%, transparent 60%)",
} as const

// ── Opacidades de texto (dark mode) ───────────────────────────
// USAR SOLO ESTAS 3. No inventar nuevas.

export const TEXT_OPACITY = {
  primary:   "rgba(255,255,255,0.95)",  // Títulos, texto principal
  secondary: "rgba(255,255,255,0.55)",  // Párrafos, descripciones
  muted:     "rgba(255,255,255,0.35)",  // Timestamps, metadatos, placeholders
} as const

// ── Superficies y bordes ───────────────────────────────────────

export const SURFACE = {
  base:        "rgba(255,255,255,0.04)",  // Card background
  hover:       "rgba(255,255,255,0.07)",  // Card hover background
  borderBase:  "rgba(255,255,255,0.08)",  // Border estándar
  borderHover: "rgba(255,255,255,0.15)",  // Border en hover
} as const

// ── Border radius ──────────────────────────────────────────────
// USAR SOLO ESTOS VALORES. No inventar intermedios.

export const RADIUS = {
  sm:   6,     // Badges pequeños, tags inline
  md:   10,    // Botones, inputs, chips
  lg:   16,    // Cards estándar
  xl:   24,    // Cards grandes, modales
  full: 9999,  // Pills perfectamente redondeados
} as const

// ── Espaciado (grid 4px) ───────────────────────────────────────

export const SPACING = {
  // Padding de secciones
  sectionDesktop: 96,   // var(--space-24)
  sectionMobile:  64,   // var(--space-16)

  // Padding de cards
  cardDesktop: 24,      // var(--space-6)
  cardMobile:  16,      // var(--space-4)

  // Gaps entre cards en grid
  bentoCcompact: 12,    // bento asimétrico
  gridNormal:    16,    // grid uniforme
  listVertical:  24,    // lista de items
} as const

// ── Breakpoints ───────────────────────────────────────────────

export const BP = {
  sm:  "(min-width: 480px)",
  md:  "(min-width: 768px)",
  lg:  "(min-width: 1024px)",
  xl:  "(min-width: 1280px)",

  // Valores numéricos (para lógica JS)
  smPx:  480,
  mdPx:  768,
  lgPx:  1024,
  xlPx:  1280,
} as const

// ── Duraciones de transición CSS ──────────────────────────────

export const DURATION = {
  fast:   "150ms",   // Hover states, micro-interactions
  base:   "250ms",   // Transiciones UI estándar
  slow:   "400ms",   // Entradas de sección
  slower: "600ms",   // Cinematic / page-level
} as const

export const EASING = {
  smooth:  "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  out:     "cubic-bezier(0.0, 0.0, 0.2, 1)",
  spring:  "cubic-bezier(0.34, 1.56, 0.64, 1)",
  inOut:   "cubic-bezier(0.4, 0.0, 0.2, 1)",
} as const

// ── Sombras ───────────────────────────────────────────────────

export const SHADOWS = {
  sm:         "0 1px 2px rgba(0,0,0,0.12)",
  md:         "0 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)",
  lg:         "0 16px 32px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)",
  glowPurple: "0 0 40px rgba(107,45,124,0.4), 0 0 80px rgba(107,45,124,0.15)",
  glowBlue:   "0 0 40px rgba(29,78,216,0.4), 0 0 80px rgba(29,78,216,0.15)",
} as const

// ── Z-index scale ─────────────────────────────────────────────
// USAR SOLO ESTOS VALORES. Nunca hardcodear números sueltos.

export const Z = {
  base:     0,
  raised:   10,    // Back-to-top, cards elevadas
  dropdown: 100,   // Navbar fixed header
  sticky:   200,   // CTA sticky sidebar
  overlay:  400,   // Fondos de modal (semitransparentes)
  modal:    500,   // Modales, banners de cookie
  toast:    800,   // Notificaciones
  cursor:   900,   // Custom cursor
  loading:  9999,  // Loading screen (siempre encima de todo)
} as const

// ── Spring configs (Framer Motion) ────────────────────────────
// Reutilizar estos objetos en vez de hardcodear stiffness/damping.

export const SPRING = {
  gentle:  { stiffness: 120, damping: 14, mass: 1 },    // Parallax suave, hovers
  snappy:  { stiffness: 300, damping: 28, mass: 1 },    // CTAs, botones, scale
  bouncy:  { stiffness: 400, damping: 20, mass: 0.8 },  // Back-to-top, notifs
  slow:    { stiffness: 60,  damping: 20, mass: 1.2 },  // Texto, ilustraciones
  cursor:  { stiffness: 180, damping: 22, mass: 1 },    // Cursor ring
} as const

// ── Helpers ───────────────────────────────────────────────────

/** Genera CSS de transición estándar para propiedades de card */
export function cardTransition(
  props = "border-color, box-shadow, transform"
): string {
  return `${props} ${DURATION.base} ${EASING.smooth}`
}

/** CSS para texto con gradiente de marca */
export const gradientTextStyle = {
  background:              GRADIENTS.accent,
  WebkitBackgroundClip:    "text" as const,
  WebkitTextFillColor:     "transparent" as const,
  backgroundClip:          "text" as const,
} as const

/** CSS base para cualquier card Geko */
export const cardBaseStyle = {
  background:   SURFACE.base,
  border:       `1px solid ${SURFACE.borderBase}`,
  borderRadius: RADIUS.lg,
  transition:   cardTransition(),
} as const
