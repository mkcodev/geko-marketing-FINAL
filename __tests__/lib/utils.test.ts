import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn()", () => {
  it("combina clases simples", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("elimina clases duplicadas de Tailwind (twMerge)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4")
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
  })

  it("ignora valores falsy", () => {
    expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar")
  })

  it("soporta objetos condicionales (clsx)", () => {
    expect(cn({ active: true, inactive: false })).toBe("active")
    expect(cn({ "text-sm": true, "text-lg": false })).toBe("text-sm")
  })

  it("soporta arrays", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar")
  })

  it("devuelve string vacío si no hay clases", () => {
    expect(cn()).toBe("")
    expect(cn(false, null, undefined)).toBe("")
  })

  it("merge correcto para variantes Tailwind", () => {
    expect(cn("px-2 py-1 bg-red hover:bg-dark", "p-3 bg-[#B91C1C]")).toBe(
      "hover:bg-dark p-3 bg-[#B91C1C]"
    )
  })
})
