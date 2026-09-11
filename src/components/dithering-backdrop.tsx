"use client"

import dynamic from "next/dynamic"
import { useTheme } from "next-themes"

import { useIsClient } from "@/hooks/use-is-client"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

/** Flip to false to take the shader off the page without touching callers. */
const ENABLED = true

/**
 * ~40KB of WebGL that nothing can see until hydration, since the component
 * renders nothing until it knows the theme. Loading it separately keeps it out
 * of the bundle every page pays for up front.
 */
const Dithering = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.Dithering),
  { ssr: false }
)

/**
 * Ethan's drifting dither field, as a background layer.
 *
 * His version hardcodes two near-black hexes, which only works on a dark page,
 * so the colours are picked per theme here instead.
 *
 * The library already stops its render loop when the canvas scrolls out of
 * view or the tab is hidden, so this does not burn a GPU frame budget while
 * nobody is looking. What it does not do is honour a reduced-motion
 * preference, so that is handled below: the texture stays, the drift stops.
 */
const COLORS = {
  dark: { back: "#0a0a0a", front: "#2d2d2d" },
  light: { back: "#fafafa", front: "#d8d8dd" },
}

export function DitheringBackdrop({
  className,
  speed = 0.08,
}: {
  className?: string
  speed?: number
}) {
  const { resolvedTheme } = useTheme()
  const isClient = useIsClient()
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  // The theme is only known on the client, and painting the dark field on a
  // light page for one frame is worse than fading in a moment late.
  if (!ENABLED || !isClient) return null

  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark

  return (
    <Dithering
      colorBack={colors.back}
      colorFront={colors.front}
      shape="warp"
      type="4x4"
      size={2}
      speed={reduceMotion ? 0 : speed}
      // Defaults to 2, which on a 4K display renders four times the pixels
      // this needs. It is a blurred texture behind text, not a photograph.
      minPixelRatio={1}
      maxPixelCount={1920 * 1080}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 animate-in duration-1000 fade-in-0",
        className
      )}
      aria-hidden
    />
  )
}
