import { describe, it, expect } from "vitest"
import { contactSchema } from "@/lib/schemas/contact"

const validData = {
  name: "Juan García",
  email: "juan@example.com",
  message: "Este es un mensaje de prueba con más de 15 caracteres.",
}

describe("contactSchema", () => {
  describe("name", () => {
    it("acepta nombre válido", () => {
      expect(contactSchema.safeParse(validData).success).toBe(true)
    })

    it("rechaza nombre de 1 carácter", () => {
      const result = contactSchema.safeParse({ ...validData, name: "J" })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("name")
      }
    })

    it("rechaza nombre vacío", () => {
      const result = contactSchema.safeParse({ ...validData, name: "" })
      expect(result.success).toBe(false)
    })
  })

  describe("email", () => {
    it("acepta email válido", () => {
      expect(contactSchema.safeParse(validData).success).toBe(true)
    })

    it("rechaza email sin @", () => {
      const result = contactSchema.safeParse({ ...validData, email: "invalido" })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("email")
      }
    })

    it("rechaza email sin dominio", () => {
      const result = contactSchema.safeParse({ ...validData, email: "user@" })
      expect(result.success).toBe(false)
    })

    it("rechaza email vacío", () => {
      const result = contactSchema.safeParse({ ...validData, email: "" })
      expect(result.success).toBe(false)
    })
  })

  describe("message", () => {
    it("acepta mensaje con 15+ caracteres", () => {
      expect(contactSchema.safeParse(validData).success).toBe(true)
    })

    it("rechaza mensaje de 14 caracteres", () => {
      const result = contactSchema.safeParse({
        ...validData,
        message: "Mensaje corto!",
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("message")
      }
    })

    it("rechaza mensaje vacío", () => {
      const result = contactSchema.safeParse({ ...validData, message: "" })
      expect(result.success).toBe(false)
    })
  })

  describe("campos opcionales", () => {
    it("acepta sin phone, business ni service", () => {
      const result = contactSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it("acepta phone cuando se proporciona", () => {
      const result = contactSchema.safeParse({ ...validData, phone: "+34 600 000 000" })
      expect(result.success).toBe(true)
    })

    it("acepta business y service vacíos", () => {
      const result = contactSchema.safeParse({
        ...validData,
        business: "",
        service: "",
      })
      expect(result.success).toBe(true)
    })
  })

  describe("tipado de salida", () => {
    it("parsea correctamente todos los campos", () => {
      const data = {
        name: "Ana Martínez",
        email: "ana@empresa.com",
        phone: "+34 611 111 111",
        business: "Empresa SL",
        service: "redes-sociales",
        message: "Necesito ayuda con mi estrategia de redes sociales.",
      }
      const result = contactSchema.safeParse(data)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(data)
      }
    })
  })
})
