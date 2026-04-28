"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import type { TocHeading } from "@/lib/toc-utils"

export type { TocHeading }

interface TableOfContentsProps {
  headings: TocHeading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <aside
      style={{
        position: "sticky",
        top: 120,
        maxHeight: "calc(100vh - 160px)",
        overflowY: "auto",
        padding: "20px 0",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "var(--fg-subtle)",
          marginBottom: 14,
          paddingLeft: 12,
        }}
      >
        En este artículo
      </p>

      <nav>
        {headings.map((h) => {
          const isActive = activeId === h.id
          return (
            <motion.a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" })
              }}
              animate={{ opacity: isActive ? 1 : 0.45 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "block",
                paddingLeft: h.level === 2 ? 12 : 24,
                paddingTop: 6,
                paddingBottom: 6,
                borderLeft: `2px solid ${isActive ? "var(--color-geko-purple-accent)" : "var(--border)"}`,
                fontFamily: "var(--font-ui)",
                fontSize: h.level === 2 ? "0.82rem" : "0.78rem",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#C084FC" : "var(--fg-secondary)",
                textDecoration: "none",
                lineHeight: 1.4,
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              {h.text}
            </motion.a>
          )
        })}
      </nav>
    </aside>
  )
}

export { extractHeadings } from "@/lib/toc-utils"
