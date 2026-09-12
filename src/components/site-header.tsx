import dynamic from "next/dynamic"

import { DesktopNav } from "@/components/desktop-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { MAIN_NAV, MOBILE_NAV } from "@/config/site"
import { cn } from "@/lib/utils"

const CommandMenu = dynamic(() =>
  import("@/components/command-menu").then((mod) => mod.CommandMenu)
)

const MobileNav = dynamic(() =>
  import("@/components/mobile-nav").then((mod) => mod.MobileNav)
)

export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2">
        <div className="screen-line-top screen-line-bottom mx-auto flex h-12 items-center justify-between gap-2 border-x border-line px-2 group-has-data-[slot=layout-wide]/layout:container after:z-1 after:transition-[background-color] sm:gap-4 md:max-w-3xl">
          <DesktopNav items={MAIN_NAV} />

          <div className="flex-1" />

          <div className="flex items-center *:first:mr-2 max-sm:*:data-[slot=command-menu-trigger]:hidden">
            <CommandMenu enabledHotkeys />
            <Separator
              orientation="vertical"
              className="mx-2 data-vertical:h-4 data-vertical:self-center"
            />
            <ThemeToggle />
          </div>

          <div className="absolute top-[-3.5px] left-[-4.5px] z-2 flex size-2 border border-line bg-background" />
          <div className="absolute top-[-3.5px] right-[-4.5px] z-2 flex size-2 border border-line bg-background" />
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-[calc(--spacing(16)+env(safe-area-inset-bottom,0px))] bg-linear-to-t from-background from-[calc(env(safe-area-inset-bottom,0%))] to-transparent sm:hidden" />
      <div
        className={cn(
          "fixed bottom-[calc(--spacing(2)+env(safe-area-inset-bottom,0px))] left-1/2 z-50 flex w-fit -translate-x-1/2 items-center rounded-xl bg-popover py-1 pr-1 pl-2.5 shadow-md ring ring-foreground/10 sm:hidden dark:ring-foreground/20",
          "*:data-[slot=command-menu-trigger]:min-w-20 *:data-[slot=command-menu-trigger]:gap-2 *:data-[slot=command-menu-trigger]:rounded-none *:data-[slot=command-menu-trigger]:border-none *:data-[slot=command-menu-trigger]:bg-transparent *:data-[slot=command-menu-trigger]:px-0 *:data-[slot=command-menu-trigger]:hover:bg-transparent *:data-[slot=command-menu-trigger]:active:scale-none"
        )}
      >
        <CommandMenu />
        <Separator
          orientation="vertical"
          className="mr-1 ml-2.5 data-vertical:h-6 data-vertical:self-center"
        />
        <MobileNav items={MOBILE_NAV} />
      </div>
    </>
  )
}
