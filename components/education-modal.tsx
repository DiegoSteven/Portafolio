"use client"

import { useEffect, useRef, useState } from "react"
import { X, GraduationCap, Award, BookOpen, Calendar, MapPin, Star } from "lucide-react"

interface EducationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EducationModal({ isOpen, onClose }: EducationModalProps) {
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

  const education = [
    {
      degree: "Ingeniería de Software",
      institution: "Universidad de las Fuerzas Armadas ESPE",
      period: "En curso - Graduación Marzo 2025",
      location: "Latacunga, Ecuador",
      status: "En curso",
      description: "Formación integral en desarrollo de software, programación, bases de datos, ingeniería de sistemas y metodologías ágiles.",
      highlights: [
        "Desarrollo avanzado de software",
        "Sistemas de gestión de bases de datos",
        "Tecnologías móviles y web",
        "Diseño e implementación de servicios y microservicios",
        "Análisis de datos y aprendizaje automático"
      ],
      courses: [
        "Desarrollo avanzado de software",
        "Sistemas de gestión de bases de datos",
        "Tecnologías móviles y web",
        "Diseño e implementación de servicios y microservicios",
        "Análisis de datos y aprendizaje automático"
      ]
    }
  ]

  const achievements = [
    {
      title: "AWS Sales Accreditation (Business)",
      year: "2025",
      description: "Certificación en ventas y soluciones empresariales de AWS",
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "AWS Technical Essentials (ES)",
      year: "2025", 
      description: "Fundamentos técnicos de Amazon Web Services",
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Generative AI on AWS for Financial Services",
      year: "2025",
      description: "Inteligencia Artificial Generativa en AWS para servicios financieros",
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Serverless con AWS Lambda",
      year: "2025",
      description: "Desarrollo de aplicaciones serverless con AWS Lambda",
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "IEEE Xtreme Programming Competition",
      year: "2024",
      description: "Participación activa en competencias de programación IEEE Xtreme",
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Hackathon Banco Pichincha",
      year: "2025",
      description: "Participación en el hackathon del Banco Pichincha",
      icon: Award,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    }
  ]

  const skills = [
    { category: "Programación", items: ["Java", "JavaScript", "Python", "C++"] },
    { category: "Frontend", items: ["React", "Vue.js", "Vite", "Tailwind CSS"] },
    { category: "Backend", items: ["Spring Boot", "Laravel", "ASP.NET Core", "Flask"] },
    { category: "Bases de Datos", items: ["MySQL", "MariaDB", "MongoDB", "PostgreSQL"] },
    { category: "Cloud & DevOps", items: ["AWS S3", "AWS CloudFront", "GitHub Actions", "Docker"] },
    { category: "Herramientas", items: ["Git", "VS Code", "Postman", "Figma", "Eclipse"] }
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
        className={`bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header del Modal */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-full">
              <GraduationCap size={24} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Formación Académica</h2>
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
          {/* Educación Principal */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Educación Universitaria</h3>
            {education.map((edu, index) => (
              <div key={index} className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-500 rounded-full text-white">
                    <GraduationCap size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h4>
                        <p className="text-lg font-semibold text-indigo-600 mb-2">{edu.institution}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                        {edu.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {edu.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {edu.location}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">{edu.description}</p>
                    
                    {/* Aspectos destacados */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Aspectos destacados:</h5>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {edu.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Materias relevantes */}
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Materias relevantes:</h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, i) => (
                          <span key={i} className="px-3 py-1 bg-white border border-indigo-200 text-indigo-800 text-sm rounded-full font-medium">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Logros y Reconocimientos */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Logros y Reconocimientos</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 ${achievement.bgColor} rounded-full`}>
                      <achievement.icon size={20} className={achievement.color} />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{achievement.year}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{achievement.title}</h4>
                  <p className="text-gray-700 text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>



          {/* Estadísticas Académicas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Años de Estudio", value: "4+" },
              { label: "Proyectos Académicos", value: "12+" },
              { label: "Materias Aprobadas", value: "40+" },
              { label: "Competencias", value: "3+" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{stat.value}</div>
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
