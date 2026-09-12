import { USER } from "@/features/portfolio/data/user"
import type { NavItem } from "@/types/nav"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://krishpinto.co.in",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "/work",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Resume",
    href: "/resume",
  },
]

/** The résumé lives in Drive so a new revision goes live without a deploy. */
const RESUME_FILE_ID = "1u9kG_uzFpHRp1kyVMu-3hpi0COlcopdK"

/** Drive's viewer page. This is the link to hand to anyone asking for the CV. */
export const RESUME_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/view`

/**
 * A flat PNG of the document, rendered by Drive and regenerated when the file
 * changes, so the preview follows a new revision without a deploy.
 *
 * This replaced an embedded `/preview` iframe. Drive's viewer sized its own
 * viewport slightly shorter than the page, so it scrolled internally: a second
 * scrollbar next to the page's own, and a résumé that appeared cut off. The
 * height its viewer wants cannot be measured from outside a cross-origin
 * frame, so it was guesswork either way. An image has no such opinion.
 *
 * Drive caps this render at 1024px wide whatever size is asked for. Fine for a
 * preview sitting next to a download button; not a substitute for the file.
 */
export const RESUME_PREVIEW_URL = `https://drive.google.com/thumbnail?id=${RESUME_FILE_ID}&sz=w1600`

/** Saves the file straight to disk instead of opening Drive's viewer. */
export const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`

/** Home already leads MAIN_NAV, so the mobile sheet just mirrors it. */
export const MOBILE_NAV: NavItem[] = MAIN_NAV

export const X_USERNAME = "@krishpinto"
export const GITHUB_USERNAME = "krishpinto"
export const SOURCE_CODE_GITHUB_REPO = "krishpinto/Portfolio"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/krishpinto/Portfolio"

export const SPONSORSHIP_URL = "https://github.com/sponsors/krishpinto"

export const UTM_PARAMS = {
  utm_source: "krishpinto.co.in",
}
