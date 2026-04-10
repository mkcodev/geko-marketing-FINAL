export type Language = "es" | "en"
export type Theme = "dark" | "light"

export interface TeamMember {
  id: string
  name: string
  role: string
  roleEn: string
  bio?: string
  bioEn?: string
  image: string
  social?: {
    instagram?: string
    linkedin?: string
    twitter?: string
  }
}

export interface ServicePlan {
  id: "silver" | "golden" | "platinum"
  name: string
  tagline: string
  taglineEn: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  featuresEn: string[]
  badge?: string
  badgeEn?: string
  popular?: boolean
  cta: string
  ctaEn: string
}

export interface Service {
  id: string
  slug: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  icon: string
  href: string
  features: string[]
}

export interface CaseStudy {
  id: string
  clientName: string
  industry: string
  industryEn: string
  metric: string
  metricLabel: string
  metricLabelEn: string
  platform: string
  period: string
  logo?: string
  color: string
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  content: string
  contentEn: string
  rating: number
  image?: string
  platform: "google" | "email" | "whatsapp"
}

export interface BlogPost {
  slug: string
  title: string
  titleEn?: string
  excerpt: string
  excerptEn?: string
  content: string
  author: string
  date: string
  readingTime: number
  category: BlogCategory
  tags: string[]
  image?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export type BlogCategory =
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "youtube"
  | "facebook"
  | "branding"
  | "estrategia"
  | "webs"

export interface NavItem {
  label: string
  labelEn: string
  href: string
  children?: NavItem[]
}
