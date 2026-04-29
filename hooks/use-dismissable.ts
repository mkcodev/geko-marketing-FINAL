"use client"

import { useState, useEffect, useCallback } from "react"

/**
 * Manages a dismissable element persisted in localStorage.
 * Returns [visible, dismiss].
 */
export function useDismissable(storageKey: string): [boolean, () => void] {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(storageKey)) setVisible(true)
  }, [storageKey])

  const dismiss = useCallback(() => {
    localStorage.setItem(storageKey, "1")
    setVisible(false)
  }, [storageKey])

  return [visible, dismiss]
}
