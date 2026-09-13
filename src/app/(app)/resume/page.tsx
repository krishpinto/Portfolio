import type { Metadata } from "next"

import { Reveal } from "@/components/reveal"
import { AwardItem } from "@/features/portfolio/components/awards/award-item"
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { ResumeDownloadButton } from "@/features/portfolio/components/resume/resume-download-button"
import { ResumeViewer } from "@/features/portfolio/components/resume/resume-viewer"
import { SectionSeparator } from "@/features/portfolio/components/section-separator"
import { AWARDS } from "@/features/portfolio/data/awards"
import { USER } from "@/features/portfolio/data/user"

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume and certificates for ${USER.displayName}.`,
  alternates: {
    canonical: "/resume",
  },
}

export default function ResumePage() {
  return (
    <div className="mx-auto md:max-w-3xl **:[[id]]:scroll-mt-22">
      <Reveal immediate>
        <Panel className="relative px-4 py-12 sm:py-16">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Resume
          </h1>

          <ResumeDownloadButton className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4" />
        </Panel>
      </Reveal>

      <Reveal immediate delay={90}>
        <Panel id="resume">
          <ResumeViewer className="screen-line-top" />
        </Panel>
      </Reveal>

      <SectionSeparator />

      <Reveal>
        <Panel id="certificates">
          <PanelHeader>
            <PanelTitle>Certificates</PanelTitle>
          </PanelHeader>

          {/* The same rows as Honors & Awards on the home page, so each one
              opens to the certificate itself instead of a bare PDF link. */}
          <ul>
            {AWARDS.map((award) => (
              <li key={award.id} className="border-b border-line">
                <AwardItem award={award} />
              </li>
            ))}
          </ul>
        </Panel>
      </Reveal>
    </div>
  )
}
