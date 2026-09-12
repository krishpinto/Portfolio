import { NextResponse } from "next/server"

/**
 * Destination for the printed QR code. See src/scripts/generate-qr.mjs.
 *
 * The code encodes this path rather than the bare domain for two reasons: the
 * target can be changed later without reprinting anything physical, and QR
 * scans stay separable from ordinary traffic in analytics.
 *
 * 307 rather than 308 on purpose. Browsers cache a permanent redirect
 * indefinitely, which would defeat the point of being able to retarget it.
 */
export function GET(request: Request) {
  const url = new URL("/", request.url)
  url.searchParams.set("utm_source", "qr")
  url.searchParams.set("utm_medium", "phone-case")
  return NextResponse.redirect(url, 307)
}
