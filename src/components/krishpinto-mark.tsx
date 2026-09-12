/**
 * Pixel-art "KP" on a 7x4 grid of 64px cells, so 448x256.
 *
 * K (cols 0-2)          P (cols 4-6)
 *   █ · █                 █ █ █
 *   █ █ ·                 █ · █
 *   █ █ ·                 █ █ █
 *   █ · █                 █ · ·
 *
 * The bowl of the P closes on col 6, the same column its top and bottom bars
 * end on. An earlier version put the right wall one column further out, which
 * left it floating clear of both bars and read as an F.
 */
export const MARK_COLS = 7
export const MARK_ROWS = 4
const CELL = 64

/** [column, row] of every filled cell. */
export const MARK_CELLS: [col: number, row: number][] = [
  // K: stem down col 0, arms out to col 2, elbow at col 1
  [0, 0],
  [2, 0],
  [0, 1],
  [1, 1],
  [0, 2],
  [1, 2],
  [0, 3],
  [2, 3],
  // P: stem down col 4, closed bowl across cols 4-6 on the top three rows
  [4, 0],
  [5, 0],
  [6, 0],
  [4, 1],
  [6, 1],
  [4, 2],
  [5, 2],
  [6, 2],
  [4, 3],
]

export function KrishPintoMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={`0 0 ${MARK_COLS * CELL} ${MARK_ROWS * CELL}`}
      aria-hidden
      {...props}
    >
      {MARK_CELLS.map(([col, row]) => (
        <rect
          key={`${col}-${row}`}
          x={col * CELL}
          y={row * CELL}
          width={CELL}
          height={CELL}
          fill="currentColor"
        />
      ))}
    </svg>
  )
}

/** Flat string version, for copying the logo out of the brand context menu. */
export function getKPMarkSVG(color: string) {
  const rects = MARK_CELLS.map(
    ([col, row]) =>
      `<rect x="${col * CELL}" y="${row * CELL}" width="${CELL}" height="${CELL}" fill="${color}"/>`
  ).join("")

  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 ${MARK_COLS * CELL} ${MARK_ROWS * CELL}">${rects}</svg>`
}

/**
 * Silhouette of the mark as a single stroked path.
 *
 * Every cell contributes four edges; an edge shared by two filled cells is
 * interior and cancels out, so what survives traces the outside of the glyph.
 * Collinear runs are then merged, which is cosmetic rather than functional: a
 * stroke renders identically either way, but unmerged it is 38 separate
 * segments instead of 20.
 *
 * Derived from MARK_CELLS rather than written out, so editing a cell cannot
 * leave the outline describing an older version of the logo.
 */
function buildOutlinePath() {
  const seen = new Map<string, number>()
  const edge = (x1: number, y1: number, x2: number, y2: number) => {
    const key = `${x1},${y1},${x2},${y2}`
    seen.set(key, (seen.get(key) ?? 0) + 1)
  }

  for (const [col, row] of MARK_CELLS) {
    const x = col * CELL
    const y = row * CELL
    edge(x, y, x + CELL, y) // top
    edge(x, y + CELL, x + CELL, y + CELL) // bottom
    edge(x, y, x, y + CELL) // left
    edge(x + CELL, y, x + CELL, y + CELL) // right
  }

  // Lines are grouped by the axis they sit on, then touching spans are joined.
  const horizontal = new Map<number, [number, number][]>()
  const vertical = new Map<number, [number, number][]>()

  for (const [key, count] of seen) {
    if (count !== 1) continue
    const [x1, y1, x2, y2] = key.split(",").map(Number)
    const [lines, axis, span] =
      y1 === y2
        ? ([horizontal, y1, [x1, x2]] as const)
        : ([vertical, x1, [y1, y2]] as const)
    lines.set(axis, [...(lines.get(axis) ?? []), span as [number, number]])
  }

  const merge = (spans: [number, number][]) => {
    const sorted = [...spans].sort((a, b) => a[0] - b[0])
    const runs: [number, number][] = []
    for (const [start, end] of sorted) {
      const last = runs.at(-1)
      if (last && last[1] === start) last[1] = end
      else runs.push([start, end])
    }
    return runs
  }

  const parts: string[] = []
  for (const [y, spans] of horizontal) {
    for (const [x1, x2] of merge(spans)) parts.push(`M${x1} ${y}H${x2}`)
  }
  for (const [x, spans] of vertical) {
    for (const [y1, y2] of merge(spans)) parts.push(`M${x} ${y1}V${y2}`)
  }
  return parts.join("")
}

export const MARK_OUTLINE_PATH = buildOutlinePath()

/**
 * The mark as a hairline outline instead of solid blocks. Used on the 404
 * page, where a filled logo would read as branding rather than as scenery.
 *
 * The viewBox carries two units of padding because the stroke is centred on
 * the path, so an edge at x=0 would otherwise be clipped in half.
 */
export function KrishPintoMarkOutline(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={`-2 -2 ${MARK_COLS * CELL + 4} ${MARK_ROWS * CELL + 4}`}
      aria-hidden
      {...props}
    >
      <path
        d={MARK_OUTLINE_PATH}
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
