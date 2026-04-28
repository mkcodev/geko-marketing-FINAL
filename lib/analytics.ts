type GtagEvent = {
  event: string
  [key: string]: string | number | boolean | undefined
}

type DataLayerWindow = Window & { dataLayer: unknown[] }

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return
  const w = window as unknown as DataLayerWindow
  w.dataLayer ??= []
  w.dataLayer.push(args)
}

export function trackEvent({ event, ...params }: GtagEvent) {
  gtag("event", event, params)
}

// ── Eventos de conversión predefinidos ────────────────────────────────────────

export const Analytics = {
  ctaClick: (location: string) =>
    trackEvent({ event: "cta_click", location }),

  formSubmit: (form: string) =>
    trackEvent({ event: "form_submit", form_name: form }),

  formError: (form: string, error: string) =>
    trackEvent({ event: "form_error", form_name: form, error_message: error }),

  calendlyOpen: (source: string) =>
    trackEvent({ event: "calendly_open", source }),

  planSelect: (plan: string, billing: string) =>
    trackEvent({ event: "plan_select", plan_name: plan, billing_period: billing }),

  stripeClick: (plan: string, billing: string) =>
    trackEvent({ event: "stripe_checkout_click", plan_name: plan, billing_period: billing }),

  langSwitch: (lang: string) =>
    trackEvent({ event: "language_switch", language: lang }),

  scroll50: () =>
    trackEvent({ event: "scroll_depth", depth: "50%" }),

  scroll90: () =>
    trackEvent({ event: "scroll_depth", depth: "90%" }),
} as const
