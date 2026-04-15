import type { IconName } from "@/lib/icons"

export interface ServiceDeliverable {
  text: string
}

export interface ServiceCaseStudy {
  client: string
  metric: string
  metricLabel: string
  detail: string
  color: string
}

export interface ServiceMetric {
  value: string
  label: string
}

export interface ServiceData {
  id: string
  slug: string
  name: string
  tagline: string
  icon: IconName
  color: string
  accentGradient: string
  description: string
  deliverables: string[]
  platforms: { name: string; icon: IconName }[]
  caseStudy: ServiceCaseStudy
  metrics: ServiceMetric[]
  href: string
}

export const SERVICES: ServiceData[] = [
  {
    id: "redes-sociales",
    slug: "gestion-redes",
    name: "Gestión de Redes Sociales",
    tagline: "Presencia activa, comunidad real, resultados medibles",
    icon: "Share2",
    color: "#E1306C",
    accentGradient: "linear-gradient(135deg, rgba(225,48,108,0.18) 0%, rgba(107,45,124,0.12) 100%)",
    description:
      "Nos ocupamos de todo: estrategia, creación de contenido, publicación diaria y análisis mensual. Tú te centras en tu negocio, nosotros en que tu marca crezca y tu comunidad se convierta en clientes.",
    deliverables: [
      "Estrategia de contenido mensual personalizada",
      "Creación de posts, reels y stories de alta calidad",
      "Publicación y programación en todas tus redes",
      "Gestión de comentarios y mensajes directos",
      "Campañas de Social Ads optimizadas para conversión",
      "Informe mensual detallado con métricas y próximos pasos",
    ],
    platforms: [
      { name: "Instagram", icon: "Camera" },
      { name: "TikTok",    icon: "Music2" },
      { name: "LinkedIn",  icon: "Briefcase" },
      { name: "Facebook",  icon: "Users" },
      { name: "YouTube",   icon: "Play" },
    ],
    caseStudy: {
      client: "Restaurante local, Tres Cantos",
      metric: "+247%",
      metricLabel: "de engagement en 90 días",
      detail: "De 800 a 12.400 seguidores",
      color: "#E1306C",
    },
    metrics: [
      { value: "12.4K", label: "Alcance semanal medio" },
      { value: "+247%", label: "Incremento engagement" },
      { value: "×4.2",  label: "ROAS en campañas" },
    ],
    href: "/servicios/gestion-redes",
  },
  {
    id: "branding",
    slug: "branding",
    name: "Impulso de Marca",
    tagline: "Una identidad que inspira confianza y atrae a tu cliente ideal",
    icon: "Sparkles",
    color: "#9B4DBC",
    accentGradient: "linear-gradient(135deg, rgba(155,77,188,0.18) 0%, rgba(29,78,216,0.12) 100%)",
    description:
      "Construimos o renovamos tu identidad de marca para que cada punto de contacto con el cliente transmita profesionalidad, coherencia y valores. Porque antes de contratar, la gente ya juzga por la imagen.",
    deliverables: [
      "Identidad visual completa — logo, colores y tipografías",
      "Manual de marca con guías de uso claras",
      "Pack de 20+ plantillas editables para redes sociales",
      "Fotografía y video corporativo",
      "Naming y copywriting de marca alineado a tu público",
      "Estrategia de comunicación y definición del tono de voz",
    ],
    platforms: [
      { name: "Instagram", icon: "Camera" },
      { name: "LinkedIn",  icon: "Briefcase" },
      { name: "Web",       icon: "Globe" },
      { name: "Print",     icon: "Printer" },
      { name: "Video",     icon: "Film" },
    ],
    caseStudy: {
      client: "Clínica de estética, Madrid",
      metric: "+183%",
      metricLabel: "reconocimiento de marca",
      detail: "Rebrand completo en 6 semanas",
      color: "#9B4DBC",
    },
    metrics: [
      { value: "6 sem.", label: "Entrega completa" },
      { value: "+183%",  label: "Reconocimiento marca" },
      { value: "100%",   label: "Coherencia en todos los canales" },
    ],
    href: "/servicios/branding",
  },
  {
    id: "paginas-web",
    slug: "paginas-web",
    name: "Páginas Web",
    tagline: "Webs que cargan rápido, se ven perfectas y convierten visitas en clientes",
    icon: "Monitor",
    color: "#3B82F6",
    accentGradient: "linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(107,45,124,0.10) 100%)",
    description:
      "Diseñamos y desarrollamos tu web desde cero con foco en tres cosas: que sea rápida, que se vea increíble en cualquier dispositivo y que convierta visitas en clientes reales.",
    deliverables: [
      "Diseño UI/UX personalizado y totalmente responsive",
      "Desarrollo en Next.js o WordPress según necesidad",
      "SEO técnico on-page implementado desde el primer día",
      "Integración con tu CRM, formularios y analytics",
      "Optimización Core Web Vitals — velocidad máxima",
      "Mantenimiento y soporte técnico post-lanzamiento",
    ],
    platforms: [
      { name: "Next.js",   icon: "Zap" },
      { name: "WordPress", icon: "FileText" },
      { name: "Shopify",   icon: "ShoppingBag" },
      { name: "Webflow",   icon: "Paintbrush2" },
      { name: "Custom",    icon: "Wrench" },
    ],
    caseStudy: {
      client: "Inmobiliaria, Tres Cantos",
      metric: "+312%",
      metricLabel: "tráfico orgánico en 4 meses",
      detail: "Velocidad ×4 vs web anterior",
      color: "#3B82F6",
    },
    metrics: [
      { value: "<2s",    label: "Tiempo de carga" },
      { value: "+312%",  label: "Tráfico orgánico" },
      { value: "98/100", label: "Google PageSpeed" },
    ],
    href: "/servicios/paginas-web",
  },
]

export const ROI_SECTORS = [
  { id: "hosteleria", label: "Hostelería / Restauración", growthMultiplier: 1.4, engagementBase: 4.2 },
  { id: "comercio",   label: "Comercio local",            growthMultiplier: 1.3, engagementBase: 3.8 },
  { id: "servicios",  label: "Servicios profesionales",   growthMultiplier: 1.2, engagementBase: 3.2 },
  { id: "ecommerce",  label: "E-commerce",                growthMultiplier: 1.5, engagementBase: 3.6 },
  { id: "salud",      label: "Salud y bienestar",         growthMultiplier: 1.6, engagementBase: 5.1 },
  { id: "inmobiliaria", label: "Inmobiliaria",            growthMultiplier: 1.1, engagementBase: 2.8 },
]

export const ROI_PACKAGES = [
  { id: "silver",   label: "Silver",   price: 399,  multiplier: 1.0, color: "#94A3B8" },
  { id: "golden",   label: "Golden",   price: 599,  multiplier: 1.45, color: "#F59E0B" },
  { id: "platinum", label: "Platinum", price: 1100, multiplier: 2.2,  color: "#9B4DBC" },
]
