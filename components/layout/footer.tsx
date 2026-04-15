"use client"

import Link from "next/link"
import { useRef, useState, type FormEvent } from "react"
import { Send } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useTheme } from "@/components/providers/theme-provider"

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const FADE_UP = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
}

// Social SVG icons
function InstagramIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}
function TikTokIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
function YouTubeIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  )
}

const SOCIALS = [
  { href: "https://instagram.com/geko.marketing", label: "Instagram", icon: <InstagramIcon /> },
  { href: "#", label: "TikTok", icon: <TikTokIcon /> },
  { href: "#", label: "LinkedIn", icon: <LinkedInIcon /> },
  { href: "#", label: "YouTube", icon: <YouTubeIcon /> },
]

const COL_EMPRESA = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
]
const COL_SERVICIOS = [
  { href: "/servicios/redes-sociales", label: "Redes Sociales" },
  { href: "/servicios/branding", label: "Impulso de Marca" },
  { href: "/servicios/web", label: "Páginas Web" },
]
const COL_LEGAL = [
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
  { href: "/aviso-legal", label: "Aviso Legal" },
]

function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "4px 0",
        fontFamily: "var(--font-ui)",
        fontSize: "0.875rem",
        color: "rgba(255,255,255,0.42)",
        textDecoration: "none",
        transition: "color 0.2s",
        lineHeight: 1.5,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.82)" }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.42)" }}
    >
      {children}
    </Link>
  )
}

function FHeading({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "var(--font-heading)",
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.07em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.85)",
      marginBottom: 12,
    }}>
      {children}
    </p>
  )
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const { theme } = useTheme()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("sending")
    await new Promise((r) => setTimeout(r, 800))
    setStatus("sent")
  }

  return (
    <footer style={{ background: "rgba(6,6,13,1)", borderTop: "1px solid rgba(255,255,255,0.07)", position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(107,45,124,0.5), transparent)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 180,
        background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(107,45,124,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="section-container" style={{ paddingTop: 56, paddingBottom: 0 }} ref={ref}>
        {/* Main grid */}
        <motion.div
          className="footer-grid"
          variants={STAGGER}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Brand column — always full width on mobile */}
          <motion.div variants={FADE_UP}>
            <Link href="/" style={{ textDecoration: "none", display: "block", marginBottom: 14 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={theme === "light" ? "/logos/geko/p3.svg" : "/logos/geko/logo-white-full.svg"}
                alt="Geko Marketing"
                style={{ height: 44, width: "auto", display: "block", maxWidth: 300 }}
              />
            </Link>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: "0.9rem",
              color: "rgba(255,255,255,0.42)", lineHeight: 1.7,
              marginBottom: 20, maxWidth: 300,
            }}>
              Transformamos seguidores en clientes reales. Agencia de marketing digital en Tres Cantos, Madrid.
            </p>

            {/* Email CTA */}
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 500, color: "rgba(255,255,255,0.65)", marginBottom: 8 }}>
              ¿Quieres crecer en redes?
            </p>

            {status === "sent" ? (
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.875rem", color: "#9B4DBC" }}>
                ¡Perfecto, te contactamos pronto! 🦎
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, maxWidth: 320 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  style={{
                    flex: 1, minWidth: 0,
                    padding: "9px 13px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.875rem",
                    outline: "none",
                  }}
                  onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(107,45,124,0.55)" }}
                  onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.10)" }}
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-label="Enviar"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 38, height: 38, flexShrink: 0,
                    borderRadius: 8, border: "none",
                    background: "linear-gradient(135deg, #6B2D7C, #1D4ED8)",
                    color: "#fff", cursor: "pointer",
                    opacity: status === "sending" ? 0.6 : 1,
                  }}
                >
                  <Send size={15} />
                </button>
              </form>
            )}

            {/* Social icons */}
            <div className="social-row" style={{ marginTop: 20 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 36, height: 36,
                    borderRadius: 9,
                    border: "1px solid rgba(255,255,255,0.09)",
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.48)",
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = "rgba(107,45,124,0.18)"
                    el.style.color = "#9B4DBC"
                    el.style.borderColor = "rgba(107,45,124,0.35)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = "rgba(255,255,255,0.04)"
                    el.style.color = "rgba(255,255,255,0.48)"
                    el.style.borderColor = "rgba(255,255,255,0.09)"
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Empresa */}
          <motion.div variants={FADE_UP}>
            <FHeading>Empresa</FHeading>
            {COL_EMPRESA.map((l) => <FLink key={l.href} href={l.href}>{l.label}</FLink>)}
          </motion.div>

          {/* Servicios */}
          <motion.div variants={FADE_UP}>
            <FHeading>Servicios</FHeading>
            {COL_SERVICIOS.map((l) => <FLink key={l.href} href={l.href}>{l.label}</FLink>)}

            <div style={{ marginTop: 24 }}>
              <FHeading>Contacto</FHeading>
              <a
                href="mailto:info.gekomarketing@gmail.com"
                style={{ display: "block", padding: "4px 0", fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.42)", textDecoration: "none", wordBreak: "break-all" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.82)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.42)" }}
              >
                info.gekomarketing@gmail.com
              </a>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.28)", padding: "4px 0" }}>Tres Cantos, Madrid</p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.28)", padding: "4px 0" }}>Lun – Vie · 9:00 – 19:00</p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.28)", padding: "4px 0" }}>Sáb · 9:00 – 14:00</p>
            </div>
          </motion.div>

          {/* Legal */}
          <motion.div variants={FADE_UP}>
            <FHeading>Legal</FHeading>
            {COL_LEGAL.map((l) => <FLink key={l.href} href={l.href}>{l.label}</FLink>)}
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Geko Marketing · Tres Cantos, Madrid
          </p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8rem", color: "rgba(255,255,255,0.18)" }}>
            Como un geko, nos adaptamos 🦎
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
