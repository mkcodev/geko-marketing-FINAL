import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formatea precio con símbolo de euro */
export function formatPrice(amount: number, period?: "month" | "year"): string {
  const formatted = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(amount)
  if (period === "month") return `${formatted}/mes`
  if (period === "year") return `${formatted}/año`
  return formatted
}

/** Devuelve el horario actual de Geko (Tres Cantos, Madrid) */
export function isGekoOnline(): boolean {
  const now = new Date()
  const madrid = new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
    hour12: false,
  }).formatToParts(now)

  const weekday = madrid.find((p) => p.type === "weekday")?.value ?? ""
  const hour = parseInt(madrid.find((p) => p.type === "hour")?.value ?? "0")
  const minute = parseInt(madrid.find((p) => p.type === "minute")?.value ?? "0")
  const timeInMinutes = hour * 60 + minute

  const isWeekday = !["sáb", "dom"].includes(weekday)
  const isSaturday = weekday === "sáb"

  if (isWeekday) return timeInMinutes >= 9 * 60 && timeInMinutes < 19 * 60
  if (isSaturday) return timeInMinutes >= 9 * 60 && timeInMinutes < 14 * 60
  return false
}

/** Texto de respuesta según horario */
export function getResponseTime(): string {
  if (isGekoOnline()) return "Respondemos en menos de 2 horas"
  const now = new Date()
  const day = new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    weekday: "short",
  }).format(now)
  if (day === "dom") return "Respondemos el lunes a primera hora"
  return "Respondemos el próximo día laboral"
}
