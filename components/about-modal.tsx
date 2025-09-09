"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Cerrar modal al hacer clic fuera de él
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

  // Cerrar modal con tecla Escape
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
        style={{
          animation: isVisible ? 'slideIn 0.3s ease-out' : undefined
        }}
      >
        {/* Header del Modal */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Sobre Mí</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Contenido del Modal - Copiado del AboutSection */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="prose prose-lg">
                  <p className="text-gray-700 text-lg leading-relaxed font-light hover:text-black transition-colors duration-300">
                    Soy Diego Steven Hidalgo, estudiante de Ingeniería en Software en la Universidad de las Fuerzas
                    Armadas ESPE. Me especializo en desarrollo Full Stack con experiencia en frameworks como Laravel,
                    React, Vue.js y Spring Boot.
                  </p>

                  <p className="text-gray-700 text-lg leading-relaxed font-light hover:text-black transition-colors duration-300">
                    Tengo experiencia práctica desarrollando microservicios, APIs REST y aplicaciones móviles con Flutter.
                    He trabajado con bases de datos SQL y NoSQL, servicios en la nube y contenedores Docker.
                  </p>

                  <p className="text-gray-700 text-lg leading-relaxed font-light hover:text-black transition-colors duration-300">
                    Además del desarrollo, me apasiona el senderismo, ciclismo de montaña, el arte y participo activamente
                    en competencias de programación como IEEE Xtreme.
                  </p>
                </div>

                {/* Key Points with stagger animation */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { label: "Experiencia", value: "1+ años" },
                    { label: "Proyectos", value: "10+" },
                    { label: "Tecnologías", value: "15+" },
                    { label: "Pasantías", value: "2" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="text-center p-4 border border-gray-200 hover:border-black transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer"
                    >
                      <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                        {item.value}
                      </div>
                      <div className="text-sm text-gray-600 font-medium group-hover:text-black transition-colors duration-300">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                {/* Main Image Container */}
                <div className="relative group">
                  <div className="w-full h-96 border-4 border-black overflow-hidden transition-all duration-500 group-hover:border-gray-600">
                    <img
                      src="/compe.jpg?height=400&width=350"
                      alt="Working setup"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>

                  {/* Animated Decorative Elements */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-black transition-all duration-500 group-hover:rotate-45 group-hover:scale-125"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 border-2 border-black transition-all duration-500 group-hover:-rotate-45 group-hover:scale-125"></div>

                  {/* Quote bubble with animation */}
                  <div className="absolute -right-10 top-5 bg-white border-2 border-black p-4 max-w-xs hidden lg:block transform transition-all duration-500 hover:scale-105 hover:rotate-1 group-hover:shadow-lg">
                    <p className="text-sm font-medium">
                      "El código limpio siempre parece que fue escrito por alguien que se preocupa"
                    </p>
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l-2 border-b-2 border-black transform rotate-45 transition-transform duration-300 group-hover:scale-110"></div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-10 -left-6 w-3 h-3 bg-black rounded-full animate-bounce delay-300"></div>
                  <div className="absolute bottom-10 -right-6 w-2 h-2 border-2 border-black animate-spin-slow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}
