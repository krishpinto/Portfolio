"use client"

import { useRef, useCallback } from "react"

const CELL = 28
const GAP = 2

const CHARS: Record<string, string[]> = {
  K: ['XX   XX', 'XX  XX ', 'XXXXX  ', 'XXXX   ', 'XXXX   ', 'XXXXX  ', 'XX  XX ', 'XX   XX'],
  R: ['XXXXXX ', 'XX   XX', 'XX   XX', 'XXXXXX ', 'XXXXX  ', 'XX XX  ', 'XX  XX ', 'XX   XX'],
  I: [' XXXX ', '  XX  ', '  XX  ', '  XX  ', '  XX  ', '  XX  ', '  XX  ', ' XXXX '],
  S: [' XXXXX', 'XX    ', 'XX    ', ' XXXXX', '    XX', '    XX', '    XX', 'XXXXX '],
  H: ['XX   XX', 'XX   XX', 'XX   XX', 'XXXXXXX', 'XXXXXXX', 'XX   XX', 'XX   XX', 'XX   XX'],
}

type PixelData = { id: string; x: number; y: number; cx: number; cy: number }

const VIEWBOX_W = 1300
const VIEWBOX_H = 256

function buildPixels(): PixelData[] {
  const raw: PixelData[] = []
  let offsetX = 0
  for (const char of ['K', 'R', 'I', 'S', 'H']) {
    const lines = CHARS[char]
    lines.forEach((line, row) => {
      for (let col = 0; col < line.length; col++) {
        if (line[col] === 'X') {
          const x = (offsetX + col) * CELL
          const y = row * CELL
          raw.push({ id: `${char}-${row}-${col}`, x, y, cx: x + CELL / 2, cy: y + CELL / 2 })
        }
      }
    })
    offsetX += lines[0].length + 1
  }

  // Center horizontally and vertically in the viewBox
  const xs = raw.map(p => p.x)
  const ys = raw.map(p => p.y)
  const blockW = Math.max(...xs) + CELL - Math.min(...xs)
  const blockH = Math.max(...ys) + CELL - Math.min(...ys)
  const dx = (VIEWBOX_W - blockW) / 2 - Math.min(...xs)
  const dy = (VIEWBOX_H - blockH) / 2 - Math.min(...ys)

  return raw.map(p => ({
    ...p,
    x: p.x + dx,
    y: p.y + dy,
    cx: p.cx + dx,
    cy: p.cy + dy,
  }))
}

const PIXELS = buildPixels()
const RADIUS = 180
const BASE = 0.07
const PEAK = 0.92

export function SiteFooterInteractiveLogotype() {
  const refs = useRef<(SVGRectElement | null)[]>([])
  const raf = useRef(0)

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect()
    const sx = (e.clientX - box.left) * (VIEWBOX_W / box.width)
    const sy = (e.clientY - box.top) * (VIEWBOX_H / box.height)
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      PIXELS.forEach(({ cx, cy }, i) => {
        const el = refs.current[i]
        if (!el) return
        const d = Math.hypot(cx - sx, cy - sy)
        const t = Math.max(0, 1 - d / RADIUS)
        el.style.fillOpacity = (BASE + (PEAK - BASE) * t * t).toFixed(3)
      })
    })
  }, [])

  const onLeave = useCallback(() => {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      refs.current.forEach(el => {
        if (el) el.style.fillOpacity = String(BASE)
      })
    })
  }, [])

  return (
    <div className="screen-line-bottom flex w-full justify-center after:z-1 after:bg-foreground/10">
      <div
        className="overflow-hidden md:w-3/4 max-w-full select-none"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="flex w-full translate-y-[15%] items-center justify-center">
          <svg
            className="w-full h-auto"
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {PIXELS.map(({ id, x, y }, i) => (
              <rect
                key={id}
                ref={el => { refs.current[i] = el }}
                x={x + GAP}
                y={y + GAP}
                width={CELL - GAP * 2}
                height={CELL - GAP * 2}
                fill="var(--foreground)"
                fillOpacity={BASE}
                style={{ transition: "fill-opacity 200ms ease-out" }}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}
