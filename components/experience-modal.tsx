"use client"

import { useEffect, useRef, useState } from "react"
import { X, Briefcase, Calendar, MapPin } from "lucide-react"

interface ExperienceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ExperienceModal({ isOpen, onClose }: ExperienceModalProps) {
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

  const experiences = [
    {
      title: "Full-stack Developer",
      company: "Neurona",
      period: "Agosto 2025 - Actualidad",
      location: "Chile · En remoto",
      description: "Como Full-stack Developer en Neurona, lideré el desarrollo y despliegue de la nueva landing page, aplicando tecnologías modernas y prácticas de arquitectura en la nube.",
      achievements: [
        "Frontend: React + Vite y Tailwind CSS para una interfaz moderna, responsiva y optimizada",
        "CI/CD: Automatización con GitHub Actions para despliegues continuos y confiables",
        "Infraestructura en la nube: Hosting en Amazon S3 y distribución global con AWS CloudFront",
        "Optimización: Mejoras en rendimiento, tiempos de carga y SEO técnico",
        "Colaboración: Trabajo con diseño y QA asegurando calidad y consistencia visual",
        "Formación en AWS: Sales Accreditation (Business), Technical Essentials (ES), Generative AI on AWS for Financial Services y Serverless con AWS Lambda"
      ],
      technologies: ["React", "Vite", "Tailwind CSS", "GitHub Actions", "AWS S3", "AWS CloudFront", "AWS Lambda"]
    },
    {
      title: "Pasante Frontend",
      company: "Magdata Solutions",
      period: "Noviembre 2024 - Febrero 2025",
      location: "Quito, Pichincha, Ecuador · En remoto",
      description: "Gestioné y resolví diversos tickets enfocados principalmente en el desarrollo frontend. Trabajé en una aplicación web para la reserva de citas orientadas al cuidado de mascotas.",
      achievements: [
        "Creación de nuevas vistas siguiendo diseños detallados en Figma",
        "Actualización de estilos y módulos con Vue.js y Quasar",
        "Integración de funcionalidades mediante el consumo de APIs desarrolladas en MongoDB",
        "Enfoque en asegurar una experiencia de usuario fluida",
        "Optimización tanto de funcionalidad como del diseño de la plataforma"
      ],
      technologies: ["Vue.js", "Quasar", "JavaScript", "MongoDB", "Figma"]
    },
    {
      title: "Pasante Backend",
      company: "GAD Municipal de Salcedo",
      period: "Febrero 2024 - Junio 2024",
      location: "Salcedo, Cotopaxi, Ecuador · Presencial",
      description: "Desarrollé microservicios utilizando Java y Spring Boot, migrando bases de datos y optimizando consultas para mejorar el rendimiento del sistema.",
      achievements: [
        "Desarrollé microservicios en Tomcat utilizando Java en Eclipse",
        "Implementé microservicios con Spring Boot creando endpoints para el frontend",
        "Migré una base de datos desde FoxPro a MariaDB utilizando Pentaho como herramienta de ETL",
        "Configuré las cadenas de conexión para integrar la base de datos en los microservicios",
        "Desarrollé múltiples stored procedures para inserción, edición y eliminación de datos",
        "Refactoricé consultas en PHP trasladándolas a la base de datos para optimizar su ejecución"
      ],
      technologies: ["Java", "Spring Boot", "MariaDB", "Pentaho", "PHP", "Tomcat", "Eclipse"]
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
        className={`bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header del Modal */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Briefcase size={24} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Experiencia Profesional</h2>
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
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Línea de tiempo */}
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
                
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Info principal */}
                    <div className="md:flex-1">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-500 rounded-full text-white hidden md:block">
                          <Briefcase size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                          <p className="text-lg font-semibold text-green-600 mb-2">{exp.company}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              {exp.period}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              {exp.location}
                            </div>
                          </div>
                          
                          <p className="text-gray-700 leading-relaxed mb-4">{exp.description}</p>
                          
                          {/* Logros */}
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Logros principales:</h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-700">
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* Tecnologías */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Tecnologías utilizadas:</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <span key={i} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Estadísticas */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Años de Experiencia", value: "1.5+" },
              { label: "Empresas", value: "3" },
              { label: "Tecnologías", value: "15+" },
              { label: "Proyectos", value: "10+" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stat.value}</div>
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
