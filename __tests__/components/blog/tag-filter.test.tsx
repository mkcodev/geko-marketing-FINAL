import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import React from "react"
import { TagFilter } from "@/components/blog/tag-filter"
import { CATEGORY_META } from "@/lib/blog-constants"
import type { Category } from "@/lib/blog-constants"

vi.mock("motion/react", () => ({
  motion: {
    button: ({ children, initial: _i, animate: _a, exit: _e, transition: _t, whileHover: _wh, whileTap: _wt, ...props }: Record<string, unknown>) =>
      React.createElement("button", props, children as React.ReactNode),
  },
}))

vi.mock("@/lib/icons", () => ({
  Icon: ({ name }: { name: string }) =>
    React.createElement("span", { "data-testid": `icon-${name}` }),
}))

const ALL_CATEGORIES = Object.keys(CATEGORY_META) as Category[]

const COUNTS: Partial<Record<Category, number>> = {
  "redes-sociales": 3,
  branding: 2,
  "diseno-web": 1,
  "marketing-digital": 4,
  seo: 2,
  publicidad: 1,
}

describe("TagFilter", () => {
  let onSelect: (cat: Category | null) => void

  beforeEach(() => {
    onSelect = vi.fn()
  })

  afterEach(() => cleanup())

  it('renderiza el pill "Todos"', () => {
    render(<TagFilter activeCategory={null} onSelect={onSelect} counts={COUNTS} />)
    expect(screen.getByText("Todos")).toBeInTheDocument()
  })

  it("renderiza un pill por cada categoría de CATEGORY_META", () => {
    render(<TagFilter activeCategory={null} onSelect={onSelect} counts={COUNTS} />)
    ALL_CATEGORIES.forEach((slug) => {
      expect(screen.getByText(CATEGORY_META[slug].label)).toBeInTheDocument()
    })
  })

  it('pulsar "Todos" llama onSelect(null)', () => {
    render(<TagFilter activeCategory={"seo"} onSelect={onSelect} counts={COUNTS} />)
    fireEvent.click(screen.getByText("Todos"))
    expect(onSelect).toHaveBeenCalledWith(null)
  })

  it("pulsar una categoría inactiva llama onSelect con ese slug", () => {
    render(<TagFilter activeCategory={null} onSelect={onSelect} counts={COUNTS} />)
    fireEvent.click(screen.getByText(CATEGORY_META["branding"].label))
    expect(onSelect).toHaveBeenCalledWith("branding")
  })

  it("pulsar la categoría activa llama onSelect(null) — toggle off", () => {
    render(<TagFilter activeCategory={"seo"} onSelect={onSelect} counts={COUNTS} />)
    fireEvent.click(screen.getByText(CATEGORY_META["seo"].label))
    expect(onSelect).toHaveBeenCalledWith(null)
  })

  it("muestra el conteo de cada categoría", () => {
    render(<TagFilter activeCategory={null} onSelect={onSelect} counts={COUNTS} />)
    expect(screen.getByText("3")).toBeInTheDocument()
    expect(screen.getByText("4")).toBeInTheDocument()
  })

  it('muestra el total en el pill "Todos"', () => {
    render(<TagFilter activeCategory={null} onSelect={onSelect} counts={COUNTS} />)
    const total = Object.values(COUNTS).reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
    expect(screen.getByText(String(total))).toBeInTheDocument()
  })

  it("no muestra conteo si el valor es 0", () => {
    const emptyCounts: Partial<Record<Category, number>> = {}
    render(<TagFilter activeCategory={null} onSelect={onSelect} counts={emptyCounts} />)
    const countBadges = screen.queryAllByText("0")
    expect(countBadges).toHaveLength(0)
  })

  it("renderiza el icono de cada pill", () => {
    render(<TagFilter activeCategory={null} onSelect={onSelect} counts={COUNTS} />)
    expect(screen.getByTestId("icon-LayoutGrid")).toBeInTheDocument()
    ALL_CATEGORIES.forEach((slug) => {
      expect(screen.getByTestId(`icon-${CATEGORY_META[slug].icon}`)).toBeInTheDocument()
    })
  })
})
