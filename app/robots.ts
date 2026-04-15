import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/keystatic/"],
      },
    ],
    sitemap: "https://geko-marketing.com/sitemap.xml",
    host: "https://geko-marketing.com",
  }
}
