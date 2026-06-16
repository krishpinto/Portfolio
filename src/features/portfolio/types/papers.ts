export type Paper = {
  id: string
  title: string
  /** Conference, journal, or venue name. */
  venue: string
  /** Publication date, "YYYY-MM" format. */
  date: string
  /** Direct URL to the paper (IEEE, journal, arXiv, etc.). */
  url: string
  /** Optional short description or abstract excerpt. */
  description?: string
}
