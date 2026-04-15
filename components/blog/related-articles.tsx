import Link from "next/link"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { Icon } from "@/lib/icons"
import { CATEGORY_META, formatDate } from "@/lib/blog-constants"
import type { BlogPostMeta } from "@/lib/blog-constants"

interface RelatedArticlesProps {
  posts: BlogPostMeta[]
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (!posts.length) return null

  return (
    <section>
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.375rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "rgba(255,255,255,0.90)",
          marginBottom: 20,
        }}
      >
        Artículos relacionados
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${posts.length}, 1fr)`,
          gap: 16,
        }}
      >
        {posts.map((post) => {
          const cat = CATEGORY_META[post.category]
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="related-card"
                style={{
                  padding: "18px 20px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${cat.color}35`
                  e.currentTarget.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                {/* Category */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    alignSelf: "flex-start",
                  }}
                >
                  <Icon
                    name={cat.icon as import("@/lib/icons").IconName}
                    size={12}
                    color={cat.color}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: cat.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {cat.label}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.9375rem",
                    fontWeight: 700,
                    lineHeight: 1.35,
                    letterSpacing: "-0.01em",
                    color: "rgba(255,255,255,0.88)",
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.title}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 10,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div style={{ display: "flex", gap: 10 }}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.28)",
                      }}
                    >
                      <Calendar size={10} />
                      {formatDate(post.publishDate)}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.28)",
                      }}
                    >
                      <Clock size={10} />
                      {post.readingTime} min
                    </span>
                  </div>
                  <ArrowRight size={13} color={cat.color} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
