import {
  CodeXmlIcon,
  GraduationCapIcon,
  LightbulbIcon,
  BriefcaseIcon,
} from "lucide-react"

import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
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
    isCurrentEmployer: true,
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
        description: `- Built enterprise issue-management system using Power Apps, Power Automate, Power BI — digitized manual workflows across 500+ employee branch.
- Integrated Outlook-based ticket pipelines with escalation tracking, cut manual follow-ups by ~60%.
- Built Power BI dashboards for issue trends and response metrics, reduced manual reporting by ~4 hrs/week.`,
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
        },
        employmentType: "Part-time",
        icon: <LightbulbIcon />,
        description: `- Developing predictive maintenance system for rotary industrial machinery.
- Analyzing sensor and operational data to detect early component failure indicators.`,
        skills: [
          "Python",
          "PyTorch",
          "Signal Processing",
          "Predictive Analytics",
          "Research",
        ],
      },
    ],
    isCurrentEmployer: true,
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
