import { Icons } from "@/components/icons"
import { UTM_PARAMS } from "@/config/site"
import { addQueryParams } from "@/utils/url"

import { SOCIAL_LINKS } from "../../data/social-links"

/**
 * Compact strip of monochrome social glyphs. Deliberately label-free so the
 * hero stays one screen tall and Experience starts above the fold.
 */
export function SocialIconRow() {
  return (
    <nav aria-label="Social profiles" className="flex items-center gap-3">
      {SOCIAL_LINKS.map((link) => {
        const Icon = Icons[link.icon]

        return (
          <a
            key={link.title}
            className="text-muted-foreground transition-colors ease-out hover:text-foreground"
            href={addQueryParams(link.href, UTM_PARAMS)}
            target="_blank"
            rel="noopener"
            aria-label={link.title}
          >
            <Icon className="size-4.5" />
          </a>
        )
      })}
    </nav>
  )
}
