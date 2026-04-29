"use client"

import Link from "next/link"
import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { ArticleCard } from "@/components/blog/article-card"
import { GradientText } from "@/components/ui/gradient-text"
import { EASE } from "@/lib/animations"
import { Section } from "@/components/ui/section"
import type { BlogPostMeta } from "@/lib/blog-constants"

interface UltimosArticulosProps {
  posts: BlogPostMeta[]
}

export function UltimosArticulos({ posts }: UltimosArticulosProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const prefersReduced = useReducedMotion()

  const visible = isInView || prefersReduced

  if (posts.length === 0) return null

  return (
    <Section>
      <div ref={ref} className="section-container">
        {/* Header */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: "var(--section-header-mb)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}
        >
          <div>
            <p style={{
              fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 600,
              letterSpacing: "0.10em", textTransform: "uppercase",
              color: "var(--color-geko-purple-accent)", marginBottom: 10,
            }}>
              Del blog
            </p>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
              fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em",
              color: "var(--fg)", margin: 0,
            }}>
              Últimos artículos
              <br />
              <GradientText>de marketing digital</GradientText>
            </h2>
          </div>

          <Link
            href="/blog"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "11px 22px", borderRadius: 10,
              border: "1px solid var(--border-strong)",
              background: "var(--surface)",
              fontFamily: "var(--font-ui)", fontSize: "0.875rem", fontWeight: 500,
              color: "var(--fg-secondary)", textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            Ver todos los artículos
            <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          gap: 24,
        }}>
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={prefersReduced ? false : { opacity: 0, y: 32 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <ArticleCard post={post} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
