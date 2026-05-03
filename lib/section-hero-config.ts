/** Fondo + palabra del hero tipográfico (una por sección). */
export const SECTION_HERO = {
  about: { background: "/compe.jpg", letters: "SOBRE MÍ" },
  experience: { background: "/Experiencia.jpg", letters: "EXPERIENCIA" },
  skills: { background: "/skills.jpg", letters: "SKILLS" },
  projects: { background: "/proyectos.jpg", letters: "PROYECTOS" },
  education: { background: "/educacion.jpg", letters: "EDUCACIÓN" },
  contact: { background: "/contacto.jpg", letters: "CONTACTO" },
} as const

export type SectionHeroSlug = keyof typeof SECTION_HERO

/** Título legible por sección (header / accesibilidad). */
export const SECTION_TITLES: Record<SectionHeroSlug, string> = {
  about: "Sobre Mí",
  experience: "Experiencia Profesional",
  skills: "Habilidades Técnicas",
  projects: "Proyectos",
  education: "Formación Académica",
  contact: "Contacto",
}
