"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X as XIcon, Link2, MessageCircle, Check } from "lucide-react"

interface ShareButtonsProps {
  title: string
  slug: string
}

function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://geko-marketing.com/blog/${slug}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const buttons = [
    {
      label: "Twitter / X",
      icon: <XIcon size={15} />,
      color: "#1DA1F2",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "LinkedIn",
      icon: <LinkedInIcon size={15} />,
      color: "#0077B5",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      icon: <MessageCircle size={15} />,
      color: "#25D366",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ]

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "0.78rem",
          color: "var(--fg-muted)",
          marginRight: 4,
        }}
      >
        Compartir:
      </span>

      {buttons.map((btn) => (
        <a
          key={btn.label}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartir en ${btn.label}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: 9,
            background: `${btn.color}15`,
            border: `1px solid ${btn.color}30`,
            color: btn.color,
            textDecoration: "none",
            transition: "background 0.2s, border-color 0.2s, transform 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${btn.color}25`
            e.currentTarget.style.transform = "translateY(-2px)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `${btn.color}15`
            e.currentTarget.style.transform = "translateY(0)"
          }}
        >
          {btn.icon}
        </a>
      ))}

      {/* Copy link */}
      <button
        onClick={copyLink}
        aria-label="Copiar enlace"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "0 12px",
          height: 36,
          borderRadius: 9,
          background: copied ? "rgba(16,185,129,0.12)" : "var(--border-subtle)",
          border: `1px solid ${copied ? "rgba(16,185,129,0.30)" : "var(--border-strong)"}`,
          color: copied ? "#10B981" : "var(--fg-secondary)",
          fontFamily: "var(--font-ui)",
          fontSize: "0.78rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <Check size={14} />
              ¡Copiado!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <Link2 size={14} />
              Copiar
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
