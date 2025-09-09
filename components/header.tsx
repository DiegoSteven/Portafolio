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
    { id: "about", label: "Sobre Mí", icon: User, color: "#3b82f6" },
    { id: "experience", label: "Experiencia", icon: Briefcase, color: "#10b981" },
    { id: "skills", label: "Habilidades", icon: Code, color: "#8b5cf6" },
    { id: "projects", label: "Proyectos", icon: FolderOpen, color: "#ef4444" },
    { id: "education", label: "Educación", icon: GraduationCap, color: "#6366f1" },
    { id: "contact", label: "Contacto", icon: MessageCircle, color: "#f97316" }
  ]

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

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="mt-4 pb-4 space-y-2 border-t border-white/20 pt-4">
            {navItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => navigateToCard(item.id)}
                  className="flex items-center gap-3 w-full text-left text-white hover:bg-white/20 transition-all duration-300 py-3 px-4 rounded-lg font-medium transform hover:translate-x-2"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                    opacity: isMenuOpen ? 1 : 0,
                    transition: `all 0.3s ease ${index * 100}ms`,
                  }}
                >
                  <IconComponent size={20} style={{ color: item.color }} />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
