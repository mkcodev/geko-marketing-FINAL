"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import Fuse from "fuse.js"
import type { BlogPostMeta } from "@/lib/blog-constants"

interface BlogSearchProps {
  posts: BlogPostMeta[]
  onResults: (results: BlogPostMeta[] | null) => void
}

export function BlogSearch({ posts, onResults }: BlogSearchProps) {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)

  const fuse = new Fuse(posts, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "excerpt", weight: 0.3 },
      { name: "tags", weight: 0.2 },
    ],
    threshold: 0.4,
    includeScore: true,
  })

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setQuery(val)
      if (!val.trim()) {
        onResults(null)
        return
      }
      const results = fuse.search(val).map((r) => r.item)
      onResults(results)
    },
    [posts, onResults] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const clear = () => {
    setQuery("")
    onResults(null)
  }

  return (
    <div style={{ position: "relative", maxWidth: 520, width: "100%", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 18px",
          borderRadius: 14,
          background: focused
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.03)",
          border: focused
            ? "1px solid rgba(155,77,188,0.40)"
            : "1px solid rgba(255,255,255,0.09)",
          transition: "all 0.2s ease",
          boxShadow: focused ? "0 0 0 3px rgba(155,77,188,0.10)" : "none",
        }}
      >
        <Search
          size={16}
          color={focused ? "#9B4DBC" : "rgba(255,255,255,0.30)"}
          style={{ flexShrink: 0, transition: "color 0.2s" }}
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Buscar artículos..."
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            fontFamily: "var(--font-ui)",
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.85)",
            caretColor: "#9B4DBC",
          }}
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={clear}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.10)",
                border: "none",
                color: "rgba(255,255,255,0.50)",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <X size={12} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
