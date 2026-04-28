# GEKO MARKETING — Design System v1.0
> Creado: 2026-04-16. Fuente única de verdad para decisiones de diseño.
> **REGLA:** Nunca modificar componentes sin consultar este documento primero.

---

## 1. PERSONALIDAD DE MARCA

### Posición
Intermedia: ni agresiva ni corporativa. **Directa en resultados, premium en presentación.**

| ✅ Geko SÍ es | ❌ Geko NO es |
|--------------|--------------|
| Directa con números reales | Alarmista / urgencia falsa |
| Confiada y segura | Prepotente o arrogante |
| Accesible sin ser barata | Genérica o intercambiable |
| Orientada a ROI medible | Promesas sin respaldo |
| Humana y cercana | Fría o corporativa |

### Tono de voz
| Contexto | Tono |
|----------|------|
| Headlines | Potente, directo, con datos cuando hay |
| Cuerpo de texto | Conversacional, claro, sin jerga |
| CTAs | Acción clara, sin presión artificial |
| Blog | Experto pero accesible para pymes |
| Errores / vacíos | Amable, nunca técnico |

### Lo que NUNCA escribimos
- "Revolucionario / disruptivo / innovador" (vacío)
- "Soluciones integrales a medida" (sin contexto)
- Urgencia falsa ("¡Solo quedan X horas!")
- Promesas sin datos ("los mejores resultados de...")

### Eslogan — FIJO, no tocar
> **"Transformamos seguidores en clientes reales."**

---

## 2. IDENTIDAD VISUAL

### Logotipo — versiones
| Versión | Cuándo usar |
|---------|-------------|
| Cabeza gecko sola | Favicon, icono app, marcadores, avatares |
| Geko + cabeza | Navbar, cards pequeñas, badges |
| Geko Marketing + cabeza | Header, documentos, footer, OG images |

**Reglas de logo:**
- Nunca deformar, rotar ni aplicar efectos al logo
- Espacio mínimo libre: equivalente a la altura de la "G" en todos los lados
- Sobre fondos oscuros: versión blanca (`white-minimal-clean.svg`)
- Sobre fondos claros o morados: versión oscura / color

---

## 3. SISTEMA DE COLOR

### Paleta primaria — jerarquía fija

```
Purple Core   #6B2D7C  → CTAs primarios, borders activos, bg de acento OSCURO
Purple Light  #9B4DBC  → Labels, tags, texto de acento, iconos sobre dark, hover highlights
Blue Core     #1D4ED8  → Secundario, combinado en gradientes
Blue Light    #3B82F6  → Hover states, highlights en UI, links
```

> ⚠️ CRÍTICO: `#6B2D7C` y `#9B4DBC` NO son intercambiables.
> Purple Core es el color de marca (más oscuro, más peso).
> Purple Light es el acento decorativo (más claro, más sutil).

### Tercer color — acento funcional (solo para estados semánticos)

```
Emerald   #10B981  → Métricas positivas ✓, checkmarks, estado "live", crecimiento
Amber     #F59E0B  → Próximamente, avisos suaves, deadlines
Red       #EF4444  → Errores de formulario ÚNICAMENTE
```

> Regla: estos colores son **funcionales**, nunca decorativos.
> Nunca usarlos en backgrounds grandes ni en gradientes de marca.

### Gradientes de marca

```css
--gradient-brand:   linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%);
--gradient-brand-r: linear-gradient(135deg, #1D4ED8 0%, #6B2D7C 100%);
--gradient-accent:  linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%);  /* para texto gradient */
--gradient-aurora:  radial-gradient(ellipse 80% 50% at 50% -20%, rgba(107,45,124,0.35) 0%, transparent 60%);
--gradient-subtle:  linear-gradient(135deg, rgba(107,45,124,0.06) 0%, rgba(29,78,216,0.06) 100%);
```

> `--gradient-brand`: botones, backgrounds, overlays de impacto (Purple Core → Blue Core)
> `--gradient-accent`: texto con gradiente, labels decorativos (Purple Light → Blue Light)
> Nunca mezclar un gradient-brand con gradient-accent — jerarquía diferente.

### Backgrounds dark — jerarquía de profundidad

```
Level 0 — Base:     #080810  → Fondo de página (body)
Level 1 — Elevated: #0d0d1a  → Cards, paneles, modales, drawers
Level 2 — Float:    #12121f  → Tooltips, dropdowns, popovers flotantes
Level 3 — Overlay:  rgba(8,8,16,0.92) + blur(20px) → Navbar, glass overlays
```

### Opacidades de texto (dark mode)

```
--fg:           rgba(255,255,255,0.95)  → Títulos H1-H2, texto principal
--fg-secondary: rgba(255,255,255,0.55)  → Párrafos, descripciones de card
--fg-muted:     rgba(255,255,255,0.35)  → Timestamps, metadatos, placeholders
```

### Bordes y superficies

```
--border:        rgba(255,255,255,0.08)  → Borde base de cards y dividers
--border-hover:  rgba(255,255,255,0.15)  → Al hacer hover en cards
--surface:       rgba(255,255,255,0.04)  → Background de card base
--surface-hover: rgba(255,255,255,0.07)  → Background card en hover
```

---

## 4. TIPOGRAFÍA

### Stack de fuentes

```
Headings:  Bricolage Grotesque Variable  → var(--font-heading)
UI/Labels: Geist Variable                → var(--font-ui)
Body:      Geist Variable                → var(--font-body)
```

> ⚠️ Satoshi ELIMINADA del sistema: declarada pero no importada → se unifica con Geist Variable.
> Body y UI usan la misma fuente (Geist), diferenciados por peso y tracking.

### Escala tipográfica fluida (clamp)

```
xs:   clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem)   → 12-14px
sm:   clamp(0.875rem, 0.82rem + 0.28vw, 1rem)        → 14-16px
base: clamp(1rem,     0.95rem + 0.25vw, 1.125rem)    → 16-18px
lg:   clamp(1.125rem, 1.05rem + 0.38vw, 1.25rem)     → 18-20px
xl:   clamp(1.25rem,  1.1rem  + 0.75vw, 1.5rem)      → 20-24px
2xl:  clamp(1.5rem,   1.25rem + 1.25vw, 2rem)        → 24-32px
3xl:  clamp(1.875rem, 1.4rem  + 2.38vw, 3rem)        → 30-48px
4xl:  clamp(2.25rem,  1.5rem  + 3.75vw, 4rem)        → 36-64px
5xl:  clamp(3rem,     2rem    + 5vw,    5.5rem)       → 48-88px
6xl:  clamp(3.75rem,  2.5rem  + 6.25vw, 7rem)        → 60-112px
```

### Reglas por elemento

| Elemento | Font | Weight | Letter-spacing | Line-height |
|----------|------|--------|----------------|-------------|
| H1 hero | heading | 800 | -0.04em | 1.0 |
| H1 página | heading | 800 | -0.035em | 1.05 |
| H2 sección | heading | 800 | -0.03em | 1.05 |
| H3 card | heading | 700 | -0.02em | 1.1 |
| H4 subsección | heading | 600 | -0.01em | 1.2 |
| Body large | body (Geist) | 400 | 0 | 1.65 |
| Body | body (Geist) | 400 | 0 | 1.65 |
| Label / tag | ui (Geist) | 500 | 0.08-0.12em | 1.3 |
| Caption | ui (Geist) | 400 | 0.04em | 1.4 |
| Button | ui (Geist) | 600 | 0.01em | 1 |
| Stat/número | heading | 700-800 | -0.02em | 1 |

### Texto con gradiente — regla estricta

```css
/* SOLO en: la palabra/frase de mayor impacto en el H2 de cada sección */
/* NUNCA en: body text, labels, botones, H3, captions */
background: linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### Longitud de línea máxima

```
Prose (artículos blog): max-width: 680px
Subtítulos de hero:     max-width: 560px
Copy de sección:        max-width: 480px
Labels / caps:          sin límite (son cortos por naturaleza)
```

---

## 5. ESPACIADO Y LAYOUT

### Contenedores

```
section-container: max-width 1200px + padding clamp(16px, 5vw, 80px)
prose-container:   max-width 680px
narrow-container:  max-width 480px (forms, dialogs)
```

### Padding de secciones — regla universal

```
Desktop: padding-top/bottom: var(--space-24) = 96px
Mobile:  padding-top/bottom: var(--space-16) = 64px
```

> NUNCA valores hardcodeados como `paddingTop: 96`. Usar siempre `var(--space-24)`.

### Gaps entre cards

```
Bento asimétrico compacto: 12px
Grid uniforme:              16px
Lista vertical de items:    24px
Secciones entre sí:         clamp(64px, 10vw, 120px)
```

---

## 6. COMPONENTES — REGLAS UNIVERSALES

### Card base

```css
background:    rgba(255,255,255,0.04);         /* --surface */
border:        1px solid rgba(255,255,255,0.08); /* --border */
border-radius: var(--radius-lg);               /* 16px */
transition:    border-color 250ms ease, box-shadow 250ms ease, transform 200ms ease;

/* Hover */
border-color:  rgba(255,255,255,0.15);         /* --border-hover */
box-shadow:    0 8px 32px rgba(0,0,0,0.3);
transform:     translateY(-2px);
```

### SpotlightCard (bento grid interactivo)
- El radial gradient sigue al cursor (estilo Tailwind.css.com)
- Glow del color propio del servicio al hover (no purple genérico)
- Las animaciones internas (dashboards, counters) se ACTIVAN al entrar el cursor
- Al salir: reset suave, no corte brusco

### Labels / Tags (pill)

```css
padding:          4px 12px;
border-radius:    9999px;
background:       rgba(107,45,124,0.12);  /* Purple Core al 12% */
border:           1px solid rgba(107,45,124,0.25);
font-family:      var(--font-ui);
font-size:        var(--text-xs);
font-weight:      500;
letter-spacing:   0.08em;
text-transform:   uppercase;
color:            #9B4DBC;  /* Purple Light siempre */
```

### Botones

```
Primary:     bg gradient-brand + text white + hover: brightness(1.1) + shadow glow-purple
Secondary:   border rgba(255,255,255,0.15) + hover: border 0.25 + bg surface
Ghost:       no border, text fg-secondary, hover: text fg + bg surface
Destructive: rojo, solo para acciones irreversibles
```

### Iconos — reglas estrictas

```
Librería:     Lucide React ÚNICAMENTE
stroke-width: 1.5 siempre (nunca 2 — demasiado grueso, nunca 1 — demasiado fino)
Tamaños:      14px inline · 16px label · 20px card · 24px standalone · 32px featured
Color:        Heredar del texto padre, o Purple Light (#9B4DBC) para íconos de acento
Emojis:       PROHIBIDOS como elementos de UI. Solo en copy conversacional si hay razón editorial.
```

### Valores / features (antes usaban emojis — ahora iconos Lucide)

```tsx
// ✅ Correcto
{ icon: "Target",      title: "Orientados a resultados" }
{ icon: "Eye",         title: "Transparencia total" }
{ icon: "Zap",         title: "Ejecución rápida" }
{ icon: "RefreshCcw",  title: "Adaptabilidad" }

// ❌ Prohibido
{ emoji: "🎯", title: "Orientados a resultados" }
```

---

## 7. ANIMACIONES — SISTEMA UNIFICADO

### lib/animations.ts — constantes globales (NO copiar EASE en cada componente)

```typescript
import type { Variants } from "framer-motion"

// ── Easings
export const EASE_SMOOTH:  [number,number,number,number] = [0.25, 0.46, 0.45, 0.94]
export const EASE_OUT:     [number,number,number,number] = [0.0,  0.0,  0.2,  1.0]
export const EASE_SPRING:  [number,number,number,number] = [0.34, 1.56, 0.64, 1.0]
export const EASE_IN_OUT:  [number,number,number,number] = [0.4,  0.0,  0.2,  1.0]

// ── Duraciones (en segundos para Framer Motion)
export const DUR_FAST   = 0.15   // hover states, micro-interactions
export const DUR_BASE   = 0.25   // transiciones UI estándar
export const DUR_SLOW   = 0.45   // entradas de sección
export const DUR_SLOWER = 0.65   // animaciones de página / cinematic

// ── Variantes reutilizables
export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,
    transition: { duration: DUR_SLOW, ease: EASE_SMOOTH } }
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { duration: DUR_BASE, ease: EASE_OUT } }
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 } }
}

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0,
    transition: { duration: DUR_SLOW, ease: EASE_SMOOTH } }
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } }
}
```

### Qué usar cuándo

| Caso de uso | Herramienta |
|------------|-------------|
| Hover, active, focus básico | CSS transition |
| Entrada de sección al scroll | Framer Motion + useInView |
| Mount / unmount de componentes | Framer Motion AnimatePresence |
| Scroll timeline complejo | GSAP + ScrollTrigger |
| Horizontal scroll pinneado (servicios) | GSAP + ScrollTrigger |
| State machines, personajes SVG | Rive |

### Reglas absolutas (no negociables)

1. **SOLO** animar: `transform`, `opacity`, `filter` — GPU composited
2. **NUNCA** animar: `width`, `height`, `top`, `margin`, `padding` — causa layout thrashing
3. **SIEMPRE** importar `useReducedMotion()` en componentes con animaciones de entrada
4. GSAP: siempre `gsap.context()` + `ctx.revert()` en cleanup del useEffect
5. **NUNCA** `document.querySelector` en React — siempre `useRef`
6. **NUNCA** crear timelines GSAP en el render — solo dentro de `useEffect`
7. `will-change: transform` solo justo antes de animar, nunca de forma permanente

---

## 8. EFECTOS ESPECIALES

### Cinema intro (home page)

```
Comportamiento:
1. Página carga → overlay oscuro cubre todo (opacity: 1)
2. Overlay hace fade-out en 600ms (ease-out)
3. Hero entra con stagger: título (delay 0.1) → subtitle (0.25) → CTAs (0.4)
4. El resto de secciones usa useInView normal (no afectado)

Compatibilidad con skeletons: ✅ TOTALMENTE COMPATIBLE
- Los skeletons aparecen detrás del overlay mientras carga el contenido
- El cinema cubre el flash del primer render
- Resultado: transición limpia sin flashes de UI
```

### Skeleton loaders — estilo

```css
/* Shimmer animation */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 0%,
    rgba(255,255,255,0.08) 50%,
    rgba(255,255,255,0.04) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: /* igual que el componente real */;
}
```

> Nunca combinar skeleton + spinner. Uno o el otro.

### GSAP Horizontal scroll (páginas de servicio)

```typescript
// Configuración estándar
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: containerRef.current,
    pin: true,
    scrub: 1.2,          // suave pero responsivo
    snap: 1 / (sections.length - 1),
    end: () => `+=${containerRef.current!.offsetWidth}`,
    invalidateOnRefresh: true,  // obligatorio para resize
  }
})

// Integración con Lenis (obligatoria)
lenis.on("scroll", ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### Gecko cursor (solo desktop, solo service cards)

```
- El gecko customCursor global se DESACTIVA
- El componente GeckoCursor se activa SOLO al hacer hover en SpotlightCards
- Posición: fixed, sigue al cursor con spring (stiffness: 500, damping: 28)
- Aparece con fade-in al entrar a la card, fade-out al salir
- En mobile: NUNCA. Eliminado completamente por breakpoint.
```

---

## 9. SECCIONES — COPY Y ESTRUCTURA

### Hero — 3 propuestas (elegir una, iterar en playground)

**Opción A — Orientada al resultado directo:**
```
Tag:      Agencia de marketing digital · Tres Cantos, Madrid
H1:       "Tu negocio merece crecer.
           Nosotros hacemos que pase."
Sub:      Gestión de redes, branding y webs que convierten visitantes en clientes.
          Sin humo. Con datos.
CTA 1:    Empieza gratis →         (→ /contacto o Calendly)
CTA 2:    Ver cómo trabajamos      (→ smooth scroll a #proceso)
```

**Opción B — Orientada al problema del cliente:**
```
Tag:      Agencia de marketing digital · Tres Cantos, Madrid
H1:       "Cada día sin estrategia digital
           es un cliente que se va a tu competencia."
Sub:      Geko convierte tu presencia online en tu canal de ventas más rentable.
CTA 1:    Quiero resultados →
CTA 2:    Conocer el método
```

**Opción C — Orientada al diferencial de la agencia:**
```
Tag:      Agencia de marketing digital · Tres Cantos, Madrid
H1:       "Marketing digital que se mide
           en euros, no en likes."
Sub:      Estrategia, contenido y campañas para negocios que quieren crecer de verdad.
CTA 1:    Ver servicios →
CTA 2:    Reservar diagnóstico gratis
```

### Servicios — Copy mejorado

```
Tag:      Servicios
H2:       "Tres armas. Un objetivo:"
Gradient: "que te encuentren, te elijan y vuelvan."
```

### Dolor-Solución — Copy mejorado

```
Tag:      ¿Te suena esto?
H2:       "Llevas meses publicando
           y sigues sin ver resultados."
Sub:      No es culpa tuya. Es que el marketing digital sin estrategia es ruido.
          Nosotros convertimos ese ruido en ventas.
```

### Nosotros — Historia de la agencia (propuesta)

```
Geko nació de la frustración de ver cómo negocios con productos
increíbles perdían clientes ante competidores con peor producto
pero mejor presencia digital.

Somos un equipo de 4 obsesionados con una cosa: que cada euro
que inviertes en marketing digital se convierta en algo medible.
Sin promesas vacías. Solo estrategia, ejecución y resultados reales.

El gecko no es un animal llamativo. Es uno de los más adaptables
del planeta. Eso somos nosotros para tu negocio.
```

---

## 10. ESTRUCTURA DE PÁGINAS

### /nosotros — Decisión: UNA sola página (no dividir)

**Por qué una sola:**
- Con 4 personas en el equipo, /historia y /equipo quedarían muy cortas
- Mejor UX: una historia continua que fluye de presentación → equipo → valores → CTA
- Menos páginas vacías que indexar

**Estructura de /nosotros:**
1. Hero → headline + párrafo de historia (copy propuesto arriba)
2. Misión + números de impacto (ficticios hasta tener reales)
3. Equipo → 4 cards con foto + nombre + rol + frase + redes
4. Valores → 4 items con icono Lucide (Target, Eye, Zap, RefreshCcw)
5. Timeline / proceso de la agencia (opcional con GSAP horizontal)
6. CTA final → "Trabajemos juntos"

### /servicios/[slug] — Personalidad propia por servicio

```
gestion-redes:  Energía, movimiento, colores vibrantes (morado + azul intenso),
                dashboards animados, notificaciones en tiempo real
branding:       Elegante, espacio en blanco generoso, tipografía como protagonista,
                paletas de color como elemento visual, before/after de identidades
paginas-web:    Técnico-premium, métricas de performance animadas, código como arte,
                velocidades en números reales, comparativas visual
```

**Layout propuesto para cada página de servicio:**
1. Hero específico del servicio (headline propio + visual único)
2. Problema que resuelve (3 puntos de dolor concretos)
3. Cómo lo hacemos (horizontal scroll GSAP con las fases del proceso)
4. Resultados / casos de éxito (números animados)
5. Paquetes de precio
6. FAQ específica del servicio
7. CTA final

---

## 11. MOBILE — REGLAS ESPECÍFICAS

### Breakpoints

```
Mobile:  < 640px   → diseño base, una columna, padding 16px
Tablet:  640-1024px → transición, 2 columnas cuando tiene sentido
Desktop: > 1024px   → diseño completo
```

### Reglas críticas mobile

- Padding horizontal MÍNIMO: 16px en todos los contenedores, siempre
- Texto: nunca menor de `var(--text-sm)` (14-16px)
- `overflow-x: hidden` en body y `.section-container` siempre
- Cards: full-width en mobile salvo excepciones justificadas
- Animaciones: reducir `duration` un 20-30% en mobile (más ágil)
- Custom cursor: DESACTIVADO en mobile completamente

### Menú mobile — diseño actualizado

```
Contenedor:
  background:        rgba(6,6,14,0.95)
  backdrop-filter:   blur(20px) saturate(180%)  ← glass effect
  border-top:        1px solid rgba(255,255,255,0.06)

Estado activo del link — NUEVO (no borde izquierdo):
  background:        rgba(107,45,124,0.14)
  border:            1px solid rgba(107,45,124,0.28)
  border-radius:     10px  ← pill que envuelve el link entero
  color:             rgba(255,255,255,0.96)
  font-weight:       600

Estado inactivo:
  background:        transparent
  border:            1px solid transparent
  color:             rgba(255,255,255,0.55)
  font-weight:       400
```

---

## 12. PENDIENTES — RECORDATORIOS ACTIVOS

| Item | Estado | Prioridad |
|------|--------|-----------|
| Fotos equipo (4 personas: nombre, rol, frase, redes) | Pendiente de Mikel | Alta |
| Datos reales ROI calculator | Pendiente de cliente | Media |
| Verificar formulario contacto + Resend | Por verificar | Alta |
| Arreglar Cusdis comments (roto en dev y prod) | Por arreglar | Media |
| 12 artículos blog → generar con otra IA + revisar | Pendiente | Media |
| Configurar NEXT_PUBLIC_SENTRY_DSN en .env.local | Pendiente | Alta |
| Casos de éxito reales con datos del cliente | Pendiente de cliente | Media |
| Hero v2 y v3 en playground para comparar | Por crear | Alta |
| Páginas servicio v2 (gestion-redes-v2, etc.) | Por crear | Alta |
| Fix overflow texto mobile en servicio-highlight | Por revisar en dispositivo | Media |

---

## 13. DECISIONES TOMADAS — NO REVERTIR

| Decisión | Razón |
|----------|-------|
| GSAP se mantiene en el stack | Se usará para horizontal scroll y efectos avanzados |
| Satoshi eliminada → Geist Variable para body | No estaba importada, incoherencia |
| Emojis → iconos Lucide en values/features | Inconsistente con el resto de la UI |
| Custom cursor gecko → solo en service cards | En mobile no tiene sentido |
| /nosotros como página única | El equipo es pequeño aún para dividir |
| Calendly URL fija: https://calendly.com/info-gekomarketing/30min | Ya verificada |
