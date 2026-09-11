import { InfinityIcon, LinkIcon, PackageIcon } from "lucide-react"
import Image from "next/image"

import { Icons } from "@/components/icons"
import { Markdown } from "@/components/markdown"
import { ProseMono } from "@/components/ui/typography"
import { UTM_PARAMS } from "@/config/site"
import { addQueryParams } from "@/utils/url"

import type { Project } from "../../types/projects"
import { SectionLabel } from "../section-label"
import { TechRow } from "../tech-row"
import { ProjectCopyButton } from "./project-copy-button"
import { ProjectBadge } from "./project-item"

/**
 * The full-width case-study card used on /projects: cover on top, then the
 * title, the write-up and the stack. Nothing collapses here — the home page
 * already has the scannable version, so this one stays open and reads long.
 */
export function ProjectCaseStudy({ project }: { project: Project }) {
  const { start, end } = project.period
  const isOngoing = !end
  const isSinglePeriod = end === start

  return (
    <article className="group/project screen-line-bottom">
      <ProjectCover project={project} />

      <div className="space-y-5 p-4 pt-5">
        <div className="space-y-2">
          <h2 className="flex items-center gap-2 text-xl leading-snug font-semibold tracking-tight text-balance">
            {project.title}
            {project.isActive && (
              <span className="relative flex items-center justify-center">
                <span className="absolute inline-flex size-3 animate-ping rounded-full bg-info opacity-50" />
                <span className="relative inline-flex size-2 rounded-full bg-info" />
                <span className="sr-only">Active Project</span>
              </span>
            )}
          </h2>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
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
        </div>

        {project.description && (
          <ProseMono>
            <Markdown>{project.description}</Markdown>
          </ProseMono>
        )}

        {project.copyCommand && <CommandBlock command={project.copyCommand} />}

        <ProjectLinks project={project} />

        {project.skills.length > 0 && (
          <div className="space-y-3">
            <SectionLabel>Technologies &amp; Tools</SectionLabel>
            <TechRow skills={project.skills} />
          </div>
        )}
      </div>
    </article>
  )
}

/**
 * Shown on every poster until real screenshots exist. It names the preview as
 * the thing that is pending, not the project: LetterStack is live and carries
 * a "Live Clients" badge, so a bare "Coming soon" would contradict it.
 */
const PREVIEW_PENDING_BADGE = {
  label: "Preview coming soon",
  type: "soon",
} as const

/**
 * A real screenshot when `cover` is set. Otherwise a poster built from the
 * project's own logo and brand colour over the site's hatch pattern — an empty
 * grey rectangle would read as a broken image, this reads as a choice.
 *
 * The poster does not repeat the title, which the heading directly below it
 * already carries. It says what is missing instead.
 */
function ProjectCover({ project }: { project: Project }) {
  const brand = project.logoColor

  return (
    <div className="screen-line-bottom relative flex aspect-video items-center justify-center overflow-hidden bg-muted/30">
      {project.cover ? (
        <Image
          src={project.cover}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover object-top transition-[scale] duration-500 ease-out group-hover/project:scale-[1.02]"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-line)]/56" />

          {brand && (
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(60% 60% at 50% 50%, ${brand}33, transparent 70%)`,
              }}
            />
          )}

          <div className="relative flex flex-col items-center gap-3">
            {project.logo && <ProjectPosterLogo project={project} />}
            <ProjectBadge badge={PREVIEW_PENDING_BADGE} />
          </div>
        </>
      )}
    </div>
  )
}

function ProjectPosterLogo({ project }: { project: Project }) {
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
        className="relative size-16 bg-muted-foreground [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] transition-colors duration-300 select-none group-hover/project:bg-[var(--logo-color)]"
      />
    )
  }

  return (
    <Image
      src={project.logo!}
      alt=""
      width={128}
      height={128}
      quality={100}
      unoptimized
      aria-hidden
      className="relative size-16 grayscale transition-[filter] duration-300 select-none group-hover/project:grayscale-0"
    />
  )
}

/** Shell-style block so an install command can be read and copied in one go. */
function CommandBlock({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-muted/40 py-2 pr-2 pl-3">
      <span className="font-mono text-sm text-muted-foreground select-none">
        $
      </span>
      <code className="min-w-0 flex-1 truncate font-mono text-sm">
        {command}
      </code>
      <ProjectCopyButton command={command} />
    </div>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  const links = [
    ...(project.link ? [{ label: "Visit site", url: project.link }] : []),
    ...(project.links ?? []),
  ]

  if (links.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map(({ label, url }) => {
        const isGithub = url.includes("github.com")
        const isNpm = url.includes("npmjs.com")

        return (
          <a
            key={url}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent-muted hover:text-foreground"
            href={addQueryParams(url, UTM_PARAMS)}
            target="_blank"
            rel="noopener"
          >
            {isGithub ? (
              <Icons.github className="size-3.5" />
            ) : isNpm ? (
              <PackageIcon className="size-3.5" />
            ) : (
              <LinkIcon className="size-3.5" />
            )}
            {label}
          </a>
        )
      })}
    </div>
  )
}
