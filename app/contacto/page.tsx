"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { CalendlyCard } from "@/components/ui/calendly-popup"

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const CONTACT_INFO = [
  {
    icon: <Phone size={18} />,
    label: "Teléfono",
    value: "633 197 798",
    href: "tel:+34633197798",
  },
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "hola@geko.mkt",
    href: "mailto:hola@geko.mkt",
  },
  {
    icon: <MapPin size={18} />,
    label: "Ubicación",
    value: "Tres Cantos, Madrid",
    href: null,
  },
  {
    icon: <Clock size={18} />,
    label: "Horario",
    value: "Lun–Vie 9:00–18:00",
    href: null,
  },
]

export default function ContactoPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
    service: "",
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="section-container" style={{ paddingTop: 60, paddingBottom: 80 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ marginBottom: 56, maxWidth: 560 }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 9999,
            background: "rgba(107,45,124,0.12)",
            border: "1px solid rgba(107,45,124,0.30)",
            fontFamily: "var(--font-ui)",
            fontSize: "0.78rem",
            fontWeight: 500,
            color: "#9B4DBC",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Contacto
        </span>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: isDesktop ? "clamp(2.25rem, 4vw, 3.5rem)" : "clamp(1.875rem, 8vw, 2.75rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "rgba(255,255,255,0.96)",
            marginBottom: 16,
          }}
        >
          Hablemos sobre
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            tu proyecto
          </span>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.0625rem",
            color: "rgba(255,255,255,0.48)",
            lineHeight: 1.7,
          }}
        >
          Cuéntanos tu situación y en menos de 24 horas te contactamos con una propuesta inicial sin compromiso.
        </p>
      </motion.div>

      {/* Grid: form + info */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 380px" : "1fr",
          gap: isDesktop ? 48 : 40,
          alignItems: "start",
        }}
      >
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          {sent ? (
            <SuccessState />
          ) : (
            <ContactForm
              form={form}
              setForm={setForm}
              onSubmit={handleSubmit}
              loading={loading}
            />
          )}
        </motion.div>

        {/* Info sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* Contact info card */}
          <div
            style={{
              padding: "28px 24px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.90)",
                marginBottom: 20,
              }}
            >
              Información de contacto
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {CONTACT_INFO.map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: "rgba(107,45,124,0.12)",
                      border: "1px solid rgba(107,45,124,0.22)",
                      color: "#9B4DBC",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.30)",
                        marginBottom: 2,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: "0.9375rem",
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.80)",
                          textDecoration: "none",
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: "0.9375rem",
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.80)",
                        }}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendly booking card */}
          <CalendlyCard />

          {/* Response time badge */}
          <div
            style={{
              padding: "18px 20px",
              borderRadius: 16,
              background: "rgba(16,185,129,0.06)",
              border: "1px solid rgba(16,185,129,0.20)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#10B981",
                flexShrink: 0,
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: "#10B981" }}>Respuesta garantizada</strong> en menos de 24 horas laborables.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ── Form ──────────────────────────────────────────────────────

interface FormState {
  name: string
  email: string
  phone: string
  business: string
  message: string
  service: string
}

function ContactForm({
  form,
  setForm,
  onSubmit,
  loading,
}: {
  form: FormState
  setForm: (f: FormState) => void
  onSubmit: (e: FormEvent) => void
  loading: boolean
}) {
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    fontFamily: "var(--font-ui)",
    fontSize: "0.9375rem",
    color: "rgba(255,255,255,0.85)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-ui)",
    fontSize: "0.82rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.50)",
    marginBottom: 6,
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Name + Email row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label htmlFor="name" style={labelStyle}>Nombre *</label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Tu nombre"
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="email" style={labelStyle}>Email *</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="tu@email.com"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Phone + Business */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label htmlFor="phone" style={labelStyle}>Teléfono</label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="600 000 000"
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="business" style={labelStyle}>Empresa / Negocio</label>
            <input
              id="business"
              type="text"
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              placeholder="Nombre de tu negocio"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Service selector */}
        <div>
          <label htmlFor="service" style={labelStyle}>¿Qué servicio te interesa?</label>
          <select
            id="service"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            style={{ ...inputStyle, appearance: "none" }}
          >
            <option value="">Selecciona un servicio</option>
            <option value="social">Gestión de Redes Sociales</option>
            <option value="ads">Publicidad Digital</option>
            <option value="seo">SEO & Contenido</option>
            <option value="email">Email Marketing</option>
            <option value="branding">Branding & Diseño</option>
            <option value="full">Pack completo (todos los servicios)</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" style={labelStyle}>Cuéntanos sobre tu proyecto *</label>
          <textarea
            id="message"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="¿Cuál es tu situación actual? ¿Qué objetivos tienes? ¿Cuál es tu presupuesto aproximado?"
            rows={5}
            style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "15px 32px",
            borderRadius: 12,
            background: loading ? "rgba(107,45,124,0.4)" : "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
            border: "none",
            fontFamily: "var(--font-ui)",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#fff",
            cursor: loading ? "wait" : "pointer",
            boxShadow: loading ? "none" : "0 4px 24px rgba(107,45,124,0.45)",
            transition: "opacity 0.2s, box-shadow 0.2s",
          }}
        >
          {loading ? (
            <>
              <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin-slow 0.7s linear infinite" }} />
              Enviando...
            </>
          ) : (
            <>
              Enviar mensaje
              <Send size={16} />
            </>
          )}
        </button>

        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.78rem", color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
          Tus datos son tratados de forma confidencial. Sin spam.
        </p>
      </div>
    </form>
  )
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: "48px 32px",
        borderRadius: 20,
        background: "rgba(16,185,129,0.06)",
        border: "1px solid rgba(16,185,129,0.25)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "rgba(16,185,129,0.15)",
          color: "#10B981",
          marginBottom: 20,
        }}
      >
        <CheckCircle size={32} />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#fff",
          marginBottom: 12,
          letterSpacing: "-0.02em",
        }}
      >
        ¡Mensaje recibido!
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          color: "rgba(255,255,255,0.50)",
          lineHeight: 1.7,
          maxWidth: 380,
          margin: "0 auto",
        }}
      >
        Te contactaremos en menos de 24 horas para agendar una consulta gratuita y hablar sobre cómo podemos ayudarte.
      </p>
    </motion.div>
  )
}
