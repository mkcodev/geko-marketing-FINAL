"use client"

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"
import type { ReactNode } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="geko-theme"
    >
      {children}
    </NextThemesProvider>
  )
}

export function useTheme() {
  const { resolvedTheme, setTheme } = useNextTheme()
  const theme = (resolvedTheme ?? "dark") as "dark" | "light"
  return {
    theme,
    toggle: () => setTheme(theme === "dark" ? "light" : "dark"),
  }
}
