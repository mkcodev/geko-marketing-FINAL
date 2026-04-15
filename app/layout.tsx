import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { LanguageProvider } from "@/context/language-context"
import { LenisProvider } from "@/components/providers/lenis-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import "@fontsource-variable/bricolage-grotesque"
import "@fontsource-variable/geist"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://geko-marketing.com"),
  title: {
    default: "Geko Marketing | Agencia de Marketing Digital en Tres Cantos, Madrid",
    template: "%s | Geko Marketing",
  },
  description:
    "Agencia de marketing digital en Tres Cantos, Madrid. Transformamos seguidores en clientes reales. Gestión de redes sociales, branding, diseño web y campañas de pago para pymes.",
  keywords: [
    // Marca + localización
    "agencia marketing digital Tres Cantos",
    "agencia marketing digital Madrid",
    "agencia marketing digital Madrid norte",
    "agencia publicidad digital Madrid",
    // Servicios principales
    "gestión redes sociales empresas Madrid",
    "community manager Madrid",
    "branding empresas Madrid",
    "diseño web empresas Madrid",
    "agencia social media Madrid",
    // Long-tail
    "marketing digital pymes Madrid",
    "agencia marketing pequeñas empresas Madrid",
    "gestión Instagram empresa Madrid",
    "gestión TikTok empresa Madrid",
    "diseño pagina web Tres Cantos",
    "agencia SEO Madrid norte",
    // Intención de compra
    "presupuesto marketing digital Madrid",
    "contratar agencia marketing Madrid",
  ],
  authors: [{ name: "Geko Marketing", url: "https://geko-marketing.com" }],
  creator: "Geko Marketing",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://geko-marketing.com",
    siteName: "Geko Marketing",
    title: "Geko Marketing | Agencia de Marketing Digital en Tres Cantos, Madrid",
    description:
      "Transformamos seguidores en clientes reales. Gestión de redes sociales, branding y diseño web para pymes en Madrid.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Geko Marketing — Agencia de Marketing Digital en Madrid" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geko Marketing | Agencia de Marketing Digital en Madrid",
    description: "Gestión de redes sociales, branding y diseño web para pymes en Madrid y Tres Cantos.",
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
  verification: {
    google: "TyKhU_p6iORFOnDhVF8Ln0s70TGGh_1mIpANxRkGI_M",
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

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Geko Marketing",
  description:
    "Agencia de marketing digital en Tres Cantos, Madrid. Gestión de redes sociales, branding e identidad de marca y diseño web profesional para pymes.",
  url: "https://geko-marketing.com",
  logo: "https://geko-marketing.com/logo.png",
  image: "https://geko-marketing.com/og-image.jpg",
  telephone: "+34 600 000 000",
  email: "hola@geko-marketing.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tres Cantos",
    addressLocality: "Tres Cantos",
    addressRegion: "Madrid",
    postalCode: "28760",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "40.5954",
    longitude: "-3.7201",
  },
  areaServed: [
    { "@type": "City", name: "Tres Cantos" },
    { "@type": "City", name: "Madrid" },
    { "@type": "AdministrativeArea", name: "Comunidad de Madrid" },
  ],
  sameAs: [
    "https://www.instagram.com/geko.mkt",
    "https://www.linkedin.com/company/geko-marketing",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Marketing Digital",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gestión de Redes Sociales",
          url: "https://geko-marketing.com/servicios/gestion-redes",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Branding e Identidad de Marca",
          url: "https://geko-marketing.com/servicios/branding",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Diseño y Desarrollo Web",
          url: "https://geko-marketing.com/servicios/paginas-web",
        },
      },
    ],
  },
}

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Geko Marketing",
  url: "https://geko-marketing.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://geko-marketing.com/buscar?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

const GTM_ID = "GTM-5DDFLX8L"
const CLARITY_ID = "wb7cmddxf6"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`,
          }}
        />
        {/* End Microsoft Clarity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ThemeProvider>
          <LenisProvider>
            <LanguageProvider>
              {/* Global UI overlays */}
              <CustomCursor />
              <ScrollProgress />
              <a href="#main-content" className="skip-link">
                Saltar al contenido principal
              </a>

              {/* Fixed header: announcement bar + navbar stacked */}
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 100,
                }}
              >
                <AnnouncementBar />
                <Navbar />
              </div>

              {/* Page content — offset below the fixed header */}
              <main
                id="main-content"
                style={{ paddingTop: "calc(56px + var(--ann-h, 40px))" }}
              >
                {children}
              </main>

              {/* Footer */}
              <Footer />
            </LanguageProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
