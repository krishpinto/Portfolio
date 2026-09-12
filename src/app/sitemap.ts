import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"

/**
 * Hand-maintained per route. Stamping `new Date()` here made every page claim
 * it had changed on the day it was crawled, every day, which crawlers learn to
 * discount. Bump the date on a route when its content actually changes.
 */
const ROUTES = [
  { path: "", lastModified: "2026-09-12", changeFrequency: "weekly" },
  { path: "/work", lastModified: "2026-09-11", changeFrequency: "monthly" },
  { path: "/projects", lastModified: "2026-09-11", changeFrequency: "monthly" },
  { path: "/resume", lastModified: "2026-09-11", changeFrequency: "monthly" },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, lastModified, changeFrequency }) => ({
    url: `${SITE_INFO.url}${path}`,
    lastModified,
    changeFrequency,
    // The home page is the one worth crawling first.
    priority: path === "" ? 1 : 0.8,
  }))
}
