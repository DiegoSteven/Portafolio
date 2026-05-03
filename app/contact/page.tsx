import { SiteShell } from "@/components/site-shell"
import { SectionPageLayout } from "@/components/section-page-layout"
import { ContactSectionContent } from "@/components/sections/contact-section-content"

export default function ContactPage() {
  return (
    <SiteShell>
      <SectionPageLayout slug="contact" maxWidthClass="max-w-2xl">
        <ContactSectionContent />
      </SectionPageLayout>
    </SiteShell>
  )
}
