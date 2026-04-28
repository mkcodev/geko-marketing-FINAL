import { describe, it, expect } from "vitest"
import { formatDate, CATEGORY_META } from "@/lib/blog-constants"

describe("formatDate()", () => {
  it("formatea fecha ISO en español", () => {
    const result = formatDate("2025-03-15")
    expect(result).toMatch(/15/)
    expect(result).toMatch(/marzo/i)
    expect(result).toMatch(/2025/)
  })

  it("formatea distintos meses", () => {
    expect(formatDate("2025-01-01")).toMatch(/enero/i)
    expect(formatDate("2025-12-31")).toMatch(/diciembre/i)
  })

  it("maneja fechas con hora UTC", () => {
    const result = formatDate("2025-06-15T00:00:00Z")
    expect(result).toMatch(/2025/)
  })
})

describe("CATEGORY_META", () => {
  const categories = [
    "redes-sociales",
    "branding",
    "diseno-web",
    "marketing-digital",
    "seo",
    "publicidad",
  ] as const

  it("contiene todas las categorías definidas", () => {
    for (const cat of categories) {
      expect(CATEGORY_META).toHaveProperty(cat)
    }
  })

  it("cada categoría tiene las propiedades requeridas", () => {
    for (const cat of categories) {
      const meta = CATEGORY_META[cat]
      expect(meta).toHaveProperty("label")
      expect(meta).toHaveProperty("color")
      expect(meta).toHaveProperty("gradient")
      expect(meta).toHaveProperty("icon")
      expect(typeof meta.label).toBe("string")
      expect(typeof meta.color).toBe("string")
      expect(typeof meta.gradient).toBe("string")
      expect(typeof meta.icon).toBe("string")
    }
  })

  it("todos los colores son hex válidos", () => {
    const hexPattern = /^#[0-9A-Fa-f]{6}$/
    for (const cat of categories) {
      expect(CATEGORY_META[cat].color).toMatch(hexPattern)
    }
  })

  it("todos los gradientes contienen linear-gradient", () => {
    for (const cat of categories) {
      expect(CATEGORY_META[cat].gradient).toContain("linear-gradient")
    }
  })
})
