"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Briefcase, Code, FolderOpen, GraduationCap, MessageCircle } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigateToCard = (cardId: string) => {
    // Dispatchar evento personalizado para rotar el carrusel 3D
    window.dispatchEvent(new CustomEvent('navigateToCard', { 
      detail: { cardId } 
    }))
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "about", label: "Sobre Mí", icon: User, color: "#22d3ee" },
    { id: "experience", label: "Experiencia", icon: Briefcase, color: "#10b981" },
    { id: "skills", label: "Habilidades", icon: Code, color: "#eab308" },
    { id: "projects", label: "Proyectos", icon: FolderOpen, color: "#facc15" },
    { id: "education", label: "Educación", icon: GraduationCap, color: "#84cc16" },
    { id: "contact", label: "Contacto", icon: MessageCircle, color: "#06b6d4" }
  ]

  const getItemDescription = (itemId: string) => {
    const descriptions: { [key: string]: string } = {
      about: "Conoce mi historia",
      experience: "Mi trayectoria profesional", 
      skills: "Tecnologías y herramientas",
      projects: "Mis trabajos destacados",
      education: "Formación académica",
      contact: "Ponte en contacto"
    }
    return descriptions[itemId] || ""
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-white transform hover:scale-105 transition-transform duration-300 cursor-pointer">
         
          </div>

          {/* Desktop Navigation - Circular Navbar */}
          <nav className="hidden lg:flex">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              {navItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateToCard(item.id)}
                    className="group relative p-3 rounded-full transition-all duration-300 hover:bg-white/20"
                    title={item.label}
                  >
                    <IconComponent 
                      size={20} 
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                      style={{ color: item.color }}
                    />
                    
                    {/* Tooltip */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {item.label}
                    </div>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/20 transform hover:scale-110 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
              />
            </div>
          </Button>
        </div>

        {/* Mobile Navigation - Redesigned */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-0 z-50">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <div className="relative min-h-screen flex flex-col">
              {/* Header del menú */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="text-xl font-light text-white">Navegación</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X size={24} />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 px-6 py-8">
                <div className="space-y-1">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigateToCard(item.id)}
                        className="group flex items-center gap-4 w-full text-left py-4 px-4 rounded-xl transition-all duration-300 hover:bg-white/10 active:bg-white/20"
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <div 
                          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <IconComponent 
                            size={20} 
                            style={{ color: item.color }}
                            className="group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-lg font-medium group-hover:text-white/90 transition-colors duration-300">
                            {item.label}
                          </div>
                          <div className="text-white/50 text-sm">
                            {getItemDescription(item.id)}
                          </div>
                        </div>
                        <div className="text-white/30 group-hover:text-white/60 transition-colors duration-300">
                          →
                        </div>
                      </button>
                    )
                  })}
                </div>
              </nav>

              {/* Footer del menú */}
              <div className="p-6 border-t border-white/10">
                <div className="text-center text-white/50 text-sm">
                  Diego Steven Hidalgo
                </div>
                <div className="text-center text-white/30 text-xs mt-1">
                  Full Stack Developer
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
