"use client"

import { useEffect } from "react"
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react"

const ORBS = [
  { color: "#A855F7", ox: -105, oy: -72, size: 5   },
  { color: "#6366F1", ox:   90, oy: -95, size: 4   },
  { color: "#C084FC", ox:   82, oy:  78, size: 3.5 },
]

export function GeckoHero() {
  const prefersReduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const bodySpX = useSpring(rawX, { stiffness: 42, damping: 18 })
  const bodySpY = useSpring(rawY, { stiffness: 42, damping: 18 })
  const eyeSpX  = useSpring(rawX, { stiffness: 115, damping: 24 })
  const eyeSpY  = useSpring(rawY, { stiffness: 115, damping: 24 })

  const bodyX  = useTransform(bodySpX, [-1, 1], [-14, 14])
  const bodyY  = useTransform(bodySpY, [-1, 1], [-9,   9])
  const auraX  = useTransform(bodySpX, [-1, 1], [-7,   7])
  const auraY  = useTransform(bodySpY, [-1, 1], [-5,   5])
  const pupilX = useTransform(eyeSpX,  [-1, 1], [-3.8, 3.8])
  const pupilY = useTransform(eyeSpY,  [-1, 1], [-2.8, 2.8])

  useEffect(() => {
    if (prefersReduced) return
    const fn = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 2)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener("mousemove", fn, { passive: true })
    return () => window.removeEventListener("mousemove", fn)
  }, [prefersReduced, rawX, rawY])

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

      {/* Ambient glow */}
      <motion.div aria-hidden="true" style={{
        position: "absolute",
        width: 300, height: 380,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(107,45,124,0.38) 0%, transparent 68%)",
        filter: "blur(55px)",
        x: auraX, y: auraY,
        pointerEvents: "none",
      }} />

      {/* ── GECKO ── */}
      <motion.svg
        viewBox="0 0 280 440"
        style={{ x: bodyX, y: bodyY, overflow: "visible", width: "min(300px, 95%)", height: "auto" }}
        initial={{ opacity: 0, scale: 0.88, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        aria-hidden="true"
      >
        <defs>
          {/* Body — rich purple */}
          <linearGradient id="g-body" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%"   stopColor="#B06ED8" />
            <stop offset="100%" stopColor="#4A1070" />
          </linearGradient>
          {/* Head — slightly warmer */}
          <linearGradient id="g-head" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%"   stopColor="#C07EE4" />
            <stop offset="100%" stopColor="#501880" />
          </linearGradient>
          {/* Belly — translucent lavender */}
          <radialGradient id="g-belly" cx="50%" cy="40%" r="55%">
            <stop offset="0%"   stopColor="#D8ABEE" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#9333EA"  stopOpacity="0"   />
          </radialGradient>
          {/* Iris — amber gold */}
          <radialGradient id="g-iris" cx="40%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#FCD34D" />
            <stop offset="55%"  stopColor="#D97706" />
            <stop offset="100%" stopColor="#7C2D12" />
          </radialGradient>
          {/* Toe pads */}
          <radialGradient id="g-toe" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#E8D4FF" />
            <stop offset="100%" stopColor="#9333EA" />
          </radialGradient>
          {/* Soft glow for body edge */}
          <filter id="f-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── TAIL ── elegant S-curve to the right */}
        <motion.g
          animate={prefersReduced ? {} : { rotate: [0, 4, -3, 1, 0] }}
          transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut" }}
          style={{ transformOrigin: "140px 312px" }}
        >
          {/* Glow */}
          <path
            d="M140 312 C150 342,168 370,172 396 C176 414,168 428,156 428 C148 428,142 422,142 414"
            fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="26" strokeLinecap="round"
          />
          {/* Main tail */}
          <path
            d="M140 312 C150 342,168 370,172 396 C176 414,168 428,156 428 C148 428,142 422,142 414"
            fill="none" stroke="url(#g-body)" strokeWidth="14" strokeLinecap="round"
          />
          {/* Highlight stripe */}
          <path
            d="M136 311 C146 340,162 366,165 390"
            fill="none" stroke="rgba(220,180,255,0.22)" strokeWidth="5" strokeLinecap="round"
          />
          {/* Ring markings */}
          <ellipse cx="155" cy="348" rx="7.5" ry="2.5" fill="rgba(20,0,40,0.35)" transform="rotate(-22,155,348)" />
          <ellipse cx="167" cy="380" rx="6"   ry="2.2" fill="rgba(20,0,40,0.30)" transform="rotate(-14,167,380)" />
          <ellipse cx="168" cy="408" rx="4.5" ry="2"   fill="rgba(20,0,40,0.24)" transform="rotate(-5,168,408)"  />
        </motion.g>

        {/* ── REAR LEGS (behind body) ── */}
        {/* Rear-left */}
        <g>
          <path d="M96 272 C72 282,50 298,32 322 C18 340,14 354,22 358"
            fill="none" stroke="url(#g-body)" strokeWidth="14" strokeLinecap="round" />
          <path d="M22 358 L5 347 M22 358 L9 360 M22 358 L14 373 M22 358 L28 372"
            stroke="#A855F7" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="5"  cy="347" r="4" fill="url(#g-toe)" />
          <circle cx="9"  cy="360" r="4" fill="url(#g-toe)" />
          <circle cx="14" cy="373" r="4" fill="url(#g-toe)" />
          <circle cx="28" cy="372" r="4" fill="url(#g-toe)" />
        </g>
        {/* Rear-right */}
        <g>
          <path d="M184 272 C208 282,230 298,248 322 C262 340,266 354,258 358"
            fill="none" stroke="url(#g-body)" strokeWidth="14" strokeLinecap="round" />
          <path d="M258 358 L275 347 M258 358 L271 360 M258 358 L266 373 M258 358 L252 372"
            stroke="#A855F7" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="275" cy="347" r="4" fill="url(#g-toe)" />
          <circle cx="271" cy="360" r="4" fill="url(#g-toe)" />
          <circle cx="266" cy="373" r="4" fill="url(#g-toe)" />
          <circle cx="252" cy="372" r="4" fill="url(#g-toe)" />
        </g>

        {/* ── BODY ── */}
        <motion.g
          animate={prefersReduced ? {} : { scaleY: [1, 1.02, 1], scaleX: [1, 0.99, 1] }}
          transition={{ repeat: Infinity, duration: 4.0, ease: "easeInOut" }}
          style={{ transformOrigin: "140px 220px" }}
        >
          {/* Edge glow */}
          <ellipse cx="140" cy="220" rx="60" ry="100" fill="rgba(107,45,124,0.18)" filter="url(#f-glow)" />
          {/* Body */}
          <ellipse cx="140" cy="220" rx="52" ry="92" fill="url(#g-body)" />
          {/* Belly */}
          <ellipse cx="140" cy="228" rx="32" ry="70" fill="url(#g-belly)" />
          {/* Dorsal ridge */}
          <path d="M140 130 C138 160,138 190,139 222 C139 252,139 280,140 310"
            fill="none" stroke="rgba(210,165,255,0.3)" strokeWidth="3" strokeLinecap="round" />
          {/* Scale dots — very subtle */}
          {([
            [130,165],[150,163],[133,185],[151,183],
            [130,205],[150,203],[133,225],[151,223],
            [130,245],[150,243],[133,265],[151,263],
          ] as [number,number][]).map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={2} fill="rgba(35,0,58,0.4)" />
          ))}
        </motion.g>

        {/* ── FRONT LEGS (in front of body) ── */}
        {/* Front-left */}
        <motion.g
          animate={prefersReduced ? {} : { rotate: [0, 0, -4, 2, 0] }}
          transition={{ repeat: Infinity, duration: 9, times: [0, 0.82, 0.88, 0.94, 1], ease: "easeInOut", delay: 1.2 }}
          style={{ transformOrigin: "96px 162px" }}
        >
          <path d="M96 162 C74 154,52 140,36 120 C22 104,18 95,24 91"
            fill="none" stroke="url(#g-body)" strokeWidth="13" strokeLinecap="round" />
          <path d="M24 91 L7 81 M24 91 L11 94 M24 91 L15 106 M24 91 L30 107"
            stroke="#A855F7" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="7"  cy="81"  r="4" fill="url(#g-toe)" />
          <circle cx="11" cy="94"  r="4" fill="url(#g-toe)" />
          <circle cx="15" cy="106" r="4" fill="url(#g-toe)" />
          <circle cx="30" cy="107" r="4" fill="url(#g-toe)" />
        </motion.g>
        {/* Front-right */}
        <motion.g
          animate={prefersReduced ? {} : { rotate: [0, 0, 4, -2, 0] }}
          transition={{ repeat: Infinity, duration: 8, times: [0, 0.84, 0.90, 0.95, 1], ease: "easeInOut", delay: 0.3 }}
          style={{ transformOrigin: "184px 162px" }}
        >
          <path d="M184 162 C206 154,228 140,244 120 C258 104,262 95,256 91"
            fill="none" stroke="url(#g-body)" strokeWidth="13" strokeLinecap="round" />
          <path d="M256 91 L273 81 M256 91 L269 94 M256 91 L265 106 M256 91 L250 107"
            stroke="#A855F7" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="273" cy="81"  r="4" fill="url(#g-toe)" />
          <circle cx="269" cy="94"  r="4" fill="url(#g-toe)" />
          <circle cx="265" cy="106" r="4" fill="url(#g-toe)" />
          <circle cx="250" cy="107" r="4" fill="url(#g-toe)" />
        </motion.g>

        {/* ── NECK ── */}
        <ellipse cx="140" cy="138" rx="40" ry="28" fill="url(#g-head)" />

        {/* ── HEAD ── wide and flat, characteristic gecko shape */}
        <g>
          {/* Head glow */}
          <ellipse cx="140" cy="82" rx="74" ry="60" fill="rgba(168,85,247,0.14)" filter="url(#f-glow)" />
          {/* Main head — notably wider than body */}
          <ellipse cx="140" cy="84" rx="68" ry="54" fill="url(#g-head)" />
          {/* Snout — short rounded tip */}
          <path d="M126 38 Q140 20,154 38 Q150 46,140 44 Q130 46,126 38Z"
            fill="url(#g-head)" />
          {/* Brow highlight */}
          <ellipse cx="128" cy="66" rx="22" ry="14" fill="rgba(215,178,255,0.16)" />
          {/* Nostrils */}
          <ellipse cx="133" cy="36" rx="3" ry="2.2" fill="rgba(12,0,28,0.65)" />
          <ellipse cx="147" cy="36" rx="3" ry="2.2" fill="rgba(12,0,28,0.65)" />
          {/* Mouth — subtle curved line */}
          <path d="M118 74 Q140 82, 162 74"
            fill="none" stroke="rgba(12,0,28,0.28)" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* ── EYES — the most important feature ── */}
        {/* Left eye */}
        <g>
          {/* Socket depth */}
          <circle cx="108" cy="70" r="22" fill="rgba(8,0,20,0.5)" />
          {/* Sclera */}
          <circle cx="108" cy="70" r="18" fill="#F0EBFF" />
          {/* Iris */}
          <circle cx="108" cy="70" r="12" fill="url(#g-iris)" />
          {/* Pupil — vertical slit, follows cursor */}
          <motion.ellipse
            cx={108} cy={70} rx={3.5} ry={10}
            fill="#04000A"
            style={{ x: prefersReduced ? 0 : pupilX, y: prefersReduced ? 0 : pupilY }}
          />
          {/* Main catchlight */}
          <circle cx="113" cy="64" r="4" fill="rgba(255,255,255,0.95)" />
          {/* Secondary catchlight */}
          <circle cx="103" cy="77" r="2" fill="rgba(255,255,255,0.42)" />
          {/* Eye rim */}
          <circle cx="108" cy="70" r="18" fill="none" stroke="rgba(55,10,85,0.45)" strokeWidth="1.2" />
          {/* Eyelid for blink */}
          <motion.ellipse cx={108} cy={70} rx={18} ry={0}
            fill="url(#g-head)"
            animate={prefersReduced ? {} : { ry: [0, 0, 18, 0, 0] }}
            transition={{ repeat: Infinity, duration: 7, times: [0, 0.87, 0.92, 0.97, 1], ease: "easeInOut" }}
          />
        </g>
        {/* Right eye */}
        <g>
          <circle cx="172" cy="70" r="22" fill="rgba(8,0,20,0.5)" />
          <circle cx="172" cy="70" r="18" fill="#F0EBFF" />
          <circle cx="172" cy="70" r="12" fill="url(#g-iris)" />
          <motion.ellipse
            cx={172} cy={70} rx={3.5} ry={10}
            fill="#04000A"
            style={{ x: prefersReduced ? 0 : pupilX, y: prefersReduced ? 0 : pupilY }}
          />
          <circle cx="177" cy="64" r="4" fill="rgba(255,255,255,0.95)" />
          <circle cx="167" cy="77" r="2" fill="rgba(255,255,255,0.42)" />
          <circle cx="172" cy="70" r="18" fill="none" stroke="rgba(55,10,85,0.45)" strokeWidth="1.2" />
          <motion.ellipse cx={172} cy={70} rx={18} ry={0}
            fill="url(#g-head)"
            animate={prefersReduced ? {} : { ry: [0, 0, 18, 0, 0] }}
            transition={{ repeat: Infinity, duration: 7, times: [0, 0.87, 0.92, 0.97, 1], ease: "easeInOut", delay: 0.12 }}
          />
        </g>

      </motion.svg>

      {/* Floating orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: orb.size * 2, height: orb.size * 2,
            borderRadius: "50%",
            background: orb.color,
            boxShadow: `0 0 ${orb.size * 5}px ${orb.color}`,
            pointerEvents: "none",
          }}
          animate={{
            x: [orb.ox - 14, orb.ox + 14, orb.ox - 14],
            y: [orb.oy - 10, orb.oy + 10, orb.oy - 10],
            opacity: [0.28, 0.68, 0.28],
          }}
          transition={{ repeat: Infinity, duration: 3.8 + i * 0.9, ease: "easeInOut", delay: i * 0.7 }}
        />
      ))}

    </div>
  )
}
