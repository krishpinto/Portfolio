import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/base/ui/button"
import { Panel } from "@/features/portfolio/components/panel"

export function Testimonials() {
  return (
    <Panel
      id="testimonials"
      className="before:content-none after:content-none"
    >
      <h2 className="sr-only">Testimonials</h2>

      <div className="grid gap-2 px-2 sm:grid-cols-2">
         <div className="flex flex-col gap-2 h-32 items-center justify-center rounded-xl border border-dashed border-line text-sm text-muted-foreground w-full col-span-2 bg-muted/20">
            Dummy Testimonials UI
         </div>
      </div>

      <div className="absolute right-0 bottom-0 z-10 -translate-x-2 rounded-lg bg-background ring-1 ring-background">
        <Button className="size-7" variant="outline" size="icon-sm" nativeButton={false} render={<a href="/" aria-label="Wall of Love" />}>
          <ArrowUpRightIcon />
        </Button>
      </div>
    </Panel>
  )
}
