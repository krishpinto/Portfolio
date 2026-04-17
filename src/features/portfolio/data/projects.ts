import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
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
    skills: [
      "Node.js",
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "Tailwind CSS",
      "esbuild",
      "npm",
    ],
    description: `CLI tool for programmatic deployment of persistent, production-grade services — published to npm as a single distributable binary.
- Full-stack web dashboard built with Next.js + TypeScript, featuring live database introspection via native pg, ioredis, and mongodb drivers.
- Real-time health indicators and activity charts with Tailwind CSS + shadcn/ui + Recharts.
- Entire CLI bundled into a single binary via esbuild and published to npm.`,
    isExpanded: true,
  },
  {
    id: "widgetforge",
    title: "WidgetForge",
    period: {
      start: "11.2024",
    },
    link: "https://widgetforge.krishpinto.co.in",
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
- Foreground service persistence across device lifecycle.
- **1st Place @ Hack4Innovation VesIT** (1700+ participants)`,
  },
  {
    id: "lumeo",
    title: "Lumeo",
    period: {
      start: "09.2024",
    },
    link: "https://github.com/krishpinto",
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
  {
    id: "superpos",
    title: "SuperPOS",
    period: {
      start: "06.2024",
      end: "08.2024",
    },
    link: "https://github.com/krishpinto",
    skills: [
      "Next.js",
      "Python",
      "Cirq",
      "Plotly",
      "Quantum Computing",
    ],
    description: `Interactive quantum circuit simulation platform.
- Supports 15+ gate operations for real-time circuit construction.
- Built with Plotly, Cirq, and Next.js for a visual, interactive interface.`,
  },
  {
    id: "cardioedge",
    title: "CardioEdge",
    period: {
      start: "02.2025",
    },
    link: "https://github.com/krishpinto",
    skills: [
      "PyTorch",
      "Verilog RTL",
      "FPGA",
      "INT8 Quantization",
      "DSP48E1",
      "Vivado",
      "Artix-7",
    ],
    description: `Edge AI cardiac inference engine on FPGA — full pipeline from PyTorch to hand-coded Verilog RTL.
- Trained lightweight 1D-CNN on MIT-BIH Arrhythmia Database (87,554 samples, SMOTE-balanced to 362,355) — 98.31% accuracy across 5 arrhythmia classes.
- Quantized FP32 → INT8 (875 KB → 218 KB, 4x compression, zero accuracy loss).
- Complete inference pipeline in hand-coded Verilog RTL (no HLS): mac.v, conv1d_block.v, maxpool1d.v, relu.v, fc_output.v.
- Validated via Vivado 2025.1 XSim behavioral simulation, bit-exact hardware-software equivalence.`,
  },
]
