import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useMediaQuery } from "@/hooks/use-media-query"

type MockMQL = {
  matches: boolean
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
  _listeners: ((e: { matches: boolean }) => void)[]
  _trigger: (matches: boolean) => void
}

function createMockMQL(matches: boolean): MockMQL {
  const listeners: ((e: { matches: boolean }) => void)[] = []
  return {
    matches,
    addEventListener: vi.fn((_: string, cb: (e: { matches: boolean }) => void) => {
      listeners.push(cb)
    }),
    removeEventListener: vi.fn((_: string, cb: (e: { matches: boolean }) => void) => {
      const idx = listeners.indexOf(cb)
      if (idx !== -1) listeners.splice(idx, 1)
    }),
    _listeners: listeners,
    _trigger(newMatches: boolean) {
      listeners.forEach((cb) => cb({ matches: newMatches }))
    },
  }
}

describe("useMediaQuery()", () => {
  let mql: MockMQL

  beforeEach(() => {
    mql = createMockMQL(false)
    vi.stubGlobal("matchMedia", vi.fn(() => mql))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("devuelve false cuando la media query no coincide", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"))
    expect(result.current).toBe(false)
  })

  it("devuelve true cuando la media query coincide", () => {
    mql = createMockMQL(true)
    vi.stubGlobal("matchMedia", vi.fn(() => mql))
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"))
    expect(result.current).toBe(true)
  })

  it("reacciona a cambios en la media query", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"))
    expect(result.current).toBe(false)

    act(() => {
      mql._trigger(true)
    })
    expect(result.current).toBe(true)

    act(() => {
      mql._trigger(false)
    })
    expect(result.current).toBe(false)
  })

  it("elimina el listener al desmontarse", () => {
    const { unmount } = renderHook(() => useMediaQuery("(min-width: 768px)"))
    expect(mql.addEventListener).toHaveBeenCalledTimes(1)
    unmount()
    expect(mql.removeEventListener).toHaveBeenCalledTimes(1)
  })

  it("llama a matchMedia con la query correcta", () => {
    renderHook(() => useMediaQuery("(prefers-color-scheme: dark)"))
    expect(window.matchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)")
  })
})
