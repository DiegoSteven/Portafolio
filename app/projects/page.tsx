import { SiteShell } from "@/components/site-shell"
import { SectionPageLayout } from "@/components/section-page-layout"
import { ProjectsSectionContent } from "@/components/sections/projects-section-content"

export default function ProjectsPage() {
  return (
    <SiteShell>
      <SectionPageLayout slug="projects" maxWidthClass="max-w-6xl">
        <ProjectsSectionContent />
      </SectionPageLayout>
    </SiteShell>
  )
}
