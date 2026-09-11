import {
  BoxIcon,
  InfinityIcon,
  LinkIcon,
  PackageIcon,
  SparklesIcon,
  TrophyIcon,
} from "lucide-react"
import Image from "next/image"

import {
  Collapsible,
  CollapsibleChevronsIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Icons } from "@/components/icons"
import { Markdown } from "@/components/markdown"
import { ProseMono } from "@/components/ui/typography"
import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import { addQueryParams } from "@/utils/url"

import type { Project } from "../../types/projects"
import { HandwrittenArrow, HandwrittenNote } from "../handwritten-note"
import { SectionLabel } from "../section-label"
import { TechRow } from "../tech-row"
import { ProjectCopyButton } from "./project-copy-button"

export function ProjectItem({
  className,
  project,
}: {
  className?: string
  project: Project
}) {
  const { start, end } = project.period
  const isOngoing = !end
  const isSinglePeriod = end === start

  return (
    <Collapsible
      className={cn("group/project relative", className)}
      defaultOpen={project.isExpanded}
    >
      {project.note && (
        <HandwrittenNote className="top-4 -left-40 hidden w-32 text-right xl:block">
          {project.note}
          <HandwrittenArrow className="mt-1 ml-auto -scale-x-100" />
        </HandwrittenNote>
      )}

      <div className="flex items-stretch hover:bg-accent-muted">
        <ProjectLogo project={project} />

        <div className="flex min-w-0 flex-1 items-center gap-2 border-l border-dashed border-line p-4 pr-2">
          <CollapsibleTrigger className="min-w-0 flex-1 text-left">
            <h3 className="flex items-center gap-2 leading-snug font-medium text-balance">
              {project.title}
              {project.isActive && (
                <span className="relative flex items-center justify-center">
                  <span className="absolute inline-flex size-3 animate-ping rounded-full bg-info opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-info" />
                  <span className="sr-only">Active Project</span>
                </span>
              )}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
              <dl className="text-sm text-muted-foreground">
                <dt className="sr-only">Period</dt>
                <dd className="flex items-center gap-0.5">
                  <span>{start}</span>
                  {!isSinglePeriod && (
                    <>
                      <span className="font-mono">—</span>
                      {isOngoing ? (
                        <>
                          <InfinityIcon className="size-4.5 translate-y-[0.5px]" />
                          <span className="sr-only">Present</span>
                        </>
                      ) : (
                        <span>{end}</span>
                      )}
                    </>
                  )}
                </dd>
              </dl>

              {project.badges?.map((badge) => (
                <ProjectBadge key={badge.label} badge={badge} />
              ))}
            </div>
          </CollapsibleTrigger>

          {project.links?.map((extraLink) => {
            const isGithub = extraLink.url.includes("github.com")
            const isNpm = extraLink.url.includes("npmjs.com")
            return (
              <Tooltip key={extraLink.url}>
                <TooltipTrigger
                  render={
                    <a
                      className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                      href={addQueryParams(extraLink.url, UTM_PARAMS)}
                      target="_blank"
                      rel="noopener"
                    >
                      {isGithub ? (
                        <Icons.github className="pointer-events-none size-4" />
                      ) : isNpm ? (
                        <PackageIcon className="pointer-events-none size-4" />
                      ) : (
                        <LinkIcon className="pointer-events-none size-4" />
                      )}
                      <span className="sr-only">{extraLink.label}</span>
                    </a>
                  }
                />
                <TooltipContent>
                  <p>{extraLink.label}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}

          {project.copyCommand ? (
            <ProjectCopyButton command={project.copyCommand} />
          ) : null}

          {project.link ? (
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                    href={addQueryParams(project.link, UTM_PARAMS)}
                    target="_blank"
                    rel="noopener"
                  >
                    <LinkIcon className="pointer-events-none size-4" />
                    <span className="sr-only">Open Project Link</span>
                  </a>
                }
              />
              <TooltipContent>
                <p>Open Project Link</p>
              </TooltipContent>
            </Tooltip>
          ) : null}

          <CollapsibleTrigger className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground [&_svg]:size-4">
            <CollapsibleChevronsIcon className="pointer-events-none" />
            <span className="sr-only">Toggle details</span>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent className="overflow-hidden">
        <div className="space-y-4 border-t border-line p-4">
          {project.description && (
            <ProseMono>
              <Markdown>{project.description}</Markdown>
            </ProseMono>
          )}

          {project.skills.length > 0 && (
            <div className="space-y-3">
              <SectionLabel>Technologies &amp; Tools</SectionLabel>
              <TechRow skills={project.skills} />
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

/**
 * With `logoColor` the logo is painted through a CSS mask, so it wears the
 * theme's muted grey and only lights up in its brand colour on hover.
 */
function ProjectLogo({ project }: { project: Project }) {
  if (!project.logo) {
    return (
      <div className="mx-4 flex size-6 shrink-0 items-center justify-center self-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-line ring-offset-1 ring-offset-background select-none">
        <BoxIcon className="size-4" />
      </div>
    )
  }

  if (project.logoColor) {
    return (
      <span
        aria-hidden
        style={
          {
            maskImage: `url("${project.logo}")`,
            WebkitMaskImage: `url("${project.logo}")`,
            "--logo-color": project.logoColor,
          } as React.CSSProperties
        }
        className="mx-4 size-6 shrink-0 self-center bg-muted-foreground [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] transition-colors duration-200 select-none group-hover/project:bg-[var(--logo-color)]"
      />
    )
  }

  return (
    <Image
      src={project.logo}
      alt={project.title}
      width={64}
      height={64}
      quality={100}
      className="mx-4 flex size-6 shrink-0 self-center grayscale transition-[filter] duration-200 select-none group-hover/project:grayscale-0"
      unoptimized
      aria-hidden
    />
  )
}

export function ProjectBadge({
  badge,
}: {
  badge: NonNullable<Project["badges"]>[number]
}) {
  const isAchievement = badge.type === "achievement"

  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center gap-1.25 rounded-full px-2 py-0.5 font-mono text-xs",
        isAchievement
          ? "bg-amber-500/10 text-amber-700 inset-ring-1 inset-ring-amber-500/50 dark:text-amber-300"
          : "bg-muted text-muted-foreground inset-ring-1 inset-ring-border"
      )}
    >
      {isAchievement ? (
        <TrophyIcon className="size-3 shrink-0" />
      ) : (
        <SparklesIcon className="size-3 shrink-0" />
      )}
      {badge.label}
    </span>
  )
}
