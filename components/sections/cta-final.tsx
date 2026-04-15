"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Magnetic } from "@/components/ui/magnetic"
import { useMediaQuery } from "@/hooks/use-media-query"

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export function CtaFinal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <section
      ref={ref}
      className="section-container"
      style={{ paddingTop: 80, paddingBottom: 100 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          position: "relative",
          padding: isDesktop ? "72px 64px" : "48px 28px",
          borderRadius: 28,
          background: "linear-gradient(135deg, rgba(107,45,124,0.15) 0%, rgba(29,78,216,0.12) 100%)",
          border: "1px solid rgba(107,45,124,0.25)",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Animated shimmer border */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: 29,
            padding: 1,
            background: "linear-gradient(var(--shimmer-angle, 0deg), rgba(107,45,124,0.0) 0%, rgba(107,45,124,0.8) 40%, rgba(59,130,246,0.8) 60%, rgba(59,130,246,0.0) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
            animation: "border-spin 4s linear infinite",
          }}
        />

        {/* Background orbs */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-30%",
            left: "-5%",
            width: "50%",
            height: "120%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(107,45,124,0.20) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-30%",
            right: "-5%",
            width: "50%",
            height: "120%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(29,78,216,0.18) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        {/* Grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ marginBottom: 20 }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 9999,
                background: "rgba(107,45,124,0.15)",
                border: "1px solid rgba(107,45,124,0.35)",
                fontFamily: "var(--font-ui)",
                fontSize: "0.8125rem",
                color: "#9B4DBC",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#9B4DBC",
                  animation: "pulse-glow 2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              Aceptamos nuevos clientes
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isDesktop ? "clamp(2.25rem, 4vw, 3.5rem)" : "clamp(1.875rem, 8vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.96)",
              marginBottom: 20,
            }}
          >
            ¿Listo para hacer crecer
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              tu negocio?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto 36px",
            }}
          >
            Empieza con una consulta gratuita. Te contamos exactamente qué haríamos con tu marca y qué resultados puedes esperar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}
          >
            <Magnetic>
              <Link
                href="/contacto"
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 32px",
                  borderRadius: 14,
                  fontFamily: "var(--font-ui)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#fff",
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #6B2D7C 0%, #1D4ED8 100%)",
                  boxShadow: "0 4px 32px rgba(107,45,124,0.5)",
                  whiteSpace: "nowrap",
                  animation: "cta-breathe 3s ease-in-out infinite",
                  overflow: "hidden",
                }}
              >
                {/* Shimmer sweep */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
                    animation: "btn-shimmer 2.8s ease-in-out infinite",
                    borderRadius: "inherit",
                    pointerEvents: "none",
                  }}
                />
                Consulta gratuita
                <ArrowRight size={17} />
              </Link>
            </Magnetic>

            <Magnetic>
              <a
                href="tel:+34633197798"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 28px",
                  borderRadius: 14,
                  fontFamily: "var(--font-ui)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.80)",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  whiteSpace: "nowrap",
                }}
              >
                <Phone size={16} />
                633 197 798
              </a>
            </Magnetic>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.35 }}
            style={{
              marginTop: 24,
              fontFamily: "var(--font-ui)",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            Sin compromiso · Sin permanencia · Respuesta en &lt;24h
          </motion.p>
        </div>
      </motion.div>

      <style>{`
        @keyframes border-spin {
          0%   { --shimmer-angle: 0deg }
          100% { --shimmer-angle: 360deg }
        }
        @property --shimmer-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes cta-breathe {
          0%, 100% { box-shadow: 0 4px 32px rgba(107,45,124,0.5); }
          50%       { box-shadow: 0 4px 48px rgba(107,45,124,0.75), 0 0 0 6px rgba(107,45,124,0.12); }
        }
        @keyframes btn-shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
