"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { X } from "lucide-react"
import { CALENDLY_URL } from "@/constants/contact"
import { useT } from "@/hooks/use-translations"
import { useScrollEvents } from "@/hooks/use-scroll-events"

const SESSION_KEY = "geko-ann-dismissed"
const SCROLL_THRESHOLD = 60

export function AnnouncementBar() {
  const t = useT()
  const prefersReduced = useReducedMotion()
  // Always start hidden (matches SSR), then read localStorage after hydration
  const [dismissed, setDismissed] = useState(true)
  const [scrolledPast, setScrolledPast] = useState(false)

  useEffect(() => {
    const wasDismissed = Boolean(localStorage.getItem(SESSION_KEY))
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissed(wasDismissed)
    document.documentElement.style.setProperty("--ann-h", wasDismissed ? "0px" : "40px")
  }, [])

  const handleScroll = useCallback((y: number) => {
    if (dismissed) return
    const past = y > SCROLL_THRESHOLD
    setScrolledPast(past)
    document.documentElement.style.setProperty("--ann-h", past ? "0px" : "40px")
  }, [dismissed])
  useScrollEvents(handleScroll)

  const dismiss = () => {
    setDismissed(true)
    localStorage.setItem(SESSION_KEY, "1")
    document.documentElement.style.setProperty("--ann-h", "0px")
  }

  const isVisible = !dismissed && !scrolledPast

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
          animate={prefersReduced ? { opacity: 1 } : { height: 40, opacity: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: prefersReduced ? 0.15 : 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            overflow: "hidden",
            position: "relative",
            background: "linear-gradient(90deg, #4A1F57 0%, var(--color-geko-purple) 45%, var(--color-geko-blue) 100%)",
          }}
        >
          <div
            style={{
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 40px 0 16px",
              position: "relative",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent 0%, var(--border-subtle) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
            <p
              className="ann-text"
              style={{ fontFamily: "var(--font-ui)", color: "#fff", textAlign: "center", lineHeight: 1.3 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/geko/white-minimal-clean.svg" alt="" width={14} height={14} style={{ display: "inline-block", verticalAlign: "middle", marginRight: 5, opacity: 0.9 }} />
              {t.announcementBar.text
                .replace("{spots}", t.announcementBar.spots)
                .replace("{month}", t.announcementBar.month)}{" — "}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#fff",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  textDecorationColor: "var(--fg-secondary)",
                  whiteSpace: "nowrap",
                }}
              >
                {t.announcementBar.cta}
              </a>
            </p>
            <button
              onClick={dismiss}
              aria-label={t.announcementBar.close}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "none",
                background: "var(--fg-faint)",
                color: "var(--fg)",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <X size={12} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
