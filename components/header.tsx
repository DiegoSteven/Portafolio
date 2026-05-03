"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Briefcase, Code, FolderOpen, GraduationCap, MessageCircle, ArrowLeft } from "lucide-react"
import { sectionHref } from "@/lib/section-routes"
import { SECTION_PAGE_BY_PATH } from "@/lib/section-page-meta"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === "/"
  const sectionMeta = !isHome ? SECTION_PAGE_BY_PATH[pathname] : undefined

  const scrollPastRef = useRef<boolean | null>(null)

  useEffect(() => {
    const w = globalThis.window
    if (!w) return

    const read = () => w.scrollY > 50
    let raf = 0

    const sync = () => {
      const next = read()
      if (scrollPastRef.current !== next) {
        scrollPastRef.current = next
        setIsScrolled(next)
      }
    }

    scrollPastRef.current = read()
    setIsScrolled(scrollPastRef.current)

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = w.requestAnimationFrame(sync)
    }

    w.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      w.removeEventListener("scroll", onScroll)
      w.cancelAnimationFrame(raf)
    }
  }, [pathname])

  const navigateToSection = (cardId: string) => {
    router.push(sectionHref(cardId))
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "about", label: "Sobre Mí", short: "Sobre", icon: User, color: "#22d3ee" },
    { id: "experience", label: "Experiencia", short: "Exp.", icon: Briefcase, color: "#34d399" },
    { id: "skills", label: "Habilidades", short: "Skills", icon: Code, color: "#fbbf24" },
    { id: "projects", label: "Proyectos", short: "Proy.", icon: FolderOpen, color: "#f87171" },
    { id: "education", label: "Educación", short: "Edu.", icon: GraduationCap, color: "#a3e635" },
    { id: "contact", label: "Contacto", short: "Contacto", icon: MessageCircle, color: "#38bdf8" },
  ]

  const getItemDescription = (itemId: string) => {
    const descriptions: { [key: string]: string } = {
      about: "Conoce mi historia",
      experience: "Mi trayectoria profesional",
      skills: "Tecnologías y herramientas",
      projects: "Mis trabajos destacados",
      education: "Formación académica",
      contact: "Ponte en contacto",
    }
    return descriptions[itemId] || ""
  }

  const headerSurface = isHome
    ? isScrolled
      ? "border-b border-white/20 bg-slate-950/90 shadow-md shadow-black/30"
      : "border-b border-transparent bg-slate-950/40"
    : "border-b border-white/20 bg-slate-950/95 shadow-md shadow-black/40"

  return (
    <header className={`fixed top-0 z-50 w-full transition-colors duration-300 ${headerSurface}`}>
      <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            {!isHome && (
              <Link
                href="/"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-cyan-400/80 bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-900/40 ring-2 ring-cyan-400/25 transition hover:border-cyan-300 hover:bg-slate-800 hover:ring-cyan-300/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                <ArrowLeft className="h-4 w-4 shrink-0 text-cyan-200" aria-hidden />
                <span>Inicio</span>
              </Link>
            )}
            {!isHome && sectionMeta && (
              <span
                className="hidden min-w-0 truncate text-xs font-bold uppercase tracking-wide text-white/95 sm:inline sm:text-sm md:text-base"
                title={sectionMeta.title}
              >
                {sectionMeta.title}
              </span>
            )}
            {/* Oculto visualmente (mantiene el nodo / enlace por si el layout o hábitos de navegación dependían de él); sigue siendo “Ir al inicio” para lectores de pantalla */}
            <Link href="/" className="sr-only">
              Ir al inicio — Diego Steven Hidalgo
            </Link>
          </div>

          <nav className="hidden lg:flex">
            <div className="flex items-center gap-1 rounded-full border-2 border-white/35 bg-slate-900/90 px-2 py-1.5 shadow-lg shadow-black/50 ring-1 ring-white/25">
              {navItems.map((item) => {
                const IconComponent = item.icon
                const active = pathname === sectionHref(item.id)
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateToSection(item.id)}
                    className={`group relative rounded-full p-3 transition-colors ${
                      active ? "bg-white/20 ring-1 ring-white/40" : "hover:bg-white/15"
                    }`}
                    title={item.label}
                    aria-current={active ? "page" : undefined}
                  >
                    <IconComponent
                      size={22}
                      className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] transition-transform group-hover:scale-110"
                      style={{ color: item.color }}
                      strokeWidth={2.25}
                    />
                    <span className="pointer-events-none absolute -bottom-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-950 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-white/20 transition-opacity group-hover:opacity-100">
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-white hover:bg-white/20 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="relative h-6 w-6">
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
              />
            </div>
          </Button>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 top-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/90" onClick={() => setIsMenuOpen(false)} />
            <div className="relative flex min-h-screen flex-col bg-slate-950">
              <div className="flex items-center justify-between border-b border-white/15 p-5">
                <div className="text-lg font-semibold text-white">Navegación</div>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/15" onClick={() => setIsMenuOpen(false)}>
                  <X size={24} />
                </Button>
              </div>
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => navigateToSection(item.id)}
                        className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:border-white/25 hover:bg-white/10"
                        style={{ animationDelay: `${index * 40}ms` }}
                      >
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-2 ring-white/20"
                          style={{ backgroundColor: `${item.color}33` }}
                        >
                          <IconComponent size={22} style={{ color: item.color }} strokeWidth={2.25} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-base font-semibold text-white">{item.label}</div>
                          <div className="text-sm text-slate-300">{getItemDescription(item.id)}</div>
                        </div>
                        <span className="text-white/50">→</span>
                      </button>
                    )
                  })}
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Acceso rápido móvil: siempre visible, alto contraste */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-white/25 bg-slate-950/95 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 shadow-[0_-8px_24px_rgba(0,0,0,0.5)] lg:hidden"
        aria-label="Secciones del portafolio"
      >
        <div className="mx-auto flex max-w-lg justify-between gap-0.5">
          {navItems.map((item) => {
            const IconComponent = item.icon
            const active = pathname === sectionHref(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToSection(item.id)}
                className={`flex min-w-0 flex-1 flex-col items-center rounded-lg py-2 transition ${
                  active ? "bg-white/15 ring-1 ring-cyan-400/50" : "hover:bg-white/10"
                }`}
                title={item.label}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
              >
                <IconComponent
                  size={22}
                  className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                  style={{ color: item.color }}
                  strokeWidth={2.25}
                />
                <span className="mt-0.5 max-w-full truncate px-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  {item.short}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
