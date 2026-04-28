import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import React from "react"
import { BlogSearch } from "@/components/blog/blog-search"
import type { BlogPostMeta } from "@/lib/blog-constants"

vi.mock("motion/react", () => ({
  motion: {
    button: ({ children, initial: _i, animate: _a, exit: _e, transition: _t, ...props }: Record<string, unknown>) =>
      React.createElement("button", props, children as React.ReactNode),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}))

const POSTS: BlogPostMeta[] = [
  {
    slug: "guia-instagram",
    title: "Guía completa de Instagram",
    excerpt: "Todo sobre Instagram Marketing",
    publishDate: "2024-01-15",
    category: "redes-sociales",
    tags: ["instagram", "social-media"],
    author: "Equipo Geko",
    featured: true,
    readingTime: 8,
  },
  {
    slug: "seo-basico",
    title: "SEO Básico para tu negocio",
    excerpt: "Aprende los fundamentos del SEO",
    publishDate: "2024-02-10",
    category: "seo",
    tags: ["seo", "google"],
    author: "Equipo Geko",
    featured: false,
    readingTime: 5,
  },
  {
    slug: "branding-visual",
    title: "Identidad visual y branding",
    excerpt: "Cómo construir una marca sólida",
    publishDate: "2024-03-05",
    category: "branding",
    tags: ["branding", "diseño"],
    author: "Equipo Geko",
    featured: false,
    readingTime: 6,
  },
]

describe("BlogSearch", () => {
  let onResults: (results: BlogPostMeta[] | null) => void

  beforeEach(() => {
    onResults = vi.fn()
  })

  afterEach(() => cleanup())

  it("renderiza el input de búsqueda", () => {
    render(<BlogSearch posts={POSTS} onResults={onResults} />)
    expect(screen.getByPlaceholderText("Buscar artículos...")).toBeInTheDocument()
  })

  it("no muestra el botón de limpiar cuando el input está vacío", () => {
    render(<BlogSearch posts={POSTS} onResults={onResults} />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("llama onResults(null) al escribir una cadena vacía", () => {
    render(<BlogSearch posts={POSTS} onResults={onResults} />)
    const input = screen.getByPlaceholderText("Buscar artículos...")
    fireEvent.change(input, { target: { value: "algo" } })
    fireEvent.change(input, { target: { value: "" } })
    expect(onResults).toHaveBeenLastCalledWith(null)
  })

  it("llama onResults con resultados al buscar un término", () => {
    render(<BlogSearch posts={POSTS} onResults={onResults} />)
    const input = screen.getByPlaceholderText("Buscar artículos...")
    fireEvent.change(input, { target: { value: "instagram" } })
    expect(onResults).toHaveBeenCalledTimes(1)
    const results = onResults.mock.calls[0][0] as BlogPostMeta[]
    expect(results).not.toBeNull()
    expect(results.some((p) => p.slug === "guia-instagram")).toBe(true)
  })

  it("no devuelve posts irrelevantes en los resultados", () => {
    render(<BlogSearch posts={POSTS} onResults={onResults} />)
    const input = screen.getByPlaceholderText("Buscar artículos...")
    fireEvent.change(input, { target: { value: "instagram" } })
    const results = onResults.mock.calls[0][0] as BlogPostMeta[]
    expect(results.some((p) => p.slug === "seo-basico")).toBe(false)
  })

  it("muestra el botón de limpiar cuando hay texto en el input", () => {
    render(<BlogSearch posts={POSTS} onResults={onResults} />)
    const input = screen.getByPlaceholderText("Buscar artículos...")
    fireEvent.change(input, { target: { value: "seo" } })
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("limpia el input y llama onResults(null) al pulsar el botón X", () => {
    render(<BlogSearch posts={POSTS} onResults={onResults} />)
    const input = screen.getByPlaceholderText("Buscar artículos...")
    fireEvent.change(input, { target: { value: "seo" } })

    const clearBtn = screen.getByRole("button")
    fireEvent.click(clearBtn)

    expect(input).toHaveValue("")
    expect(onResults).toHaveBeenLastCalledWith(null)
  })

  it("busca por tags además de título y excerpt", () => {
    render(<BlogSearch posts={POSTS} onResults={onResults} />)
    const input = screen.getByPlaceholderText("Buscar artículos...")
    fireEvent.change(input, { target: { value: "google" } })
    const results = onResults.mock.calls[0][0] as BlogPostMeta[]
    expect(results.some((p) => p.slug === "seo-basico")).toBe(true)
  })
})
