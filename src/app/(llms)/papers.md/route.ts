import { PAPERS } from "@/features/portfolio/data/papers"

const content = `# Research Papers

${PAPERS.map((item) => {
  const description = item.description ? `\n\n${item.description.trim()}` : ""
  return `## ${item.title}\n\nVenue: ${item.venue}\n\nPublished: ${item.date}\n\nPaper URL: ${item.url}${description}`
}).join("\n\n")}
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
