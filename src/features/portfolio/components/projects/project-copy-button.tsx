"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"

export function ProjectCopyButton({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            onClick={handleCopy}
            className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
          >
            {copied ? (
              <CheckIcon className="pointer-events-none size-4 text-green-500" />
            ) : (
              <CopyIcon className="pointer-events-none size-4" />
            )}
            <span className="sr-only">Copy {command}</span>
          </button>
        }
      />
      <TooltipContent>
        <p>{copied ? "Copied!" : command}</p>
      </TooltipContent>
    </Tooltip>
  )
}
