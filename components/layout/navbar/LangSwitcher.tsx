"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Globe, Check } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useT } from "@/hooks/use-translations"
import type { Language } from "@/types"

export function LangSwitcher() {
  const { language, setLanguage } = useLanguage()
  const t = useT()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const options: { value: Language; label: string; flag: string }[] = [
    { value: "es", label: "Español", flag: "🇪🇸" },
    { value: "en", label: "English", flag: "🇬🇧" },
  ]

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.nav.changeLanguage}
        aria-expanded={open}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 5, height: 34, padding: "0 11px", borderRadius: 8,
          border: "1px solid var(--border)",
          background: open ? "var(--color-geko-purple-a12)" : "var(--surface)",
          color: "var(--fg-secondary)", cursor: "pointer", flexShrink: 0,
          transition: "background 0.2s",
        }}
      >
        <Globe size={13} />
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 500 }}>
          {language.toUpperCase()}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0,
              minWidth: 148, borderRadius: 12, overflow: "hidden",
              background: "var(--glass-bg-strong)",
              border: "1px solid var(--border)",
              boxShadow: "0 12px 32px rgba(0,0,0,0.30)",
              zIndex: 500,
            }}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setLanguage(opt.value); setOpen(false) }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  width: "100%", padding: "10px 14px", border: "none",
                  background: language === opt.value ? "var(--color-geko-purple-a12)" : "transparent",
                  cursor: "pointer", textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-hover)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = language === opt.value ? "var(--color-geko-purple-a12)" : "transparent" }}
              >
                <span style={{ fontSize: "1rem" }}>{opt.flag}</span>
                <span style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.875rem",
                  color: language === opt.value ? "var(--fg)" : "var(--fg-secondary)",
                  fontWeight: language === opt.value ? 500 : 400,
                }}>
                  {opt.label}
                </span>
                {language === opt.value && (
                  <Check size={13} color="var(--color-geko-purple-accent)" style={{ marginLeft: "auto" }} />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
