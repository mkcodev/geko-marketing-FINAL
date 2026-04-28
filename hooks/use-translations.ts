"use client"

import { useLanguage } from "@/context/language-context"
import es from "@/messages/es.json"
import en from "@/messages/en.json"

const messages = { es, en } as const

export type Messages = typeof es

export function useT(): Messages {
  const { language } = useLanguage()
  return messages[language] as Messages
}
