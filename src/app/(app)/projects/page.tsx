import type { Metadata } from "next"

import { Reveal } from "@/components/reveal"
import { Panel } from "@/features/portfolio/components/panel"
import { ProjectCaseStudy } from "@/features/portfolio/components/projects/project-case-study"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { USER } from "@/features/portfolio/data/user"

export const metadata: Metadata = {
  title: "Projects",
  description: `Things ${USER.displayName} has built — what each one does, how it works, and what it runs on.`,
  alternates: {
    canonical: "/projects",
  },
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto md:max-w-3xl **:[[id]]:scroll-mt-22">
      <Reveal immediate>
        <Panel className="px-4 py-12 sm:py-16">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Projects
          </h1>
          <p className="mt-4 max-w-md font-mono text-sm text-balance text-muted-foreground">
            What each one does, how it works, and what it runs on.
          </p>
        </Panel>
      </Reveal>

      <Panel id="projects">
        {PROJECTS.map((project, index) => (
          // The first two cards are on screen at load, so they animate on
          // paint in sequence with the title. The rest wait to be scrolled to.
          <Reveal
            key={project.id}
            immediate={index < 2}
            delay={index < 2 ? 90 * (index + 1) : 0}
          >
            <ProjectCaseStudy project={project} />
          </Reveal>
        ))}
      </Panel>
    </div>
  )
}
