"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { useT } from "@/hooks/use-translations"
import { SERVICES } from "@/constants/services"
import { Icon } from "@/lib/icons"

export function MobileMenu({ open, onClose, pathname }: {
  open: boolean; onClose: () => void; pathname: string
}) {
  const t = useT()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const el = menuRef.current
    if (!el) return

    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return }
      if (e.key !== "Tab") return
      if (focusable.length === 0) { e.preventDefault(); return }
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  const ALL_LINKS = [
    { href: "/", label: t.nav.home },
    { href: "/servicios", label: t.nav.services },
    { href: "/nosotros", label: t.nav.about },
    { href: "/contacto", label: t.nav.contact },
    { href: "/blog", label: t.nav.blog },
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            overflow: "hidden",
            borderTop: "1px solid var(--border-subtle)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          <div style={{
            background: "var(--glass-bg-nav)",
            padding: "12px 12px 20px",
            display: "flex", flexDirection: "column", gap: 2,
          }}>
            {ALL_LINKS.map((link, i) => {
              const active = link.href === "/servicios"
                ? pathname.startsWith("/servicios")
                : pathname === link.href
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 + 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: "block", padding: "11px 14px", borderRadius: 10,
                      fontFamily: "var(--font-ui)", fontSize: "0.9375rem",
                      fontWeight: active ? 600 : 400,
                      color: active ? "var(--fg)" : "var(--fg-secondary)",
                      textDecoration: "none",
                      background: active ? "var(--color-geko-purple-a14)" : "transparent",
                      border: `1px solid ${active ? "var(--color-geko-purple-a28)" : "transparent"}`,
                      transition: "background 0.2s, border-color 0.2s, color 0.2s",
                    }}
                  >
                    {link.label}
                  </Link>
                  {link.href === "/servicios" && (
                    <div style={{ paddingLeft: 12, paddingTop: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                      {SERVICES.map((service) => {
                        const svcActive = pathname === service.href
                        return (
                          <Link
                            key={service.slug}
                            href={service.href}
                            style={{
                              display: "flex", alignItems: "center", gap: 10,
                              padding: "9px 12px", borderRadius: 8, textDecoration: "none",
                              background: svcActive ? `${service.color}12` : "transparent",
                              border: `1px solid ${svcActive ? `${service.color}28` : "transparent"}`,
                              transition: "background 0.2s, border-color 0.2s",
                            }}
                          >
                            <Icon
                              name={service.icon} size={15}
                              color={svcActive ? service.color : "var(--fg-muted)"}
                              strokeWidth={1.5}
                            />
                            <span style={{
                              fontFamily: "var(--font-ui)", fontSize: "0.875rem",
                              color: svcActive ? "var(--fg)" : "var(--fg-secondary)",
                            }}>{service.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </motion.div>
              )
            })}
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border-subtle)" }}>
              <Link
                href="/contacto"
                style={{
                  display: "block", padding: "13px 16px", borderRadius: 10,
                  fontFamily: "var(--font-ui)", fontSize: "0.9375rem",
                  fontWeight: 600, color: "#fff", textDecoration: "none", textAlign: "center",
                  background: "var(--gradient-brand)",
                }}
              >
                {t.nav.cta} →
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
