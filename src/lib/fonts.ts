import { GeistMono } from "geist/font/mono"
import { GeistPixelSquare } from "geist/font/pixel"
import { GeistSans } from "geist/font/sans"
import { Caveat } from "next/font/google"

import { cn } from "@/lib/utils"

const fontSans = GeistSans
const fontMono = GeistMono

const fontHandwritten = Caveat({
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-handwritten",
})

// export const fontPixel = localFont({
//   src: "../assets/fonts/DepartureMono-Regular.woff2",
//   weight: "400",
//   variable: "--font-pixel",
// })

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  GeistPixelSquare.variable,
  fontHandwritten.variable,
  "[--font-sans:var(--font-geist-sans)]",
  "[--font-mono:var(--font-geist-mono)]"
)
