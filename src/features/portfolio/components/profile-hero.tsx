"use client"

import Image from "next/image"

import { DitheringBackdrop } from "@/components/dithering-backdrop"
import { TextFlip } from "@/components/text-flip"
import { USER } from "@/features/portfolio/data/user"

import { AvatarElectricEffect } from "./avatar-electric-effect"
import { VerifiedIcon } from "./verified-icon"

/**
 * The hero: avatar, name, role and a rotating tagline centred on the drifting
 * dither field.
 *
 * No KP mark in it. The mark is in the nav on every page, so a second copy here
 * was saying the same thing twice.
 */
export function ProfileHero() {
  return (
    <header className="screen-line-bottom relative isolate border-x border-line">
      <DitheringBackdrop className="[mask-image:radial-gradient(120%_100%_at_50%_50%,black,transparent_75%)] opacity-30" />

      <div className="flex flex-col items-center px-4 py-14 text-center sm:py-20">
        <AvatarElectricEffect>
          <Image
            className="size-24 shrink-0 rounded-full object-cover ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-28"
            src={USER.avatar}
            alt={USER.displayName}
            width={192}
            height={192}
            quality={100}
            priority
          />
        </AvatarElectricEffect>

        <h1 className="mt-5 flex items-center gap-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          {USER.displayName}
          <VerifiedIcon className="size-5 text-info" aria-label="Verified" />
        </h1>

        <p className="mt-2 font-mono text-sm text-muted-foreground">
          {USER.jobTitle}
        </p>

        {/* Fixed height so a longer sentence flipping in does not shove the
            page down. Two lines at phone width, one from `sm` up. */}
        <div className="mt-5 flex h-10 items-center sm:h-5">
          <TextFlip
            className="font-mono text-sm text-balance text-muted-foreground"
            interval={3}
          >
            {USER.flipSentences}
          </TextFlip>
        </div>
      </div>
    </header>
  )
}
