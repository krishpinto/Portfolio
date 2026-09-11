import type { TechIconKey } from "@/components/tech-icons"
import { TechIcons } from "@/components/tech-icons"

/**
 * Resolves a free-text skill label to a brand mark in `TechIcons`.
 *
 * Skill lists on experiences and projects are hand-written prose, so they never
 * line up with a registry key on their own. Every label that names a real
 * product is mapped here explicitly rather than guessed at, because a wrong
 * logo is worse than no logo.
 *
 * A label with no entry is not a bug. Things like "Leadership", "Agile" or
 * "Signal Processing" are capabilities, not products, and render as text.
 */
const SKILL_ICONS: Record<string, TechIconKey> = {
  // Languages and runtimes
  typescript: "typescript",
  javascript: "javascript",
  python: "python",
  rust: "rust",
  kotlin: "kotlin",
  "node.js": "nodejs",
  nodejs: "nodejs",
  bun: "bun",
  expo: "expo",

  // Web
  react: "react",
  "react native": "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  "tailwind css": "tailwindcss",
  tailwindcss: "tailwindcss",
  "shadcn/ui": "shadcn",
  shadcn: "shadcn",
  html: "html",
  css: "css",
  mdx: "mdx",
  "three.js": "threejs",
  threejs: "threejs",
  motion: "motion",
  bootstrap: "bootstrap",
  "socket.io": "socketio",
  "express.js": "express",
  express: "express",
  "nest.js": "nestjs",
  nestjs: "nestjs",
  esbuild: "esbuild",
  npm: "npm",

  // Data
  postgresql: "postgresql",
  postgres: "postgresql",
  mongodb: "mongodb",
  redis: "redis",
  sqlite: "sqlite",
  prisma: "prisma",
  appwrite: "appwrite",
  sanity: "sanity",

  // Platform and infrastructure
  docker: "docker",
  kubernetes: "kubernetes",
  git: "git",
  github: "github",
  vercel: "vercel",
  netlify: "netlify",
  cloudflare: "cloudflare",
  firebase: "firebase",
  tauri: "tauri",
  android: "android",
  "aws ses": "aws",
  aws: "aws",
  // QStash is Upstash's message queue and ships under the Upstash mark.
  qstash: "upstash",
  upstash: "upstash",

  // AI
  "gemini api": "gemini",
  gemini: "gemini",
  claude: "claude",
  "claude code": "claude",
  anthropic: "claude",
  mcp: "mcp",
  n8n: "n8n",
  langchain: "langchain",
  langgraph: "langgraph",
  ollama: "ollama",
  pytorch: "pytorch",
  tensorflow: "tensorflow",
  "tensorflow lite": "tensorflow",
  "hugging face": "huggingface",
  // candle is Hugging Face's Rust ML framework, so it carries their mark.
  candle: "huggingface",

  // Microsoft. Power Platform and SharePoint each have their own mark now;
  // only Microsoft 365 falls back to the four-square corporate logo.
  "microsoft 365": "microsoft",
  microsoft: "microsoft",
  "power apps": "powerapps",
  powerapps: "powerapps",
  "power automate": "powerautomate",
  "power automate desktop": "powerautomate",
  "power bi": "powerbi",
  powerbi: "powerbi",
  sharepoint: "sharepoint",
  "sharepoint online": "sharepoint",
  ".net": "dotnet",

  // Design and tooling
  figma: "figma",
  postman: "postman",
}

/**
 * Returns the icon key, not the component. Callers index `TechIcons`
 * themselves so a component is never produced by a function call during render.
 */
export function getTechIconKey(skill: string): TechIconKey | null {
  const key = SKILL_ICONS[skill.trim().toLowerCase()]
  return key && key in TechIcons ? key : null
}
