import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react"
import React from "react"

// ── External mocks ────────────────────────────────────────────

vi.mock("react-google-recaptcha-v3", () => ({
  useGoogleReCaptcha: () => ({ executeRecaptcha: vi.fn().mockResolvedValue("mock-token") }),
}))

vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, initial: _i, animate: _a, exit: _e, transition: _t, ...props }: Record<string, unknown>) =>
      React.createElement("div", props, children as React.ReactNode),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
  useReducedMotion: () => true,
}))

vi.mock("@/hooks/use-media-query", () => ({
  useMediaQuery: () => true,
}))

vi.mock("@/hooks/use-translations", () => ({
  useT: () => ({
    contact: {
      label: "Contacto",
      headline: "Hablemos de",
      headlineAccent: "tu proyecto",
      subheadline: "Cuéntanos qué necesitas",
      responseGuarantee: "Respuesta garantizada",
      responseTime: "en menos de 24h",
      info: {
        title: "Información de contacto",
        phone: "Teléfono",
        email: "Email",
        location: "Ubicación",
        hours: "Horario",
      },
      error: { message: "Error al enviar. Escríbenos a" },
      success: {
        title: "¡Mensaje enviado!",
        message: "Te contactamos pronto",
      },
      form: {
        name: "Nombre",
        namePlaceholder: "Tu nombre",
        email: "Email",
        emailPlaceholder: "tu@email.com",
        phone: "Teléfono",
        phonePlaceholder: "+34 600 000 000",
        business: "Empresa",
        businessPlaceholder: "Nombre de tu empresa",
        service: "Servicio",
        servicePlaceholder: "¿En qué podemos ayudarte?",
        serviceOptions: {
          social: "Redes Sociales",
          ads: "Publicidad",
          seo: "SEO",
          email: "Email Marketing",
          branding: "Branding",
          full: "Servicio completo",
        },
        message: "Mensaje",
        messagePlaceholder: "Cuéntanos tu proyecto...",
        submit: "Enviar",
        submitting: "Enviando...",
        privacy: "Tus datos están seguros con nosotros.",
      },
    },
  }),
}))

vi.mock("@/context/language-context", () => ({
  useLanguage: () => ({ language: "es", setLanguage: vi.fn() }),
}))

vi.mock("@/components/ui/calendly-popup", () => ({
  CalendlyCard: () => React.createElement("div", { "data-testid": "calendly-card" }),
}))

vi.mock("@/components/ui/gradient-text", () => ({
  GradientText: ({ children }: { children: React.ReactNode }) =>
    React.createElement("span", null, children),
}))

vi.mock("@/components/ui/label", () => ({
  Label: ({ children }: { children: React.ReactNode }) =>
    React.createElement("span", null, children),
}))

// ── Tests ─────────────────────────────────────────────────────

import { ContactoClient } from "@/app/contacto/client"

describe("ContactoClient — formulario", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch")
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it("renderiza todos los campos obligatorios", () => {
    render(<ContactoClient />)
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
  })

  it("renderiza el botón de envío", () => {
    render(<ContactoClient />)
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument()
  })

  it("muestra error de validación si se envía con nombre vacío", async () => {
    render(<ContactoClient />)
    const submit = screen.getByRole("button", { name: /enviar/i })
    fireEvent.click(submit)
    await waitFor(() => {
      const errors = screen.queryAllByText(/mínimo|requerido|obligatorio|caracteres/i)
      expect(errors.length).toBeGreaterThan(0)
    })
  })

  it("muestra error de validación si el email es inválido", async () => {
    render(<ContactoClient />)
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ana" } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "no-es-email" } })
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: "Hola" } })
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }))
    await waitFor(() => {
      const errors = screen.queryAllByText(/email|correo|inválido/i)
      expect(errors.length).toBeGreaterThan(0)
    })
  })

  it("muestra estado de éxito tras envío correcto", async () => {
    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    )
    render(<ContactoClient />)
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ana García" } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "ana@ejemplo.com" } })
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: "Me interesa el servicio de branding" } })
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }))
    await waitFor(() => {
      expect(screen.getByText("¡Mensaje enviado!")).toBeInTheDocument()
    })
  })

  it("muestra mensaje de error si el envío falla", async () => {
    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify({ success: false, message: "Server error" }), { status: 200 })
    )
    render(<ContactoClient />)
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ana García" } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "ana@ejemplo.com" } })
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: "Me interesa el servicio de branding" } })
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }))
    await waitFor(() => {
      expect(screen.getByText(/error al enviar/i)).toBeInTheDocument()
    })
  })
})
