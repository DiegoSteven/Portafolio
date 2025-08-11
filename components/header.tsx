"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
          : "bg-white/90 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-black transform hover:scale-105 transition-transform duration-300 cursor-pointer">
            Portafolio
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["inicio", "sobre-mi", "experiencia", "habilidades", "proyectos", "contacto", "educacion"].map(
              (item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-600 hover:text-black transition-all duration-300 capitalize font-medium relative group transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.replace("-", " ")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black/20 transition-all duration-500 group-hover:w-full delay-100"></span>
                </button>
              ),
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-black hover:bg-gray-100 transform hover:scale-110 transition-all duration-300"
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
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="mt-4 pb-4 space-y-2 border-t border-gray-100 pt-4">
            {["inicio", "sobre-mi", "experiencia", "habilidades", "proyectos", "contacto", "educacion"].map(
              (item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left text-gray-600 hover:text-black transition-all duration-300 capitalize py-2 font-medium transform hover:translate-x-2"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                    opacity: isMenuOpen ? 1 : 0,
                    transition: `all 0.3s ease ${index * 100}ms`,
                  }}
                >
                  {item.replace("-", " ")}
                </button>
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
