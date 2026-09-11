import type { Metadata } from "next"

import { ExperienceDetails } from "@/features/portfolio/components/experiences/experience-details"
import { Panel } from "@/features/portfolio/components/panel"
import { USER } from "@/features/portfolio/data/user"

export const metadata: Metadata = {
  title: "Work",
  description: `The roles ${USER.displayName} has held and what he shipped in each.`,
  alternates: {
    canonical: "/work",
  },
}

export default function WorkPage() {
  return (
    <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
      {/* Not a Panel header. That stacks four rules inside 80px, which read as
          a pile of lines rather than a title. This is one bordered block with
          room to breathe, and the section below supplies the next rule. */}
      <Panel className="px-4 py-12 sm:py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Work
        </h1>
        <p className="mt-4 max-w-md font-mono text-sm text-balance text-muted-foreground">
          The roles I&apos;ve held, the teams I built with, and what shipped.
        </p>
      </Panel>

      <ExperienceDetails />
    </div>
  )
}
