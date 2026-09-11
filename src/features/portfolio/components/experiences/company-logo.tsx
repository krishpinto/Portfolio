import { BriefcaseIcon } from "lucide-react"
import Image from "next/image"

import { IconTile } from "@/components/ui/icon-tile"
import { cn } from "@/lib/utils"

import type { Experience } from "../../types/experiences"

/**
 * A company mark sitting in the same square tile the icon fallback uses, so a
 * company with a logo and one without occupy an identical slot and the names
 * beside them stay on one line.
 *
 * The marks are shown in their own colours rather than masked to a single
 * tone: they are square brand symbols now, not flat wordmarks, and flattening
 * a multi-colour mark like Infinity Pool's shell turns it into a grey blob.
 * `companyLogoColor` lights the tile's border on hover instead, which keeps
 * the card's hover cue without touching the artwork.
 *
 * A mark printed in flat black has nothing to sit on once the theme goes dark,
 * so `companyLogoBackground` paints a plate behind it.
 */
export function CompanyLogo({
  experience,
  className,
}: {
  experience: Experience
  /** Sets the tile size. The tile is always square. */
  className?: string
}) {
  const { companyLogo, companyLogoBackground, companyLogoColor, companyName } =
    experience

  if (!companyLogo) {
    return (
      <IconTile className={cn("aspect-square rounded-md", className)}>
        {experience.companyIcon ?? <BriefcaseIcon />}
      </IconTile>
    )
  }

  return (
    <IconTile
      className={cn(
        "aspect-square overflow-hidden rounded-md p-1 transition-colors duration-300",
        companyLogoColor && "group-hover/experience:border-(--logo-color)",
        className
      )}
      style={
        {
          ...(companyLogoBackground && {
            backgroundColor: companyLogoBackground,
          }),
          ...(companyLogoColor && { "--logo-color": companyLogoColor }),
        } as React.CSSProperties
      }
    >
      <Image
        className="size-full object-contain select-none"
        src={companyLogo}
        alt={`${companyName} logo`}
        width={96}
        height={96}
        quality={100}
        unoptimized
      />
    </IconTile>
  )
}
