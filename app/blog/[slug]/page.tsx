import React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Clock, Calendar, ArrowLeft } from "lucide-react"
import { getAllSlugs, getPost, getRelatedPosts, CATEGORY_META, formatDate } from "@/lib/blog"
import { Icon } from "@/lib/icons"
import { DocumentRenderer } from "@keystatic/core/renderer"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { extractHeadings } from "@/lib/toc-utils"
import { ShareButtons } from "@/components/blog/share-buttons"
import { AuthorCard } from "@/components/blog/author-card"
import { RelatedArticles } from "@/components/blog/related-articles"
import { ArticleReadingProgress } from "@/components/blog/reading-progress"
import { CusdisComments } from "@/components/blog/cusdis-wrapper"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const url = `https://geko-marketing.com/blog/${slug}`
  const cat = CATEGORY_META[post.category]

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: "Guillermo · Geko Marketing" }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${post.title} | Geko Marketing`,
      description: post.excerpt,
      url,
      publishedTime: post.publishDate,
      authors: ["Guillermo · Geko Marketing"],
      tags: post.tags,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/og-image.jpg"],
    },
    other: { "article:section": cat.label },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const related = await getRelatedPosts(slug, post.category)
  const cat = CATEGORY_META[post.category]

  // Extract headings for ToC
  const headings = extractHeadings(
    post.content as Array<{ type: string; level?: number; children?: Array<{ text?: string }> }>
  )

  // JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    url: `https://geko-marketing.com/blog/${slug}`,
    author: {
      "@type": "Person",
      name: "Guillermo",
      url: "https://geko-marketing.com/nosotros",
    },
    publisher: {
      "@type": "Organization",
      name: "Geko Marketing",
      logo: { "@type": "ImageObject", url: "https://geko-marketing.com/logos/geko/purple-minimal-clean.svg" },
    },
    keywords: post.tags.join(", "),
    articleSection: cat.label,
    image: "https://geko-marketing.com/og-image.jpg",
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://geko-marketing.com/blog/${slug}` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArticleReadingProgress />

      <div style={{ paddingTop: "var(--section-padding-tight)", paddingBottom: "var(--section-padding-v)" }}>
        <div className="section-container">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 32,
              fontFamily: "var(--font-ui)",
              fontSize: "0.78rem",
              color: "var(--fg-muted)",
            }}
          >
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              Inicio
            </Link>
            <span>/</span>
            <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>
              Blog
            </Link>
            <span>/</span>
            <span
              style={{
                color: "var(--fg-secondary)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 200,
              }}
            >
              {post.title}
            </span>
          </nav>

          {/* Two-column layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr min(680px, 100%) 1fr",
              gap: 0,
            }}
          >
            {/* Empty left */}
            <div />

            {/* Main content column */}
            <article>
              {/* Article header */}
              <header style={{ marginBottom: 40 }}>
                {/* Category + meta */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "5px 12px",
                      borderRadius: 9999,
                      background: `${cat.color}15`,
                      border: `1px solid ${cat.color}30`,
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: cat.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    <Icon
                      name={cat.icon as import("@/lib/icons").IconName}
                      size={11}
                      color={cat.color}
                    />
                    {cat.label}
                  </span>

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.78rem",
                      color: "var(--fg-subtle)",
                    }}
                  >
                    <Calendar size={12} />
                    {formatDate(post.publishDate)}
                  </span>

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.78rem",
                      color: "var(--fg-subtle)",
                    }}
                  >
                    <Clock size={12} />
                    {post.readingTime} min de lectura
                  </span>
                </div>

                {/* Title */}
                <h1
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.625rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.035em",
                    color: "var(--fg)",
                    marginBottom: 18,
                  }}
                >
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.125rem",
                    lineHeight: 1.7,
                    color: "var(--fg-secondary)",
                    marginBottom: 24,
                    borderLeft: "3px solid var(--color-geko-purple-accent-a50)",
                    paddingLeft: 16,
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Share + tags */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap",
                    paddingBottom: 28,
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <ShareButtons title={post.title} slug={post.slug} />

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "3px 9px",
                          borderRadius: 6,
                          background: "var(--border-subtle)",
                          border: "1px solid var(--border)",
                          fontFamily: "var(--font-ui)",
                          fontSize: "0.72rem",
                          color: "var(--fg-muted)",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </header>

              {/* Article content */}
              <div id="article-content">
                <DocumentRenderer
                  document={post.content}
                  componentBlocks={{}}
                  renderers={{
                    inline: {
                      bold: ({ children }) => (
                        <strong style={{ color: "var(--fg)", fontWeight: 700 }}>
                          {children}
                        </strong>
                      ),
                      italic: ({ children }) => (
                        <em style={{ color: "var(--fg-secondary)", fontStyle: "italic" }}>
                          {children}
                        </em>
                      ),
                      underline: ({ children }) => (
                        <span style={{ textDecoration: "underline", textDecorationColor: "var(--color-geko-purple-accent-a60)" }}>
                          {children}
                        </span>
                      ),
                      code: ({ children }) => (
                        <code
                          style={{
                            fontFamily: "monospace",
                            fontSize: "0.875em",
                            background: "var(--color-geko-purple-a15)",
                            border: "1px solid var(--color-geko-purple-a25)",
                            borderRadius: 4,
                            padding: "1px 6px",
                            color: "#C084FC",
                          }}
                        >
                          {children}
                        </code>
                      ),
                      link: ({ href, children }) => (
                        <a
                          href={href}
                          style={{
                            color: "var(--color-geko-purple-accent)",
                            textDecoration: "underline",
                            textDecorationColor: "var(--color-geko-purple-accent-a40)",
                          }}
                        >
                          {children}
                        </a>
                      ),
                    },
                    block: {
                      paragraph: ({ children, textAlign }) => (
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "1.0625rem",
                            lineHeight: 1.8,
                            color: "var(--fg-secondary)",
                            marginBottom: "1.25em",
                            textAlign: textAlign ?? "left",
                          }}
                        >
                          {children}
                        </p>
                      ),
                      heading: ({ level, children, textAlign }) => {
                        const sizes: Record<number, string> = {
                          2: "1.625rem",
                          3: "1.25rem",
                          4: "1.0625rem",
                        }
                        const text =
                          typeof children === "string"
                            ? children
                            : Array.isArray(children)
                            ? (children as React.ReactNode[]).join("")
                            : ""
                        const id = String(text)
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/[^a-z0-9\s-]/g, "")
                          .replace(/\s+/g, "-")

                        const Tag = `h${level}` as keyof React.JSX.IntrinsicElements
                        return (
                          <Tag
                            id={id}
                            style={{
                              fontFamily: "var(--font-heading)",
                              fontSize: sizes[level] ?? "1rem",
                              fontWeight: 700,
                              lineHeight: 1.25,
                              letterSpacing: "-0.02em",
                              color: "var(--fg)",
                              marginTop: "2em",
                              marginBottom: "0.6em",
                              scrollMarginTop: "100px",
                              textAlign: textAlign ?? "left",
                            }}
                          >
                            {children}
                          </Tag>
                        )
                      },
                      list: ({ type, children }) => {
                        const listStyle = {
                          marginBottom: "1.25em",
                          paddingLeft: "1.5em",
                          display: "flex" as const,
                          flexDirection: "column" as const,
                          gap: "0.5em",
                        }
                        return type === "ordered" ? (
                          <ol style={listStyle}>{children}</ol>
                        ) : (
                          <ul style={listStyle}>{children}</ul>
                        )
                      },
                      blockquote: ({ children }) => (
                        <blockquote
                          style={{
                            borderLeft: "3px solid var(--color-geko-purple-accent-a60)",
                            paddingLeft: 20,
                            marginLeft: 0,
                            marginBottom: "1.5em",
                            background: "var(--color-geko-purple-a06)",
                            borderRadius: "0 10px 10px 0",
                            padding: "16px 20px",
                          }}
                        >
                          {children}
                        </blockquote>
                      ),
                      code: ({ children, language }) => (
                        <pre
                          style={{
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                            borderRadius: 12,
                            padding: "20px 24px",
                            overflowX: "auto",
                            marginBottom: "1.5em",
                            position: "relative",
                          }}
                        >
                          {language && (
                            <span
                              style={{
                                position: "absolute",
                                top: 10,
                                right: 14,
                                fontFamily: "var(--font-ui)",
                                fontSize: "0.65rem",
                                fontWeight: 600,
                                color: "var(--fg-subtle)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {language}
                            </span>
                          )}
                          <code
                            style={{
                              fontFamily: "monospace",
                              fontSize: "0.9rem",
                              lineHeight: 1.7,
                              color: "var(--fg)",
                            }}
                          >
                            {children}
                          </code>
                        </pre>
                      ),
                      divider: () => (
                        <hr
                          style={{
                            border: "none",
                            borderTop: "1px solid var(--border-subtle)",
                            margin: "2.5em 0",
                          }}
                        />
                      ),
                    },
                  }}
                />
              </div>

              {/* Post footer */}
              <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 32 }}>
                {/* Tags */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.75rem",
                      color: "var(--fg-subtle)",
                      marginRight: 4,
                    }}
                  >
                    Etiquetas:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 7,
                        background: "var(--border-subtle)",
                        border: "1px solid var(--border)",
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.75rem",
                        color: "var(--fg-muted)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Share again */}
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.82rem",
                      color: "var(--fg-muted)",
                      marginBottom: 12,
                    }}
                  >
                    ¿Te ha sido útil? Compártelo con quien lo necesite.
                  </p>
                  <ShareButtons title={post.title} slug={post.slug} />
                </div>

                {/* CTA */}
                <div
                  style={{
                    padding: "28px 32px",
                    borderRadius: 18,
                    background: "linear-gradient(135deg, var(--color-geko-purple-a12) 0%, var(--color-geko-blue-a08) 100%)",
                    border: "1px solid var(--color-geko-purple-a25)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "var(--fg)",
                      marginBottom: 8,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    ¿Quieres aplicar esto en tu negocio?
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      color: "var(--fg-muted)",
                      marginBottom: 20,
                      lineHeight: 1.6,
                    }}
                  >
                    Hacemos un diagnóstico gratuito de tu situación actual y te contamos qué oportunidades estás dejando pasar. Sin compromiso.
                  </p>
                  <Link
                    href="/contacto"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "11px 22px",
                      borderRadius: 10,
                      background: "linear-gradient(135deg, var(--color-geko-purple), var(--color-geko-blue))",
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#fff",
                      textDecoration: "none",
                      boxShadow: "0 4px 16px var(--color-geko-purple-a35)",
                    }}
                  >
                    Habla con nosotros →
                  </Link>
                </div>

                {/* Author card */}
                <AuthorCard author={post.author as "guillermo"} />

                {/* Back to blog */}
                <Link
                  href="/blog"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.85rem",
                    color: "var(--fg-muted)",
                    textDecoration: "none",
                    alignSelf: "flex-start",
                  }}
                >
                  <ArrowLeft size={14} />
                  Volver al blog
                </Link>

                {/* Comments */}
                <CusdisComments
                  pageId={slug}
                  pageUrl={`https://geko-marketing.com/blog/${slug}`}
                  pageTitle={post.title}
                />

                {/* Related articles */}
                {related.length > 0 && (
                  <RelatedArticles posts={related} />
                )}
              </div>
            </article>

            {/* ToC column (desktop) */}
            <div
              style={{
                paddingLeft: 40,
                display: "none",
              }}
              className="toc-column"
            >
              <TableOfContents headings={headings} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1200px) {
          .toc-column { display: block !important; }
        }
      `}</style>
    </>
  )
}
