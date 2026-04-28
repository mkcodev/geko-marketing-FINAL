# Plan de Optimización — Geko Marketing
> Creado: 2026-04-15. Ejecutar en sesión nueva con contexto limpio.

## ESTADO ACTUAL (Audit)
- Performance: 7/10 — sin next/image, Remotion sin lazy load, componentes gigantes
- SEO: 8/10 — metadata bien, pero solo 3 artículos de blog
- Code Quality: 7/10 — dead code, archivos >800 líneas
- Bundle: RIESGO MEDIO — Remotion ~1.2MB sin lazy load

---

## FASE 1 — Quick Wins (30 min) ⚡
*Impacto alto, riesgo mínimo. Empezar aquí siempre.*

### 1.1 Eliminar código muerto
- [ ] `components/sections/hero.tsx` línea ~738: función `GekoVisual()` marcada como "old — movido al playground" → BORRAR (~140 líneas)
- [ ] Revisar si GSAP (`gsap`) se usa realmente. Si no → `pnpm remove gsap` (~150KB menos)

### 1.2 Remotion → Dynamic import
```tsx
// components/sections/... o playground
// ANTES (bloquea ~1.2MB en todos los usuarios)
import { Player } from '@remotion/player'

// DESPUÉS
const Player = dynamic(() => import('@remotion/player').then(m => ({ default: m.Player })), {
  ssr: false,
  loading: () => <div className="aspect-video bg-surface animate-pulse rounded-lg" />
})
```

### 1.3 Analytics → Next.js Script (no blocking)
```tsx
// app/layout.tsx — cambiar dangerouslySetInnerHTML por:
import Script from 'next/script'

<Script src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXX"
  strategy="afterInteractive" />
```

### 1.4 Announcement bar dismissible
```tsx
// Guardar dismiss en localStorage para evitar CLS en usuarios que ya lo vieron
const [visible, setVisible] = useState(() => {
  if (typeof window === 'undefined') return true
  return !localStorage.getItem('ann-dismissed')
})
```

---

## FASE 2 — Performance / Lighthouse 100 (2-3h) 🚀

### 2.1 next/image en TODOS los lugares con imágenes
Actualmente: CERO componentes usan `<Image>`. Buscar con:
```bash
grep -rn "<img " components/ app/ --include="*.tsx"
```
Reemplazar cada `<img>` por `<Image>` con `width`, `height` y `priority` en LCP.

### 2.2 Dynamic imports para componentes pesados
```tsx
// Cargar solo cuando el usuario los necesita
const CalendlyPopup = dynamic(() => import('@/components/ui/calendly-popup'), { ssr: false })
const CusdisComments = dynamic(() => import('@/components/blog/cusdis-comments'), { ssr: false })
const RoiCalculator = dynamic(() => import('@/components/sections/roi-calculator'))
```

### 2.3 Prefetch en enlaces internos críticos
```tsx
// components/sections/servicios.tsx, paquetes.tsx
<Link href="/servicios/redes-sociales" prefetch={true}>
```

### 2.4 next.config.ts — optimizaciones pendientes
```ts
const nextConfig = {
  output: 'export',  // verificar que está
  images: {
    // Para static export usar unoptimized: true o un loader externo
    unoptimized: true,  // Cloudflare Images o similar en prod
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion', 'lucide-react', '@radix-ui/react-accordion',
      '@radix-ui/react-dialog', '@radix-ui/react-tabs'
    ],
  },
  compress: true,
}
```

### 2.5 Font optimization
Verificar que Bricolage + Geist tienen `display: 'swap'` y `preload: true`.

---

## FASE 3 — Refactor de componentes gigantes (2h) 🔨

### 3.1 `paquetes.tsx` (970 líneas → 4 archivos)
```
components/sections/paquetes/
├── index.tsx           ← orquestador principal (~80 líneas)
├── PaqueteCard.tsx     ← card base + variantes Silver/Gold/Platinum
├── BillingToggle.tsx   ← toggle mensual/anual
├── PriceDisplay.tsx    ← lógica de precio con descuento
└── paquetes.types.ts   ← tipos compartidos
```

### 3.2 `hero.tsx` (878 líneas → 3 archivos)
```
components/sections/hero/
├── index.tsx               ← Hero principal (~150 líneas)
├── SocialCommandCenter.tsx ← el widget social con estado
└── HeroBackground.tsx      ← aurora + noise + partículas
```

### 3.3 `servicios.tsx` (644 líneas → separar tarjetas)
```
components/sections/servicios/
├── index.tsx           ← grid de servicios
└── ServicioCard.tsx    ← tarjeta individual reutilizable
```

---

## FASE 4 — SEO y Blog (3h) 📝

### 4.1 Artículos de blog a crear (objetivo: 15-20)
Temática: agencia marketing digital para empresas españolas.
Keywords objetivo con búsquedas reales:

**Listos (3):**
- como-aumentar-seguidores-instagram-empresas-2025
- tiktok-para-empresas-guia-completa-2025
- cuanto-cuesta-agencia-marketing-digital-madrid

**Pendientes de crear (12):**
1. `estrategia-redes-sociales-empresas-2025` — "estrategia redes sociales empresa"
2. `google-ads-vs-meta-ads-cual-elegir` — alto volumen, comparativa
3. `como-mejorar-posicionamiento-seo-local-negocio` — SEO local
4. `branding-para-pymes-como-diferenciarte` — identidad de marca
5. `email-marketing-automatizacion-2025` — email marketing
6. `que-es-el-funnel-de-ventas-digital` — educacional básico
7. `web-para-empresas-cuanto-cuesta-2025` — cuanto cuesta una web
8. `marketing-digital-para-restaurantes` — nicho local
9. `como-conseguir-primeros-clientes-negocio-online` — emprendedores
10. `metricas-redes-sociales-que-importan` — KPIs marketing
11. `rebranding-cuando-y-como-hacerlo` — branding
12. `chatgpt-para-marketing-de-contenidos` — tendencia IA

### 4.2 Schema.org a añadir
```tsx
// app/layout.tsx — Organization schema
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  "name": "Geko Marketing",
  "url": "https://geko-marketing.com",
  "description": "...",
  "address": { "@type": "PostalAddress", "addressLocality": "Madrid", "addressCountry": "ES" }
}

// app/blog/[slug]/page.tsx — Article schema ya presente, verificar dateModified
```

### 4.3 Sitemap y robots
```ts
// app/sitemap.ts — verificar que incluye todos los slugs de blog
// app/robots.ts — verificar que está creado
```

### 4.4 Featured posts en home
El flag `featured: true` existe en los YAMLs de Keystatic pero no se muestra en home. Añadir sección "Últimos artículos" en la home con los 3 featured.

---

## FASE 5 — Limpieza final (30 min) 🧹

```bash
# Verificar que no quedan console.logs
grep -rn "console\.log" app/ components/ lib/ --include="*.ts" --include="*.tsx"

# Verificar tipos any
grep -rn ": any\b" app/ components/ --include="*.tsx" --include="*.ts"

# Build final
pnpm build
```

---

## ORDEN DE EJECUCIÓN RECOMENDADO

```
Sesión 1 (2-3h): Fase 1 (quick wins) + Fase 2 (performance)
Sesión 2 (2h):   Fase 3 (refactor componentes)
Sesión 3 (3h):   Fase 4 (SEO + blog — 12 artículos)
Sesión 4 (1h):   Fase 5 (limpieza) + Lighthouse final + /audit completo
```

---

## PREGUNTAS PARA DESIGN.MD (responder en próxima sesión)
1. ¿Personalidad de marca: agresiva/directa vs consultiva/premium?
2. ¿Headline + CTA del hero — funciona o es lo que más frustra?
3. ¿1-2 cosas que SÍ funcionan y no tocar?
4. ¿Qué sección "no está a la altura"?
5. ¿Cliente objetivo? (pymes, startups, ecommerces...)
6. ¿Referencias adicionales de diseño que te parezcan brutales?
7. ¿Custom cursor, typewriter, magnetic — bien o algo sobra?
8. ¿Mobile cojea en algo?
