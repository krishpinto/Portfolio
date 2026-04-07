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

export const MAIN_NAV: NavItem[] = []

export const MOBILE_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  ...MAIN_NAV,
]

export const X_USERNAME = "@krishpinto"
export const GITHUB_USERNAME = "krishpinto"
export const SOURCE_CODE_GITHUB_REPO = "krishpinto/Portfolio"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/krishpinto/Portfolio"

export const SPONSORSHIP_URL = "https://github.com/sponsors/krishpinto"

export const UTM_PARAMS = {
  utm_source: "krishpinto.co.in",
}
