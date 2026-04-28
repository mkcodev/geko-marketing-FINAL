"use client"

import { useScroll, useSpring, motion } from "motion/react"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  })

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 99997,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          scaleX,
          transformOrigin: "0%",
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, var(--color-geko-purple) 0%, var(--color-geko-purple-light) 30%, var(--color-geko-blue-light) 70%, var(--color-geko-blue) 100%)",
        }}
      />
    </div>
  )
}
