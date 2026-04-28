"use client"

import { useEffect, useRef, useState } from "react"

// ─── Math helpers ───────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function shortAngle(from: number, to: number) {
  const d = ((to - from) % 360 + 540) % 360 - 180
  return d
}

// ─── Gecko geometry ─────────────────────────────────────────────────────────
// SVG viewBox: 0 0 84 48  (gecko faces RIGHT)
// Snout tip in viewBox: (80, 24)
// Rendered at width=63, height=36  →  scale = 63/84 = 0.75
// Snout rendered: (80×0.75, 24×0.75) = (60, 18)  ← cursor hot-point
const GW = 63
const GH = 36
const HOT_X = Math.round(80 * GW / 84)  // 60
const HOT_Y = Math.round(24 * GH / 48)  // 18

// ─── SVG gecko ──────────────────────────────────────────────────────────────
function GeckoSVG({ tongueRef }: { tongueRef: React.RefObject<SVGGElement | null> }) {
  return (
    <svg
      viewBox="0 0 84 48"
      width={GW}
      height={GH}
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        {/* Body gradient — purple-violet */}
        <linearGradient id="gc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#C06DD8" />
          <stop offset="100%" stopColor="#4A1960" />
        </linearGradient>
        <radialGradient id="gc-head" cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#BE65D6" />
          <stop offset="100%" stopColor="#441860" />
        </radialGradient>
        <radialGradient id="gc-belly" cx="50%" cy="60%" r="55%">
          <stop offset="0%"   stopColor="#D48CE8" />
          <stop offset="100%" stopColor="#8B3DA8" />
        </radialGradient>
        {/* Subtle glow filter */}
        <filter id="gc-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="gc-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="42" cy="47" rx="20" ry="2.5"
        fill="var(--color-geko-purple-a22)" filter="url(#gc-shadow)" />

      {/* ── TAIL (animated separately) ─────────────────────────── */}
      <g className="gtail">
        {/* Glow halo */}
        <path d="M24 24 C19 22, 13 19, 7 21 C3 22, 1 25, 0 27"
          stroke="var(--color-geko-purple-accent-a22)" strokeWidth="9" strokeLinecap="round" fill="none" />
        {/* Main tail */}
        <path d="M24 24 C19 22, 13 19, 7 21 C3 22, 1 25, 0 27"
          stroke="url(#gc-grad)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        {/* Highlight stripe */}
        <path d="M24 24 C19 21.5, 13 18.5, 7 20.5"
          stroke="rgba(220,160,240,0.35)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </g>

      {/* ── BODY GROUP (idle bob) ───────────────────────────────── */}
      <g className="gbody">
        {/* Body outer glow */}
        <ellipse cx="40" cy="24" rx="21" ry="13"
          fill="var(--color-geko-purple-a20)" filter="url(#gc-shadow)" />

        {/* ── BACK LEGS ──────────────────────────────────────────── */}
        {/* Back bottom leg */}
        <path d="M32 31 Q27 38 24 40"
          stroke="url(#gc-grad)" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <path d="M24 40 L21 41.5" stroke="url(#gc-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M24 40 L23.5 43" stroke="url(#gc-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M24 40 L26.5 42" stroke="url(#gc-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Back top leg */}
        <path d="M32 17 Q27 10 24 8"
          stroke="url(#gc-grad)" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <path d="M24 8 L21 6.5" stroke="url(#gc-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M24 8 L23.5 5" stroke="url(#gc-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M24 8 L26.5 6" stroke="url(#gc-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* ── BODY ───────────────────────────────────────────────── */}
        <ellipse cx="40" cy="24" rx="18" ry="11" fill="url(#gc-grad)" />
        {/* Belly lighter patch */}
        <ellipse cx="40" cy="26" rx="11" ry="6" fill="url(#gc-belly)" opacity="0.55" />
        {/* Dorsal spine line */}
        <path d="M26 23 C32 21, 40 21, 54 22"
          stroke="var(--fg-faint)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Scale texture dots */}
        <circle cx="33" cy="20" r="2"   fill="var(--border-strong)" />
        <circle cx="40" cy="19" r="1.7" fill="var(--border)" />
        <circle cx="47" cy="20" r="1.5" fill="var(--border-subtle)" />
        <circle cx="37" cy="27" r="1.8" fill="var(--border)" />
        <circle cx="44" cy="27" r="1.4" fill="var(--border-subtle)" />

        {/* ── FRONT LEGS ─────────────────────────────────────────── */}
        {/* Front bottom leg */}
        <path d="M50 31 Q55 38 58 40"
          stroke="url(#gc-grad)" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <path d="M58 40 L55 41.5" stroke="url(#gc-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M58 40 L57.5 43" stroke="url(#gc-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M58 40 L60.5 42" stroke="url(#gc-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Front top leg */}
        <path d="M50 17 Q55 10 58 8"
          stroke="url(#gc-grad)" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <path d="M58 8 L55 6.5" stroke="url(#gc-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M58 8 L57.5 5" stroke="url(#gc-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M58 8 L60.5 6" stroke="url(#gc-grad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* ── NECK ───────────────────────────────────────────────── */}
        <ellipse cx="59" cy="24" rx="7.5" ry="8" fill="url(#gc-grad)" />

        {/* ── HEAD ───────────────────────────────────────────────── */}
        <ellipse cx="69" cy="24" rx="11" ry="10" fill="url(#gc-head)" />
        {/* Head highlight */}
        <ellipse cx="67" cy="20" rx="6.5" ry="3.5" fill="var(--border-strong)" />
        {/* Under-chin shadow */}
        <path d="M59 29 Q68 33 78 27"
          stroke="rgba(0,0,0,0.18)" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* ── SNOUT ──────────────────────────────────────────────── */}
        <path d="M78 21 L80 24 L78 27 L76 24 Z" fill="url(#gc-head)" />
        {/* Snout tip highlight */}
        <path d="M79 24 L80 24" stroke="var(--fg-subtle)"
          strokeWidth="1.2" strokeLinecap="round" />
        {/* Nostril */}
        <circle cx="78.5" cy="22.5" r="1" fill="rgba(0,0,0,0.55)" />

        {/* ── TONGUE (hidden by default) ──────────────────────────── */}
        <g ref={tongueRef} className="gtongue" style={{ opacity: 0, transformOrigin: "78px 24px" }}>
          <path d="M78 24 L83 24"
            stroke="#E53E3E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M83 24 L85 22 M83 24 L85 26"
            stroke="#C53030" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </g>

        {/* ── EYE ────────────────────────────────────────────────── */}
        {/* Eye socket depth */}
        <circle cx="66.5" cy="21" r="5.5" fill="rgba(20,0,35,0.35)" />
        {/* Sclera */}
        <circle cx="66.5" cy="21" r="4.2" fill="rgba(248,240,255,0.97)" />
        {/* Iris (vertical slit — reptile!) */}
        <ellipse cx="67.2" cy="21" rx="1.6" ry="3" fill="#1a0030" />
        {/* Iris color ring */}
        <ellipse cx="67.2" cy="21" rx="2.8" ry="3.4"
          fill="none" stroke="rgba(120,50,160,0.5)" strokeWidth="0.8" />
        {/* Primary catchlight */}
        <circle cx="68.2" cy="19.4" r="1.1" fill="var(--fg)" />
        {/* Secondary catchlight */}
        <circle cx="65.8" cy="22.5" r="0.55" fill="var(--fg-secondary)" />
        {/* Eye rim */}
        <circle cx="66.5" cy="21" r="4.2"
          fill="none" stroke="rgba(80,20,110,0.45)" strokeWidth="0.9" />
      </g>
    </svg>
  )
}

// ─── Click ripple ────────────────────────────────────────────────────────────
type Ripple = { id: number; x: number; y: number }

// ─── Main cursor component ───────────────────────────────────────────────────
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])

  const outerRef   = useRef<HTMLDivElement>(null)
  const rotateRef  = useRef<HTMLDivElement>(null)
  const flipRef    = useRef<HTMLDivElement>(null)
  const dotRef     = useRef<HTMLDivElement>(null)
  const tongueRef  = useRef<SVGGElement>(null)
  const rippleId   = useRef(0)

  // Detect fine pointer (desktop only)
  useEffect(() => {
    const mq = window.matchMedia("(any-hover: hover) and (any-pointer: fine)")
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(mq.matches)
    const h = (e: MediaQueryListEvent) => setEnabled(e.matches)
    mq.addEventListener("change", h)
    return () => mq.removeEventListener("change", h)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const st = {
      mx: -500, my: -500,
      sx: -500, sy: -500,
      angle: 0, smoothAngle: 0,
      scale: 1, smoothScale: 1,
      prevX: 0, prevY: 0,
      isHover: false,
    }
    let raf: number

    const onMove = (e: MouseEvent) => {
      st.mx = e.clientX
      st.my = e.clientY

      const dx = e.clientX - st.prevX
      const dy = e.clientY - st.prevY
      const speed = Math.sqrt(dx * dx + dy * dy)

      if (speed > 1.5) {
        st.angle = Math.atan2(dy, dx) * 180 / Math.PI
      }

      // Dynamic tail speed — fast move = fast wag
      const tail = outerRef.current?.querySelector<SVGElement>(".gtail")
      if (tail && speed > 0) {
        tail.style.animationDuration = `${Math.max(0.18, 1.3 - speed * 0.065)}s`
      }

      st.prevX = e.clientX
      st.prevY = e.clientY

      const t = e.target as Element | null
      const hover = !!(t?.closest("a,button,[role=button],input,select,textarea,[tabindex='0']"))

      if (hover !== st.isHover) {
        st.isHover = hover
        st.scale = hover ? 1.25 : 1

        // Tongue flick on hover
        const tongue = tongueRef.current
        if (tongue) {
          if (hover) {
            tongue.style.animation = "none"
            tongue.style.opacity = "0"
            void (tongue as unknown as HTMLElement).offsetWidth // reflow
            tongue.style.animation = "gtongue-flick 0.45s ease-in-out forwards"
          } else {
            tongue.style.opacity = "0"
            tongue.style.animation = "none"
          }
        }
      }
    }

    const onDown = (e: MouseEvent) => {
      st.scale = 0.75
      const id = rippleId.current++
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 620)
    }

    const onUp = () => { st.scale = st.isHover ? 1.25 : 1 }
    const onLeave = () => { if (outerRef.current) outerRef.current.style.opacity = "0" }
    const onEnter = () => { if (outerRef.current) outerRef.current.style.opacity = "1" }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("mouseup", onUp)
    document.documentElement.addEventListener("mouseleave", onLeave)
    document.documentElement.addEventListener("mouseenter", onEnter)

    const tick = () => {
      // Spring position (body follows snout with slight lag)
      st.sx = lerp(st.sx, st.mx, 0.135)
      st.sy = lerp(st.sy, st.my, 0.135)

      // Spring angle (smooth direction change)
      st.smoothAngle += shortAngle(st.smoothAngle, st.angle) * 0.09

      // Spring scale
      st.smoothScale = lerp(st.smoothScale, st.scale, 0.18)

      const { sx, sy, smoothAngle, smoothScale } = st

      // Position: translate so snout hot-point lands at cursor
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${sx - HOT_X}px, ${sy - HOT_Y}px)`
      }

      // Rotation + flip for left-facing
      if (rotateRef.current) {
        const goLeft = Math.abs(smoothAngle) > 90
        const dispAngle = goLeft ? 180 - smoothAngle : smoothAngle
        rotateRef.current.style.transform = `rotate(${dispAngle}deg)`

        if (flipRef.current) {
          const sx2 = goLeft ? -1 : 1
          flipRef.current.style.transform = `scaleX(${sx2}) scale(${smoothScale})`
        }
      }

      // Dot at exact mouse position (no spring)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${st.mx}px, ${st.my}px)`
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

        /* ── Tail wag ── */
        @keyframes gtail-wag {
          0%,100% { transform: rotate(0deg); }
          28%      { transform: rotate(26deg); }
          72%      { transform: rotate(-26deg); }
        }
        .gtail {
          transform-origin: 24px 24px;
          animation: gtail-wag 1.25s ease-in-out infinite;
        }

        /* ── Idle body bob ── */
        @keyframes gbody-bob {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-1.2px); }
        }
        .gbody {
          animation: gbody-bob 2.1s ease-in-out infinite;
        }

        /* ── Tongue flick ── */
        @keyframes gtongue-flick {
          0%   { opacity: 0; transform: scaleX(0); }
          15%  { opacity: 1; transform: scaleX(1); }
          55%  { opacity: 1; transform: scaleX(1.15) translateX(1px); }
          80%  { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(0); }
        }

        /* ── Click ripple ── */
        @keyframes gecko-ripple {
          0%   { transform: translate(-50%,-50%) scale(0);   opacity: 0.75; }
          100% { transform: translate(-50%,-50%) scale(3.2); opacity: 0; }
        }
      `}</style>

      {/* Exact-position dot (no spring) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: -2, left: -2,
          width: 5, height: 5,
          borderRadius: "50%",
          background: "var(--color-geko-purple-accent-a90)",
          boxShadow: "0 0 8px var(--color-geko-purple-accent-a70)",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      />

      {/* Click ripples */}
      {ripples.map(r => (
        <div
          key={r.id}
          aria-hidden="true"
          style={{
            position: "fixed",
            left: r.x, top: r.y,
            width: 20, height: 20,
            borderRadius: "50%",
            border: "1.5px solid var(--color-geko-purple-accent-a75)",
            pointerEvents: "none",
            zIndex: 99997,
            animation: "gecko-ripple 0.6s ease-out forwards",
          }}
        />
      ))}

      {/* Gecko */}
      <div
        ref={outerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: GW, height: GH,
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          opacity: 0,
          transition: "opacity 0.35s",
        }}
      >
        {/* Rotation layer — origin at snout hot-point */}
        <div
          ref={rotateRef}
          style={{
            width: "100%", height: "100%",
            transformOrigin: `${HOT_X}px ${HOT_Y}px`,
          }}
        >
          {/* Flip layer — scaleX for left-facing, scale for hover/click */}
          <div
            ref={flipRef}
            style={{
              width: "100%", height: "100%",
              transformOrigin: `${HOT_X}px ${HOT_Y}px`,
            }}
          >
            <GeckoSVG tongueRef={tongueRef} />
          </div>
        </div>
      </div>
    </>
  )
}
