import type { Metadata } from "next"
import { Hero1Client } from "./Hero1Client"

export const metadata: Metadata = {
  title: "Hero 1 — Command Center",
  robots: { index: false, follow: false },
}

export default function Hero1Page() {
  return <Hero1Client />
}
