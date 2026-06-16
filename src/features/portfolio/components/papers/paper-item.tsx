"use client"

import { format } from "date-fns"
import { ExternalLinkIcon, ScrollTextIcon } from "lucide-react"

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

import type { Paper } from "../../types/papers"

export function PaperItem({
  className,
  paper,
}: {
  className?: string
  paper: Paper
}) {
  const canExpand = !!paper.description

  return (
    <Collapsible className={className} disabled={!canExpand}>
      <div className="flex items-center hover:bg-accent-muted">
        <div className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-line ring-offset-1 ring-offset-background">
          <ScrollTextIcon className="pointer-events-none size-4 text-muted-foreground" />
        </div>

        <div className="flex-1 border-l border-dashed border-line">
          <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 pr-2 text-left">
            <div className="flex-1">
              <h3 className="mb-1 leading-snug font-medium text-balance">
                {paper.title}
              </h3>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <dl>
                  <dt className="sr-only">Venue</dt>
                  <dd>{paper.venue}</dd>
                </dl>

                <Separator
                  className="data-vertical:h-4 data-vertical:self-center"
                  orientation="vertical"
                />

                <dl>
                  <dt className="sr-only">Published</dt>
                  <dd>
                    <time dateTime={new Date(paper.date).toISOString()}>
                      {format(new Date(paper.date), "MM.yyyy")}
                    </time>
                  </dd>
                </dl>
              </div>
            </div>

            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                    href={paper.url}
                    target="_blank"
                    rel="noopener"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLinkIcon className="pointer-events-none size-4" />
                    <span className="sr-only">Open Paper</span>
                  </a>
                }
              />
              <TooltipContent>
                <p>Open Paper</p>
              </TooltipContent>
            </Tooltip>

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
          <ProseMono className="border-t border-line p-4">
            <Markdown>{paper.description}</Markdown>
          </ProseMono>
        </CollapsibleContent>
      )}
    </Collapsible>
  )
}
