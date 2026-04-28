"use client"

import { useState, useEffect } from "react"

interface TypewriterProps {
  words: string[]
  speed?: number
  deleteSpeed?: number
  pause?: number
  className?: string
  style?: React.CSSProperties
}

export function Typewriter({
  words,
  speed = 75,
  deleteSpeed = 40,
  pause = 2200,
  style,
}: TypewriterProps) {
  const [display, setDisplay] = useState("")
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  // Typewriter logic
  useEffect(() => {
    const word = words[wordIdx]

    if (!deleting && display === word) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }

    if (deleting && display === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeleting(false)
      setWordIdx((i) => (i + 1) % words.length)
      return
    }

    const delay = deleting ? deleteSpeed : speed
    const t = setTimeout(() => {
      setDisplay(
        deleting ? word.slice(0, display.length - 1) : word.slice(0, display.length + 1)
      )
    }, delay)

    return () => clearTimeout(t)
  }, [display, deleting, wordIdx, words, speed, deleteSpeed, pause])

  return (
    <span style={{ ...style, display: "inline" }}>
      <span>{display}</span>
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "3px",
          height: "0.85em",
          background: "linear-gradient(180deg, var(--color-geko-purple-accent), var(--color-geko-blue-light))",
          borderRadius: 2,
          marginLeft: 3,
          verticalAlign: "text-bottom",
          opacity: showCursor ? 1 : 0,
          transition: "opacity 0.1s",
        }}
      />
    </span>
  )
}
