import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SERVICES } from "@/constants/services"
import { SERVICIOS_DETALLE } from "@/constants/services-detalle"
import { ServicioDetalleContent } from "./client"

const RoiCalculator = dynamic(
  () => import("@/components/sections/roi-calculator").then((m) => ({ default: m.RoiCalculator })),
  { ssr: false }
)
import { Paquetes } from "@/components/sections/paquetes"
import { CtaFinal } from "@/components/sections/cta-final"
import { CtaSticky } from "@/components/ui/cta-sticky"

// ── Static generation ─────────────────────────────────────────
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

// ── Per-service SEO data ──────────────────────────────────────
const SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  "gestion-redes": {
    title: "Gestión de Redes Sociales para Empresas en Madrid",
    description:
      "Gestión completa de redes sociales para empresas en Madrid y Tres Cantos. Community management profesional, creación de contenido, Social Ads y análisis mensual. Media de +247% en engagement.",
    keywords: [
      "gestión redes sociales empresas Madrid",
      "community manager Madrid",
      "agencia social media Madrid",
      "gestión Instagram empresa Madrid",
      "gestión TikTok empresa Madrid",
      "agencia redes sociales Tres Cantos",
      "community manager precio Madrid",
      "agencia redes sociales pymes Madrid",
      "gestión redes sociales profesional",
      "social media manager Madrid",
    ],
  },
  "branding": {
    title: "Branding e Identidad de Marca para Empresas en Madrid",
    description:
      "Diseño de identidad corporativa y branding para empresas en Madrid. Logo, manual de marca, templates editables y estrategia de comunicación. Rebrand completo entregado en 6 semanas.",
    keywords: [
      "diseño identidad corporativa Madrid",
      "branding empresas Madrid",
      "agencia branding Madrid",
      "diseño logo empresa Madrid",
      "identidad visual empresa Madrid",
      "manual de marca empresa Madrid",
      "agencia diseño gráfico Madrid",
      "branding pymes Madrid",
      "diseño imagen corporativa Tres Cantos",
      "rebranding empresas Madrid",
    ],
  },
  "paginas-web": {
    title: "Diseño y Desarrollo Web para Empresas en Madrid",
    description:
      "Diseño y desarrollo web profesional para empresas en Madrid y Tres Cantos. Next.js y WordPress con SEO técnico incluido desde el primer día. 98/100 en Google PageSpeed Score.",
    keywords: [
      "diseño web empresas Madrid",
      "desarrollo web Madrid",
      "diseño pagina web Tres Cantos",
      "agencia diseño web Madrid norte",
      "desarrollo web Next.js Madrid",
      "diseño web empresas pequeñas Madrid",
      "pagina web profesional Madrid",
      "diseño web WordPress Madrid",
      "desarrollo web pymes Madrid",
      "diseño web a medida Madrid",
    ],
  },
}

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  const detalle = SERVICIOS_DETALLE[slug]
  if (!service || !detalle) return {}

  const seo = SEO[slug]
  const title = seo?.title ?? service.name
  const description = seo?.description ?? detalle.heroDescription
  const keywords = seo?.keywords ?? []
  const url = `https://geko-marketing.com/servicios/${slug}`

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${title} | Geko Marketing`,
      description,
      url,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: url,
    },
  }
}

// ── Page ──────────────────────────────────────────────────────
export default async function ServicioDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  const detalle = SERVICIOS_DETALLE[slug]

  if (!service || !detalle) notFound()

  // ── JSON-LD Structured Data ──
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: detalle.heroDescription,
    url: `https://geko-marketing.com/servicios/${slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Geko Marketing",
      url: "https://geko-marketing.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tres Cantos",
        addressRegion: "Madrid",
        addressCountry: "ES",
      },
    },
    areaServed: [
      { "@type": "City", name: "Tres Cantos" },
      { "@type": "City", name: "Madrid" },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detalle.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://geko-marketing.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: "https://geko-marketing.com/servicios",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `https://geko-marketing.com/servicios/${slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicioDetalleContent service={service} detalle={detalle} />
      <RoiCalculator />
      <Paquetes />
      <CtaFinal />
      <CtaSticky />
    </>
  )
}
