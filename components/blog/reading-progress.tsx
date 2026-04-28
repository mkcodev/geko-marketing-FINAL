"use client"

import { useEffect, useState } from "react"

export function ArticleReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const article = document.getElementById("article-content")
      if (!article) return
      const { top, height } = article.getBoundingClientRect()
      const scrolled = Math.max(0, -top)
      const total = Math.max(1, height - window.innerHeight)
      setProgress(Math.min(100, (scrolled / total) * 100))
    }
    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 999,
        background: "var(--border-subtle)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "var(--gradient-brand-90)",
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px var(--color-geko-purple-a60)",
        }}
      />
    </div>
  )
}
