import type { Icons } from "@/components/icons"

/** Name of an inline SVG icon exported from `@/components/icons`. */
export type SocialIconName = keyof typeof Icons

export type SocialLink = {
  /** Inline icon to render beside the title. Self-hosted, no external request. */
  icon: SocialIconName
  title: string
  /** Optional handle/username or subtitle displayed under the title. */
  subtitle?: string
  /** External profile URL opened when the item is clicked. */
  href: string
}
