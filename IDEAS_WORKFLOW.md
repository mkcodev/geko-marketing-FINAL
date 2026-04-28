# Lluvia de Ideas — Flujo de Trabajo Perfecto con Claude Code

> Preparado en sesión 2026-04-15. Ideas para llevar el workflow al siguiente nivel.

---

## PREGUNTAS QUE QUIERO HACERTE

Antes de continuar, necesito tus respuestas para optimizar aún más:

### Sobre el Proyecto Geko

1. **¿Cuántas páginas tiene el proyecto actualmente?** (home, about, servicios, blog, contacto, ¿cuáles más?)
2. **¿Hay formulario de contacto funcionando?** ¿Usa Resend ya para enviar emails o está pendiente?
3. **¿Tienes un sistema de CMS activo en Keystatic?** ¿Hay contenido real o solo datos de prueba?
4. **¿Usas Remotion para algo concreto?** ¿Qué tipo de videos genera?
5. **¿Hay analytics configurados?** (Google Analytics, Plausible, Vercel Analytics...)
6. **¿Cuál es el mayor dolor que tienes hoy en el workflow?** (lo que más tiempo te quita)
7. **¿Trabajas con clientes que revisan el proyecto?** ¿O es solo para tu uso interno?

### Sobre Herramientas

8. **¿Tienes Supabase configurado en geko-marketing?** ¿O solo en otros proyectos?
9. **¿Usas Linear, Notion o alguna herramienta de gestión de tareas?** (podríamos conectarlo via MCP)
10. **¿Tienes dominio custom en Vercel apuntado a geko-marketing ya?** ¿Cuál es?
11. **¿Qué IDE usas?** (VS Code, Cursor, otro) — hay integraciones específicas que podría configurar
12. **¿Usas GitHub Actions?** ¿O solo el CI de Vercel?

---

## IDEAS CLASIFICADAS POR IMPACTO

### 🔥 ALTA PRIORIDAD — Mayor impacto inmediato

#### 1. Hooks de Calidad Automáticos (git)
Pre-commit hooks con Husky + lint-staged que ejecutan automáticamente:
- `pnpm tsc --noEmit` (no commitear con errores de tipos)
- `pnpm lint` (ESLint)
- Prettier en archivos cambiados (no en todo el proyecto)

```bash
pnpm add -D husky lint-staged
# Resultado: cada commit es válido antes de llegar a Vercel
```

**Por qué**: Evitas builds rotos en Vercel, el sistema más barato de CI.

#### 2. Vercel Preview Automático en cada PR
Ya lo tienes si usas `git push` → Vercel crea preview URLs automáticamente. Pero podemos mejorar:
- Configurar **Branch Protection** en GitHub (require preview deploy success)
- Añadir **comentario automático en PR** con la URL de preview y Lighthouse score

#### 3. Script de Scaffold Rápido
Un script `pnpm create-section [name]` que crea en un comando:
- `app/[name]/page.tsx` (RSC con metadata)
- `app/[name]/loading.tsx`
- `app/[name]/error.tsx`
- `components/sections/[Name]Section.tsx`

**Por qué**: Ahorra 10 minutos de setup repetitivo por sección nueva.

#### 4. Error Monitoring con Sentry (recordatorio pendiente)
Sentry captura errores en producción con stack traces completos.
- Costo: gratuito hasta 5K errores/mes
- Setup: 15 minutos
- Valor: sabes exactamente qué falla, cuándo, en qué navegador

```bash
pnpm add @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

#### 5. Variables de Entorno Validadas en Arranque
Ya tenemos la regla, pero si no lo tienes implementado:
```ts
// lib/env.ts — crash informativo si falta alguna
import { z } from 'zod'
export const env = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  RESEND_API_KEY: z.string().startsWith('re_'),
}).parse(process.env)
```
Esto evita bugs silenciosos donde algo falla porque faltó configurar una variable en Vercel.

---

### ⚡ MEDIA PRIORIDAD — Mejoras de calidad de vida

#### 6. Storybook para Componentes
Documentación visual de todos los componentes con variantes.
- Ver el Button en dark/light, con todas las variantes
- Testear accesibilidad con @storybook/addon-a11y
- Compartir con clientes para feedback visual

**Cuando tiene sentido**: cuando hay >10 componentes reutilizables.

#### 7. Plausible Analytics (alternativa a GA)
- Privacy-first (sin cookies, GDPR sin banner)
- Dashboard simple y bonito
- Desde 9$/mes o self-hosted gratis
- Script <1KB (no afecta Core Web Vitals)

#### 8. Bundle Analyzer Integrado
```bash
# next.config.ts — añadir @next/bundle-analyzer
# pnpm add @next/bundle-analyzer
ANALYZE=true pnpm build
# Abre visor visual del bundle — qué pesa qué
```

#### 9. Playwright Tests de Golden Path
Aunque no hacemos TDD (no tiene sentido en este stack), sí tiene sentido un E2E que verifique:
- La home carga y tiene contenido
- El formulario de contacto envía sin errores
- Las rutas principales responden con 200

```bash
pnpm add -D @playwright/test
# Ejecutar en CI de Vercel como check de preview
```

#### 10. Rehacemos el AGENTS.md del Proyecto
El actual está bien, pero podríamos añadir:
- Guía de cuándo usar cada librería de animación con ejemplos del proyecto real
- Componentes que ya existen (no recrear lo que hay)
- Paleta de colores actual en HEX/oklch

---

### 🌟 IDEAS AVANZADAS — El próximo nivel

#### 11. Multi-Agent Workflow para Features Grandes
Cuando necesitas implementar una feature compleja (ej: blog completo con Keystatic + MDX + SEO):
```
/multi-plan → plan la feature
/multi-frontend → implementa UI
/multi-backend → implementa CMS/API
# Los tres corren en paralelo y se coordinan
```

#### 12. Automated Accessibility Testing en CI
Añadir axe-core a los Playwright tests:
```ts
import { checkA11y } from 'axe-playwright'
// Verifica WCAG en cada PR automáticamente
```

#### 13. Design Tokens desde Figma/Stitch
Si tienes diseños en Stitch, exportar tokens a CSS:
- Usar Style Dictionary para generar el @theme de Tailwind v4
- Single source of truth: cambias en diseño → se actualiza en código

#### 14. Keystatic Admin Panel en /admin
Keystatic ya incluye un panel de administración:
- Gestionar contenido del blog sin tocar código
- Editar textos de la web visualmente
- Deploy automático cuando publicas desde el CMS

#### 15. Remotion → OG Images Dinámicas
Usar Remotion para generar imágenes OG (Open Graph) dinámicas por ruta:
```tsx
// app/api/og/route.tsx — genera imágenes OG únicas para cada página/post
import { ImageResponse } from 'next/og'
// Usar el mismo branding que la web, generado en tiempo real
```

#### 16. Cron Jobs para Revalidación Automática
Si el sitio tiene contenido que cambia (ej: blog de Keystatic):
```ts
// Vercel Cron: revalidar cache cada 24h
// No necesita que nadie manualmente haga "deploy"
```

---

## AUTOMATIZACIONES PENDIENTES DE ACTIVAR

### Ya configuradas pero sin activar:
- **MCP Vercel**: token configurado → probar `/deploy` para ver estado de deployments
- **MCP GitHub**: token configurado → automatizar issues, PRs
- **MCP Exa**: API key configurada → research automático antes de implementar

### Por configurar:
- **Vercel Cron Jobs**: revalidación automática del cache
- **GitHub Actions**: Lighthouse report en cada PR
- **Husky**: quality gate antes de cada commit

---

## RESUMEN DE PREGUNTAS PRIORITARIAS

De todas las preguntas, las más importantes para mejorar tu workflow HOY:

1. **¿Cuál es tu mayor dolor actual?** (respuesta directa sin elaborar)
2. **¿Tienes Husky/lint-staged?** Si no → instalarlo es el mayor ROI
3. **¿El formulario de contacto funciona?** Si no → siguiente tarea concreta
4. **¿Qué es lo próximo que vas a construir en geko-marketing?** → puedo preparar el scaffold perfecto

---

*Este documento es temporal — una vez respondas las preguntas, lo archivamos y ejecutamos.*
