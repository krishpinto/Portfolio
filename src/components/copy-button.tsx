"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/base/ui/button"

export type CopyButtonProps = React.ComponentProps<typeof Button> & {
  text?: string
  onCopySuccess?: (text: string) => void
  onCopyError?: (err: unknown) => void
}

export function CopyButton({
  text,
  onCopySuccess,
  onCopyError,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      onCopySuccess?.(text)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      onCopyError?.(e)
    }
  }

  return (
    <Button onClick={handleCopy} {...props}>
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
}
