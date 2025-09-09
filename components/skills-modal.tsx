"use client"

import { useEffect, useRef, useState } from "react"
import { X, Code, Database, Globe, Smartphone } from "lucide-react"

interface SkillsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SkillsModal({ isOpen, onClose }: SkillsModalProps) {
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

  const skillCategories = [
    {
      title: "Frontend",
      icon: Globe,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      skills: [
        { name: "React", level: 90 },
        { name: "Vue.js", level: 90 },
        { name: "Vite", level: 85 },
        { name: "JavaScript", level: 88 },
        { name: "Tailwind CSS", level: 85 }
      ]
    },
    {
      title: "Backend",
      icon: Code,
      color: "text-green-600",
      bgColor: "bg-green-100",
      skills: [
        { name: "Spring Boot", level: 90 },
        { name: "Laravel", level: 85 },
        { name: "ASP.NET Core", level: 75 },
        { name: "Flask", level: 70 }
      ]
    },
    {
      title: "Bases de Datos",
      icon: Database,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      skills: [
        { name: "MySQL", level: 85 },
        { name: "MariaDB", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "PostgreSQL", level: 70 }
      ]
    },
    {
      title: "DevOps & Cloud",
      icon: Smartphone,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      skills: [
        { name: "AWS S3", level: 85 },
        { name: "AWS CloudFront", level: 80 },
        { name: "GitHub Actions", level: 85 },
        { name: "Docker", level: 80 },
        { name: "Flutter", level: 85 },
        { name: "Git", level: 90 },
        { name: "CI/CD", level: 80 }
      ]
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
            <div className="p-2 bg-purple-100 rounded-full">
              <Code size={24} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Habilidades Técnicas</h2>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 ${category.bgColor} rounded-full`}>
                    <category.icon size={20} className={category.color} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            category.title === 'Frontend' ? 'bg-blue-500' :
                            category.title === 'Backend' ? 'bg-green-500' :
                            category.title === 'Base de Datos' ? 'bg-purple-500' :
                            category.title === 'Móvil' ? 'bg-orange-500' :
                            category.title === 'Cloud & DevOps' ? 'bg-indigo-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Estadísticas de Skills */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Lenguajes", value: "8+" },
              { label: "Frameworks", value: "12+" },
              { label: "Herramientas", value: "15+" },
              { label: "Años Estudiando", value: "4+" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
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
