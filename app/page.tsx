"use client"

import { useState, useEffect } from "react"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { CookieBanner } from "@/components/ui/cookie-banner"
import { BackToTop } from "@/components/ui/back-to-top"
import { Hero } from "@/components/sections/hero"
import { SocialProof } from "@/components/sections/social-proof"
import { DolorSolucion } from "@/components/sections/dolor-solucion"
import { Servicios } from "@/components/sections/servicios"
import { Proceso } from "@/components/sections/proceso"
import { Metricas } from "@/components/sections/metricas"
import { Testimoniales } from "@/components/sections/testimoniales"
import { Paquetes } from "@/components/sections/paquetes"
import { Faq } from "@/components/sections/faq"
import { CtaFinal } from "@/components/sections/cta-final"

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    // Only show loading screen once per visit (localStorage persists across tabs)
    const seen = localStorage.getItem("geko-loaded")
    if (seen) {
      setLoading(false)
    } else {
      setShown(true)
    }
  }, [])

  const handleLoadingComplete = () => {
    localStorage.setItem("geko-loaded", "1")
    setLoading(false)
  }

  return (
    <>
      {shown && loading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      <Hero />
      <SocialProof />
      <DolorSolucion />
      <Servicios />
      <Proceso />
      <Metricas />
      <Testimoniales />
      <Paquetes />
      <Faq />
      <CtaFinal />
      <CookieBanner />
      <BackToTop />
    </>
  )
}
