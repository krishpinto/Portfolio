import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
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
    isExpanded: true,
  },
  {
    id: "artemis",
    title: "Artemis",
    period: {
      start: "03.2025",
    },
    link: "https://github.com/krishpinto",
    skills: [
      "Go",
      "Kubernetes",
      "Minikube",
      "PostgreSQL",
      "Redis",
      "MinIO",
      "Grafana",
      "Terraform",
    ],
    description: `Self-hosted Kubernetes infrastructure operator — a self-hosted alternative to Railway.
- Provisions infrastructure services (PostgreSQL, Redis, MinIO, Grafana) from declarative manifests.
- Multi-tenant service provisioning engine — developers declare desired state, Artemis reconciles it.
- Exposes stable connection string endpoints (postgresql://, redis://) ready for direct .env consumption.
- Persistent volume claim binding + pod restart survival.`,
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
]
