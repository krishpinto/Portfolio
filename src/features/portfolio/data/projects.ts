import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "letterstack",
    title: "LetterStack",
    period: {
      start: "05.2026",
    },
    link: "https://github.com/krishpinto/letterstack",
    links: [
      { label: "GitHub", url: "https://github.com/krishpinto/letterstack" },
    ],
    skills: [
      "Next.js",
      "TypeScript",
      "AWS SES",
      "QStash",
      "PostgreSQL",
      "Node.js",
      "React",
    ],
    description: `Email campaign platform with a paying client — full pipeline from block editor to inbox.
- Block editor → email-safe HTML renderer with a pixel-accurate preview before send.
- SES fan-out send pipeline: QStash-queued, idempotent workers, suppression-loop handling for bounces and complaints.
- 3,000-recipient campaigns dispatched in ~4 minutes.`,
    badges: [
      { label: "Live Client", type: "achievement" },
    ],
    isExpanded: true,
    isActive: true,
  },
  {
    id: "engram",
    title: "Engram",
    period: {
      start: "06.2026",
    },
    link: "https://github.com/krishpinto/engram",
    links: [
      { label: "GitHub", url: "https://github.com/krishpinto/engram" },
    ],
    skills: [
      "Rust",
      "Tauri",
      "React",
      "TypeScript",
      "SQLite",
      "candle",
      "three.js",
      "MCP",
    ],
    description: `Passive, local, zero-API memory for AI coding agents — with a 3D desktop app to visualise it.
- Watches Claude Code transcripts and extracts meaningful moments (decisions, file changes, error fixes) — the agent never participates in the write path.
- On-device semantic embeddings via candle (all-MiniLM-L6-v2, 384-dim) — no cloud, no API keys, ever.
- Hybrid search: BM25 keyword + cosine semantic, fused with Reciprocal Rank Fusion.
- 3D memory graph (react-force-graph-3d + three.js) — orbit, zoom, and fly through a project's decision history.
- Secret redaction before storage; dual persistence to SQLite + human-readable Markdown.
- Ships an MCP server so any MCP-capable agent can recall memory automatically.`,
    isExpanded: true,
    isActive: true,
  },
  {
    id: "artemis-cli",
    title: "Artemis CLI",
    period: {
      start: "04.2025",
    },
    link: "https://github.com/krishpinto/artemis-cli",
    links: [
      { label: "GitHub", url: "https://github.com/krishpinto/artemis-cli" },
      { label: "npm", url: "https://www.npmjs.com/package/artemis-cli" },
    ],
    copyCommand: "npx artemis-cli",
    badges: [
      { label: "1,500+ downloads on npm", type: "achievement" },
      { label: "Artemis Cloud — Coming Soon", type: "soon" },
    ],
    skills: [
      "Node.js",
      "TypeScript",
      "Kubernetes",
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "Next.js",
      "esbuild",
      "npm",
    ],
    description: `One command replaces your entire dev infrastructure setup — Artemis provisions persistent, production-grade database clusters locally so your environment matches prod from day one.
- Kubernetes-native operator: spins up PostgreSQL, Redis, and MongoDB clusters from declarative manifests, managing persistent volume claims, pod lifecycle, and stable connection endpoints across restarts.
- Full-stack web dashboard (Next.js + TypeScript) with live database introspection via native drivers — real-time health indicators, connection strings ready for direct .env consumption.
- Ships as a single distributable binary via esbuild, published to npm.`,
    isExpanded: true,
  },
  {
    id: "widgetforge",
    title: "WidgetForge",
    period: {
      start: "11.2024",
    },
    link: "https://widgetforge.krishpinto.co.in",
    links: [
      { label: "GitHub", url: "https://github.com/krishpinto/WidgetForge" },
    ],
    skills: [
      "Next.js",
      "Node.js",
      "Qdrant",
      "JWT",
      "Shadow DOM",
      "RAG",
      "Streaming Inference",
    ],
    description: `Multi-tenant AI bot runtime with BYOK (Bring Your Own Key) model support.
- BYOK chatbot platform with dynamic LLM model discovery.
- Per-bot isolated vector memory namespaces — multi-tenant RAG across independent bot identities.
- JWT-scoped bot identity architecture with isolated Qdrant vector namespaces.
- Shadow DOM-isolated embeddable widget via CDN-distributed script tag.
- Serving 100+ embed configurations with zero style bleed into host pages.`,
  },
  {
    id: "sentinel",
    title: "Sentinel",
    period: {
      start: "01.2025",
    },
    link: "https://github.com/krishpinto/Sentinel",
    skills: [
      "React Native",
      "Kotlin",
      "Android",
      "On-Device ML",
      "Telephony APIs",
      "Foreground Services",
    ],
    description: `On-device Android scam detection system with real-time ML inference and system-level call interception.
- Custom Android launcher with system-level call interception and real-time on-device ML inference.
- No cloud dependency, sub-200ms detection latency.
- Hybrid React Native + Kotlin architecture using Android's native telephony APIs.
- Foreground service persistence across device lifecycle.`,
    badges: [
      { label: "1st Place @ Hack4Innovation VesIT — 1,700+ participants", type: "achievement" },
    ],
  },
  {
    id: "lumeo",
    title: "Lumeo",
    period: {
      start: "09.2024",
    },
    link: "https://lumeo.krishpinto.co.in/",
    links: [
      { label: "GitHub", url: "https://github.com/krishpinto/Lumeo" },
    ],
    skills: [
      "Next.js",
      "Gemini API",
      "Firebase",
      "Cloudflare",
      "LLM",
    ],
    description: `AI-powered event planning platform with LLM-driven workflow generation.
- LLM-driven workflow generation converting event inputs into structured planning timelines.
- ~70% reduction in manual planning time.
- ~99.5% uptime via Firebase + Cloudflare.`,
  },
]
