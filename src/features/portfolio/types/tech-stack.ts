/**
 * A technology item displayed in the Tech Stack section.
 *
 * Icons resolve from `Icons` in `@/components/icons` by `iconKey ?? key`.
 * An entry with no matching icon still renders, just without a glyph.
 */
export type TechStack = {
  /** Unique identifier, also the default icon lookup. */
  key: string
  /** Overrides the icon lookup when the icon is named differently. */
  iconKey?: string
  /** Display name of the technology. */
  title: string
  /** Official website URL. */
  href: string
  /** Category tags used for grouping. */
  categories: string[]
}
