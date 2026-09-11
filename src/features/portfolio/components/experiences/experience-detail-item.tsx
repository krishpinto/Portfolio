import { ArrowUpRightIcon } from "lucide-react"

import { Markdown } from "@/components/markdown"
import { ProseMono } from "@/components/ui/typography"
import { UTM_PARAMS } from "@/config/site"
import { addQueryParams } from "@/utils/url"

import type { Experience, ExperiencePosition } from "../../types/experiences"
import { SectionLabel } from "../section-label"
import { TechRow } from "../tech-row"
import { CompanyLogo } from "./company-logo"

/**
 * The long-form experience card used on /work, laid out the way Ramx lays his
 * out: who and what on the left, when and where right-aligned opposite it,
 * then the tools, then the work itself under its own heading.
 *
 * Nothing here collapses. This is the page people open when they want detail.
 *
 * The one departure from his card is nesting. He has a single role per entry,
 * while this data models several roles at one company, so the company heads
 * the card once and each role hangs off a rail underneath it.
 */
export function ExperienceDetailItem({
  experience,
}: {
  experience: Experience
}) {
  const location = [experience.location, experience.locationType]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      id={`experience-${experience.id}`}
      className="group/experience screen-line-bottom scroll-mt-14 space-y-5 px-4 py-6"
    >
      <header className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <CompanyLogo className="size-11" experience={experience} />

          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <h2 className="text-lg font-bold">
              {experience.companyWebsite ? (
                <a
                  className="inline-flex items-center gap-1 transition-colors ease-out hover:text-muted-foreground"
                  href={addQueryParams(experience.companyWebsite, UTM_PARAMS)}
                  target="_blank"
                  rel="noopener"
                >
                  {experience.companyName}
                  <ArrowUpRightIcon className="size-3.5 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-[opacity,translate] ease-out group-hover/experience:translate-x-0 group-hover/experience:opacity-100" />
                </a>
              ) : (
                experience.companyName
              )}
            </h2>

            {experience.isCurrentEmployer && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-success/10 px-2 py-1 font-mono text-xs text-success inset-ring-1 inset-ring-success/40">
                <span className="size-2 animate-pulse rounded-full bg-success" />
                Working
              </span>
            )}
          </div>
        </div>

        {location && (
          <p className="shrink-0 text-sm text-muted-foreground sm:text-right">
            {location}
          </p>
        )}
      </header>

      <div className="space-y-8 border-l border-dashed border-line pl-4">
        {experience.positions.map((position) => (
          <PositionDetail key={position.id} position={position} />
        ))}
      </div>
    </article>
  )
}

function PositionDetail({ position }: { position: ExperiencePosition }) {
  const { start, end } = position.employmentPeriod

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-x-3 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-medium">{position.title}</h3>

        <p className="shrink-0 font-mono text-sm text-muted-foreground">
          {start} &ndash; {end ?? "Present"}
        </p>
      </div>

      {position.employmentType && (
        <p className="-mt-2 font-mono text-xs tracking-wide text-muted-foreground uppercase">
          {position.employmentType}
        </p>
      )}

      {position.skills && position.skills.length > 0 && (
        <div className="space-y-3">
          <SectionLabel>Technologies &amp; Tools</SectionLabel>
          <TechRow skills={position.skills} />
        </div>
      )}

      {position.description && (
        <div className="space-y-3">
          <SectionLabel>What I&rsquo;ve done</SectionLabel>
          <ProseMono>
            <Markdown>{position.description}</Markdown>
          </ProseMono>
        </div>
      )}
    </section>
  )
}
