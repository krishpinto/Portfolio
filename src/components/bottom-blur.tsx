"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/** The footer it steps aside for. */
const FOOTER_ID = "site-footer"

/**
 * A progressive blur that sits at the bottom edge of the viewport, so content
 * scrolling past it dissolves instead of being cut off.
 *
 * A single `backdrop-blur` would blur everything by the same amount and leave a
 * visible seam at its top edge. Stacking several layers, each blurring a little
 * more than the one above it and masked to its own band, ramps the blur up
 * toward the bottom with nothing to give away where the effect starts.
 *
 * Hidden below `sm`, where the mobile nav already draws its own bottom fade.
 *
 * It fades out once the footer comes into view. The footer is the end of the
 * page, not content passing underneath, and leaving the blur over it makes the
 * credits and the social row unreadable.
 */
const LAYERS = [
  {
    blur: "0.5px",
    mask: "linear-gradient(to top, transparent 62.5%, #000 75%, #000 87.5%, transparent 100%)",
  },
  {
    blur: "1px",
    mask: "linear-gradient(to top, transparent 50%, #000 62.5%, #000 75%, transparent 87.5%)",
  },
  {
    blur: "2px",
    mask: "linear-gradient(to top, transparent 37.5%, #000 50%, #000 62.5%, transparent 75%)",
  },
  {
    blur: "4px",
    mask: "linear-gradient(to top, transparent 25%, #000 37.5%, #000 50%, transparent 62.5%)",
  },
  {
    blur: "8px",
    mask: "linear-gradient(to top, transparent 12.5%, #000 25%, #000 37.5%, transparent 50%)",
  },
  {
    blur: "16px",
    mask: "linear-gradient(to top, #000 0%, #000 25%, transparent 37.5%)",
  },
]

export function BottomBlur() {
  const atFooter = useAtFooter()

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 h-24 transition-opacity duration-300 ease-out max-sm:hidden",
        atFooter ? "opacity-0" : "opacity-100"
      )}
    >
      {LAYERS.map(({ blur, mask }) => (
        <div
          key={blur}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blur})`,
            WebkitBackdropFilter: `blur(${blur})`,
            maskImage: mask,
            WebkitMaskImage: mask,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-linear-to-t from-background/70 to-transparent" />
    </div>
  )
}

/**
 * True once the footer is on screen. The root is grown by the blur's own
 * height so it clears out just before the footer slides under it rather than
 * just after.
 */
function useAtFooter() {
  const [atFooter, setAtFooter] = useState(false)

  useEffect(() => {
    const footer = document.getElementById(FOOTER_ID)
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      { rootMargin: "0px 0px 96px 0px" }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return atFooter
}
