import type { Metadata } from "next"
import { Hero2Client } from "./Hero2Client"

export const metadata: Metadata = {
  title: "Hero 2 — Typographic Manifesto",
  robots: { index: false, follow: false },
}

export default function Hero2Page() {
  return <Hero2Client />
}
