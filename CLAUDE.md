# Geko Marketing — Project Context

<project>
Sitio web de marketing para agencia Geko. Dominio: geko-marketing.com
Next.js 16.2.3 App Router. Estructura en raíz (sin /src): app/, components/, hooks/, lib/, constants/, content/, context/

PÁGINAS EXISTENTES:
- / (home) · /nosotros · /servicios · /servicios/[slug] · /blog · /blog/[slug] · /contacto
- /playground-geko (desarrollo/pruebas) · /keystatic (panel CMS — no tocar)

STACK EXACTO:
- Next.js 16.2.3 App Router · React 19 · TypeScript strict
- Tailwind CSS v4 (CSS-first, @theme en globals.css)
- Framer Motion 12.x · GSAP 3.14.x · Lenis (smooth scroll)
- Radix UI (primitivos) + CVA + tailwind-merge (sin shadcn completo)
- next-themes (dark/light toggle, dark por defecto)
- Keystatic (CMS para contenido — app/keystatic/)
- Remotion (video creation — usar solo para exports de video)
- Resend (emails transaccionales — ya instalado)
- react-hook-form + Zod (formularios)
- Lucide React (iconos)
- Fuentes: Bricolage Grotesque Variable + Geist Variable (via @fontsource-variable)
- Google Analytics (NEXT_PUBLIC_GA_MEASUREMENT_ID) · Crisp chat · Calendly · ReCaptcha

DEPLOY: Static export → Hostinger via FTP (GitHub Actions en push a main)
⚠️  MODO ESTÁTICO — SIN Server Actions, SIN Route Handlers dinámicos, SIN ISR
- output: 'export' en next.config.ts
- Toda la data debe ser fetch en build time o client-side
- Formularios: client-side fetch a APIs externas (no server actions)
</project>

<structure>
PÁGINAS: / · /nosotros · /servicios · /servicios/[slug] · /blog · /blog/[slug] · /contacto

components/
├── layout/     announcement-bar · footer · navbar
├── providers/  lenis-provider · theme-provider
├── sections/   hero · servicios · servicios-hero · servicios-explore · paquetes · proceso
│               metricas · testimoniales · social-proof · comparativa-tabla · roi-calculator
│               dolor-solucion · faq · cta-final
│               servicio-highlight/: branding-reveal · redes-dashboard · redes-proceso
│                                    redes-resultados · web-performance
├── blog/       article-card · author-card · blog-search · cusdis-comments
│               reading-progress · related-articles · share-buttons · toc · tag-filter
└── ui/         back-to-top · calendly-popup · cookie-banner · cta-sticky · custom-cursor
                loading-screen · magnetic · scroll-progress · typewriter

REGLA: Antes de crear un componente nuevo, verificar que no existe ya en la lista anterior.
</structure>

<design_system>
PALETA REAL:
- Brand purple: #6B2D7C (light: #8B3D9C / dark: #4A1F57)
- Brand blue:   #1D4ED8 (light: #3B82F6 / dark: #1E3A8A)
- Gradient:     linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)
- Aurora:       radial-gradient purple 35% opacity en top del hero
- BG dark:      #080810 / #0d0d1a / #12121f
- BG light:     #FAFAFA / #F4F4F8
- Text dark:    rgba(255,255,255,0.95/0.55/0.35)
- Text light:   rgba(8,8,16,0.95/0.55/0.35)
- Border dark:  rgba(255,255,255,0.08) → hover 0.15
- Glow purple:  0 0 40px rgba(107,45,124,0.4)
- Glow blue:    0 0 40px rgba(29,78,216,0.4)

TIPOGRAFÍA:
- Heading: Bricolage Grotesque Variable (font-heading)
- UI/mono: Geist Variable (font-ui)
- Body: Satoshi/Geist (font-body)
- Escala: clamp() fluida de xs(0.75rem) a 6xl(7rem)

EFECTOS GLOBALES:
- Noise overlay: body::after con SVG fractal, opacity 0.025, mix-blend-mode overlay
- Glass: backdrop-filter blur(20px) + rgba(8,8,16,0.6) + border rgba(255,255,255,0.08)
- Custom cursor activo en desktop
- Scrollbar: 5px con gradiente purple→blue
- Selection: rgba(107,45,124,0.3)
- Focus: outline 2px #6B2D7C
- Referencias de diseño: linear.app · vercel.com · liveblocks.io

CLASES UTILITARIAS EXISTENTES:
- .text-gradient-brand → texto purple→blue animado
- .glass → efecto vidrio
- .glow-purple / .glow-blue → sombras de luz
- .section-container → max-w-1200px con padding responsive
- .font-heading / .font-ui / .font-body
</design_system>

<design_tokens>
Fuentes: Bricolage Grotesque (headings) · Geist (body/mono)
Dark mode: primero y por defecto — next-themes con attribute="class"
Logos activos: purple-minimal-clean.svg (navbar) · white-minimal-clean.svg (footer)
</design_tokens>

<rules>
- Lenis para smooth scroll — NO usar CSS scroll-behavior: smooth (conflicto)
- Keystatic: CMS de contenido — no modificar app/keystatic/ sin necesidad
- Remotion: solo para generación de video — no usar en componentes de UI normal
- Resend: ya instalado — usar para emails transaccionales desde Server Actions
- Sin Zustand todavía — usar Context API o react-hook-form state por ahora
- Sin TanStack Query todavía — fetch directo en build time (getStaticProps equivalent en RSC)
- Formularios: react-hook-form + Zod + fetch client-side (NO server actions — static export)
- Deploy: `git push origin main` → GitHub Action construye y sube a Hostinger automáticamente
- Para ver cambios localmente antes de subir: `pnpm build && pnpm start`
- Agentes a invocar tras cambios: nextjs-reviewer + ui-reviewer + animation-specialist

GIT — PROHIBIDO SIEMPRE:
- NUNCA ejecutar git add, git commit, git push, git reset --hard
- El usuario gestiona git manualmente. Solo usar git para leer: git status, git diff, git log

BUILDS — solo cuando sea necesario:
- NO ejecutar `pnpm build` automáticamente tras cada cambio
- Ejecutar build solo cuando: el usuario lo pide explícitamente, o al terminar una feature completa
- Para verificar errores de TypeScript usar: `pnpm tsc --noEmit` (más rápido que build completo)
- Si hay errores de tipo obvios, corregirlos directamente sin hacer build primero
</rules>
