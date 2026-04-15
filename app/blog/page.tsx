import type { Metadata } from "next"
import { BlogClient } from "./client"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog de Marketing Digital | Guías, Estrategias y Consejos",
  description:
    "Artículos de marketing digital para pymes: estrategias de Instagram, precios de agencias, TikTok para empresas, SEO y mucho más. Escritos por el equipo de Geko Marketing.",
  keywords: [
    "blog marketing digital",
    "blog redes sociales empresas",
    "estrategia instagram empresas",
    "marketing digital pymes madrid",
    "guias marketing digital",
    "tiktok empresas",
    "agencia marketing digital blog",
  ],
  alternates: { canonical: "https://geko-marketing.com/blog" },
  openGraph: {
    title: "Blog de Marketing Digital | Geko Marketing",
    description: "Guías, estrategias y consejos de marketing digital para empresas. Sin relleno — solo lo que funciona.",
    url: "https://geko-marketing.com/blog",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
}

const BLOG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog de Marketing Digital · Geko Marketing",
  url: "https://geko-marketing.com/blog",
  description: "Artículos de marketing digital para pymes españolas.",
  publisher: {
    "@type": "Organization",
    name: "Geko Marketing",
    url: "https://geko-marketing.com",
    logo: "https://geko-marketing.com/logo.png",
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_SCHEMA) }}
      />
      <BlogClient posts={posts} />
    </>
  )
}
