import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // An explicit Allow. A bare User-agent line with no directive is legal
        // but reads as an empty rule to some auditors and crawlers.
        allow: "/",
      },
    ],
    sitemap: `${SITE_INFO.url}/sitemap.xml`,
    host: SITE_INFO.url,
  }
}
