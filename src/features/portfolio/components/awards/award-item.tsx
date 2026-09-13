import { format } from "date-fns"
import { ArrowUpRightIcon, AwardIcon, FileCheckIcon } from "lucide-react"
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
import { Markdown } from "@/components/markdown"
import { Separator } from "@/components/ui/separator"
import { ProseMono } from "@/components/ui/typography"

import type { Award } from "../../types/awards"

export function AwardItem({
  className,
  award,
}: {
  className?: string
  award: Award
}) {
  const canExpand = !!award.description || !!award.image

  return (
    <Collapsible className={className} disabled={!canExpand}>
      <div className="flex items-center hover:bg-accent-muted">
        <div className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-line ring-offset-1 ring-offset-background">
          <AwardIcon className="pointer-events-none size-4 text-muted-foreground" />
        </div>

        <div className="flex-1 border-l border-dashed border-line">
          <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 pr-2 text-left">
            <div className="flex-1">
              <h3 className="mb-1 leading-snug font-medium text-balance">
                {award.title}
              </h3>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <dl>
                  <dt className="sr-only">Prize</dt>
                  <dd>{award.prize}</dd>
                </dl>

                <Separator
                  className="data-vertical:h-4 data-vertical:self-center"
                  orientation="vertical"
                />

                <dl>
                  <dt className="sr-only">Awarded in</dt>
                  <dd>
                    <time dateTime={new Date(award.date).toISOString()}>
                      {format(new Date(award.date), "MM.yyyy")}
                    </time>
                  </dd>
                </dl>

                <Separator
                  className="data-vertical:h-4 data-vertical:self-center"
                  orientation="vertical"
                />

                <dl>
                  <dt className="sr-only">Received in Grade</dt>
                  <dd>{award.grade}</dd>
                </dl>
              </div>
            </div>

            {award.referenceLink && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                      href={award.referenceLink}
                      target="_blank"
                      rel="noopener"
                    >
                      <FileCheckIcon className="pointer-events-none size-4" />
                      <span className="sr-only">Open Reference Attachment</span>
                    </a>
                  }
                />
                <TooltipContent>
                  <p>Open Reference Attachment</p>
                </TooltipContent>
              </Tooltip>
            )}

            {canExpand && (
              <div className="shrink-0 text-muted-foreground [&_svg]:size-4">
                <CollapsibleChevronsIcon />
              </div>
            )}
          </CollapsibleTrigger>
        </div>
      </div>

      {canExpand && (
        <CollapsibleContent className="overflow-hidden">
          <div className="space-y-4 border-t border-line p-4">
            {award.description && (
              <ProseMono>
                <Markdown>{award.description}</Markdown>
              </ProseMono>
            )}

            {award.image && (
              <CertificateImage
                image={award.image}
                title={award.title}
                href={award.referenceLink}
              />
            )}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  )
}

/**
 * The certificate itself, so opening a row shows the proof rather than only
 * describing it. The picture links through to the original PDF.
 */
function CertificateImage({
  image,
  title,
  href,
}: {
  image: NonNullable<Award["image"]>
  title: string
  href?: string
}) {
  const picture = (
    <Image
      className="w-full transition-transform duration-500 ease-out group-hover/certificate:scale-[1.02]"
      src={image.src}
      alt={`Certificate for ${title}`}
      width={image.width}
      height={image.height}
      sizes="(min-width: 768px) 700px, 100vw"
    />
  )

  const frame =
    "group/certificate relative block overflow-hidden rounded-lg border border-line bg-muted"

  if (!href) return <div className={frame}>{picture}</div>

  return (
    <a className={frame} href={href} target="_blank" rel="noopener">
      {picture}
      <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-background/85 px-2 py-1 font-mono text-xs text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover/certificate:opacity-100 group-focus-visible/certificate:opacity-100">
        Open PDF
        <ArrowUpRightIcon className="size-3.5" />
      </span>
    </a>
  )
}
