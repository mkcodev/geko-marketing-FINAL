import dynamic from "next/dynamic"
import { ServiciosHero } from "@/components/sections/servicios-hero"
import { ServiciosExplore } from "@/components/sections/servicios-explore"

const RoiCalculator = dynamic(
  () => import("@/components/sections/roi-calculator").then((m) => ({ default: m.RoiCalculator })),
  { ssr: false }
)
import { ComparativaTabla } from "@/components/sections/comparativa-tabla"
import { Proceso } from "@/components/sections/proceso"
import { Paquetes } from "@/components/sections/paquetes"
import { Faq } from "@/components/sections/faq"
import { CtaFinal } from "@/components/sections/cta-final"
import { CtaSticky } from "@/components/ui/cta-sticky"

export const metadata = {
  title: "Servicios de Marketing Digital en Madrid | Geko Marketing",
  description:
    "Gestión de redes sociales, branding e identidad de marca y diseño web profesional. Todo lo que necesita tu pyme para crecer online. Sin permanencia, con resultados reales desde el día 1.",
  keywords: [
    "servicios marketing digital Madrid",
    "agencia marketing digital servicios Madrid",
    "precios marketing digital Madrid",
    "gestión redes sociales precio Madrid",
    "branding empresas precio Madrid",
    "diseño web precio Madrid",
    "agencia marketing integral Madrid",
    "paquetes marketing digital pymes",
    "marketing digital sin permanencia Madrid",
    "servicios marketing digital Tres Cantos",
  ],
  openGraph: {
    title: "Servicios de Marketing Digital en Madrid | Geko Marketing",
    description:
      "Gestión de redes sociales, branding y diseño web para pymes. Sin permanencia. Resultados reales desde el día 1.",
    url: "https://geko-marketing.com/servicios",
  },
  alternates: {
    canonical: "https://geko-marketing.com/servicios",
  },
}

export default function ServiciosPage() {
  return (
    <>
      <ServiciosHero />
      <ServiciosExplore />
      <RoiCalculator />
      <ComparativaTabla />
      <Proceso />
      <Paquetes />
      <Faq />
      <CtaFinal />
      <CtaSticky />
    </>
  )
}
