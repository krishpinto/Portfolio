import { EXPERIENCES } from "../../data/experiences"
import { Panel, PanelHeader, PanelTitle } from "../panel"
import { ExperienceDetailItem } from "./experience-detail-item"

/** Every experience, fully expanded. Used on /work, not on the home page. */
export function ExperienceDetails() {
  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      {EXPERIENCES.map((experience) => (
        <ExperienceDetailItem key={experience.id} experience={experience} />
      ))}
    </Panel>
  )
}
