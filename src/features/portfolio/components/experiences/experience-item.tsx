import { ArrowUpRightIcon } from "lucide-react"

import { UTM_PARAMS } from "@/config/site"
import { addQueryParams } from "@/utils/url"

import type { Experience } from "../../types/experiences"
import { ExperiencePositionItem } from "./experience-position-item"

export function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <div
      id={`experience-${experience.id}`}
      className="group/experience screen-line-bottom scroll-mt-14 space-y-4 py-4"
    >
      <div className="flex items-start gap-3 sm:items-center">
        <div className="flex size-6 shrink-0 items-center justify-center select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-5">
          {/* `companyLogo` is deliberately not used here. These are wide
              wordmarks, and this slot is a 24px square that every row shares so
              the company names line up. Squeezing a 4:1 mark into it turns it
              into a smudge. The logos get their room on /work instead. */}
          {experience.companyIcon ?? (
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-x-3 gap-y-1 pr-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-xl/6 font-medium">
            {experience.companyWebsite ? (
              <a
                className="inline-flex items-center gap-1 decoration-transparent transition-colors ease-out hover:text-muted-foreground"
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
          </h3>

          <dl className="flex min-w-0 items-center gap-1.5 text-sm whitespace-nowrap text-muted-foreground">
            {experience.location && (
              <>
                <dt className="sr-only">Location</dt>
                <dd className="truncate">{experience.location}</dd>
              </>
            )}

            {experience.locationType && (
              <>
                <dt className="sr-only">Location type</dt>
                <dd>({experience.locationType})</dd>
              </>
            )}

            {experience.isCurrentEmployer && (
              <>
                <dt className="sr-only">Employment status</dt>
                <dd>
                  <span className="sr-only">Current</span>
                  <span className="relative flex size-2.5 translate-x-px translate-y-px items-center justify-center">
                    <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-info opacity-50" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-info" />
                  </span>
                </dd>
              </>
            )}
          </dl>
        </div>
      </div>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  )
}
