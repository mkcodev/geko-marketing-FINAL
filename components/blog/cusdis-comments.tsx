"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react"
import { MessageCircle, Send, CheckCircle2, AlertCircle, User, Mail, ChevronDown, ChevronUp } from "lucide-react"

const WEB3_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ""

interface CusdisCommentsProps {
  pageId: string
  pageUrl: string
  pageTitle: string
}

type Status = "idle" | "sending" | "success" | "error"

export function CusdisComments({ pageTitle, pageUrl }: CusdisCommentsProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showEmail, setShowEmail] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setStatus("sending")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3_KEY,
          subject: `Nuevo comentario en: ${pageTitle}`,
          from_name: name,
          email: email || "Sin email",
          message: `Artículo: ${pageUrl}\n\n${message}`,
          botcheck: "",
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    background: "var(--surface)",
    border: "1px solid var(--border-strong)",
    fontFamily: "var(--font-ui)",
    fontSize: "0.875rem",
    color: "var(--fg)",
    outline: "none",
    transition: "border-color 0.18s, box-shadow 0.18s",
    boxSizing: "border-box",
  }

  const inputFocused: React.CSSProperties = {
    borderColor: "var(--color-geko-purple)",
    boxShadow: "0 0 0 3px var(--color-geko-purple-a12)",
  }

  const fieldStyle = (id: string): React.CSSProperties =>
    focusedField === id ? { ...inputBase, ...inputFocused } : inputBase

  return (
    <motion.section
      ref={sectionRef}
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: 16 }}
    >
      {/* Divider */}
      <div aria-hidden style={{
        height: 1,
        background: "linear-gradient(90deg, transparent 0%, var(--color-geko-purple-accent-a35) 40%, rgba(59,130,246,0.35) 60%, transparent 100%)",
        marginBottom: 40,
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "var(--color-geko-purple-accent-a10)",
          border: "1px solid var(--color-geko-purple-accent-a22)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--color-geko-purple-accent)", flexShrink: 0,
        }}>
          <MessageCircle size={17} strokeWidth={1.8} />
        </div>
        <div>
          <h3 style={{
            fontFamily: "var(--font-heading)", fontSize: "1.125rem",
            fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)",
            lineHeight: 1, marginBottom: 5,
          }}>
            Deja un comentario
          </h3>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.78rem", color: "var(--fg-subtle)" }}>
            Tu comentario será revisado antes de publicarse.
          </p>
        </div>
      </div>

      {/* Card */}
      <div style={{
        borderRadius: 18,
        padding: "28px 28px 24px",
        background: "var(--surface)",
        border: "1px solid var(--border-subtle)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Top edge highlight */}
        <div aria-hidden style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
          background: "linear-gradient(90deg, transparent, var(--color-geko-purple-accent-a30), transparent)",
          pointerEvents: "none",
        }} />

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={prefersReduced ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 12, padding: "24px 0", textAlign: "center",
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#10B981",
              }}>
                <CheckCircle2 size={22} />
              </div>
              <div>
                <p style={{
                  fontFamily: "var(--font-heading)", fontSize: "1rem",
                  fontWeight: 700, color: "var(--fg)", marginBottom: 6,
                }}>
                  ¡Comentario recibido!
                </p>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", color: "var(--fg-secondary)" }}>
                  Lo revisaremos pronto. Gracias por participar.
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                style={{
                  marginTop: 4, padding: "7px 18px", borderRadius: 8,
                  background: "var(--surface-strong)", border: "1px solid var(--border-strong)",
                  fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
                  color: "var(--fg-secondary)", cursor: "pointer",
                }}
              >
                Escribir otro
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {/* Name */}
              <div>
                <label style={{
                  display: "flex", alignItems: "center", gap: 6, marginBottom: 6,
                  fontFamily: "var(--font-ui)", fontSize: "0.78rem",
                  fontWeight: 500, color: "var(--fg-secondary)",
                }}>
                  <User size={13} />
                  Nombre <span style={{ color: "var(--color-geko-purple-accent)" }}>*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tu nombre"
                  required
                  style={fieldStyle("name")}
                />
              </div>

              {/* Email toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowEmail((v) => !v)}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    background: "none", border: "none", cursor: "pointer", padding: 0,
                    fontFamily: "var(--font-ui)", fontSize: "0.78rem",
                    fontWeight: 500, color: "var(--fg-muted)",
                    marginBottom: showEmail ? 6 : 0,
                  }}
                >
                  <Mail size={13} />
                  Email (opcional)
                  {showEmail ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
                <AnimatePresence>
                  {showEmail && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: "hidden" }}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="tu@email.com"
                        style={fieldStyle("email")}
                      />
                      <p style={{
                        fontFamily: "var(--font-ui)", fontSize: "0.72rem",
                        color: "var(--fg-subtle)", marginTop: 5,
                      }}>
                        Solo se usa para notificarte si respondemos tu comentario.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div>
                <label style={{
                  display: "block", marginBottom: 6,
                  fontFamily: "var(--font-ui)", fontSize: "0.78rem",
                  fontWeight: 500, color: "var(--fg-secondary)",
                }}>
                  Comentario <span style={{ color: "var(--color-geko-purple-accent)" }}>*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="¿Qué opinas? ¿Tienes alguna pregunta?"
                  required
                  rows={4}
                  style={{
                    ...fieldStyle("message"),
                    resize: "vertical",
                    minHeight: 100,
                    lineHeight: 1.6,
                  }}
                />
              </div>

              {/* Honeypot */}
              <input type="checkbox" name="botcheck" style={{ display: "none" }} />

              {/* Error */}
              {status === "error" && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 14px", borderRadius: 8,
                  background: "rgba(239,68,68,0.07)",
                  border: "1px solid rgba(239,68,68,0.20)",
                  fontFamily: "var(--font-ui)", fontSize: "0.8125rem",
                  color: "rgba(239,68,68,0.85)",
                }}>
                  <AlertCircle size={14} />
                  Hubo un error al enviar. Inténtalo de nuevo.
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending" || !name.trim() || !message.trim()}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 8, padding: "11px 24px", borderRadius: 10,
                  background: status === "sending"
                    ? "var(--surface-strong)"
                    : "var(--gradient-brand)",
                  border: "none", cursor: status === "sending" ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-ui)", fontSize: "0.875rem",
                  fontWeight: 600, color: "#fff",
                  boxShadow: status === "sending" ? "none" : "0 4px 20px var(--color-geko-purple-a30)",
                  transition: "opacity 0.2s, box-shadow 0.2s",
                  opacity: (!name.trim() || !message.trim()) ? 0.5 : 1,
                  alignSelf: "flex-start",
                }}
              >
                {status === "sending" ? (
                  <>
                    <span style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Enviar comentario
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: var(--fg-subtle); }
      `}</style>
    </motion.section>
  )
}
