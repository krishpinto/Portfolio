PERSONAL

Name: Krish Nilesh Pinto
Role: Full-Stack Engineer • AI Engineer
Phone: +91 9324810880
Email: krishpinto123@gmail.com
LinkedIn: linkedin.com/in/krish-pinto
GitHub: github.com/krishpinto
Location: Mumbai, Maharashtra
Education: B.Tech Computer Engineering, FCRIT (Fr. Conceicao Rodrigues Institute of Technology), Mumbai University — 8.9 CGPI


EXPERIENCE
BOBST India Pvt Ltd — Software Engineering Intern (On-Site)
June 2025 – August 2025

Built enterprise issue-management system using Power Apps, Power Automate, Power BI — digitized manual workflows across 500+ employee branch
Integrated Outlook-based ticket pipelines with escalation tracking, cut manual follow-ups by ~60%
Built Power BI dashboards for issue trends and response metrics, reduced manual reporting by ~4 hrs/week

SVIK Infotech — Junior Software Engineer (Hybrid)
Sep 2024 – Present

Contributed to enterprise project management platform using React, .NET, PostgreSQL — supporting 5+ concurrent dev teams
Implemented Kanban boards, role-based team management, workflow tracking
Built backend APIs for context-aware project monitoring, reduced query response time by ~40%

Research Intern — Predictive Maintenance Systems
Sep 2024 – Present

Developing predictive maintenance system for rotary industrial machinery
Analyzing sensor and operational data to detect early component failure indicators


PROJECTS
Sentinel — On-Device Android Scam Detection System

Custom Android launcher with system-level call interception and real-time on-device ML inference
No cloud dependency, sub-200ms detection latency
Hybrid React Native + Kotlin architecture using Android's native telephony APIs
Foreground service persistence across device lifecycle
Won 1st Place @ Hack4Innovation VesIT (1700+ participants) and 30 Hard Academy hackathon (1600+ participants)

Artemis — Self-Hosted Infrastructure Operator (Ongoing)

Kubernetes operator + developer dashboard that provisions infrastructure services (PostgreSQL, Redis, MinIO, Grafana) from declarative manifests
Multi-tenant service provisioning engine — developers declare desired state, Artemis reconciles it
Exposes stable connection string endpoints (postgresql://, redis://) ready for direct .env consumption
Persistent volume claim binding + pod restart survival
Tech: Kubernetes, Minikube, Go operator pattern, PostgreSQL, Redis, MinIO, Grafana
Vision: self-hosted Railway — bring your own cluster, provision any service stack in one kubectl apply

CardioEdge — Edge AI Cardiac Inference Engine on FPGA (Ongoing)

Trained lightweight 1D-CNN on MIT-BIH Arrhythmia Database (87,554 samples, SMOTE-balanced to 362,355) — 98.31% accuracy across 5 arrhythmia classes using PyTorch
Quantized FP32 → INT8 (875 KB → 218 KB, 4x compression, zero accuracy loss), weights baked directly as RTL constants into Verilog — no BRAM/DRAM required
Complete inference pipeline in hand-coded Verilog RTL (no HLS): mac.v, conv1d_block.v, maxpool1d.v, relu.v, fc_output.v, ecg_inference_top.v
Validated via Vivado 2025.1 XSim behavioral simulation, bit-exact hardware-software equivalence
Hardware: FPGA Artix-7, DSP48E1

WidgetForge — Multi-Tenant AI Bot Runtime

BYOK chatbot platform with dynamic LLM model discovery
Per-bot isolated vector memory namespaces — multi-tenant RAG across independent bot identities on shared inference runtime
JWT-scoped bot identity architecture with isolated Qdrant vector namespaces — prevents cross-tenant context leakage
Shadow DOM-isolated embeddable widget via CDN-distributed script tag
Serving 100+ embed configurations with zero style bleed into host pages
Tech: Next.js, Node.js, Qdrant, JWT, Shadow DOM, streaming inference, RAG pipeline
Deployed at: widgetforge.krishpinto.co.in

Lumeo — AI Event Planning Assistant

AI-powered event planning platform using Next.js, Gemini API, Firebase
LLM-driven workflow generation converting event inputs into structured planning timelines
~70% reduction in manual planning time, ~99.5% uptime via Firebase + Cloudflare

SuperPOS — Quantum Circuit Simulation Platform

Interactive quantum circuit simulator using Plotly, Cirq, Next.js
Supports 15+ gate operations for real-time circuit construction


SKILLS

Languages: C, C++, Python, JavaScript, TypeScript, Bash
Frameworks: React, Next.js, Node.js, Express.js, Django, FastAPI, .NET, React Native
Databases: PostgreSQL, MySQL, MongoDB, Firebase, Supabase, Redis
Frontend: Tailwind CSS, ShadCN UI, Material UI, Figma
AI/ML: PyTorch, TensorFlow.js, LangChain, Generative AI
DevOps: Docker, Git, Linux, CI/CD, AWS, Vercel, Netlify
Cloud: AWS (EC2, S3, Lambda, RDS, CloudWatch), GCP, Vercel, Netlify, Kubernetes, Terraform
Hardware: FPGA (Artix-7), INT8 Quantization, DSP48E1, RTL Design


ACHIEVEMENTS & LEADERSHIP

Hack4Innovation @ VesIT — 1st Place | 1700+ participants
Sparkathon, Innovex — Ideathon Winner
30 Hard Academy Hackathon — 1st Place | 1600+ participants
Vice Chairperson — AIDL Club, FCRIT
Co-organized HackQuinox 2.0 — 800+ participants, mentored 300+ students
Co-authored research paper on AI-assisted clinical reasoning — 1st Place, poster competition, Delhi
NSS Volunteer