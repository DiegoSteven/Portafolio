"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, User, Briefcase, Code, FolderOpen, GraduationCap, MessageCircle } from "lucide-react"

interface HorizontalCarouselProps {
  onCardClick: (cardId: string) => void
}

export function HorizontalCarousel({ onCardClick }: HorizontalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const portfolioCards = [
    {
      id: "about",
      title: "Sobre Mí",
      description: "Conoce mi historia y pasión por el desarrollo",
      icon: User,
      color: "#3b82f6",
      image: "/placeholder.jpg"
    },
    {
      id: "experience",
      title: "Experiencia",
      description: "Mi trayectoria profesional y proyectos",
      icon: Briefcase,
      color: "#10b981",
      image: "/Experiencia.jpg"
    },
    {
      id: "skills",
      title: "Habilidades",
      description: "Tecnologías y herramientas que domino",
      icon: Code,
      color: "#8b5cf6",
      image: "/skills.jpg"
    },
    {
      id: "projects",
      title: "Proyectos",
      description: "Mis trabajos más destacados",
      icon: FolderOpen,
      color: "#ef4444",
      image: "/proyectos.jpg"
    },
    {
      id: "education",
      title: "Educación",
      description: "Mi formación académica y certificaciones",
      icon: GraduationCap,
      color: "#6366f1",
      image: "/educacion.jpg"
    },
    {
      id: "contact",
      title: "Contacto",
      description: "¡Hablemos sobre tu próximo proyecto!",
      icon: MessageCircle,
      color: "#f97316",
      image: "/contacto.jpg"
    }
  ]

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portfolioCards.length)
    }, 4000) // Más lento para dispositivos de gama baja

    return () => clearInterval(interval)
  }, [isAutoPlaying, portfolioCards.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Reanudar auto-play después de 10s
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioCards.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioCards.length) % portfolioCards.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm">
        
        {/* Cards Container */}
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {portfolioCards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <div key={card.id} className="w-full flex-shrink-0 px-4 py-6">
                <Card 
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer h-80"
                  onClick={() => onCardClick(card.id)}
                >
                  <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-white/20"
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      <IconComponent 
                        size={32} 
                        style={{ color: card.color }}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      {card.description}
                    </p>

                    {/* CTA Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 mt-auto"
                    >
                      Ver más
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {portfolioCards.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-white/50 text-xs hover:text-white/70 transition-colors"
        >
          {isAutoPlaying ? '⏸️ Pausar' : '▶️ Continuar'} auto-reproducción
        </button>
      </div>
    </div>
  )
}
