import type { MetadataRoute } from "next"
import { getAllSlugs } from "@/lib/blog"

const BASE = "https://geko-marketing.com"

const STATIC_ROUTES: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
  { url: BASE,                   priority: 1.0, changeFrequency: "weekly" },
  { url: `${BASE}/servicios`,    priority: 0.9, changeFrequency: "monthly" },
  { url: `${BASE}/nosotros`,     priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE}/blog`,         priority: 0.9, changeFrequency: "weekly" },
  { url: `${BASE}/contacto`,     priority: 0.8, changeFrequency: "monthly" },
  // Servicios individuales
  { url: `${BASE}/servicios/gestion-redes`,    priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE}/servicios/branding`,         priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE}/servicios/paginas-web`,      priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE}/servicios/publicidad-pago`,  priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE}/servicios/seo`,              priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE}/servicios/email-marketing`,  priority: 0.7, changeFrequency: "monthly" },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  // Static routes
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  // Blog posts
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const slugs = await getAllSlugs()
    blogEntries = slugs.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  } catch {
    // Graceful fallback if blog reader fails at build time
  }

  return [...staticEntries, ...blogEntries]
}
