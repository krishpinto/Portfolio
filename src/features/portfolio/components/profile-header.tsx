"use client"

import { useEffect, useState } from "react"

import { USER } from "@/features/portfolio/data/user"

import { AvatarElectricEffect } from "./avatar-electric-effect"
import { PronounceMyName } from "./pronounce-my-name"
import { VerifiedIcon } from "./verified-icon"

function FlipText({ sentences }: { sentences: string[] }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % sentences.length)
        setVisible(true)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [sentences.length])

  return (
    <span
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-6px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {sentences[index]}
    </span>
  )
}

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom flex border-x border-line">
      <div className="shrink-0 border-r border-line">
        <div className="mx-0.5 my-0.75">
          <AvatarElectricEffect>
            <img
              className="size-30 rounded-full object-cover object-top ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
              alt="Avatar"
              src={USER.avatar}
              fetchPriority="high"
            />
          </AvatarElectricEffect>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex grow items-end pb-1 pl-4">
          <div
            className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800"
            aria-hidden
          >
            {"text-3xl "}
            <span className="inline dark:hidden">text-zinc-950</span>
            <span className="hidden dark:inline">text-zinc-50</span>
            {" font-medium"}
          </div>
        </div>

        <div className="border-t border-line">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-3xl font-semibold tracking-tight">
              {USER.displayName}
            </h1>

            <VerifiedIcon
              className="size-4.5 text-info select-none"
              aria-label="Verified"
            />

            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>

          <div className="h-12.5 border-t border-line py-1 pl-4 sm:h-9 overflow-hidden flex items-center">
            <p className="font-pixel-square text-sm text-balance text-muted-foreground">
              <FlipText sentences={USER.flipSentences} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
