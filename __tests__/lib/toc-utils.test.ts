import { describe, it, expect } from "vitest"
import { extractHeadings } from "@/lib/toc-utils"

type Node = { type: string; level?: number; children?: { text?: string }[] }

const h = (level: number, text: string): Node => ({
  type: "heading",
  level,
  children: [{ text }],
})

describe("extractHeadings()", () => {
  it("extrae headings de nivel 1-3", () => {
    const nodes: Node[] = [h(1, "Título"), h(2, "Sección"), h(3, "Subsección")]
    const result = extractHeadings(nodes)
    expect(result).toHaveLength(3)
    expect(result[0]).toMatchObject({ level: 1, text: "Título", id: "titulo" })
    expect(result[1]).toMatchObject({ level: 2, text: "Sección", id: "seccion" })
    expect(result[2]).toMatchObject({ level: 3, text: "Subsección", id: "subseccion" })
  })

  it("ignora párrafos y otros tipos", () => {
    const nodes: Node[] = [
      { type: "paragraph", children: [{ text: "texto" }] },
      h(2, "Sección"),
    ]
    expect(extractHeadings(nodes)).toHaveLength(1)
  })

  it("ignora headings de nivel 4+", () => {
    const nodes: Node[] = [h(4, "Nivel 4"), h(5, "Nivel 5"), h(2, "Válido")]
    const result = extractHeadings(nodes)
    expect(result).toHaveLength(1)
    expect(result[0].text).toBe("Válido")
  })

  it("genera IDs slugificados correctamente", () => {
    const nodes: Node[] = [h(2, "Introducción al SEO y Marketing")]
    const result = extractHeadings(nodes)
    expect(result[0].id).toBe("introduccion-al-seo-y-marketing")
  })

  it("elimina acentos al generar IDs", () => {
    const nodes: Node[] = [h(2, "Diseño y Creación de Contenido")]
    const result = extractHeadings(nodes)
    expect(result[0].id).toBe("diseno-y-creacion-de-contenido")
  })

  it("elimina caracteres especiales del ID", () => {
    const nodes: Node[] = [h(2, "¿Qué es el ROI? (Return on Investment)")]
    const result = extractHeadings(nodes)
    expect(result[0].id).toBe("que-es-el-roi-return-on-investment")
  })

  it("devuelve array vacío para nodos vacíos", () => {
    expect(extractHeadings([])).toEqual([])
  })

  it("maneja children sin texto", () => {
    const nodes: Node[] = [{ type: "heading", level: 2, children: [{}] }]
    expect(extractHeadings(nodes)).toHaveLength(0)
  })

  it("combina texto de múltiples children", () => {
    const nodes: Node[] = [
      { type: "heading", level: 2, children: [{ text: "Hola " }, { text: "Mundo" }] },
    ]
    const result = extractHeadings(nodes)
    expect(result[0].text).toBe("Hola Mundo")
    expect(result[0].id).toBe("hola-mundo")
  })
})
