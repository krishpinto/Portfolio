export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string
  title: string
  /**
   * Project period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing projects.
   */
  period: {
    /** Start date (e.g., "05.2025"). */
    start: string
    /** End date; leave undefined for "Present". */
    end?: string
  }
  /** Public URL (site, repository, demo, or video). Omit for private work. */
  link?: string
  /** Additional links shown alongside the primary link. */
  links?: { label: string; url: string }[]
  /** If set, replaces the main link icon with a copy button for this command. */
  copyCommand?: string
  /** Badges shown in the card header, always visible. */
  badges?: { label: string; type: "achievement" | "soon" }[]
  /** Handwritten aside pinned in the page margin, pointing at this card. */
  note?: string
  /** Tags/technologies for chips or filtering. */
  skills: string[]
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string
  /** Logo image URL (absolute or path under /public). */
  logo?: string
  /**
   * Wide screenshot for the /projects case-study card, path under /public.
   * Without one the card draws a poster from `logo` and `logoColor`, so a
   * project can ship before its screenshot exists.
   */
  cover?: string
  /**
   * Brand colour for the logo, e.g. "#6C5CD6". When set, the logo is drawn as a
   * CSS mask: muted grey at rest, this colour when the card is hovered.
   * Requires a single-colour logo on a transparent background.
   */
  logoColor?: string
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean
  /** Marks an actively in-progress project with the pulsing indicator. */
  isActive?: boolean
}
