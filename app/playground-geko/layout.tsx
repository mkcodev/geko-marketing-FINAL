import { notFound } from "next/navigation"
import type { ReactNode } from "react"

// Playground only available in development — excluded from production build
export default function PlaygroundLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound()
  return <>{children}</>
}
