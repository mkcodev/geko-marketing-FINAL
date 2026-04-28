"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Language } from "@/types"

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  isEnglish: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children, initialLang = "es" }: {
  children: ReactNode
  initialLang?: Language
}) {
  const [language, setLanguageState] = useState<Language>(initialLang)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("geko-lang", lang)
    document.documentElement.lang = lang
    if (lang === "en") {
      window.history.replaceState({}, "", window.location.pathname.startsWith("/en")
        ? window.location.pathname
        : `/en${window.location.pathname}`)
    } else {
      window.history.replaceState({}, "", window.location.pathname.replace(/^\/en/, "") || "/")
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem("geko-lang") as Language | null
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored && stored !== initialLang) setLanguageState(stored)
    document.documentElement.lang = stored ?? initialLang
  }, [initialLang])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isEnglish: language === "en" }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
