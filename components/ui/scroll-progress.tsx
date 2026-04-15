"use client"

import { useScroll, useSpring, motion } from "framer-motion"

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
          background: "linear-gradient(90deg, #6B2D7C 0%, #8B3D9C 30%, #3B82F6 70%, #1D4ED8 100%)",
        }}
      />
    </div>
  )
}
