import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { TechIcons } from "@/components/tech-icons"
import { cn } from "@/lib/utils"

import { getTechIconKey } from "../utils/tech-icon"

/**
 * The technology row on an experience or a project.
 *
 * This is Ramx's tile: a dashed square with an inset highlight, holding the
 * brand mark on its own and naming it in a tooltip. Everything sits on the
 * same 32px grid so a row of eight tools reads as a row rather than a
 * paragraph of chips at three different widths.
 *
 * Labels that are capabilities rather than products keep their text in the
 * same tile, because there is no honest logo for "Leadership" and dropping
 * them would lose the only description of that work. Logos come first so the
 * row has a consistent shape from card to card.
 */
export function TechRow({
  skills,
  className,
}: {
  skills: string[]
  className?: string
}) {
  const marks: { skill: string; key: NonNullable<TechKey> }[] = []
  const words: string[] = []

  for (const skill of skills) {
    const key = getTechIconKey(skill)
    if (key) marks.push({ skill, key })
    else words.push(skill)
  }

  if (marks.length === 0 && words.length === 0) return null

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {marks.map(({ skill, key }) => {
        const Icon = TechIcons[key]

        return (
          <li key={skill} className="flex">
            <Tooltip>
              <TooltipTrigger
                className="flex size-8 items-center justify-center skill-tile text-foreground transition-transform duration-200 ease-out hover:scale-110 focus-visible:scale-110 focus-visible:outline-none"
                render={
                  <span tabIndex={0}>
                    <Icon className="size-4.5" />
                    <span className="sr-only">{skill}</span>
                  </span>
                }
              />
              <TooltipContent>
                <p>{skill}</p>
              </TooltipContent>
            </Tooltip>
          </li>
        )
      })}

      {words.map((skill) => (
        <li key={skill} className="flex">
          <span className="flex h-8 items-center skill-tile px-2.5 font-mono text-xs text-foreground">
            {skill}
          </span>
        </li>
      ))}
    </ul>
  )
}

type TechKey = ReturnType<typeof getTechIconKey>
