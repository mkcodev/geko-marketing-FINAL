"use client"

import { useEffect, useState, useCallback } from "react"
import type Lenis from "lenis"
import { useScrollEvents } from "@/hooks/use-scroll-events"

declare global { interface Window { __lenis?: Lenis } }
import { motion, AnimatePresence } from "motion/react"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  const handleScroll = useCallback((y: number) => {
    setVisible(y > window.innerHeight * 1.8)
  }, [])
  useScrollEvents(handleScroll)

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          onClick={scrollToTop}
          aria-label="Volver arriba"
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 50,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid var(--color-geko-purple-accent-a45)",
            background: "rgba(12,12,24,0.80)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "var(--fg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(0,0,0,0.35), 0 0 20px var(--color-geko-purple-accent-a18)",
          }}
        >
          <ArrowUp size={18} strokeWidth={2.2} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
