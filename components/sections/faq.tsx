"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { EASE } from "@/lib/animations"

const FAQS = [
  {
    q: "¿Cuánto tiempo tarda en verse resultados?",
    a: "Los primeros resultados medibles suelen aparecer entre las semanas 4-8. Las métricas de engagement mejoran rápidamente, mientras que el impacto en ventas se consolida en 60-90 días. Somos transparentes: si algo no funciona, lo ajustamos.",
  },
  {
    q: "¿Gestionáis todos los tipos de negocio?",
    a: "Trabajamos con pymes, autónomos y marcas en crecimiento de cualquier sector. Nos especializamos en negocios locales, e-commerce, servicios profesionales y hostelería. Si tienes dudas sobre si somos el fit correcto, cuéntanoslo en la consulta gratuita.",
  },
  {
    q: "¿Tengo que firmar un contrato de permanencia?",
    a: "No. Todos nuestros planes son mensuales y sin permanencia. Puedes cancelar cuando quieras con 15 días de antelación. Confiamos en los resultados para retenerte, no en las letras pequeñas.",
  },
  {
    q: "¿Qué incluye la consulta gratuita?",
    a: "Una videollamada de 30-45 minutos donde analizamos tu situación actual, tus objetivos y te presentamos una hoja de ruta preliminar. Sin presión, sin ventas agresivas. Si no somos el partner adecuado para ti, te lo diremos.",
  },
  {
    q: "¿Quién crea el contenido?",
    a: "Nuestro equipo interno de copywriters y diseñadores crea todo el contenido adaptado a tu voz de marca. Tú revisas y apruebas antes de publicar. Con el tiempo, el proceso se vuelve más fluido y requiere menos de tu tiempo.",
  },
  {
    q: "¿Puedo cambiar de plan más adelante?",
    a: "Por supuesto. Puedes subir o bajar de plan en cualquier momento. Muchos clientes empiezan con Silver y escalan a Gold cuando ven resultados. El cambio se aplica en el próximo ciclo de facturación.",
  },
]

export function Faq() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReduced = useReducedMotion()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      className="section-container"
      style={{ paddingTop: 80, paddingBottom: 80 }}
    >
      {/* Header */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: EASE }}
        style={{ marginBottom: 48, textAlign: "center" }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 9999,
            background: "rgba(16,185,129,0.10)",
            border: "1px solid rgba(16,185,129,0.25)",
            fontFamily: "var(--font-ui)",
            fontSize: "0.78rem",
            fontWeight: 500,
            color: "#10B981",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          FAQ
        </span>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: isDesktop ? "clamp(2rem, 3.5vw, 3rem)" : "clamp(1.75rem, 7vw, 2.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "rgba(255,255,255,0.96)",
          }}
        >
          Preguntas frecuentes
        </h2>
      </motion.div>

      {/* Accordion */}
      <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
        {FAQS.map((faq, i) => (
          <motion.div
            key={i}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={prefersReduced || inView ? { opacity: 1, y: 0 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.45, delay: i * 0.06, ease: EASE }}
          >
            <div
              style={{
                borderRadius: 14,
                border: open === i ? "1px solid rgba(107,45,124,0.35)" : "1px solid rgba(255,255,255,0.07)",
                background: open === i ? "rgba(107,45,124,0.06)" : "rgba(255,255,255,0.02)",
                overflow: "hidden",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              {/* Question */}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: open === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.78)",
                    lineHeight: 1.3,
                  }}
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.25 }}
                  style={{ flexShrink: 0, color: open === i ? "#9B4DBC" : "rgba(255,255,255,0.30)" }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={prefersReduced ? { duration: 0 } : { duration: 0.28, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      style={{
                        padding: "0 24px 20px",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9375rem",
                        color: "rgba(255,255,255,0.48)",
                        lineHeight: 1.7,
                      }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
