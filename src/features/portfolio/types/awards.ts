export type Award = {
  id: string
  prize: string
  title: string
  /**
   * Award date used for sorting and display.
   * Format: "YYYY-MM" preferred (e.g., "2018-03"); "YYYY" is also accepted.
   */
  date: string
  /**
   * School level or context label (e.g., "Grade 10", "University", "Personal Project").
   */
  grade: string
  /** Optional rich text description; Markdown and line breaks supported. */
  description?: string
  /** Optional URL to certificate, announcement, or reference material. */
  referenceLink?: string
  /**
   * Picture of the certificate, shown when the row is opened. Dimensions are
   * stored with it so the frame holds its shape before the image loads.
   */
  image?: {
    src: string
    width: number
    height: number
  }
}
