import type { Metadata } from "next"
import { HomeClient } from "./home-client"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
  alternates: { canonical: "https://geko-marketing.com" },
}

export default async function HomePage() {
  const allPosts = await getAllPosts()
  const recentPosts = allPosts.slice(0, 3)
  return <HomeClient recentPosts={recentPosts} />
}
