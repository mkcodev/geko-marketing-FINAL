"use client"

import { useEffect, useRef, useState } from "react"

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)

  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia("(any-hover: hover) and (any-pointer: fine)")
    setEnabled(mq.matches)
    const h = (e: MediaQueryListEvent) => setEnabled(e.matches)
    mq.addEventListener("change", h)
    return () => mq.removeEventListener("change", h)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const st = {
      mx: -500, my: -500,
      rx: -500, ry: -500,
      isHover: false,
      isDown: false,
    }
    let raf: number

    const onMove = (e: MouseEvent) => {
      st.mx = e.clientX
      st.my = e.clientY

      const t = e.target as Element | null
      const hover = !!(t?.closest("a,button,[role=button],input,select,textarea,[tabindex='0']"))

      if (hover !== st.isHover) {
        st.isHover = hover
        const ring = ringRef.current
        if (ring) {
          ring.style.width  = hover ? "44px" : "28px"
          ring.style.height = hover ? "44px" : "28px"
          ring.style.background = hover ? "rgba(107,45,124,0.12)" : "transparent"
          ring.style.borderColor = hover ? "#6B2D7C" : "#8B3D9C"
        }
      }
    }

    const onDown = () => {
      st.isDown = true
      const ring = ringRef.current
      if (ring) {
        ring.style.width  = "20px"
        ring.style.height = "20px"
        ring.style.background = "rgba(107,45,124,0.2)"
      }
    }

    const onUp = () => {
      st.isDown = false
      const ring = ringRef.current
      if (ring) {
        ring.style.width  = st.isHover ? "44px" : "28px"
        ring.style.height = st.isHover ? "44px" : "28px"
        ring.style.background = st.isHover ? "rgba(107,45,124,0.12)" : "transparent"
      }
    }

    const onLeave = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = "0"
      if (ringRef.current) ringRef.current.style.opacity = "0"
    }
    const onEnter = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = "1"
      if (ringRef.current) ringRef.current.style.opacity = "1"
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("mouseup", onUp)
    document.documentElement.addEventListener("mouseleave", onLeave)
    document.documentElement.addEventListener("mouseenter", onEnter)

    const tick = () => {
      // Dot: follows exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${st.mx}px, ${st.my}px)`
      }

      // Ring: spring lag
      st.rx = lerp(st.rx, st.mx, 0.1)
      st.ry = lerp(st.ry, st.my, 0.1)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${st.rx}px, ${st.ry}px)`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseup", onUp)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      document.documentElement.removeEventListener("mouseenter", onEnter)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>

      {/* Dot — posición exacta */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: -3, left: -3,
          width: 6, height: 6,
          borderRadius: "50%",
          background: "#8B3D9C",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Ring — spring lag */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: -14, left: -14,
          width: 28, height: 28,
          borderRadius: "50%",
          border: "1.5px solid #8B3D9C",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          opacity: 0,
          transition: "opacity 0.3s, width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, border-color 0.2s",
        }}
      />
    </>
  )
}
