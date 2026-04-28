"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useMotionValue, useTransform, useReducedMotion } from "motion/react"
import { Clock, Calendar, ArrowUpRight } from "lucide-react"
import { Icon } from "@/lib/icons"
import { CATEGORY_META, formatDate } from "@/lib/blog-constants"
import type { BlogPostMeta } from "@/lib/blog-constants"
import { EASE } from "@/lib/animations"

interface ArticleCardProps {
  post: BlogPostMeta
  index?: number
  featured?: boolean
}

export function ArticleCard({ post, index = 0, featured = false }: ArticleCardProps) {
  const cat = CATEGORY_META[post.category]

  if (featured) return <FeaturedCard post={post} cat={cat} />
  return <StandardCard post={post} index={index} cat={cat} />
}

// ─── Featured hero card (full-width editorial) ─────────────────────────────

function FeaturedCard({
  post,
  cat,
}: {
  post: BlogPostMeta
  cat: (typeof CATEGORY_META)[keyof typeof CATEGORY_META]
}) {
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <motion.article
      initial={prefersReduced ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: EASE }}
    >
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            borderRadius: 24,
            background: "var(--surface)",
            border: `1px solid ${hovered ? "var(--border-strong)" : "var(--border-subtle)"}`,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: 280,
            transition: "border-color 0.3s, box-shadow 0.3s",
            boxShadow: hovered
              ? "0 24px 56px rgba(0,0,0,0.35), 0 0 48px var(--color-geko-purple-a10)"
              : "0 4px 24px rgba(0,0,0,0.18)",
          }}
        >
          {/* Left: gradient cover */}
          <div
            style={{
              background: cat.gradient,
              position: "relative",
              overflow: "hidden",
              minHeight: 240,
            }}
          >
            {/* Background icon */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                bottom: -20,
                left: -20,
                opacity: 0.10,
                transform: hovered ? "scale(1.08) rotate(-5deg)" : "scale(1) rotate(0deg)",
                transition: "transform 0.5s ease",
              }}
            >
              <Icon name={cat.icon as import("@/lib/icons").IconName} size={200} color="#fff" />
            </div>

            {/* Category badge */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 9999,
                background: "rgba(0,0,0,0.30)",
                backdropFilter: "blur(10px)",
                border: "1px solid var(--fg-faint)",
              }}
            >
              <Icon name={cat.icon as import("@/lib/icons").IconName} size={12} color="#fff" />
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {cat.label}
              </span>
            </div>

            {/* Featured badge */}
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                padding: "4px 12px",
                borderRadius: 9999,
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(245,158,11,0.45)",
                fontFamily: "var(--font-ui)",
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#F59E0B",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              ★ Destacado
            </div>

            {/* Reading time bottom */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontFamily: "var(--font-ui)",
                fontSize: "0.75rem",
                color: "var(--fg-secondary)",
              }}
            >
              <Clock size={12} />
              {post.readingTime} min de lectura
            </div>
          </div>

          {/* Right: content */}
          <div
            style={{
              padding: "32px 32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: cat.color,
                  marginBottom: 14,
                }}
              >
                Artículo destacado
              </p>

              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: "-0.025em",
                  color: "var(--fg)",
                  marginBottom: 14,
                }}
              >
                {post.title}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  color: "var(--fg-secondary)",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.excerpt}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 20,
                borderTop: "1px solid var(--border-subtle)",
                marginTop: 24,
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.78rem",
                  color: "var(--fg-muted)",
                }}
              >
                <Calendar size={12} />
                {formatDate(post.publishDate)}
              </span>

              <motion.div
                animate={{ x: hovered ? 3 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: cat.color,
                }}
              >
                Leer artículo
                <ArrowUpRight size={15} />
              </motion.div>
            </div>
          </div>

          {/* Hover ambient glow */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 60% 40% at 20% 50%, ${cat.color}09 0%, transparent 70%)`,
              pointerEvents: "none",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.4s",
            }}
          />
        </div>
      </Link>
    </motion.article>
  )
}

// ─── Standard grid card ────────────────────────────────────────────────────

function StandardCard({
  post,
  index,
  cat,
}: {
  post: BlogPostMeta
  index: number
  cat: (typeof CATEGORY_META)[keyof typeof CATEGORY_META]
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glowX = useTransform(mouseX, (v) => v - 100)
  const glowY = useTransform(mouseY, (v) => v - 100)
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <motion.article
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.5, delay: index * 0.08, ease: EASE }}
      style={{ height: "100%" }}
    >
      <Link
        href={`/blog/${post.slug}`}
        style={{ textDecoration: "none", display: "block", height: "100%" }}
      >
        <div
          ref={cardRef}
          onMouseMove={(e) => {
            const rect = cardRef.current?.getBoundingClientRect()
            if (!rect) return
            mouseX.set(e.clientX - rect.left)
            mouseY.set(e.clientY - rect.top)
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            borderRadius: 20,
            background: "var(--surface)",
            border: `1px solid ${hovered ? "var(--border-strong)" : "var(--border-subtle)"}`,
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            boxShadow: hovered
              ? "0 20px 48px rgba(0,0,0,0.32), 0 0 40px var(--color-geko-purple-a08)"
              : "0 2px 16px rgba(0,0,0,0.14)",
          }}
        >
          {/* Cursor glow */}
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${cat.color}18 0%, transparent 70%)`,
              pointerEvents: "none",
              zIndex: 0,
              x: glowX,
              y: glowY,
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          />

          {/* Cover */}
          <div
            style={{
              height: 168,
              background: cat.gradient,
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                bottom: -16,
                right: -12,
                opacity: 0.11,
                transform: hovered ? "scale(1.05) translateX(4px)" : "scale(1)",
                transition: "transform 0.4s ease",
              }}
            >
              <Icon name={cat.icon as import("@/lib/icons").IconName} size={110} color="#fff" />
            </div>

            {/* Category pill */}
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 11px",
                borderRadius: 9999,
                background: "rgba(0,0,0,0.32)",
                backdropFilter: "blur(8px)",
                border: "1px solid var(--border-strong)",
              }}
            >
              <Icon name={cat.icon as import("@/lib/icons").IconName} size={10} color="#fff" />
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.67rem",
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {cat.label}
              </span>
            </div>

            {/* Reading time */}
            <div
              style={{
                position: "absolute",
                bottom: 12,
                right: 14,
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 9px",
                borderRadius: 9999,
                background: "rgba(0,0,0,0.30)",
                backdropFilter: "blur(8px)",
                fontFamily: "var(--font-ui)",
                fontSize: "0.68rem",
                color: "var(--fg-secondary)",
              }}
            >
              <Clock size={10} />
              {post.readingTime} min
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              padding: "20px 22px 22px",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              position: "relative",
              zIndex: 1,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.0625rem",
                fontWeight: 700,
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                color: "var(--fg)",
                marginBottom: 10,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.title}
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                lineHeight: 1.65,
                color: "var(--fg-muted)",
                marginBottom: 18,
                flex: 1,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  flexWrap: "wrap",
                  marginBottom: 16,
                }}
              >
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "2px 9px",
                      borderRadius: 6,
                      background: `${cat.color}12`,
                      border: `1px solid ${cat.color}22`,
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.67rem",
                      color: cat.color,
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 14,
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.75rem",
                  color: "var(--fg-subtle)",
                }}
              >
                <Calendar size={11} />
                {formatDate(post.publishDate)}
              </span>

              <motion.div
                animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.45 }}
                transition={{ duration: 0.18 }}
                style={{ color: cat.color }}
              >
                <ArrowUpRight size={16} />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
