"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"
import type { BlogPostMeta } from "@/lib/blog-constants"

const LoadingScreen = dynamic(
  () => import("@/components/ui/loading-screen").then((m) => ({ default: m.LoadingScreen })),
  { ssr: false }
)
const CookieBanner = dynamic(
  () => import("@/components/ui/cookie-banner").then((m) => ({ default: m.CookieBanner })),
  { ssr: false }
)
const BackToTop = dynamic(
  () => import("@/components/ui/back-to-top").then((m) => ({ default: m.BackToTop })),
  { ssr: false }
)
const Team = dynamic(() => import("@/components/sections/team").then((m) => ({ default: m.Team })))
const SocialProof = dynamic(() => import("@/components/sections/social-proof").then((m) => ({ default: m.SocialProof })))
const DolorSolucion = dynamic(() => import("@/components/sections/dolor-solucion").then((m) => ({ default: m.DolorSolucion })))
const Servicios = dynamic(() => import("@/components/sections/servicios").then((m) => ({ default: m.Servicios })))
const Proceso = dynamic(() => import("@/components/sections/proceso").then((m) => ({ default: m.Proceso })))
const Metricas = dynamic(() => import("@/components/sections/metricas").then((m) => ({ default: m.Metricas })))
const Testimoniales = dynamic(() => import("@/components/sections/testimoniales").then((m) => ({ default: m.Testimoniales })))
const Paquetes = dynamic(() => import("@/components/sections/paquetes").then((m) => ({ default: m.Paquetes })))
const UltimosArticulos = dynamic(() => import("@/components/sections/ultimos-articulos").then((m) => ({ default: m.UltimosArticulos })))
const Faq = dynamic(() => import("@/components/sections/faq").then((m) => ({ default: m.Faq })))
const CtaFinal = dynamic(() => import("@/components/sections/cta-final").then((m) => ({ default: m.CtaFinal })))

// import { CardSwapper } from "@/components/ui/CardSwapper"
// import { GlareHoverEff } from "@/components/ui/GlareHoverEff"

interface HomeClientProps {
  recentPosts: BlogPostMeta[]
}

export function HomeClient({ recentPosts }: HomeClientProps) {
  const [loading, setLoading] = useState(true)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem("geko-loaded")
    if (seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
      {/* <CardSwapper /> */}
      {/* <GlareHoverEff /> */}
      <div className="cv-auto"><Team /></div>
      <div className="cv-auto"><SocialProof /></div>
      <div className="cv-auto"><DolorSolucion /></div>
      <div className="cv-auto"><Servicios /></div>
      <div className="cv-auto"><Proceso /></div>
      <div className="cv-auto"><Metricas /></div>
      <div className="cv-auto"><Testimoniales /></div>
      <div className="cv-auto"><Paquetes /></div>
      <div className="cv-auto"><UltimosArticulos posts={recentPosts} /></div>
      <div className="cv-auto"><Faq /></div>
      <div className="cv-auto"><CtaFinal /></div>
      <CookieBanner />
      <BackToTop />
    </>
  )
}
