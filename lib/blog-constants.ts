// Client-safe constants and types — no Node.js dependencies

export type Category =
  | "redes-sociales"
  | "branding"
  | "diseno-web"
  | "marketing-digital"
  | "seo"
  | "publicidad"

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishDate: string
  category: Category
  tags: string[]
  author: string
  featured: boolean
  readingTime: number
  content: Parameters<typeof import("@keystatic/core/renderer").DocumentRenderer>[0]["document"]
}

export type BlogPostMeta = Omit<BlogPost, "content">

export const CATEGORY_META: Record<
  Category,
  { label: string; color: string; gradient: string; icon: string }
> = {
  "redes-sociales": {
    label: "Redes Sociales",
    color: "#E1306C",
    gradient: "linear-gradient(135deg, #E1306C, #9B4DBC)",
    icon: "Share2",
  },
  branding: {
    label: "Branding",
    color: "#9B4DBC",
    gradient: "linear-gradient(135deg, #9B4DBC, #6B2D7C)",
    icon: "Sparkles",
  },
  "diseno-web": {
    label: "Diseño Web",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
    icon: "Monitor",
  },
  "marketing-digital": {
    label: "Marketing Digital",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B, #EF4444)",
    icon: "TrendingUp",
  },
  seo: {
    label: "SEO",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981, #3B82F6)",
    icon: "Search",
  },
  publicidad: {
    label: "Publicidad",
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #EF4444, #F59E0B)",
    icon: "Megaphone",
  },
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
