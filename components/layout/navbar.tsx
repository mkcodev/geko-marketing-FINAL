"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun, Globe, ArrowRight, ChevronDown } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SERVICES } from "@/constants/services"
import { Icon } from "@/lib/icons"

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

const MEGA_STATS = [
  { value: "+247%", label: "Engagement", sub: "media en 90 días" },
  { value: "×4.2",  label: "ROAS",       sub: "en Meta & Google" },
  { value: "98/100",label: "PageSpeed",  sub: "velocidad web" },
]

const MEGA_TAGS = ["Sin permanencia", "Resultados en 60 días", "Soporte prioritario"]

// ── Mega-menu panel ───────────────────────────────────────────
function MegaMenu({ open, onClose, pathname }: {
  open: boolean; onClose: () => void; pathname: string
}) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          onMouseLeave={onClose}
          style={{
            position: "absolute",
            top: "100%",
            left: 0, right: 0,
            zIndex: 300,
            borderTop: "1px solid rgba(107,45,124,0.20)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(6,6,16,0.98)",
            backdropFilter: "blur(24px) saturate(180%)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.55), 0 0 80px rgba(107,45,124,0.07)",
          }}
        >
          <div style={{
            maxWidth: 1400,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1px 380px",
            minHeight: 240,
          }}>
            {/* ── Left: proof panel ── */}
            <div style={{
              padding: "32px 36px 32px 28px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              {/* Purple glow */}
              <div aria-hidden style={{
                position: "absolute", top: "-30%", left: "-5%",
                width: "55%", height: "100%",
                background: "radial-gradient(ellipse, rgba(107,45,124,0.10) 0%, transparent 70%)",
                filter: "blur(50px)", pointerEvents: "none",
              }} />

              {/* Label + headline */}
              <div style={{ position: "relative", zIndex: 1, marginBottom: 24 }}>
                <p style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.68rem", fontWeight: 600,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "rgba(155,77,188,0.75)", marginBottom: 8,
                }}>
                  Por qué Geko
                </p>
                <p style={{
                  fontFamily: "var(--font-heading)", fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
                  fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2,
                  color: "rgba(255,255,255,0.88)",
                }}>
                  Resultados reales,<br />
                  <span style={{
                    background: "linear-gradient(90deg, #9B4DBC, #3B82F6)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>medidos desde el día 1.</span>
                </p>
              </div>

              {/* Stats row */}
              <div style={{
                position: "relative", zIndex: 1,
                display: "flex", gap: 12, marginBottom: 20,
              }}>
                {MEGA_STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 + 0.06, duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      flex: 1,
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p style={{
                      fontFamily: "var(--font-heading)", fontSize: "1.375rem",
                      fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1,
                      background: "linear-gradient(135deg, #9B4DBC, #3B82F6)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      backgroundClip: "text", marginBottom: 4,
                    }}>
                      {stat.value}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-ui)", fontSize: "0.78rem",
                      fontWeight: 600, color: "rgba(255,255,255,0.65)", marginBottom: 2,
                    }}>
                      {stat.label}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-ui)", fontSize: "0.69rem",
                      color: "rgba(255,255,255,0.28)", lineHeight: 1.3,
                    }}>
                      {stat.sub}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Differentiator tags */}
              <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 6, flexWrap: "wrap" }}>
                {MEGA_TAGS.map((tag) => (
                  <span key={tag} style={{
                    padding: "4px 10px", borderRadius: 6,
                    background: "rgba(107,45,124,0.10)",
                    border: "1px solid rgba(107,45,124,0.22)",
                    fontFamily: "var(--font-ui)", fontSize: "0.69rem",
                    fontWeight: 500, color: "rgba(155,77,188,0.80)",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Divider ── */}
            <div style={{ background: "rgba(255,255,255,0.06)", margin: "28px 0" }} />

            {/* ── Right: service cards ── */}
            <div style={{
              padding: "28px 24px 28px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              justifyContent: "center",
            }}>
              {SERVICES.map((service, i) => {
                const isActive = pathname.startsWith(service.href)
                const isHovered = hoveredSlug === service.slug
                return (
                  <Link key={service.slug} href={service.href} style={{ textDecoration: "none" }}>
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.04, duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
                      onMouseEnter={() => setHoveredSlug(service.slug)}
                      onMouseLeave={() => setHoveredSlug(null)}
                      style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "13px 16px", borderRadius: 12,
                        background: isActive || isHovered ? `${service.color}0E` : "transparent",
                        border: isActive || isHovered
                          ? `1px solid ${service.color}28`
                          : "1px solid transparent",
                        transition: "background 0.2s ease, border-color 0.2s ease",
                      }}
                    >
                      {/* Icon box */}
                      <div style={{
                        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                        background: isHovered || isActive ? `${service.color}18` : "rgba(255,255,255,0.05)",
                        border: `1px solid ${isHovered || isActive ? service.color + "30" : "rgba(255,255,255,0.08)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.2s, border-color 0.2s",
                      }}>
                        <Icon
                          name={service.icon} size={18}
                          color={isHovered || isActive ? service.color : "rgba(255,255,255,0.40)"}
                          strokeWidth={1.75}
                          style={{ transition: "color 0.2s" }}
                        />
                      </div>

                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontFamily: "var(--font-ui)", fontSize: "0.9rem", fontWeight: 600,
                          color: isHovered || isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.65)",
                          marginBottom: 2, transition: "color 0.2s",
                        }}>{service.name}</p>
                        <p style={{
                          fontFamily: "var(--font-body)", fontSize: "0.75rem",
                          color: "rgba(255,255,255,0.28)", lineHeight: 1.35,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>{service.tagline}</p>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        animate={{ x: isHovered ? 3 : 0, opacity: isHovered ? 1 : 0.25 }}
                        transition={{ duration: 0.18 }}
                        style={{ flexShrink: 0, color: service.color }}
                      >
                        <ArrowRight size={15} strokeWidth={2} />
                      </motion.div>
                    </motion.div>
                  </Link>
                )
              })}

              {/* Footer link */}
              <div style={{ marginTop: 6, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <Link
                  href="/servicios"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "9px 16px", borderRadius: 9,
                    background: "rgba(107,45,124,0.08)",
                    border: "1px solid rgba(107,45,124,0.20)",
                    textDecoration: "none",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-ui)", fontSize: "0.8rem",
                    fontWeight: 500, color: "#9B4DBC",
                  }}>Ver comparativa completa</span>
                  <ArrowRight size={13} color="#9B4DBC" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Navbar ────────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const pathname = usePathname()
  const isDesktop = useMediaQuery("(min-width: 768px)")

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

  return (
    <nav
      style={{
        background: scrolled ? "rgba(8,8,16,0.92)" : "rgba(8,8,16,0.4)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled
          ? "1px solid rgba(107,45,124,0.25)"
          : "1px solid rgba(255,255,255,0.06)",
        transition: "background 0.35s ease, border-color 0.35s ease",
        position: "relative",
      }}
    >
      {/* ── Main bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: isDesktop ? 64 : 56,
          padding: isDesktop ? "0 28px" : "0 16px",
          gap: 8,
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }} aria-label="Geko Marketing">
          <Image
            src="/logos/geko/white-minimal-clean.svg"
            alt="Geko Marketing"
            width={741}
            height={150}
            priority
            style={{
              height: isDesktop ? 26 : 22,
              width: "auto",
              display: "block",
              marginLeft: isDesktop ? 8 : 4,
            }}
          />
        </Link>

        {/* ── DESKTOP: center links ── */}
        {isDesktop && (
          <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: 2 }}>
            {NAV_LINKS.map((link) => {
              if (link.href !== "/servicios") {
                return (
                  <NavLink key={link.href} href={link.href} active={pathname === link.href}>
                    {link.label}
                  </NavLink>
                )
              }
              // Servicios — triggers mega-menu
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
                      ? "rgba(255,255,255,0.96)"
                      : "rgba(255,255,255,0.50)",
                    background: "none", border: "none",
                    cursor: "inherit", whiteSpace: "nowrap",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={13} strokeWidth={2} />
                  </motion.div>
                  {(isServiciosActive) && (
                    <span aria-hidden style={{
                      position: "absolute", bottom: -14, left: "50%",
                      transform: "translateX(-50%)",
                      width: 20, height: 2, borderRadius: 9999,
                      background: "linear-gradient(90deg, #6B2D7C, #3B82F6)",
                      boxShadow: "0 0 6px rgba(107,45,124,0.6)",
                    }} />
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* ── DESKTOP: right controls ── */}
        {isDesktop && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <NavLink href="/blog" active={pathname === "/blog"}>Blog</NavLink>
            <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.10)", margin: "0 2px" }} />
            <IconBtn onClick={toggle} label={theme === "dark" ? "Modo claro" : "Modo oscuro"}>
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
            <IconBtn label="Idioma" style={{ gap: 5, padding: "0 11px", width: "auto" }}>
              <Globe size={13} />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 500 }}>ES</span>
            </IconBtn>
            <Link
              href="/contacto"
              style={{
                marginLeft: 4, padding: "7px 18px", borderRadius: 9,
                fontFamily: "var(--font-ui)", fontSize: "0.875rem",
                fontWeight: 500, color: "#fff", textDecoration: "none",
                background: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
                boxShadow: "0 2px 16px rgba(107,45,124,0.35)",
                whiteSpace: "nowrap",
                transition: "box-shadow 0.2s, transform 0.15s",
              }}
            >
              Hablemos
            </Link>
          </div>
        )}

        {/* ── MOBILE: right side ── */}
        {!isDesktop && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <IconBtn onClick={toggle} label="Cambiar tema">
              {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
            </IconBtn>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 38, height: 38, borderRadius: 9,
                border: "1px solid rgba(255,255,255,0.10)",
                background: mobileOpen ? "rgba(107,45,124,0.2)" : "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.85)", cursor: "pointer", flexShrink: 0,
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
        )}
      </div>

      {/* ── Desktop mega-menu ── */}
      {isDesktop && (
        <MegaMenu
          open={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
          pathname={pathname}
        />
      )}

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {!isDesktop && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              overflow: "hidden",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
            }}
          >
            <div style={{
              background: "rgba(6,6,14,0.92)",
              padding: "12px 12px 20px",
              display: "flex", flexDirection: "column", gap: 2,
            }}>
              {[...NAV_LINKS, { href: "/blog", label: "Blog" }].map((link, i) => {
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
                        color: active ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.55)",
                        textDecoration: "none",
                        background: active ? "rgba(107,45,124,0.14)" : "transparent",
                        border: `1px solid ${active ? "rgba(107,45,124,0.28)" : "transparent"}`,
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
                                color={svcActive ? service.color : "rgba(255,255,255,0.30)"}
                                strokeWidth={1.5}
                              />
                              <span style={{
                                fontFamily: "var(--font-ui)", fontSize: "0.875rem",
                                color: svcActive ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.42)",
                              }}>{service.name}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </motion.div>
                )
              })}
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <Link
                  href="/contacto"
                  style={{
                    display: "block", padding: "13px 16px", borderRadius: 10,
                    fontFamily: "var(--font-ui)", fontSize: "0.9375rem",
                    fontWeight: 600, color: "#fff", textDecoration: "none",
                    textAlign: "center",
                    background: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
                  }}
                >
                  Hablemos →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// ── Helpers ───────────────────────────────────────────────────

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        position: "relative", padding: "6px 14px", borderRadius: 8,
        fontFamily: "var(--font-ui)", fontSize: "0.875rem",
        fontWeight: active ? 500 : 400,
        color: active ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.50)",
        textDecoration: "none", whiteSpace: "nowrap", transition: "color 0.2s",
      }}
    >
      {children}
      {active && (
        <span aria-hidden style={{
          position: "absolute", bottom: -14, left: "50%",
          transform: "translateX(-50%)",
          width: 20, height: 2, borderRadius: 9999,
          background: "linear-gradient(90deg, #6B2D7C, #3B82F6)",
          boxShadow: "0 0 6px rgba(107,45,124,0.6)",
        }} />
      )}
    </Link>
  )
}

function IconBtn({ children, onClick, label, style }: {
  children: React.ReactNode; onClick?: () => void; label?: string; style?: React.CSSProperties
}) {
  return (
    <button
      onClick={onClick} aria-label={label}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 34, height: 34, borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.09)",
        background: "rgba(255,255,255,0.04)",
        color: "rgba(255,255,255,0.60)", cursor: "pointer", flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </button>
  )
}
