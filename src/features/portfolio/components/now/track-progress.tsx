"use client"

import { useEffect, useState } from "react"

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

type TrackProgressProps = {
  position: number
  duration: number
}

/**
 * Advances playback from its starting position and loops at the end.
 * The first render uses the raw `position` so the server and client markup
 * agree; ticking only starts after mount.
 */
export function TrackProgress({ position, duration }: TrackProgressProps) {
  const [elapsed, setElapsed] = useState(position)

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => (prev + 1) % duration)
    }, 1000)

    return () => clearInterval(timer)
  }, [duration])

  const percent = (elapsed / duration) * 100

  return (
    <>
      <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
        {formatTime(elapsed)} / {formatTime(duration)}
      </span>

      <span
        className="absolute inset-x-0 bottom-0 z-10 h-px bg-line"
        aria-hidden
      >
        <span
          className="block h-px bg-foreground/60 transition-[width] duration-1000 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </span>
    </>
  )
}
