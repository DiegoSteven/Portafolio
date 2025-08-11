"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string 
  githubUrl: string
}

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Check if mobile for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }, // Reduced threshold for faster trigger
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const allProjects: Project[] = [
    {
      title: "AnalytiCore - Análisis de Texto con IA",
      description:
        "AnalytiCore es una aplicación web moderna que utiliza inteligencia artificial para el análisis avanzado de texto. Ofrece el análisis de sentimiento. Está desplegada en Render, por lo que puede experimentar cierta demora en la respuesta debido a que, en el plan gratuito, los servicios se ponen en pausa tras periodos de inactividad.",
      image: "/ServiciosDesplegados.png",
      technologies: ["Spring Boot", "React", "Docker", "Java", "Python", "FastAPI"],
      githubUrl: "https://github.com/DiegoSteven/AnalytiCore.git",
      liveUrl: "https://frontend-service-ppt4.onrender.com/"
    },
    {
      title: "Servicio de Reportes - Sistema de Rastreo Vehicular",
      description:
        "Este servicio, desarrollado con Spring Boot, es una separación modular del componente de generación de reportes dentro del sistema monolítico Traccar. Proporciona funcionalidades completas para la gestión y elaboración de reportes basados en datos de dispositivos GPS. El servicio procesa información de posición, detecta viajes y paradas de vehículos, y genera reportes detallados en múltiples formatos, incluyendo exportación a Excel y envío automático por correo electrónico.",
      image: "/ReporteRuta.png",
      technologies: ["Java", "Spring Boot", "MySQL", "Postman","http","Spring Mail"],
      githubUrl: "https://github.com/DiegoSteven/servicioReportes.git",
    },
    {
      title: "Sistema de Gestión de Pedidos - Arquitectura de Microservicios",
      description:
        "Este sistema es una plataforma completa de gestión de pedidos para una distribuidora de productos de consumo masivo, implementada bajo una arquitectura de microservicios utilizando Spring Boot y RabbitMQ para la comunicación asíncrona entre servicios. El frontend está desarrollado con Next.js y TypeScript.",
      image: "/Pedidos.png",
      technologies: ["Java", "Spring Boot", "MySQL", "RabbitMQ", "Docker","JWT", "Next.js", "React ", "Postman", "Tailwind", "Websocket"],
      githubUrl: "https://github.com/DiegoSteven/sistema-gestion-pedidos",
    },
    {
      title: "Hospital Médico - Sistema de Gestión Hospitalaria",
      description:
        "Es un sistema de gestión hospitalaria que permite administrar pacientes, servicios médicos, productos farmacéuticos, facturación y descargos médicos. El sistema implementa patrones de diseño avanzados y arquitectura REST para proporcionar una API robusta y escalable.",
      image: "/sistemaHospitalario.png",
      technologies: ["Spring Boot", "React", "SQLite", "Java", "Node"],
      githubUrl: "https://github.com/DiegoSteven/Hospital_Medico.git",
    },
  ]

  const projects = allProjects.slice(0, 4)

  // Optimized animation duration for mobile
  const animationDuration = isMobile ? "300" : "1000"
  const animationDelay = isMobile ? "100" : "200"

  return (
    <section ref={sectionRef} id="proyectos" className="py-8 sm:py-12 lg:py-16 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements - completely hidden on mobile for performance */}
      <div className="hidden lg:block absolute top-10 left-10 w-32 h-32 border border-gray-200 rotate-12 animate-spin-slow opacity-20"></div>
      <div className="hidden lg:block absolute bottom-10 right-10 w-24 h-24 border border-gray-300 -rotate-12 animate-float opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Title - Simplified for mobile */}
          <div
            className={`text-center mb-6 sm:mb-8 lg:mb-12 transform transition-all duration-${animationDuration} ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <div className="inline-block">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4 relative">
                Mis Proyectos
                {!isMobile && (
                  <div className="absolute -top-2 -right-2 w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full animate-ping"></div>
                )}
              </h2>
              <div
                className={`w-12 sm:w-16 h-0.5 bg-black mx-auto transition-all duration-${animationDuration} delay-150 ${
                  isVisible ? "scale-x-100" : "scale-x-0"
                }`}
              ></div>
            </div>
          </div>

          {/* Projects Grid - Optimized for mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`border-2 border-gray-200 hover:border-black transition-all duration-300 group overflow-hidden transform hover:scale-105 hover:shadow-lg ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
                style={{ 
                  transitionDelay: isMobile ? `${100 + index * 50}ms` : `${300 + index * 150}ms`,
                  transitionDuration: isMobile ? '300ms' : '500ms'
                }}
              >
                {/* Image Container - Optimized for mobile */}
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <CardHeader className="px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 lg:pt-6">
                  <CardTitle className="text-black text-base sm:text-lg lg:text-xl leading-tight">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 space-y-3 sm:space-y-4">
                  {/* Description - Optimized for mobile */}
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-3 sm:line-clamp-none">
                    {project.description}
                  </p>

                  {/* Technologies - Optimized grid */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.slice(0, isMobile ? 4 : 6).map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 sm:px-3 py-1 border border-gray-300 text-xs text-gray-700 font-medium rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {isMobile && project.technologies.length > 4 && (
                      <span className="px-2 py-1 border border-gray-300 text-xs text-gray-500 font-medium rounded">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Buttons - Optimized for mobile */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                    {/* Live Demo Button */}
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white bg-transparent text-xs sm:text-sm"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} className="mr-1.5 sm:mr-2" />
                          Ver Demo
                        </a>
                      </Button>
                    )}
                    
                    {/* GitHub Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white bg-transparent text-xs sm:text-sm"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={14} className="mr-1.5 sm:mr-2" />
                        Ver en GitHub
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
