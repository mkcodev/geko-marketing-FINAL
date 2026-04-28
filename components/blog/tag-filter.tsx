"use client"

import { motion } from "motion/react"
import { Icon } from "@/lib/icons"
import { CATEGORY_META } from "@/lib/blog-constants"
import type { Category } from "@/lib/blog-constants"

interface TagFilterProps {
  activeCategory: Category | null
  onSelect: (cat: Category | null) => void
  counts: Partial<Record<Category, number>>
}

export function TagFilter({ activeCategory, onSelect, counts }: TagFilterProps) {
  const categories = Object.entries(CATEGORY_META) as [
    Category,
    (typeof CATEGORY_META)[Category]
  ][]

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* All */}
      <FilterPill
        label="Todos"
        count={Object.values(counts).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0}
        active={activeCategory === null}
        color="var(--color-geko-purple-accent)"
        icon="LayoutGrid"
        onClick={() => onSelect(null)}
      />

      {categories.map(([slug, meta]) => (
        <FilterPill
          key={slug}
          label={meta.label}
          count={counts[slug] ?? 0}
          active={activeCategory === slug}
          color={meta.color}
          icon={meta.icon}
          onClick={() => onSelect(slug === activeCategory ? null : slug)}
        />
      ))}
    </div>
  )
}

interface FilterPillProps {
  label: string
  count: number
  active: boolean
  color: string
  icon: string
  onClick: () => void
}

function FilterPill({ label, count, active, color, icon, onClick }: FilterPillProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 14px",
        borderRadius: 9999,
        background: active ? `${color}18` : "var(--surface)",
        border: `1px solid ${active ? color + "45" : "var(--border)"}`,
        fontFamily: "var(--font-ui)",
        fontSize: "0.8rem",
        fontWeight: active ? 600 : 400,
        color: active ? color : "var(--fg-secondary)",
        cursor: "pointer",
        transition: "background 0.2s, border-color 0.2s, color 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      <Icon
        name={icon as import("@/lib/icons").IconName}
        size={12}
        color={active ? color : "var(--fg-muted)"}
        style={{ transition: "color 0.2s" }}
      />
      {label}
      {count > 0 && (
        <span
          style={{
            padding: "1px 6px",
            borderRadius: 9999,
            background: active ? `${color}25` : "var(--border)",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: active ? color : "var(--fg-muted)",
          }}
        >
          {count}
        </span>
      )}
    </motion.button>
  )
}
