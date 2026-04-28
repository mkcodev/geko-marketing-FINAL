"use client"

import dynamic from "next/dynamic"

interface CusdisCommentsProps {
  pageId: string
  pageUrl: string
  pageTitle: string
}

const LazyComments = dynamic(
  () => import("./cusdis-comments").then((m) => ({ default: m.CusdisComments })),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--fg-subtle)",
          fontSize: "0.875rem",
          fontFamily: "var(--font-ui)",
        }}
      >
        Cargando comentarios...
      </div>
    ),
  }
)

export function CusdisComments(props: CusdisCommentsProps) {
  return <LazyComments {...props} />
}
