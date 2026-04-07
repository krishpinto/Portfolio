import { format } from "date-fns"

import { SITE_INFO } from "@/config/site"
import { AWARDS } from "@/features/portfolio/data/awards"
import { CERTIFICATIONS } from "@/features/portfolio/data/certifications"
import { EXPERIENCES } from "@/features/portfolio/data/experiences"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { TECH_STACK } from "@/features/portfolio/data/tech-stack"
import { USER } from "@/features/portfolio/data/user"



const aboutText = `## About

${USER.about.trim()}

### Personal Information

- First Name: ${USER.firstName}
- Last Name: ${USER.lastName}
- Display Name: ${USER.displayName}
- Location: ${USER.address}
- Website: ${USER.website}

### Social Links

${SOCIAL_LINKS.map((item) => `- [${item.title}](${item.href})`).join("\n")}

### Tech Stack

${TECH_STACK.map((item) => `- [${item.title}](${item.href})`).join("\n")}\n`

const experienceText = `## Experience

${EXPERIENCES.map((item) =>
  item.positions
    .map((position) => {
      const skills = position.skills?.map((skill) => skill).join(", ") || "N/A"
      return `### ${position.title} | ${item.companyName}\n\nDuration: ${position.employmentPeriod.start} - ${position.employmentPeriod.end || "Present"}\n\nSkills: ${skills}\n\n${position.description?.trim()}`
    })
    .join("\n\n")
).join("\n\n")}
`

const projectsText = `## Projects

${PROJECTS.map((item) => {
  const skills = `\n\nSkills: ${item.skills.join(", ")}`
  const description = item.description ? `\n\n${item.description.trim()}` : ""
  return `### ${item.title}\n\nProject URL: ${item.link}${skills}${description}`
}).join("\n\n")}
`

const awardsText = `## Awards

${AWARDS.map((item) => `### ${item.prize} | ${item.title}\n\n${item.description}`).join("\n\n")}
`

const certificationsText = `## Certifications

${CERTIFICATIONS.map((item) => `- [${item.title}](${item.credentialURL})`).join("\n")}`



async function getContent() {
  return `<SYSTEM>This document contains comprehensive information about ${USER.displayName}'s professional profile, portfolio, and projects. It includes personal details, work experience, projects, achievements, and certifications. This data is formatted for consumption by Large Language Models (LLMs) to provide accurate and up-to-date information about ${USER.displayName}'s background, skills, and expertise as a Software Engineer.</SYSTEM>

# krishpinto.co.in

> A minimal, pixel-perfect dev portfolio to showcase my work as a Software Engineer.

${aboutText}
${experienceText}
${projectsText}
${awardsText}
${certificationsText}`
}

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  return new Response(await getContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
