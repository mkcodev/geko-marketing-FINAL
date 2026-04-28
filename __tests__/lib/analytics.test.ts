import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { trackEvent, Analytics } from "@/lib/analytics"

type MockDataLayer = unknown[]

function getDataLayer(): MockDataLayer {
  return (window as unknown as { dataLayer: MockDataLayer }).dataLayer
}

describe("trackEvent()", () => {
  beforeEach(() => {
    ;(window as unknown as { dataLayer: MockDataLayer }).dataLayer = []
  })

  it("añade evento al dataLayer", () => {
    trackEvent({ event: "test_event" })
    const dl = getDataLayer()
    expect(dl.length).toBeGreaterThan(0)
  })

  it("incluye el nombre del evento", () => {
    trackEvent({ event: "cta_click", location: "hero" })
    const dl = getDataLayer()
    expect(JSON.stringify(dl)).toContain("cta_click")
  })
})

describe("Analytics", () => {
  beforeEach(() => {
    ;(window as unknown as { dataLayer: MockDataLayer }).dataLayer = []
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("ctaClick dispara evento con location", () => {
    Analytics.ctaClick("navbar")
    const dl = getDataLayer()
    expect(JSON.stringify(dl)).toContain("cta_click")
    expect(JSON.stringify(dl)).toContain("navbar")
  })

  it("formSubmit dispara evento con nombre de formulario", () => {
    Analytics.formSubmit("contact")
    const dl = getDataLayer()
    expect(JSON.stringify(dl)).toContain("form_submit")
    expect(JSON.stringify(dl)).toContain("contact")
  })

  it("planSelect dispara evento con plan y billing", () => {
    Analytics.planSelect("gold", "monthly")
    const dl = getDataLayer()
    expect(JSON.stringify(dl)).toContain("plan_select")
    expect(JSON.stringify(dl)).toContain("gold")
    expect(JSON.stringify(dl)).toContain("monthly")
  })

  it("langSwitch dispara evento con idioma", () => {
    Analytics.langSwitch("en")
    const dl = getDataLayer()
    expect(JSON.stringify(dl)).toContain("language_switch")
    expect(JSON.stringify(dl)).toContain("en")
  })
})
