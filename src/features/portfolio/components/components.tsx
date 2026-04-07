import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/base/ui/button"

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "./panel"

export function Components() {
  const dummyComponents = [1, 2, 3, 4, 5, 6]

  return (
    <Panel id="components">
      <PanelHeader>
        <PanelTitle>
          Components
          <PanelTitleSup>({dummyComponents.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="relative pt-2">
        <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-2 max-sm:hidden sm:grid-cols-2 md:grid-cols-3">
          <div className="border-r border-line" />
          <div className="border-l border-line md:border-x" />
          <div className="border-l border-line max-md:hidden" />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {dummyComponents.map((c) => (
            <div key={c} className="flex h-16 items-center justify-center rounded-xl bg-muted/30 border border-dashed border-line text-sm text-muted-foreground hover:bg-muted/50 transition-colors">
              Dummy Component UI
            </div>
          ))}
        </div>
      </div>

      <div className="-mt-px flex justify-center py-2">
        <Button
          className="gap-2 border-none pr-2.5 pl-3"
          size="sm"
          nativeButton={false}
          render={<Link href="/" />}
        >
          All Components
          <ArrowRightIcon />
        </Button>
      </div>
    </Panel>
  )
}
