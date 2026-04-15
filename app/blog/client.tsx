"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ArticleCard } from "@/components/blog/article-card"
import { BlogSearch } from "@/components/blog/blog-search"
import { TagFilter } from "@/components/blog/tag-filter"
import type { BlogPostMeta, Category } from "@/lib/blog-constants"

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

interface BlogClientProps {
  posts: BlogPostMeta[]
}

export function BlogClient({ posts }: BlogClientProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [searchResults, setSearchResults] = useState<BlogPostMeta[] | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  const categoryCounts = useMemo(
    () =>
      posts.reduce<Partial<Record<Category, number>>>((acc, p) => {
        acc[p.category] = (acc[p.category] ?? 0) + 1
        return acc
      }, {}),
    [posts]
  )

  const displayPosts = useMemo(() => {
    const base = searchResults ?? posts
    if (!activeCategory) return base
    return base.filter((p) => p.category === activeCategory)
  }, [posts, searchResults, activeCategory])

  const featured = displayPosts.find((p) => p.featured)
  const rest = displayPosts.filter((p) => !p.featured || searchResults !== null || activeCategory !== null)

  return (
    <div style={{ paddingTop: 64, paddingBottom: 96 }}>
      {/* ── Hero header ── */}
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: 9999,
              background: "rgba(245,158,11,0.10)",
              border: "1px solid rgba(245,158,11,0.25)",
              fontFamily: "var(--font-ui)",
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "#F59E0B",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Blog
          </span>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isDesktop ? "clamp(2.5rem, 4vw, 3.5rem)" : "clamp(2rem, 8vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              color: "rgba(255,255,255,0.96)",
              marginBottom: 14,
            }}
          >
            Ideas que{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #9B4DBC, #3B82F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              impulsan tu negocio
            </span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              color: "rgba(255,255,255,0.42)",
              maxWidth: 480,
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            Estrategias, guías y tendencias de marketing digital.
            Sin relleno — solo lo que funciona.
          </p>

          {/* Search */}
          <BlogSearch posts={posts} onResults={setSearchResults} />
        </motion.div>

        {/* Tag filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          style={{ marginBottom: 48 }}
        >
          <TagFilter
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
            counts={categoryCounts}
          />
        </motion.div>

        {/* Results count when filtering */}
        {(searchResults !== null || activeCategory !== null) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.28)",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            {displayPosts.length === 0
              ? "No se encontraron artículos"
              : `${displayPosts.length} artículo${displayPosts.length !== 1 ? "s" : ""} encontrado${displayPosts.length !== 1 ? "s" : ""}`}
          </motion.p>
        )}

        {/* Featured article (only when no filter active) */}
        {featured && searchResults === null && activeCategory === null && (
          <div style={{ marginBottom: isDesktop ? 36 : 24 }}>
            <ArticleCard post={featured} index={0} featured />
          </div>
        )}

        {/* Grid — auto 2-col on wide screens when 2 posts, 3-col otherwise */}
        {displayPosts.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isDesktop
                ? rest.length === 2
                  ? "repeat(2, 1fr)"
                  : "repeat(3, 1fr)"
                : "1fr",
              gap: 20,
            }}
          >
            {(searchResults !== null || activeCategory !== null ? displayPosts : rest).map(
              (post, i) => (
                <ArticleCard key={post.slug} post={post} index={i} />
              )
            )}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "rgba(255,255,255,0.28)",
              fontFamily: "var(--font-ui)",
              fontSize: "0.9rem",
            }}
          >
            No hay artículos en esta categoría todavía.
          </div>
        )}
      </div>
    </div>
  )
}
