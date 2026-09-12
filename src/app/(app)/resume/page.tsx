import { ArrowUpRightIcon, FileTextIcon } from "lucide-react"
import type { Metadata } from "next"

import { Reveal } from "@/components/reveal"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { ResumeDownloadButton } from "@/features/portfolio/components/resume/resume-download-button"
import { ResumeViewer } from "@/features/portfolio/components/resume/resume-viewer"
import { SectionSeparator } from "@/features/portfolio/components/section-separator"
import { USER } from "@/features/portfolio/data/user"

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume and certificates for ${USER.displayName}.`,
  alternates: {
    canonical: "/resume",
  },
}

const CERTIFICATES = [
  {
    title: "1st Place — Hack4Innovation @ VesIT",
    href: "/documents/certificates/hack4innovation.pdf",
  },
  {
    title: "1st Place — Innovex Hackathon @ FCRIT E-Summit",
    href: "/documents/certificates/innovex.pdf",
  },
  {
    title: "2nd Place — Spark-A-Thon @ FCRIT",
    href: "/documents/certificates/sparkathon.pdf",
  },
]

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

          <PanelContent className="p-0">
            <ul>
              {CERTIFICATES.map((certificate) => (
                <li key={certificate.href}>
                  <a
                    className="screen-line-bottom flex items-center gap-4 p-4 transition-[background-color] ease-out hover:bg-accent-muted"
                    href={certificate.href}
                    target="_blank"
                    rel="noopener"
                  >
                    <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 text-sm">{certificate.title}</span>
                    <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </PanelContent>
        </Panel>
      </Reveal>
    </div>
  )
}
