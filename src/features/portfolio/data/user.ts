import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Krish",
  lastName: "Pinto",
  displayName: "Krish Pinto",
  username: "krishpinto",
  gender: "male",
  pronouns: "he/him",
  bio: "Full-Stack & AI Engineer. Building things that matter.",
  flipSentences: [
    "Ships fast. Breaks things. Fixes them faster.",
    "AI does the work. I take the credit.",
    "Turns coffee and context windows into products.",
  ],
  address: "Mumbai, Maharashtra, India",
  phoneNumber: "KzkzMjQ4MTA4ODA=", // +91 9324810880 in E.164, base64 encoded
  email: "a3Jpc2hwaW50bzEyM0BnbWFpbC5jb20=", // krishpinto123@gmail.com base64 encoded
  website: "https://krishpinto.co.in",
  jobTitle: "Full-Stack Engineer • AI Engineer",
  jobs: [
    {
      title: "Junior Software Engineer",
      company: "SVIK Infotech",
      website: "https://svikinfotech.com",
      experienceId: "svik",
    },
    {
      title: "Software Engineering Intern",
      company: "BOBST India",
      website: "https://www.bobst.com",
      experienceId: "bobst",
    },
  ],
  about: `
- **Full-Stack & AI Engineer** with hands-on experience building enterprise platforms, on-device ML systems, and cloud-native infrastructure.
- Skilled in **React**, **Next.js**, **TypeScript**, **Python**, **Go**, and modern full-stack & AI/ML technologies; building high-quality, production-grade applications.
- Passionate about low-level systems, edge inference, and developer tooling — turning ambitious ideas into polished, working products.
- Creator of [Sentinel](https://github.com/krishpinto/Sentinel): on-device Android scam detection system with sub-200ms ML inference latency, no cloud dependency
  - 1st Place — Hack4Innovation @ VesIT (1700+ participants)*
- Vice Chairperson — AIDL Club, FCRIT | Co-organized [HackQuinox 2.0](https://github.com/krishpinto) (800+ participants, mentored 300+ students)

<p class="text-muted-foreground">* Peak metrics recorded; actual current figures may vary.</p>
`,
  avatar: "/krish.png",
  ogImage: "https://krishpinto.co.in/og.png",
  namePronunciationUrl: undefined,
  timeZone: "Asia/Kolkata",
  keywords: [
    "krishpinto",
    "krish pinto",
    "krish nilesh pinto",
    "krish",
    "pinto",
    "fullstack engineer",
    "ai engineer",
    "mumbai developer",
    "fcrit",
  ],
  dateCreated: "2025-01-01",
}
