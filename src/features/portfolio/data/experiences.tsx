import {
  CodeXmlIcon,
  GraduationCapIcon,
  LightbulbIcon,
  BriefcaseIcon,
} from "lucide-react"

import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "infinity-pool",
    companyName: "Infinity Pool",
    positions: [
      {
        id: "1",
        title: "Software Engineering Intern",
        employmentPeriod: {
          start: "07.2026",
        },
        employmentType: "Full-time",
        icon: <BriefcaseIcon />,
        description: `- BE3 — Business Function Agentic Workflows (fintech).
- Details to follow.`,
        skills: [
          "Agentic Workflows",
          "AI",
          "Fintech",
          "TypeScript",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "svik",
    companyName: "SVIK Infotech",
    companyWebsite: "https://svikinfotech.com",
    positions: [
      {
        id: "1",
        title: "Junior Software Engineer",
        employmentPeriod: {
          start: "09.2024",
          end: "06.2026",
        },
        employmentType: "Hybrid",
        icon: <CodeXmlIcon />,
        description: `- Contributed to an enterprise project management platform using React, .NET, PostgreSQL — supporting 5+ concurrent dev teams.
- Implemented Kanban boards, role-based team management, and workflow tracking.
- Built backend APIs for context-aware project monitoring, reduced query response time by ~40%.`,
        skills: [
          "React",
          ".NET",
          "PostgreSQL",
          "TypeScript",
          "Kanban",
          "REST APIs",
          "Agile",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "bobst",
    companyName: "BOBST India Pvt Ltd",
    companyWebsite: "https://www.bobst.com",
    positions: [
      {
        id: "1",
        title: "Software Engineering Intern",
        employmentPeriod: {
          start: "06.2025",
          end: "08.2025",
        },
        employmentType: "On-Site",
        icon: <BriefcaseIcon />,
        description: `- Built an enterprise issue-management system (Power Apps, Power Automate, Power BI) digitizing manual workflows across a 500+ employee branch.
- Integrated Outlook-based ticket pipelines with escalation tracking, cutting manual follow-ups ~60%.
- Built Power BI dashboards for issue trends and response metrics, saving ~4 hrs/week of manual reporting.`,
        skills: [
          "Power Apps",
          "Power Automate",
          "Power BI",
          "Microsoft 365",
          "Process Automation",
        ],
      },
    ],
  },
  {
    id: "research",
    companyName: "Research — Predictive Maintenance",
    positions: [
      {
        id: "1",
        title: "Research Intern",
        employmentPeriod: {
          start: "09.2024",
          end: "04.2026",
        },
        employmentType: "Part-time",
        icon: <LightbulbIcon />,
        description: `- Developed a predictive maintenance system for rotary industrial machinery, analyzing sensor and operational data to detect early failure indicators (in-house internship, FCRIT).`,
        skills: [
          "Python",
          "PyTorch",
          "Signal Processing",
          "Predictive Analytics",
          "Research",
        ],
      },
    ],
  },
  {
    id: "education",
    companyName: "Education",
    positions: [
      {
        id: "1",
        title: "FCRIT — Fr. Conceicao Rodrigues Institute of Technology",
        employmentPeriod: {
          start: "2022",
          end: "2026",
        },
        icon: <GraduationCapIcon />,
        description: `- B.Tech in Computer Engineering, Mumbai University — 8.9 CGPI.
- Vice Chairperson — AIDL (AI & Deep Learning) Club.
- Co-organized HackQuinox 2.0 — 800+ participants, mentored 300+ students.
- Co-authored research paper on AI-assisted clinical reasoning — 1st Place, poster competition, Delhi.
- NSS Volunteer.`,
        skills: [
          "Computer Engineering",
          "AI/ML",
          "Leadership",
          "Event Management",
          "Research",
        ],
        isExpanded: true,
      },
    ],
  },
]
