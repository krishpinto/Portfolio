import { SITE_INFO } from "@/config/site"
import { PAPERS } from "@/features/portfolio/data/papers"
import { USER } from "@/features/portfolio/data/user"

const currentRoles = USER.jobs
  .map((job) => `${job.title} at ${job.company}`)
  .join("; ")

const venues = [...new Set(PAPERS.map((paper) => paper.venue))].join(", ")

const content = `# ${USER.displayName}

> ${USER.bio} Based in ${USER.address}. Portfolio and professional profile at ${SITE_INFO.url}.

${USER.displayName} (${USER.pronouns}) builds enterprise platforms, on-device ML systems, cloud-native infrastructure, and developer tooling. This site documents his roles, shipped projects, peer-reviewed research, awards, and working tech stack. Every section is also served as plain Markdown at the links below, so no HTML parsing is needed.

## Facts

- Name: ${USER.displayName}
- Title: ${USER.jobTitle}
- Location: ${USER.address} (${USER.timeZone})
- Current roles: ${currentRoles}
- Website: ${USER.website}
- Peer-reviewed papers: ${PAPERS.length} (${venues})

## Profile

- [About](${SITE_INFO.url}/about.md): Background, tech stack, and where to find him elsewhere.
- [Experience](${SITE_INFO.url}/experience.md): Every role with dates, skills, and what shipped.
- [Projects](${SITE_INFO.url}/projects.md): Selected projects, each with its link and stack.
- [Research Papers](${SITE_INFO.url}/papers.md): Publications with venue, date, and direct link.
- [Awards](${SITE_INFO.url}/awards.md): Hackathon placements and honours.
- [Certifications](${SITE_INFO.url}/certifications.md): Credentials with verification links.

## Pages

- [Home](${SITE_INFO.url}/): Profile, experience, projects, papers, and tech stack on one page.
- [Work](${SITE_INFO.url}/work): Every role with dates, skills, and what shipped.
- [Projects](${SITE_INFO.url}/projects): Each project written up with its stack and links.
- [Resume](${SITE_INFO.url}/resume): Résumé PDF and competition certificates.

## Optional

- [llms-full.txt](${SITE_INFO.url}/llms-full.txt): Everything above concatenated into one document.
`

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
