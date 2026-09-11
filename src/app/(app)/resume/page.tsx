import { ArrowUpRightIcon, DownloadIcon, FileTextIcon } from "lucide-react"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { RESUME_DOWNLOAD_URL, RESUME_URL } from "@/config/site"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
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
    <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
      <Panel className="px-4 py-12 sm:py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Resume
        </h1>
      </Panel>

      <Panel id="resume">
        <PanelContent className="flex flex-wrap gap-3">
          <Button className="font-mono" variant="default" asChild>
            <a href={RESUME_URL} target="_blank" rel="noopener">
              <FileTextIcon />
              Open in Drive
              <ArrowUpRightIcon />
            </a>
          </Button>

          <Button className="font-mono" variant="outline" asChild>
            <a href={RESUME_DOWNLOAD_URL} target="_blank" rel="noopener">
              <DownloadIcon />
              Download PDF
            </a>
          </Button>
        </PanelContent>

        <ResumeViewer className="screen-line-top" />
      </Panel>

      <SectionSeparator />

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
    </div>
  )
}
