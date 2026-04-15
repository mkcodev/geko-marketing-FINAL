// Server-only — uses Node.js fs via keystatic createReader
import { createReader } from "@keystatic/core/reader"
import keystaticConfig from "@/keystatic.config"
import type { BlogPost, BlogPostMeta, Category } from "@/lib/blog-constants"

export type { Category, BlogPost, BlogPostMeta } from "@/lib/blog-constants"
export { CATEGORY_META, formatDate } from "@/lib/blog-constants"

const WORDS_PER_MINUTE = 200

function estimateReadingTime(content: BlogPost["content"]): number {
  let wordCount = 0
  function countWords(nodes: unknown[]): void {
    for (const node of nodes) {
      const n = node as Record<string, unknown>
      if (typeof n.text === "string") {
        wordCount += n.text.split(/\s+/).filter(Boolean).length
      }
      if (Array.isArray(n.children)) {
        countWords(n.children as unknown[])
      }
    }
  }
  countWords(content as unknown[])
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

const reader = createReader(process.cwd(), keystaticConfig)

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const entries = await reader.collections.blog.all()
  const posts = await Promise.all(
    entries.map(async ({ slug, entry }) => {
      const content = await entry.content()
      return {
        slug,
        title: entry.title,
        excerpt: entry.excerpt,
        publishDate: entry.publishDate ?? "",
        category: entry.category as Category,
        tags: entry.tags.map((t) => (typeof t === "string" ? t : "")),
        author: entry.author,
        featured: entry.featured,
        readingTime: estimateReadingTime(content),
      } satisfies BlogPostMeta
    })
  )

  return posts
    .filter((p) => p.publishDate)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    })
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const entry = await reader.collections.blog.read(slug)
  if (!entry) return null
  const content = await entry.content()
  return {
    slug,
    title: entry.title,
    excerpt: entry.excerpt,
    publishDate: entry.publishDate ?? "",
    category: entry.category as Category,
    tags: entry.tags.map((t) => (typeof t === "string" ? t : "")),
    author: entry.author,
    featured: entry.featured,
    readingTime: estimateReadingTime(content),
    content,
  }
}

export async function getRelatedPosts(
  slug: string,
  category: Category,
  limit = 3
): Promise<BlogPostMeta[]> {
  const all = await getAllPosts()
  return all
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit)
}

export async function getAllSlugs(): Promise<string[]> {
  const slugs = await reader.collections.blog.list()
  return slugs
}
