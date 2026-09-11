import { Music2Icon, TvMinimalPlayIcon } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { LISTENING, SHOW_LISTENING, WATCHING } from "../../data/now"
import { Equalizer } from "./equalizer"
import { TrackProgress } from "./track-progress"

/**
 * Thin strip between the hero and Experience, in place of a section
 * separator. Spans the full content column like every other row on the page,
 * with the counter pushed to the far edge so it reads end to end.
 */
export function Now() {
  return (
    <section
      aria-label="What I'm watching"
      className="screen-line-bottom grid border-x border-line"
    >
      <WatchingCell />
      {SHOW_LISTENING && <ListeningCell />}
    </section>
  )
}

function WatchingCell() {
  const item = WATCHING[0]
  if (!item) return null

  const { title, artwork, episode, totalEpisodes, href } = item

  const percent =
    episode && totalEpisodes
      ? Math.min(100, (episode / totalEpisodes) * 100)
      : null

  return (
    <Cell href={href}>
      <ArtworkTile
        src={artwork}
        alt={`${title} poster`}
        fallback={<TvMinimalPlayIcon className="size-5" />}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Label>
          <span
            className="size-1.5 shrink-0 animate-pulse rounded-full bg-foreground"
            aria-hidden
          />
          Now watching
        </Label>

        <p className="truncate text-sm font-medium">{title}</p>
      </div>

      {episode ? (
        <p className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
          EP {episode}
          {totalEpisodes ? ` / ${totalEpisodes}` : null}
        </p>
      ) : null}

      {percent !== null && (
        <span className="absolute inset-x-0 bottom-0 h-px bg-line">
          <span
            className="block h-px bg-foreground/60"
            style={{ width: `${percent}%` }}
          />
        </span>
      )}
    </Cell>
  )
}

/** Kept wired up. Flip `SHOW_LISTENING` in the data file to bring it back. */
function ListeningCell() {
  const item = LISTENING[0]
  if (!item) return null

  const { track, artist, artwork, duration, position, href } = item

  return (
    <Cell href={href} className="screen-line-top">
      <ArtworkTile
        src={artwork}
        alt={`${track} cover art`}
        fallback={<Music2Icon className="size-5" />}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Label>
          <Equalizer />
          Now playing
        </Label>

        <p className="truncate text-sm font-medium">{track}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <p className="truncate font-mono text-xs text-muted-foreground">
          {artist}
        </p>
        <TrackProgress position={position} duration={duration} />
      </div>
    </Cell>
  )
}

function Cell({
  href,
  className,
  children,
}: {
  href?: string
  className?: string
  children: React.ReactNode
}) {
  const Comp = href ? "a" : "div"

  return (
    <Comp
      className={cn(
        "group relative flex items-center gap-3 px-4 py-3",
        href && "transition-[background-color] ease-out hover:bg-accent-muted",
        className
      )}
      {...(href
        ? { href, target: "_blank" as const, rel: "noopener" }
        : undefined)}
    >
      {children}
    </Comp>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase">
      {children}
    </p>
  )
}

function ArtworkTile({
  src,
  alt,
  fallback,
}: {
  src?: string
  alt: string
  fallback: React.ReactNode
}) {
  return (
    <div className="relative size-12 shrink-0 overflow-hidden rounded-sm bg-muted ring-1 ring-border/60">
      {src ? (
        <Image className="object-cover" src={src} alt={alt} fill sizes="48px" />
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground">
          {fallback}
        </div>
      )}
    </div>
  )
}
