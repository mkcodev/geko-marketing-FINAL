"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useT } from "@/hooks/use-translations"
import { LangSwitcher } from "./LangSwitcher"
import { MegaMenu } from "./MegaMenu"
import { MobileMenu } from "./MobileMenu"
import { NavLink, IconBtn } from "./NavHelpers"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const pathname = usePathname()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const t = useT()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileOpen(false); setDropdownOpen(false) }, [pathname, isDesktop])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const isServiciosActive = pathname.startsWith("/servicios")
  const logoSrc = theme === "light"
    ? "/logos/geko/purple-minimal-clean.svg"
    : "/logos/geko/white-minimal-clean.svg"

  const NAV_LINKS = [
    { href: "/", label: t.nav.home },
    { href: "/servicios", label: t.nav.services },
    { href: "/nosotros", label: t.nav.about },
    { href: "/contacto", label: t.nav.contact },
  ]

  return (
    <nav
      style={{
        background: scrolled ? "var(--glass-bg-nav)" : "var(--glass-bg-nav-dim)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled
          ? "1px solid var(--color-geko-purple-a25)"
          : "1px solid var(--border-subtle)",
        transition: "background 0.35s ease, border-color 0.35s ease",
        position: "relative",
      }}
    >
      {/* ── Main bar ── */}
      <div className="nav-inner">
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center" }} aria-label="Geko Marketing">
          <div className="nav-logo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} alt="Geko Marketing" style={{ height: "100%", width: "auto", display: "block" }} />
          </div>
        </Link>

        {/* ── DESKTOP: center links ── */}
        <div className="nav-desktop-links">
          {NAV_LINKS.map((link) => {
            if (link.href !== "/servicios") {
              return (
                <NavLink key={link.href} href={link.href} active={pathname === link.href}>
                  {link.label}
                </NavLink>
              )
            }
            return (
              <button
                key={link.href}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => !dropdownOpen && setDropdownOpen(false)}
                onClick={() => setDropdownOpen((o) => !o)}
                style={{
                  position: "relative",
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "6px 14px", borderRadius: 8,
                  fontFamily: "var(--font-ui)", fontSize: "0.875rem",
                  fontWeight: isServiciosActive || dropdownOpen ? 500 : 400,
                  color: isServiciosActive || dropdownOpen
                    ? "var(--fg)"
                    : "var(--fg-secondary)",
                  background: "none", border: "none",
                  cursor: "inherit", whiteSpace: "nowrap",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
                <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={13} strokeWidth={2} />
                </motion.div>
                {isServiciosActive && (
                  <span aria-hidden style={{
                    position: "absolute", bottom: -14, left: "50%",
                    transform: "translateX(-50%)",
                    width: 20, height: 2, borderRadius: 9999,
                    background: "var(--gradient-brand-90)",
                    boxShadow: "0 0 6px var(--color-geko-purple-a60)",
                  }} />
                )}
              </button>
            )
          })}
        </div>

        {/* ── DESKTOP: right controls ── */}
        <div className="nav-desktop-right">
          <NavLink href="/blog" active={pathname === "/blog"}>{t.nav.blog}</NavLink>
          <div style={{ width: 1, height: 18, background: "var(--border-strong)", margin: "0 2px" }} />
          <IconBtn onClick={toggle} label={theme === "dark" ? t.nav.lightMode : t.nav.darkMode}>
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.17 }}
              >
                {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
              </motion.div>
            </AnimatePresence>
          </IconBtn>
          <LangSwitcher />
          <Link
            href="/contacto"
            style={{
              marginLeft: 4, padding: "7px 18px", borderRadius: 9,
              fontFamily: "var(--font-ui)", fontSize: "0.875rem",
              fontWeight: 500, color: "#fff", textDecoration: "none",
              background: "var(--gradient-brand)",
              boxShadow: "0 2px 16px var(--color-geko-purple-a35)",
              whiteSpace: "nowrap",
              transition: "box-shadow 0.2s, transform 0.15s",
            }}
          >
            {t.nav.cta}
          </Link>
        </div>

        {/* ── MOBILE: right side ── */}
        <div className="nav-mobile-right">
          <IconBtn onClick={toggle} label={t.nav.changeLanguage}>
            {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
          </IconBtn>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 38, height: 38, borderRadius: 9,
              border: "1px solid var(--border-strong)",
              background: mobileOpen ? "var(--color-geko-purple-a20)" : "var(--surface)",
              color: "var(--fg)", cursor: "pointer", flexShrink: 0,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileOpen ? "x" : "m"}
                initial={{ rotate: -80, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 80, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Desktop mega-menu ── */}
      {isDesktop && (
        <MegaMenu
          open={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
          pathname={pathname}
        />
      )}

      {/* ── Mobile menu ── */}
      {!isDesktop && (
        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
      )}
    </nav>
  )
}
