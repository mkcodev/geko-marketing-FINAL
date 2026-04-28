"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react"

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number
    name: string
    designation: string
    image: string
  }[]
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const springConfig = { stiffness: 100, damping: 15 }
  const x = useMotionValue(0)
  const rafRef = useRef<number | null>(null)

  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig)
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig)

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const target = event.currentTarget
      const halfWidth = target.offsetWidth / 2
      x.set(event.nativeEvent.offsetX - halfWidth)
    })
  }

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            position: "relative",
            marginRight: "-14px",
            zIndex: hoveredIndex === item.id ? 30 : 1,
          }}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 10 },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  position: "absolute",
                  top: -76,
                  left: "50%",
                  translateX,
                  rotate,
                  zIndex: 50,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {/* Inner wrapper handles -50% centering separately from the spring motion */}
                <div
                  style={{
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    padding: "8px 14px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--glass-bg-strong)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid var(--border-strong)",
                    boxShadow: "var(--shadow-lg), 0 0 20px var(--color-geko-purple-a15)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Brand gradient accent — bottom edge */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "60%",
                      height: 1,
                      background:
                        "linear-gradient(90deg, transparent, var(--color-geko-purple-accent), transparent)",
                    }}
                  />
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: "10%",
                      width: "30%",
                      height: 1,
                      background:
                        "linear-gradient(90deg, transparent, var(--color-geko-blue-light), transparent)",
                    }}
                  />

                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--fg)",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.75rem",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    {item.designation}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Image
            onMouseMove={handleMouseMove}
            height={56}
            width={56}
            src={item.image}
            alt={item.name}
            loading="eager"
            style={{
              width: 56,
              height: 56,
              borderRadius: "9999px",
              border: "2.5px solid var(--bg)",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
              margin: 0,
              padding: 0,
              transform: hoveredIndex === item.id ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
      ))}
    </>
  )
}
