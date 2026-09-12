/**
 * Generates the printable QR code for the phone case into assets/qr/.
 *
 * The code is static: the URL sits in the pattern itself, so nothing can
 * expire and no third party sits between a scan and the site. It points at /qr
 * rather than the bare domain so the destination stays retargetable and scans
 * stay countable (see src/app/qr/route.ts).
 *
 * Not part of the build. To re-run it:
 *
 *     npm i --no-save --legacy-peer-deps qrcode jsqr
 *     node src/scripts/generate-qr.mjs
 *
 * The script rasterises its own output and decodes it again across a range of
 * resolutions before writing anything. That check is not ceremony. The first
 * version of this file drew every module as a separate circle, which read
 * fine to the eye and decoded at small sizes, but failed everywhere above
 * about 400px: separated dots destroy the alignment pattern, and a decoder
 * that cannot find it gives up. Anything decorative done to a QR code needs
 * to be proven against a decoder rather than eyeballed.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import jsQR from "jsqr"
import QRCode from "qrcode"
// The published surface exposes only finished images, but the renderer needs
// the alignment pattern coordinates, which vary by version.
import { getPositions as alignmentPositions } from "qrcode/lib/core/alignment-pattern.js"
import sharp from "sharp"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const OUT = path.join(ROOT, "assets/qr")

/** Printed size of the finished artwork, in millimetres. */
const SIZE_MM = 45

/** The spec's quiet zone. Four clear modules on every side, never less. */
const QUIET = 4

const URL = "https://krishpinto.co.in/qr"

/**
 * Level H recovers 30% of the symbol. More than a flat print needs, but it is
 * what buys tolerance for the curve of a case, for scuffs, and for punching a
 * logo into the middle later. At this physical size the extra modules cost
 * nothing that matters.
 */
const ECC = "H"

const DARK = "#000000"
const LIGHT = "#ffffff"

/** Data module diameter, as a fraction of a module. */
const DOT = 0.9

const qr = QRCode.create(URL, { errorCorrectionLevel: ECC })
const N = qr.modules.size
const isDark = (row, col) => qr.modules.data[row * N + col]

const FINDERS = [
  [0, 0],
  [0, N - 7],
  [N - 7, 0],
]
const ALIGNMENTS = alignmentPositions(qr.version)

const inFinder = (row, col) =>
  FINDERS.some(([r, c]) => row >= r && row < r + 7 && col >= c && col < c + 7)

const inAlignment = (row, col) =>
  ALIGNMENTS.some(
    ([r, c]) => Math.abs(row - r) <= 2 && Math.abs(col - c) <= 2
  )

/**
 * Finder and alignment patterns are drawn as concentric rings rather than as
 * loose dots. Their job is to be found by a decoder before it knows anything
 * about the symbol, so their outline has to stay continuous even though every
 * data module around them is a separate circle.
 */
function patterns() {
  const shapes = FINDERS.map(([row, col]) => {
    const x = col + QUIET
    const y = row + QUIET
    return (
      `<rect x="${x + 0.5}" y="${y + 0.5}" width="6" height="6" rx="1.75" ` +
      `fill="none" stroke="${DARK}" stroke-width="1"/>` +
      `<rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx="0.9"/>`
    )
  })

  for (const [row, col] of ALIGNMENTS) {
    const cx = col + QUIET + 0.5
    const cy = row + QUIET + 0.5
    shapes.push(
      `<circle cx="${cx}" cy="${cy}" r="2" fill="none" stroke="${DARK}" stroke-width="1"/>` +
        `<circle cx="${cx}" cy="${cy}" r="0.5"/>`
    )
  }

  return shapes.join("")
}

/** Everything that is not a locator pattern, as circles. */
function dots() {
  const out = []
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (!isDark(row, col) || inFinder(row, col) || inAlignment(row, col)) {
        continue
      }
      out.push(
        `<circle cx="${col + QUIET + 0.5}" cy="${row + QUIET + 0.5}" r="${DOT / 2}"/>`
      )
    }
  }
  return out.join("")
}

/**
 * Sized in real millimetres so the file reaches a printer already at its
 * intended physical size, rather than depending on someone setting the scale.
 */
function svg({ side, frame }) {
  const scale = side / (N + QUIET * 2)
  const offset = (SIZE_MM - side) / 2

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE_MM}mm" height="${SIZE_MM}mm" viewBox="0 0 ${SIZE_MM} ${SIZE_MM}">
<rect width="${SIZE_MM}" height="${SIZE_MM}" fill="${LIGHT}"/>
${frame}<g transform="translate(${offset.toFixed(4)} ${offset.toFixed(4)}) scale(${scale.toFixed(6)})" fill="${DARK}">${patterns()}${dots()}</g>
</svg>
`
}

const HALF = SIZE_MM / 2

const VARIANTS = {
  // Fills the artboard. Largest modules, so the most forgiving to scan.
  square: { side: SIZE_MM, frame: "" },

  // A ring with the code inscribed. Fitting a square inside a circle costs
  // roughly a third of the module size, which is why both are generated.
  circle: (() => {
    const stroke = 2
    const ring = HALF - stroke / 2 - 0.4
    const clear = ring - stroke / 2 - 1.2
    return {
      side: (clear * 2) / Math.SQRT2,
      frame: `<circle cx="${HALF}" cy="${HALF}" r="${ring.toFixed(3)}" fill="none" stroke="${DARK}" stroke-width="${stroke}"/>`,
    }
  })(),
}

/**
 * Pixel widths the artwork is decoded at. The small end is roughly what a
 * phone camera resolves from arm's length; the large end is the 600dpi file a
 * printer receives. A decorated code can pass one and fail the other.
 */
const DECODE_AT = [150, 250, 400, 531, 800, 1063, 2000]

/** 45mm at 600dpi, the raster a print shop will ask for. */
const PRINT_PX = Math.round((SIZE_MM / 25.4) * 600)

fs.mkdirSync(OUT, { recursive: true })

console.log(`url      ${URL}`)
console.log(`encoding version ${qr.version}, ecc ${ECC}, ${N}x${N} modules`)
console.log(`artboard ${SIZE_MM}mm square\n`)

let failed = false

for (const [name, config] of Object.entries(VARIANTS)) {
  const markup = svg(config)
  fs.writeFileSync(path.join(OUT, `krishpinto-qr-${name}.svg`), markup, "utf8")

  const source = Buffer.from(markup)
  const bad = []

  for (const width of DECODE_AT) {
    const { data, info } = await sharp(source, { density: 300 })
      .resize(width, width, { kernel: "lanczos3" })
      .flatten({ background: LIGHT })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    const decoded = jsQR(new Uint8ClampedArray(data), info.width, info.height)
    if (decoded?.data !== URL) bad.push(width)
  }

  await sharp(source, { density: 300 })
    .resize(PRINT_PX, PRINT_PX, { kernel: "lanczos3" })
    .flatten({ background: LIGHT })
    .png()
    .toFile(path.join(OUT, `krishpinto-qr-${name}@600dpi.png`))

  const pitch = config.side / (N + QUIET * 2)
  const verdict = bad.length ? `FAILED at ${bad.join(", ")}px` : "decodes at every size"
  if (bad.length) failed = true

  console.log(
    `${name.padEnd(7)} module ${pitch.toFixed(3)}mm   code ${config.side.toFixed(1)}mm   ${verdict}`
  )
}

if (failed) {
  console.error("\na variant did not decode; do not send it to a printer")
  process.exit(1)
}

console.log(`\nwrote svg + ${PRINT_PX}px png to ${path.relative(ROOT, OUT)}`)
