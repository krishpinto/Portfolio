/**
 * Generates src/components/tech-icons.tsx.
 *
 * Two sources:
 *   1. reframix/src/components/technologies/*.tsx — Ramx's coloured brand
 *      marks, extracted from the file rather than retyped so nothing drifts.
 *   2. simple-icons — fills the brands Ramx's set does not carry.
 *
 * Neither is a dependency of the site, so this is a one-off tool rather than
 * part of the build. To re-run it:
 *
 *     npm i --no-save --legacy-peer-deps simple-icons
 *     node src/scripts/generate-tech-icons.mjs
 *
 * and have the reframix reference clone present. Without the clone it will
 * stop on the first missing file rather than emit a half-populated registry.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import * as si from "simple-icons"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const REF = path.join(ROOT, "reframix/src/components/technologies")

// ── Ramx's set ───────────────────────────────────────────────────────────────
// file base name -> registry key
const RAMX = {
  AWS: "aws",
  Appwrite: "appwrite",
  BootStrap: "bootstrap",
  Bun: "bun",
  CSS: "css",
  ExpressJs: "express",
  Figma: "figma",
  Github: "github",
  Html: "html",
  JavaScript: "javascript",
  MDXIcon: "mdx",
  MongoDB: "mongodb",
  Motion: "motion",
  NestJs: "nestjs",
  Netlify: "netlify",
  NextJs: "nextjs",
  NodeJs: "nodejs",
  PostgreSQL: "postgresql",
  Postman: "postman",
  Prisma: "prisma",
  ReactIcon: "react",
  Sanity: "sanity",
  Shadcn: "shadcn",
  SocketIo: "socketio",
  TailwindCss: "tailwindcss",
  ThreeJs: "threejs",
  TypeScript: "typescript",
  Vercel: "vercel",
}

/**
 * Per-icon recolouring.
 *
 * A mark drawn in flat black or flat white on a transparent ground disappears
 * against one of the two themes, so those fills are swapped for currentColor.
 * Fills that sit on the brand's own coloured shape are left alone: the dark
 * lettering of the JavaScript mark reads fine on its yellow square, and
 * repainting it would break the logo.
 */
const RECOLOUR = {
  github: ["#181616"],
  prisma: ["#2d3748"],
  aws: ["#fff"],
}

function extractSvg(file) {
  const src = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n")
  const start = src.indexOf("<svg")
  const end = src.lastIndexOf("</svg>")
  if (start < 0 || end < 0) throw new Error(`no svg in ${file}`)
  return src.slice(start, end + "</svg>".length)
}

function normalize(svg, key) {
  const openTag = svg.slice(0, svg.indexOf(">"))
  const viewBox = openTag.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 128 128"

  // Several marks set their paint once on the root <svg> and leave the paths
  // bare. Dropping the wrapper would silently repaint them black, so the root
  // presentation attributes are carried onto the generated element.
  const rootPaint = [...openTag.matchAll(/\s(fill|stroke|color)="([^"]*)"/g)]
    .map(
      ([, attr, value]) =>
        ` ${attr}="${RECOLOUR[key]?.includes(value) ? "currentColor" : value}"`
    )
    .join("")

  // Body only; the wrapper is rebuilt so every icon takes the same props.
  let body = svg.slice(svg.indexOf(">") + 1, svg.lastIndexOf("</svg>"))

  // Drop the per-file className plumbing, it is handled by the wrapper now.
  body = body.replace(/\s*className="[^"]*"/g, "")

  // `color="currentColor"` is a no-op that some renderers resolve to black
  // instead of to the inherited colour. The three.js mark is the only one
  // carrying it, and without it the whole wireframe goes black on a dark page.
  body = body.replace(/\s*color="currentColor"/g, "")

  for (const fill of RECOLOUR[key] ?? []) {
    body = body.replaceAll(`fill="${fill}"`, 'fill="currentColor"')
  }

  // Gradient ids are global to the document, so namespace them per icon.
  const ids = [...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])
  for (const id of ids) {
    body = body.replaceAll(` id="${id}"`, ` id="${key}-${id}"`)
    body = body.replaceAll(`url(#${id})`, `url(#${key}-${id})`)
  }

  return { viewBox, rootPaint, body: body.trim() }
}

// Next.js is a black disc with white cut-outs. Painted with fixed colours it is
// invisible on one theme or the other, so the disc takes the foreground colour
// and the cut-outs take the page background.
const NEXTJS_FIX = (body) =>
  body
    .replace(/<circle([^>]*)>/, '<circle$1 fill="currentColor">')
    .replaceAll('stopColor="#fff"', 'stopColor="var(--color-background)"')

// ── simple-icons fill-ins ────────────────────────────────────────────────────
// registry key -> simple-icons export name
const SIMPLE = {
  dotnet: "siDotnet",
  android: "siAndroid",
  cloudflare: "siCloudflare",
  firebase: "siFirebase",
  kotlin: "siKotlin",
  kubernetes: "siKubernetes",
  mcp: "siModelcontextprotocol",
  pytorch: "siPytorch",
  upstash: "siUpstash",
  rust: "siRust",
  sqlite: "siSqlite",
  tauri: "siTauri",
  esbuild: "siEsbuild",
  huggingface: "siHuggingface",
  gemini: "siGooglegemini",
  python: "siPython",
  redis: "siRedis",
  npm: "siNpm",
  docker: "siDocker",
  git: "siGit",
  expo: "siExpo",
  claude: "siClaude",
  n8n: "siN8n",
  langchain: "siLangchain",
  langgraph: "siLanggraph",
  ollama: "siOllama",
  tensorflow: "siTensorflow",
}

// ── Brand SVGs kept alongside this script ────────────────────────────────────
// Microsoft's Power Platform and SharePoint marks are in neither Ramx's set
// nor simple-icons, which dropped the Microsoft family at the brand owner's
// request. These came from Wikimedia Commons (public domain) and Iconify, and
// were run through svgo with prefixIds so their gradient ids cannot collide.
// file base name in ./tech-logos -> registry key
const LOCAL = {
  powerapps: "powerapps",
  powerautomate: "powerautomate",
  powerbi: "powerbi",
  sharepoint: "sharepoint",
}

/** SVG attribute names React insists on spelling differently. */
const JSX_ATTRS = [
  ["stop-color", "stopColor"],
  ["stop-opacity", "stopOpacity"],
  ["fill-rule", "fillRule"],
  ["fill-opacity", "fillOpacity"],
  ["clip-rule", "clipRule"],
  ["clip-path", "clipPath"],
  ["stroke-width", "strokeWidth"],
  ["stroke-linecap", "strokeLinecap"],
  ["stroke-linejoin", "strokeLinejoin"],
  ["stroke-opacity", "strokeOpacity"],
  ["stroke-dasharray", "strokeDasharray"],
  ["flood-opacity", "floodOpacity"],
  ["flood-color", "floodColor"],
  ["color-interpolation-filters", "colorInterpolationFilters"],
  ["xlink:href", "xlinkHref"],
  ["xmlns:xlink", "xmlnsXlink"],
]

function fromLocalFile(key, file) {
  const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n")
  const open = raw.slice(
    raw.indexOf("<svg"),
    raw.indexOf(">", raw.indexOf("<svg"))
  )
  const viewBox = open.match(/viewBox="([^"]+)"/)?.[1]
  if (!viewBox) throw new Error(`${file} has no viewBox`)

  let body = raw.slice(
    raw.indexOf(">", raw.indexOf("<svg")) + 1,
    raw.lastIndexOf("</svg>")
  )
  for (const [from, to] of JSX_ATTRS)
    body = body.replaceAll(from + "=", to + "=")

  return {
    key,
    viewBox,
    body: body.trim(),
    from: `local (tech-logos/${key}.svg)`,
  }
}

/**
 * Hand-authored marks. simple-icons dropped the Microsoft family at the
 * brand owner's request, and Ramx's set never carried it, so the four-square
 * logo is written out here in its published colours.
 */
const HAND = {
  microsoft: {
    viewBox: "0 0 24 24",
    body:
      '<path d="M1 1h10v10H1z" fill="#F25022" />' +
      '<path d="M13 1h10v10H13z" fill="#7FBA00" />' +
      '<path d="M1 13h10v10H1z" fill="#00A4EF" />' +
      '<path d="M13 13h10v10H13z" fill="#FFB900" />',
  },
}

/**
 * A brand this close to black needs the theme colour to stay visible. The
 * threshold catches SQLite's navy as well as the flat blacks, because on a
 * dark page that navy feather all but disappears.
 */
const isNearBlack = (hex) =>
  parseInt(hex.slice(0, 2), 16) +
    parseInt(hex.slice(2, 4), 16) +
    parseInt(hex.slice(4, 6), 16) <
  160

const parts = []

for (const [file, key] of Object.entries(RAMX)) {
  const {
    viewBox,
    rootPaint,
    body: raw,
  } = normalize(extractSvg(path.join(REF, `${file}.tsx`)), key)
  const body = key === "nextjs" ? NEXTJS_FIX(raw) : raw
  parts.push({ key, viewBox, rootPaint, body, from: `Ramx (${file})` })
}

for (const [key, exportName] of Object.entries(SIMPLE)) {
  const icon = si[exportName]
  if (!icon) throw new Error(`simple-icons has no ${exportName}`)
  const fill = isNearBlack(icon.hex) ? "currentColor" : `#${icon.hex}`
  parts.push({
    key,
    viewBox: "0 0 24 24",
    body: `<path d="${icon.path}" fill="${fill}" />`,
    from: `simple-icons (${icon.title})`,
  })
}

for (const [file, key] of Object.entries(LOCAL)) {
  parts.push(
    fromLocalFile(key, path.join(ROOT, "src/scripts/tech-logos", `${file}.svg`))
  )
}

for (const [key, { viewBox, body }] of Object.entries(HAND)) {
  parts.push({ key, viewBox, body, from: "hand-authored" })
}

parts.sort((a, b) => a.key.localeCompare(b.key))

const header = `/**
 * Full-colour brand marks for the technology chips.
 *
 * The set is ported from Ramx's portfolio (reframix) plus simple-icons for the
 * brands his set does not carry. Each icon keeps its own viewBox, so callers
 * size them with a class rather than width/height attributes.
 *
 * Marks that are pure black in their brand guidelines are repainted with
 * currentColor so they survive a dark background.
 *
 * GENERATED by src/scripts/generate-tech-icons.mjs. Edit by hand only to
 * correct an individual mark.
 */

type TechIconProps = React.SVGProps<SVGSVGElement>

export const TechIcons = {
`

const body = parts
  .map(
    ({ key, viewBox, rootPaint = "", body, from }) => `  // ${from}
  "${key}": (props: TechIconProps) => (
    <svg viewBox="${viewBox}"${rootPaint} xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      ${body}
    </svg>
  ),`
  )
  .join("\n")

const footer = `
} as const

export type TechIconKey = keyof typeof TechIcons
`

fs.writeFileSync(
  path.join(ROOT, "src/components/tech-icons.tsx"),
  header + body + footer,
  "utf8"
)

console.log(`wrote ${parts.length} icons:`)
console.log("  " + parts.map((p) => p.key).join(", "))
