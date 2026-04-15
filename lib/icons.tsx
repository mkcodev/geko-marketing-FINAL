import {
  Share2, Sparkles, Monitor, Camera, Music2, Briefcase,
  Users, Play, Globe, Printer, Film, Zap, FileText,
  ShoppingBag, Paintbrush2, Wrench, UtensilsCrossed,
  Heart, Home, Wine, Building2, ShoppingCart, Hexagon,
  Palette, Type, CreditCard, Layout, BookOpen, Ruler,
  CheckSquare, LayoutTemplate, BarChart2, Mountain,
  ArrowRight, Check, ChevronRight, Star, Code2,
  LineChart, Megaphone, Target, TrendingUp, Layers,
  PenTool, ImageIcon, Package,
  MessageCircle, Calendar, ThumbsUp,
} from "lucide-react"
import type { LucideProps } from "lucide-react"

const MAP = {
  Share2, Sparkles, Monitor, Camera, Music2, Briefcase,
  Users, Play, Globe, Printer, Film, Zap, FileText,
  ShoppingBag, Paintbrush2, Wrench, UtensilsCrossed,
  Heart, Home, Wine, Building2, ShoppingCart, Hexagon,
  Palette, Type, CreditCard, Layout, BookOpen, Ruler,
  CheckSquare, LayoutTemplate, BarChart2, Mountain,
  ArrowRight, Check, ChevronRight, Star, Code2,
  LineChart, Megaphone, Target, TrendingUp, Layers,
  PenTool, ImageIcon, Package,
  MessageCircle, Calendar, ThumbsUp,
} as const

export type IconName = keyof typeof MAP

export function Icon({
  name,
  ...props
}: { name: IconName } & LucideProps) {
  const Component = MAP[name]
  if (!Component) return null
  return <Component {...props} />
}
