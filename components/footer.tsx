"use client"

import { useEffect, useRef, useState } from "react"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Temporalmente oculto - se puede reactivar cambiando hidden por block
  return (
    <footer ref={footerRef} className="hidden py-12 bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className={`grid md:grid-cols-3 gap-8 mb-8 transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div
              className={`transform transition-all duration-1000 delay-200 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <h3 className="text-xl font-bold mb-4 hover:text-gray-300 transition-colors duration-300">
                Diego Steven Hidalgo Sanchez
              </h3>
              <p className="text-gray-400 leading-relaxed hover:text-gray-300 transition-colors duration-300">
                Estudiante de Ingeniería en Software especializado en desarrollo Full Stack.
              </p>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-400 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <h4 className="font-bold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-400">
                {[
                  { text: "Inicio", id: "inicio" },
                  { text: "Sobre mí", id: "sobre-mi" },
                  { text: "Proyectos", id: "proyectos" },
                  { text: "Contacto", id: "contacto" }
                ].map((item, index) => (
                  <li key={item.text}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-white transition-all duration-300 transform hover:translate-x-2 inline-block"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-600 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <h4 className="font-bold mb-4">Sígueme</h4>
              <ul className="space-y-2 text-gray-400">
                {[
                  { text: "GitHub", url: "https://github.com/DiegoSteven" },
                  { text: "LinkedIn", url: "https://www.linkedin.com/in/diego-hidalgo-152a15182/" }
                ].map((item, index) => (
                  <li key={item.text}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-all duration-300 transform hover:translate-x-2 inline-block group"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <span className="group-hover:animate-pulse">{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`border-t border-gray-800 pt-8 text-center transform transition-all duration-1000 delay-800 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-gray-400 hover:text-white transition-colors duration-300">
              © 2025 Diego Steven Hidalgo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
