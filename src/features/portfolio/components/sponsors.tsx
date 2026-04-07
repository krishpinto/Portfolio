import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/base/ui/button"

import { Panel, PanelDescription, PanelHeader, PanelTitle } from "./panel"

export function Sponsors() {
  const dummySponsors = [1, 2]

  return (
    <Panel id="sponsors">
      <PanelHeader className="after:content-none">
        <PanelTitle>Sponsors</PanelTitle>
        <PanelDescription>
          Grateful for the support that helps me grow and maintain high-quality
          projects.
        </PanelDescription>
      </PanelHeader>

      <div className="relative">
        <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-line" />
          <div className="border-l border-line" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {dummySponsors.map((item) => (
            <div key={item} className="flex h-16 items-center justify-center rounded-xl border border-dashed border-line text-sm text-muted-foreground">
              Dummy Sponsor UI
            </div>
          ))}
          <div className="flex h-16 items-center justify-center rounded-xl border border-dashed border-line text-sm text-muted-foreground bg-muted/20">
            + Become a Sponsor
          </div>
        </div>
      </div>

      <div className="-mt-px flex justify-center py-2">
        <Button
          className="gap-2 border-none pr-2.5 pl-3"
          size="sm"
          nativeButton={false}
          render={<Link href="/" />}
        >
          All Sponsors
          <ArrowRightIcon />
        </Button>
      </div>
    </Panel>
  )
}
