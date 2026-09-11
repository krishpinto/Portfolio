import { RESUME_EMBED_URL, RESUME_URL } from "@/config/site"
import { USER } from "@/features/portfolio/data/user"
import { cn } from "@/lib/utils"

/**
 * The embedded résumé, framed the way the rest of the site frames things: a
 * hatched gutter bleeding to the page edge, a ruled box, and a plus at every
 * corner so the frame reads as part of the grid rather than a dropped-in card.
 */
export function ResumeViewer({ className }: { className?: string }) {
  return (
    <div className={cn("relative px-4 py-6 sm:px-6 sm:py-8", className)}>
      <HatchedBackdrop />

      <div className="relative border border-line bg-background shadow-sm">
        <CornerPlus corner="top-left" />
        <CornerPlus corner="top-right" />
        <CornerPlus corner="bottom-left" />
        <CornerPlus corner="bottom-right" />

        {/* A4 is 1:√2, so the frame matches the document instead of cropping it. */}
        <iframe
          className="block aspect-[1/1.414] w-full"
          src={RESUME_EMBED_URL}
          title={`${USER.displayName} — résumé`}
          loading="lazy"
          allow="autoplay"
        />
      </div>

      <p className="relative mt-4 text-center font-mono text-xs text-muted-foreground">
        Preview not loading?{" "}
        <a className="link" href={RESUME_URL} target="_blank" rel="noopener">
          Open it on Google Drive
        </a>
        .
      </p>
    </div>
  )
}

/** The 45° hatch used by the section dividers, reused as the viewer's mat. */
function HatchedBackdrop() {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 -z-1",
        "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-line)]/56"
      )}
    />
  )
}

const CORNER_POSITIONS = {
  "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
} as const

/** A plus centered on a corner, so the mark straddles the rule on both axes. */
function CornerPlus({ corner }: { corner: keyof typeof CORNER_POSITIONS }) {
  return (
    <span
      aria-hidden
      className={cn("absolute z-1 size-3", CORNER_POSITIONS[corner])}
    >
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-muted-foreground/40" />
      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-muted-foreground/40" />
    </span>
  )
}
