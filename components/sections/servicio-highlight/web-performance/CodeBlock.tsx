"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { EASE } from "@/lib/animations"

const CODE_LINES = [
  { indent: 0, content: "<", accent: "tag", rest: "Page", close: ">" },
  { indent: 1, content: "<", accent: "tag", rest: "Hero title", close: ' loading="eager" />' },
  { indent: 1, content: "<", accent: "tag", rest: "Image", close: ' priority width={1200} />' },
  { indent: 1, content: "<", accent: "tag", rest: "Section", close: ">" },
  { indent: 2, content: "<", accent: "tag", rest: "Feature", close: " />" },
  { indent: 1, content: "</", accent: "tag", rest: "Section", close: ">" },
  { indent: 0, content: "</", accent: "tag", rest: "Page", close: ">" },
]

interface CodeBlockProps {
  started: boolean
  prefersReduced?: boolean
}

export function CodeBlock({ started, prefersReduced = false }: CodeBlockProps) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (!started) return
    if (prefersReduced) { setVisibleLines(CODE_LINES.length); return }
    let i = 0
    const timer = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i >= CODE_LINES.length) clearInterval(timer)
    }, 200)
    return () => clearInterval(timer)
  }, [started, prefersReduced])

  return (
    <div style={{
      borderRadius: 14,
      background: "#0d0d1a",
      border: "1px solid var(--color-geko-purple-a25)",
      overflow: "hidden",
      fontFamily: "'Geist Variable', monospace",
      fontSize: "0.78rem",
      lineHeight: 1.7,
    }}>
      <div style={{
        padding: "10px 14px",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: "var(--fg-subtle)" }}>
          page.tsx — Next.js 16
        </span>
        <div style={{
          marginLeft: "auto",
          padding: "1px 7px", borderRadius: 4,
          background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)",
          fontFamily: "var(--font-ui)", fontSize: "0.6rem", color: "#22C55E",
        }}>✓ 0 errors</div>
      </div>

      <div style={{ padding: "12px 0" }}>
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={i < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{ padding: "0 16px", display: "flex", gap: 0 }}
          >
            <span style={{ color: "var(--fg-faint)", marginRight: 16, minWidth: 20, textAlign: "right", userSelect: "none" }}>
              {i + 1}
            </span>
            <span>
              {"  ".repeat(line.indent)}
              <span style={{ color: "var(--color-geko-purple-accent-a90)" }}>{line.content}</span>
              <span style={{ color: "#60A5FA" }}>{line.rest}</span>
              <span style={{ color: "var(--color-geko-purple-accent-a90)" }}>{line.close}</span>
            </span>
          </motion.div>
        ))}
        {visibleLines < CODE_LINES.length && (
          <div style={{ padding: "0 16px", display: "flex", gap: 16 }}>
            <span style={{ color: "var(--fg-faint)", minWidth: 20, textAlign: "right" }}>
              {visibleLines + 1}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ color: "var(--color-geko-purple-accent)" }}
            >▌</motion.span>
          </div>
        )}
      </div>
    </div>
  )
}
