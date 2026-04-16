export type Billing = "monthly" | "quarterly" | "biannual" | "annual"

export const BILLING_OPTIONS: { id: Billing; label: string; discount: number; months: number }[] = [
  { id: "monthly",   label: "Mensual",    discount: 0,  months: 1  },
  { id: "quarterly", label: "Trimestral", discount: 5,  months: 3  },
  { id: "biannual",  label: "Semestral",  discount: 10, months: 6  },
  { id: "annual",    label: "Anual",      discount: 15, months: 12 },
]

export interface PlanData {
  id: string
  name: string
  icon: string
  tagline: string
  monthly: number
  color: string
  colorRgb: string
  popular?: boolean
  features: string[]
}

export function getPrice(monthly: number, billing: Billing): number {
  const opt = BILLING_OPTIONS.find((o) => o.id === billing)!
  return Math.round(monthly * (1 - opt.discount / 100))
}
