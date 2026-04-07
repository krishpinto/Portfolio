export function KrishPintoMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 256"
      aria-hidden
      {...props}
    >
      {/*
        Classic pixel-art "KP" on a 512×256 grid.
        Each cell is 64×64. Two letters, each ~3 cols wide.

        K layout (cols 0-2, x: 0,64,128):
          row0 (y=0):   col0, col2      → top arm
          row1 (y=64):  col0, col1      → upper diagonal
          row2 (y=128): col0, col1      → lower diagonal
          row3 (y=192): col0, col2      → bottom arm

        P layout (cols 4-7, x: 256,320,384,448):
          row0 (y=0):   col4,col5,col6  → top bar of bowl
          row1 (y=64):  col4,col7       → left stem + right wall
          row2 (y=128): col4,col5,col6  → bottom bar (closes bowl)
          row3 (y=192): col4            → left stem only (P has open bottom)
      */}

      {/* === K === */}
      {/* row 0: left stem + top-right arm */}
      <rect x="0"   y="0"   width="64" height="64" fill="currentColor" />
      <rect x="128" y="0"   width="64" height="64" fill="currentColor" />

      {/* row 1: left stem + upper diagonal */}
      <rect x="0"   y="64"  width="64" height="64" fill="currentColor" />
      <rect x="64"  y="64"  width="64" height="64" fill="currentColor" />

      {/* row 2: left stem + lower diagonal */}
      <rect x="0"   y="128" width="64" height="64" fill="currentColor" />
      <rect x="64"  y="128" width="64" height="64" fill="currentColor" />

      {/* row 3: left stem + bottom-right arm */}
      <rect x="0"   y="192" width="64" height="64" fill="currentColor" />
      <rect x="128" y="192" width="64" height="64" fill="currentColor" />

      {/* === P === */}
      {/* row 0: left stem + top bar of bowl */}
      <rect x="256" y="0"   width="64" height="64" fill="currentColor" />
      <rect x="320" y="0"   width="64" height="64" fill="currentColor" />
      <rect x="384" y="0"   width="64" height="64" fill="currentColor" />

      {/* row 1: left stem + right wall of bowl */}
      <rect x="256" y="64"  width="64" height="64" fill="currentColor" />
      <rect x="448" y="64"  width="64" height="64" fill="currentColor" />

      {/* row 2: left stem + bottom bar of bowl */}
      <rect x="256" y="128" width="64" height="64" fill="currentColor" />
      <rect x="320" y="128" width="64" height="64" fill="currentColor" />
      <rect x="384" y="128" width="64" height="64" fill="currentColor" />

      {/* row 3: left stem only */}
      <rect x="256" y="192" width="64" height="64" fill="currentColor" />
    </svg>
  )
}

export function getKPMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 256"><rect x="0" y="0" width="64" height="64" fill="${color}"/><rect x="128" y="0" width="64" height="64" fill="${color}"/><rect x="0" y="64" width="64" height="64" fill="${color}"/><rect x="64" y="64" width="64" height="64" fill="${color}"/><rect x="0" y="128" width="64" height="64" fill="${color}"/><rect x="64" y="128" width="64" height="64" fill="${color}"/><rect x="0" y="192" width="64" height="64" fill="${color}"/><rect x="128" y="192" width="64" height="64" fill="${color}"/><rect x="256" y="0" width="64" height="64" fill="${color}"/><rect x="320" y="0" width="64" height="64" fill="${color}"/><rect x="384" y="0" width="64" height="64" fill="${color}"/><rect x="256" y="64" width="64" height="64" fill="${color}"/><rect x="448" y="64" width="64" height="64" fill="${color}"/><rect x="256" y="128" width="64" height="64" fill="${color}"/><rect x="320" y="128" width="64" height="64" fill="${color}"/><rect x="384" y="128" width="64" height="64" fill="${color}"/><rect x="256" y="192" width="64" height="64" fill="${color}"/></svg>`
}
