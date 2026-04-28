"use client"

import { useState, useCallback } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact"
import { motion, useReducedMotion } from "motion/react"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import { useMediaQuery } from "@/hooks/use-media-query"
import { CalendlyCard } from "@/components/ui/calendly-popup"
import { Label } from "@/components/ui/label"
import { GradientText } from "@/components/ui/gradient-text"
import { EASE } from "@/lib/animations"
import { useT } from "@/hooks/use-translations"
import type { Messages } from "@/hooks/use-translations"
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  CONTACT_LOCATION,
  CONTACT_HOURS,
} from "@/constants/contact"

async function submitContact(data: ContactFormData, recaptchaToken: string): Promise<void> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      to: "info@geko-marketing.com",
      subject: `Nuevo contacto de ${data.name} — Geko Marketing`,
      from_name: data.name,
      botcheck: false,
      "g-recaptcha-response": recaptchaToken,
      ...data,
    }),
  })
  const json = await res.json()
  if (!json.success) throw new Error(json.message ?? "Error")
}

export function ContactoClient() {
  const t = useT()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const { executeRecaptcha } = useGoogleReCaptcha()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = useCallback(async (data: ContactFormData) => {
    try {
      const token = executeRecaptcha ? await executeRecaptcha("contact_form") : ""
      await submitContact(data, token)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }, [executeRecaptcha])

  const anim = (delay = 0) => ({
    initial: prefersReduced ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: prefersReduced ? { duration: 0 } : { duration: 0.6, delay, ease: EASE },
  })

  const CONTACT_INFO = [
    { icon: <Phone size={18} />, label: t.contact.info.phone, value: CONTACT_PHONE, href: CONTACT_PHONE_HREF },
    { icon: <Mail size={18} />, label: t.contact.info.email, value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: <MapPin size={18} />, label: t.contact.info.location, value: CONTACT_LOCATION, href: null },
    { icon: <Clock size={18} />, label: t.contact.info.hours, value: CONTACT_HOURS, href: null },
  ]

  return (
    <div className="section-container" style={{ paddingTop: "var(--section-padding-v)", paddingBottom: "var(--section-padding-v)" }}>
      {/* Header */}
      <motion.div {...anim()} style={{ marginBottom: 56, maxWidth: 560 }}>
        <div style={{ marginBottom: 16 }}>
          <Label>{t.contact.label}</Label>
        </div>
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: isDesktop ? "clamp(2.25rem, 4vw, 3.5rem)" : "clamp(1.875rem, 8vw, 2.75rem)",
          fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em",
          color: "var(--fg)", marginBottom: 16,
        }}>
          {t.contact.headline}
          <br />
          <GradientText>{t.contact.headlineAccent}</GradientText>
        </h1>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "1.0625rem",
          color: "var(--fg-secondary)", lineHeight: 1.7,
        }}>
          {t.contact.subheadline}
        </p>
      </motion.div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isDesktop ? "1fr 380px" : "1fr",
        gap: isDesktop ? 48 : 40,
        alignItems: "start",
      }}>
        {/* Form */}
        <motion.div {...anim(0.1)}>
          {status === "success" ? (
            <SuccessState t={t} />
          ) : (
            <ContactForm
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit(onSubmit)}
              submitFailed={status === "error"}
              t={t}
            />
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div
          {...anim(0.2)}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* Contact info */}
          <div style={{
            padding: "28px 24px", borderRadius: 20,
            background: "var(--surface)",
            border: "1px solid var(--border-subtle)",
          }}>
            <h3 style={{
              fontFamily: "var(--font-heading)", fontSize: "1.125rem",
              fontWeight: 700, color: "var(--fg)", marginBottom: 20,
            }}>
              {t.contact.info.title}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {CONTACT_INFO.map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: "var(--color-geko-purple-a12)",
                    border: "1px solid var(--color-geko-purple-a22)",
                    color: "var(--color-geko-purple-accent)",
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-ui)", fontSize: "0.75rem",
                      color: "var(--fg-muted)", marginBottom: 2,
                      letterSpacing: "0.04em", textTransform: "uppercase",
                    }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} style={{
                        fontFamily: "var(--font-ui)", fontSize: "0.9375rem",
                        fontWeight: 500, color: "var(--fg)", textDecoration: "none",
                      }}>
                        {item.value}
                      </a>
                    ) : (
                      <p style={{
                        fontFamily: "var(--font-ui)", fontSize: "0.9375rem",
                        fontWeight: 500, color: "var(--fg)",
                      }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CalendlyCard />

          {/* Response badge */}
          <div style={{
            padding: "18px 20px", borderRadius: 16,
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.20)",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: "#10B981", flexShrink: 0,
              animation: "pulse-glow 2s ease-in-out infinite",
            }} />
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.875rem",
              color: "var(--fg-secondary)", lineHeight: 1.5,
            }}>
              <strong style={{ color: "#10B981" }}>{t.contact.responseGuarantee}</strong>{" "}
              {t.contact.responseTime}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ── Form ──────────────────────────────────────────────────────

const INPUT_STYLE: React.CSSProperties = {
  width: "100%", padding: "13px 16px", borderRadius: 12,
  background: "var(--surface)",
  border: "1px solid var(--border)",
  fontFamily: "var(--font-ui)", fontSize: "0.9375rem",
  color: "var(--fg)",
  boxSizing: "border-box",
}

const LABEL_STYLE: React.CSSProperties = {
  display: "block", fontFamily: "var(--font-ui)", fontSize: "0.82rem",
  fontWeight: 500, color: "var(--fg-secondary)", marginBottom: 6,
}

const ERROR_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-ui)", fontSize: "0.75rem",
  color: "#EF4444", marginTop: 5,
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p style={ERROR_STYLE}>{message}</p>
}

function ContactForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
  submitFailed,
  t,
}: {
  register: UseFormRegister<ContactFormData>
  errors: FieldErrors<ContactFormData>
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
  submitFailed: boolean
  t: Messages
}) {
  const f = t.contact.form
  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Honeypot anti-spam — bots lo rellenan, Web3Forms lo rechaza */}
      <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Name + Email */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label htmlFor="name" style={LABEL_STYLE}>{f.name} *</label>
            <input id="name" type="text" placeholder={f.namePlaceholder} className="geko-input" style={INPUT_STYLE} {...register("name")} />
            <FieldError message={errors.name?.message} />
          </div>
          <div>
            <label htmlFor="email" style={LABEL_STYLE}>{f.email} *</label>
            <input id="email" type="email" placeholder={f.emailPlaceholder} className="geko-input" style={INPUT_STYLE} {...register("email")} />
            <FieldError message={errors.email?.message} />
          </div>
        </div>

        {/* Phone + Business */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label htmlFor="phone" style={LABEL_STYLE}>{f.phone}</label>
            <input id="phone" type="tel" placeholder={f.phonePlaceholder} className="geko-input" style={INPUT_STYLE} {...register("phone")} />
          </div>
          <div>
            <label htmlFor="business" style={LABEL_STYLE}>{f.business}</label>
            <input id="business" type="text" placeholder={f.businessPlaceholder} className="geko-input" style={INPUT_STYLE} {...register("business")} />
          </div>
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" style={LABEL_STYLE}>{f.service}</label>
          <select id="service" className="geko-input" style={{ ...INPUT_STYLE, appearance: "none" }} {...register("service")}>
            <option value="">{f.servicePlaceholder}</option>
            <option value="social">{f.serviceOptions.social}</option>
            <option value="ads">{f.serviceOptions.ads}</option>
            <option value="seo">{f.serviceOptions.seo}</option>
            <option value="email">{f.serviceOptions.email}</option>
            <option value="branding">{f.serviceOptions.branding}</option>
            <option value="full">{f.serviceOptions.full}</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" style={LABEL_STYLE}>{f.message} *</label>
          <textarea
            id="message"
            placeholder={f.messagePlaceholder}
            rows={5}
            className="geko-input"
            style={{ ...INPUT_STYLE, resize: "vertical", minHeight: 120 }}
            {...register("message")}
          />
          <FieldError message={errors.message?.message} />
        </div>

        {/* Submit error */}
        {submitFailed && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "12px 16px", borderRadius: 10,
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.25)",
          }}>
            <AlertCircle size={16} color="#EF4444" />
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.875rem", color: "#EF4444" }}>
              {t.contact.error.message}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#EF4444" }}>{CONTACT_EMAIL}</a>
            </p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "15px 32px", borderRadius: 12, border: "none",
            background: isSubmitting
              ? "var(--color-geko-purple-a40)"
              : "var(--gradient-brand)",
            fontFamily: "var(--font-ui)", fontSize: "1rem", fontWeight: 600,
            color: "#fff", cursor: isSubmitting ? "wait" : "pointer",
            boxShadow: isSubmitting ? "none" : "0 4px 24px var(--color-geko-purple-a45)",
            transition: "opacity 0.2s, box-shadow 0.2s",
          }}
        >
          {isSubmitting ? (
            <>
              <span style={{
                width: 16, height: 16, borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff",
                animation: "spin-slow 0.7s linear infinite",
              }} />
              {f.submitting}
            </>
          ) : (
            <>{f.submit} <Send size={16} /></>
          )}
        </button>

        <p style={{
          fontFamily: "var(--font-ui)", fontSize: "0.78rem",
          color: "var(--fg-subtle)", textAlign: "center",
        }}>
          {f.privacy}
        </p>
      </div>
    </form>
  )
}

// ── Success ───────────────────────────────────────────────────

function SuccessState({ t }: { t: Messages }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: "48px 32px", borderRadius: 20, textAlign: "center",
        background: "rgba(16,185,129,0.06)",
        border: "1px solid rgba(16,185,129,0.25)",
      }}
    >
      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 64, height: 64, borderRadius: "50%", marginBottom: 20,
        background: "rgba(16,185,129,0.15)", color: "#10B981",
      }}>
        <CheckCircle size={32} />
      </div>
      <h3 style={{
        fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700,
        color: "#fff", marginBottom: 12, letterSpacing: "-0.02em",
      }}>
        {t.contact.success.title}
      </h3>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: "1rem",
        color: "var(--fg-secondary)", lineHeight: 1.7,
        maxWidth: 380, margin: "0 auto",
      }}>
        {t.contact.success.message}
      </p>
    </motion.div>
  )
}
