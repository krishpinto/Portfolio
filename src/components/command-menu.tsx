"use client"

import { useRouter } from "@bprogress/next/app"
import { useCommandState } from "cmdk"
import {
  AwardIcon,
  BookmarkIcon,
  BoxIcon,
  BriefcaseBusinessIcon,
  CircleCheckBigIcon,
  CornerDownLeftIcon,
  FileTextIcon,
  LayersIcon,
  MoonStarIcon,
  MousePointer2Icon,
  RssIcon,
  SunMediumIcon,
  TextInitialIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import React, { useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { toast } from "sonner"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { useDuckFollowerVisibility } from "@/hooks/use-duck-follower-visibility"
import { trackEvent } from "@/lib/events"
import { copyToClipboardWithEvent } from "@/utils/copy"

import { ComponentIcon, Icons } from "./icons"
import { Button } from "./ui/button"
import { Kbd, KbdGroup } from "./ui/kbd"
import { KrishPintoMark, getKPMarkSVG } from "./krishpinto-mark"
import { Separator } from "./ui/separator"

type CommandLinkItem = {
  title: string
  href: string

  icon?: React.ReactElement
  iconImage?: string
  shortcut?: string
  keywords?: string[]
  openInNewTab?: boolean
}

const MENU_LINKS: CommandLinkItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <KrishPintoMark />,
    shortcut: "GH",
  },
]

const PORTFOLIO_LINKS: CommandLinkItem[] = [
  {
    title: "About",
    href: "/#about",
    icon: <TextInitialIcon />,
  },
  {
    title: "Tech Stack",
    href: "/#stack",
    icon: <LayersIcon />,
  },
  {
    title: "Experience",
    href: "/#experience",
    icon: <BriefcaseBusinessIcon />,
  },
  {
    title: "Projects",
    href: "/#projects",
    icon: <BoxIcon />,
  },
  {
    title: "Honors & Awards",
    href: "/#awards",
    icon: <AwardIcon />,
  },
  {
    title: "Certifications",
    href: "/#certs",
    icon: <CircleCheckBigIcon />,
  },
  {
    title: "Bookmarks",
    href: "/#bookmarks",
    icon: <BookmarkIcon />,
  },
  {
    title: "Download vCard",
    href: "/vcard",
    icon: <FileTextIcon />,
  },
]

const SOCIAL_LINK_ITEMS: CommandLinkItem[] = SOCIAL_LINKS.map((item) => ({
  title: item.title,
  href: item.href,
  iconImage: item.icon,
  openInNewTab: true,
}))

const OTHER_LINK_ITEMS: CommandLinkItem[] = [
  {
    title: "llms.txt",
    href: "/llms.txt",
    icon: <FileTextIcon />,
    openInNewTab: true,
  },
  {
    title: "RSS Feed",
    href: "/rss",
    icon: <RssIcon />,
    openInNewTab: true,
  },
]

type BlockItem = {
  name: string
  description: string
}

export function CommandMenu({
  enabledHotkeys = false,
}: {
  enabledHotkeys?: boolean
}) {
  const router = useRouter()

  const { setTheme, resolvedTheme } = useTheme()

  const [open, setOpen] = useState(false)

  const [, setIsDuckFollowerVisible] = useDuckFollowerVisibility()

  useHotkeys(
    "mod+k, slash",
    (e) => {
      e.preventDefault()

      setOpen((open) => {
        if (!open) {
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "keyboard",
              key: e.key === "/" ? "/" : e.metaKey ? "cmd+k" : "ctrl+k",
            },
          })
        }
        return !open
      })
    },
    { enabled: enabledHotkeys }
  )

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false)

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "navigate",
          href: href,
          open_in_new_tab: openInNewTab,
        },
      })

      if (openInNewTab) {
        window.open(href, "_blank", "noopener")
      } else {
        router.push(href)
      }
    },
    [router]
  )

  const handleCopyText = useCallback((text: string, message: string) => {
    setOpen(false)
    copyToClipboardWithEvent(text, {
      name: "command_menu_action",
      properties: {
        action: "copy",
        text: text,
      },
    })
    toast.success(message)
  }, [])

  const createThemeHandler = useCallback(
    (theme: "light" | "dark" | "system") => () => {
      setOpen(false)

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "change_theme",
          theme: theme,
        },
      })

      setTheme(theme)
    },
    [setTheme]
  )

  const handleToggleDuckFollower = useCallback(() => {
    setOpen(false)
    setIsDuckFollowerVisible((isVisible) => !isVisible)

    trackEvent({
      name: "command_menu_action",
      properties: {
        action: "toggle_duck_follower",
      },
    })
  }, [setIsDuckFollowerVisible])



  return (
    <>
      <CommandMenuTrigger
        onClick={() => {
          setOpen(true)
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "click",
            },
          })
        }}
      />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandMenuInput />

        <CommandList className="min-h-80 supports-timeline-scroll:scroll-fade-effect-y">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandLinkGroup
            heading="Menu"
            links={MENU_LINKS}
            onLinkSelect={handleOpenLink}
          />

          <CommandLinkGroup
            heading="Portfolio"
            links={PORTFOLIO_LINKS}
            onLinkSelect={handleOpenLink}
          />



          <CommandLinkGroup
            heading="Social Links"
            links={SOCIAL_LINK_ITEMS}
            onLinkSelect={handleOpenLink}
          />

          <CommandGroup heading="Brand Assets">
            <CommandItem
              onSelect={() => {
                handleCopyText(
                  getKPMarkSVG(resolvedTheme === "light" ? "#000" : "#fff"),
                  "Mark as SVG copied"
                )
              }}
            >
              <KrishPintoMark />
              Copy Mark as SVG
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Theme">
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("light")}
            >
              <SunMediumIcon />
              Light
            </CommandItem>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("dark")}
            >
              <MoonStarIcon />
              Dark
            </CommandItem>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("system")}
            >
              <Icons.contrast />
              Auto
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Interactive Features">
            <CommandItem onSelect={handleToggleDuckFollower}>
              <MousePointer2Icon />
              Toggle Duck Follower
            </CommandItem>
          </CommandGroup>

          <CommandLinkGroup
            heading="Other"
            links={OTHER_LINK_ITEMS}
            onLinkSelect={handleOpenLink}
          />
        </CommandList>

        <CommandMenuFooter />
      </CommandDialog>
    </>
  )
}

function CommandMenuTrigger({ ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="command-menu-trigger"
      className="gap-1.5 rounded-full text-muted-foreground shadow-none select-none hover:bg-background hover:text-muted-foreground dark:hover:bg-input/30"
      variant="outline"
      size="sm"
      {...props}
    >
      <Icons.search />

      <span className="font-sans text-sm/4 font-medium sm:hidden">Search…</span>

      <KbdGroup className="hidden sm:in-[.os-macos_&]:flex">
        <Kbd className="w-5 min-w-5">⌘</Kbd>
        <Kbd className="w-5 min-w-5">K</Kbd>
      </KbdGroup>

      <KbdGroup className="hidden sm:not-[.os-macos_&]:flex">
        <Kbd>Ctrl</Kbd>
        <Kbd className="w-5 min-w-5">K</Kbd>
      </KbdGroup>
    </Button>
  )
}

function CommandMenuInput() {
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    if (searchValue.length >= 2) {
      const timeoutId = setTimeout(() => {
        trackEvent({
          name: "command_menu_search",
          properties: {
            query: searchValue,
            query_length: searchValue.length,
          },
        })
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [searchValue])

  return (
    <CommandInput
      placeholder="Type a command or search…"
      value={searchValue}
      onValueChange={setSearchValue}
    />
  )
}

function CommandLinkGroup({
  heading,
  links,
  fallbackIcon,
  onLinkSelect,
}: {
  heading: string
  links: CommandLinkItem[]
  fallbackIcon?: React.ReactElement
  onLinkSelect: (href: string, openInNewTab?: boolean) => void
}) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const icon = link?.icon ?? fallbackIcon ?? <React.Fragment />

        return (
          <CommandItem
            key={link.href}
            keywords={link.keywords}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            {link?.iconImage ? (
              <img
                className="size-4 rounded-sm corner-squircle supports-corner-shape:rounded-[50%]"
                src={link.iconImage}
                alt={link.title}
              />
            ) : (
              icon
            )}

            <p className="line-clamp-1">{link.title}</p>

            {link.shortcut && (
              <CommandShortcut className="font-mono tracking-[0.2em] max-sm:hidden">
                {link.shortcut}
              </CommandShortcut>
            )}
          </CommandItem>
        )
      })}
    </CommandGroup>
  )
}

type CommandKind = "command" | "page" | "link"

type CommandMetaMap = Map<
  string,
  {
    commandKind: CommandKind
  }
>

function buildCommandMetaMap() {
  const commandMetaMap: CommandMetaMap = new Map()

  commandMetaMap.set("Download vCard", { commandKind: "command" })

  commandMetaMap.set("Light", { commandKind: "command" })
  commandMetaMap.set("Dark", { commandKind: "command" })
  commandMetaMap.set("Auto", { commandKind: "command" })

  commandMetaMap.set("Copy Mark as SVG", {
    commandKind: "command",
  })

  SOCIAL_LINK_ITEMS.forEach((item) => {
    commandMetaMap.set(item.title, {
      commandKind: "link",
    })
  })

  return commandMetaMap
}

const COMMAND_META_MAP = buildCommandMetaMap()

const ENTER_ACTION_LABELS: Record<CommandKind, string> = {
  command: "Run Command",
  page: "Go to Page",
  link: "Open Link",
}

function CommandMenuFooter() {
  const selectedCommandKind = useCommandState(
    (state) => COMMAND_META_MAP.get(state.value)?.commandKind ?? "page"
  )

  return (
    <>
      <div className="flex h-10" />

      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-between gap-2 rounded-b-2xl border-t px-4 text-xs font-medium">
        <KrishPintoMark className="size-6 text-muted-foreground" />

        <div className="flex shrink-0 items-center gap-2 max-sm:hidden">
          <span>{ENTER_ACTION_LABELS[selectedCommandKind]}</span>
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
          <Separator
            orientation="vertical"
            className="data-vertical:h-4 data-vertical:self-center"
          />
          <span className="text-muted-foreground">Exit</span>
          <Kbd>Esc</Kbd>
        </div>
      </div>
    </>
  )
}

