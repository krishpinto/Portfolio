import { DitheringBackdrop } from "@/components/dithering-backdrop"
import { Icons } from "@/components/icons"
import { SITE_INFO } from "@/config/site"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export function SiteFooter() {
  return (
    // `isolate` keeps the backdrop's negative z-index inside the footer.
    // Without it the layer sinks behind the page background and disappears.
    <footer
      id="site-footer"
      className="relative isolate max-w-screen overflow-x-clip px-2"
    >
      {/* Masked so the field fades up out of the page rather than starting on
          a hard edge under the last section. */}
      <DitheringBackdrop className="[mask-image:linear-gradient(to_bottom,transparent,black_35%)] opacity-25" />

      <div className="screen-line-top mx-auto group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
        <div className="flex flex-col-reverse items-center justify-between gap-5 px-4 py-8 sm:flex-row">
          <p className="font-mono text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {USER.displayName}. All rights
            reserved.
          </p>

          <ul className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ icon, title, href }) => {
              const Icon = Icons[icon as keyof typeof Icons]

              return (
                <li key={href} className="flex">
                  <a
                    className="flex size-9 items-center justify-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                    href={href}
                    target="_blank"
                    rel="noopener"
                  >
                    {Icon ? <Icon className="size-4" /> : null}
                    <span className="sr-only">{title}</span>
                  </a>
                </li>
              )
            })}

            <li className="flex">
              <a
                className="flex h-9 items-center rounded-lg border border-line px-3 font-mono text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                href={`${SITE_INFO.url}/llms.txt`}
                target="_blank"
                rel="noopener"
              >
                llms.txt
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-16 sm:h-2" />
      </div>
    </footer>
  )
}
