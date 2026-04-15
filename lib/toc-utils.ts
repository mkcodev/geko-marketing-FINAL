// Server-safe — no "use client", can be called from Server Components

export interface TocHeading {
  level: number
  text: string
  id: string
}

export function extractHeadings(
  nodes: Array<{ type: string; level?: number; children?: Array<{ text?: string }> }>
): TocHeading[] {
  return nodes
    .filter((n) => n.type === "heading" && n.level && n.level <= 3)
    .map((n) => {
      const text = (n.children ?? []).map((c) => c.text ?? "").join("")
      const id = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
      return { level: n.level!, text, id }
    })
    .filter((h) => h.text && h.id)
}
