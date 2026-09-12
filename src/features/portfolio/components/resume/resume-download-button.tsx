"use client"

import { FileUserIcon } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Button } from "@/components/ui/button"
import { RESUME_DOWNLOAD_URL } from "@/config/site"
import { cn } from "@/lib/utils"

/**
 * The résumé download, pinned into a corner of the page heading rather than
 * given a row of its own. An icon-only button needs its label somewhere, so
 * the tooltip carries it and the screen-reader text repeats it.
 */
export function ResumeDownloadButton({ className }: { className?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className={cn(className)}
            variant="outline"
            size="icon-sm"
            asChild
          >
            <a href={RESUME_DOWNLOAD_URL} target="_blank" rel="noopener">
              <FileUserIcon />
              <span className="sr-only">Download resume (PDF)</span>
            </a>
          </Button>
        }
      />
      <TooltipContent>
        <p>Download resume (PDF)</p>
      </TooltipContent>
    </Tooltip>
  )
}
