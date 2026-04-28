import { describe, it, expect } from "vitest"
import {
  EASE,
  EASE_SMOOTH,
  EASE_OUT,
  EASE_SPRING,
  EASE_IN_OUT,
  DUR_FAST,
  DUR_BASE,
  DUR_SLOW,
  DUR_SLOWER,
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInRight,
  slideInLeft,
  staggerContainer,
  staggerFast,
  noMotion,
} from "@/lib/animations"

describe("Easings", () => {
  it("EASE es alias de EASE_SMOOTH", () => {
    expect(EASE).toBe(EASE_SMOOTH)
  })

  it("todos los easings son arrays de 4 números", () => {
    for (const ease of [EASE_SMOOTH, EASE_OUT, EASE_SPRING, EASE_IN_OUT]) {
      expect(ease).toHaveLength(4)
      for (const v of ease) {
        expect(typeof v).toBe("number")
      }
    }
  })

  it("coordenadas de bezier en rango 0-1 o ligeramente fuera (spring)", () => {
    const [x1, , x2] = EASE_SMOOTH
    expect(x1).toBeGreaterThanOrEqual(0)
    expect(x2).toBeGreaterThanOrEqual(0)
  })
})

describe("Duraciones", () => {
  it("durations están en orden ascendente", () => {
    expect(DUR_FAST).toBeLessThan(DUR_BASE)
    expect(DUR_BASE).toBeLessThan(DUR_SLOW)
    expect(DUR_SLOW).toBeLessThan(DUR_SLOWER)
  })

  it("DUR_FAST es menor o igual que 0.2s", () => {
    expect(DUR_FAST).toBeLessThanOrEqual(0.2)
  })

  it("DUR_SLOWER no supera 1s", () => {
    expect(DUR_SLOWER).toBeLessThanOrEqual(1)
  })
})

describe("Variantes de animación", () => {
  it("fadeInUp tiene estados hidden y visible", () => {
    expect(fadeInUp).toHaveProperty("hidden")
    expect(fadeInUp).toHaveProperty("visible")
    expect(fadeInUp.hidden).toMatchObject({ opacity: 0, y: 20 })
    expect((fadeInUp.visible as { opacity: number }).opacity).toBe(1)
  })

  it("fadeIn empieza con opacity 0", () => {
    expect(fadeIn.hidden).toMatchObject({ opacity: 0 })
    expect((fadeIn.visible as { opacity: number }).opacity).toBe(1)
  })

  it("scaleIn empieza con scale menor que 1", () => {
    expect((scaleIn.hidden as { scale: number }).scale).toBeLessThan(1)
    expect((scaleIn.visible as { scale: number }).scale).toBe(1)
  })

  it("slideInRight empieza con x positivo", () => {
    expect((slideInRight.hidden as { x: number }).x).toBeGreaterThan(0)
    expect((slideInRight.visible as { x: number }).x).toBe(0)
  })

  it("slideInLeft empieza con x negativo", () => {
    expect((slideInLeft.hidden as { x: number }).x).toBeLessThan(0)
    expect((slideInLeft.visible as { x: number }).x).toBe(0)
  })

  it("staggerContainer tiene staggerChildren en visible", () => {
    const visible = staggerContainer.visible as {
      transition: { staggerChildren: number }
    }
    expect(visible.transition.staggerChildren).toBeGreaterThan(0)
  })

  it("staggerFast tiene stagger menor que staggerContainer", () => {
    const fast = (staggerFast.visible as { transition: { staggerChildren: number } }).transition
      .staggerChildren
    const normal = (
      staggerContainer.visible as { transition: { staggerChildren: number } }
    ).transition.staggerChildren
    expect(fast).toBeLessThan(normal)
  })

  it("noMotion visible tiene opacity 1", () => {
    expect((noMotion.visible as { opacity: number }).opacity).toBe(1)
  })
})
