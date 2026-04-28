# Geko Marketing — Agent Instructions

Leer `CLAUDE.md` para contexto completo antes de escribir código.

## Stack
Next.js 16.2.3 App Router · React 19 · TypeScript strict · Tailwind v4
Framer Motion 12.x (`"motion/react"`) · GSAP 3.14.x · Lenis · Radix UI

## Restricciones críticas
- Static export — SIN Server Actions, SIN ISR, SIN Route Handlers dinámicos
- Formularios: react-hook-form + Zod + fetch client-side
- Animaciones: NUNCA animar width/height/top/margin — solo transform/opacity/filter
- Lenis activo — NO `scroll-behavior: smooth` en CSS
- GIT: NUNCA git add/commit/push — el usuario gestiona git

## Agentes — solo para cambios significativos

| Cambio | Agentes |
|--------|---------|
| Componente nuevo o página | `ui-reviewer` + `nextjs-reviewer` |
| Animación compleja | `animation-specialist` |
| Page/layout/metadata | `nextjs-reviewer` + `seo-specialist` |
| Formulario | `security-reviewer` |
| Refactor grande | `refactor-cleaner` + `typescript-reviewer` |

**NO lanzar agentes para:** edits menores (<20 líneas), fix de colores/estilos, renombrar variables, ajustes de spacing. Solo para features completas o cambios de arquitectura.

Lanzar agentes independientes siempre en **paralelo**.

## Comandos
```bash
pnpm dev              # localhost:3000
pnpm tsc --noEmit     # verificar TypeScript (rápido)
pnpm format           # Prettier en todos los archivos modificados (al final de un bloque)
pnpm build            # solo cuando el usuario lo pida explícitamente
```
