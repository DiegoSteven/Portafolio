"use client"

import { useEffect, useRef, useState } from "react"
import { X, FolderOpen, ExternalLink, Github, Calendar, Users, Code } from "lucide-react"

interface ProjectsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const projects = [
    {
      title: "Landing Page de Neurona Global",
      description: "Desarrollo y despliegue de la nueva landing page de Neurona, aplicando tecnologías modernas y prácticas de arquitectura en la nube con optimización completa.",
      image: "/Neurona.png",
      technologies: ["React", "Vite", "Tailwind CSS", "GitHub Actions", "AWS S3", "AWS CloudFront"],
      features: [
        "Frontend moderno con React + Vite y Tailwind CSS",
        "CI/CD automatizado con GitHub Actions",
        "Infraestructura en la nube con Amazon S3 y CloudFront",
        "Optimización de rendimiento, tiempos de carga y SEO técnico",
        "Colaboración con equipos de diseño y QA"
      ],
      category: "Corporate Website",
      date: "2025",
      team: "Neurona Global",
      github: "Repositorio privado",
      demo: "https://www.neuronaglobal.com/"
    },
    {
      title: "AnalytiCore - Análisis de Texto con IA",
      description: "AnalytiCore es una aplicación web moderna que utiliza inteligencia artificial para el análisis avanzado de texto. Ofrece el análisis de sentimiento. Está desplegada en Render.",
      image: "/ServiciosDesplegados.png",
      technologies: ["Spring Boot", "React", "Docker", "Java", "Python", "FastAPI"],
      features: [
        "Análisis de sentimiento con IA",
        "Interfaz web moderna y responsiva",
        "API RESTful con Spring Boot",
        "Despliegue en contenedores Docker"
      ],
      category: "Web Application",
      date: "2025",
      team: "Individual",
      github: "https://github.com/DiegoSteven/AnalytiCore.git",
      demo: "https://frontend-service-ppt4.onrender.com/"
    },
    {
      title: "Servicio de Reportes - Sistema de Rastreo Vehicular",
      description: "Servicio desarrollado con Spring Boot para la generación de reportes basados en datos de dispositivos GPS. Procesa información de posición y genera reportes detallados.",
      image: "/ReporteRuta.png",
      technologies: ["Java", "Spring Boot", "MySQL", "Postman", "Spring Mail"],
      features: [
        "Procesamiento de datos GPS",
        "Generación de reportes en Excel",
        "Envío automático por correo",
        "Detección de viajes y paradas"
      ],
      category: "Backend Service",
      date: "2025",
      team: "Individual",
      github: "https://github.com/DiegoSteven/servicioReportes.git",
      demo: null
    },
    {
      title: "Sistema de Gestión de Pedidos - Microservicios",
      description: "Plataforma completa de gestión de pedidos implementada bajo arquitectura de microservicios con Spring Boot y RabbitMQ. Frontend desarrollado con Next.js.",
      image: "/Pedidos.png",
      technologies: ["Java", "Spring Boot", "MySQL", "RabbitMQ", "Docker", "Next.js", "React"],
      features: [
        "Arquitectura de microservicios",
        "Comunicación asíncrona con RabbitMQ",
        "Frontend moderno con Next.js",
        "Autenticación JWT"
      ],
      category: "Full Stack Application",
      date: "2025",
      team: "Individual",
      github: "https://github.com/DiegoSteven/sistema-gestion-pedidos",
      demo: null
    },
    {
      title: "Hospital Médico - Sistema de Gestión Hospitalaria",
      description: "Sistema de gestión hospitalaria para administrar pacientes, servicios médicos, productos farmacéuticos y facturación. Implementa patrones de diseño avanzados.",
      image: "/sistemaHospitalario.png",
      technologies: ["Spring Boot", "React", "SQLite", "Java", "Node"],
      features: [
        "Gestión integral de pacientes",
        "Administración de servicios médicos",
        "Control de productos farmacéuticos",
        "Sistema de facturación completo"
      ],
      category: "Healthcare System",
      date: "2025",
      team: "Individual",
      github: "https://github.com/DiegoSteven/Hospital_Medico.git",
      demo: null
    }
  ]

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'
      }`}
      style={{ 
        background: 'rgba(0, 0, 0, 0.8)',
        animation: isVisible ? 'fadeIn 0.3s ease-out' : undefined
      }}
    >
      <div 
        ref={modalRef}
        className={`bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header del Modal */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <FolderOpen size={24} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Proyectos</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6">
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="md:flex">
                  {/* Imagen del proyecto */}
                  <div className="md:w-1/3">
                    <div className="h-48 md:h-full bg-gray-200 flex items-center justify-center">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="flex items-center justify-center h-full text-gray-400">
                              <svg width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                              </svg>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  </div>

                  {/* Contenido del proyecto */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>

                    {/* Información del proyecto */}
                    <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="text-gray-600">{project.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-500" />
                        <span className="text-gray-600">{project.team}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code size={16} className="text-gray-500" />
                        <span className="text-gray-600">{project.technologies.length} tecnologías</span>
                      </div>
                    </div>

                    {/* Características */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Características principales:</h4>
                      <ul className="space-y-1">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tecnologías */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Tecnologías:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.github === "Repositorio privado" ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg text-sm cursor-not-allowed">
                          <Github size={16} />
                          Privado
                        </div>
                      ) : (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                          <Github size={16} />
                          Código
                        </a>
                      )}
                      {project.demo && (
                        <a 
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors text-sm"
                        >
                          <ExternalLink size={16} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Estadísticas de proyectos */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Proyectos Completados", value: "5+" },
              { label: "Tecnologías Usadas", value: "15+" },
              { label: "Empresas", value: "3" },
              { label: "Proyectos Desplegados", value: "2" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
