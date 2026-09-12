"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Fades and lifts its child into place.
 *
 * Two modes, and the difference matters for how fast the page feels:
 *
 * `immediate` is pure CSS. The animation starts the moment the element paints,
 * before React has hydrated, so above-the-fold content is never waiting on
 * JavaScript to become visible. Use it for anything in the first screenful.
 *
 * The default mode starts hidden and waits for an IntersectionObserver, so a
 * section further down plays when you actually reach it instead of finishing
 * unseen while you are still reading the hero.
 *
 * `delay` staggers siblings. A group given 0, 60, 120 reads as a sequence
 * rather than one slab landing at once.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  immediate?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (immediate) return

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        // One-way. Re-playing on every scroll past is the thing that makes
        // these animations feel cheap.
        observer.disconnect()
      },
      // Fire a little before the element is fully on screen so the motion has
      // finished by the time it is in comfortable reading position.
      { rootMargin: "0px 0px -12% 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [immediate])

  return (
    <div
      ref={ref}
      className={cn(
        immediate ? "animate-in-up" : "animate-in-up-on-view",
        inView && "in-view",
        className
      )}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
