"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useState, type FormEvent } from "react"
import { Send } from "lucide-react"
import { motion, useInView } from "motion/react"
import { CONTACT_EMAIL, CONTACT_LOCATION } from "@/constants/contact"
import { useT } from "@/hooks/use-translations"
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
function LinkedInIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


const SOCIALS = [
  { href: "https://www.instagram.com/geko.mkt", label: "Instagram", icon: <InstagramIcon /> },
  { href: "https://www.linkedin.com/company/geko-marketing", label: "LinkedIn", icon: <LinkedInIcon /> },
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
        color: "var(--fg-secondary)",
        textDecoration: "none",
        transition: "color 0.2s",
        lineHeight: 1.5,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)" }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg-secondary)" }}
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
      color: "var(--fg)",
      marginBottom: 12,
    }}>
      {children}
    </p>
  )
}

export function Footer() {
  const t = useT()
  const { theme } = useTheme()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const logoSrc = theme === "light"
    ? "/logos/geko/purple-minimal-clean.svg"
    : "/logos/geko/white-minimal-clean.svg"

  const COL_EMPRESA = [
    { href: "/", label: t.footer.links.home },
    { href: "/servicios", label: t.footer.links.services },
    { href: "/nosotros", label: t.footer.links.about },
    { href: "/blog", label: t.footer.links.blog },
    { href: "/contacto", label: t.footer.links.contact },
  ]
  const COL_SERVICIOS = [
    { href: "/servicios/gestion-redes", label: t.footer.links.social },
    { href: "/servicios/branding", label: t.footer.links.branding },
    { href: "/servicios/paginas-web", label: t.footer.links.web },
  ]
  const COL_LEGAL = [
    { href: "/privacidad", label: t.footer.links.privacy },
    { href: "/cookies", label: t.footer.links.cookies },
    { href: "/aviso-legal", label: t.footer.links.legal },
  ]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("sending")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          to: CONTACT_EMAIL,
          subject: "Nuevo lead desde el footer — Geko Marketing",
          from_name: "Footer Lead",
          email,
          message: `Un usuario ha dejado su email desde el footer del sitio web.\n\nEmail: ${email}\n\nContactar para presentar servicios y agendar consulta gratuita.`,
        }),
      })
      const data = await res.json()
      if (data.success) setStatus("sent")
      else setStatus("idle")
    } catch {
      setStatus("idle")
    }
  }

  return (
    <footer style={{ background: "var(--bg-raised)", borderTop: "1px solid var(--border-subtle)", position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: 1,
        background: "linear-gradient(90deg, transparent, var(--color-geko-purple-a50), transparent)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 180,
        background: "radial-gradient(ellipse 70% 100% at 50% 0%, var(--color-geko-purple-a07) 0%, transparent 70%)",
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
            <Link href="/" style={{ textDecoration: "none", display: "block", marginBottom: 14, textAlign: "center" }}>
              <Image
                src={logoSrc}
                alt="Geko Marketing"
                width={741}
                height={150}
                style={{ height: 44, width: "auto", display: "inline-block", maxWidth: 280 }}
              />
            </Link>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: "0.9rem",
              color: "var(--fg-secondary)", lineHeight: 1.7,
              marginBottom: 20, maxWidth: 300,
            }}>
              {t.footer.disclaimer}
            </p>

            {/* Email CTA */}
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", fontWeight: 500, color: "var(--fg-secondary)", marginBottom: 8 }}>
              {t.footer.newsletter.title}
            </p>

            {status === "sent" ? (
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.875rem", color: "var(--color-geko-purple-accent)" }}>
                {t.footer.newsletter.success}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="footer-brand-form" style={{ display: "flex", gap: 8, maxWidth: 320 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  style={{
                    flex: 1, minWidth: 0,
                    padding: "9px 13px",
                    borderRadius: 8,
                    border: "1px solid var(--border-strong)",
                    background: "var(--surface)",
                    color: "var(--fg)",
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.875rem",
                    outline: "none",
                  }}
                  onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--color-geko-purple-a55)" }}
                  onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--border-strong)" }}
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-label="Enviar"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 38, height: 38, flexShrink: 0,
                    borderRadius: 8, border: "none",
                    background: "linear-gradient(135deg, var(--color-geko-purple), var(--color-geko-blue))",
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
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    color: "var(--fg-secondary)",
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = "var(--color-geko-purple-a18)"
                    el.style.color = "var(--color-geko-purple-accent)"
                    el.style.borderColor = "var(--color-geko-purple-a35)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = "var(--surface)"
                    el.style.color = "var(--fg-secondary)"
                    el.style.borderColor = "var(--border)"
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Empresa */}
          <motion.div variants={FADE_UP}>
            <FHeading>{t.footer.company}</FHeading>
            {COL_EMPRESA.map((l) => <FLink key={l.href} href={l.href}>{l.label}</FLink>)}
          </motion.div>

          {/* Servicios */}
          <motion.div variants={FADE_UP}>
            <FHeading>{t.footer.services}</FHeading>
            {COL_SERVICIOS.map((l) => <FLink key={l.href} href={l.href}>{l.label}</FLink>)}

            <div style={{ marginTop: 24 }}>
              <FHeading>{t.nav.contact}</FHeading>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{ display: "block", padding: "4px 0", fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "var(--fg-secondary)", textDecoration: "none", wordBreak: "break-all" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg-secondary)" }}
              >
                {CONTACT_EMAIL}
              </a>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "var(--fg-subtle)", padding: "4px 0" }}>{CONTACT_LOCATION}</p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "var(--fg-subtle)", padding: "4px 0" }}>Lun – Vie · 9:00 – 19:00</p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8125rem", color: "var(--fg-subtle)", padding: "4px 0" }}>Sáb · 9:00 – 14:00</p>
            </div>
          </motion.div>

          {/* Legal */}
          <motion.div variants={FADE_UP}>
            <FHeading>{t.footer.legal}</FHeading>
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
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8rem", color: "var(--fg-subtle)" }}>
            © {new Date().getFullYear()} Geko Marketing · Tres Cantos, Madrid
          </p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8rem", color: "var(--fg-faint)" }}>
            {t.footer.rights}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
