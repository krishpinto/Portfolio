import { ArrowUpRightIcon } from "lucide-react"

import { Icons } from "@/components/icons"
import { UTM_PARAMS } from "@/config/site"
import type { SocialLink } from "@/features/portfolio/types/social-links"
import { cn } from "@/lib/utils"
import { addQueryParams } from "@/utils/url"

export function SocialLinkItem({ icon, title, href }: SocialLink) {
  const Icon = Icons[icon]

  return (
    <a
      className={cn(
        "flex cursor-pointer items-center gap-4 p-4 pr-2 transition-[background-color] ease-out hover:bg-accent-muted",
        "max-md:nth-[2n+1]:screen-line-top max-md:nth-[2n+1]:screen-line-bottom",
        "md:nth-[3n+1]:screen-line-top md:nth-[3n+1]:screen-line-bottom"
      )}
      href={addQueryParams(href, UTM_PARAMS)}
      target="_blank"
      rel="noopener"
    >
      <div className="relative flex size-8 shrink-0 items-center justify-center rounded-lg select-none corner-squircle supports-corner-shape:rounded-[50%]">
        <Icon className="size-4.5" />
        <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/10 corner-squircle ring-inset dark:ring-white/15 supports-corner-shape:rounded-[50%]" />
      </div>

      <h3 className="flex-1 font-medium">{title}</h3>

      <ArrowUpRightIcon className="size-4 text-muted-foreground" />
    </a>
  )
}
