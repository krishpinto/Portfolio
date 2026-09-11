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
