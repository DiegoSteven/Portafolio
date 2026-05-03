import { SiteShell } from "@/components/site-shell"
import { SectionPageLayout } from "@/components/section-page-layout"
import { AboutSectionContent } from "@/components/sections/about-section-content"

export default function AboutPage() {
  return (
    <SiteShell>
      <SectionPageLayout slug="about">
        <AboutSectionContent />
      </SectionPageLayout>
    </SiteShell>
  )
}
