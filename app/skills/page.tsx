import { SiteShell } from "@/components/site-shell"
import { SectionPageLayout } from "@/components/section-page-layout"
import { SkillsSectionContent } from "@/components/sections/skills-section-content"

export default function SkillsPage() {
  return (
    <SiteShell>
      <SectionPageLayout slug="skills" maxWidthClass="max-w-6xl">
        <SkillsSectionContent />
      </SectionPageLayout>
    </SiteShell>
  )
}
