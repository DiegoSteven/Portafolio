/** Rutas de cada sección del portafolio (sustituyen modales). */
export const SECTION_ROUTES: Record<string, string> = {
  about: "/about",
  experience: "/experience",
  skills: "/skills",
  projects: "/projects",
  education: "/education",
  contact: "/contact",
}

export function sectionHref(cardId: string): string {
  return SECTION_ROUTES[cardId] ?? "/"
}
