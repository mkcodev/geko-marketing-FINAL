"use client"

import dynamic from "next/dynamic"

const CustomCursor = dynamic(
  () => import("@/components/ui/custom-cursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
)
const ScrollProgress = dynamic(
  () => import("@/components/ui/scroll-progress").then((m) => ({ default: m.ScrollProgress })),
  { ssr: false }
)
const AnalyticsProvider = dynamic(
  () => import("@/components/providers/analytics-provider").then((m) => ({ default: m.AnalyticsProvider })),
  { ssr: false }
)

export function ClientOverlays() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <AnalyticsProvider />
    </>
  )
}
