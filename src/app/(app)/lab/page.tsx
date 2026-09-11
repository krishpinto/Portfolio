import type { Metadata } from "next"

import {
  ContactArrows,
  ContactChips,
  ContactTight,
} from "@/features/portfolio/components/lab/hero-variants"

/**
 * Scratch page for comparing hero and contact layouts side by side. Not linked
 * from anywhere and excluded from search. Delete the route and the lab folder
 * once a direction is picked.
 */
export const metadata: Metadata = {
  title: "Lab",
  robots: { index: false, follow: false },
}

export default function LabPage() {
  return (
    <div className="mx-auto md:max-w-3xl">
      <Label>Contact 1 — Tight grid (same content, no icon tiles)</Label>
      <ContactTight />

      <Label>Contact 2 — Arrow list (Ethan&rsquo;s shape)</Label>
      <ContactArrows />

      <Label>Contact 3 — Chips (most compact)</Label>
      <ContactChips />

      <div className="h-24" />
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-x border-line bg-muted/40 px-4 py-2 font-mono text-xs tracking-wide text-muted-foreground uppercase">
      {children}
    </p>
  )
}
