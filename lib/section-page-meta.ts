import { SECTION_TITLES, type SectionHeroSlug } from "@/lib/section-hero-config"

/** Ruta → slug (para el header según URL). */
export const SECTION_PAGE_BY_PATH: Record<string, { title: string; slug: SectionHeroSlug }> = {
  "/about": { title: SECTION_TITLES.about, slug: "about" },
  "/experience": { title: SECTION_TITLES.experience, slug: "experience" },
  "/skills": { title: SECTION_TITLES.skills, slug: "skills" },
  "/projects": { title: SECTION_TITLES.projects, slug: "projects" },
  "/education": { title: SECTION_TITLES.education, slug: "education" },
  "/contact": { title: SECTION_TITLES.contact, slug: "contact" },
}
