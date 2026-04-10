import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"
import { LanguageProvider } from "@/context/language-context"
import "@fontsource-variable/bricolage-grotesque"
import "@fontsource-variable/geist"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://geko-marketing.com"),
  title: {
    default: "Geko Marketing | Agencia de Marketing Digital en Madrid",
    template: "%s | Geko Marketing",
  },
  description:
    "Transformamos seguidores en clientes reales. Agencia de marketing digital en Tres Cantos, Madrid. Gestión de redes sociales, branding e impulso de marca.",
  keywords: [
    "agencia marketing digital madrid",
    "gestión redes sociales empresas",
    "agencia marketing tres cantos",
    "community manager madrid",
    "branding empresas madrid",
    "gestión instagram empresas",
    "agencia tiktok madrid",
  ],
  authors: [{ name: "Geko Marketing", url: "https://geko-marketing.com" }],
  creator: "Geko Marketing",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://geko-marketing.com",
    siteName: "Geko Marketing",
    title: "Geko Marketing | Agencia de Marketing Digital en Madrid",
    description:
      "Transformamos seguidores en clientes reales. Especialistas en gestión de redes sociales y branding.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Geko Marketing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geko Marketing | Agencia de Marketing Digital",
    description: "Transformamos seguidores en clientes reales.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://geko-marketing.com",
    languages: { es: "https://geko-marketing.com", en: "https://geko-marketing.com/en" },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080810" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <a href="#main-content" className="skip-link">
              Saltar al contenido principal
            </a>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
