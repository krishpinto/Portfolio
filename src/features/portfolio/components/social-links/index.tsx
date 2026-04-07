import { SOCIAL_LINKS } from "../../data/social-links"
import { Panel } from "../panel"
import { SocialLinkItem } from "./social-link-item"

export function SocialLinks() {
  return (
    <Panel className="before:content-none after:content-none">
      <h2 className="sr-only">Social Links</h2>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="border-r border-line" />
          <div className="border-x border-line" />
          <div className="border-x border-line max-sm:hidden" />
          <div className="border-l border-line max-sm:hidden" />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SOCIAL_LINKS.map((link, index) => {
            return <SocialLinkItem key={index} {...link} />
          })}
        </div>
      </div>
    </Panel>
  )
}
