import type { NextConfig } from "next"

const IS_EXPORT = process.env.BUILDING_FOR_EXPORT === "true"

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://www.recaptcha.net https://client.crisp.chat",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.resend.com https://api.hubspot.com https://www.google-analytics.com https://www.clarity.ms https://client.crisp.chat wss://client.relay.crisp.chat https://api.github.com",
      "frame-src https://calendly.com https://www.recaptcha.net",
      "worker-src blob:",
    ].join("; "),
  },
]

// Permissive CSP for Keystatic admin panel
const keystaticcspHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://api.github.com https://uploads.keystatic.com",
      "frame-src 'none'",
      "worker-src blob:",
    ].join("; "),
  },
]

const nextConfig: NextConfig = {
  output: IS_EXPORT ? "export" : undefined,

  async headers() {
    return [
      {
        source: "/keystatic(.*)",
        headers: keystaticcspHeaders,
      },
      {
        source: "/((?!keystatic).*)",
        headers: securityHeaders,
      },
    ]
  },

  images: {
    unoptimized: IS_EXPORT,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.geko-marketing.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
}

export default nextConfig
