"use client"

import { useReducedMotion } from "motion/react"
import Script from "next/script"
import { useMemo } from "react"

import { useIsClient } from "@/hooks/use-is-client"

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false
  return "ontouchstart" in window || navigator.maxTouchPoints > 0
}

export function OnekoCat() {
  const isClient = useIsClient()
  const shouldReduceMotion = useReducedMotion()

  const isTouch = useMemo(() => {
    if (!isClient) return true
    return isTouchDevice()
  }, [isClient])

  if (!isClient || shouldReduceMotion || isTouch) return null

  return <Script src="/oneko/oneko.js" data-cat="/oneko/oneko.gif" />
}
