"use client"

import {
  ArrowUpRightIcon,
  CodeXmlIcon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  MarsIcon,
} from "lucide-react"

import { Icons } from "@/components/icons"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"
import { useIsClient } from "@/hooks/use-is-client"
import { decodeEmail } from "@/utils/string"
import { urlToName } from "@/utils/url"

/**
 * Throwaway. Three shapes for the contact block, so they can be compared on one
 * page instead of described. Delete this folder and the /lab route once one
 * wins. The hero question is already settled.
 */

/* ── Contact variations ──────────────────────────────────────────────────── */

function Row({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2.5 font-mono text-sm [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-muted-foreground">
      {icon}
      <span className="min-w-0 truncate">{children}</span>
    </div>
  )
}

/** The grid that is there now, on tighter rows and without the icon tiles. */
export function ContactTight() {
  const email = useEmail()

  return (
    <section className="screen-line-bottom border-x border-line px-4 py-5">
      <div className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {USER.jobs.map((job) => (
          <Row key={job.company} icon={<CodeXmlIcon />}>
            {job.title}{" "}
            <span className="text-muted-foreground">@{job.company}</span>
          </Row>
        ))}
        <Row icon={<MapPinIcon />}>{USER.address}</Row>
        <Row icon={<LinkIcon />}>{urlToName(USER.website)}</Row>
        <Row icon={<MarsIcon />}>{USER.pronouns}</Row>
        <Row icon={<MailIcon />}>{email}</Row>
      </div>
    </section>
  )
}

/** One column of arrow-prefixed lines, the shape Ethan uses. */
export function ContactArrows() {
  const email = useEmail()
  const lines = [
    [USER.jobTitle, null],
    [`${USER.jobs[0].title} @ ${USER.jobs[0].company}`, null],
    [USER.address, null],
    [urlToName(USER.website), USER.website],
    [email, `mailto:${email}`],
    [USER.pronouns, null],
  ] as const

  return (
    <section className="screen-line-bottom border-x border-line px-4 py-5">
      <ul className="space-y-2">
        {lines.map(([label, href]) => (
          <li key={label} className="flex items-center gap-2.5 text-sm">
            <ArrowUpRightIcon className="size-3.5 shrink-0 rotate-45 text-muted-foreground/60" />
            {href ? (
              <a
                className="font-mono underline-offset-4 hover:underline"
                href={href}
              >
                {label}
              </a>
            ) : (
              <span className="font-mono text-muted-foreground">{label}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Everything as chips in one wrapped row. The most compact of the three. */
export function ContactChips() {
  const email = useEmail()
  const chips = [
    USER.jobs[0].title + " @ " + USER.jobs[0].company,
    USER.address,
    urlToName(USER.website),
    email,
    USER.pronouns,
  ]

  return (
    <section className="screen-line-bottom border-x border-line px-4 py-5">
      <ul className="flex flex-wrap gap-1.5">
        {chips.map((chip) => (
          <li key={chip} className="flex">
            <span className="flex h-7 items-center rounded-full bg-zinc-50/80 px-2.5 font-mono text-xs text-muted-foreground inset-ring-1 inset-ring-border dark:bg-zinc-900/80">
              {chip}
            </span>
          </li>
        ))}
      </ul>

      <ul className="mt-3 flex gap-2">
        {SOCIAL_LINKS.map(({ icon, title, href }) => {
          const Icon = Icons[icon as keyof typeof Icons]
          return (
            <li key={href} className="flex">
              <a
                className="flex size-8 items-center justify-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                href={href}
                target="_blank"
                rel="noopener"
              >
                {Icon ? <Icon className="size-3.5" /> : null}
                <span className="sr-only">{title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/**
 * The stored address is base64 so scrapers cannot lift it out of the HTML.
 * Decoding on the client keeps it that way.
 */
function useEmail() {
  const isClient = useIsClient()
  return isClient ? decodeEmail(USER.email) : "[Email protected]"
}
