import { SiteShell } from "@/components/site-shell"
import { SectionPageLayout } from "@/components/section-page-layout"
import { ExperienceSectionContent } from "@/components/sections/experience-section-content"

export default function ExperiencePage() {
  return (
    <SiteShell>
      <SectionPageLayout slug="experience">
        <ExperienceSectionContent />
      </SectionPageLayout>
    </SiteShell>
  )
}
