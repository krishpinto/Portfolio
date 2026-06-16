import { CollapsibleList } from "@/components/collapsible-list"

import { PAPERS } from "../../data/papers"
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel"
import { PaperItem } from "./paper-item"

export function Papers() {
  return (
    <Panel id="papers">
      <PanelHeader>
        <PanelTitle>
          Research Papers
          <PanelTitleSup>({PAPERS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={PAPERS}
        max={5}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <PaperItem paper={item} />}
      />
    </Panel>
  )
}
