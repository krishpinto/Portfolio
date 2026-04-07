import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/base/ui/button"

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "./panel"

export function Blog() {
  const dummyPosts = [1, 2]

  return (
    <Panel id="blog">
      <PanelHeader>
        <PanelTitle>
          Blog
          <PanelTitleSup>({dummyPosts.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="relative py-4">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-line"></div>
          <div className="border-l border-line"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {dummyPosts.map((post) => (
            <div key={post} className="flex h-24 items-center justify-center rounded-xl border border-dashed border-line text-sm text-muted-foreground">
              Dummy Post Item
            </div>
          ))}
        </div>
      </div>

      <div className="screen-line-top flex justify-center py-2">
        <Button
          className="gap-2 border-none pr-2.5 pl-3"
          size="sm"
          nativeButton={false}
          render={<Link href="/" />}
        >
          All Posts
          <ArrowRightIcon />
        </Button>
      </div>
    </Panel>
  )
}
