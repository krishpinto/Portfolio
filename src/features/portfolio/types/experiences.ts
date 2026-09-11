export type ExperiencePosition = {
  id: string
  title: string
  /**
   * Employment period of the position.
   * Use "MM.YYYY" or "YYYY" format. Omit `end` for current roles.
   */
  employmentPeriod: {
    /** Start date (e.g., "10.2022" or "2020"). */
    start: string
    /** End date; leave undefined for "Present". */
    end?: string
  }
  /** Full-time | Part-time | Contract | Internship, etc. */
  employmentType?: string
  description?: string
  /** UI icon to represent the role type. */
  icon?: React.ReactElement
  skills?: string[]
  /** Whether the position is expanded by default in the UI. */
  isExpanded?: boolean
}

export type Experience = {
  id: string
  companyName: string
  /** URL to the company logo (absolute URL or path under /public). */
  companyLogo?: string
  /**
   * Brand colour, e.g. "#DB0720". Lights the logo tile's border while the card
   * is hovered. The mark itself keeps its own colours.
   */
  companyLogoColor?: string
  /**
   * Colour painted behind the mark inside its tile. Set it for marks printed
   * in flat black, which have nothing to sit on once the theme goes dark.
   */
  companyLogoBackground?: string
  /** UI icon to represent the company; used if `companyLogo` is not provided. */
  companyIcon?: React.ReactElement
  /** URL to the company's website. */
  companyWebsite?: string
  /** Where the role was based, e.g. "Mumbai, India". */
  location?: string
  locationType?: "On-site" | "Hybrid" | "Remote"
  /** Roles held at this company; keep newest first for display. */
  positions: ExperiencePosition[]
  /** Marks the company as the current employer for highlighting. */
  isCurrentEmployer?: boolean
}
