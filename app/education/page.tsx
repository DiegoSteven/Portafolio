import { SiteShell } from "@/components/site-shell"
import { SectionPageLayout } from "@/components/section-page-layout"
import { EducationSectionContent } from "@/components/sections/education-section-content"

export default function EducationPage() {
  return (
    <SiteShell>
      <SectionPageLayout slug="education" maxWidthClass="max-w-5xl">
        <EducationSectionContent />
      </SectionPageLayout>
    </SiteShell>
  )
}
