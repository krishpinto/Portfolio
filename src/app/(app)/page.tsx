import type { Metadata } from "next"
import type { ProfilePage as PageSchema, WithContext } from "schema-dts"

import { SITE_INFO } from "@/config/site"
import { Awards } from "@/features/portfolio/components/awards"
import { Experiences } from "@/features/portfolio/components/experiences"
import { GitHubContributions } from "@/features/portfolio/components/github-contributions"
import { Now } from "@/features/portfolio/components/now"
import { Overview } from "@/features/portfolio/components/overview"
import { Papers } from "@/features/portfolio/components/papers"
import { ProfileHero } from "@/features/portfolio/components/profile-hero"
import { Projects } from "@/features/portfolio/components/projects"
import { SocialLinks } from "@/features/portfolio/components/social-links"
import { TechStack } from "@/features/portfolio/components/tech-stack"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  // The root layout's default title already reads "Krish Pinto – <role>", so
  // the home page only needs its own description. The root falls back to the
  // one-line bio, which is too thin to earn a click from a result page.
  description: `${USER.displayName} is a full-stack and AI engineer in Mumbai building enterprise platforms, on-device ML, and developer tooling. Selected work, experience, and writing.`,
  alternates: {
    canonical: "/",
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <ProfileHero />
        <Separator />

        <Overview />
        <SocialLinks />
        <Separator />

        <GitHubContributions />
        <Separator />

        <Now />
        <Separator />

        <Experiences />
        <Separator />

        <Projects />
        <Separator />

        <Awards />
        <Separator />

        <Papers />
        <Separator />

        <TechStack />

        {/* Hidden. Re-import About from the components folder to bring it back.
        <About />
        <Separator /> */}
      </div>
    </>
  )
}

function getPageJsonLd(): WithContext<PageSchema> {
  const [currentJob] = USER.jobs

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      alternateName: USER.username,
      identifier: USER.username,
      image: new URL(USER.avatar, SITE_INFO.url).toString(),
      url: SITE_INFO.url,
      description: USER.bio,
      jobTitle: USER.jobTitle,
      // Every profile the same person controls. This is what lets a search
      // engine merge the site, the GitHub account and the LinkedIn page into
      // one entity instead of three unrelated pages that share a name.
      sameAs: SOCIAL_LINKS.map((link) => link.href),
      worksFor: {
        "@type": "Organization",
        name: currentJob.company,
        url: currentJob.website,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Fr. C. Rodrigues Institute of Technology",
        url: "https://fcrit.ac.in",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      // Subject areas, not name variants. USER.keywords is mostly spellings of
      // "Krish Pinto", which belong in meta keywords and would read as stuffing
      // here. These are the things the work on this page actually demonstrates.
      knowsAbout: [
        "Full-stack web development",
        "Artificial intelligence engineering",
        "Machine learning",
        "TypeScript",
        "React",
        "Next.js",
        "Python",
        "Go",
        "Kubernetes",
        "Android development",
        "Cloud infrastructure",
        "Developer tooling",
      ],
    },
  }
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-line",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56",
        className
      )}
    />
  )
}
