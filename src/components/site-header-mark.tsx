import { KrishPintoMark } from "./krishpinto-mark"

/**
 * The brand mark in the site header. It used to fade in only once you scrolled
 * past a matching mark in the hero cover. That cover is gone, so the reveal had
 * nothing to wait for and left an empty dashed box on first paint.
 */
export function SiteHeaderMark() {
  return <KrishPintoMark className="h-8 w-14" />
}
