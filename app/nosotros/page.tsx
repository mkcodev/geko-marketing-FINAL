import type { Metadata } from "next"
import { NosotrosClient } from "./client"

export const metadata: Metadata = {
  title: "Nosotros · Equipo y valores de Geko Marketing",
  description:
    "Conoce al equipo detrás de Geko Marketing. Agencia de marketing digital en Tres Cantos, Madrid. Transparentes, ágiles y obsesionados con los resultados.",
  keywords: [
    "equipo geko marketing",
    "agencia marketing digital tres cantos",
    "sobre geko marketing",
    "valores agencia marketing",
    "agencia marketing digital madrid transparente",
  ],
  alternates: { canonical: "https://geko-marketing.com/nosotros" },
  openGraph: {
    title: "Nosotros · El equipo detrás de tu crecimiento | Geko Marketing",
    description:
      "Somos una agencia de marketing digital en Tres Cantos, Madrid. Transparentes, ágiles y orientados a resultados.",
    url: "https://geko-marketing.com/nosotros",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
}

export default function NosotrosPage() {
  return <NosotrosClient />
}
