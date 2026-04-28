import type { Metadata } from "next"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import { ContactoClient } from "./client"

export const metadata: Metadata = {
  title: "Contacto | Geko Marketing — Agencia Digital en Madrid",
  description:
    "Contacta con Geko Marketing en Tres Cantos, Madrid. Respuesta garantizada en menos de 24 horas. Consulta gratuita sin compromiso para tu negocio.",
  keywords: [
    "contacto agencia marketing digital",
    "agencia marketing digital madrid",
    "consulta gratuita marketing",
    "presupuesto marketing digital",
    "tres cantos madrid marketing",
  ],
  alternates: { canonical: "https://geko-marketing.com/contacto" },
  openGraph: {
    title: "Contacta con Geko Marketing | Agencia Digital en Madrid",
    description:
      "Cuéntanos tu situación y te contactamos en menos de 24 horas con una propuesta personalizada. Sin compromiso.",
    url: "https://geko-marketing.com/contacto",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
}

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto · Geko Marketing",
  url: "https://geko-marketing.com/contacto",
  description: "Página de contacto de Geko Marketing, agencia de marketing digital en Tres Cantos, Madrid.",
  mainEntity: {
    "@type": "Organization",
    name: "Geko Marketing",
    telephone: "+34633197798",
    email: "info@geko-marketing.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tres Cantos",
      addressRegion: "Madrid",
      postalCode: "28760",
      addressCountry: "ES",
    },
  },
}

export default function ContactoPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
      scriptProps={{ async: true, defer: true, appendTo: "body" }}
    >
      <script
        type="application/ld+json"
        // CONTACT_SCHEMA is a hardcoded constant, not user input — safe to stringify
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_SCHEMA) }}
      />
      <ContactoClient />
    </GoogleReCaptchaProvider>
  )
}
